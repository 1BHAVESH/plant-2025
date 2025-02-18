import React from "react";
import Header from "../Header";
import ProductCard from "./ProductCard";
import AnimationSVG from "../../components/AnimationSvg.jsx";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { useGetAllPlants } from "@/hook/useGetAllPlants";
import { useDispatch, useSelector } from "react-redux";
import { setOwnPlansts } from "@/redux/ownPlantSlice";
import { setOrder } from "@/redux/ordersSlice";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const naviagte = useNavigate()
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  useGetAllPlants();
  const { plants } = useSelector((store) => store.plants);
  const { user } = useSelector((store) => store.user);

  dispatch(setOrder(false));
  dispatch(setOwnPlansts([]));

  return (
    <>
      <Header />
      <div className="hero flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-green-100 to-[#f8dcaab8] w-full p-8 w-screen">
        {/* Image Column */}
        <div className="md:w-1/2 flex justify-center p-4">
          <img
            src="/public/header-images.webp"
            alt="Plants"
            className="w-full max-w-[727px] h-[490px] rounded-xl shadow-lg"
          />
        </div>

        {/* Content Column */}
        <div className="hero md:w-1/2 mt-5 md:mt-0 ml-10 border-l-8 border-l-yellow-500 flex flex-col justify-center p-4 text-center md:text-left space-y-6">
          <h2 className="text-2xl font-semibold text-black flex items-center justify-center md:justify-start">
            Welcome &nbsp;<span className="usern">{user?.name}!</span>
          </h2>
          <h1 className="text-6xl md:text-7xl font-extrabold text-green-800 flex items-center justify-center md:justify-start space-x-4">
            <span>THE PLANTER</span>
            <AnimationSVG className="h-[50px] w-[50px]" />
          </h1>

          <p className="text-xl md:text-2xl mb-5 text-gray-800 font-semibold">
            Welcome to <span className="text-green-900">THE PLANTER</span> :
            Where Green Dreams Come True!
          </p>

          <p className="text-lg md:text-xl text-gray-700">
            Explore our lush collection of plants to elevate your living space.
            From vibrant succulents to elegant ferns, find the perfect green
            companions to breathe life into your home.
          </p>
          <p className="mb-5 text-2xl mt-5 text-gray-800 font-semibold">
            Let's grow together!
          </p>
          <button className="bg-green-900 text-white flex items-center justify-center w-44 p-3 rounded-lg hover:bg-green-700 transition duration-300 ease-in-out shadow-xl">
            Learn More <MdOutlineArrowRightAlt className="ml-2" />
          </button>
        </div>
      </div>

      {/* Rolling Plants Section */}
      <div className="overflow-hidden mt-10">
        <div className="flex animate-scroll gap-10 max-w-7xl mx-auto">
          {plants &&
            plants.map((plant, index) => (
              <img
                onClick={() => naviagte(`/plant/${plant._id}`)}
                key={index}
                src={plant.image}
                alt={plant.pname}
                className="w-40 h-40 object-cover cursor-pointer rounded-full shadow-lg"
              />
            ))}
          {/* Repeat for seamless scrolling */}
          {plants &&
            plants.map((plant, index) => (
              <img
              onClick={() => naviagte(`/plant/${plant._id}`)}
                key={index + "repeat"}
                src={plant.image}
                alt={plant.pname}
                className="w-40 h-40 object-cover rounded-full shadow-lg"
              />
            ))}
        </div>
      </div>
      <div className="flex justify-center text-4xl font-serif text-black mt-8 mb-2">
        <h1 className="font-dancing-script  text-4xl">Our Best Bouquet</h1>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full px-8w-screen">
        {plants &&
          plants.map((plant) => {
            return plant.category === "flower" ? (
              <ProductCard
                key={plant._id}
                id={plant._id}
                category={plant.category}
                image={plant?.image}
                originalPrice={plant?.price}
                name={plant?.pname}
                discountedPrice={55} // Adjust as necessary
                discountPercentage={60} // Adjust as necessary
                rating={4} // Adjust as necessary
                ratingCount={5} // Adjust as necessary
                description={plant?.description}
              />
            ) : (
              ""
            );
          })}
      </div>
      <div className="flex flex-col items-center my-8 bg-emerald-100 text-green-800 p-8 w-screen">
        <h1 className="text-4xl font-dancing-script font-bold">
          Our Best Plants
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full mt-6">
          {plants &&
            plants.map((plant) =>
              plant.category === "indoorplant" ? (
                <ProductCard
                  key={plant._id}
                  id={plant._id}
                  image={plant?.image}
                  originalPrice={plant?.price}
                  name={plant?.pname}
                  discountedPrice={55} // Adjust as necessary
                  discountPercentage={60} // Adjust as necessary
                  rating={4} // Adjust as necessary
                  ratingCount={5} // Adjust as necessary
                  description={plant?.description}
                  category={plant.category}
                />
              ) : (
                ""
              )
            )}
        </div>
      </div>

      {/* Final Best Plants Section with Another Background Color */}
      <div className="flex flex-col items-center my-8 bg-[#C0EBA6] text-green-800 p-8 w-screen">
        <h1 className="text-3xl font-dancing-script">OutDoor Plants</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full mt-6">
          {plants &&
            plants.map((plant) =>
              plant.category === "outdoorplant" ? (
                <ProductCard
                  key={plant._id}
                  id={plant._id}
                  image={plant?.image}
                  originalPrice={plant?.price}
                  name={plant?.pname}
                  discountedPrice={55} // Adjust as necessary
                  discountPercentage={60} // Adjust as necessary
                  rating={4} // Adjust as necessary
                  ratingCount={5} // Adjust as necessary
                  description={plant?.description}
                  category={plant.category}
                />
              ) : (
                ""
              )
            )}
        </div>
      </div>
    </>
  );
};

export default Hero;
