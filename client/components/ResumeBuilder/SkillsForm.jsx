// client/components/ResumeBuilder/SkillsForm.jsx
import React, { useState, useEffect } from 'react'; // FIX: Added useState and useEffect
import Input from '../common/Input';
import { useResume } from '../../context/ResumeContext';
import Button from '../common/Button';
import { Plus } from 'lucide-react';

/**
 * @file SkillsForm.jsx
 * @description Form section for user skills.
 */
const SkillsForm = () => {
    const { resume, updateResumeData } = useResume();
    const globalSkillsArray = resume.skills;
    
    // FIX 1: Use local state to control the input field value (the comma-separated string)
    // Initialize with the current global state array joined by commas.
    const [localSkills, setLocalSkills] = useState(globalSkillsArray.join(', '));

    // FIX 2: Synchronize local state when global state (resume.skills) changes
    useEffect(() => {
        setLocalSkills(globalSkillsArray.join(', '));
    }, [globalSkillsArray]);

    // Handler for every keystroke: update local state only
    const handleSkillsChange = (e) => {
        // FIX 3: Only update the local string value, allowing the user to type commas and incomplete words.
        setLocalSkills(e.target.value);
    };
    
    // Handler for when the input loses focus: update global array state
    const handleBlur = () => {
        // FIX 4: Perform the parsing and global state update only when focus is lost.
        // Convert the string back to array, split by comma, trim whitespace
        const skillArray = localSkills.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0);
        
        // Only update the global context if the new array is different from the existing one
        if (skillArray.join(',') !== globalSkillsArray.join(',')) {
             updateResumeData('skills', skillArray);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-1 text-text-primary">Skills and Technologies</h2>
            <p className="text-sm text-gray-600 mb-6">List technical and soft skills, separated by commas (e.g., JavaScript, React, SQL).</p>
            
            <Input 
              label="Skills (Comma-Separated)" 
              name="skills" 
              type="textarea" // FIX: Changed type to 'textarea' for better input handling
              value={localSkills} // Use local state for value
              onChange={handleSkillsChange} // Update local state on change
              onBlur={handleBlur} // Update global state on blur
              className="col-span-full"
            />

            {/* Placeholder for adding other skill categories if needed */}
            <div className="mt-6 text-center text-sm text-gray-500">
                You can rely on the AI Assistant to the right for skill optimization suggestions!
            </div>
        </div>
    );
};

export default SkillsForm;