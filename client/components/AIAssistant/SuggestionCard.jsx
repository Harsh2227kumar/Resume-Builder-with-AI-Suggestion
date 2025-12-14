// client/components/AIAssistant/SuggestionCard.jsx
import React from 'react';
import Button from '../common/Button';
import { Check, RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * @file SuggestionCard.jsx
 * @description Displays a single AI suggestion with an apply button.
 */
const SuggestionCard = ({ suggestion, onApply, onRegenerate }) => {
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <motion.div 
      className="bg-white rounded-lg p-4 mb-3 border-l-4 border-accent shadow-sm hover:shadow-md transition duration-200"
      variants={cardVariants}
    >
      <p className="text-sm text-gray-700 mb-3 italic">
        "{suggestion.suggestion}"
      </p>
      
      <div className="flex justify-between items-center">
        <span className="text-xs font-medium text-gray-500">
          {suggestion.type === 'bullet_improvement' ? 'Improvement' : 'General Suggestion'}
        </span>
        <div className="flex space-x-2">
            {/* Apply Button */}
            <Button onClick={() => onApply(suggestion.suggestion)} variant="primary" className="h-8 py-0 text-xs bg-accent hover:bg-emerald-600 shadow-none">
                <Check size={14} className="mr-1" /> Apply
            </Button>
            
            {/* Regenerate Button */}
            <button 
                onClick={onRegenerate}
                title="Regenerate" 
                className="p-1 rounded-full text-gray-500 hover:text-primary transition"
            >
                <RefreshCcw size={16} />
            </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SuggestionCard;