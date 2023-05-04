import React from "react";
import Navbar from "../../components/User/Navbar";
import Completed from "../../components/User/Completed";
import Sidebar from "../../components/User/Sidebar";

const MyTrips = () => {
  return (
    <div className="bg-white h-screen ">
      <Navbar />
      <div className="flex ">
        <Sidebar />
        <div className=" w-9/12 ml-10 md:ml-0 items-center md:justify-between ">
          <Completed />
          
          
        </div>
      </div>
    </div>
  );
};

export default MyTrips;