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
import { toast } from "sonner";
import { Flag } from "lucide-react";

const EditPlant = () => {
  let isLoading = false
  const { edit } = useSelector((store) => store.selectedEdit);
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const { plants } = useSelector((store) => store.plants);
  const dispatch = useDispatch();
  const imageRef = useRef();
  const [input, setInput] = useState({
    name: edit.name,
    price: edit.price,
    category: edit.category,
    image: "",
    description: edit.description
  });

  console.log(edit)

  const fileChangeHandler = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, image: file });
      setFile(file);
      const dataUrl = await converIntoDataUrl(file);
      setSelectedImage(dataUrl);
    }
  };

  const editPlantHandler = async () => {
    try {
      console.log(input.description)
      let desc = true
      if(input.description === "<p>No description provided.</p>") desc = false
      isLoading = true
      const formData = new FormData();
      formData.append("name", input.name || edit.name);
      formData.append("price", input.price || edit.price);
      formData.append("category", input.category || edit.category);
      if(desc) formData.append("description", input.description)
      if (input.image) formData.append("image", input.image);

      const res = await axios.post(
        `http://localhost:3001/api/v1/plant/${edit.id}/edit`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

     

      if (res.data.success) {
        const updatedPlants = plants.filter((plant) => plant._id !== edit.id);
        dispatch(setPlants([res.data.plant, ...updatedPlants]));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-center"
      })
    }
    finally{
      isLoading = false
    }
  };

  return (
    <div className="">
      <Header />
      <div className="flex flex-col items-center max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-serif text-center text-green-800 mb-8">
          Edit Your Plant
        </h1>

        {edit.image && (
          <div className="flex flex-col items-center mb-6">
            <p className="text-xl text-gray-500 mb-2">Current Image</p>
            <img
              src={edit.image}
              alt="Current Plant"
              className="w-32 h-32 object-cover rounded-full border border-gray-300"
            />
          </div>
        )}

        {selectedImage && (
          <div className="w-full h-[300px] mt-6 flex flex-col items-center justify-center mb-4">
            <p className="text-xl text-black mb-2">Selected Image</p>
            <img
              src={selectedImage}
              alt="New Plant"
              className="object-contain w-full h-full rounded-md my-4"
            />
          </div>
        )}

        <div className="space-y-6 w-full">
          <div className="flex flex-col items-center">
            <input
              ref={imageRef}
              onChange={fileChangeHandler}
              type="file"
              className="hidden"
            />
            <Button
              onClick={() => imageRef?.current.click()}
              className="bg-blue-500 text-white px-4 py-2 my-4 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Select Image
            </Button>
          </div>

          <div className="flex flex-col space-y-2">
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

          <div className="flex flex-col space-y-2">
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

          <div className="flex flex-col space-y-2">
            <Label>Category</Label>
            <Select
            defaultValue
              value={input.category || edit.category}
              onValueChange={(value) =>
                setInput((prevState) => ({ ...prevState, category: value }))
              }
            >
              <SelectTrigger className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
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

          <div className="flex justify-center">
           {
            isLoading ? (
              <Button className="mr-2 h-4 w-4 animate-spin">please wait</Button>
            ) : (
              <Button
              onClick={editPlantHandler}
              className="bg-green-500 text-black px-6 py-3 rounded-md hover:bg-green-400 focus:outline-none"
            >
              Edit Plant
            </Button>
            )
           }
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPlant;
