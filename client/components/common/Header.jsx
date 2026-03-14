// client/components/common/Header.jsx
import React from 'react';
import { useRouter } from 'next/navigation'; // FIX: Changed import from 'next/router' to 'next/navigation' for App Router
import Link from 'next/link';
import { LogOut, User } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import Button from './Button';

/**
 * @file Header.jsx
 * @description Main application header with responsive, sticky design.
 */
const Header = () => {
  const router = useRouter();
  const { isAuthenticated, handleLogout, user } = useResume();

  const handleLogoutClick = () => {
    handleLogout();
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm backdrop-blur hide-on-print">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
        
        {/* Logo and App Name */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
            <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 4h9l5 5v11H5z" fill="white" fillOpacity="0.08" />
              <path d="M14 4v5h5" />
              <path d="M8 13h8" />
              <path d="M8 17h5" />
              <path d="M8 9h3" />
            </svg>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-lg sm:text-xl font-semibold text-text-primary group-hover:text-primary transition">Smart Resume</span>
            <span className="hidden sm:block text-xs text-gray-500">AI Resume Builder</span>
          </div>
        </Link>
        
        {/* Navigation and Auth Actions */}
        <nav className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link href="/my-resumes" className="text-sm font-medium text-gray-700 hover:text-primary transition hidden sm:inline">
                My Resumes
              </Link>
              <Link href="/build" className="text-sm font-medium text-gray-700 hover:text-primary transition hidden sm:inline">
                Builder
              </Link>
              
              {/* User Avatar Menu (C. Resume Builder Header) */}
              <div className="relative group">
                <button className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary border border-primary/20">
                  <User size={18} />
                </button>
                {/* Simple Dropdown Logic */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-150">
                  <p className="px-4 py-2 text-sm text-gray-700 font-semibold border-b">
                    {user?.name || 'User'}
                  </p>
                  <Button onClick={handleLogoutClick} variant="outline" className="w-full text-left justify-start px-4 py-2 text-sm h-auto border-none shadow-none flex items-center space-x-2">
                    <LogOut size={16} />
                    <span>Logout</span>
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="space-x-2">
              <Link href="/login">
                <Button variant="outline" className="text-sm h-10 py-0">Login</Button>
              </Link>
              <Link href="/register">
                <Button variant="gradient" className="text-sm h-10 py-0">Register</Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;