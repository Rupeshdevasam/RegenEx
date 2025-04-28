import { Button } from "@mui/material";
import React from "react";
import Button1 from "./components/Button";

const DimViz = () => {
  const tempData = [
    "1776_1832",
    "1835_1846",
    "1847_1859",
    "1860_1872",
    "1874_1884",
    "1885_1894",
    "1895_1902",
    "1903_1910",
    "1911_1918",
    "1919_1926",
    "1927_1935",
    "1936_1943",
    "1944_1974",
    "1977_1988",
    "1989_1996",
    "1997_2015",
  ];

  const [selected, setSelected] = React.useState(tempData[0]);
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex flex-col gap-5 justify-center w-full h-full">
      <p>
        Below we have created a handful of visualizations of our topics over
        time. Feel free to examine the properties of the topics in our corpus by
        looking at things such as: distance between topics, changes in the
        topics over time, distinction of words between topics, etc. We hope that
        some meaningful insights can be discovered by those well-versed in
        neural regeneration. The visualizations here are seperated into 16
        buckets with 10 topics.
      </p>
      <div className="flex gap-5 items-center">
        <p>
          Please select the DTM hyperparameters you would like to visualize:
        </p>

        <div className="relative inline-block text-left">
          <div className="flex gap-2">
            <button
              type="button"
              class="cursor-pointer inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
              onClick={() => setOpen(!open)}
            >
              {selected}
              <svg
                class="-mr-1 size-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <Button onClick={() => {}} variant="outlined">
              Go
            </Button>
          </div>

          {open ? (
            <div
              className={
                "absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden"
              }
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabindex="-1"
            >
              <div className="max-h-[300px] overflow-auto" role="none">
                {tempData.map((item, index) => (
                  <span
                    className={`block px-4 py-2 text-sm divide-y divide-gray-100 transition-all cursor-pointer hover:bg-[#b4b4b4] ${
                      selected === item ? "bg-[#b4b4b4]" : ""
                    } text-gray-700`}
                  >
                    <Button1
                      onClick={() => {
                        setSelected(item);
                        setOpen(false);
                      }}
                      name={item}
                      key={index}
                    />
                  </span>
                ))}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default DimViz;
