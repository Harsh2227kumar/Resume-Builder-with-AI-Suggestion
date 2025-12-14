// client/components/ResumeBuilder/FormController.jsx
import React from 'react';
import Button from '../common/Button';
import { useResume } from '../../context/ResumeContext';
import { motion } from 'framer-motion';

/**
 * @file FormController.jsx
 * @description Navigation buttons and save status for the multi-step form.
 */
const FormController = () => {
    const { 
        currentStep, 
        FORM_STEPS, 
        nextStep, 
        prevStep, 
        saveOrUpdateResume 
    } = useResume();
    
    const isFirstStep = currentStep === 0;
    const isLastStep = currentStep === FORM_STEPS.length - 1;
    
    const handleSaveAndNext = async () => {
        // Validation logic should go here first (omitted for brevity)
        const saved = await saveOrUpdateResume();
        if (saved) {
            nextStep();
        }
    };
    
    const handleFinish = async () => {
        // Final save action
        const saved = await saveOrUpdateResume();
        if (saved) {
            alert("Resume saved and finalized!");
            // router.push('/my-resumes');
        }
    };

    return (
        <motion.div 
            className="flex justify-between items-center py-6 border-t border-gray-200 mt-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Previous Button */}
            <Button 
                onClick={prevStep} 
                disabled={isFirstStep}
                variant="outline"
                className="h-12 px-6"
            >
                Previous
            </Button>
            
            {/* Progress Indicator (C. Resume Builder Interface) */}
            <span className="text-sm font-medium text-gray-600">
                Step {currentStep + 1} of {FORM_STEPS.length}
            </span>

            {/* Next / Finish Button */}
            <Button 
                onClick={isLastStep ? handleFinish : handleSaveAndNext} 
                variant="gradient"
                className="h-12 px-8"
            >
                {isLastStep ? 'Finish & Save' : 'Save & Continue'}
            </Button>
        </motion.div>
    );
};

export default FormController;