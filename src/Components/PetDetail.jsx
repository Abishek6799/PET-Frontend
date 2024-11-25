import React, { useEffect, useState } from "react";
import api from "../Services/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReviewForm from "./ReviewForm";
import PetReviews from "./PetReviews";
import ShelterReviews from "./ShelterReviews";

const PetDetail = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [error, setError] = useState(null);
  const isShelter = localStorage.getItem("role") === "shelter";
  const isUser = localStorage.getItem("role") === "adopter";
  const isFoster = localStorage.getItem("role") === "foster";
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      setError("Pet ID is missing");
      return;
    }

    const fetchPet = async () => {
      try {
        const response = await api.get(`/pet/get/${id}`);
        if (response && response.data) {
          setPet(response.data);
        } else {
          setError("Pet not found");
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetchPet();
  }, [id]);

  

  const handleDelete = async () => {
    try {
      const response = await api.delete(`/pet/delete/${id}`);
      if (response.status === 200) {
        toast.success("Pet deleted successfully");
        navigate("/shelter");
      }
    } catch (error) {
      setError(error.message);
      toast.error("Error deleting pet");
    }
  };

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 text-xl">
        {error}
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-700 text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-300 to-blue-200 py-10">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      
        <div className="relative">
          <img
            src={pet.image || "/default-image.jpg"}
            alt={pet.petname}
            className="w-full h-80  object-cover  "
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 text-white">
            <h1 className="text-3xl font-bold">{pet.petname}</h1>
            <p className="text-lg">{pet.breed}</p>
          </div>
        </div>

       
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col ml-14 justify-center">
              <p className="text-lg font-semibold text-blue-500">
                Age: <span className="text-gray-800">{pet.age}</span>
              </p>
              <p className="text-lg font-semibold text-blue-500">
                Size: <span className="text-gray-800">{pet.size}</span>
              </p>
              <p className="text-lg font-semibold text-blue-500">
                Color: <span className="text-gray-800">{pet.color}</span>
              </p>
              <p className="text-lg font-semibold text-blue-500">
                Gender: <span className="text-gray-800">{pet.gender}</span>
              </p>              
              <p className="text-lg font-semibold text-blue-500">
                Location: <span className="text-gray-800">{pet.location}</span>
              </p>
              <p className="text-lg font-semibold text-blue-500">
                Status: <span className="text-gray-800">{pet.status}</span>
              </p>
              <p className="text-lg font-semibold  text-blue-500">
                Medical History:{" "}<p><span className="text-gray-800">{pet.medicalHistory}</span></p>
                
              </p>
              
              <p className="text-lg font-semibold text-blue-500">
                Description: <span className="text-gray-800">{pet.description}</span>
              </p>
            </div>
            <div className="flex justify-center items-center">
              <img
                src={pet.image || "/default-image.jpg"}
                alt={pet.name}
                className="w-60 h-60 object-cover rounded-full border-4 border-gray-300 shadow-md"
              />
            </div>
          </div>
        </div>

   
        <div className="p-6 bg-gray-100">
          {isUser && (
            <div className="flex flex-col items-center justify-center gap-4">
              <Link to={`/application/${pet._id}/${pet.shelter._id}`}>
                <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300">
                  Adopt Me
                </button>
              </Link>
              <ReviewForm petId={pet._id} shelterId={pet.shelter._id} />
            </div>
          )}

          {isFoster && (
            <div className="flex flex-col items-center justify-center gap-4">
              <Link to={`/create-foster-pet/${pet._id}/${pet.shelter._id}`}>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300">
                  Foster Me
                </button>
              </Link>
              <ReviewForm petId={pet._id} shelterId={pet.shelter._id} />
            </div>
          )}

          {isShelter && (
            <div className="flex gap-4 justify-center">
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300"
                onClick={() => navigate(`/edit-pet/${pet._id}`)}
              >
                Edit Pet
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300"
                onClick={handleDelete}
              >
                Delete Pet
              </button>
            </div>
          )}
        </div>
        

   
        <div className="p-6 bg-white space-y-4">
          
          <div className="my-4">
            <PetReviews petId={pet._id} />
          </div>
          <div className="my-4">
            <ShelterReviews shelterId={pet.shelter._id} petId={pet._id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetail;
