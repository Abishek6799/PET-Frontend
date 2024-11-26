import React, { useState, useEffect } from "react";
import api from "../Services/api"; 
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa"; 

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ location: "" });
  const [pets, setPets] = useState([]);
  const [favorites, setFavorites] = useState({
    petIds: [],  
    favoriteIds: [], 
  });
  const [loading, setLoading] = useState(false);

  const isAuthenticated = !!localStorage.getItem("token");
  const isShelter = localStorage.getItem("role") === "shelter";
  const isUser = localStorage.getItem("role") === "adopter";
  const isFoster = localStorage.getItem("role") === "foster";

  const fetchPets = async () => {
    setLoading(true);
    try {
      const endpoint = isShelter
        ? "/pet/get"
        : isUser
        ? "/pet/availablePets"
        : isFoster
        ? "/pet/fosterPets"
        : "/pet/get";

      const response = await api.get(endpoint, { params: { search, ...filters } });
      setPets(response.data);

     
      const favoritesResponse = await api.get("/favorites/get");
      const favoriteData = favoritesResponse.data;
      const petIds = favoriteData.map(fav => fav.pet._id);
      const favoriteIds = favoriteData.map(fav => fav._id);

      setFavorites({ petIds, favoriteIds });

    } catch (error) {
      console.error("Error fetching pets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, [search, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const toggleFavorite = async (petId) => {
    try {
      const isFavorite = favorites.petIds.includes(petId);

      if (isFavorite) {
       
        const favoriteId = favorites.favoriteIds.find((id, idx) => favorites.petIds[idx] === petId);
        if (!favoriteId) {
          console.error("Favorite ID not found for this pet.");
          return;
        }

        await api.delete(`/favorites/delete/${favoriteId}`);
        setFavorites((prevFavorites) => {
          return {
            petIds: prevFavorites.petIds.filter(id => id !== petId),
            favoriteIds: prevFavorites.favoriteIds.filter(id => id !== favoriteId)
          };
        });
      } else {
       
        const response = await api.post("/favorites/add", { petId });
        const newFavoriteId = response.data.favorite._id;

        setFavorites((prevFavorites) => {
          return {
            petIds: [...prevFavorites.petIds, petId],
            favoriteIds: [...prevFavorites.favoriteIds, newFavoriteId]
          };
        });
      }
      
    
      setPets((prevPets) => 
        prevPets.map((pet) =>
          pet._id === petId ? { ...pet, isFavorite: !isFavorite } : pet
        )
      );
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="relative bg-teal-700 text-white py-28 px-6 text-center">
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg animate-fadeIn">
          Find Your Perfect Pet
        </h1>
        <p className="text-lg mb-8 opacity-90 animate-fadeIn">
          Adopt a pet and change a life! Discover loving animals looking for a home.
        </p>
        <a href="#search-filter" className="bg-teal-600 hover:bg-teal-500 transition-all px-6 py-3 rounded-full font-semibold text-lg shadow-lg">
          Start Your Search
        </a>
      </div>

    
      <div id="search-filter" className="bg-white shadow-md rounded-lg mx-auto p-6 max-w-5xl -mt-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="text"
            name="location"
            placeholder="Location (e.g., City)"
            value={filters.location}
            onChange={handleFilterChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

   
      <div className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-teal-700 text-center mb-10">Featured Pets</h2>
        {loading ? (
          <p className="text-teal-600 text-center">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {pets.length > 0 ? (
              pets.map((pet) => (
                <div key={pet.id} className="bg-white shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition-all">
                  <img
                    src={pet.image}
                    alt={pet.name}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-teal-600">{pet.name}</h3>
                    <p className="text-gray-500">{pet.breed}</p>
                    <p className="text-gray-600">{pet.location}</p>
                    <div className="flex justify-around">
                    <Link
                      to={`/pet/${pet._id}`}
                      className="mt-4 inline-block bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-lg transition-all"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => toggleFavorite(pet._id)}
                      className="mt-4 inline-block text-red-600 transition-all"
                    >
                      {favorites.petIds.includes(pet._id) ? (
                        <FaHeart size={24} />
                      ) : (
                        <FaRegHeart size={24} />
                      )}
                    </button>
                    </div>
                    
                    
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">No pets found. Try adjusting your search or filters.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
