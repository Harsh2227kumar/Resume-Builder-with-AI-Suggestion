// client/components/common/Button.jsx
import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { twMerge } from "tailwind-merge"; // <<< ADDED THIS IMPORT
/**
 * @file Button.jsx
 * @description Reusable, motion-integrated button component.
 */
const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  loading = false,
  className = "",
  variant = "primary",
}) => {
  const baseClasses =
    "font-semibold py-3 px-6 rounded-lg transition duration-200 ease-out shadow-lg";
  let variantClasses = "";

  switch (variant) {
    case "secondary":
      variantClasses =
        "border border-secondary text-secondary hover:bg-secondary hover:text-white";
      break;
    case "outline":
      variantClasses = "border border-gray-300 text-gray-700 hover:bg-gray-100";
      break;
    case "gradient": // Used for primary CTAs on landing page
      variantClasses =
        "bg-gradient-to-br from-primary via-purple-600 to-blue-600 text-white shadow-lg shadow-primary/50";
      break;
    case "primary":
    default:
      variantClasses = "bg-primary text-white hover:bg-violet-700";
  }

  const classes = twMerge(
    baseClasses,
    variantClasses,
    disabled || loading ? "opacity-70 cursor-not-allowed" : "",
    className
  );
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
      // Micro-Interactions (V. Advanced UI)
      whileHover={
        !disabled && !loading
          ? { scale: 1.02, transition: { duration: 0.1 } }
          : {}
      }
      whileTap={
        !disabled && !loading
          ? { scale: 0.98, transition: { duration: 0.1 } }
          : {}
      }
    >
      {loading ? (
        <Loader2 className="animate-spin h-5 w-5 mx-auto" />
      ) : (
        children
      )}
    </motion.button>
  );
};

export default Button;
