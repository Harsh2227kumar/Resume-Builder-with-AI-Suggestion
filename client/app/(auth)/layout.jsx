// client/app/(auth)/layout.jsx
import React from 'react';

/**
 * @file layout.jsx
 * @description Nested layout for all authentication routes (/login, /register).
 * This wrapper ensures the layout is applied to all pages within the (auth) group.
 */
export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* The authentication pages (login/register) themselves implement the 50/50 split screen logic */}
      {children}
    </div>
  );
}