import { useState, ReactNode } from "react";

// const ListBox = function ({children}: {children: ReactNode}) {

// with out destructuring
const ListBox = function (props: {children: ReactNode}) {
  const children = props.children
  const [isOpen1, setIsOpen1] = useState(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && children }
    </div>
  );
};

export default ListBox;
