import React, { useState, useEffect } from "react";
import api from "../Services/api";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import MessagesList from "../Components/MessagesList";
import AppointmentList from "../Components/AppointmentList";
import MessageFrromShelter from "../Components/MessageFromShelter";


const PetRequest = () => {
  const { shelterId } = useParams();
  const [view, setView] = useState("adoption");
  const [applications, setApplications] = useState([]);
  const [fosteredPets, setFosteredPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    if (!shelterId) {
      toast.error("Shelter ID is missing or invalid.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        let response;
        if (view === "adoption") {
          const response = await api.get(`/application/shelter/${shelterId}`);
          setApplications(response.data || []);
        } else if (view === "foster") {
          const response = await api.get(`/foster/all/${shelterId}`);
          setFosteredPets(response.data.fosters || []);
        }
      } catch {
        console.log("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [view, shelterId]);

  const handleUpdateStatus = async (applicationId, status) => {
    try {
      const response = await api.put(`/application/update/${applicationId}`, {
        status,
        message:
          status === "approved"
            ? "Your application has been approved."
            : "Sorry, your application has been rejected.",
      });
      setApplications((prev) =>
        prev.map((app) =>
          app._id === applicationId ? { ...app, status } : app
        )
      );
      toast.success(response.data.message);
    } catch {
      toast.error("Failed to update application status.");
    }
  };

  const handleUpdatefosterStatus = async (petId, status,fosterId) => {
    try {
     
      const response = await api.put(`/foster/update/${fosterId}`, {status});
        
      if (status === 'active') {
       await api.put(`/pet/update-status/${petId}`, { status: 'adopted' });
        
       
      }
      toast.success(response.data.message)
      setFosteredPets((prev) =>
        prev.map((foster) =>
          foster._id === fosterId ? { ...foster, status } : foster
        )
      );
  
      
    } catch (error) {
      toast.error('Failed to upload foster status')
      
    }
  };
  

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-teal-500 to-blue-500 p-6 md:p-8">
      <h1 className="text-3xl font-bold text-rose-600 text-center mb-4">
        {view === "adoption" ? "Adoption Applications" : "Fostered Pets"}
      </h1>

      {/* View Toggle */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setView("adoption")}
          className={`px-5 py-2 rounded-lg font-medium text-base ${
            view === "adoption"
              ? "bg-rose-600 text-white shadow-md"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Adoption
        </button>
        <button
          onClick={() => setView("foster")}
          className={`px-5 py-2 rounded-lg font-medium text-base ${
            view === "foster"
              ? "bg-rose-600 text-white shadow-md"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Foster
        </button>
      </div>

      {/* Content Section */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin w-8 h-8 border-4 border-t-rose-600 rounded-full"></div>
        </div>
      ) : view === "adoption" ? (
        <div className="grid bg gap-4">
          {applications.length > 0 ? (
            applications.map((application) => (
              <div
              key={application._id}
              className="p-2 m-auto w-3/4 bg-[#a7c7e7] border rounded-lg shadow hover:shadow-lg transition"
            >
            
                <div className="flex items-center  justify-between">
                  <div className="flex items-center space-x-4">
                    {application.Pet?.image ? (
                      <img
                        src={application.Pet.image}
                        alt={application.Pet.name}
                        className="w-16 h-16 object-cover rounded-md shadow"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-300 rounded-md flex items-center justify-center">
                        <span className="text-sm text-gray-500">No Image</span>
                      </div>
                    )}
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">
                        {application.User?.name}
                      </h2>
                      <p className="text-sm text-gray-600">
                        <strong>Status:</strong>{" "}
                        <span
                          className={`px-3  py-1 rounded-full text-white ${
                            application.status === "approved"
                              ? "bg-green-500"
                              : application.status === "rejected"
                              ? "bg-red-500"
                              : "bg-yellow-500"
                          }`}
                        >
                          {application.status || "Pending"}
                        </span>
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleExpand(application._id)}
                    className="text-gray-500 hover:text-rose-600 transition"
                  >
                    {expanded[application._id] ? "▲" : "▼"}
                  </button>
                </div>

                {expanded[application._id] && (
                  <div className="mt-4 text-lg text-gray-700 space-y-2 border-t pt-2">
                    <p>
                      <strong>Email:</strong> {application.User?.email}
                    </p>
                    <p>
                      <strong>Message:</strong> {application.message}
                    </p>
                    <div className="flex justify-end mr-12 -mt-10 space-x-2">
                      {application.status === "pending" && (
                        <>
                          <button
                            onClick={() =>
                              handleUpdateStatus(application._id, "approved")
                            }
                            className={`px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            {loading ? 'Approving...' : 'Approve'}
                          </button>
                          <button
                            onClick={() =>
                              handleUpdateStatus(application._id, "rejected")
                            }
                            className={`px-4 py-3 bg-red-500 text-white rounded hover:bg-red-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
                          >
                            {loading ? 'Rejecting...' : 'Reject'}
                          </button>
                        </>
                      )}
                    </div>
                    <MessagesList
                      petId={application.Pet?._id}
                      userId={application.User?._id}
                    />
                    {application.status === "approved" && (
                      <AppointmentList petId={application.Pet?._id} />
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No applications found.</p>
          )}
        </div>
      ) : (
        /* Foster View */
        <div className="grid gap-4">
  {fosteredPets.length > 0 ? (
    fosteredPets.map((foster) => (
      <div
        key={foster._id}
        className="p-2 m-auto w-3/4 bg-[#a7c7e7] border rounded-lg shadow hover:shadow-lg transition"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {foster.pet?.image ? (
              <img
                src={foster.pet.image}
                alt={foster.pet.name}
                className="w-16 h-16 object-cover rounded-md shadow"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-300 rounded-md flex items-center justify-center">
                <span className="text-sm text-gray-500">No Image</span>
              </div>
            )}
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                {foster.pet?.name}
              </h2>
              <p className="text-sm text-gray-600">
                <strong>Status:</strong>{" "}
                <span
  className={`px-3 py-1 rounded-full text-white ${
    foster.status === "active"
      ? "bg-blue-500"
      : foster.status === "inactive"
      ? "bg-orange-500"
      : foster.status === "completed"
      ? "bg-green-500"
      : foster.status === "pending"
      ? "bg-yellow-500"
      : "bg-gray-500"
  }`}
>
  {foster.status || "pending"}
</span>
                
              </p>
            </div>
          </div>
          <button
            onClick={() => toggleExpand(foster._id)}
            className="text-gray-500 hover:text-rose-600 transition"
          >
            {expanded[foster._id] ? "▲" : "▼"}
          </button>
        </div>

        {expanded[foster._id] && (
          <div className="mt-4 text-lg text-gray-700 space-y-2 border-t pt-2">
            <p>
              <strong>Name:</strong> {foster.user?.name}
            </p>
            <p>
              <strong>Contact:</strong> {foster.phoneNumber}
            </p>
            <p>
              <strong>Email:</strong> {foster.user?.email}
            </p>
            <p><strong>Location:</strong> {foster.location}</p>
            <p>
              <strong>Address:</strong> {foster.address}
            </p>

            <div className="flex justify-end mr-12 -mt-10 space-x-2">
              {foster.status === "pending" && (
                <>
                <button
                onClick={() =>
                  handleUpdatefosterStatus(foster.pet?._id, "active", foster._id)
                }
                className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Approve
              </button>
              <button
                onClick={() =>
                  handleUpdatefosterStatus(foster._id, "rejected", foster._id)
                }
                className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Reject
              </button>
                </>
              )}
              
            </div>
            <MessageFrromShelter
              petId={foster.pet._id}
              fosterId={foster._id}
            />
          </div>
        )}
      </div>
    ))
  ) : (
    <p className="text-center text-gray-500">No fostered pets found.</p>
  )}
</div>

      )}
    </div>
  );
};

export default PetRequest;
