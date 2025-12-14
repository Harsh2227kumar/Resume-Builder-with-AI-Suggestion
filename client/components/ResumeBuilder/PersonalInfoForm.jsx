// client/components/ResumeBuilder/PersonalInfoForm.jsx
import React from 'react';
import Input from '../common/Input';
import { useResumeData } from '../../hooks/useResumeData';

/**
 * @file PersonalInfoForm.jsx
 * @description Form section for basic user contact information.
 */
const PersonalInfoForm = () => {
  const { resume, updatePersonalInfo } = useResumeData();
  const info = resume.personalInfo;

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Special updatePersonalInfo handler to target the nested object
    updatePersonalInfo(name, value);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-1 text-text-primary">Personal Information</h2>
      <p className="text-sm text-gray-600 mb-6">Start with the basics: your contact details.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <Input 
          label="Full Name" 
          name="fullName" 
          value={info.fullName} 
          onChange={handleChange}
          required
        />
        <Input 
          label="Email Address" 
          name="email" 
          type="email"
          value={info.email} 
          onChange={handleChange}
          required
        />
        <Input 
          label="Phone Number" 
          name="phone" 
          value={info.phone} 
          onChange={handleChange}
        />
        <Input 
          label="LinkedIn URL" 
          name="linkedin" 
          value={info.linkedin} 
          onChange={handleChange}
        />
        <Input 
          label="Portfolio/Website" 
          name="portfolio" 
          value={info.portfolio} 
          onChange={handleChange}
          className="col-span-full"
        />
      </div>
    </div>
  );
};

export default PersonalInfoForm;