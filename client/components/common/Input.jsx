// client/components/common/Input.jsx
import React, { useState } from 'react';
import { CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * @file Input.jsx
 * @description Advanced input component with floating labels and visual feedback.
 */
const Input = ({ label, type = 'text', name, value, onChange, error, valid = false, required = false, className = '' }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const displayType = isPassword && showPassword ? 'text' : type;

  const showFloatingLabel = isFocused || value || value === 0;
  
  const baseClasses = 'w-full px-4 h-11 border-2 rounded-lg shadow-sm transition duration-200 peer';
  const stateClasses = error
    ? 'border-red-500 ring-4 ring-red-50'
    : isFocused
      ? 'border-primary ring-4 ring-violet-50' // Focus state (B. Authentication Pages)
      : 'border-gray-200';
      
  return (
    <motion.div 
      className={`relative mb-6 ${className}`}
      // Shake animation on error (V. Advanced UI)
      animate={error ? { x: [0, -5, 5, -5, 0] } : { x: 0 }}
      transition={{ type: "spring", stiffness: 1000, damping: 10 }}
    >
      <input
        type={displayType}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required={required}
        className={twMerge(baseClasses, stateClasses)}
        aria-invalid={!!error}
      />
      
      {/* Floating Label (B. Authentication Pages) */}
      <label
        htmlFor={name}
        className={`absolute left-4 transition-all duration-200 pointer-events-none text-sm text-gray-700
          ${showFloatingLabel
            ? '-top-3 bg-white px-1 text-primary' // Floated state
            : 'top-1/2 -translate-y-1/2' // Default state
          }
        `}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Validation Icons (V. Advanced UI) */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2">
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            className="text-gray-500 hover:text-primary"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
        
        {valid && !error && <CheckCircle size={18} className="text-accent" />}
        {error && <AlertCircle size={18} className="text-red-500" />}
      </div>
      
      {error && (
        <p className="mt-1 text-xs text-red-600 absolute -bottom-5 left-0" id={`${name}-error`}>
          {error}
        </p>
      )}
    </motion.div>
  );
};

export default Input;