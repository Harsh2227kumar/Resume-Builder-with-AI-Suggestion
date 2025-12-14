// client/components/ResumeBuilder/EducationForm.jsx
import React from 'react';
import Input from '../common/Input';
import { useResume } from '../../context/ResumeContext';
import { Plus } from 'lucide-react';
import Button from '../common/Button';

/**
 * @file EducationForm.jsx
 * @description Form section for user education history.
 */

// A controlled component for a single Education Entry
const EducationEntry = ({ education, index, updateEducation, removeEducation }) => {
    
    // Handler for general education fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        updateEducation(index, { [name]: value });
    };

    return (
        <div className="border border-gray-200 p-6 rounded-lg mb-6 bg-gray-50">
            <h4 className="text-lg font-semibold mb-3">Education Entry {index + 1}</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <Input 
                    label="Institution Name" 
                    name="institution" 
                    value={education.institution} 
                    onChange={handleChange}
                    required
                />
                <Input 
                    label="Degree / Certificate" 
                    name="degree" 
                    value={education.degree} 
                    onChange={handleChange}
                    required
                />
                <Input 
                    label="Field of Study" 
                    name="fieldOfStudy" 
                    value={education.fieldOfStudy} 
                    onChange={handleChange}
                />
                <Input 
                    label="GPA / Score" 
                    name="gpa" 
                    value={education.gpa} 
                    onChange={handleChange}
                />
                <Input 
                    label="Start Date" 
                    name="startDate" 
                    type="date"
                    value={education.startDate} 
                    onChange={handleChange}
                />
                <Input 
                    label="End Date / Expected" 
                    name="endDate" 
                    type="date"
                    value={education.endDate} 
                    onChange={handleChange}
                />
            </div>

            <div className="flex justify-end mt-4">
                <Button 
                    onClick={() => removeEducation(index)} 
                    variant="outline" 
                    className="text-sm h-10 py-0 text-red-500 border-red-300 hover:bg-red-50"
                >
                    Remove Education
                </Button>
            </div>
        </div>
    );
};


const EducationForm = () => {
    const { resume, updateResumeData } = useResume();
    const education = resume.education;

    // Logic to add a new empty education entry to the array
    const addEducation = () => {
        updateResumeData('education', {
            institution: '',
            degree: '',
            fieldOfStudy: '',
            startDate: '',
            endDate: '',
            gpa: '',
        }, true, -1); // true signals an array push
    };

    // Logic to update a specific education object at index
    const updateEdu = (index, newFields) => {
        const updatedEducation = education.map((edu, i) => i === index ? { ...edu, ...newFields } : edu);
        updateResumeData('education', updatedEducation);
    };

    // Logic to remove education entry at index
    const removeEdu = (index) => {
        const updatedEducation = education.filter((_, i) => i !== index);
        updateResumeData('education', updatedEducation);
    };


    return (
        <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-1 text-text-primary">Educational Background</h2>
            <p className="text-sm text-gray-600 mb-6">List your degrees, certifications, and academic achievements.</p>
            
            <div className="space-y-6">
                {education.map((edu, index) => (
                    <EducationEntry 
                        key={index}
                        education={edu}
                        index={index}
                        updateEducation={updateEdu}
                        removeEducation={removeEdu}
                    />
                ))}

                <Button onClick={addEducation} variant="outline" className="w-full text-lg h-12 flex items-center justify-center space-x-2">
                    <Plus size={20} />
                    <span>Add New Education</span>
                </Button>
            </div>
        </div>
    );
};

export default EducationForm;