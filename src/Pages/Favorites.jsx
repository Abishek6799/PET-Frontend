import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../Services/api";
import { toast } from "react-toastify";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);


  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const response = await api.get("/favorites/get");
      setFavorites(response.data);
    } catch (err) {
      console.error("Error fetching favorites:", err);
      toast.error("Failed to load favorites.");
    } finally {
      setLoading(false);
    }
  };


  const removeFavorite = async (favoriteId) => {
    try {
      await api.delete(`/favorites/delete/${favoriteId}`);
      toast.success("Removed from favorites!");
      fetchFavorites(); 
    } catch (error) {
      toast.error("Error removing favorite.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-teal-700 text-center mb-10">
          Your Favorite Pets
        </h1>
        {loading ? (
          <p className="text-center text-teal-600">Loading your favorites...</p>
        ) : favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {favorites.map((fav) => (
              <div
                key={fav._id}
                className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition-all"
              >
                <img
                  src={fav.pet.image}
                  alt={fav.pet.name}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold text-teal-700">
                    {fav.pet.name}
                  </h2>
                  <p className="text-gray-500">{fav.pet.breed}</p>
                  <p className="text-gray-600">{fav.pet.location || "Unknown location"}</p>
                  <div className="mt-4 flex justify-between">
                    <Link
                      to={`/pet/${fav.pet._id}`}
                      className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg transition-all"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => removeFavorite(fav._id)}
                      className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            You don't have any favorites yet.{" "}
            <Link to="/Home" className="text-teal-600 hover:underline">
              Start exploring pets!
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
