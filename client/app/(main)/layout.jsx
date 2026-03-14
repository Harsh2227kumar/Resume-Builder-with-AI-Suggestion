// client/app/(main)/layout.jsx
"use client";
import { useResume } from '../../context/ResumeContext';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';

/**
 * @file layout.jsx
 * @description Layout for the main application pages, handling authentication gates.
 */

// Define protected routes
const protectedRoutes = ['/build', '/my-resumes'];

export default function MainLayout({ children }) {
  const { isAuthenticated, authLoading } = useResume();
  const router = useRouter();
  const pathname = usePathname();
  
  const isProtectedRoute = protectedRoutes.includes(pathname);

  // Auth Gate Logic
  if (authLoading) {
    // Show a loading spinner during context initialization
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-10 w-10 text-primary" />
      </div>
    );
  }

  if (isProtectedRoute && !isAuthenticated) {
    // Redirect to login page if trying to access a protected route unauthenticated
    router.push('/login');
    return null; 
  }

  return (
    <section className="min-h-full">
      {/* Children pages are rendered here (Home, Builder, Dashboard) */}
      {children}
    </section>
  );
}