import React from "react";
import ToDo from "../ToDo/ToDo";
import TaskBoard from "../TaskBoard/TaskBoard";

const Home = () => {
  return (
    <div className="max-w-screen-xl gap-5 mx-auto flex ">
      {/* <ToDo></ToDo> */}
      <TaskBoard></TaskBoard>
    </div>
  );
};

export default Home;
