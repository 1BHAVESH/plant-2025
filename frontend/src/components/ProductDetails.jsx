import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useplantData } from "../hook/usePlantDetails";
import Header from "./Header";
import { useBuyPlant } from "@/hook/useBuyPlant";
import { useAddToCart } from "@/hook/useAddToCart";
import { useRemoveFromCart } from "@/hook/useRemoveFromCart";
import Cookies from "js-cookie";

const ProductDetails = () => {
  const token = Cookies.get("token");
   console.log(token)
  const navigate = useNavigate();
  const params = useParams();

  // Fetch plant data using the custom hook
  useplantData(params.id);
  const {user} = useSelector(store => store.user)

  const plant = useSelector((store) => store.plantInfo.plant);
  const { cart } = useSelector((store) => store.cart);

  const isInCart = cart.some((item) => item?._id === plant?._id);

  const { buyPlant } = useBuyPlant(plant?._id);
  const { addToCart } = useAddToCart(plant?._id);
  const { removeFromCart } = useRemoveFromCart(plant?._id);

  const handleBuy = () => {

   
    navigate("/payment")};
  const handleAddToCart = () => addToCart();
  const handleRemoveFromCart = () => removeFromCart();

  return (
    <>
      {/* Header Section */}
      <Header />

      {/* Product Details Section */}
      <div className="mt-8 max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-0 bg-gradient-to-r from-green-50 via-white to-green-50 rounded-lg shadow-lg">
        {/* Left: Plant Image */}
        <div className="flex justify-center items-center">
          <img
            src={plant?.image || "https://via.placeholder.com/360x300"}
            alt={plant?.pname || "Plant Image"}
            className="w-[400px] h-[350px] object-cover rounded-xl shadow-md border border-gray-200"
          />
        </div>

        {/* Right: Price & Actions */}
        <div className="flex flex-col p-6 bg-white rounded-xl shadow-lg border border-gray-200">
          <h1 className="text-3xl font-extrabold text-green-700 mb-4">
            {plant?.pname || "Plant Name"}
          </h1>
          <p className="text-xl font-semibold text-green-600 mb-2">
            ✅ In Stock
          </p>
          <p className="text-2xl font-bold text-gray-800 mb-4">
            ₹{plant?.price || "N/A"}
          </p>
          <div className="flex flex-col space-y-3">
            {isInCart ? (
              <button
                className="w-full mt-4 bg-gray-400 text-black font-bold py-2 rounded"
                onClick={handleRemoveFromCart}
              >
                Remove from cart
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-lg font-semibold transition duration-200 ease-in-out shadow-sm"
              >
                🛒 Add to Cart
              </button>
            )}
            <button
              onClick={handleBuy}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-lg font-semibold transition duration-200 ease-in-out shadow-sm"
            >
              💳 Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Product Description Section (below payment card) */}
      <div className="max-w-7xl mx-auto p-6 mt-4 bg-white rounded-lg shadow-lg">
        {plant?.description ? (
          <p
            className="text-gray-700 text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: plant?.description }}
          />
        ) : (
          <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
            <p>
              "Yeh ek beautiful plant hai jo aapke ghar ya office ko natural aur fresh look deta hai. Iska maintenance bohot easy hai aur yeh air purification ke liye bhi perfect hai."
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>🌱 <b>Type:</b> Indoor/Outdoor</li>
              <li>☀️ <b>Light:</b> Indirect sunlight preferred</li>
              <li>💧 <b>Watering:</b> Once a week</li>
              <li>🎍 <b>Benefits:</b> Air purification, stress relief</li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetails;
