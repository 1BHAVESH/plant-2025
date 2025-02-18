import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import Hero from './components/Home/Hero'
import {BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider} from "react-router-dom"
import ProductDetails from './components/ProductDetails'
import Login from './components/Login'
import Signup from './components/Signup'
import NewPlant from './components/NewPlant'
import MainLayout from './components/MainLayout'
import About from './components/About'
import YourPlants from './components/YourPlants'
import EditPlant from './components/EditPlant'
import YourOrders from './components/YourOrders'
import SuccessMessage from './components/SucceessMsg'
import PaymentForm from './components/Payment'
import { useSelector } from 'react-redux'
import { Hourglass } from 'react-loader-spinner'
import Admin from './components/Admin'

import TrendingPage from './components/TrendingPage'
import SectionPage from './components/SectionPage'
import TotalEarnings from './components/ordersandearnigs/TotalEarnings'
import { ProctedRoute } from './components/ui/protectedRoute'

const browserRouter = createBrowserRouter([

  {
    path: "/",
    element: <MainLayout />,
    children:[
      {
        path: "/",
        element: <Hero />
      },
      {
        path: "/plant/:id",
        element: <ProctedRoute><ProductDetails /></ProctedRoute>
      },
      {
        path: "/new_plant",
        element: <NewPlant />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/my_plant",
        element: <YourPlants />
      },
      {
        path: "/:id/edit_plant",
        element: <EditPlant />
      },
      {
        path: "/orders",
        element: <YourOrders />
      },
      {
        path: "/success",
        element: <SuccessMessage />
      },
      {
        path: "/payment",
        element: <PaymentForm />
      },
      {
        path: "/admin",
        element: <Admin />
      },
      {
        path: "/total-earnings",
        element: <TotalEarnings />
      },
      {
        path: "/trending",
        element: <TrendingPage />,
      },
      {
        path: "/bookes",
        element: <SectionPage />,
      },
      {
        path: "/indore-plant",
        element: <SectionPage />,
      },
      {
        path: "/outdoor-plant",
        element: <SectionPage />,
      },
     
      
    ]
  },
  {
    path:"/login",
    element:<Login />
  },
  {
    path:"/signup",
    element:<Signup />
  }


])

function App() {
  const { load } = useSelector(store => store.load);

  
  

  return (
   <>

   { <RouterProvider router={browserRouter} />}

   </>
   
  )
}

export default App
