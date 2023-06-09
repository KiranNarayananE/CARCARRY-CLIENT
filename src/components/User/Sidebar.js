import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setLogout } from "../../Store/Slice/Login";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate= useNavigate()

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/login")

  };

  return (
    <>
      <aside className="md:flex flex-col hidden ml-10 w-64 mt-20 px-4 bg-white border-r rtl:border-r-0 rtl:border-l">
        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav>
            <Link to="/" className="flex items-center px-4 py-2 text-black  rounded-md hover:bg-gray-500  hover:text-gray-700 ">
              <span className="mx-4 font-medium">Ride Now</span>
            </Link>

            <Link
              to="/my-trips"
              className="flex items-center px-4 py-2 mt-5 text-black transition-colors duration-300 transform rounded-md  hover:bg-gray-500  hover:text-gray-700">
              <span className="mx-4 font-medium">My trips</span>
            </Link>

           

            <Link
              to="/Profile"
              className="flex items-center px-4 py-2 mt-5 text-black transition-colors duration-300 transform rounded-md  hover:bg-gray-500  hover:text-gray-700">
              <span className="mx-4 font-medium">Profile</span>
            </Link>

            <hr className="my-6 border-gray-200 dark:border-gray-600" />

            <button
              className="flex items-center px-4 py-2 mt-5 text-black transition-colors duration-300 transform rounded-md  hover:bg-gray-500  hover:text-gray-700"
              onClick={handleLogout}>
              <span className="mx-4 font-medium">Logout</span>
            </button>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
