import React from "react";
import { useNavigate } from "react-router-dom";

const DropdownItem = ({ title, author, date, number, file }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/doc/${file.fileId}`);
      }}
      className="p-2 cursor-pointer shadow-sm hover:bg-[#adabab10] transition-all flex flex-col gap-2"
    >
      <span className="flex gap-2 items-center">
        <span className="text-bolder text-lg">{number}.</span>
        <span className="text-bold text-lg self-end">{title}</span>
      </span>

      <div className="flex justify-between items-center">
        <span className="text-[#6B6B6B] text-sm">{author.slice(0, 10)}...</span>

        <span className="text-[#6B6B6B] text-sm">{date}</span>
      </div>
    </div>
  );
};

export default DropdownItem;
