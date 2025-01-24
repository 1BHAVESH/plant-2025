import React from 'react'
import Header from './Header'
import { useSelector } from 'react-redux';
import ProductCard from './Home/ProductCard';

const SectionPage = () => {
  const { plants } = useSelector((store) => store.plants);

  const {category} = useSelector((store) => store.con)

  console.log(category)

  

  console.log(plants.slice(0,3))

  return (
    <div>
      <Header />
      <div>
      <div className="flex flex-col items-center my-8  text-green-800 p-8">
        <h1 className="text-4xl font-dancing-script font-bold">{category.toUpperCase()}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full mt-6">
        {plants &&
            plants.map((plant) => {
              
              return (plant.category === category ? (<ProductCard
                key={plant._id}
                id={plant._id}
                category={plant.category}
                image={plant?.image}
                originalPrice={plant?.price}
                name={plant?.pname}
                discountedPrice={55} // Adjust as necessary
                discountPercentage={60} // Adjust as necessary
                rating={4} // Adjust as necessary
                ratingCount={5} // Adjust as necessary
                description={plant?.description}
              />) : "")
            })}
         
        </div>
      </div>
      </div>
    </div>
  )
}

export default SectionPage