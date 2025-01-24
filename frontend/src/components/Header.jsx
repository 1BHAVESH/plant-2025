import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { CiShoppingCart, CiUser } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import "../../src/App.css";
import { Home, Leaf, LogOutIcon, MenuIcon, ShoppingBag } from "lucide-react";
import { setCategory, setCond } from "@/redux/conSlice";
import {
  CreditCard,
  Edit,
  LayoutDashboard,
  LogOut,
  Menu,
  School,
  Settings,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const Header = () => {
  const [activePage, setActivePage] = useState("home");
  const { orders } = useSelector((store) => store.orders);
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.user);
  const { cart } = useSelector((store) => store.cart);

  const adminUser =
    user._id === "675afce82ad692851f6f3d57" ||
    user._id === "6761685d920ef8a8bf6e6607";

  // console.log(adminUser)

  console.log(cart);

  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate("/login");
  };

  const sidebarHandler = () => {
    dispatch(setCond(true));
  };

  const pageHnadler = (page) => {

    setActivePage(page);

    if (page == "home") {
     
      dispatch(setCategory("home"));
      navigate("/");
    }
    if (page === "trending") {
      dispatch(setCategory("trending"));
      navigate("/trending");
    }
    if (page == "flower") {
      
      dispatch(setCategory("flower"));
      navigate("/bookes");
    }
    if (page === "indoorplant") {
      dispatch(setCategory("indoorplant"));
      navigate("/indore-plant");
    }
    if (page === "outdoorplant") {
      dispatch(setCategory("outdoorplant"));
      navigate("/outdoor-plant");
    }
  };

  return (
    <div className="sticky">
      {/* Marquee Section */}
      <div className="alig bg-green-950 w-screen text-white h-[4rem] overflow-hidden">
        <div className="animate-marquee whitespace-nowrap text-lg font-medium py-2">
          <span className="mx-4">Welcome to our Plant Shop! 🌿</span>
          <span className="mx-4">Best Deals on Indoor Plants!</span>
          <span className="mx-4">Free Shipping on Orders Over $50!</span>
        </div>
      </div>

      {/* Main Header Content */}
      <div className="flex items-center justify-around sticky h-20 w-screen">
        <Link to="/">
          <img
            src="/public/logo3-02.png"
            className="w-113px h-[200px] justify-left"
            alt="THE PLANTER"
          />
        </Link>
        <div className="flex items-center w-[40rem]">
          <input
            type="text"
            placeholder="Search plants..."
            className="w-full h-10 px-3 rounded-l outline-none bg-gray-300"
          />
          <div className="bg-green-900 p-2 rounded-r h-10 flex items-center">
            <FaSearch className="text-white text-lg cursor-pointer" />
          </div>
        </div>

        <div className="flex items-center justify-between gap-[3rem] relative">
          {adminUser && (
            <Link to="/admin">
              <p className="font-serif text-xl hover:text-black cursor-pointer text-green-800">
                Admin
              </p>
            </Link>
          )}

          {/* <p>
            <CiUser
              onClick={navigateHandler}
              className="text-4xl cursor-pointer"
            />
          </p> */}

          <Popover>
            <PopoverTrigger asChild>
              <div className="relative">
                <CiShoppingCart className="text-4xl cursor-pointer" />
                {/* Badge for cart item count */}
                {cart?.length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </div>
            </PopoverTrigger>
            {cart?.length > 0 && (
              <PopoverContent>
                <div>
                  {cart.map((plant) => (
                    <div key={plant._id}>
                      <Link className='cart' to={`/plant/${plant._id}`} >
                      <div
                        className="flex cursor-pointer items-center my-2.5 gap-2.5 "
                        key={plant?._id}
                      >
                        <Avatar>
                          <AvatarImage src={plant?.image} />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p className="text-sm">
                          <span className="font-bold">{plant?.pname}</span>
                        </p>
                      </div>
                    </Link>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            )}
          </Popover>
          <div className="">
            <DropdownMenu className="h-4">
              <DropdownMenuTrigger asChild>
                <MenuIcon className="cursor-pointer " />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 h-36 mt-6 mr-4">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Home className="font-semibold size-4" />
                    <span className="">
                      <Link to="/">Home</Link>
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ShoppingBag />
                    <span>
                      <Link to="/orders">Orders {orders?.length}</Link>
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOutIcon />
                    <span>
                      <Link to="/login">Logout</Link>
                    </span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="navdiv flex items-center w-screen">
        <div className="sale">
          <span className="divsale">
            &nbsp;&nbsp;SALE :- comming soon..&nbsp;&nbsp;
          </span>
        </div>
        <div className="navb">
          <p className={ `cursor-pointer ${activePage==="home" ? "text-white" : "text-red"} hover:text-white hover:underline ease-in-out duration-100 hover:tracking-wide`} onClick={() => pageHnadler("home")}>
            Home
          </p>
          <p
            className={ `cursor-pointer ${activePage==="flower" ? "text-white" : "text-red"} hover:text-white hover:underline ease-in-out duration-100 hover:tracking-wide`} 
            onClick={() => pageHnadler("flower")}
          >
            Bouquet
          </p>
          <p
           className={ `cursor-pointer ${activePage==="indoorplant" ? "text-white" : "text-red"} hover:text-white hover:underline ease-in-out duration-100 hover:tracking-wide`} 
            onClick={() => pageHnadler("indoorplant")}
          >
            Indoor
          </p>
          <p
            className={ `cursor-pointer ${activePage==="outdoorplant" ? "text-white" : "text-red"} hover:text-white hover:underline ease-in-out duration-100 hover:tracking-wide`}
            onClick={() => pageHnadler("outdoorplant")}
          >
            Outdoor
          </p>
          <p
            className="ph cursor-pointer"
            onClick={() => pageHnadler("aboutUs")}
          >
            About us
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
