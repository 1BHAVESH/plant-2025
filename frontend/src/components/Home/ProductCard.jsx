import { useAddToCart } from "@/hook/useAddToCart";
import { useRemoveFromCart } from "@/hook/useRemoveFromCart";
import { DeleteIcon, EditIcon, LucideDelete } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDeletePlant } from "@/hook/useDeletePlant";
import axios from "axios";
import { setOwnPlansts } from "@/redux/ownPlantSlice";
import { setPlants } from "@/redux/plantsSlice";
import YourPlants from "../YourPlants";
import { setEdit } from "@/redux/editPlantSlice";
import { useOrderCancel } from "@/hook/useOrderCancel";

const ProductCard = ({
  image,
  originalPrice,
  discountedPrice,
  discountPercentage,
  name,
  rating,
  ratingCount,
  id,
  description,
  category,
  orderId
}) => {
  // console.log(description)
  // console.log(category)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const { OwnPlant } = useSelector((store) => store.ownPlants);
  const { order } = useSelector((store) => store.orders);

  const ownPlants = OwnPlant.length > 0 ? true : false;

  const { user } = useSelector((store) => store.user);

  const { cart } = useSelector((store) => store.cart);

  const isCart = user?.cart?.some((item) => item?._id === id);

  const isCarta = cart.some((item) => item?._id === id);

  // `useAddToCart` hook ko call kare aur `addToCart` function return kare
  const { addToCart } = useAddToCart(id);
  const { deletePlant } = useDeletePlant(id);
  const { removeFromCart } = useRemoveFromCart(id);
  const { cancelOrder } = useOrderCancel(id, orderId);

  const handleCardClick = () => {
    navigate(`/plant/${id}`);
  };

  const cartHandler = () => {
    addToCart(); // `addToCart` function ko call karein jo hook se return ho rha hai
  };

  const removeCartHandler = () => {
    removeFromCart();
  };

  const delteHandler = () => {
    deletePlant();
  };

  

const editHandler = (num, catte) => {
  console.log(catte)
console.log(num)
  console.log(category)
  console.log(name)
 
  dispatch(
    setEdit({
      name: name,
      price: originalPrice,
      image: image,
      id: id,
      category: category,
      description: description || "No description provided.",
    })
  );
  navigate(`/${id}/edit_plant`);
};


  const cancelOrderHandler = () => {
    cancelOrder();
  };

  return (
    <div className="productcard w-[300px] mt-6 rounded-lg ml-4 overflow-hidden shadow-lg bg-white border cursor-pointer transform transition-transform hover:scale-105 relative flex flex-col">
      {discountPercentage && (
        <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded-full text-xs">
          Sale
        </div>
      )}

      <img
        className="w-full h-[250px] object-cover"
        src={image}
        alt="Product"
        onClick={handleCardClick}
      />

      <div className="p-4 flex flex-col justify-between flex-grow">
        <h1 className="hover:underline font-semibold hover:text-green-900 text-lg truncate">{name}</h1>

        {ownPlants == true ? "" : order ? "" :  <div className="flex items-center text-yellow-500 text-sm mt-1">
                    {'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}
                    <span className="text-gray-600 ml-2">({ratingCount})</span>
                </div>}

        <div className="flex items-center space-x-2 mt-2">
          {ownPlants == true
            ? ""
            : originalPrice && (
                <p className="text-xl font-bold text-green-700">
                  Rs. {originalPrice}
                </p>
              )}
          {ownPlants == true
            ? ""
            : discountPercentage && (
                <span className="text-red-500 text-sm font-semibold">
                  {discountPercentage}% off
                </span>
              )}
        </div>
        {originalPrice && (
          <p
            className={`text-black text-sm ${
              ownPlants ? "" : order ? "" : "line-through"
            }`}
          >
            Rs. {originalPrice*3}
          </p>
        )}

        {ownPlants ? (
          <div className="flex justify-between mb-5 mt-5">
            <EditIcon onClick={()=> editHandler(id ,category)} className="inline cursor-pointer" />
            <MdDelete
              onClick={delteHandler}
              className="inline text-red-600 cursor-pointer h-[24px] w-[24px]"
            />
          </div>
        ) : (
          ""
        )}

        {ownPlants == true ? (
          ""
        ) : order ? (
          <button
            onClick={cancelOrderHandler}
            className="w-full mt-4 bg-gray-400 text-black font-bold py-2 rounded"
          >
            Cancel Order
          </button>
        ) : isCarta == true ? (
          <button
            className="w-full mt-4 bg-gray-400 text-black font-bold py-2 rounded"
            onClick={removeCartHandler}
          >
            Remove from cart
          </button>
        ) : (
          <button
            className="w-full mt-4 bg-green-800 hover:bg-green-900 text-white font-bold py-2 rounded"
            onClick={cartHandler}
          >
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
