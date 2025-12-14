// client/app/(auth)/login/page.jsx
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useResume } from '../../../context/ResumeContext';
import { loginUser } from '../../../services/authService';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import toast from 'react-hot-toast';
import { User } from 'lucide-react'; // FIX: Added missing import for User icon

/**
 * @file login/page.jsx
 * @description Login Page component.
 */
const LoginPage = () => {
  const router = useRouter();
  const { handleLogin, isAuthenticated } = useResume();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  if (isAuthenticated) {
    router.push('/my-resumes');
    return null; 
  }
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null }); // Clear error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const { email, password } = formData;
      const data = await loginUser(email, password);
      
      handleLogin(data, data.token); // Store user data and token in context/localStorage
      toast.success('Login successful! Redirecting to dashboard.');
      router.push('/my-resumes');

    } catch (err) {
      // Handle validation errors from the backend (server/middleware/validation.js)
      const backendErrors = err.errors?.reduce((acc, error) => {
        acc[error.field] = error.message;
        return acc;
      }, {}) || {};

      setErrors({ ...backendErrors, general: err.message || 'An unknown error occurred.' });
      toast.error(err.message || 'Login failed. Please check credentials.');
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[90vh] items-center justify-center lg:justify-start">
      {/* Left Panel: Form (B. Authentication Pages) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-2">Smart Resume</h1>
            <h2 className="text-3xl font-bold text-text-primary">Welcome back</h2>
            <p className="text-gray-600 mt-2">Log in to continue building your future.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input 
              label="Email Address" 
              name="email" 
              type="email" 
              value={formData.email} 
              onChange={handleChange}
              error={errors.email}
              required
            />
            <Input 
              label="Password" 
              name="password" 
              type="password" 
              value={formData.password} 
              onChange={handleChange}
              error={errors.password}
              required
            />

            {errors.general && (
              <div className="text-red-500 text-sm text-center">{errors.general}</div>
            )}
            
            <Button type="submit" loading={loading} variant="gradient" className="w-full h-12">
              Sign In
            </Button>
          </form>

          <p className="text-center text-sm mt-6">
            Don't have an account?{' '}
            <Link href="/register" className="text-primary hover:text-violet-700 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      
      {/* Right Panel: Gradient + Testimonial (B. Authentication Pages) */}
      <div className="hidden lg:block lg:w-1/2 h-full bg-gradient-to-br from-primary to-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 100% 0%, #ffffff, transparent 50%)' }} />
        {/* Placeholder for Testimonial/Animation */}
        <div className="flex flex-col justify-center items-center h-full p-16 text-white text-center">
            <User size={64} className="mb-4" />
            <blockquote className="text-2xl font-light italic mb-4">
                "The AI suggestions were game-changing. I landed interviews immediately after optimizing my resume."
            </blockquote>
            <cite className="text-lg font-semibold">- Jane Doe, Senior Developer</cite>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;