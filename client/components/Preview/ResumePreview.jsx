// client/components/Preview/ResumePreview.jsx
import React from 'react';
import { useResume } from '../../context/ResumeContext';
import TemplateClassic from './TemplateClassic';
import usePDFExport from '../../hooks/usePDFExport';
import { Printer, Scale, Layout } from 'lucide-react';
import Button from '../common/Button';

/**
 * @file ResumePreview.jsx
 * @description Displays the live preview and controls for templates/export.
 */
const ResumePreview = () => {
  const { resume } = useResume();
  // usePDFExport provides the ref for the component to be printed
  const { componentRef, exportPDF } = usePDFExport(resume.title);

  // Determine which template to render based on state
  const TemplateComponent = TemplateClassic; // Only Classic is implemented for now

  return (
    <div className="flex flex-col">
      {/* Preview Controls (C. Resume Builder Interface) */}
      <div className="flex justify-between items-center p-3 border-b mb-4">
        <div className="flex space-x-2 text-sm text-gray-600">
          <button className="p-1 rounded hover:bg-gray-100 flex items-center"><Layout size={16} className="mr-1" /> Template</button>
          <button className="p-1 rounded hover:bg-gray-100 flex items-center"><Scale size={16} className="mr-1" /> Scale (0.7x)</button>
        </div>
        
        <Button onClick={exportPDF} variant="secondary" className="h-9 py-0 text-sm flex items-center space-x-1">
          <Printer size={16} />
          <span>Export PDF</span>
        </Button>
      </div>

      {/* Live Resume Rendering Area (C. Resume Builder Interface) */}
      <div className="w-full aspect-[8.5/11] mx-auto shadow-2xl rounded-lg overflow-hidden border border-gray-300 bg-white">
        {/* Transform is applied to scale the content to fit the limited sidebar width */}
        <div style={{ transform: 'scale(0.7)', transformOrigin: 'top left', width: '142.85%' }}>
            <TemplateComponent ref={componentRef} resumeData={resume} />
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;