// client/components/common/Footer.jsx
import React from 'react';

/**
 * @file Footer.jsx
 * @description Simple application footer.
 */
const Footer = () => {
  return (
    <footer className="bg-text-primary text-gray-400 py-6 mt-auto hide-on-print border-t border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Smart Resume Builder with Gemini AI.</p>
        <p className="mt-1">
          Designed with <span className="text-red-500">❤️</span> and Powered by Gemini.
        </p>
      </div>
    </footer>
  );
};

export default Footer;