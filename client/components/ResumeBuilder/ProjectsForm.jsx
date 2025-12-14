// client/components/ResumeBuilder/ProjectsForm.jsx
import React, { useState, useEffect } from 'react'; // FIX: Import useState, useEffect
import Input from '../common/Input';
import { useResume } from '../../context/ResumeContext';
import Button from '../common/Button';
import { Plus } from 'lucide-react';

/**
 * @file ProjectsForm.jsx
 * @description Form section for side projects and personal portfolios.
 */

// Placeholder Project Entry component (simplified)
const ProjectEntry = ({ project, index, updateProject, removeProject }) => {
    
    // FIX 1: Local state for comma-separated technologies string
    const initialTechs = project.technologies.join(', ');
    const [localTechs, setLocalTechs] = useState(initialTechs);

    // FIX 2: Synchronize local state when the project prop changes (e.g., loading new data)
    useEffect(() => {
        setLocalTechs(project.technologies.join(', '));
    }, [project.technologies]);

    // Handler for general project fields (name, link, description)
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Don't update global state for 'technologies' yet
        if (name === 'technologies') {
            setLocalTechs(value);
        } else {
            updateProject(index, { [name]: value });
        }
    };
    
    // FIX 3: Handler to parse and push technologies array to parent state on blur
    const handleTechsBlur = () => {
        const newTechArray = localTechs.split(',').map(t => t.trim()).filter(t => t.length > 0);
        
        // Only update if the new array is actually different
        if (newTechArray.join(',') !== project.technologies.join(',')) {
            updateProject(index, { technologies: newTechArray });
        }
    };


    return (
        <div className="border border-gray-200 p-6 rounded-lg mb-6 bg-gray-50">
            <h4 className="text-lg font-semibold mb-3">Project {index + 1}: {project.name || 'New Project'}</h4>
            
            <Input label="Project Name" name="name" value={project.name} onChange={handleChange} required />
            <Input label="Project Link (URL)" name="link" value={project.link} onChange={handleChange} />
            
            {/* FIX 4: Apply local state control and blur event to the technologies input */}
            <Input 
                label="Technologies Used (Comma-Separated)" 
                name="technologies" 
                type="textarea" // Use textarea for multi-line input
                value={localTechs} 
                onChange={handleChange}
                onBlur={handleTechsBlur} // Trigger global state update on blur
            />

            <Input label="Description" name="description" value={project.description} onChange={handleChange} type="textarea" />

            <div className="flex justify-end mt-4">
                <Button 
                    onClick={() => removeProject(index)} 
                    variant="outline" 
                    className="text-sm h-10 py-0 text-red-500 border-red-300 hover:bg-red-50"
                >
                    Remove Project
                </Button>
            </div>
        </div>
    );
};


const ProjectsForm = () => {
    const { resume, updateResumeData } = useResume();
    const projects = resume.projects;

    // Logic to add a new empty project entry
    const addProject = () => {
        updateResumeData('projects', {
            name: '',
            description: '',
            technologies: [],
            link: '',
        }, true, -1);
    };

    // Logic to update a specific project object at index
    const updateProj = (index, newFields) => {
        
        const updatedProjects = projects.map((proj, i) => {
            if (i === index) {
                 // Ensure technologies is treated as an array if it was passed up
                const technologies = Array.isArray(newFields.technologies) 
                                     ? newFields.technologies 
                                     : newFields.technologies || proj.technologies;
                
                return { ...proj, ...newFields, technologies };
            }
            return proj;
        });
        
        updateResumeData('projects', updatedProjects);
    };


    // Logic to remove project entry at index
    const removeProj = (index) => {
        const updatedProjects = projects.filter((_, i) => i !== index);
        updateResumeData('projects', updatedProjects);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-1 text-text-primary">Projects</h2>
            <p className="text-sm text-gray-600 mb-6">Showcase your best personal and open-source projects.</p>
            
            <div className="space-y-6">
                {projects.map((proj, index) => (
                    <ProjectEntry 
                        key={index}
                        project={proj}
                        index={index}
                        updateProject={updateProj}
                        removeProject={removeProj}
                    />
                ))}

                <Button onClick={addProject} variant="outline" className="w-full text-lg h-12 flex items-center justify-center space-x-2">
                    <Plus size={20} />
                    <span>Add New Project</span>
                </Button>
            </div>
        </div>
    );
};

export default ProjectsForm;