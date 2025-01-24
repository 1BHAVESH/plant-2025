import { ArrowLeft, Home, Leaf, ShoppingBag, User } from 'lucide-react';
import { CiShoppingCart, CiUser } from "react-icons/ci";
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCond } from '@/redux/conSlice';
import { useNavigate } from 'react-router-dom';

const RightSidebar = () => {
  const navigate = useNavigate();
  const { con } = useSelector((store) => store.con); // Redux state for sidebar visibility
  const dispatch = useDispatch();
  const { orders } = useSelector((store) => store.orders);

  // Toggle sidebar visibility
  const conditionHandler = () => {
    dispatch(setCond(false)); // Hide sidebar
  };

  // Handle navigation on sidebar item click
  const sidebarHandler = (text) => {
    if (text === "About") {
      navigate("/about");
    }

    if(text == "Own Plants"){
        navigate("/my_plant")
    }

    if(text == "Home"){
      navigate("/")
  }

  if(text == "Orders"){
    navigate("/orders")
  }
    // Add other navigation logic for other items if needed
  };

  const SideBarItems = [
    { icon: <Home />, text: "Home" },
    { icon: <ShoppingBag />, text: `Orders` },
    { icon: <User />, text: "About" },
    
    { icon: <Leaf />, text: "Own Plants" },
  ];

  return (
    <div
      className={`fixed top-16 right-0 px-4 bg-white border-l border-b border-green-600 w-[16%] h-[50vh] transition-transform duration-300 ${
        con ? 'translate-x-0' : 'translate-x-full'
      } z-30`} // z-index to ensure the sidebar appears above other content
    >
      {/* Backdrop when sidebar is open */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 transition-opacity duration-300 ${con ?'opacity-0 pointer-events-none' :  'opacity-100'}`}
        onClick={conditionHandler} // Close sidebar when clicking on the backdrop
      />
      
      <div className="flex flex-col">
        {/* Sidebar Toggle Arrow */}
        <div className="flex items-center justify-center relative">
          <ArrowLeft onClick={conditionHandler} className="absolute -left-2 top-11 cursor-pointer" />
          <img src="/plant_orbit_copy-removebg-preview.webp" alt="Plant" className="w-[9rem] h-[5rem]" />
        </div>

        {/* Sidebar Items */}
        <div>
          {SideBarItems.map((item, index) => (
            <div
              onClick={() => sidebarHandler(item.text)} // Call function on click
              key={index}
              className="flex relative items-center gap-3 hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3"
            >
              {item.icon}
              <span className="gap-3">{item.text}</span>
              <span className=" font-semibold">{`${item.text == "Orders" && orders ? orders.length : ""}`}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
