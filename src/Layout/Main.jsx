import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";

const Main = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar at the top */}

      <Navbar></Navbar>

      {/* Main content with flexible height */}
      <div className="flex-grow mt-16">
        <Outlet />
      </div>

      {/* Footer at the bottom */}
      {/* <div className="mt-20">
        <h1>footer</h1>
      </div> */}
    </div>
  );
};

export default Main;
