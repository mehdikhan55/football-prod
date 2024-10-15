import React, { useState } from "react";
import GroundCard from "../../components/ground/groundCard";
import { dummyGroundData } from "./dummyGroundData"; // Assuming you have this file
import EditGroundForm from "../../components/ground/editGroundForm";
import AdminSiderbar from "../../components/sidebar/sidebar";

const EditGroundPage = () => {
    const [grounds, setGrounds] = useState(dummyGroundData);
    const [selectedGround, setSelectedGround] = useState(null); // State to hold the ground selected for editing

    const handleEdit = (ground) => {
        console.log("ground", ground);
        setSelectedGround(ground);
    };

    const handleSubmit = (updatedGround) => {
        setGrounds(grounds.map((ground) => (ground.id === updatedGround.id ? updatedGround : ground)));
        setSelectedGround(null);
    };

    return (
        <div className="pt-16 pb-16">
            <AdminSiderbar />
            <div className="pt-10 flex flex-col justify-start  gap-4 w-[90%] mx-auto relative">
                {selectedGround && <div className="absolute top-0 left-0 border border-primary border-2 rounded-md p-1 text-center bg-primary text-white cursor-pointer"
                    onClick={() => setSelectedGround(null)}
                >
                    {"<Back"}
                </div>
                }
                {selectedGround ? (
                    <EditGroundForm groundData={selectedGround} onSubmit={handleSubmit} />
                ) : (
                    <div className="flex flex-col gap-4">
                        {grounds.length > 0 ? (
                            grounds.map((ground) => (
                                <GroundCard key={ground.id} ground={ground} onEdit={handleEdit} type="edit" />
                            ))
                        ) : (
                            <p className="text-gray-500">No grounds available.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditGroundPage;
