// client/components/ResumeBuilder/FormNavigation.jsx
import React from 'react';
import { Check, Dot } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';

/**
 * @file FormNavigation.jsx
 * @description Horizontal step progress indicator.
 */
const FormNavigation = () => {
  const { currentStep, FORM_STEPS, setCurrentStep } = useResume();

  return (
    <div className="flex justify-between items-center w-full">
      {FORM_STEPS.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;
        const isUpcoming = index > currentStep;

        const baseClass = "flex flex-col items-center cursor-pointer transition duration-300";
        const circleClass = "w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold transition-all duration-300";
        const lineClass = "flex-auto border-t-2 transition-colors duration-300";
        
        return (
          <React.Fragment key={index}>
            <div className={baseClass} onClick={() => setCurrentStep(index)}>
              <div 
                className={circleClass}
                style={{
                  background: isCompleted 
                    ? '#10b981' // Emerald Green for completed
                    : isActive 
                      ? 'linear-gradient(to right, #8b5cf6, #3b82f6)' // Gradient for active
                      : '#e5e7eb', // Gray for upcoming
                  transform: isActive ? 'scale(1.1)' : 'scale(1)',
                }}
              >
                {isCompleted ? <Check size={16} /> : index + 1}
              </div>
              <span className={`mt-2 text-sm font-medium whitespace-nowrap hidden sm:inline ${isActive ? 'text-primary' : 'text-gray-500'}`}>
                {step}
              </span>
            </div>
            
            {/* Connecting line */}
            {index < FORM_STEPS.length - 1 && (
              <div 
                className={lineClass} 
                style={{ borderColor: isCompleted ? '#10b981' : '#e5e7eb' }} 
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default FormNavigation;