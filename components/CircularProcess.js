import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const CircularProcess = ({ steps }) => {
  const [activeStep, setActiveStep] = useState(null);
  const [focusedStep, setFocusedStep] = useState(null);
  const [touchedStep, setTouchedStep] = useState(null);
  
  // Create a refs array using useRef
  const stepRefs = useRef(Array(steps.length).fill().map(() => useRef(null)));
  const totalSteps = steps.length;
  
  // Circle sizing constants
  const circleRadius = 32; // Approx radius of each process step circle (64px diameter)
  const positioningRadius = 230; // Radius for positioning the circles
  const outerCircleRadius = positioningRadius; // Match positioning radius exactly so line goes through centers
  
  // Calculate positions in a circle
  const getPosition = (index, total) => {
    const angle = (index / total) * 2 * Math.PI;
    const x = positioningRadius * Math.sin(angle);
    const y = positioningRadius * Math.cos(angle) * -1; // Invert y to start from top
    return { x, y };
  };

  // Handle keyboard navigation
  const handleKeyDown = (e, index) => {
    switch(e.key) {
      case 'ArrowRight':
        e.preventDefault();
        const nextIndex = (index + 1) % steps.length;
        stepRefs.current[nextIndex].current.focus();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        const prevIndex = (index - 1 + steps.length) % steps.length;
        stepRefs.current[prevIndex].current.focus();
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        setFocusedStep(index === focusedStep ? null : index);
        break;
      default:
        break;
    }
  };

  return (
    <div className="relative h-[550px] w-full flex items-center justify-center" role="group" aria-label="Process Steps">
      {/* Center circle */}
      <motion.div 
        className="absolute z-10 rounded-full bg-indigo-100 w-36 h-36 flex items-center justify-center text-indigo-800 font-semibold text-sm text-center p-4 shadow-lg"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        Continuous Improvement Cycle
      </motion.div>
      
      {/* Connecting lines/arrows - keeps z-index:0 so it stays behind the circles */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
        <circle 
          cx="50%" 
          cy="50%" 
          r={outerCircleRadius} /* Now matches positioning radius to go through center of circles */
          fill="none" 
          stroke="#E2E8F0" 
          strokeWidth="2" 
          strokeDasharray="10,5"
        />
        
        {/* Directional arrows */}
        <motion.path
          d={`M 50% ${50 - outerCircleRadius}% A ${outerCircleRadius} ${outerCircleRadius} 0 0 1 ${50 + outerCircleRadius}% 50%`}
          fill="none"
          stroke="#4F46E5"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
          style={{ visibility: "hidden" }} // Hide actual path but still draw
        />
        
        {/* Arrowheads at different positions */}
        {steps.map((_, index) => {
          const position = getPosition(index, totalSteps);
          const nextIndex = (index + 1) % totalSteps;
          const nextPosition = getPosition(nextIndex, totalSteps);
          
          // Calculate angle for arrow
          const angle = Math.atan2(nextPosition.y - position.y, nextPosition.x - position.x) * (180 / Math.PI);
          
          // Mid-point between positions for arrow placement
          const midX = (position.x + nextPosition.x) / 2;
          const midY = (position.y + nextPosition.y) / 2;
          
          return (
            <motion.g
              key={`arrow-${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 + (index * 0.15) }}
              transform={`translate(${midX + 50}%, ${midY + 50}%) rotate(${angle})`}
            >
              <polygon 
                points="-10,-6 0,0 -10,6"
                fill="#4F46E5" 
                stroke="#4F46E5" 
                strokeWidth="1"
              />
            </motion.g>
          );
        })}
      </svg>
      
      {/* Process steps positioned in a circle - ensure they have higher z-index */}
      {steps.map((step, index) => {
        const position = getPosition(index, totalSteps);
        
        return (
          <motion.div
            key={index}
            className="absolute"
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{ 
              opacity: 1, 
              x: position.x, 
              y: position.y,
              scale: activeStep === index ? 1.1 : 1
            }}
            transition={{ 
              delay: index * 0.15, 
              duration: 0.5,
            }}
            style={{ transformOrigin: "center center", zIndex: 1 }}
          >
            <motion.div
              ref={stepRefs.current[index]}
              tabIndex={0}
              role="button"
              aria-label={`${step.title} - Step ${index + 1} of ${steps.length}`}
              aria-expanded={activeStep === index || focusedStep === index || touchedStep === index}
              aria-describedby={`tooltip-${index}`}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onFocus={() => setFocusedStep(index)}
              onBlur={() => setFocusedStep(null)}
              onMouseEnter={() => setActiveStep(index)}
              onMouseLeave={() => setActiveStep(null)}
              onTouchStart={() => setTouchedStep(index)}
              onTouchEnd={() => setTimeout(() => setTouchedStep(null), 3000)}
              className={`w-28 h-28 md:w-32 md:h-32 rounded-full flex flex-col items-center justify-center p-2 cursor-pointer transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                activeStep === index || focusedStep === index || touchedStep === index 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white text-indigo-800 hover:bg-indigo-50'
              }`}
            >
              <div className="text-center font-semibold text-sm">{step.title}</div>
              
              {/* Phase number indicator */}
              <div className={`absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
                ${activeStep === index ? 'bg-white text-indigo-600' : 'bg-indigo-600 text-white'}`}>
                {index + 1}
              </div>
            </motion.div>
            
            {/* Tooltip with simplified right/left positioning */}
            {(activeStep === index || focusedStep === index || touchedStep === index) && (
              <motion.div
                id={`tooltip-${index}`}
                role="tooltip"
                className="absolute z-20 bg-white rounded-lg p-4 shadow-lg border-l-4 border-indigo-500 w-64"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: 'absolute',
                  transform: getTooltipTransform(index),
                  transformOrigin: getTooltipOrigin(index),
                  top: '50%',
                  left: '50%',
                }}
              >
                <div
                  className={`absolute w-4 h-4 bg-white border-l border-t border-indigo-100 rotate-45 ${getTrianglePosition(index)}`}
                />
                
                {/* Content */}
                <div className="flex items-center mb-2">
                  <span className="w-5 h-5 flex items-center justify-center bg-indigo-100 rounded-full text-indigo-600 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <h4 className="font-semibold text-indigo-800 text-xs">{step.title}</h4>
                </div>
                <div className="text-xs leading-relaxed text-gray-700">{step.description}</div>
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

// Custom tooltip positioning for each specific position
const getTooltipTransform = (index) => {
  // Position each tooltip according to the red boxes in the image
  switch(index) {
    case 0: // #1 - Upper right
      return 'translate(120%, -100%)';
    case 1: // #2 - Right side
      return 'translate(130%, -50%)';
    case 2: // #3 - Lower right
      return 'translate(120%, 0%)';
    case 3: // #4 - Lower middle
      return 'translate(0%, 130%)';
    case 4: // #5 - Lower left
      return 'translate(-120%, 0%)'; 
    case 5: // #6 - Upper left
      return 'translate(-120%, -100%)';
    default:
      return 'translate(100%, -50%)';
  }
};

// Custom anchor points for each position
const getTooltipOrigin = (index) => {
  switch(index) {
    case 0: // #1
      return 'left bottom';
    case 1: // #2
      return 'left center';
    case 2: // #3
      return 'left top';
    case 3: // #4
      return 'center top';
    case 4: // #5
      return 'right top';
    case 5: // #6
      return 'right bottom';
    default:
      return 'left center';
  }
};

// Custom triangle pointer positions
const getTrianglePosition = (index) => {
  switch(index) {
    case 0: // #1
      return 'bottom-0 left-6 translate-y-1/2';
    case 1: // #2
      return 'left-0 top-1/2 -translate-x-1/2 -translate-y-1/2';
    case 2: // #3
      return 'top-0 left-6 -translate-y-1/2';
    case 3: // #4
      return 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2';
    case 4: // #5
      return 'top-0 right-6 -translate-y-1/2';
    case 5: // #6
      return 'bottom-0 right-6 translate-y-1/2';
    default:
      return 'left-0 top-1/2 -translate-x-1/2 -translate-y-1/2';
  }
};

export default CircularProcess; 