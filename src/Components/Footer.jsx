import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r  from-teal-500 to-teal-800 text-white py-12">
      <div className="container mx-auto  px-6">
        <div className="grid grid-cols-1 container  sm:grid-cols-2 md:grid-cols-4 gap-12">
       
          <div className="space-y-4">
            <h3 className="text-3xl font-semibold text-teal-100">About Us</h3>
            <p className="text-sm opacity-80">
              We are dedicated to helping animals find their forever homes. Join us and make a difference in the lives of pets in need.
            </p>
          </div>

        
          <div className="space-y-4">
            <h3 className="text-3xl font-semibold text-teal-100">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-teal-200 transition-all ease-in-out">About Us</a></li>
              <li><a href="/" className="hover:text-teal-200 transition-all ease-in-out">Contact</a></li>
              <li><a href="/" className="hover:text-teal-200 transition-all ease-in-out">Privacy Policy</a></li>
              <li><a href="/" className="hover:text-teal-200 transition-all ease-in-out">Terms of Service</a></li>
            </ul>
          </div>

         
          <div className="space-y-4">
            <h3 className="text-3xl font-semibold text-teal-100">Contact</h3>
            <p className="text-sm opacity-80">Email: <a href="mailto:info@petsadopt.com" className="hover:text-teal-200 transition-all ease-in-out">info@petsadopt.com</a></p>
            <p className="text-sm opacity-80">Phone: <a href="tel:+1234567890" className="hover:text-teal-200 transition-all ease-in-out">+1 (234) 567-890</a></p>
          </div>

         
          <div className="flex space-x-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-teal-300 transition-colors duration-300">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-teal-300 transition-colors duration-300">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-teal-300 transition-colors duration-300">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-teal-300 transition-colors duration-300">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
        
        <div className="mt-12 border-t-2 border-teal-600 pt-6 text-center text-sm opacity-70">
          <p>&copy; 2024 Pet Adoption Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
