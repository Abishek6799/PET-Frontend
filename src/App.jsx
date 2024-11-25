/* This code snippet is a React component named `App` that serves as the main entry point of a React
application. Here's a breakdown of what the code is doing: */
import React,{ useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './Pages/Register';
import Login from './Pages/Login';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import { ToastContainer } from 'react-toastify';
import Welcome from './Pages/Welcome';
import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import PageNotFound from './Pages/PageNotFound';
import CreatePetProfile from './Pages/CreatePetProfile';
import ShelterDashboard from './Pages/ShelterDashboard';
import ProtectedRoutes from './Components/ProtectedRoutes';
import AdoptionApplication from './Pages/AdoptionApplication';
import UserProfile from './Pages/UserProfile';
import CreateFoster from './Pages/CreateFoster';
import PetDetail from './Components/PetDetail';
import PetRequest from './Pages/PetRequest';
import ReviewForm from './Components/ReviewForm';
import PetReviews from './Components/PetReviews';
import ShelterReviews from './Components/ShelterReviews';
import MessageForm from './Components/MessageForm';
import AppointmentForm from './Components/AppointmentForm';
import MessagesList from './Components/MessagesList';
import MessageFromShelter from './Components/MessageFromShelter';
import MessageFromFoster from './Components/MessageFromFoster';
import AppointmentList from './Components/AppointmentList';
import FosterDetails from './Pages/FosterDetails';
import CreateFosterPet from './Pages/CreateFosterPet';
import EditPet from './Components/EditPet';
import Footer from './Components/Footer';

const App = () => {
  const [token ,setToken] = useState('')
  return (
    <div>
     
     <div>
      <ToastContainer />
     </div>

      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login  setToken={setToken}/>} />
        <Route path="/" element={<Welcome/>}/>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
        <Route path="/create" element={<ProtectedRoutes shelterOnly><CreatePetProfile/></ProtectedRoutes>}/>
        <Route path="/edit-pet/:petId" element={<ProtectedRoutes shelterOnly><EditPet/></ProtectedRoutes>}/>
        <Route path="/shelter" element={<ProtectedRoutes shelterOnly><ShelterDashboard/></ProtectedRoutes>}/>
        <Route path="/application/:petId/:shelterId" element={<ProtectedRoutes userOnly><AdoptionApplication/></ProtectedRoutes>}/>
        <Route path="/user-profile" element={<ProtectedRoutes userOnly><UserProfile/></ProtectedRoutes>}/>
        <Route path="/create-foster" element={<CreateFoster/>}/>
        <Route path="/pet/:id" element={<PetDetail/>}/>
        <Route path="/pet-request/:shelterId" element={<PetRequest/>}/>
        <Route path="/review-form" element={<ReviewForm/>}/>
        <Route path="/pet-review" element={<ProtectedRoutes userOnly><PetReviews/></ProtectedRoutes>}/>
        <Route path="/shelter-review" element={<ProtectedRoutes userOnly><ShelterReviews/></ProtectedRoutes>}/>
        <Route path="/message-form" element={<MessageForm/>}/>
        <Route path="/appoinment-Form" element={<AppointmentForm/>}/>
        <Route path="/message-list" element={<MessagesList/>}/>
        <Route path="/message-from-shelter" element={<MessageFromShelter/>}/>
        <Route path="/message-from-foster" element={<MessageFromFoster/>}/>
        <Route path="/appointment-list" element={<AppointmentList/>}/>
        <Route path="/foster-details" element={<ProtectedRoutes fosterOnly><FosterDetails/></ProtectedRoutes>}/>
        <Route path="/create-foster-pet/:petId/:shelterId" element={<ProtectedRoutes fosterOnly><CreateFosterPet/></ProtectedRoutes>}/>
        <Route path="*" element={<PageNotFound />} />
        
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
};

export default App;