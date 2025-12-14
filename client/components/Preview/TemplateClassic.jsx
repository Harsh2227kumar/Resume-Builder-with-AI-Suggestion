// client/components/Preview/TemplateClassic.jsx
import React from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * @file TemplateClassic.jsx
 * @description Classic, clean resume template for printing and preview.
 */
const TemplateClassic = React.forwardRef(({ resumeData, className = '' }, ref) => {
  const { personalInfo, summary, experience, education, skills, projects } = resumeData;

  const headerStyle = "text-xl font-bold border-b-2 border-gray-300 pb-1 mb-2 mt-4 uppercase tracking-wider text-text-primary";
  const contentStyle = "text-sm text-gray-700";

  return (
    <div ref={ref} className={twMerge("resume-page-container w-full h-full bg-white p-8 font-sans", className)}>
      
      {/* 1. Personal Info */}
      <header className="text-center mb-6">
        <h1 className="text-3xl font-extrabold text-text-primary mb-1">{personalInfo.fullName || 'Your Full Name'}</h1>
        <div className="text-sm text-gray-600 flex justify-center space-x-3 flex-wrap">
          <span>{personalInfo.email}</span>
          <span className="hidden sm:inline">|</span>
          <span>{personalInfo.phone}</span>
          <span className="hidden sm:inline">|</span>
          <a href={personalInfo.linkedin} className="text-blue-600" target="_blank" rel="noopener noreferrer">{personalInfo.linkedin && 'LinkedIn'}</a>
        </div>
      </header>

      {/* 2. Summary */}
      {summary && (
        <section>
          <h2 className={headerStyle}>Summary</h2>
          <p className={contentStyle}>{summary}</p>
        </section>
      )}

      {/* 3. Experience */}
      {experience.length > 0 && (
        <section>
          <h2 className={headerStyle}>Experience</h2>
          {experience.map((job, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between items-start">
                <h3 className="text-base font-semibold">{job.title} at {job.company}</h3>
                <span className="text-sm text-gray-600">{job.startDate} - {job.endDate || 'Present'}</span>
              </div>
              <p className="text-xs text-gray-500 mb-1">{job.location}</p>
              <ul className="list-disc ml-5 space-y-1">
                {job.responsibilities?.map((resp, i) => (
                  <li key={i} className={contentStyle}>{resp}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* 4. Education */}
      {education.length > 0 && (
        <section>
          <h2 className={headerStyle}>Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between items-start">
                <h3 className="text-base font-semibold">{edu.degree}, {edu.fieldOfStudy}</h3>
                <span className="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</span>
              </div>
              <p className="text-sm text-gray-700">{edu.institution}</p>
              {edu.gpa && <p className="text-xs text-gray-500">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </section>
      )}

      {/* 5. Skills */}
      {skills.length > 0 && (
        <section>
          <h2 className={headerStyle}>Skills</h2>
          <p className={contentStyle}>
            <span className="font-semibold">Skills:</span> {skills.join(' • ')}
          </p>
        </section>
      )}
      
      {/* 6. Projects (Skipped for brevity) */}

    </div>
  );
});

TemplateClassic.displayName = 'TemplateClassic';
export default TemplateClassic;