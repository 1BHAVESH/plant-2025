// import React, { useEffect } from "react" 
// import Header from './Header';
// import ProductCard from './Home/ProductCard';
// import { useDispatch, useSelector } from 'react-redux';
// import { setOwnPlansts } from '@/redux/ownPlantSlice';
// import axios from 'axios';

// const YourPlants = () => {
//   // Redux state se OwnPlant ko directly access karo
//   const { OwnPlant } = useSelector((store) => store.ownPlants); 
//   const dispatch = useDispatch();

//   // API se data fetch karke Redux state ko update karo
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         console.log("Jiiiiiiiiiiiiiiiiiiiiiiii")
//         const res = await axios.get("http://localhost:3001/api/v1/plant/my_plants", { withCredentials: true });
//         dispatch(setOwnPlansts(res.data.ownPlants));  // Redux state update karo
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchData();
//   }, []);

//   // useEffect(() => {
//   //   console.log("OwnPlant state updated:", OwnPlant);  // Confirm karo ki state update ho rahi hai
//   // }, [OwnPlant]);  // Jab Redux state update ho, tab yeh run karega
// console.log("hiqqqqqqqqqqqqqqqqqqqqqqqqqq")
//   return (
//     <>
//       <Header />
//       <div className="flex flex-col items-center justify-center">
//         <h1 className="text-3xl font-serif text-green-900">My Plants</h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 ml-10 ">
//           {/* Redux state se OwnPlant ko map karo */}
//           {OwnPlant && OwnPlant.map((plant) => (
//             <ProductCard
//               key={plant._id}
//               id={plant._id}
//               image={plant?.image}
//               originalPrice={plant?.price}
//               name={plant?.pname}
//             />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// export default YourPlants; 

import React, { useEffect, useState } from 'react'
import Header from './Header'
import axios from 'axios'
import ProductCard from './Home/ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { setOwnPlansts } from '@/redux/ownPlantSlice'

const YourPlants = () => {

 
  const {OwnPlant} = useSelector(store => store.ownPlants)

  const plants = OwnPlant

  console.log(OwnPlant)
  console.log(plants)

  const dispatch = useDispatch()

  useEffect(()=> {
    const fetchData = async() => {
      try {
        console.log("maaaaaaaaaaaaaaaaaaaa")

        // const res = await axios.get("http://localhost:3001/api/v1/plant/my_plants", {withCredentials: true})

        const res = await axios.get("http://localhost:3001/api/v1/plant/my_plants", {withCredentials: true})
    
       

        // console.log(res.data.ownPlants)

        dispatch(setOwnPlansts(res.data.ownPlants))
        
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  },[])

  console.log(plants)

  useEffect(() => {
    console.log("OwnPlant state updated:", OwnPlant);
}, [OwnPlant]);

  return (
   <>
   <Header />
   <div className="flex flex-col items-center justify-center">
    <h1 className="text-3xl font-serif text-green-900">My Plants</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 ml-10 ">
        {plants &&
          plants.map((plant) => (
            <ProductCard
              key={plant._id}
              id={plant._id}
              image={plant?.image}
              originalPrice={plant?.price}
              name={plant?.pname}
            
            />
          ))}
      </div>
   </div>
   </>
  )
}

export default YourPlants