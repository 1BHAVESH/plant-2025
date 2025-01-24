import React, { useRef, useState } from "react";
import Header from "./Header";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { SelectGroup } from "@radix-ui/react-select";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setPlants } from "@/redux/plantsSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { converIntoDataUrl } from "@/lib/utils";
import RichTextEditor from "./RichTextEditor";

const NewPlant = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const { plants } = useSelector((store) => store.plants);
  console.log(plants);
  const dispatch = useDispatch();
  const imageRef = useRef();
  const [input, setInput] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    description:""
  });

  const fileChangeHandler = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, image: file });
      setFile(file);

      const dataUrl = await converIntoDataUrl(file);

      setSelectedImage(dataUrl);
    }
  };

  const creatPlantHandlr = async () => {
    console.log(input);

    try {
      const formData = new FormData();

      formData.append("name", input.name);
      formData.append("price", input.price);
      formData.append("category", input.category);
      formData.append("description", input.description)
      

      if (input.image) {
        formData.append("image", input.image);
      }

      const res = await axios.post(
        "http://localhost:3001/api/v1/plant/create_plant",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      // const res = await axios.post(
      //     "https://plant-2yxz.onrender.com/api/v1/plant/create_plant",
      //     formData,
      //     {
      //       headers: {
      //         "Content-Type": "multipart/form-data",
      //       },
      //       withCredentials: true,
      //     }
      //   );
      console.log(res);
      if (res.data.success) {
        dispatch(setPlants([res.data.plant, ...plants]));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <Header />
      <div className="flex flex-col items-center justify-center max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-serif text-center text-[#333] mb-8">
          List Your Own Plant
        </h1>
        {selectedImage && (
          <div className="w-full h-[400px] flex items-center justify-center mb-4">
            <img
              src={selectedImage}
              className="object-contain w-full h-full rounded-md"
            />
          </div>
        )}
        <div className="bh space-y-6 w-full">
          {/* Image Upload */}
          <div className="flex flex-col items-center w-full">
            <input
              ref={imageRef}
              onChange={fileChangeHandler}
              type="file"
              className="hidden"
            />
            <Button
              onClick={() => imageRef?.current.click()}
              className="bg-[#0095f6] text-white px-4 py-2 rounded-md hover:bg-blue-500 focus:outline-none"
            >
              Select Image
            </Button>
          </div>

          {/* Plant Name */}
          <div className="flex flex-col space-y-2 w-full">
            <Label>Plant Name</Label>
            <input
              type="text"
              value={input.name}
              onChange={(e) =>
                setInput((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                }))
              }
              placeholder="Enter plant name"
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Price */}
          <div className="flex flex-col space-y-2 w-full">
            <Label>Price</Label>
            <input
              type="text"
              value={input.price}
              onChange={(e) =>
                setInput((prevState) => ({
                  ...prevState,
                  price: e.target.value,
                }))
              }
              placeholder="Enter plant price"
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
             <Label htmlFor="decription">Decription</Label>
             <RichTextEditor
              input={input}
              setInput={setInput}
             
            />
          </div>

          {/* Category */}
          <div className="flex flex-col space-y-2 w-full">
            <Label>Category</Label>
            <Select
              value={input.category}
              onValueChange={(value) =>
                setInput((prevState) => ({ ...prevState, category: value }))
              }
            >
              <SelectTrigger className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select Category</SelectLabel>
                  <SelectItem value="flower">Flower</SelectItem>
                  <SelectItem value="indoorplant">Indoor Plant</SelectItem>
                  <SelectItem value="outdoorplant">Outdoor Plant</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center w-full">
            <Button
              onClick={creatPlantHandlr}
              className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-400 focus:outline-none"
            >
              List Plant
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPlant;
