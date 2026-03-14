// client/app/(auth)/register/page.jsx
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useResume } from '../../../context/ResumeContext';
import { registerUser } from '../../../services/authService';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import toast from 'react-hot-toast';
import { User } from 'lucide-react'; // FIX: Added missing import for User icon

/**
 * @file register/page.jsx
 * @description Registration Page component.
 */
const RegisterPage = () => {
  const router = useRouter();
  const { handleLogin, isAuthenticated } = useResume();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  if (isAuthenticated) {
    router.push('/my-resumes');
    return null; 
  }
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const { name, email, password } = formData;
      const data = await registerUser(name, email, password);
      
      handleLogin(data, data.token); 
      toast.success('Account created successfully! Welcome!');
      router.push('/build');

    } catch (err) {
      const backendErrors = err.errors?.reduce((acc, error) => {
        acc[error.field] = error.message;
        return acc;
      }, {}) || {};

      setErrors({ ...backendErrors, general: err.message || 'An unknown error occurred.' });
      toast.error(err.message || 'Registration failed.');
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[90vh] items-center justify-center lg:justify-start">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-2">Smart Resume</h1>
            <h2 className="text-3xl font-bold text-text-primary">Create your account</h2>
            <p className="text-gray-600 mt-2">Start building your next career step today.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input 
              label="Full Name" 
              name="name" 
              type="text" 
              value={formData.name} 
              onChange={handleChange}
              error={errors.name}
              required
            />
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
              Register
            </Button>
          </form>

          <p className="text-center text-sm mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-primary hover:text-violet-700 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
      
      {/* Right Panel: Gradient + Testimonial (Hidden on mobile) */}
      <div className="hidden lg:block lg:w-1/2 h-full bg-gradient-to-br from-primary to-secondary relative overflow-hidden">
        {/* Animated shapes placeholder */}
        <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 10% 90%, #ffffff, transparent 50%)' }} />
        <div className="flex flex-col justify-center items-center h-full p-16 text-white text-center">
            <User size={64} className="mb-4" />
            <blockquote className="text-2xl font-light italic mb-4">
                "Simple, fast, and the templates are genuinely impressive. A massive upgrade from my old CV."
            </blockquote>
            <cite className="text-lg font-semibold">- Alex Chen, Product Manager</cite>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;