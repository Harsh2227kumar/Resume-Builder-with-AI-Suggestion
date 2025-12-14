import React, { useRef, useCallback } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useResume } from '../context/ResumeContext';

/**
 * @file usePDFExport.js
 * @description Custom hook for triggering PDF generation from a React component.
 */

const usePDFExport = () => {
  const { resume } = useResume();
  const componentRef = useRef();

  // Configuration ensures print media styles are respected
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${resume.title.toLowerCase().replace(/\s/g, '_')}_${new Date().getFullYear()}`,
    pageStyle: '@page { size: A4; margin: 0; }',
    onBeforeGetContent: () => console.log("Preparing content for PDF..."),
    onAfterPrint: () => console.log("PDF generation complete."),
  });

  const exportPDF = useCallback(() => {
    handlePrint();
  }, [handlePrint]);

  return { componentRef, exportPDF };
};

export default usePDFExport;