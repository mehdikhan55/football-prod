import React, { useState } from 'react';
import GroundCard from '../../components/ground/groundCard';
import { dummyGroundData } from './dummyGroundData';
import AdminSiderbar from '../../components/sidebar/sidebar';

const RemoveGround = () => {
    const [grounds, setGrounds] = useState(dummyGroundData);

    const removeGround = (id) => {
        const updatedGrounds = grounds.filter(ground => ground.id !== id);
        setGrounds(updatedGrounds);
    };

    return (
        <div className="pt-2 pb-16">
            <AdminSiderbar />
            <div className="flex flex-col  justify-start h-screen gap-4 w-full p-20 pt-10">
                <h1 className="text-2xl font-bold mb-6">Remove Ground</h1>
                <div className="flex flex-col gap-4">
                    {grounds.length > 0 ? (
                        grounds.map((ground) => (
                            <GroundCard key={ground.id} ground={ground} onRemove={removeGround} />
                        ))
                    ) : (
                        <p className="text-gray-500">No grounds available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RemoveGround;
