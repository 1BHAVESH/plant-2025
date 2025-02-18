import React, { useState } from 'react';
import Header from './Header';
import { useSelector } from 'react-redux';
import { useBuyPlant } from '@/hook/useBuyPlant';
import { useNavigate } from 'react-router-dom';

const PaymentForm = () => {
    const navigate = useNavigate();
    const plant = useSelector((store) => store.plantInfo.plant);
    const { buyPlant } = useBuyPlant(plant._id);

    const [formData, setFormData] = useState({
        cardholderName: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        billingAddress: ''
    });

    const [errors, setErrors] = useState({});

    // Function to format card number with space every 4 digits
    const formatCardNumber = (value) => {
        const cleanedValue = value.replace(/\D/g, ''); // Remove non-digits
        return cleanedValue.replace(/(\d{4})(?=\d)/g, '$1 '); // Add space after every 4 digits
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // If cardNumber, format it with spaces
        if (name === "cardNumber") {
            setFormData({
                ...formData,
                [name]: formatCardNumber(value)
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const validate = () => {
        let errors = {};
        if (!formData.cardholderName) {
            errors.cardholderName = "Cardholder name is required";
        }
        if (!formData.cardNumber) {
            errors.cardNumber = "Card number is required";
        } else if (!/^\d{4} \d{4} \d{4} \d{4}$/.test(formData.cardNumber)) {
            errors.cardNumber = "Card number is invalid (must be 16 digits)";
        }
        if (!formData.expiryDate) {
            errors.expiryDate = "Expiry date is required";
        } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
            errors.expiryDate = "Expiry date is invalid";
        }
        if (!formData.cvv) {
            errors.cvv = "CVV is required";
        } else if (!/^\d{3}$/.test(formData.cvv)) {
            errors.cvv = "CVV is invalid";
        }
        if (!formData.billingAddress) {
            errors.billingAddress = "Billing address is required";
        }
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        // Form submission logic goes here
        console.log("Payment Information:", formData);

        buyPlant({formData});
        navigate("/success");
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
                    {errors.cardholderName && <p className="text-red-500 text-xs">{errors.cardholderName}</p>}

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
                    {errors.cardNumber && <p className="text-red-500 text-xs">{errors.cardNumber}</p>}

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
                            {errors.expiryDate && <p className="text-red-500 text-xs">{errors.expiryDate}</p>}
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
                            {errors.cvv && <p className="text-red-500 text-xs">{errors.cvv}</p>}
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
                    {errors.billingAddress && <p className="text-red-500 text-xs">{errors.billingAddress}</p>}

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
