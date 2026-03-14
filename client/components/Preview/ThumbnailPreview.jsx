// client/components/Preview/ThumbnailPreview.jsx
import React from 'react';
import TemplateClassic from './TemplateClassic';
import { twMerge } from 'tailwind-merge';

/**
 * @file ThumbnailPreview.jsx
 * @description Renders a small thumbnail preview of a resume for the resumes gallery.
 */
const ThumbnailPreview = ({ resumeData, className = '' }) => {
  // Scale down to fit thumbnail size (160px height for A4 aspect ratio = 8.5/11)
  const thumbnailScale = 0.18;
  
  return (
    <div className={twMerge("w-full h-40 bg-white rounded-lg overflow-hidden border border-gray-200", className)}>
      {/* Container with scaled preview */}
      <div 
        style={{ 
          transform: `scale(${thumbnailScale})`,
          transformOrigin: 'top center',
          width: '100%',
          height: 'auto'
        }}
      >
        <div style={{ width: '816px' }}> {/* A4 width in pixels at 96dpi */}
          <TemplateClassic resumeData={resumeData} className="text-xs" />
        </div>
      </div>
    </div>
  );
};

export default ThumbnailPreview;
