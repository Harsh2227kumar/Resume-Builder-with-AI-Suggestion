// client/components/AIAssistant/AISuggestions.jsx
import React from 'react';
import { Brain, Loader2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import SuggestionCard from './SuggestionCard';
import { useAISuggestions } from '../../hooks/useAISuggestions'; 
import { useResumeData } from '../../hooks/useResumeData'; 
import toast from 'react-hot-toast';

/**
 * @file AISuggestions.jsx
 * @description Panel to display AI suggestions, used in the right sidebar.
 */
const AISuggestant = ({ section, content, applySuggestion }) => {
    
  // Assuming a parent component or form is managing the specific section/content/apply function
  // For now, we stub this connection using a generic hook pattern
  const { suggestions, isLoading, error, getSuggestions, handleApply, hasSuggestions } = useAISuggestions(
    section || 'summary', 
    content || 'I am a highly motivated individual.', 
    applySuggestion || ((newContent) => toast.info(`Applied suggestion: ${newContent}`))
  );
  
  const containerVariants = {
    visible: { transition: { staggerChildren: 0.08 } },
  };

  return (
    <div className="mt-6 p-6 rounded-lg border-2 border-violet-200 bg-gradient-to-br from-violet-50 to-blue-50">
        
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
          <Brain size={24} className="text-primary" />
          <span>AI Suggestions</span>
        </h3>
        <div className={`text-sm font-medium flex items-center space-x-1 ${isLoading ? 'text-gray-500' : 'text-accent'}`}>
            <span className={`h-2 w-2 rounded-full ${isLoading ? 'bg-gray-400' : 'bg-accent animate-pulse'}`} />
            <span>{isLoading ? 'Analyzing...' : 'Ready'}</span>
        </div>
      </div>
      
      {/* Primary Action Button (Placeholder logic) */}
      <Button 
          onClick={getSuggestions} 
          loading={isLoading}
          variant="gradient" 
          className="w-full text-sm h-10 mb-4 flex items-center justify-center space-x-2"
          disabled={!content || isLoading}
      >
        <Sparkles size={16} />
        <span>Get AI Suggestions for {section || 'Section'}</span>
      </Button>

      {/* Content Display Area */}
      <motion.div 
        className="min-h-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {isLoading && (
            <div className="space-y-3">
                {/* Skeleton Loading State (V. Advanced UI) */}
                <div className="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
        )}

        {error && (
          <div className="text-red-500 p-3 bg-red-50 border border-red-200 rounded-lg text-sm">{error}</div>
        )}

        {!isLoading && hasSuggestions && (
            suggestions.map((suggestion, index) => (
                <SuggestionCard 
                    key={index} 
                    suggestion={suggestion} 
                    onApply={handleApply} 
                    onRegenerate={getSuggestions}
                />
            ))
        )}
        
        {/* Empty State (C. Resume Builder Interface) */}
        {!isLoading && !hasSuggestions && !error && (
            <div className="text-center text-gray-500 p-4">
                <Brain size={32} className="mx-auto text-gray-300 mb-2" />
                <p>No suggestions yet. Click the button above!</p>
            </div>
        )}
      </motion.div>
    </div>
  );
};

export default AISuggestant;