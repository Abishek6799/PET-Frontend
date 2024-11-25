import React, { useEffect, useState } from "react";
import api from "../Services/api";
import { Link } from "react-router-dom";

const ShelterDashboard = () => {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]); 
  const [statusFilter, setStatusFilter] = useState("available");
  const fetchPets = async () => {
    try {
      const response = await api.get("/pet/shelterPets");
      setPets(response.data.pets);
      setFilteredPets(response.data.pets); 
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  useEffect(() => {
   
    const filtered = pets.filter(pet => pet.status === statusFilter);
    setFilteredPets(filtered);
  }, [statusFilter, pets]);

  if (!filteredPets || filteredPets.length === 0) {
    return <div className="text-center text-xl font-bold text-gray-500 mt-12">No pets to display.</div>;
  }

  return (
    <div className="bg-gradient-to-r from-green-400 via-lime-500 to-teal-500 min-h-screen py-12 px-4">
      <div className="container mx-auto">
        <h2 className="text-center text-4xl font-bold text-blue-700 mb-8">Pets</h2>

      
        <div className="text-center mb-8">
          <button
            onClick={() => setStatusFilter("available")}
            className={`inline-block px-6 py-3 mx-2 rounded-lg transition duration-300 ${statusFilter === "available" ? "bg-green-600" : "bg-green-500"}`}
          >
            Available Pets
          </button>
          <button
            onClick={() => setStatusFilter("adopted")}
            className={`inline-block px-6 py-3 mx-2 rounded-lg transition duration-300 ${statusFilter === "adopted" ? "bg-teal-600" : "bg-teal-500"}`}
          >
            Adopted Pets
          </button>
          <button
            onClick={() => setStatusFilter("fostered")}
            className={`inline-block px-6 py-3 mx-2 rounded-lg transition duration-300 ${statusFilter === "fostered" ? "bg-yellow-600" : "bg-yellow-500"}`}
          >
            Fostered Pets
          </button>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredPets.map((pet) => (
            <div
              key={pet._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
             
              <div className="relative h-48 bg-gray-100">
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase shadow">
                  {pet.status}
                </div>
              </div>

             
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">{pet.name}</h3>
                <p className="text-sm text-gray-600">
                  <span className="font-bold">Breed:</span> {pet.breed}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-bold">Size:</span> {pet.size}
                </p>
              </div>

             
              <div className="px-4 pb-4">
                <Link
                  to={`/pet/${pet._id}`}
                  className="inline-block text-center w-full py-2 bg-blue-500 text-white font-bold rounded-lg shadow hover:bg-blue-600 transition duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShelterDashboard;
