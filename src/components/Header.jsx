import React, { useEffect, useState } from "react";
import Button from "./Button";
import Search from "./Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { Button as Button1 } from "@mui/material";
import axios from "axios";

const Header = () => {
  const { token, logout, region, setRegion, allRegions, setAllRegions } =
    useAuth();
  const [regionOpen, setRegionOpen] = useState(false);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);
  const [content, setContent] = useState("");
  const location = useLocation();
  const currentRoute = location.pathname;

  const handleLogout = () => {
    logout();
    navigate("/home", { replace: true });
  };

  useEffect(() => {
    (async () => {
      try {
        const regionResponse = await axios.get(
          `${import.meta.env.VITE_SOME_KEY}files/region/`
        );
        const reg = regionResponse?.data?.files.map((item) => item.region);
        setAllRegions(reg);
      } catch (error) {
        console.error("Error fetching regions:", error);
      }
    })();
  }, []);

  const handleSearch = async () => {
    if (!content) {
      return;
    }
    navigate(`/document/${content}`, { replace: true });
  };

  return (
    <header className="flex justify-between items-center shadow-2xs px-4 py-2 mb-2 w-full">
      <div className="flex gap-7 items-center w-full max-w-[500px]">
        <Link
          to={"/"}
          className="w-[43px] h-[43px] rounded-[50%] items-center justify-center flex"
        >
          <img src="/favicon.png" alt="Logo" />
        </Link>
        <span className="flex flex-col">
          <Button1 onClick={() => setRegionOpen(!regionOpen)}>
            {region || "Region"}
          </Button1>
          <ul
            className={`${
              regionOpen ? "" : "h-0"
            } absolute top-10 z-10 overflow-hidden  py-0 text-sm text-gray-700 dark:text-gray-200 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44`}
          >
            <li
              key={-1}
              onClick={() => {
                setRegion("");
                setRegionOpen(false);
              }}
              className="block px-4 py-2 last:rounded-b-lg hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
            >
              All regions
            </li>
            {allRegions?.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  setRegion(item);
                  setRegionOpen(false);
                }}
                className="block px-4 py-2 last:rounded-b-lg hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </span>
        {!currentRoute.includes("/document") && (
          <span className="hidden sm:flex gap-2 items-center w-full relative">
            <Search content={content} setContent={setContent} />
            <Button1 className="!absolute right-0" onClick={handleSearch}>
              Go
            </Button1>
          </span>
        )}
      </div>

      <span className="hidden lg:flex gap-2 items-center">
        {!token ? (
          <div className="flex gap-[10px]">
            <Button href="/login" name={"Login"} />
            <Button href="/signup" name={"Signup"} />
          </div>
        ) : (
          <div className="flex gap-[10px] relative">
            <Button href="/" name={"Home"} />
            <Button href="/document" name={"Documents"} />
            <Button href="/upload" name={"Upload"} />
            <Button href="/heatmap" name={"Heatmap"} />
            <Button href="/dimviz" name={"DimViz"} />
            <Button href="/profile" name={"Profile"} />
            <Button onClick={handleLogout} href="#" name={"Logout"} notNav />
          </div>
        )}
      </span>

      {/* Mobile hamburger */}
      <div className="lg:hidden flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="inline-flex items-center cursor-pointer p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded="false"
          data-collapse-toggle="navbar-default"
        >
          <span className="sr-only">Open main menu</span>
          {!isOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 17 14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke="#000000"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke="#000000"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          )}
        </button>
        <div
          className={`${
            isOpen ? "w-[70%]" : "w-0"
          } md:flex flex-col absolute overflow-hidden bg-[#ffffff] shadow-2xl h-full top-15 right-0 z-10`}
          style={{
            transition: "all 0.3s ease-in-out",
          }}
          id="navbar-default"
        >
          {!token ? (
            <div
              onClick={() => setIsOpen(false)}
              className="flex gap-[10px] w-full flex-col items-center"
            >
              <Button href="/login" name={"Login"} />
              <Button href="/signup" name={"Signup"} />
            </div>
          ) : (
            <div
              onClick={() => setIsOpen(false)}
              className="flex gap-[10px] flex-col w-full items-center"
            >
              <Button href="/" name={"Home"} />
              <Button href="/document" name={"Documents"} />
              <Button href="/upload" name={"Upload"} />
              <Button href="/heatmap" name={"Heatmap"} />
              <Button href="/dimviz" name={"DimViz"} />
              <Button href="/profile" name={"Profile"} />
              <Button onClick={handleLogout} href="#" name={"Logout"} notNav />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
