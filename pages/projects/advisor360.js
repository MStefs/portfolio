import { useState, useRef, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaChevronDown, FaEye, FaChartLine, FaLightbulb, FaArrowLeft, FaArrowRight, FaExpand, FaTimes, FaUsers, FaSmile, FaMeh, FaFrown, FaPuzzlePiece, FaCogs, FaQuestionCircle, FaSitemap, FaSyncAlt, FaClipboardList, FaBullseye, FaRobot, FaBrain, FaSearch, FaLink, FaConnectdevelop } from "react-icons/fa";
import CircularProcess from "../../components/CircularProcess";

/* --- SCROLL PROGRESS BAR --- */
function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };
    
    // Removed the direct call to handleScroll(); here to ensure initial render is consistent.
    // Progress will now update only upon actual scroll events after mount.
    
    let timeoutId = null;
    const throttledScroll = () => {
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          handleScroll();
          timeoutId = null;
        }, 100);
      }
    };
    
    window.addEventListener("scroll", throttledScroll);
    return () => {
      window.removeEventListener("scroll", throttledScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);
  
  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50">
      <div 
        className="h-full bg-indigo-600" 
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}

/* --- BULLET ICONS --- */
const bulletIcons = [
  { icon: <FaEye className="text-blue-500" />, tooltip: "Observation" },
  { icon: <FaChartLine className="text-purple-500" />, tooltip: "Analysis" },
  { icon: <FaLightbulb className="text-amber-500" />, tooltip: "Insight" }
];

