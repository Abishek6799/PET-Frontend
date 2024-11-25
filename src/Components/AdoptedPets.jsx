import React, { useEffect, useState } from "react";
import api from "../Services/api";
import { Link } from "react-router-dom";

const AdoptedPets = () => {
  const [pets, setPets] = useState([]);

  const fetchPets = async () => {
    try {
      const response = await api.get("/pet/shelterPets?status=adopted");
      setPets(response.data.pets);
    } catch (error) {
      console.error("Error fetching adopted pets:", error);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  if (!pets || pets.length === 0) {
    return <div className="text-center text-xl font-bold text-gray-500 mt-12">No adopted pets</div>;
  }

  return (
    <div className="bg-gradient-to-r from-green-400 via-lime-500 to-teal-500 min-h-screen py-12 px-4">
      <div className="container mx-auto">
        <h2 className="text-center text-4xl font-bold text-white mb-8">Adopted Pets</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {pets.map((pet) => (
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

export default AdoptedPets;
