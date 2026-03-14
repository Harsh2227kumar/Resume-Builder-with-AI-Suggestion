// client/components/common/Input.jsx
import React, { useState } from 'react';
import { CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge'; // FIX: Added missing import for twMerge

/**
 * @file Input.jsx
 * @description Advanced input component with floating labels and visual feedback, now supporting Textarea.
 */
const Input = ({ label, type = 'text', name, value, onChange, error, valid = false, required = false, className = '', onBlur = () => {} }) => { // FIX: Added onBlur prop
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const isTextarea = type === 'textarea'; // Check for textarea type
  const displayType = isPassword && showPassword ? 'text' : type;

  const showFloatingLabel = isFocused || value || value === 0;
  
  // Adjusted classes for both input and textarea
  const baseClasses = 'w-full px-4 border-2 rounded-lg shadow-sm transition duration-200 peer resize-y';
  const inputHeightClass = isTextarea ? 'min-h-24 py-3' : 'h-11'; // Dynamic height/padding
  
  const stateClasses = error
    ? 'border-red-500 ring-4 ring-red-50'
    : isFocused
      ? 'border-primary ring-4 ring-violet-50' // Focus state (B. Authentication Pages)
      : 'border-gray-200';
      
  const inputProps = {
    id: name,
    name: name,
    value: value,
    onChange: onChange,
    onFocus: () => setIsFocused(true),
    onBlur: (e) => {
        setIsFocused(false);
        onBlur(e); // Propagate onBlur event
    },
    required: required,
    className: twMerge(baseClasses, inputHeightClass, stateClasses),
    'aria-invalid': !!error,
  };

  return (
    <motion.div 
      className={`relative mb-6 ${className}`}
      // Shake animation on error (V. Advanced UI)
      animate={error ? { x: [0, -5, 5, -5, 0] } : { x: 0 }}
      transition={{ type: "spring", stiffness: 1000, damping: 10 }}
    >
      {/* Conditional rendering for Textarea or Input */}
      {isTextarea ? (
        <textarea
          {...inputProps}
          rows={4} // Default rows for Textarea
        />
      ) : (
        <input
          {...inputProps}
          type={displayType}
        />
      )}
      
      {/* Floating Label (B. Authentication Pages) - position adjusted for textarea */}
      <label
        htmlFor={name}
        className={`absolute left-4 transition-all duration-200 pointer-events-none text-sm text-gray-700
          ${showFloatingLabel
            ? '-top-3 bg-white px-1 text-primary' // Floated state
            : isTextarea 
              ? 'top-4' // Textarea default start position
              : 'top-1/2 -translate-y-1/2' // Default state for input
          }
        `}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Validation Icons (V. Advanced UI) - position adjusted for textarea */}
      <div className={`absolute right-4 flex items-center space-x-2 ${isTextarea ? 'top-4' : 'top-1/2 -translate-y-1/2'}`}>
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