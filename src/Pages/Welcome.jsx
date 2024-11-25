/* This code snippet is a React component named `Welcome` that displays a welcome message for a pet
adoption website. Here's a breakdown of what the code is doing: */
import React from 'react';
import { Link } from 'react-router-dom';


const pets = [
  { name: 'Bella', breed: 'Labrador', age: '2 years', image: '/61iYErKLs5L._AC_UF894,1000_QL80_.jpg' },
  { name: 'Max', breed: 'Bulldog', age: '3 years', image: '/American-French-Bulldog-1155x768.jpg' },
  { name: 'Luna', breed: 'Poodle', age: '1 year', image: '/labrador-retriever-yellow-sitting-275580695-2000-9faa78e893f24bf5882d88efa90fc4d9.jpg' },
];

const Welcome = () => {
  return (
    <div className="bg-gradient-to-r from-green-400 pt-10 to-lime-400 h-screen flex flex-col items-center justify-center text-white text-center p-4">
   
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold mb-4">Welcome to Pet Adoption</h1>
        <p className="text-2xl mb-8">Find your perfect pet today and make a friend for life.</p>

        <button 
          className="bg-white text-blue-600 px-6 py-2 rounded-lg shadow-lg hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out mb-8">
          <Link to='/login'>Adopt Now</Link>
        </button>
      </div>

     
      <section className="w-full bg-white py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-teal-700">Meet Our Available Pets</h2>
          <p className="text-xl text-gray-600 mt-2">These adorable pets are waiting for you!</p>
        </div>

   
        <div className="flex flex-wrap justify-center gap-8">
          {pets.map((pet, index) => (
            <div key={index} className="w-64 bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={pet.image} alt={pet.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-2xl font-semibold text-gray-800">{pet.name}</h3>
                <p className="text-lg text-gray-500 mt-2">{pet.breed} - {pet.age}</p>
              </div>
              <div className="p-4 bg-teal-700 text-white text-center rounded-b-lg">
                <Link to='/login' className="text-lg font-semibold">Learn More</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

 
      
    </div>
  );
};

export default Welcome;
