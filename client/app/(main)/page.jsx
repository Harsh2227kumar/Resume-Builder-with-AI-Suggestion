// client/app/(main)/page.jsx
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Brain, Eye, LayoutList, Download, Cloud, CheckCircle } from 'lucide-react';
import Button from '../../components/common/Button';

// Features Section data (A. Landing Page, Features Section)
const features = [
  { icon: Brain, title: "AI-Powered Content", desc: "Get intelligent suggestions for every section, powered by Gemini.", color: "accent" },
  { icon: Eye, title: "Real-Time Preview", desc: "See changes instantly as you type and format your document.", color: "primary" },
  { icon: LayoutList, title: "Multiple Templates", desc: "Choose from professional, modern, or creative ATS-friendly designs.", color: "secondary" },
  { icon: Download, title: "One-Click Export", desc: "Export to high-quality PDF with perfect, print-optimized formatting.", color: "highlight" },
  { icon: Cloud, title: "Cloud Sync", desc: "Access and edit your personalized resumes securely from anywhere.", color: "primary" },
  { icon: CheckCircle, title: "ATS-Friendly", desc: "Optimized layouts and parsing for applicant tracking systems.", color: "accent" },
];

/**
 * @file page.jsx
 * @description Landing Page with Hero, Features, and Social Proof sections.
 */
const HomePage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <>
      {/* Hero Section (A. Landing Page, Full Viewport) */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Animated Gradient Background Accent */}
        <motion.div
          className="absolute inset-0 z-0 opacity-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          style={{ background: 'radial-gradient(circle at 100% 0%, #8b5cf6, #3b82f6, transparent 70%)' }}
        />
        
        <div className="text-center relative z-10 p-4 max-w-5xl">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-text-primary"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            Build Your Perfect Resume with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">AI</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 mb-10"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Professional templates, real-time preview, intelligent suggestions from Gemini.
          </motion.p>
          
          <motion.div 
            className="flex justify-center space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/register">
              <Button variant="gradient" className="h-14 px-8 text-lg">
                Start Building Free
              </Button>
            </Link>
            <Link href="/my-resumes">
              <Button variant="outline" className="h-14 px-8 text-lg">
                View Templates
              </Button>
            </Link>
          </motion.div>

          {/* Floating Resume Mockup (Placeholder for complex 3D tilt effect) */}
          <motion.div
            className="mt-16 w-full max-w-2xl mx-auto h-56 bg-white rounded-lg shadow-3xl border border-gray-200 flex items-center justify-center text-gray-400"
            initial={{ y: 50, opacity: 0, rotateX: 10 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            transition={{ duration: 1, delay: 0.6, type: "spring" }}
          >
            <LayoutList size={40} />
            <span className="ml-4">Live Resume Preview Mockup</span>
          </motion.div>
        </div>
      </section>

      {/* Features Section (A. Landing Page, Features Section) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Features That Get You Hired</h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {features.map((feature, index) => (
              <motion.div key={index} className="p-8 card-glass rounded-xl text-center" variants={itemVariants}>
                <div className={`mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-r from-violet-500 to-${feature.color}-500/20`}>
                  <feature.icon size={30} className={`text-${feature.color}-600`} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA (A. Landing Page, Final CTA) */}
      <section className="py-20 bg-text-primary">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl font-bold text-white mb-6 tracking-tight">
            Ready to land your dream job?
          </h2>
          <Link href="/register">
            <Button variant="gradient" className="h-16 px-10 text-xl shadow-glow">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default HomePage;