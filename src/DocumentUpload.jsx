import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Search from "./components/Search";
import { useAuth } from "./provider/authProvider";
import axios from "axios";
import DropdownItem from "./components/DropdownItem";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";

const DocumentUpload = () => {
  const { query } = useParams();
  const [filteredData, setFiltertedData] = useState([]);
  const [content, setContent] = useState(query || "");
  const [data, setData] = useState([]);
  const { region } = useAuth();
  const [error, setError] = useState(false);

  const fetchData = async () => {
    const response = await axios.get(
      region
        ? `${import.meta.env.VITE_SOME_KEY}/files/region?region=${region}`
        : `${import.meta.env.VITE_SOME_KEY}/files/region/`
    );
    const data = response.data.files;

    await setData(data);
    search(data);
  };
  useEffect(() => {
    fetchData();
  }, [region]);

  useEffect(() => {
    setFiltertedData([]);
    setError(false);
  }, [content]);

  useEffect(() => {
    (async () => {
      if (query) {
        setContent(query);
      }
    })();
  }, []);

  const search = async (data = []) => {
    if (query) {
      await axios.post(`${import.meta.env.VITE_SOME_KEY}/history/`, {
        query: content,
      });
    }
    const filtered = data?.filter((item) => {
      return (
        item.filename?.toLowerCase().includes(content.toLowerCase()) ||
        item.description?.toLowerCase().includes(content.toLowerCase()) ||
        (new Date(item.uploadDate)
          .toString()
          ?.toLowerCase()
          .includes(content.toLowerCase()) &&
          (region === "" || region === item.region))
      );
    });
    setFiltertedData(filtered);
    if (filtered.length === 0) {
      setError(true);
    } else {
      setError(false);
    }
  };
  return (
    <main className="container mx-auto px-4 flex flex-col items-center justify-center gap-5">
      <div className="w-full flex flex-col gap-2 items-end">
        <Search bigText setContent={setContent} content={content} />
        <Button
          onClick={() => search(data)}
          className="w-30"
          variant="contained"
          color="primary"
        >
          Go
        </Button>
      </div>

      {content.length > 0 && filteredData?.length > 0 && (
        <h4 className="self-start text-2xl">Results:</h4>
      )}
      {content.length > 0 && filteredData?.length > 0 ? (
        <div className=" z-50 overflow-auto bg-white w-full rounded-b-sm">
          {filteredData?.length > 0 ? (
            filteredData.map((item, index) => (
              <DropdownItem
                key={index}
                number={index + 1}
                title={item.filename}
                author={item.description}
                date={new Date(item.uploadDate).toDateString()}
                file={item}
              />
            ))
          ) : (
            <span>No results foundsss</span>
          )}
          {/* <DropdownItem title={"Development"} /> */}
        </div>
      ) : (
        ""
      )}
      {error && (
        <div className=" p-2 rounded">
          <p className="text-red-500">No results</p>
        </div>
      )}
      <p>
        Welcome to our recommender system! Copy and paste the contents of the
        research paper with topics you are interested in researching. Our
        dynamic topic modeling algorithm will recommend some papers in our
        corpus that should relate to the research that you are investigating.
        The advantage of this recommendation is that it is much more powerful
        than a traditional Google or Pubmed search query. Our algorithm bridges
        the gap between changes in diction, syntax, and sentence structure over
        time. In other words, the language in this paper could be different but
        it ultimately discusses the same topic as the text you entered. The
        advantage here is that we could recommend a paper written 100 years
        earlier with less common words that matches the context of your paper.
        Additionally, we don't keyword match which is what popular search
        engines like Google do. We match based on the hellinger distance between
        the topic distribution of the text you entered and each paper in our
        corpus. The model you are querying now split our corpus into 10 topics
        and binned the time years into 16 buckets.
      </p>
    </main>
  );
};

export default DocumentUpload;
