// client/components/ResumeBuilder/SummaryForm.jsx
import React from 'react';
import { useResume } from '../../context/ResumeContext';
import AISuggestant from '../AIAssistant/AISuggestions';
import Input from '../common/Input'; 

/**
 * @file SummaryForm.jsx
 * @description Form section for the professional summary (textarea + AI integration).
 */

const SummaryForm = () => {
    const { resume, updateResumeData } = useResume();
    const currentSummary = resume.summary;
    
    // Function to apply AI suggestion directly to the summary field
    const applyAISuggestion = (newSummary) => {
        updateResumeData('summary', newSummary);
    };

    // FIX: Using the now-modified Input component with type="textarea"
    return (
        <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-1 text-text-primary">Professional Summary</h2>
            <p className="text-sm text-gray-600 mb-6">Craft a compelling 3-4 sentence summary of your career and goals. This is where the AI shines!</p>
            
            <Input 
                label="Summary Content"
                name="summary"
                type="textarea"
                value={currentSummary}
                onChange={(e) => updateResumeData('summary', e.target.value)}
            />

            {/* AI Assistant integration */}
            <AISuggestant 
                section="summary"
                content={currentSummary}
                applySuggestion={applyAISuggestion}
            />
        </div>
    );
};

export default SummaryForm;