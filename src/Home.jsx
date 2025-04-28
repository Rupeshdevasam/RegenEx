import React from "react";
import Header from "./components/Header";
import { Modal, TextField } from "@mui/material";
import { BarChart } from "@mui/x-charts";

const Home = () => {
  return (
    <main className="flex flex-col">
      <span className="text-3xl">Regen-X</span>
      {/* divider */}
      <div className="w-full h-[1px] bg-gray-100 rounded-2xl divider mt-1 mb-2"></div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between flex-wrap">
          <p className="max-w-2xl text-wrap">
            Welcome to our web-based tool. Please feel free to explore and learn
            more about our approach to designing our literature ontology. We
            used a collection of deep learning, natural language processing, and
            text mining techniques to optimize our models. A total of 673
            research papers from 1776-2020 were collected and analyzed.
          </p>
          <div className="w-full lg:w-[500px] h-[300px] flex justify-center items-center">
            <BarChart
              colors={["#2f64bf"]}
              xAxis={[
                {
                  id: "barCategories",
                  data: [
                    "1771-1820",
                    "1821-1870",
                    "1871-1920",
                    "1921-1970",
                    "1971-2020",
                  ],
                  scaleType: "band",
                },
              ]}
              series={[
                {
                  id: "papers",
                  data: [2, 50, 150, 175, 400],
                },
              ]}
              grid={{ horizontal: true }}
              title="Curated papers"
            />
          </div>
        </div>

        <div className="flex gap-10 flex-col flex-wrap items-center">
          <img src="/process.png" className="max-w-150 w-full" />
          <p>
            Before we could begin employing our algorithms, we needed to convert
            these PDF's with a wide range of quality, style, and format into
            machine readable text. We used Adobe's optical character recogntion
            to convert the documents. Then, we used regular expressions to
            tokenize the words in each document. We removed stopwords from each
            document using NLTK's stopword list. Then, we fed our documents
            through BioBert to create a set of "entities" and we used these as
            our set of startwords. We also added to this set with words from the
            indices of popular neural regeneration textbooks. Finally, we used
            the Porter stemmer on all the words to make our dictionary more
            robust. We also used popular data science techniques such as grid
            search to optimize our Dynamic Topic Model. You may feel free to
            interact with our model that produced the highest average topic
            coherence in the document upload section of this webapp. We have
            also included visualizations that show the plots of the topics, and
            the words that these topics consist of, over time in the DTM
            visualization section. Finally, for further analysis, take a look at
            the heatmaps to see analysis of the topics from an author specific
            perspective.
          </p>
        </div>
      </div>

      {/* Login Modal */}
      {/* <Modal
      open={true}
      onClose={() => {}}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
      className="flex items-center justify-center"
    >
      <div
        style={{
          border: "1px solid #80808080",
        }}
        className="w-[400px] h-[400px] bg-white outline-0 shadow-md rounded-sm"
      >
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
        />
      </div>
    </Modal> */}
    </main>
  );
};

export default Home;
