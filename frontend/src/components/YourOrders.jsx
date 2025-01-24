import React from "react";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { setOrder } from "@/redux/ordersSlice";
import ProductCard from "./Home/ProductCard";

const YourOrders = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((store) => store.orders);
  console.log(orders);

  dispatch(setOrder(true));

  return (
    <div>
      <Header />
      <div className="">
        <div className="flex justify-center text-4xl font-serif text-black mt-14 mb-2">
          <h1 className="font-dancing-script  text-4xl">My Orders</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full px-8">
          {orders &&
            orders.map((plant) => (
              <ProductCard
                key={plant?._id}
                id={plant?._id}
                image={plant?.image}
                originalPrice={plant?.price}
                name={plant?.pname}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default YourOrders;
