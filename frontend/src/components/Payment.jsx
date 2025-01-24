import React, { useState } from 'react';
import Header from './Header';
import { useSelector } from 'react-redux';
import { useBuyPlant } from '@/hook/useBuyPlant';
import { useNavigate } from 'react-router-dom';

const PaymentForm = () => {
    const navigate = useNavigate()  
  const plant = useSelector((store) => store.plantInfo.plant);
  const {buyPlant} = useBuyPlant(plant._id)

    const [formData, setFormData] = useState({
        cardholderName: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        billingAddress: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Form submission logic goes here
        console.log("Payment Information:", formData);

        buyPlant()
        navigate("/success")
    };

    return (
     <div>
        <Header />
        <div className="max-w-md mx-auto mt-10 p-8 border border-gray-200 rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl font-semibold mb-6 text-center">Payment Information</h2>
            
            <form onSubmit={handleSubmit}>
                {/* Cardholder Name */}
                <label className="block mb-2 text-sm font-medium text-gray-600" htmlFor="cardholderName">Cardholder Name</label>
                <input
                    type="text"
                    id="cardholderName"
                    name="cardholderName"
                    value={formData.cardholderName}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="Enter name as on card"
                    required
                />

                {/* Card Number */}
                <label className="block mt-4 mb-2 text-sm font-medium text-gray-600" htmlFor="cardNumber">Card Number</label>
                <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="1234 5678 9123 4567"
                    required
                />

                {/* Expiry Date & CVV */}
                <div className="flex space-x-4 mt-4">
                    <div className="w-1/2">
                        <label className="block mb-2 text-sm font-medium text-gray-600" htmlFor="expiryDate">Expiry Date</label>
                        <input
                            type="text"
                            id="expiryDate"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                            placeholder="MM/YY"
                            required
                        />
                    </div>
                    <div className="w-1/2">
                        <label className="block mb-2 text-sm font-medium text-gray-600" htmlFor="cvv">CVV</label>
                        <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                            placeholder="123"
                            required
                        />
                    </div>
                </div>

                {/* Billing Address */}
                <label className="block mt-4 mb-2 text-sm font-medium text-gray-600" htmlFor="billingAddress">Billing Address</label>
                <input
                    type="text"
                    id="billingAddress"
                    name="billingAddress"
                    value={formData.billingAddress}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="Enter billing address"
                    required
                />

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full mt-6 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                    Submit Payment
                </button>
            </form>
        </div>
     </div>
    );
};

export default PaymentForm;
