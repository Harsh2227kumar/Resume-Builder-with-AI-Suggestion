// client/components/AppWrapper.jsx
"use client";
import React from 'react';
import { ResumeProvider } from '../context/ResumeContext';
import Header from './common/Header';
import Footer from './common/Footer';
import { Toaster } from 'react-hot-toast'; // Assuming installation of react-hot-toast

/**
 * @file AppWrapper.jsx
 * @description Client-side wrapper that houses all client components, providers,
 * and the main persistent UI structure (Header/Footer).
 */
export default function AppWrapper({ children }) {
  return (
    <ResumeProvider>
      <div className="flex flex-col min-h-screen">
        {/* Header and Footer are now safely inside the client context */}
        <Header />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <Footer />
        <Toaster position="top-right" />
      </div>
    </ResumeProvider>
  );
}