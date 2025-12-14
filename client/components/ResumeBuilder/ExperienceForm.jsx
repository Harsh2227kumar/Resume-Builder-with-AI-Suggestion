// client/components/ResumeBuilder/ExperienceForm.jsx
import React from 'react';
import Input from '../common/Input';
import { useResume } from '../../context/ResumeContext';
import { Plus } from 'lucide-react';
import Button from '../common/Button';

/**
 * @file ExperienceForm.jsx
 * @description Form section for user work experience, including job title, company, dates, and responsibilities.
 */

// A simplified, controlled component for a single job responsibility bullet point.
const ResponsibilityInput = ({ value, onChange, index }) => {
    return (
        <Input
            label={`Responsibility #${index + 1}`}
            name={`responsibility-${index}`}
            value={value}
            onChange={(e) => onChange(e.target.value, index)}
            className="mb-2"
            type="textarea" // Changed to textarea for multiline/bullet support
        />
    );
};

// A simplified, controlled component for a single Job Entry (Experience)
const JobEntry = ({ job, index, updateExperience, removeExperience }) => {
    
    // Handler for general job fields (title, company, dates)
    const handleJobChange = (e) => {
        const { name, value } = e.target;
        updateExperience(index, { [name]: value });
    };

    // Placeholder handler for responsibility updates (Simplified for minimal change)
    const handleResponsibilityChange = (newResp, respIndex) => {
        const newResponsibilities = [...(job.responsibilities || [])];
        newResponsibilities[respIndex] = newResp;
        updateExperience(index, { responsibilities: newResponsibilities });
    };

    const addResponsibility = () => {
        const newResponsibilities = [...(job.responsibilities || []), ''];
        updateExperience(index, { responsibilities: newResponsibilities });
    };
    
    // Logic to remove a single responsibility
    const removeResponsibility = (respIndex) => {
        const newResponsibilities = job.responsibilities.filter((_, i) => i !== respIndex);
        updateExperience(index, { responsibilities: newResponsibilities });
    };

    return (
        <div className="border border-gray-200 p-6 rounded-lg mb-6 bg-gray-50">
            <h4 className="text-lg font-semibold mb-3">Job Entry {index + 1}</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <Input 
                    label="Job Title" 
                    name="title" 
                    value={job.title} 
                    onChange={handleJobChange}
                    required
                />
                <Input 
                    label="Company Name" 
                    name="company" 
                    value={job.company} 
                    onChange={handleJobChange}
                    required
                />
                <Input 
                    label="Start Date" 
                    name="startDate" 
                    type="date"
                    value={job.startDate} 
                    onChange={handleJobChange}
                    required
                />
                <Input 
                    label="End Date (or Present)" 
                    name="endDate" 
                    type="date"
                    value={job.endDate} 
                    onChange={handleJobChange}
                />
            </div>

            <div className="mt-4">
                <h5 className="font-semibold mb-2">Key Responsibilities (Achievements)</h5>
                {job.responsibilities?.map((resp, respIndex) => (
                    <div className="flex items-start space-x-2" key={respIndex}>
                        <ResponsibilityInput
                            value={resp}
                            onChange={handleResponsibilityChange}
                            index={respIndex}
                        />
                        <button
                            type="button"
                            onClick={() => removeResponsibility(respIndex)}
                            className="text-red-500 hover:text-red-700 mt-4 p-1 transition"
                            title="Remove responsibility"
                        >
                            <Plus size={16} className="rotate-45"/>
                        </button>
                    </div>
                ))}
                <Button 
                    onClick={addResponsibility} 
                    variant="outline" 
                    className="mt-2 text-sm h-10 py-0 flex items-center space-x-1"
                >
                    <Plus size={16} />
                    <span>Add Responsibility</span>
                </Button>
            </div>

            <div className="flex justify-end mt-4">
                <Button 
                    onClick={() => removeExperience(index)} 
                    variant="outline" 
                    className="text-sm h-10 py-0 text-red-500 border-red-300 hover:bg-red-50"
                >
                    Remove Job
                </Button>
            </div>
        </div>
    );
};


const ExperienceForm = () => {
    const { resume, updateResumeData } = useResume();
    const experience = resume.experience;

    // Placeholder function for demonstration/fix completion
    const addJob = () => {
        updateResumeData('experience', {
            title: '',
            company: '',
            startDate: '',
            endDate: '',
            location: '',
            responsibilities: [''],
        }, true, -1); // true to signal it's an array push
    };

    // Placeholder function for demonstration/fix completion
    const updateJob = (index, newFields) => {
        // Fallback to generic array update:
        const updatedExperience = experience.map((job, i) => i === index ? { ...job, ...newFields } : job);
        updateResumeData('experience', updatedExperience);
    };

    // Placeholder function for demonstration/fix completion
    const removeJob = (index) => {
        // Implement logic to remove job at index
        const updatedExperience = experience.filter((_, i) => i !== index);
        updateResumeData('experience', updatedExperience);
    };


    return (
        <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-1 text-text-primary">Work Experience</h2>
            <p className="text-sm text-gray-600 mb-6">Detail your professional journey and key achievements.</p>
            
            <div className="space-y-6">
                {experience.map((job, index) => (
                    <JobEntry 
                        key={index}
                        job={job}
                        index={index}
                        updateExperience={updateJob}
                        removeExperience={removeJob}
                    />
                ))}

                <Button onClick={addJob} variant="outline" className="w-full text-lg h-12 flex items-center justify-center space-x-2">
                    <Plus size={20} />
                    <span>Add New Job</span>
                </Button>
            </div>
        </div>
    );
};

export default ExperienceForm;