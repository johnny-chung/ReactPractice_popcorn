import SearchBar from "./Searchbar";
import { MovieProps } from "../model/types";

import React, { ReactNode } from "react";

const Logo = function () {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
};

// const Navbar = function ({ element }) {
const Navbar: React.FC<{ children: ReactNode }> = function ({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
};

export default Navbar;
