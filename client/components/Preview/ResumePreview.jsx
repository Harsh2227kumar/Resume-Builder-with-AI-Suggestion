// client/components/Preview/ResumePreview.jsx
import React, { useState } from 'react'; 
import { useResume } from '../../context/ResumeContext';
import TemplateClassic from './TemplateClassic';
import usePDFExport from '../../hooks/usePDFExport';
import { Printer, Scale, Layout, ChevronDown } from 'lucide-react'; 
import Button from '../common/Button';

/**
 * @file ResumePreview.jsx
 * @description Displays the live preview and controls for templates/export.
 */

// Preset scale options
const SCALE_OPTIONS = [0.25, 0.5, 0.7, 0.75, 1.0];

const ResumePreview = () => {
  // FIX: Get scale and updateScale from context
  const { resume, scale, updateScale } = useResume(); 
  // usePDFExport provides the ref for the component to be printed
  const { componentRef, exportPDF } = usePDFExport(resume.title);

  // Determine which template to render based on state
  const TemplateComponent = TemplateClassic; // Only Classic is implemented for now
  
  // State for scale dropdown visibility
  const [isScaleDropdownOpen, setIsScaleDropdownOpen] = useState(false);

  // Calculate the inverse scale for the wrapper size
  const inverseScale = 1 / scale; 

  // Handler to set the new scale and close the dropdown
  const handleScaleSelect = (newScale) => {
    updateScale(newScale);
    setIsScaleDropdownOpen(false);
  };

  return (
    <div className="flex flex-col">
      {/* Preview Controls (C. Resume Builder Interface) */}
      <div className="flex justify-between items-center p-3 border-b mb-4">
        
        <div className="flex space-x-2 text-sm text-gray-600">
          <button className="p-1 rounded hover:bg-gray-100 flex items-center"><Layout size={16} className="mr-1" /> Template</button>
          
          {/* FIX: Dynamic Scale Dropdown */}
          <div className="relative inline-block text-left">
            <button 
              onClick={() => setIsScaleDropdownOpen(prev => !prev)} 
              className="p-1 rounded hover:bg-gray-100 flex items-center font-medium"
            >
              <Scale size={16} className="mr-1" /> 
              Scale ({scale.toFixed(2)}x)
              <ChevronDown size={14} className={`ml-1 transition-transform ${isScaleDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
            </button>
            
            {isScaleDropdownOpen && (
              <div className="absolute left-0 mt-2 w-24 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1">
                  {SCALE_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleScaleSelect(opt)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {opt.toFixed(2)}x
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <Button onClick={exportPDF} variant="secondary" className="h-9 py-0 text-sm flex items-center space-x-1">
          <Printer size={16} />
          <span>Export PDF</span>
        </Button>
      </div>

      {/* Live Resume Rendering Area (C. Resume Builder Interface) */}
      <div className="w-full aspect-[8.5/11] mx-auto shadow-2xl rounded-lg overflow-hidden border border-gray-300 bg-white">
        {/* FIX: Use dynamic scale state and calculated inverse scale */}
        <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left', width: `${inverseScale * 100}%` }}>
            <TemplateComponent ref={componentRef} resumeData={resume} />
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;