// client/components/ResumeBuilder/SkillsForm.jsx
import React, { useState, useEffect } from 'react'; 
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
    const [localSkills, setLocalSkills] = useState(globalSkillsArray.join(', '));

    // FIX 2: Synchronize local state when global state (resume.skills) changes
    useEffect(() => {
        setLocalSkills(globalSkillsArray.join(', '));
    }, [globalSkillsArray]);

    // Handler for every keystroke: update local state only
    const handleSkillsChange = (e) => {
        setLocalSkills(e.target.value);
    };
    
    // FIX 3: Handler for when the input loses focus: update global array state
    const handleBlur = () => {
        // Perform the parsing and global state update only when focus is lost.
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
              type="textarea" 
              value={localSkills} 
              onChange={handleSkillsChange} 
              onBlur={handleBlur} 
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