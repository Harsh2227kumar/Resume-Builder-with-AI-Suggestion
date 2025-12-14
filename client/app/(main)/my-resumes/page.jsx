// client/app/(main)/my-resumes/page.jsx
"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FileText, Plus, Download, Edit, Trash2, Copy, AlertCircle, Loader2 } from 'lucide-react';
import { useResume } from '../../../context/ResumeContext';
import Button from '../../../components/common/Button';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

/**
 * @file my-resumes/page.jsx
 * @description User dashboard for managing saved resumes.
 */
const MyResumesPage = () => {
  const router = useRouter();
  const { isAuthenticated, authLoading, allResumes, fetchAllResumes, deleteResume, setResume, INITIAL_RESUME_DATA } = useResume();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
      toast.error('Please log in to view your resumes.');
      return;
    }
    if (isAuthenticated) {
      fetchAllResumes().finally(() => setLoading(false));
    }
  }, [isAuthenticated, authLoading, router, fetchAllResumes]);

  const handleEdit = (resumeData) => {
    setResume(resumeData); // Load selected resume data into context state
    router.push('/build');
  };

  const handleDelete = async (id, title) => {
    if (confirm(`Are you sure you want to delete the resume titled "${title}"?`)) {
      setLoading(true);
      const success = await deleteResume(id);
      if (success) {
        toast.success(`Resume "${title}" deleted.`);
      } else {
        toast.error('Failed to delete resume.');
      }
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return <div className="text-center py-20"><Loader2 className="animate-spin h-8 w-8 mx-auto text-primary" /></div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight">My Resumes</h1>
        <Link href="/build">
          <Button variant="gradient" className="flex items-center space-x-2">
            <Plus size={18} />
            <span>Create New Resume</span>
          </Button>
        </Link>
      </div>

      {allResumes.length === 0 ? (
        // Empty State (D. My Resumes Dashboard)
        <div className="text-center py-20 bg-white p-12 rounded-xl shadow-lg border border-gray-100">
          <AlertCircle size={48} className="text-gray-400 mx-auto mb-4" />
          <p className="text-xl text-gray-600 mb-6">No resumes yet. Create your first one!</p>
          <Link href="/build">
            <Button variant="gradient" className="h-14 px-8 text-lg">
              Create Resume
            </Button>
          </Link>
        </div>
      ) : (
        // Resume Cards Grid (D. My Resumes Dashboard)
        <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } }, hidden: {} }}
        >
          {allResumes.map((resumeData, index) => (
            <motion.div 
                key={resumeData._id} 
                className="bg-white rounded-xl shadow-md overflow-hidden transition duration-300 hover:shadow-xl hover:-translate-y-1"
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              
              {/* Thumbnail (Placeholder for actual rendering) */}
              <div className="h-40 bg-gray-100 flex items-center justify-center relative border-b">
                <FileText size={32} className="text-gray-400" />
                <span className="text-sm text-gray-500 absolute bottom-2">Thumbnail Preview</span>
              </div>
              
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-1 truncate">{resumeData.title}</h2>
                <p className="text-sm text-gray-500 mb-3">Modified: {new Date(resumeData.updatedAt).toLocaleDateString()}</p>
                
                {/* Template Badge */}
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-violet-100 text-violet-700 mb-4">
                  {resumeData.template}
                </span>

                {/* Actions */}
                <div className="flex justify-between items-center space-x-3 mt-4">
                  <Button onClick={() => handleEdit(resumeData)} className="flex-grow flex justify-center items-center space-x-2 text-sm h-10 px-0">
                    <Edit size={16} />
                    <span>Edit</span>
                  </Button>
                  
                  <button title="Download PDF" className="p-2 rounded-full text-secondary hover:bg-secondary/10 transition">
                    <Download size={20} />
                  </button>
                  <button title="Duplicate" className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition">
                    <Copy size={20} />
                  </button>
                  <button 
                    title="Delete"
                    onClick={() => handleDelete(resumeData._id, resumeData.title)} 
                    className="p-2 rounded-full text-red-500 hover:bg-red-50 transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default MyResumesPage;