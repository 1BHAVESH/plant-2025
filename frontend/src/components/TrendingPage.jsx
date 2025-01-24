import React from 'react'
import Header from './Header'
import { useSelector } from 'react-redux';
import ProductCard from './Home/ProductCard';

const TrendingPage = () => {
  const { plants } = useSelector((store) => store.plants);

  const {category} = useSelector((store) => store.con)

  console.log(category)

  

  console.log(plants.slice(0,3))

  return (
    <div>
      <Header />
      <div>
      <div className="flex flex-col items-center my-8  text-green-800 p-8">
        <h1 className="text-4xl font-dancing-script font-bold">Trending</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full mt-6">
        {plants &&
           plants
           .filter((plant) => plant.category === "indoorplant")
           .slice(0, 4) // Adjust range as needed
           .map((plant) => (
             <ProductCard
               key={plant._id}
               id={plant._id}
               image={plant?.image}
               originalPrice={plant?.price}
               name={plant?.pname}
               discountedPrice={55}
               discountPercentage={60}
               rating={4}
               ratingCount={5}
               description={plant?.description}
               category={plant.category}
             />
           ))}
           {plants &&
           plants
           .filter((plant) => plant.category === "flower")
           .slice(0, 4) // Adjust range as needed
           .map((plant) => (
             <ProductCard
               key={plant._id}
               id={plant._id}
               image={plant?.image}
               originalPrice={plant?.price}
               name={plant?.pname}
               discountedPrice={55}
               discountPercentage={60}
               rating={4}
               ratingCount={5}
               description={plant?.description}
               category={plant.category}
             />
           ))}
            {plants &&
           plants
           .filter((plant) => plant.category === "outdoorplant")
           .slice(0, 4) // Adjust range as needed
           .map((plant) => (
             <ProductCard
               key={plant._id}
               id={plant._id}
               image={plant?.image}
               originalPrice={plant?.price}
               name={plant?.pname}
               discountedPrice={55}
               discountPercentage={60}
               rating={4}
               ratingCount={5}
               description={plant?.description}
               category={plant.category}
             />
           ))}
         
        </div>
      </div>
      </div>
    </div>
  )
}

export default TrendingPage