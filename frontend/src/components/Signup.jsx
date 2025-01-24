import React, { useState } from "react";
import { Label } from "./ui/label";
import {Input} from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner"; 
import { Link, useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

    const [input, setInput] = useState({
        name:"",
        email:"",
        password:"",
    })

    const [errors, setErrors] = useState({});

    const changeHandler = (e) => {

        setInput({...input, [e.target.name]: e.target.value})

       
    }

    const validate = () => {
      let errors = {};
      if (!input.name) {
        errors.name = "Name is required";
      }
      if (!input.email) {
        errors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(input.email)) {
        errors.email = "Email address is invalid";
      }
      if (!input.password) {
        errors.password = "Password is required";
      } else if (input.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
      }
      return errors;
    };

    const signupHandler = async(e)=>{
        e.preventDefault()

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }

        try {

            const res = await axios.post("http://localhost:3001/api/v1/users/register", input, {
                headers:{
                    'Content-Type': "application/json",
                },

                withCredentials: true
            })

          //   const res = await axios.post("https://plant-2yxz.onrender.com/api/v1/users/register", input, {
          //     headers:{
          //         'Content-Type': "application/json",
          //     },

          //     withCredentials: true
          // })


            console.log(res)
            
            if(res.data.success){

              navigate("/login")

                toast.success(res.data.message)

                setInput({
                    name:"",
                    email:"",
                    password:"",
                })


            }

            setInput({
                name:"",
                email:"",
                password:"",
            })
        } catch (error) {
          console.log(error)
            console.log(error.response.data.message)
            toast.error(error.response.data.message, {
              position: "top-center"
            })

            setInput({
                name:"",
                email:"",
                password:"",
            })
        }
    }

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <form onSubmit={signupHandler} className="shadow-lg flex flex-col gap-5 p-8">
        <div className="my-4">
          <h1 className="text-center font-bold text-xl">Logo</h1>
          <p className="text-sm text-center my-1">Sign up to see photos and videos from your friends.</p>
        </div>
        <div>
        <Label>name</Label>
        <Input type="text" name="name" maxlength="25" onChange={changeHandler} className="focus-visible:ring-2 my-2 border-black" value={input.name} />
        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
        </div>
        <div>
          <Label>email</Label>
          <Input type="email" name="email" onChange={changeHandler} value={input.email} className="focus-visible:ring-2 my-2 border-black" />
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
        </div>
        <div>
          <Label>password</Label>
          <Input type="password" name="password" onChange={changeHandler} value={input.password} className="focus-visible:ring-2 border-black my-2" />
          {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
        </div>
        <Button type="submit">Signup</Button>
        <span className="text-center">Already Have an Account ? <Link to="/login" className="text-blue-500">Login</Link></span>
      </form>
    </div>
  );
}

export default Signup;
