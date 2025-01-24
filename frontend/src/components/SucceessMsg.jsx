import React from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';

const SuccessMessage = ({ }) => {
  return (
  <>
  <Header />
  <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-green-600">Order Placed Successfully!</h2>
        <p className="mt-4 text-lg text-gray-700">Thanks For Buying From Us</p>
        <div className="mt-6">
          <p className="text-md text-gray-500">Thank you for choosing us! Your order is being processed and will reach you shortly.</p>
          <p className="mt-2 text-md text-gray-500">We hope you enjoy your plants and the freshness they bring to your space!</p>
          <p className="mt-2 text-md text-gray-500">If you have any questions, feel free to reach out. We’re always here to help!</p>
        </div>
      <Link to="/"><p className='text-green-600'>Go To Home {`->`} </p></Link>
      </div>
    </div>
  </>
  );
};

export default SuccessMessage;
