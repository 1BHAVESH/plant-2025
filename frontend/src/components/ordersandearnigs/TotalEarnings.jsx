import React, { useEffect, useState } from 'react';
import Header from '../Header';
import axios from 'axios';

const TotalEarnings = () => {
    const [earnings, setEarnings] = useState(500);

    useEffect(() => {
        const fetchEarnings = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/v1/admin/total-earnings', {withCredentials: true});
                console.log(response)
                if(response.data.success){
                    setEarnings(response.data.totalEarnings);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchEarnings();
    }, []);

    return (
        <div>
            <Header />
           <div className='mt-14 max-w-7xl mx-auto'>
           <h1 className="text-3xl font-semibold">Total Earnings</h1>
           {earnings ? <p className='text-xl'>Rs. {earnings}</p> : <p>Loading...</p>}
           </div>
        </div>
    );
};

export default TotalEarnings;