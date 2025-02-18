import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useplantData } from "../hook/usePlantDetails";
import Header from "./Header";
import { useBuyPlant } from "@/hook/useBuyPlant";
import { useAddToCart } from "@/hook/useAddToCart";
import { useRemoveFromCart } from "@/hook/useRemoveFromCart";
import Cookies from "js-cookie";
import { setPlantQuentity } from "@/redux/productDetailSlice";

const ProductDetails = () => {
  const token = Cookies.get("token");
  console.log(token);
  const navigate = useNavigate();
  const params = useParams();

  useplantData(params.id);
  const { user } = useSelector((store) => store.user);
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch()

  dispatch(setPlantQuentity(quantity))

  const plant = useSelector((store) => store.plantInfo.plant);
  const { cart } = useSelector((store) => store.cart);

  const isInCart = cart.some((item) => item?._id === plant?._id);

  const { buyPlant } = useBuyPlant(plant?._id, quantity);
  const { addToCart } = useAddToCart(plant?._id);
  const { removeFromCart } = useRemoveFromCart(plant?._id);


  const handleBuy = () => navigate("/payment");
  const handleAddToCart = () => addToCart(quantity);
  const handleRemoveFromCart = () => removeFromCart();

  return (
    <>
      <Header />

      <div className="mt-16 max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Plant Image */}
        <div className="flex justify-center items-start">
          <img
            src={plant?.image || "https://via.placeholder.com/360x300"}
            alt={plant?.pname || "Plant Image"}
            className="w-[530px] h-[500px] object-cover rounded-xl shadow-md border border-gray-200"
          />
        </div>

        {/* Right: Price, Actions, and Description */}
        <div className="flex flex-col">
          <h1 className="text-3xl  text-black mb-4">
            {plant?.pname || "Plant Name"}
          </h1>
          <p className="text-xl font-semibold text-green-600 mb-2">✅ In Stock</p>
          <p className="text-2xl font-bold text-gray-800 mb-4">₹{plant?.price || "N/A"}</p>

          <div className="flex items-center space-x-4 mb-4">
            <label className="text-lg font-semibold">Quantity:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.min(4, Math.max(1, e.target.value)))}
              className="w-16 px-2 py-1 border rounded text-center"
              min="1"
              max="4"
            />
          </div>

          <div className="flex flex-col space-y-3">
            {isInCart ? (
              <button
                className="w-full bg-gray-400 text-black font-bold py-2 rounded"
                onClick={handleRemoveFromCart}
              >
                Remove from Cart
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-lg font-semibold"
              >
                🛒 Add to Cart
              </button>
            )}
            <button
              onClick={handleBuy}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-lg font-semibold"
            >
              💳 Buy Now
            </button>
          </div>
          
          {/* Product Description */}
          <div className="mt-6">
            <h2 className="text-xl font-bold text-gray-700 mb-2">Product Description</h2>
            {plant?.description ? (
              <p className="text-gray-700 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: plant?.description }} />
            ) : (
              <div className="text-gray-700 text-lg leading-relaxed">
                <p>
                  "Yeh ek beautiful plant hai jo aapke ghar ya office ko natural aur fresh look deta hai. Iska maintenance bohot easy hai aur yeh air purification ke liye bhi perfect hai."
                </p>
                <ul className="list-disc ml-5 mt-2">
                  <li>🌱 <b>Type:</b> Indoor/Outdoor</li>
                  <li>☀️ <b>Light:</b> Indirect sunlight preferred</li>
                  <li>💧 <b>Watering:</b> Once a week</li>
                  <li>🎍 <b>Benefits:</b> Air purification, stress relief</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