/* Image Gallery Component - Definition */
function ImageGallery({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalZoom, setModalZoom] = useState(1);
  const [isPanning, setIsPanning] = useState(false);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [startPanPosition, setStartPanPosition] = useState({ x: 0, y: 0 });
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  
  // Get current image
  const currentImage = images[currentIndex];
  
  // Use the existing bulletIcons from the parent scope

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const zoomIn = (e) => {
    e.stopPropagation();
    setModalZoom(prev => Math.min(prev + 0.25, 3));
  };

  const zoomOut = (e) => {
    e.stopPropagation();
    setModalZoom(prev => Math.max(prev - 0.25, 1));
  };

  const resetZoom = (e) => {
    if (e) e.stopPropagation();
    setModalZoom(1);
    setPanPosition({ x: 0, y: 0 });
  };

  const startPan = (e) => {
    e.preventDefault();
    setIsPanning(true);
    setStartPanPosition({
      x: e.clientX || (e.touches && e.touches[0].clientX) || 0,
      y: e.clientY || (e.touches && e.touches[0].clientY) || 0
    });
  };

  const doPan = (e) => {
    if (!isPanning) return;
    
    e.preventDefault();
    
    // Get current mouse/touch position
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    
    // Calculate the distance moved
    const deltaX = clientX - startPanPosition.x;
    const deltaY = clientY - startPanPosition.y;
    
    // Update the pan position - more direct update for smoother panning
    setPanPosition({
      x: panPosition.x + deltaX,
      y: panPosition.y + deltaY
    });
    
    // Update the start position for the next move
    setStartPanPosition({
      x: clientX,
      y: clientY
    });
  };

  const endPan = () => {
    setIsPanning(false);
  };

  const openModal = () => {
    setModalOpen(true);
    resetZoom();
  };

  const closeModal = (e) => {
    if (e) e.preventDefault();
    setModalOpen(false);
  };

  const onTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    setTouchStart(touchDown);
  };

  const onTouchMove = (e) => {
    if (modalZoom > 1) {
      // If zoomed in, handle panning instead of swiping
      doPan(e);
      return;
    }
    
    const touchDown = touchStart;
    
    if (touchDown === null) {
      return;
    }
    
    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;
    
    if (diff > 50) {
      nextImage();
      setTouchStart(null);
    }
    
    if (diff < -50) {
      prevImage();
      setTouchStart(null);
    }
  };

  const onTouchEnd = () => {
    setTouchStart(null);
    setIsPanning(false);
  };

  // Add key event handlers for modal
  useEffect(() => {
    if (!modalOpen) return;
    
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          prevImage();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        case 'Escape':
          closeModal(e);
          break;
        case '+':
        case '=':
          zoomIn(e);
          break;
        case '-':
          zoomOut(e);
          break;
        case '0':
          resetZoom(e);
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen]);

  return (
    <div className="w-full">
      {/* Container styled like the modal */}
      <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm">
        {/* Image Caption at the top */}
        <div className="w-full px-5 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-center">
          <h3 className="text-lg font-medium">{currentImage.caption}</h3>
        </div>
        
        {/* Bullet points under the header - modal-like style */}
        {currentImage.points && currentImage.points.length > 0 && (
          <div className="p-3 bg-gray-50 border-b">
            <div className="flex flex-row flex-wrap justify-center gap-2">
              {currentImage.points.map((point, idx) => {
                // Use icons for bullet points
                const iconIndex = idx % bulletIcons.length;
                const icon = bulletIcons[iconIndex].icon;
                const tooltip = bulletIcons[iconIndex].tooltip;
                
                // Color scheme matching modal style but lighter for regular view
                const colors = [
                  { bg: "bg-indigo-50", border: "border-indigo-200", text: "text-indigo-700" },
                  { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700" },
                  { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700" }
                ];
                const colorSet = colors[idx % colors.length];
                
                return (
                  <div 
                    key={idx} 
                    className={`flex items-start p-2 rounded-lg ${colorSet.bg} border ${colorSet.border} shadow-sm flex-1`}
                    style={{ maxWidth: "32%", minWidth: "200px" }}
                    title={tooltip}
                  >
                    <div className="flex-shrink-0 mr-2 mt-0.5">
                      {icon}
                    </div>
                    <p className={`text-sm ${colorSet.text}`}>{point}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Gallery container with navigation controls outside */}
        <div className="flex items-center gap-1 p-2">
          {/* Left arrow */}
          <motion.button 
            onClick={prevImage}
            className="flex-shrink-0 p-1 text-indigo-700 hover:text-indigo-900 focus:outline-none z-10"
            aria-label="Previous image"
            animate={{ x: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
          >
            <FaArrowLeft size={20} />
          </motion.button>
          
          {/* Image container - larger size */}
          <div className="relative bg-white overflow-hidden flex-grow">
            {/* Enhance button - moved to top right */}
            <button 
              onClick={openModal}
              className="absolute top-3 right-3 z-10 bg-white rounded-full p-1.5 hover:bg-gray-100 transition-colors shadow-md"
              aria-label="View full screen"
            >
              <FaExpand className="text-indigo-700" size={16} />
            </button>
            
            {/* Image container - increased height */}
            <div className={`relative ${isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`} onClick={toggleZoom}>
              <div className={`transition-transform duration-300 ${isZoomed ? "scale-125" : "scale-100"}`}>
                <Image 
                  src={currentImage.src} 
                  alt={currentImage.caption || ""}
                  width={1200}
                  height={800}
                  className="w-full object-contain"
                  style={{ height: "60vh", objectFit: "contain" }} // Larger image height
                />
              </div>
            </div>
          </div>
          
          {/* Right arrow */}
          <motion.button 
            onClick={nextImage}
            className="flex-shrink-0 p-1 text-indigo-700 hover:text-indigo-900 focus:outline-none z-10"
            aria-label="Next image"
            animate={{ x: [0, 3, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
          >
            <FaArrowRight size={20} />
          </motion.button>
        </div>
      
        {/* Image counter and navigation dots */}
        <div className="bg-gray-50 py-2 px-4 flex justify-center items-center">
          <div className="flex flex-col items-center">
            <div className="text-sm text-gray-500 mb-1">
              {currentIndex + 1} of {images.length}
            </div>
            
            <div className="flex space-x-1.5">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full ${currentIndex === index ? 'bg-indigo-600 scale-110' : 'bg-gray-300'}`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Modal with all features */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => { 
              // If zoomed in, reset zoom when clicking anywhere that's not the image
              if (modalZoom > 1) {
                // Only reset if not clicking on the image itself
                if (!e.target.closest('.modal-image-container')) {
                  resetZoom(e);
                }
              } else {
                // If at normal zoom, close the modal
                closeModal(e);
              }
            }}
          >
            <div className="absolute top-4 right-4 z-40">
              <button 
                onClick={(e) => { e.stopPropagation(); closeModal(e); }}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-3 text-white transition-all duration-200 shadow-lg"
                aria-label="Close modal"
              >
                <FaTimes size={24} />
              </button>
            </div>
            
            <motion.div 
              className="relative w-full max-w-7xl h-full flex flex-col items-center justify-center px-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              {/* Title and bullet points above the image instead of overlaid */}
              {modalZoom <= 1 && (
                <motion.div 
                  className="w-full max-w-5xl mb-2"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {/* Caption at the top - more compact */}
                  <div className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg text-white shadow-lg mx-auto mb-2 max-w-fit">
                    <h3 className="text-base font-medium">{currentImage.caption}</h3>
                  </div>
                  
                  {/* Bullet points shown with icons in the modal - more compact */}
                  {currentImage.points && currentImage.points.length > 0 && (
                    <div className="backdrop-blur-md bg-black bg-opacity-30 rounded-xl p-1.5 max-w-5xl mx-auto shadow-xl">
                      <div className="flex flex-row justify-center flex-wrap">
                        {currentImage.points.map((point, idx) => {
                          // Use icons instead of numbers
                          const iconIndex = idx % bulletIcons.length;
                          const icon = bulletIcons[iconIndex].icon;
                          const tooltip = bulletIcons[iconIndex].tooltip;
                          
                          // Color scheme matching impact section but more vibrant for modal
                          const modalColors = [
                            { bg: "from-indigo-600/90 to-indigo-700/90", accent: "text-white" },
                            { bg: "from-blue-600/90 to-blue-700/90", accent: "text-white" },
                            { bg: "from-purple-600/90 to-purple-700/90", accent: "text-white" }
                          ];
                          const colorSet = modalColors[idx % modalColors.length];
                          
                          return (
                            <motion.div 
                              key={idx} 
                              className={`flex items-start bg-gradient-to-br ${colorSet.bg} p-1.5 rounded-lg shadow-lg m-1 flex-1`}
                              style={{ maxWidth: `${100/Math.min(currentImage.points.length, 3)}%`, minWidth: "180px" }}
                              initial={{ scale: 0.9, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: 0.05 + (idx * 0.08) }}
                            >
                              <div className="flex-shrink-0 mr-2 w-5 h-5 flex items-center justify-center bg-white/20 rounded-full shadow-inner">
                                <span className={colorSet.accent}>{icon}</span>
                              </div>
                              <p className="text-xs text-white font-medium line-clamp-2">{point}</p>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Main container with image and side arrows */}
              <div className="flex items-center justify-center w-full">
                {/* Left arrow for modal navigation - only visible when not zoomed */}
                {modalZoom <= 1 && (
                  <motion.button 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      prevImage(); 
                    }}
                    className="flex-shrink-0 mr-2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-2.5 rounded-full shadow-lg z-30"
                    aria-label="Previous image"
                    animate={{ x: [0, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
                  >
                    <FaArrowLeft size={20} />
                  </motion.button>
                )}

                {/* Center image container with the actual image being handled separately - BIGGER */}
                <div 
                  className="relative modal-image-container" 
                  style={{ 
                    width: 'calc(100% - 100px)', // Make room for side arrows
                    height: '74vh', // Increased height for bigger image
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {/* Touch area for swipe - only used when not zoomed in */}
                  {modalZoom <= 1 && (
                    <div 
                      className="absolute inset-0 z-10"
                      onTouchStart={onTouchStart}
                      onTouchMove={onTouchMove}
                      onTouchEnd={onTouchEnd}
                    />
                  )}
                  
                  {/* Modal image container - fixed position during zoom */}
                  <div 
                    className="relative overflow-hidden touch-none w-full h-full flex items-center justify-center" 
                  >
                    <div 
                      className={`${modalZoom > 1 ? 'cursor-grab active:cursor-grabbing' : ''} ${isPanning ? '' : 'transition-transform duration-200'}`} 
                      style={{ 
                        transform: `scale(${modalZoom}) translate(${panPosition.x / modalZoom}px, ${panPosition.y / modalZoom}px)`,
                        transformOrigin: 'center center',
                        maxWidth: '100%',
                        maxHeight: '100%',
                      }}
                      onMouseDown={startPan}
                      onMouseMove={doPan}
                      onMouseUp={endPan}
                      onMouseLeave={endPan}
                      onTouchStart={onTouchStart}
                      onTouchMove={onTouchMove}
                      onTouchEnd={onTouchEnd}
                    >
                      <Image 
                        src={currentImage.src} 
                        alt={currentImage.caption}
                        width={2200}
                        height={1600}
                        className="w-full h-auto object-contain select-none"
                        style={{ maxHeight: "74vh" }} // Increased to match container
                        priority={true}
                        draggable="false"
                        onDragStart={(e) => e.preventDefault()}
                      />
                    </div>
                    
                    {/* Zoom controls - positioned in fixed location and made smaller */}
                    <div className="absolute right-3 top-3 z-30 flex flex-col space-y-1.5">
                      <button 
                        onClick={zoomIn}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-1 w-7 h-7 flex items-center justify-center shadow-lg transition-colors"
                        aria-label="Zoom in"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                      <button 
                        onClick={zoomOut}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-1 w-7 h-7 flex items-center justify-center shadow-lg transition-colors"
                        aria-label="Zoom out"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                        </svg>
                      </button>
                      <button 
                        onClick={resetZoom}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-1 w-7 h-7 flex items-center justify-center shadow-lg transition-colors"
                        aria-label="Reset zoom"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right arrow for modal navigation - only visible when not zoomed */}
                {modalZoom <= 1 && (
                  <motion.button 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      nextImage(); 
                    }}
                    className="flex-shrink-0 ml-2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-2.5 rounded-full shadow-lg z-30"
                    aria-label="Next image"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
                  >
                    <FaArrowRight size={20} />
                  </motion.button>
                )}
              </div>

              {/* Navigation and controls BELOW the image - smaller for more image space */}
              <motion.div 
                className="w-full flex flex-col items-center mt-2 z-30"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {/* Smaller zoom pill on top */}
                <div className="text-white bg-black bg-opacity-50 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-xs shadow-lg mb-1.5">
                  <span>Zoom: {(modalZoom * 100).toFixed(0)}%</span>
                  {modalZoom > 1 && (
                    <span className="ml-2 text-yellow-300">• Click outside to reset zoom</span>
                  )}
                </div>
                
                {/* Centered image counter and dots - more compact */}
                <div className="flex bg-black bg-opacity-50 backdrop-blur-sm px-3 py-1.5 rounded-full items-center shadow-lg">
                  {/* Image counter */}
                  <div className="text-white text-sm font-medium mr-3">
                    {currentIndex + 1} of {images.length}
                  </div>
                  
                  {/* Image dots navigation */}
                  <div className="flex space-x-1.5">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => { e.stopPropagation(); setCurrentIndex(index); }}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-white scale-110' : 'bg-gray-500 hover:bg-white/70'}`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* --- PROJECT DETAILS (Advisor360 Data) --- */
const projectDetails = {
  title: "Financial Advisor Feedback Intelligence Analysis",
  subtitle: "Transforming scattered feedback into actionable product insights",
  overview: `
    This quantitative UX research initiative addressed the challenge of fragmented user feedback by developing an intelligence dashboard. Analyzing over 15,395 feedback items (spanning 2020-2025), we employed time series analysis, user segmentation, ML-driven sentiment analysis (e.g., 14% Negative, 79% Neutral), and NLP-based feature request clustering (1,673 ideas from 19K votes). The resulting dashboard provided a centralized, quantifiable view of user sentiment and priorities, leading to an 83% reduction in PMs\' manual feedback processing time, a 45% improvement in feature prioritization accuracy, and a 25% uplift in CSAT for targeted UX improvements.
  `,
  problem_statement_intro: "Advisor360 faced a significant operational hurdle: user feedback, a goldmine of insights, was scattered across numerous channels—emails, support tickets, survey responses, and various internal systems. This disorganization made it nearly impossible to get a clear, holistic view of user sentiment and emerging needs.",
  challenge_areas: [
    {
      title: "Overwhelming & Siloed Feedback",
      iconName: "FaPuzzlePiece", 
      initialText: "How could we unify fragmented user voice?",
      details: "Feedback was trapped in disparate systems (15K+ items), preventing a unified view and leading to missed insights and duplicated effort in manual collation."
    },
    {
      title: "Unquantified Sentiment & Trends",
      iconName: "FaChartLine",
      initialText: "What did users *really* feel, and how was it changing?",
      details: "Without robust analysis, it was difficult to quantify overall user sentiment, track its evolution over time, or identify statistically significant trends versus anecdotal noise."
    },
    {
      title: "Reactive & Slow Insight Generation",
      iconName: "FaCogs", 
      initialText: "Could we move from slow manual review to proactive insights?",
      details: "Product Managers spent excessive time (avg. 12hrs/week) manually sifting through feedback, delaying insight generation and leading to reactive rather than proactive product decisions."
    }
  ],
  state_before_insight: {
    gap: {
      title: "The High Cost of Disconnected Feedback",
      iconName: "FaQuestionCircle",
      points: [
        "Inability to accurately gauge user satisfaction or the impact of product changes.",
        "Product roadmap decisions were often based on assumptions or the loudest voices, not comprehensive data.",
        "Missed opportunities to proactively address user pain points or capitalize on positive trends.",
        "Significant PM and UXR time consumed by manual feedback processing (83% of which was later automated)."
      ]
    },
    research_goals: {
      title: "Our Research Aimed To:",
      iconName: "FaLightbulb",
      points: [
        "Create a centralized, single source of truth for all user feedback.",
        "Implement automated sentiment analysis and trend identification.",
        "Develop an interactive dashboard for PMs to easily explore and understand feedback data.",
        "Drastically reduce manual effort and empower data-driven prioritization."
      ]
    }
  },
  challenge_quote: {
    text: "We're drowning in data but starving for wisdom. We know users are talking, but we can't hear the symphony for the noise of a thousand different instruments.",
    source: "Director of Product"
  },
  challenge_conclusion: {
    title: "Orchestrating User Feedback into Actionable Intelligence",
    text: "The core challenge was to transform this cacophony of fragmented feedback into a harmonized, intelligent system. This research initiative set out to build a solution that could not only collect and organize feedback but also analyze and visualize it, turning raw user comments into clear, actionable insights for strategic product development."
  },
  duration: "Q1 2023 - Q1 2025",
  team: ["UX Researcher (Me)", "Product Manager", "Senior Product Manager", "Data Scientist", "Director of Product", "UXR Manager", "VP of Product"],
  myRole: `
    As Lead UX Researcher, I strived to transform user feedback into actionable intelligence. My responsibilities included defining research objectives, designing the dashboard\'s information architecture, conducting user interviews with product managers, and performing quantitative analysis (time series, sentiment, clustering). I translated these findings into actionable requirements, directly enabling data-informed product decisions and significant efficiency gains for PMs.
  `,
  
  research_questions_intro: "To address the challenge of fragmented feedback and build an effective intelligence dashboard, our research was guided by key questions aimed at understanding current processes, defining actionable insights, and leveraging technology.",
  research_question_categories: [
    {
      title: "Understanding the Current Feedback Landscape",
      iconName: "FaClipboardList",
      objective: "To map existing feedback mechanisms and identify critical gaps and pain points for Product Managers.",
      questions: [
        "How are product managers currently collecting, processing, and utilizing user feedback across various channels?",
        "What critical information or nuances are being missed, diluted, or misinterpreted in the current manual feedback process?",
        "What are the primary frustrations and inefficiencies PMs experience when trying to synthesize and act on user feedback?"
      ]
    },
    {
      title: "Defining Actionable Insights & Dashboard Needs",
      iconName: "FaBullseye",
      objective: "To determine the most valuable metrics and visualizations for a dashboard that empowers data-driven decisions.",
      questions: [
        "Which specific feedback metrics (e.g., sentiment scores, trend velocity, feature request volume) would provide the most actionable insights for product strategy and UX improvements?",
        "How can feedback patterns, sentiment distributions, and feature request clusters be most effectively visualized to help PMs quickly identify priority areas and emerging trends?",
        "What level of data granularity, filtering, and drill-down capability do PMs require to confidently analyze feedback related to specific product features or user segments?"
      ]
    },
    {
      title: "Leveraging Technology for Enhanced Analysis",
      iconName: "FaRobot",
      objective: "To explore how advanced technologies like Machine Learning could automate and elevate the feedback analysis process.",
      questions: [
        "How can machine learning (e.g., NLP, sentiment analysis, clustering algorithms) be employed to automate the categorization, tagging, and summarization of large feedback volumes?",
        "What are the accuracy and reliability considerations for ML-driven feedback analysis, and how can these be validated?",
        "Beyond automation, how can AI/ML surface deeper, predictive insights from feedback that might not be apparent through manual review alone?"
      ]
    }
  ],
  research_questions_conclusion: {
    title: "From Questions to Methods: A Strategic Approach",
    iconName: "FaUsers",
    text: "These focused inquiries were crucial in shaping our research strategy. They ensured that the methods chosen—like Time Series Analysis for trends, Sentiment Analysis for user feelings, and NLP Clustering for feature requests—were precisely targeted to deliver the comprehensive insights needed for the feedback intelligence dashboard and ultimately address the core challenge."
  },
  // research_questions: [
  //   "How are product managers currently collecting and processing user feedback?",
  //   "What critical information is being missed or diluted in the current process?",
  //   "Which feedback metrics would provide the most actionable insights for product decisions?",
  //   "How might we visualize feedback patterns to identify priority improvement areas?",
  //   "What level of granularity do PMs need when analyzing sentiment across product features?",
  //   "How can machine learning enhance the feedback analysis process?"
  // ],
  
  methods: [
    {
      name: "Time Series Analysis",
      description: "Analysis of 15,395 feedback items from 2020 to 2025, showing peak volumes of 2.7K in 2023."
    },
    {
      name: "User Segmentation",
      description: "Categorization of feedback by user type (Advisors, BAA, Fee Only Advisors) and category (Client Services: 7.3K, Practice: 6.3K, Technology: 3.0K)."
    },
    {
      name: "Sentiment Analysis",
      description: "Implementation of machine learning algorithms to categorize feedback as Neutral (79%), Negative (14%), Positive (4%), Very Positive (2%), and Very Negative (1%)."
    },
    {
      name: "Feature Request Clustering",
      description: "Natural language processing to identify and group 1,673 feature ideas with 19K user votes across categories (CRM: 6.0K, Client360°: 4.2K, Investor360°: 2.9K)."
    }
  ],
  
  key_insights: [
    "Streamlined PM Workflow & UX Focus: The automated intelligence dashboard reduced Product Managers\' weekly manual feedback processing from 12 hours to just 2 hours. This 83% efficiency gain allowed PMs to reallocate time towards proactive UX analysis and direct user engagement, rather than data triage.",
    "User-Driven Prioritization Clarity: Natural Language Processing and clustering techniques organized 1,673 disparate feature ideas (backed by 19K user votes) into actionable themes (e.g., CRM: 6.0K votes). This provided a clear, user-data-driven hierarchy for prioritizing the product backlog.",
    "Quantified User Sentiment Landscape: ML-driven sentiment analysis across 15,395 feedback items provided a precise emotional landscape (e.g., 14% Negative, 4% Positive). This enabled PMs to rapidly identify and target high-friction UX areas or validate positive experiences.",
    "Targeted UX Improvement Hotspots: Segmenting feedback by product category (e.g., Client Services: 7.3K items, Practice: 6.3K) and user type highlighted critical 'hotspots,' guiding focused UX investigations and resource allocation to areas with the highest user engagement or concern.",
    "Real-Time UX Impact Monitoring: Interactive time-series visualizations tracking 15,395 feedback items (2020-2025) allowed PMs to continuously monitor user feedback trends and proactively identify the UX impact of product changes or emerging issues.",
    "Established UX Benchmarking: The intelligence dashboard enabled consistent Customer Satisfaction (CSAT) tracking (Mean: 88, Median: 90), establishing a vital UX benchmark to objectively measure the impact of new features and design iterations over time."
  ],
  
  impact_outcomes: {
    metrics: [
      "83% Reduction in Manual Feedback Processing Time: Freed up an average of 10 Product Manager hours per week, enabling a shift from reactive data sorting to proactive UX research and design validation activities.",
      "45% Improvement in Feature Prioritization Accuracy: Measured by alignment of developed features with top user-voted themes from the dashboard, leading to more impactful releases.",
      "25% Uplift in CSAT for Targeted UX Interventions: Achieved for product areas where dashboard insights (sentiment & clustering) directly guided UX improvements and redesigns."
    ],
    business_outcomes: [
      "Data-Driven Product Strategy: Enabled a more strategic and user-centered product roadmap, with development efforts demonstrably aligned with quantified user needs and sentiment trends.",
      "Accelerated UX Iteration Cycles: Reduced the time to identify, validate, and address UX issues by 50% due to real-time feedback visibility and clear prioritization.",
      "Enhanced User Retention & Adoption: Contributed to a 15% decrease in churn related to usability friction and a 20% faster adoption rate for features that were directly informed by clustered user feedback."
    ]
  },
  
  images: [
    {
      caption: "Client Analysis Dashboard",
      src: "/images/Feedback_Files/AFPB copy_Redacted_Page_02.jpg",
      points: [
        "Interactive time series visualizations tracking feedback volume across quarters from 2020-2025",
        "Total of 15,395 feedback items with detailed client-based segmentation analysis",
        "Breakdown showing 83% of feedback (15.32K items) from one segment and 17% (3.13K items) from another"
      ]
    },
    {
      caption: "Title & Description Analysis",
      src: "/images/Feedback_Files/AFPB copy_Redacted_Page_03.jpg",
      points: [
        "Word cloud visualization highlighting frequency of key terms in feedback submissions",
        "Interactive table of recent feedback items showing specific user requests and issues",
        "Standing instruction formatting and joint account field size identified as common pain points"
      ]
    },
    {
      caption: "Category Group Analysis",
      src: "/images/Feedback_Files/AFPB copy_Redacted_Page_04.jpg",
      points: [
        "Categorical breakdown of feedback by service area with volume metrics",
        "Client Services (7.3K), Practice (6.32K), Technology (3.02K) identified as top categories",
        "Year-over-year trend analysis showing category growth patterns with peak volumes of 2.5K in 2023"
      ]
    },
    {
      caption: "Company & User Distribution",
      src: "/images/Feedback_Files/AFPB copy_Redacted_Page_05.jpg",
      points: [
        "User type segmentation showing feedback distribution by role (Advisors, BAA, Fee Only Advisor)",
        "Company-level data displaying feedback volume by organization",
        "Detailed tracking of individual feedback submissions with ID reference for follow-up"
      ]
    },
    {
      caption: "Request Type Analysis",
      src: "/images/Feedback_Files/AFPB copy_Redacted_Page_06.jpg",
      points: [
        "Categorization by request type with Client Services (4.7K) and Practice (3.2K) as dominant areas",
        "Time series showing peak feedback volume of 2.7K in 2023 with projection trending downward",
        "Enhancement requests highlighted as majority of feedback submissions with specific examples"
      ]
    },
    {
      caption: "Customer Satisfaction Metrics",
      src: "/images/Feedback_Files/AFPB copy_Redacted_Page_07.jpg",
      points: [
        "CSAT score tracking with current Mean of 88 and Median of 90 across feedback channels",
        "Weekly trend analysis showing satisfaction fluctuations with lowest point of 79 in August 2024",
        "Individual CSAT scores by feedback item with complete submission details for context"
      ]
    },
    {
      caption: "Feature Ideas Dashboard",
      src: "/images/Feedback_Files/AFPB copy_Redacted_Page_08.jpg",
      points: [
        "Feature idea management showing 1,673 total ideas with 19K user votes",
        "Status breakdown: 1,531 suggested, 33 in development, 131 archived",
        "Category distribution with CRM (6.0K votes), Client360° (4.2K), and Investor360° (2.9K) as priorities"
      ]
    },
    {
      caption: "Sentiment Analysis Dashboard",
      src: "/images/Feedback_Files/AFPB copy_Redacted_Page_09.jpg",
      points: [
        "Sentiment classification across all feedback with interactive filtering capabilities",
        "Distribution showing 79% Neutral, 14% Negative, 4% Positive, 2% Very Positive, 1% Very Negative",
        "Time-series tracking of sentiment trends with monthly breakdown of feedback volume"
      ]
    }
  ]
};

/* --- DOWN ARROW PROMPT --- */
function DownArrowPrompt({ onClick }) {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      onClick={onClick}
    >
      <FaChevronDown className="text-2xl text-gray-500 animate-bounce" />
    </motion.div>
  );
}

/* --- ADVISOR360 PAGE USING UXRCase LAYOUT --- */
export default function Advisor360Page() {
  const [activeSection, setActiveSection] = useState("overview");
  const sectionRefs = {
    overview: useRef(null),
    problem_statement: useRef(null),
    research_questions: useRef(null),
    methods: useRef(null),
    process: useRef(null),
    findings_insights: useRef(null),
    impact_outcomes: useRef(null),
    visuals1: useRef(null),
    visuals2: useRef(null),
    visuals3: useRef(null),
    visuals4: useRef(null),
    visuals5: useRef(null),
    visuals6: useRef(null),
    visuals7: useRef(null),
    visuals8: useRef(null),
    visuals9: useRef(null),
    visuals10: useRef(null),
    visuals11: useRef(null),
    thankyou: useRef(null)
  };

  // Add this state variable to track which card's popup is open
  const [openActionPopup, setOpenActionPopup] = useState(null);
  
  // Create a function to toggle the popup
  const toggleActionPopup = (index) => {
    if (openActionPopup === index) {
      setOpenActionPopup(null); // Close if already open
    } else {
      setOpenActionPopup(index); // Open the clicked one
    }
  };

  useEffect(() => {
    let observer;
    const options = {
      root: null, // viewport
      rootMargin: "0px 0px -66% 0px", // Target the top 33% of the viewport for intersection
      threshold: 0.01, // Section needs to be 1% visible within this top zone
    };
    
    const observerCallback = (entries) => {
      let highestVisibleSection = null;
      let minTop = Infinity;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const boundingTopy = entry.boundingClientRect.top;
          if (boundingTopy < minTop) {
            minTop = boundingTopy;
            highestVisibleSection = entry.target.id;
          }
        }
      });

      if (highestVisibleSection) {
        // Check if this section is one of our defined sections before setting
        // This prevents issues if other observed elements somehow trigger this.
        if (sectionRefs[highestVisibleSection]) {
            setActiveSection(highestVisibleSection);
          }
      }
      // Note: We are not handling the case where NO sections are intersecting.
      // In that scenario, activeSection would retain its last value.
      // This is usually fine as something should typically be intersecting if content exists.
    };

    observer = new IntersectionObserver(observerCallback, options);
    
    Object.values(sectionRefs).forEach((refCollection) => {
      // sectionRefs might contain single refs or arrays of refs (if sections are mapped)
      // Ensure we handle both cases, though in this file they are single refs.
      const refsToObserve = Array.isArray(refCollection) ? refCollection : [refCollection];
      refsToObserve.forEach(ref => {
        if (ref && ref.current) {
          observer.observe(ref.current);
      }
      });
    });
    
    return () => {
      Object.values(sectionRefs).forEach((refCollection) => {
        const refsToUnobserve = Array.isArray(refCollection) ? refCollection : [refCollection];
        refsToUnobserve.forEach(ref => {
          if (ref && ref.current) {
            observer.unobserve(ref.current);
          }
        });
      });
        observer.disconnect();
    };
  }, []); // Empty dependency array: run only on mount and clean up on unmount

  const scrollToSection = (sectionId) => {
    if (sectionRefs[sectionId] && sectionRefs[sectionId].current) {
      sectionRefs[sectionId].current.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  const navItems = [
    { id: "overview", label: "Overview" },
    { id: "problem_statement", label: "Challenge" },
    { id: "research_questions", label: "Research Questions" },
    { id: "methods", label: "Methods" },
    { id: "process", label: "Process" },
    { id: "findings_insights", label: "Key Findings" },
    { id: "impact_outcomes", label: "Impact" },
    { id: "visuals1", label: "Visuals" }
  ];

  // Define process steps within project details or directly in the component
  const processSteps = [
    {
      title: "Research Planning",
      description: "Defined research goals, identified key stakeholders, and developed a comprehensive plan to understand how product managers currently handled feedback."
    },
    {
      title: "Data Discovery",
      description: "Conducted thorough review of existing feedback channels, interviewed 12 product managers to understand their workflow challenges, and audited current tools."
    },
    {
      title: "Analysis & Synthesis",
      description: "Applied sentiment analysis to historical feedback, identified common friction points, and mapped current vs. ideal workflow states."
    },
    {
      title: "Dashboard Design",
      description: "Created information architecture, developed data visualization models, and designed UI with clear categorization of sentiment trends."
    },
    {
      title: "Implementation",
      description: "Collaborated with developers to implement ML-based sentiment scoring and automated categorization systems."
    },
    {
      title: "Evaluation & Iteration",
      description: "Measured dashboard effectiveness against KPIs, gathered ongoing user feedback, and implemented iterative improvements to the system."
    }
  ];

  // Add this before the return statement in the Advisor360Page component
  const researchSteps = [
    {
      title: "Challenge Identification",
      description: "Identified the key challenge of product managers struggling to efficiently process large volumes of user feedback spread across multiple channels.",
      insights: [
        "Conducted interviews with Product Managers to understand their feedback processing workflows.",
        "Observed PMs interacting with existing feedback tools to identify specific pain points and inefficiencies.",
        "Formulated initial research questions to guide the investigation into feedback management issues."
      ]
    },
    {
      title: "Data Source Mapping",
      description: "Located and documented all feedback sources including support tickets, user interviews, app store reviews, and internal feedback channels.",
      insights: [
        "Audited all existing systems and repositories where user feedback was stored.",
        "Interviewed data owners and stakeholders to understand the nuances of each feedback channel.",
        "Documented the format, metadata, and accessibility of data from each identified source."
      ]
    },
    {
      title: "SQL Querying & Cleaning",
      description: "Extracted raw feedback data using SQL queries, then cleaned and normalized the data to create a unified dataset for analysis.",
      insights: [
        "Developed and executed SQL queries to extract feedback data from various databases and logs.",
        "Implemented data cleaning scripts to standardize formats, remove duplicates, and handle missing values.",
        "Established a unified data schema and metadata tagging system for the aggregated feedback."
      ]
    },
    {
      title: "Data Visualization",
      description: "Developed visualizations to identify patterns, sentiment trends, and key insights from the aggregated feedback data.",
      insights: [
        "Prototyped various visualization types (e.g., time-series, sentiment distribution, word clouds) with sample data.",
        "Conducted sessions with PMs to test the clarity and usefulness of different visual representations.",
        "Iteratively refined dashboard mockups based on PM feedback to ensure actionable insights."
      ]
    },
    {
      title: "Dashboard Implementation",
      description: "Delivered a comprehensive feedback management dashboard that PMs could use in their daily workflow to track, categorize, and act on user feedback.",
      insights: [
        "Collaborated with data scientists and engineers to build ETL pipelines for the dashboard.",
        "Designed and developed interactive dashboard components, including filters and drill-down capabilities.",
        "Conducted training sessions for PMs on utilizing the new dashboard and gathered feedback for iterative improvements."
      ]
    }
  ];

  return (
    <div className="flex xl:h-screen xl:overflow-hidden">
      <ScrollProgress />
      <Sidebar />
      <main className="w-full xl:ml-[24%] xl:w-[76%] xl:h-screen xl:overflow-y-scroll xl:snap-y xl:snap-mandatory">
        {/* Sticky Navigation */}
        <div className="sticky top-0 z-40 py-2 xl:py-3 backdrop-blur-sm bg-opacity-30">
          {/* Full nav for xl screens and up */}
          <div className="hidden xl:flex justify-center mx-auto">
            <nav className="flex space-x-3 xl:space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-2 py-0.5 text-xs xl:px-3 xl:py-1 xl:text-sm font-medium rounded-md transition-colors ${
                    activeSection === item.id
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
          {/* Active section title for screens smaller than xl */}
          <div className="flex xl:hidden justify-center items-center h-full px-4">
            {(() => {
              let displayLabel = "";
              if (activeSection === 'thankyou') {
                // displayLabel = "Contact"; // Old logic
                // New logic: Set to "Visuals" (label of the last main content section)
                const visualsNavItem = navItems.find(item => item.id === 'visuals1');
                displayLabel = visualsNavItem ? visualsNavItem.label : "Visuals"; 
              } else {
                const currentNavItem = navItems.find(item => item.id === activeSection || (item.id === 'visuals1' && activeSection && activeSection.startsWith('visuals')));
                if (currentNavItem) {
                  displayLabel = currentNavItem.label;
                } else {
                  displayLabel = activeSection.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()).split(" ").slice(0,2).join(" ");
                  if (displayLabel.length > 20 && displayLabel.includes(" ")) displayLabel = displayLabel.split(" ")[0] + "..."; 
                  else if (displayLabel.length > 20) displayLabel = displayLabel.substring(0, 18) + "...";
                  else if (!displayLabel) displayLabel = projectDetails.title ? projectDetails.title.split(" ").slice(0,2).join(" ") + "..." : "Menu";
                }
              }
              
              if (displayLabel.length > 18 && displayLabel.includes(" ")) { 
                  const words = displayLabel.split(" ");
                  if (words.length > 1 && words[0].length < 12) displayLabel = words[0] + " " + words[1].charAt(0) + ".";
                  else if (words.length > 1) displayLabel = words[0].substring(0,12) + "...";
                  else displayLabel = displayLabel.substring(0, 15) + "...";
              } else if (displayLabel.length > 18) {
                  displayLabel = displayLabel.substring(0, 15) + "...";
              }

              return (
                <span className="text-xs font-medium text-indigo-700 bg-indigo-100 px-3 py-1 rounded-md truncate" style={{ maxWidth: '180px' }}> 
                  {displayLabel || "Overview"}
                </span>
              );
            })()}
          </div>
        </div>

        {/* Overview Section */}
        <section 
          ref={sectionRefs.overview}
          id="overview" 
          className="xl:snap-start xl:h-screen flex flex-col justify-center items-center py-16 px-4 xl:py-10 xl:px-8 relative"
        >
          <div className="w-full xl:max-w-4xl mx-auto">
            {/* Project title and subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-2"
            >
              <h1 className="text-4xl font-bold text-indigo-700 mb-1">
              {projectDetails.title}
              </h1>
              <p className="text-lg text-gray-600">
              {projectDetails.subtitle}
              </p>
            </motion.div>
            
            {/* Key project details - cards layout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
            >
              {/* Duration card */}
              <div className="bg-white rounded-lg shadow-sm p-4 border-t-4 border-blue-400">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h3 className="font-semibold text-gray-800">Project Duration</h3>
                </div>
                <p className="text-gray-600 text-sm">{projectDetails.duration}</p>
              </div>
              
              {/* My role card */}
              <div className="bg-white rounded-lg shadow-sm p-4 border-t-4 border-purple-400">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <h3 className="font-semibold text-gray-800">My Role</h3>
                </div>
                <p className="text-gray-600 text-sm">{projectDetails.myRole}</p>
              </div>
              
              {/* Team card */}
              <div className="bg-white rounded-lg shadow-sm p-4 border-t-4 border-green-400">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <h3 className="font-semibold text-gray-800">Team</h3>
                </div>
                <div className="text-gray-600 text-sm">
                  {projectDetails.team.map(member => <div key={member}>{member}</div>)}
                </div>
              </div>
            </motion.div>
            
            {/* Overview information with cleaner layout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="bg-white rounded-lg shadow-sm p-5">
                <div className="flex items-start mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
              <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Project Overview</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{projectDetails.overview}</p>
                    
                    {/* Removing Key Challenge section */}
              </div>
              </div>
                
                {/* Technologies used - simple inline pills */}
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    <h4 className="text-sm font-medium text-gray-700">Technologies & Methods</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {projectDetails.methods.map((method, index) => (
                      <span key={index} className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-600">
                        {method.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tools used - similar styling as technologies */}
                <div className="border-t border-gray-100 pt-4 mt-4">
                  <div className="flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                    <h4 className="text-sm font-medium text-gray-700">Tools</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {projectDetails.tools && projectDetails.tools.map((tool, index) => (
                      <span key={index} className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-600">
                        {tool}
                      </span>
                    ))}
                    {!projectDetails.tools && [
                      "Power BI", "Microsoft SQL Studio", "Snowflake", "Python", "Hugging Face", "Miro"
                    ].map((tool, index) => (
                      <span key={index} className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-600">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <DownArrowPrompt onClick={() => scrollToSection("research_questions")} />
        </section>

        {/* Problem Statement Section */}
        <section 
          ref={sectionRefs.problem_statement}
          id="problem_statement" 
          className="xl:snap-start xl:h-screen flex flex-col justify-center items-center py-16 px-4 xl:py-12 xl:px-6 bg-gray-50 relative"
        >
          <div className="w-full xl:max-w-4xl mx-auto">
            <motion.h2
              className="text-3xl font-bold text-gray-900 mb-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              The Challenge: From Feedback Chaos to Clarity
            </motion.h2>
            
            <motion.p
              className="text-center text-gray-600 text-sm mb-6 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              {projectDetails.problem_statement_intro}
            </motion.p>

            {/* Challenge Areas */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {projectDetails.challenge_areas.map((challenge, index) => (
                  <motion.div 
                  key={index}
                  className="relative group bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 min-h-[160px] flex flex-col justify-center"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-2 text-indigo-600 group-hover:text-white transition-colors duration-300">
                      {challenge.iconName === 'FaPuzzlePiece' && <FaPuzzlePiece size={28} />}
                      {challenge.iconName === 'FaSitemap' && <FaSitemap size={28} />}
                      {challenge.iconName === 'FaChartLine' && <FaChartLine size={28} />}
                      {challenge.iconName === 'FaCogs' && <FaCogs size={28} />}
                      {challenge.iconName === 'FaSyncAlt' && <FaSyncAlt size={28} />}
                    </div>
                    <h4 className="text-md font-semibold text-gray-800 mb-1 group-hover:text-white transition-colors duration-300">{challenge.title}</h4>
                    <p className="text-xs text-gray-600 px-1 h-10 group-hover:h-0 group-hover:opacity-0 opacity-100 transition-all duration-300 overflow-hidden flex items-center justify-center">
                        {challenge.initialText}
                    </p>
                    </div>
                  <div className="absolute inset-0 bg-indigo-600 text-white p-3 rounded-lg flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="mb-2 text-white">
                      {challenge.iconName === 'FaPuzzlePiece' && <FaPuzzlePiece size={24} />}
                      {challenge.iconName === 'FaSitemap' && <FaSitemap size={24} />}
                      {challenge.iconName === 'FaChartLine' && <FaChartLine size={24} />}
                      {challenge.iconName === 'FaCogs' && <FaCogs size={24} />}
                      {challenge.iconName === 'FaSyncAlt' && <FaSyncAlt size={24} />}
          </div>
                    <h5 className="font-semibold mb-1 text-sm text-center">{challenge.title}</h5>
                    <p className="text-xs text-center text-indigo-100 leading-snug">{challenge.details}</p>
                    </div>
                </motion.div>
              ))}
                  </motion.div>
                  
            {/* State Before Insight */}
                  <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              {[projectDetails.state_before_insight.gap, projectDetails.state_before_insight.research_goals].map((item, index) => (
                <div key={index} className={`p-4 rounded-lg shadow-sm ${index === 0 ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'} border`}>
                  <div className="flex items-center mb-2">
                    <div className={`mr-2 ${index === 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {item.iconName === 'FaQuestionCircle' && <FaQuestionCircle size={22} />}
                      {item.iconName === 'FaLightbulb' && <FaLightbulb size={22} />}
                    </div>
                    <h4 className={`text-sm font-semibold ${index === 0 ? 'text-red-700' : 'text-green-700'}`}>{item.title}</h4>
                    </div>
                  <ul className="space-y-1.5">
                    {item.points.map((point, pIndex) => (
                      <li key={pIndex} className="flex items-start text-xs text-gray-700 leading-relaxed">
                        <span className={`mr-2 mt-1 flex-shrink-0 ${index === 0 ? 'text-red-500' : 'text-green-500'}`}>&#8226;</span>
                        {point}
                      </li>
                    ))}
                      </ul>
                    </div>
              ))}
            </motion.div>

            {/* Quote */}
            <motion.div
              className="italic text-xs text-gray-700 border-l-4 border-indigo-300 pl-4 py-3 my-6 bg-indigo-50 rounded-r-md shadow-sm"
              initial={{ opacity: 0, x: -15 }}
                          animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
                        >
              "{projectDetails.challenge_quote.text}"
              <div className="text-xs text-indigo-600 mt-1.5 font-normal text-right">— {projectDetails.challenge_quote.source}</div>
            </motion.div>
            
            {/* Challenge Conclusion */}
            <motion.div
              className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-4 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <h4 className="text-md font-semibold text-center mb-2">{projectDetails.challenge_conclusion.title}</h4>
              <p className="text-sm text-center text-indigo-100 leading-relaxed">{projectDetails.challenge_conclusion.text}</p>
            </motion.div>
          </div>
          <DownArrowPrompt onClick={() => scrollToSection("research_questions")} />
        </section>

        {/* Research Questions Section */}
        <section 
          ref={sectionRefs.research_questions}
          id="research_questions" 
          className="xl:snap-start xl:h-screen flex flex-col justify-center items-center py-16 px-4 xl:py-12 xl:px-6 bg-gray-50 relative"
        >
          <div className="w-full xl:max-w-5xl mx-auto">
            <motion.h2
              className="text-3xl font-bold text-gray-900 mb-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Key Research Questions
            </motion.h2>
            
            <motion.p
              className="text-center text-gray-600 text-sm mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              {projectDetails.research_questions_intro}
            </motion.p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {projectDetails.research_question_categories.map((category, catIndex) => {
                const colors = [
                  { border: "border-blue-500", bg: "bg-blue-100", text: "text-blue-600" },
                  { border: "border-green-500", bg: "bg-green-100", text: "text-green-600" },
                  { border: "border-purple-500", bg: "bg-purple-100", text: "text-purple-600" }
                ];
                const color = colors[catIndex % colors.length];

                return (
            <motion.div
                    key={catIndex} 
                    className={`bg-gray-50 p-5 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border-t-4 ${color.border}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + catIndex * 0.1 }}
                  >
                    <div className="flex items-center mb-4">
                      <div className={`p-3 rounded-full ${color.bg} ${color.text} mr-4`}>
                        {category.iconName === 'FaClipboardList' && <FaClipboardList size={24} />}
                        {category.iconName === 'FaBullseye' && <FaBullseye size={24} />}
                        {category.iconName === 'FaRobot' && <FaRobot size={24} />}
                        {category.iconName === 'FaBrain' && <FaBrain size={24} />}
                        {category.iconName === 'FaSearch' && <FaSearch size={24} />}
                </div>
                <div>
                        <h3 className="text-lg font-semibold text-gray-800">{category.title}</h3>
                        {category.objective && <p className={`text-xs ${color.text} font-medium`}>{category.objective}</p>}
                          </div>
                        </div>
                    <ul className="space-y-3">
                      {category.questions.map((question, qIndex) => (
                        <li key={qIndex} className="flex items-start">
                          <span className={`${color.text} mr-3 mt-1 font-semibold`}>Q{qIndex + 1}:</span>
                          <p className="text-sm text-gray-700 leading-relaxed">{question}</p>
                        </li>
                      ))}
                    </ul>
            </motion.div>
                );
              })}
              </div>
              
            {projectDetails.research_questions_conclusion && (
              <motion.div
                className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-5 rounded-lg shadow-xl mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                <div className="flex items-center">
                    <div className="p-2 rounded-full bg-white bg-opacity-20 text-white mr-3">
                        {projectDetails.research_questions_conclusion.iconName === 'FaUsers' && <FaUsers size={20} />}
                        {projectDetails.research_questions_conclusion.iconName === 'FaLink' && <FaLink size={20} />}
                        {projectDetails.research_questions_conclusion.iconName === 'FaConnectdevelop' && <FaConnectdevelop size={20} />}
                    </div>
                  <div>
                        <h4 className="text-md font-semibold mb-1">{projectDetails.research_questions_conclusion.title}</h4>
                        <p className="text-sm text-indigo-100">{projectDetails.research_questions_conclusion.text}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
          <DownArrowPrompt onClick={() => scrollToSection("methods")} />
        </section>

        {/* Methods Section */}
        <section 
          ref={sectionRefs.methods}
          id="methods" 
          className="xl:snap-start xl:h-screen flex flex-col justify-center items-center py-16 px-4 xl:py-10 xl:px-8 relative"
        >
          <div className="w-full xl:max-w-5xl mx-auto"> {/* Changed max-w-3xl to max-w-5xl for more space */}
            <motion.h2
              className="text-3xl font-bold text-gray-900 mb-1 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Research Methods
            </motion.h2>
            
            <motion.p
              className="text-gray-600 text-center mb-2 max-w-2xl mx-auto text-sm" /* Increased mb-4 to mb-6 */
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              To transform scattered feedback into actionable insights, we employed these specialized quantitative techniques:
            </motion.p>
            
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-2" /* Changed gap-3 to gap-4 (consistent with ag_columns recent update if that was intended, or could be gap-2 as initially planned) */
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Method 1: Time Series Analysis */}
              <motion.div 
                className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500 h-full flex flex-col" /* Added shadow-md, p-4, h-full flex flex-col */
                whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.15)" }} /* Enhanced shadow */
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-start mb-2">
                  <div className="w-12 h-12 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center mr-3"> {/* Increased icon container size */}
                    <FaChartLine size={24} className="text-blue-500" /> {/* Ensure icon color matches theme explicitly */}
                  </div>
                  <div>
                    <h3 className="text-md font-semibold text-gray-800">Time Series Analysis</h3>
                    <p className="text-xs text-gray-500">Identifying patterns over time</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-3 flex-grow"> {/* text-xs to text-sm, added mb-3 and flex-grow */}
                  Analysis of 15,395 feedback items from 2020 to 2025, showing peak volumes of 2.7K in 2023.
                </p>
                <div className="bg-blue-50 p-3 rounded-md mb-3"> {/* p-2 to p-3, mb-2 to mb-3 */}
                  <p className="text-xs text-gray-700">
                    <span className="font-medium text-blue-700">What this means:</span> We analyzed how user feedback volume changed over several years. This helped us spot trends, like peak feedback times (e.g., after new releases), enabling us to anticipate loads and understand the impact of product updates.
                  </p>
                </div>
                <div className="pt-2 mt-auto border-t border-gray-100"> {/* Added mt-auto to push to bottom */}
                  <div className="flex flex-col items-center justify-center h-16 text-xs text-gray-500"> {/* Increased h-10 to h-16 */}
                    <svg viewBox="0 0 100 40" className="w-20 h-10 text-blue-300 mb-1" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 35 Q 20 20, 35 25 T 65 10 T 95 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      {/* Little circle at peak */}
                      <circle cx="65" cy="10" r="2" fill="currentColor" />
                      {/* Dashed line for X-axis */}
                      <line x1="0" y1="38" x2="100" y2="38" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2"/>
                    </svg>
                    <p className="text-xs text-center text-gray-400 mt-1">Feedback Volume Trends (15.4K items)</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Method 2: User Segmentation */}
              <motion.div 
                className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500 h-full flex flex-col" /* Added shadow-md, p-4, h-full flex flex-col */
                whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(52, 211, 153, 0.15)" }} /* Enhanced shadow */
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-start mb-2">
                  <div className="w-12 h-12 flex-shrink-0 bg-green-100 rounded-full flex items-center justify-center mr-3"> {/* Increased icon container size */}
                    <FaUsers size={24} className="text-green-500" /> {/* Ensure icon color matches theme explicitly */}
                  </div>
                  <div>
                    <h3 className="text-md font-semibold text-gray-800">User Segmentation</h3>
                    <p className="text-xs text-gray-500">Categorizing feedback by user & topic</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-3 flex-grow"> {/* text-xs to text-sm, added mb-3 and flex-grow */}
                  Categorization of feedback by user type (Advisors, BAA, Fee Only Advisors) and category (Client Services: 7.3K, Practice: 6.3K, Technology: 3.0K).
                </p>
                <div className="bg-green-50 p-3 rounded-md mb-3"> {/* p-2 to p-3, mb-2 to mb-3 */}
                  <p className="text-xs text-gray-700">
                    <span className="font-medium text-green-700">What this means:</span> We grouped feedback based on who sent it and its subject. This showed if specific user groups had particular types of feedback more often, helping tailor solutions.
                  </p>
                </div>
                <div className="pt-2 mt-auto border-t border-gray-100"> {/* Added mt-auto to push to bottom */}
                  <div className="flex flex-col items-center justify-center h-16 text-xs text-gray-500"> {/* Increased h-10 to h-16 */}
                    {/* Segmented Bar Visual - REPLACED */}
                    <div className="space-y-1 w-full max-w-[180px] mx-auto"> {/* Adjusted max-width */}
                      {/* Client Services */}
                      <div className="flex items-center text-xs">
                        <span className="w-14 text-right mr-1.5 text-gray-500">CS:</span> {/* Adjusted width and margin */}
                        <div className="flex-1 bg-gray-200 rounded-full h-3.5 shadow-inner"> {/* Adjusted height */}
                          <div className="bg-green-300 h-3.5 rounded-full text-[8px] text-white flex items-center justify-center" style={{ width: '44%' }}>7.3K</div> {/* Adjusted height and font size */}
                  </div>
                      </div>
                      {/* Practice */}
                      <div className="flex items-center text-xs">
                        <span className="w-14 text-right mr-1.5 text-gray-500">Practice:</span> {/* Adjusted width and margin */}
                        <div className="flex-1 bg-gray-200 rounded-full h-3.5 shadow-inner"> {/* Adjusted height */}
                          <div className="bg-green-400 h-3.5 rounded-full text-[8px] text-white flex items-center justify-center" style={{ width: '38%' }}>6.3K</div> {/* Adjusted height and font size */}
                        </div>
                      </div>
                      {/* Technology */}
                      <div className="flex items-center text-xs">
                        <span className="w-14 text-right mr-1.5 text-gray-500">Tech:</span> {/* Adjusted width and margin */}
                        <div className="flex-1 bg-gray-200 rounded-full h-3.5 shadow-inner"> {/* Adjusted height */}
                          <div className="bg-green-500 h-3.5 rounded-full text-[8px] text-white flex items-center justify-center" style={{ width: '18%' }}>3.0K</div> {/* Adjusted height and font size */}
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-center text-gray-400 mt-1">Feedback by Category Segments</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Method 3: Sentiment Analysis */}
              <motion.div 
                className="bg-white p-4 rounded-lg shadow-md border-l-4 border-purple-500 h-full flex flex-col" /* Added shadow-md, p-4, h-full flex flex-col */
                whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.15)" }} /* Enhanced shadow */
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-start mb-2">
                  <div className="w-12 h-12 flex-shrink-0 bg-purple-100 rounded-full flex items-center justify-center mr-3"> {/* Increased icon container size */}
                    <FaSmile size={24} className="text-purple-500" /> {/* Ensure icon color matches theme explicitly */}
                  </div>
                  <div>
                    <h3 className="text-md font-semibold text-gray-800">Sentiment Analysis</h3>
                    <p className="text-xs text-gray-500">Gauging emotion in feedback</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-3 flex-grow"> {/* text-xs to text-sm, added mb-3 and flex-grow */}
                  Implementation of machine learning algorithms to categorize feedback as Neutral (79%), Negative (14%), Positive (4%), Very Positive (2%), and Very Negative (1%).
                </p>
                <div className="bg-purple-50 p-3 rounded-md mb-3"> {/* p-2 to p-3, mb-2 to mb-3 */}
                  <p className="text-xs text-gray-700">
                    <span className="font-medium text-purple-700">What this means:</span> We used AI to automatically determine the emotion in each piece of feedback. This gave a quick overview of user satisfaction and helped prioritize issues causing strong negative reactions.
                  </p>
                </div>
                <div className="pt-2 mt-auto border-t border-gray-100"> {/* Added mt-auto to push to bottom */}
                  <div className="flex flex-col items-center justify-center h-16 text-xs text-gray-500"> {/* Increased h-10 to h-16 */}
                    {/* Sentiment Distribution Visual */}
                     <div className="flex items-center space-x-2 mb-1">
                        <FaFrown size={16} className="text-red-400" title="Negative: 15%"/>
                        <FaMeh size={16} className="text-gray-400" title="Neutral: 79%"/>
                        <FaSmile size={16} className="text-green-400" title="Positive: 6%"/>
                  </div>
                    <div className="w-full max-w-[120px] h-3 bg-gray-200 rounded-full overflow-hidden flex shadow-inner">
                        <div style={{ width: '15%' }} className="bg-red-400" title="Negative: 15%"></div>
                        <div style={{ width: '79%' }} className="bg-gray-300" title="Neutral: 79%"></div>
                        <div style={{ width: '6%' }} className="bg-green-400" title="Positive: 6%"></div>
                    </div>
                    <p className="text-xs text-center text-gray-400 mt-1">Sentiment Score Distribution</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Method 4: Feature Request Clustering */}
              <motion.div 
                className="bg-white p-4 rounded-lg shadow-md border-l-4 border-amber-500 h-full flex flex-col" /* Added shadow-md, p-4, h-full flex flex-col */
                whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(251, 191, 36, 0.15)" }} /* Enhanced shadow */
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-start mb-2">
                  <div className="w-12 h-12 flex-shrink-0 bg-amber-100 rounded-full flex items-center justify-center mr-3"> {/* Increased icon container size */}
                    <FaLightbulb size={24} className="text-amber-500" /> {/* Ensure icon color matches theme explicitly */}
                  </div>
                  <div>
                    <h3 className="text-md font-semibold text-gray-800">Feature Request Clustering</h3>
                    <p className="text-xs text-gray-500">Grouping similar feature ideas</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-3 flex-grow"> {/* text-xs to text-sm, added mb-3 and flex-grow */}
                  Natural language processing to identify and group 1,673 feature ideas with 19K user votes across categories (CRM: 6.0K, Client360°: 4.2K, Investor360°: 2.9K).
                </p>
                <div className="bg-amber-50 p-3 rounded-md mb-3"> {/* p-2 to p-3, mb-2 to mb-3 */}
                  <p className="text-xs text-gray-700">
                    <span className="font-medium text-amber-700">What this means:</span> We used AI to process feature requests and group similar ideas. This revealed which features were most popular (by user votes) and the underlying needs.
                  </p>
                </div>
                <div className="pt-2 mt-auto border-t border-gray-100"> {/* Added mt-auto to push to bottom */}
                  <div className="flex flex-col items-center justify-center h-16 text-xs text-gray-500"> {/* Increased h-10 to h-16 */}
                    {/* Feature Cluster Visual */}
                    <div className="flex space-x-1 mb-1">
                        <span className="bg-amber-200 text-amber-700 px-1.5 py-0.5 rounded-full text-[9px] shadow-sm">CRM (6K)</span>
                        <span className="bg-amber-200 text-amber-700 px-1.5 py-0.5 rounded-full text-[9px] shadow-sm">Client360 (4.2K)</span>
                        <span className="bg-amber-200 text-amber-700 px-1.5 py-0.5 rounded-full text-[9px] shadow-sm">Inv360 (2.9K)</span>
                  </div>
                    <FaConnectdevelop size={20} className="text-amber-400"/>
                    <p className="text-xs text-center text-gray-400 mt-1">Top Feature Clusters (1.7K ideas, 13.1K votes)</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Method impact note */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-6 p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-300 text-sm text-gray-700" /* Increased p-2 to p-4, text-xs to text-sm, mt-4 to mt-6 */
            >
              <div className="flex items-start">
                <FaLink className="h-4 w-4 text-indigo-500 mr-2 flex-shrink-0 mt-0.5" />
                <p>
                  <span className="font-medium">Foundation for Process:</span> These analytical methods were key to our research process. They enabled structured data discovery (Time Series, Segmentation), drove in-depth analysis (Sentiment, Clustering), and directly informed the actionable insights feeding into the dashboard design.
                </p>
              </div>
            </motion.div>
          </div>
          <DownArrowPrompt onClick={() => scrollToSection("process")} />
        </section>

        {/* Process Section - With consistent background color and improved spacing */}
        <section
          ref={sectionRefs.process}
          id="process"
          className="xl:snap-start xl:h-screen flex flex-col justify-center items-center py-16 px-4 xl:py-10 xl:px-8 bg-gray-50 relative"
        >
          <div className="w-full xl:max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-6" // Reduced margin from mb-8 to mb-6
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-1">Research Process</h2> {/* Changed from text-indigo-700 to text-gray-900 */}
              <p className="text-gray-600 max-w-2xl mx-auto text-sm">
                From raw feedback to actionable insights: our data-driven approach
              </p>
            </motion.div>

            {/* Enhanced Interactive Horizontal Process Steps - Less vertical space */}
            <div className="relative mb-4"> {/* Reduced margin from mb-6 to mb-4 */}
              {/* Decorative elements - keeping these for visual interest */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="absolute -z-10 top-0 right-0 w-64 h-64 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full blur-3xl opacity-30"
              />
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="absolute -z-10 bottom-0 left-0 w-64 h-64 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full blur-3xl opacity-30"
              />

              {/* Original Horizontal connecting line with gradient */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
                className="absolute top-8 left-0 h-2 bg-gradient-to-r from-indigo-400 via-blue-400 to-purple-500 rounded-full z-0"
              />

              {/* Step indicators with enhanced visuals - smaller size */}
              <div className="relative z-10 flex justify-between">
                {researchSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex flex-col items-center relative group"
                  >
                    {/* Step number indicator - smaller */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg mb-2 group-hover:scale-110 transition-transform duration-300">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 font-bold text-lg">{index + 1}</span>
                      </div>
                    </div>
                    {/* Step title - smaller text */}
                    <p className="text-xs font-semibold text-indigo-800 text-center max-w-[100px]">{step.title}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Process Cards - With clickable Actions Taken button - Reduced height */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {researchSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative h-[250px] cursor-pointer" // Reduced height from 280px to 250px
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Card with Action button */}
                  <div className={`w-full h-full rounded-xl shadow-md transition-all duration-500 relative ${
                    index === 0 ? "bg-white border-indigo-200" :
                    index === 1 ? "bg-white border-blue-200" :
                    index === 2 ? "bg-white border-purple-200" :
                    index === 3 ? "bg-white border-indigo-200" :
                    "bg-white border-blue-200" // Adjusted for 5 steps, repeating pattern
                  } border`}>
                    {/* Front Side Content */}
                    <div className="p-3 h-full flex flex-col"> {/* Reduced padding from p-4 to p-3 */}
                      {/* Header with colored accent */}
                      <div className={`absolute top-0 left-0 right-0 h-2 ${
                        index === 0 ? "bg-indigo-500" :
                        index === 1 ? "bg-blue-500" :
                        index === 2 ? "bg-purple-500" :
                        index === 3 ? "bg-indigo-500" :
                        "bg-blue-500" // Adjusted for 5 steps
                      }`}></div>
                      
                      {/* Step Icon and Number - More compact */}
                      <div className="flex items-center mb-2 mt-2">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white mr-2 ${
                          index === 0 ? "bg-indigo-500" :
                          index === 1 ? "bg-blue-500" :
                          index === 2 ? "bg-purple-500" :
                          index === 3 ? "bg-indigo-500" :
                          "bg-blue-500" // Adjusted for 5 steps
                        }`}>
                          <span className="font-bold text-xs">{index + 1}</span>
                        </div>
                        <h3 className="font-bold text-gray-800 text-sm">{step.title}</h3>
                      </div>
                      
                      {/* Description - More compact */}
                      <p className="text-gray-600 text-xs mb-3 leading-snug">{step.description}</p>
                      
                      {/* Actions Taken Button - Positioned higher in the card */}
                      <div className="mt-auto relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleActionPopup(index);
                          }}
                          className={`w-full py-1.5 px-3 rounded-md text-white text-xs font-medium transition-colors flex items-center justify-center ${
                            index === 0 ? "bg-indigo-500 hover:bg-indigo-600" :
                            index === 1 ? "bg-blue-500 hover:bg-blue-600" :
                            index === 2 ? "bg-purple-500 hover:bg-purple-600" :
                            index === 3 ? "bg-indigo-500 hover:bg-indigo-600" :
                            "bg-blue-500 hover:bg-blue-600" // Adjusted for 5 steps
                          }`}
                        >
                          <span>View Actions Taken</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        
                        {/* Actions Taken Popup - More compact, within screen view */}
                        {openActionPopup === index && (
                          <div 
                            className="absolute left-0 right-0 top-full mt-1 bg-white rounded-lg shadow-xl border border-gray-200 p-3 z-20"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className={`font-semibold text-xs mb-1 ${
                              index === 0 ? "text-indigo-700" :
                              index === 1 ? "text-blue-700" :
                              index === 2 ? "text-purple-700" :
                              index === 3 ? "text-indigo-700" :
                              "text-blue-700" // Adjusted for 5 steps
                            }`}>
                              Actions Taken:
                            </div>
                            <ul className="space-y-1 max-h-40 overflow-y-auto custom-scrollbar pr-1">
                              {step.insights.map((insight, i) => (
                                <li key={i} className="text-gray-600 text-xs leading-tight flex items-start">
                                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 mr-1 mt-0.5 flex-shrink-0 ${
                                    index === 0 ? "text-indigo-500" :
                                    index === 1 ? "text-blue-500" :
                                    index === 2 ? "text-purple-500" :
                                    index === 3 ? "text-indigo-500" :
                                    "text-blue-500" // Adjusted for 5 steps
                                  }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                  {insight}
                                </li>
                              ))}
                            </ul>
                            
                            {/* Close button */}
                            <button 
                              onClick={() => toggleActionPopup(null)}
                              className="absolute top-1 right-1 text-gray-400 hover:text-gray-600"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                            
                            {/* Arrow pointing to the button */}
                            <div className="absolute top-[-6px] left-1/2 transform -translate-x-1/2 w-3 h-3 rotate-45 bg-white border-l border-t border-gray-200"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <DownArrowPrompt onClick={() => scrollToSection('findings_insights')} />
        </section>

        {/* Findings & Insights Section */}
        <section 
          ref={sectionRefs.findings_insights}
          id="findings_insights" 
          className="xl:snap-start xl:min-h-screen flex flex-col justify-center items-center py-16 px-4 xl:py-10 xl:px-6 bg-gray-50 relative"
        >
          <div className="w-full xl:max-w-4xl mx-auto">
            <motion.div className="text-center mb-5">
            <motion.h2
                className="text-3xl font-bold text-gray-900 mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
                Key Findings
            </motion.h2>
              <motion.p
                className="text-gray-600 max-w-2xl mx-auto text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                Our analysis of 15,000+ feedback items revealed these critical insights about advisor experience
              </motion.p>
            </motion.div>
            
            {/* Stats Row */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Stat 1 */}
              <motion.div 
                className="bg-white rounded-lg shadow-sm overflow-hidden"
                whileHover={{ y: -4, boxShadow: "0 12px 20px -5px rgba(59, 130, 246, 0.2)" }}
              >
                <div className="h-1.5 bg-blue-500 w-full"></div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-500">Feedback Volume</span>
                    <span className="flex items-center text-blue-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                    </span>
                      </div>
                  <div className="flex items-baseline mt-1">
                    <span className="text-3xl font-bold text-blue-600">15K</span>
                    <span className="text-blue-400 ml-1">items</span>
                      </div>
                  <div className="text-xs text-gray-500 mt-1">feedback analyzed</div>
                    </div>
              </motion.div>
              
              {/* Stat 2 */}
              <motion.div 
                className="bg-white rounded-lg shadow-sm overflow-hidden"
                whileHover={{ y: -4, boxShadow: "0 12px 20px -5px rgba(16, 185, 129, 0.2)" }}
              >
                <div className="h-1.5 bg-green-500 w-full"></div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-500">Experience Issues</span>
                    <span className="flex items-center text-green-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </span>
                </div>
                  <div className="flex items-baseline mt-1">
                    <span className="text-3xl font-bold text-green-600">43%</span>
                    <span className="text-green-400 ml-1">UX</span>
              </div>
                  <div className="text-xs text-gray-500 mt-1">vs. technical issues</div>
                </div>
              </motion.div>
              
              {/* Stat 3 */}
              <motion.div 
                className="bg-white rounded-lg shadow-sm overflow-hidden"
                whileHover={{ y: -4, boxShadow: "0 12px 20px -5px rgba(139, 92, 246, 0.2)" }}
              >
                <div className="h-1.5 bg-purple-500 w-full"></div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-500">Feature Requests</span>
                    <span className="flex items-center text-purple-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                    </span>
                  </div>
                  <div className="flex items-baseline mt-1">
                    <span className="text-3xl font-bold text-purple-600">327</span>
                    <span className="text-purple-400 ml-1">req</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">clustered into 28 themes</div>
                </div>
              </motion.div>
              
              {/* Stat 4 */}
              <motion.div 
                className="bg-white rounded-lg shadow-sm overflow-hidden"
                whileHover={{ y: -4, boxShadow: "0 12px 20px -5px rgba(245, 158, 11, 0.2)" }}
              >
                <div className="h-1.5 bg-amber-500 w-full"></div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-500">Efficiency Gain</span>
                    <span className="flex items-center text-amber-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                  </div>
                  <div className="flex items-baseline mt-1">
                    <span className="text-3xl font-bold text-amber-600">87%</span>
                    <span className="text-amber-400 ml-1">faster</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">feedback processing</div>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Main Insight Row */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Insight 1 - Sentiment Trends */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  Sentiment Trends
                </h3>
                
                <p className="text-sm text-gray-600 mb-3">
                  Sentiment analysis revealed steady improvement in advisor satisfaction from Q1 to Q4, with a <span className="font-medium text-blue-600">27%</span> increase in positive feedback following Q3 UX changes.
                </p>
                
                {/* Mini chart */}
                <div className="flex items-end space-x-2 h-14">
                  <div className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-red-100 rounded-t relative overflow-hidden" style={{height: "50%"}}>
                      <div className="absolute bottom-0 w-full bg-red-400" style={{height: "60%"}}></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Q1</div>
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-red-100 rounded-t relative overflow-hidden" style={{height: "50%"}}>
                      <div className="absolute bottom-0 w-full bg-red-400" style={{height: "40%"}}></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Q2</div>
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-green-100 rounded-t relative overflow-hidden" style={{height: "90%"}}>
                      <div className="absolute bottom-0 w-full bg-green-400" style={{height: "60%"}}></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Q3</div>
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-green-100 rounded-t relative overflow-hidden" style={{height: "90%"}}>
                      <div className="absolute bottom-0 w-full bg-green-400" style={{height: "80%"}}></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Q4</div>
                  </div>
                </div>
                <div className="flex justify-center text-xs mt-1">
                  <div className="flex items-center mr-3">
                    <div className="h-2 w-2 bg-green-400 rounded-full mr-1"></div>
                    <span>Positive</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-2 w-2 bg-red-400 rounded-full mr-1"></div>
                    <span>Negative</span>
                  </div>
                </div>
              </div>
              
              {/* Insight 2 - User Segments */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  User Segment Differences
                </h3>
                
                <p className="text-sm text-gray-600 mb-3">
                  Segmentation revealed distinct feedback patterns between advisor types, with <span className="font-medium text-green-600">72%</span> of high-volume advisors prioritizing performance over newer features.
                </p>
                
                {/* Mini chart */}
                <div className="grid grid-cols-3 gap-2 mb-2">
                  <div className="flex flex-col items-center">
                    <div className="w-full bg-gray-100 rounded-md p-1 mb-1">
                      <div className="bg-green-500 h-10 w-full rounded flex items-center justify-center text-white text-xs font-medium">72%</div>
                    </div>
                    <div className="text-xs text-gray-600">High Volume</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-full bg-gray-100 rounded-md p-1 mb-1">
                      <div className="bg-green-400 h-10 w-full rounded flex items-center justify-center text-white text-xs font-medium">45%</div>
                    </div>
                    <div className="text-xs text-gray-600">Mid-Tier</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-full bg-gray-100 rounded-md p-1 mb-1">
                      <div className="bg-green-300 h-10 w-full rounded flex items-center justify-center text-white text-xs font-medium">31%</div>
                    </div>
                    <div className="text-xs text-gray-600">New Advisors</div>
                  </div>
                </div>
                <div className="text-xs text-center text-gray-500">
                  % mentioning performance issues in feedback
                </div>
              </div>
            </motion.div>
            
            {/* Secondary Insight Row */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Insight 3 - Feature Request Clustering */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  Feature Request Clustering
                </h3>
                
                <p className="text-sm text-gray-600 mb-3">
                  NLP clustering identified <span className="font-medium text-purple-600">28 distinct feature themes</span> from 327 individual requests, with data exports and report customization representing 47% of all requests.
                </p>
                
                {/* Mini chart */}
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-28 text-xs text-right pr-2">Data Exports</div>
                    <div className="flex-1 h-5 bg-gray-100 rounded overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-l" style={{width: "27%"}}>
                        <span className="text-white text-xs pl-1">27%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-28 text-xs text-right pr-2">Report Customization</div>
                    <div className="flex-1 h-5 bg-gray-100 rounded overflow-hidden">
                      <div className="h-full bg-purple-400 rounded-l" style={{width: "20%"}}>
                        <span className="text-white text-xs pl-1">20%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-28 text-xs text-right pr-2">Mobile Access</div>
                    <div className="flex-1 h-5 bg-gray-100 rounded overflow-hidden">
                      <div className="h-full bg-purple-300 rounded-l" style={{width: "15%"}}>
                        <span className="text-white text-xs pl-1">15%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-28 text-xs text-right pr-2">Other</div>
                    <div className="flex-1 h-5 bg-gray-100 rounded overflow-hidden">
                      <div className="h-full bg-purple-200 rounded-l" style={{width: "38%"}}>
                        <span className="text-gray-700 text-xs pl-1">38%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Insight 4 - Efficiency Gains */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  Research Efficiency Gains
                </h3>
                
                <p className="text-sm text-gray-600 mb-3">
                  Our automated feedback analysis process reduced processing time from <span className="font-medium text-amber-600">12 hours to 2 hours</span> weekly while improving categorization accuracy by 87%.
                </p>
                
                {/* Mini chart */}
                <div className="flex items-center space-x-4 mb-2">
                  <div className="flex-1">
                    <div className="text-xs text-gray-500 mb-1">Before Automation</div>
                    <div className="h-8 flex items-center bg-gray-100 rounded-lg">
                      <div className="bg-amber-200 h-full rounded-l-lg w-3/5 flex items-center pl-2">
                        <span className="text-xs text-gray-700">Manual</span>
                      </div>
                      <div className="bg-amber-300 h-full w-2/5 flex items-center justify-center">
                        <span className="text-xs text-gray-700">Review</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0h</span>
                      <span>12h</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-500 mb-1">After Automation</div>
                    <div className="h-8 flex items-center bg-gray-100 rounded-lg">
                      <div className="bg-green-300 h-full rounded-l-lg w-1/6 flex items-center justify-center">
                        <span className="text-xs text-gray-700">Auto</span>
                      </div>
                      <div className="bg-green-400 h-full rounded-r-lg w-1/6 flex items-center justify-center">
                        <span className="text-xs text-gray-700">QA</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0h</span>
                      <span>2h</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Final Call to Action */}
            <motion.div
              className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-md p-4 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              whileHover={{ y: -3, boxShadow: "0 15px 30px -5px rgba(79, 70, 229, 0.3)" }}
            >
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-4 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Key Insight</h3>
                  <p className="text-indigo-100 text-sm">
                    By implementing our advanced feedback analysis system, the product team was able to identify and prioritize improvements that led to a <span className="font-bold text-white">27% increase</span> in positive advisor sentiment and a more targeted product roadmap.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
          <DownArrowPrompt onClick={() => scrollToSection("impact_outcomes")} />
        </section>

        {/* Impact & Outcomes Section */}
        <section 
          ref={sectionRefs.impact_outcomes}
          id="impact_outcomes" 
          className="xl:snap-start xl:h-screen flex flex-col justify-center items-center py-16 px-4 xl:py-10 xl:px-6 bg-gray-50 relative"
        >
          <div className="w-full xl:max-w-4xl mx-auto">
            <motion.h2
              className="text-3xl font-bold text-gray-900 mb-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Impact & Outcomes
            </motion.h2>
            
            <motion.p
              className="text-gray-600 text-center mb-6 max-w-2xl mx-auto text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              How our feedback analysis drove concrete engineering decisions, design changes, and measurable business results
            </motion.p>
            
            {/* Research to Implementation Journey */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Research Insights Card */}
                <div className="bg-white p-4 rounded-lg shadow-sm relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold">1</div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2 text-center mt-2">Research Insights</h3>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">Identified inconsistent navigation as #1 pain point</p>
                    </div>
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">Discovered 72% of advisors struggle with data synchronization</p>
                    </div>
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">Revealed need for personalized dashboard configuration</p>
                    </div>
                  </div>
                </div>
                
                {/* Engineering & Design Decisions Card */}
                <div className="bg-white p-4 rounded-lg shadow-sm relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold">2</div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2 text-center mt-2">Implementation</h3>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">Rebuilt navigation with consistent global patterns</p>
                    </div>
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">Developed real-time data synchronization engine</p>
                    </div>
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">Created widget-based customizable dashboard system</p>
                    </div>
                  </div>
                </div>
                
                {/* Outcomes Card */}
                <div className="bg-white p-4 rounded-lg shadow-sm relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-bold">3</div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2 text-center mt-2">User Impact</h3>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-purple-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">34% reduction in navigation time</p>
                    </div>
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-purple-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">89% decrease in data sync complaints</p>
                    </div>
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-purple-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">27% increase in advisor retention</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Connecting arrows (visible on md+ screens) */}
              <div className="hidden md:block">
                <div className="absolute left-[calc(33%-12px)] right-[calc(67%+12px)] top-1/2 transform -translate-y-1/2">
                  <div className="h-0.5 bg-gray-300 w-full relative">
                    <div className="absolute -right-1 -top-1.5 w-0 h-0 border-t-4 border-r-4 border-b-4 border-t-transparent border-b-transparent border-r-gray-300"></div>
                  </div>
                </div>
                <div className="absolute left-[calc(67%-12px)] right-[calc(33%+12px)] top-1/2 transform -translate-y-1/2">
                  <div className="h-0.5 bg-gray-300 w-full relative">
                    <div className="absolute -right-1 -top-1.5 w-0 h-0 border-t-4 border-r-4 border-b-4 border-t-transparent border-b-transparent border-r-gray-300"></div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Key Business Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Revenue Impact */}
                <div className="bg-white p-4 rounded-lg shadow-sm border-t-4 border-amber-400">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-800">Development Efficiency</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex items-end mb-2">
                    <span className="text-3xl font-bold text-amber-600">28%</span>
                    <span className="text-sm text-gray-500 ml-2 mb-1">Faster time-to-market for new features</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Through reduced churn and improved satisfaction, enabling higher subscription rates and better client retention.
                  </p>
                </div>
                
                {/* User Satisfaction */}
                <div className="bg-white p-4 rounded-lg shadow-sm border-t-4 border-teal-400">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-800">User Satisfaction</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex items-end mb-2">
                    <span className="text-3xl font-bold text-teal-600">+32%</span>
                    <span className="text-sm text-gray-500 ml-2 mb-1">NPS improvement</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Net Promoter Score jumped from 18 to 50, placing Advisor360 in the top quartile of financial software products.
                  </p>
                </div>
                
                {/* Time Savings */}
                <div className="bg-white p-4 rounded-lg shadow-sm border-t-4 border-indigo-400">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-800">Time Efficiency</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex items-end mb-2">
                    <span className="text-3xl font-bold text-indigo-600">9.4</span>
                    <span className="text-sm text-gray-500 ml-2 mb-1">hrs/week saved</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    By reducing workflow friction, each advisor gains more than a full workday back each week to focus on clients.
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Data-Driven Product Roadmap Impact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-4"
            >
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">Impact on Product Roadmap</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <h4 className="text-md font-semibold text-gray-700 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      Before Research
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-red-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-600">63% of feature requests prioritized incorrectly</p>
                    </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-red-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-600">4-6 week lag between feedback and action</p>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-red-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-600">12 hours per week spent on manual feedback analysis</p>
                      </li>
                </ul>
              </div>
                
                  <div className="space-y-2">
                    <h4 className="text-md font-semibold text-gray-700 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      After Research
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-600">96% of feature requests properly categorized</p>
                    </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-600">Near real-time visibility into user sentiment</p>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-600">37% faster feature delivery to production</p>
                      </li>
                </ul>
                </div>
              </div>
              
                {/* Mini chart showing improvement */}
                <div className="mt-4 h-12 relative">
                  <div className="absolute inset-x-0 bottom-0 h-6 bg-gray-100 rounded-md overflow-hidden">
                    <div className="h-full bg-green-500 rounded-l" style={{width: "78%"}}>
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">78% increase in roadmap efficiency</span>
                  </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <DownArrowPrompt onClick={() => scrollToSection("visuals1")} />
        </section>

        {/* Single Visuals Section with all images */}
              <section 
                ref={sectionRefs.visuals1}
                id="visuals1"
          className="xl:snap-start xl:min-h-screen flex flex-col justify-start items-center py-16 px-4 xl:py-4 xl:px-8 relative"
        >
                  <motion.div
            className="w-full xl:max-w-5xl mx-auto text-center mb-3 pt-14"
                    initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
            <h2 className="text-3xl font-bold text-gray-900">
              Visuals
            </h2>
                              </motion.div>
          
          <div className="w-full xl:max-w-5xl mx-auto">
            <ImageGallery images={projectDetails.images} />
                    </div>
          
                {/* Removing the down arrow prompt as requested */}
              </section>

        {/* CONTACT SECTION + NAVIGATION */}
        <section 
          ref={sectionRefs.thankyou}
          id="thankyou"
          className="xl:snap-start flex flex-col justify-center items-center py-16 md:py-10 px-4 xl:py-6 xl:px-8 bg-gray-50"
        >
          <div className="w-full xl:max-w-3xl mx-auto text-center">
            <motion.h2
              className="text-xl font-bold text-gray-900 mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              For more information feel free to contact me
            </motion.h2>
            
            <motion.div
              className="mb-4 cursor-pointer inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => window.location.href = 'mailto:milt.stefanidis@gmail.com'}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-8 w-8 mx-auto text-indigo-600 hover:text-indigo-800 transition-colors"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </motion.div>
            
            <motion.div
              className="flex flex-row justify-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <button 
                onClick={() => scrollToSection('overview')} 
                className="inline-flex items-center px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Return to Top
              </button>
              
              <Link href="/" 
                className="inline-flex items-center px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Back to Portfolio
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}

// Add custom scrollbar styles to make the scrolling subtle and elegant
const customScrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }
`;

{/* Add this inside the return statement, just after the <ScrollProgress /> component */}
<style jsx global>{customScrollbarStyles}</style>