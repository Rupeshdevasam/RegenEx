import React from "react";
import { Link, NavLink } from "react-router-dom";

const Button = ({ href, name, onClick = () => {}, notNav = false }) => {
  const styles =
    "py-1.5 px-1.5 text-[#6B6B6B] hover:text-[#242424] hover:bg-primary text-base";
  return (
    <NavLink
      onClick={onClick}
      className={({ isActive }) =>
        isActive && !notNav ? `${styles} text-[#242424] rounded-[5px]` : styles
      }
      to={href}
    >
      {name}
    </NavLink>
  );
};

export default Button;
