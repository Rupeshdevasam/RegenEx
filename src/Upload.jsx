import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { Document } from "react-pdf";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./provider/authProvider";

const Upload = () => {
  const navigate = useNavigate();
  const { region, setRegion, setAllRegions } = useAuth();
  const [allFiles, setAllFiles] = React.useState([]);
  const [uploadFile, setUploadFile] = React.useState(null);
  const [description, setDescription] = React.useState("");
  const [region1, setRegion1] = React.useState(region);
  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("pdf", uploadFile);
    formData.append("filename", uploadFile.name);
    formData.append("contentType", uploadFile.type);
    formData.append("size", uploadFile.size);
    formData.append("uploadDate", new Date().toISOString());
    formData.append("description", description);
    formData.append("region", region1);
    try {
      const resp = await axios.post(
        `${import.meta.env.VITE_SOME_KEY}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUploadFile(null);
      fetchFiles();
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const fetchFiles = async () => {
    try {
      const resp = await axios.get(`${import.meta.env.VITE_SOME_KEY}/files`);

      if (resp.data.files) {
        setAllFiles(resp.data.files);
        const allRegions = resp.data.files.map((item) => item.region);
        setAllRegions(allRegions);
      }
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const redirectToPdf = (fileId) => {
    navigate(`/doc/${fileId}`);
  };

  const handleDeletePdf = async (fileId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_SOME_KEY}/file/${fileId}`);

      fetchFiles();
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className=" flex flex-col items-center w-full h-screen gap-4">
      {/* Uploader */}
      <div className="flex flex-col items-start justify-center w-full gap-1.5">
        <div className="flex items-center justify-start w-full gap-5">
          <h1 className="text-2xl font-bold min-w-max text-gray-800">
            Upload Files
          </h1>
          {uploadFile ? (
            <div className="flex items-center justify-end w-full gap-5">
              <Button onClick={() => setUploadFile(null)} variant="outlined">
                Cancel
              </Button>
              <Button onClick={handleFileUpload} variant="outlined">
                Upload
              </Button>
            </div>
          ) : (
            ""
          )}
        </div>
        <div class="flex items-center justify-center w-full flex-col gap-2">
          {uploadFile ? (
            <div className="flex flex-col w-full gap-2">
              <div className="flex flex-col w-full gap-2">
                <label
                  for="message"
                  class="block mb-2 text-sm font-medium text-black dark:text-black"
                >
                  Region
                </label>
                <input
                  id="message"
                  rows="4"
                  class="block p-2.5 w-full text-sm text-white bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-white dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write the region here..."
                  value={region1}
                  onChange={(e) => setRegion1(e.target.value)}
                  disabled={!uploadFile}
                />
              </div>
              <div className="flex flex-col w-full gap-2">
                <label
                  for="message"
                  class="block mb-2 text-sm font-medium text-black dark:text-black"
                >
                  Description
                </label>
                <textarea
                  id="message"
                  rows="4"
                  class="block p-2.5 w-full text-sm text-white bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-white dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write the description here..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={!uploadFile}
                ></textarea>
              </div>
            </div>
          ) : (
            ""
          )}
          <label
            for="dropzone-file"
            class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer dark:bg-gray-100 dark:border-gray-200 "
          >
            {!uploadFile ? (
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span class="font-semibold">Click to upload</span> or drag and
                  drop
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Only PDFs are allowed
                </p>
              </div>
            ) : (
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span class="font-semibold">File Name:</span>{" "}
                  {uploadFile?.name}
                </p>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span class="font-semibold">File Size:</span>{" "}
                  {(uploadFile?.size / 1024).toFixed(2)} KB
                </p>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span class="font-semibold">File Type:</span>{" "}
                  {uploadFile?.type}
                </p>
              </div>
            )}

            <input
              id="dropzone-file"
              type="file"
              onChange={(e) => {
                if (e.target.files[0].type !== "application/pdf") {
                  alert("Please upload a PDF file");
                  return;
                }
                setUploadFile(e.target.files[0]);
              }}
              class="hidden"
            />
          </label>
        </div>
      </div>

      {/* Table */}
      <div className="flex flex-col items-start justify-center w-full gap-1.5">
        <h1 className="text-2xl font-bold text-gray-800">Uploaded Files</h1>
        <div class="relative overflow-x-auto shadow-md sm:rounded-md w-full">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-2xl">
            <thead class="text-xs text-gray-700 uppercase dark:bg-gray-400 dark:border-gray-400 border-gray-700">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Sl No
                </th>
                <th scope="col" class="px-6 py-3">
                  Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Description
                </th>
                <th scope="col" class="px-6 py-3">
                  Region
                </th>
                <th scope="col" class="px-6 py-3">
                  Type
                </th>
                <th scope="col" class="px-6 py-3">
                  Upload Date
                </th>
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {allFiles.length > 0 ? (
                allFiles.map((file) => (
                  <tr
                    key={file._id}
                    class="bg-white border-b dark:bg-gray-100 hover:dark:bg-gray-500 cursor-pointer dark:border-gray-200 border-gray-400"
                  >
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-cyan-950 whitespace-nowrap dark:text-cyan-950"
                      onClick={() => redirectToPdf(file.fileId)}
                    >
                      {allFiles.indexOf(file) + 1}
                    </th>
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-cyan-950 whitespace-nowrap dark:text-cyan-950 hover:dark:text-white"
                      onClick={() => redirectToPdf(file.fileId)}
                    >
                      {file.filename}
                    </th>
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-cyan-950 whitespace-nowrap dark:text-cyan-950 hover:dark:text-white"
                      onClick={() => redirectToPdf(file.fileId)}
                    >
                      {file.description}
                    </th>
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-cyan-950 whitespace-nowrap dark:text-cyan-950 hover:dark:text-white"
                      onClick={() => setRegion(file.region)}
                    >
                      {file.region}
                    </th>
                    <td class="px-6 py-4">{file.contentType}</td>
                    <td class="px-6 py-4">
                      {new Date(file?.uploadDate).toDateString()}
                    </td>
                    <td class="px-6 py-4">
                      <Button
                        variant="contained"
                        onClick={() => handleDeletePdf(file.fileId)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr class="bg-white border-b dark:bg-gray-100 cursor-pointer dark:border-gray-200 border-gray-400">
                  <th
                    scope="row"
                    class="px-6 py-4 w-full font-medium text-cyan-950 text-center whitespace-nowrap dark:text-cyan-950"
                  >
                    No files found
                  </th>
                </tr>
              )}

              {/* <tr class="bg-white border-b dark:bg-gray-100 hover:dark:bg-gray-500 cursor-pointer dark:border-gray-200 border-gray-400">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-cyan-950 whitespace-nowrap dark:text-cyan-950 hover:dark:text-white"
              >
                Apple MacBook Pro 17"
              </th>
              <td class="px-6 py-4">Silver</td>
              <td class="px-6 py-4">Laptop</td>
              <td class="px-6 py-4">$2999</td>
            </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Upload;
