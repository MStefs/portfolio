import { useState, useRef, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaChevronDown, FaEye, FaChartLine, FaLightbulb, FaArrowLeft, FaArrowRight, 
  FaExpand, FaTimes, FaTable, FaSearch, FaChartBar, FaChartPie, FaExclamationTriangle, 
  FaCheckCircle, FaPercentage } from "react-icons/fa";
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

    handleScroll();

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
      <div className="h-full bg-red-700" style={{ width: `${scrollProgress}%` }} />
    </div>
  );
}

/* --- ICONS FOR BULLET POINTS --- */
const bulletIcons = [
  { icon: <FaEye className="text-red-700" />, tooltip: "What this shows" },
  { icon: <FaChartLine className="text-black" />, tooltip: "Key data insights" },
  { icon: <FaLightbulb className="text-red-900" />, tooltip: "Implications / Why it matters" },
];

/* Image Gallery Component */
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
    e.stopPropagation();
    setIsPanning(true);
    setStartPanPosition({
      x: e.clientX - panPosition.x,
      y: e.clientY - panPosition.y
    });
  };

  const doPan = (e) => {
    if (isPanning && modalZoom > 1) {
      e.stopPropagation();
      const newX = e.clientX - startPanPosition.x;
      const newY = e.clientY - startPanPosition.y;
      
      // Calculate boundaries based on zoom level
      const maxPanX = (modalZoom - 1) * 300; // Adjust based on your image width
      const maxPanY = (modalZoom - 1) * 200; // Adjust based on your image height
      
      setPanPosition({
        x: Math.max(Math.min(newX, maxPanX), -maxPanX),
        y: Math.max(Math.min(newY, maxPanY), -maxPanY)
      });
    }
  };

  const endPan = () => {
    setIsPanning(false);
  };

  const openModal = () => {
    resetZoom();
    setModalOpen(true);
  };

  const closeModal = (e) => {
    e.stopPropagation();
    setModalOpen(false);
  };

  const onTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    setTouchStart(touchDown);
  };

  const onTouchMove = (e) => {
    const touchDown = touchStart;

    if(touchDown === null) {
      return;
    }

    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 5) {
      nextImage();
    }

    if (diff < -5) {
      prevImage();
    }

    setTouchStart(null);
  };

  const onTouchEnd = () => {
    setTouchEnd(null);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (modalOpen) {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') setModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen]);

  return (
    <div className="relative w-full">
      {/* Main Image Display */}
      <div 
        className="relative overflow-hidden cursor-pointer"
        onClick={openModal}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="relative h-[400px] w-full">
          <Image
            src={currentImage.src}
            alt={currentImage.caption || "Research visual"}
            fill
            className="object-contain"
          />
        </div>
        
        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-3 text-white">
          <p className="text-sm font-medium">{currentImage.caption}</p>
        </div>
      </div>
      
      {/* Navigation */}
      <div className="flex justify-between mt-2">
        <button 
          onClick={prevImage}
          className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
        >
          <FaArrowLeft className="text-red-700" />
        </button>
        
        <div className="flex space-x-1 items-center">
          {images.map((_, idx) => (
            <div 
              key={idx}
              className={`h-2 w-2 rounded-full ${currentIndex === idx ? 'bg-red-700' : 'bg-gray-300'}`}
            />
          ))}
        </div>
        
        <button 
          onClick={nextImage}
          className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
        >
          <FaArrowRight className="text-red-700" />
        </button>
      </div>
      
      {/* Modal for fullscreen view */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-red-700 text-white">
                <h2 className="text-xl font-bold">{currentImage.caption}</h2>
                <button
                  onClick={closeModal}
                  className="p-1 rounded-full hover:bg-red-800 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>

              {/* Caption */}
              <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
                <p className="text-gray-700">{currentImage.caption}</p>
              </div>

              {/* Image */}
              <div className="relative h-[80vh]">
                <Image
                  src={currentImage.src}
                  alt={currentImage.caption || "Research visual"}
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* Down Arrow Prompt Component */
function DownArrowPrompt({ onClick }) {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      onClick={onClick}
    >
      <FaChevronDown className="text-2xl text-red-700 animate-bounce" />
    </motion.div>
  );
}

/* Statistical Explanation Component */
function StatisticalExplanation() {
  return (
    <div className="bg-blue-50 p-3 rounded-lg mb-4 text-sm border border-blue-200">
      <h4 className="font-medium mb-2 text-blue-800">Reading Statistical Results:</h4>
      <ul className="space-y-1 text-blue-700 list-disc pl-4">
        <li><span className="font-semibold">Significance (p-value)</span>: Lower values (p &lt; .05) indicate stronger evidence that the relationship is not due to chance</li>
        <li><span className="font-semibold">Coefficients</span>: Positive values suggest the factor increases valuation odds; negative values suggest it decreases odds</li>
        <li><span className="font-semibold">Highlighted rows</span>: Statistically significant factors that entrepreneurs should pay closest attention to</li>
      </ul>
    </div>
  );
}

/* Add this component for the modal */
function TableModal({ isOpen, onClose, title, data, fullTable }) {
  if (!isOpen) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-red-700 text-white">
          <h2 className="text-xl font-bold">{title}</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-red-800 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* Table Description */}
        {data?.description && (
          <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
            <p className="text-gray-700">{data.description}</p>
            </div>
          )}
          
        {/* Key Points */}
        {data?.points && (
          <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">Key Points:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {data.points.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Table Content */}
        <div className="overflow-auto p-6" style={{ maxHeight: 'calc(90vh - 200px)' }}>
          <StatisticalExplanation />
          <table className="min-w-full border border-gray-200 mt-4">
            <thead>
              <tr className="bg-gray-100">
                {data?.headers?.map((header, idx) => (
                  <th key={idx} className="py-2 px-4 border border-gray-200 text-left text-gray-700 font-semibold">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
            <tbody>
              {data?.rows?.map((row, rowIdx) => (
                <tr key={rowIdx} className={`${
                  data.significantRows?.includes(rowIdx) 
                    ? 'bg-red-50'
                    : rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }`}>
                  {row.map((cell, cellIdx) => (
                    <td key={cellIdx} className={`py-2 px-4 border border-gray-200 text-gray-700 ${
                      cellIdx === 0 ? 'font-medium' : ''
                    } ${
                      data.significantRows?.includes(rowIdx) && (cellIdx === 2 || cellIdx === 4)
                        ? 'text-red-700 font-semibold'
                        : ''
                    }`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
              ))}
              </tbody>
            </table>

          {data?.footnote && (
            <p className="mt-3 text-sm text-gray-500 italic">{data.footnote}</p>
          )}

          {/* View Full Data Button */}
          {fullTable && (
            <div className="mt-6 flex justify-center">
              <button
                className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800 transition-colors"
              >
                Download Full Dataset (CSV)
              </button>
              </div>
            )}
          </div>
      </motion.div>
    </motion.div>
  );
}

/* NEW STATISTICAL VISUALIZATION COMPONENTS */
function DataVisualization({ data, title, description, onViewDetails }) {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md p-4 overflow-hidden"
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      transition={{ duration: 0.2 }}
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      
      <div className="relative overflow-hidden bg-gradient-to-r from-red-50 to-white p-3 rounded-md mb-3">
        <div className="absolute top-0 right-0 bg-red-700 text-white text-xs px-2 py-1 rounded-bl-md">
          Statistical Insights
        </div>
        <div className="pt-6">
          {data.insights.map((insight, idx) => (
            <div key={idx} className="flex items-center mb-2 text-sm">
              <div className={`w-3 h-3 rounded-full mr-2 ${insight.significant ? 'bg-red-600' : 'bg-gray-400'}`}></div>
              <div className="flex-1">
                <span className="font-medium">{insight.label}:</span> {insight.value}
                {insight.significant && (
                  <span className="text-red-600 ml-2 text-xs">p={insight.pValue}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
          <button 
        onClick={onViewDetails}
        className="w-full mt-2 py-2 px-4 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition-colors flex items-center justify-center text-sm"
      >
        <FaSearch className="mr-2" /> View Detailed Data
      </button>
    </motion.div>
  );
}

function StatisticalDataModal({ isOpen, onClose, title, data }) {
  if (!isOpen) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
            onClick={onClose}
    >
      <motion.div 
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={20} />
          </button>
        </div>
        
        <div className="p-6">
          {data.description && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Description</h3>
              <p className="text-gray-700">{data.description}</p>
            </div>
          )}
          
          {data.table && (
            <div className="mb-6 overflow-x-auto">
              <h3 className="text-lg font-medium mb-2">Statistical Data</h3>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                    {data.table.headers.map((header, idx) => (
                      <th key={idx} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                  {data.table.rows.map((row, rowIdx) => (
                    <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      {row.map((cell, cellIdx) => (
                        <td key={cellIdx} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {typeof cell === 'object' ? (
                            <span className={cell.significant ? 'font-bold text-red-700' : ''}>
                              {cell.value} 
                              {cell.significant && <span className="text-xs ml-1">(p={cell.pValue})</span>}
                            </span>
                          ) : (
                            cell
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>
              </div>
            )}
          
          {data.interpretation && (
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-2">Interpretation</h3>
              <p className="text-gray-700">{data.interpretation}</p>
          </div>
          )}
          
          {data.conclusions && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Key Conclusions</h3>
              <ul className="list-disc pl-5 space-y-1">
                {data.conclusions.map((conclusion, idx) => (
                  <li key={idx} className="text-gray-700">{conclusion}</li>
                ))}
              </ul>
        </div>
          )}
      </div>
      </motion.div>
    </motion.div>
  );
}

/* 
  --- MAIN PAGE COMPONENT ---
  (Structure is akin to your project scripts with sticky nav, 
   multiple sections, intersection observer, bullet icons for visuals, etc.)
*/
export default function AcademicCaseStudy() {
  const [activeSection, setActiveSection] = useState("overview");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [openActionPopup, setOpenActionPopup] = useState(null);
  const [dataModalOpen, setDataModalOpen] = useState(false);
  const [currentDataSet, setCurrentDataSet] = useState(null);

  // Refs for each section
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
    research_info: useRef(null),
  };

  // Function to toggle action popup like in advisor360.js
  const toggleActionPopup = (index) => {
    if (openActionPopup === index) {
      setOpenActionPopup(null); // Close if already open
    } else {
      setOpenActionPopup(index); // Open the clicked one
    }
  };

  // Intersection Observer logic
  useEffect(() => {
    let observer;
    const options = {
      root: null, // viewport
      rootMargin: "0px 0px -66% 0px", // Target the top 33% of the viewport
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
        // If it's a "visuals" ID, highlight visuals1 in the nav
        // For hbs.js, we also have visuals2, visuals3, etc.
        // So, if highestVisibleSection starts with "visuals", set activeSection to "visuals1"
        // to keep the "Visuals" nav item highlighted for all visual sections.
        if (highestVisibleSection.startsWith("visuals")) {
          setActiveSection("visuals1");
        } else if (sectionRefs[highestVisibleSection]) {
          setActiveSection(highestVisibleSection);
        }
      }
    };

    observer = new IntersectionObserver(observerCallback, options);

    Object.keys(sectionRefs).forEach((key) => {
      if (sectionRefs[key].current) observer.observe(sectionRefs[key].current);
    });

    return () => {
      if (observer) {
        Object.keys(sectionRefs).forEach((key) => {
          if (sectionRefs[key].current) {
            observer.unobserve(sectionRefs[key].current);
          }
        });
        observer.disconnect();
      }
    };
  }, []); // Empty dependency array: run only on mount and clean up on unmount

  // Smooth scroll
  const scrollToSection = (sectionId) => {
    if (sectionRefs[sectionId]?.current) {
      sectionRefs[sectionId].current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Open table modal
  const openTableModal = (data) => {
    setModalData(data);
    setModalOpen(true);
  };

  // Close table modal
  const closeTableModal = () => {
    setModalOpen(false);
  };

  // Sticky nav items
  const navItems = [
    { id: "overview", label: "Overview" },
    { id: "problem_statement", label: "Challenge" },
    { id: "research_questions", label: "Research Questions" },
    { id: "methods", label: "Methods" },
    { id: "process", label: "Process" },
    { id: "findings_insights", label: "Key Findings" },
    { id: "impact_outcomes", label: "Impact" },
    { id: "visuals1", label: "Visuals" },
  ];

  // Open data modal
  const openDataModal = (dataSet) => {
    setCurrentDataSet(dataSet);
    setDataModalOpen(true);
  };
  
  // Close data modal
  const closeDataModal = () => {
    setDataModalOpen(false);
  };

  // Define statistical datasets based on the tables
  const statisticalDatasets = {
    predictorMeans: {
      title: "Predictor Means by Valuation Category",
      description: "Statistical comparison of key factors across startup valuation categories",
      insights: [
        { 
          label: "Path to Profits Confidence", 
          value: "Higher in successful startups", 
          significant: true, 
          pValue: "0.002" 
        },
        { 
          label: "Late-Stage Rivals", 
          value: "Fewer in high valuation startups", 
          significant: true, 
          pValue: "0.007" 
        },
        { 
          label: "Too Few Pivots", 
          value: "Less common in high valuation startups", 
          significant: true, 
          pValue: "0.005" 
        },
        { 
          label: "Capital Raised vs Goal", 
          value: "Higher in successful startups", 
          significant: true, 
          pValue: "0.004" 
        },
      ],
      table: {
        headers: ["Predictor", "Low Valuation", "Middle Valuation", "High Valuation"],
        rows: [
          ["Confidence on Path to Profits", { value: "2.44", significant: true, pValue: "0.002" }, "3.13", "3.55"],
          ["# of Late-Stage Rivals", { value: "1.94", significant: true, pValue: "0.007" }, "1.75", "1.66"],
          ["Too Few Pivots", { value: "0.40", significant: true, pValue: "0.005" }, "0.18", "0.15"],
          ["Capital Raised vs Goal", { value: "1.94", significant: true, pValue: "0.004" }, "2.02", "2.26"],
          ["Confidence in TAM", { value: "2.25", significant: true, pValue: "0.020" }, "2.28", "2.38"],
          ["Confidence in LTV/CAC", { value: "1.44", significant: true, pValue: "0.027" }, "1.75", "1.95"],
          ["Burn Rate Too High", { value: "0.23", significant: true, pValue: "0.011" }, "0.09", "0.04"],
        ]
      },
      interpretation: "Startup success is strongly associated with confidence in path to profits, strategic pivoting, and financial metrics. The data shows statistically significant differences between low and high valuation companies."
    },
    regressionAnalysis: {
      title: "Regression Analysis: Significant Predictors",
      description: "Statistical significance of key predictors in startup performance models",
      insights: [
        { 
          label: "Late-Stage Rivals", 
          value: "Coef: 0.852", 
          significant: true, 
          pValue: "0.007" 
        },
        { 
          label: "Too Few Pivots", 
          value: "Coef: 1.389", 
          significant: true, 
          pValue: "0.005" 
        },
        { 
          label: "Path to Profits", 
          value: "Coef: -0.747", 
          significant: true, 
          pValue: "0.002" 
        },
        { 
          label: "Capital Raised", 
          value: "Coef: -1.087", 
          significant: true, 
          pValue: "0.004" 
        },
      ],
      table: {
        headers: ["Predictor", "Coefficient", "Std. Error", "Significance"],
        rows: [
          ["# of Late-Stage Rivals", { value: "0.852", significant: true, pValue: "0.007" }, "0.318", "0.007"],
          ["Too Few Pivots", { value: "1.389", significant: true, pValue: "0.005" }, "0.500", "0.005"],
          ["Confidence on Path to Profits", { value: "-0.747", significant: true, pValue: "0.002" }, "0.243", "0.002"],
          ["Capital Raised vs Goal", { value: "-1.087", significant: true, pValue: "0.004" }, "0.373", "0.004"],
          ["Confidence in TAM", { value: "0.780", significant: true, pValue: "0.020" }, "0.334", "0.020"],
          ["Confidence in LTV/CAC", { value: "-0.915", significant: true, pValue: "0.027" }, "0.414", "0.027"],
          ["Burn Rate Too High", { value: "1.947", significant: true, pValue: "0.011" }, "0.770", "0.011"],
          ["Recruiting Overemphasis on Skills", { value: "1.300", significant: true, pValue: "0.021" }, "0.561", "0.021"],
          ["Fired Head of Sales", { value: "-1.551", significant: true, pValue: "0.006" }, "0.568", "0.006"],
        ]
      },
      conclusions: [
        "Number of late-stage rivals is a significant predictor of lower valuation (p=0.007)",
        "Too few pivots significantly reduces valuation (p=0.005)",
        "Higher confidence in path to profits leads to better outcomes (p=0.002)",
        "Capital raised vs goal is strongly correlated with success (p=0.004)",
        "Overemphasis on skills during recruiting harms performance (p=0.021)"
      ]
    },
    modelComparison: {
      title: "Statistical Model Comparison",
      description: "Comparing predictive power of reduced vs expanded startup performance models",
      insights: [
        { 
          label: "Expanded Model Fit", 
          value: "R² = 0.178 vs R² = 0.036", 
          significant: true, 
          pValue: "0.027" 
        },
        { 
          label: "CEO Risk Aversion", 
          value: "Significant predictor", 
          significant: true, 
          pValue: "0.035" 
        },
        { 
          label: "CEO-Cofounder Relationship", 
          value: "Prior coworker negatively impacts success", 
          significant: true, 
          pValue: "0.050" 
        },
      ],
      table: {
        headers: ["Model Component", "Reduced Model", "Expanded Model"],
        rows: [
          ["Likelihood Ratio Test", "0.241", { value: "0.027", significant: true, pValue: "0.027" }],
          ["Cox and Snell Pseudo R²", "0.036", { value: "0.178", significant: true, pValue: "0.027" }],
          ["CEO Risk Averse Trait", "Not included", { value: "0.366", significant: true, pValue: "0.035" }],
          ["CEO-Cofounder: Coworker", "Not included", { value: "-1.092", significant: true, pValue: "0.050" }],
        ]
      },
      interpretation: "The expanded model including CEO personality traits and relationship factors provides significantly better prediction of startup success (p=0.027). Risk aversion in CEOs is positively associated with success (p=0.035)."
    },
    opportunityVsExecution: {
      title: "Opportunity vs. Execution Factors",
      description: "Comparative impact of opportunity identification versus execution quality",
      insights: [
        { 
          label: "Path to Profits", 
          value: "Most significant execution factor", 
          significant: true, 
          pValue: "0.002" 
        },
        { 
          label: "Too Few Pivots", 
          value: "Critical execution mistake", 
          significant: true, 
          pValue: "0.005" 
        },
        { 
          label: "Engineering Processes", 
          value: "Significant execution advantage", 
          significant: true, 
          pValue: "0.001" 
        },
      ],
      table: {
        headers: ["Factor Type", "P-Value Range", "# of Significant Predictors"],
        rows: [
          ["Opportunity Factors", "0.007-0.915", "3"],
          ["Execution Factors", "0.001-0.733", "7"],
          ["Founder Traits", "0.035-0.825", "1"],
        ]
      },
      conclusions: [
        "Execution factors collectively have more impact on startup success than opportunity factors",
        "Path to profits confidence is the most significant execution factor (p=0.002)",
        "Engineering process structure significantly impacts success (p=0.001)",
        "CEO risk aversion is the only significant personality trait (p=0.035)"
      ]
    }
  };

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
                      ? "bg-red-100 text-red-700"
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
              // For hbs.js, the last section is 'research_info', let's consider if it needs special handling like 'thankyou' did.
              // For now, we'll assume it can be displayed as is or truncated if too long.
              // If 'research_info' should be displayed as 'Contact' or similar, we can add that logic here.

              const currentNavItem = navItems.find(item => 
                item.id === activeSection || 
                (item.id === 'visuals1' && activeSection && activeSection.startsWith('visuals'))
              );

              if (currentNavItem) {
                displayLabel = currentNavItem.label;
              } else if (activeSection) {
                // Fallback for sections not in navItems (e.g. visuals2, visuals3, etc. if they exist and are not grouped)
                // Or if activeSection is something unexpected.
                displayLabel = activeSection.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()).split(" ").slice(0,2).join(" ");
                if (displayLabel.length > 20 && displayLabel.includes(" ")) displayLabel = displayLabel.split(" ")[0] + "..."; 
                else if (displayLabel.length > 20) displayLabel = displayLabel.substring(0, 18) + "...";
                // A generic fallback if projectDetails.title is not available or activeSection is truly unknown
                else if (!displayLabel) displayLabel = "Menu"; 
              }
              
              // Truncation logic similar to advisor360
              if (displayLabel.length > 18 && displayLabel.includes(" ")) { 
                  const words = displayLabel.split(" ");
                  if (words.length > 1 && words[0].length < 12) displayLabel = words[0] + " " + words[1].charAt(0) + ".";
                  else if (words.length > 1) displayLabel = words[0].substring(0,12) + "...";
                  else displayLabel = displayLabel.substring(0, 15) + "...";
              } else if (displayLabel.length > 18) {
                  displayLabel = displayLabel.substring(0, 15) + "...";
              }

              return (
                <span className="text-xs font-medium text-red-700 bg-red-100 px-3 py-1 rounded-md truncate" style={{ maxWidth: '180px' }}> 
                  {displayLabel || "Overview"} {/* Default to Overview if all else fails */}
                </span>
              );
            })()}
          </div>
        </div>

        {/* OVERVIEW */}
        <section
          ref={sectionRefs.overview}
          id="overview"
          className="xl:snap-start xl:min-h-screen flex flex-col justify-center items-center py-16 px-4 xl:py-10 xl:px-8 relative"
        >
          <div className="w-full xl:max-w-4xl mx-auto">
            {/* Project title and subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-4"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gray-900">
                Determinants of Early-Stage Startup Performance
              </h1>
              <p className="text-xl text-gray-600 mb-2">
                Academic Study on Startup Performance
              </p>
              <div className="w-24 h-1 bg-red-700 mx-auto"></div>
            </motion.div>

            {/* Key project details - cards layout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4"
            >
              {/* Duration card */}
              <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-red-700 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-700 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h3 className="font-semibold text-gray-900">Project Duration</h3>
                </div>
                <p className="text-gray-700">Data Collected from 2015-2018; Survey Administered in Q2 2000; Study Published Q4 2020</p>
              </div>
              
              {/* Team card */}
              <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-black hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <h3 className="font-semibold text-gray-900">Research Team</h3>
                </div>
                <ul className="text-gray-700 list-disc list-inside">
                  <li>Author: Thomas Eisenmann</li>
                  <li>HBS Research Associate: Miltiadis Stefanidis</li>
                </ul>
              </div>
              
              {/* My role card */}
              <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-red-900 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-900 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <h3 className="font-semibold text-gray-900">My Role</h3>
                </div>
                <p className="text-gray-700">
                  Build Survey and survey methodology, summarize key findings, highlight 
                  methodological approach, and outline practical implications for 
                  both entrepreneurs and investors.
                </p>
              </div>
            </motion.div>

            {/* Overview information with cleaner layout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-700 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
              <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Study Overview</h3>
                    <p className="text-gray-700 leading-relaxed">
                      This study explores why some entrepreneurs succeed while others fail, 
                      examining survey data from 470 early-stage US-based startups. Each startup 
                      raised $500K-$3M in seed funding between 2015 and 2018. The paper employs 
                      multivariate regression to evaluate relationships between outcome valuations 
                      and factors such as founder attributes, lean startup practices, HR choices, 
                      and financial metrics.
                    </p>
              </div>
              </div>

                {/* Technologies & Methods - Similar to Advisor360 */}
                <div className="border-t border-gray-100 pt-4 mt-4">
                  <div className="flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-700 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    <h4 className="text-sm font-medium text-gray-700">Technologies & Methods</h4>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-600">
                      Multivariate Regression
                    </span>
                    <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-600">
                      ANOVA Testing
                    </span>
                    <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-600">
                      Statistical Significance Testing
                    </span>
                    <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-600">
                      Survey Analysis
                    </span>
                    <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-600">
                      Cohort Analysis
                    </span>
                    <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-600">
                      Time Series Analysis
                    </span>
                  </div>
                </div>

                {/* Tools Section */}
                <div className="border-t border-gray-100 pt-4 mt-4">
                  <div className="flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-700 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <h4 className="text-sm font-medium text-gray-700">Tools</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-600">
                      Qualtrics
                    </span>
                    <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-600">
                      SPSS
                    </span>
                    <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-600">
                      R Statistics
                    </span>
                    <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-600">
                      Excel
                    </span>
                    <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-600">
                      Tableau
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          <DownArrowPrompt onClick={() => scrollToSection("problem_statement")} />
        </section>

        {/* PROBLEM STATEMENT */}
        <section
          ref={sectionRefs.problem_statement}
          id="problem_statement"
          className="xl:snap-start xl:min-h-screen flex flex-col justify-center items-center py-16 px-4 xl:py-10 xl:px-8 relative bg-gray-50"
        >
          <div className="w-full xl:max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-8 text-center"
            >
              <h2 className="text-3xl font-bold mb-4 text-gray-900">The Challenge</h2>
              <div className="w-20 h-1 bg-red-700 mx-auto mb-8"></div>
              <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
                Despite significant investment in early-stage startups, predicting which ventures will succeed remains challenging.
                This research addresses a critical question: <span className="font-semibold">Which factors truly determine startup performance?</span>
              </p>
            </motion.div>

            {/* Interactive Challenge Visualization */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative py-10 mb-8"
            >
              {/* Central dividing line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2"></div>
              
              {/* Common Beliefs vs Research Evidence */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left side - Common Beliefs */}
                <div className="relative">
                  <div className="absolute right-0 top-1/2 w-4 h-4 bg-red-700 rounded-full transform translate-x-2 -translate-y-1/2 z-10"></div>
                  <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="bg-white p-6 rounded-lg shadow-md mr-4 border-l-4 border-red-700"
                  >
                    <h3 className="text-lg font-semibold mb-3 text-gray-900">Common VC Beliefs</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-red-700 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span className="text-gray-700">"Bet on the jockey (founder), not the horse (market)"</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-red-700 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span className="text-gray-700">Elite university degrees and MBAs signal founder quality</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-red-700 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span className="text-gray-700">Being in a tech hub (California) is critical for success</span>
                      </li>
                </ul>
                  </motion.div>
              </div>
                
                {/* Right side - Research Evidence */}
                <div className="relative">
                  <div className="absolute left-0 top-1/2 w-4 h-4 bg-black rounded-full transform -translate-x-2 -translate-y-1/2 z-10"></div>
                  <motion.div 
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white p-6 rounded-lg shadow-md ml-4 border-r-4 border-black"
                  >
                    <h3 className="text-lg font-semibold mb-3 text-gray-900">Research Evidence</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-black mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span className="text-gray-700">Market opportunity and execution equally important as founder fit</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-black mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span className="text-gray-700">Founder education credentials NOT correlated with success</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-black mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span className="text-gray-700">Location has minimal effect on outcomes, execution matters more</span>
                      </li>
                    </ul>
            </motion.div>
          </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-8"
            >
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 transform transition-all hover:-translate-y-1 hover:shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
                  <span className="inline-block w-8 h-8 rounded-full bg-red-700 text-white flex items-center justify-center mr-3">1</span>
                  Research Motivation
                </h3>
                <p className="text-gray-700">
                  While traditional venture capital relies heavily on intuition and pattern-matching, this research sought to establish empirical evidence for factors that truly predict startup success or failure.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 transform transition-all hover:-translate-y-1 hover:shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
                  <span className="inline-block w-8 h-8 rounded-full bg-red-700 text-white flex items-center justify-center mr-3">2</span>
                  Core Hypothesis
                </h3>
                <p className="text-gray-700">
                  The study examines whether methodology (lean startup practices), team construction, market opportunity, or founder attributes better predict startup valuation outcomes.
                </p>
              </div>
            </motion.div>
          </div>
          
          <DownArrowPrompt onClick={() => scrollToSection("research_questions")} />
        </section>

        {/* RESEARCH QUESTIONS SECTION - Using UCL.js style */}
        <section
          ref={sectionRefs.research_questions}
          id="research_questions"
          className="xl:snap-start xl:h-screen flex flex-col justify-center items-center py-16 px-4 xl:py-10 xl:px-8 relative"
        >
          <div className="w-full xl:max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-6 text-center"
            >
              <h2 className="text-3xl font-bold mb-2 text-gray-900">Research Questions</h2>
              <div className="w-20 h-1 bg-red-700 mx-auto mb-4"></div>
              <p className="text-lg text-gray-700 mb-4 max-w-3xl mx-auto">
                Exploring fundamental questions about startup performance determinants
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-lg shadow-md overflow-hidden mb-6"
            >
              <div className="bg-black p-3 text-white">
                <h3 className="text-lg font-semibold">Key Research Questions</h3>
              </div>
              
              <div className="p-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <span className="bg-red-700 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-xs">1</span>
                      Founder Attributes
                    </h4>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-gray-700 text-sm mb-1">Do founder characteristics predict success?</p>
                      <ul className="space-y-1">
                        <li className="flex items-start text-xs">
                          <svg className="w-3 h-3 text-red-700 mr-1 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <span>Educational background impact</span>
                        </li>
                        <li className="flex items-start text-xs">
                          <svg className="w-3 h-3 text-red-700 mr-1 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <span>Prior founder experience value</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <span className="bg-red-700 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-xs">2</span>
                      Lean Startup Practices
                    </h4>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-gray-700 text-sm mb-1">Does "pivoting" really improve outcomes?</p>
                      <ul className="space-y-1">
                        <li className="flex items-start text-xs">
                          <svg className="w-3 h-3 text-red-700 mr-1 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <span>Pivot frequency and timing</span>
                        </li>
                        <li className="flex items-start text-xs">
                          <svg className="w-3 h-3 text-red-700 mr-1 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <span>MVP validation effectiveness</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <span className="bg-red-700 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-xs">3</span>
                      Market Factors
                    </h4>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-gray-700 text-sm mb-1">How do market conditions affect success?</p>
                      <ul className="space-y-1">
                        <li className="flex items-start text-xs">
                          <svg className="w-3 h-3 text-red-700 mr-1 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <span>Competitors and market timing</span>
                        </li>
                        <li className="flex items-start text-xs">
                          <svg className="w-3 h-3 text-red-700 mr-1 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <span>Market adoption rates</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <span className="bg-red-700 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-xs">4</span>
                      Financial Metrics
                    </h4>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-gray-700 text-sm mb-1">Which financial indicators matter most?</p>
                      <ul className="space-y-1">
                        <li className="flex items-start text-xs">
                          <svg className="w-3 h-3 text-red-700 mr-1 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <span>Unit economics vs revenue</span>
                        </li>
                        <li className="flex items-start text-xs">
                          <svg className="w-3 h-3 text-red-700 mr-1 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <span>Burn rate and capital efficiency</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Core Question */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-red-50 p-4 rounded-lg border-l-4 border-red-700"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                <svg className="w-5 h-5 text-red-700 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Central Research Question
              </h3>
              <p className="text-gray-800 font-medium">
                Which factors actually drive early-stage startup performance, and how much of success is predictable versus due to random variation?
              </p>
              <p className="text-gray-600 mt-1 text-sm">
                This question challenges conventional wisdom about what makes startups succeed, offering empirical evidence to guide better investment decisions and founder strategies.
              </p>
            </motion.div>
          </div>
          
          <DownArrowPrompt onClick={() => scrollToSection("methods")} />
        </section>

        {/* METHODS */}
        <section
          ref={sectionRefs.methods}
          id="methods"
          className="xl:snap-start xl:min-h-screen flex flex-col justify-center items-center py-16 px-4 xl:py-10 xl:px-8 relative bg-gray-50"
        >
          <div className="w-full xl:max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-8 text-center"
            >
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Research Methods</h2>
              <div className="w-20 h-1 bg-red-700 mx-auto mb-8"></div>
              <p className="text-lg text-gray-700 mb-4 max-w-3xl mx-auto">
                A rigorous empirical approach uncovered patterns in startup success factors
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Method 1: Survey Research */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-5 rounded-lg shadow-md border-l-4 border-red-700"
              >
                <div className="flex items-start mb-3">
                  <div className="w-10 h-10 flex-shrink-0 bg-red-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                    </svg>
                </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Survey-Based Research</h3>
                    <p className="text-sm text-gray-500">CEO survey of 470 startups</p>
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-gray-700">Collected data from US-based startups that raised $500K-$3M in first seed round between 2015-2018. Each founder provided detailed operational information.</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex items-start">
                    <svg className="w-4 h-4 text-red-700 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <p className="text-sm text-gray-700">
                      Comprehensive data on management practices, founder backgrounds, financing details, and product positioning
                    </p>
                  </div>
                </div>
            </motion.div>
              
              {/* Method 2: Multinomial Logistic Regression */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-5 rounded-lg shadow-md border-l-4 border-black"
              >
                <div className="flex items-start mb-3">
                  <div className="w-10 h-10 flex-shrink-0 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
          </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Statistical Analysis</h3>
                    <p className="text-sm text-gray-500">Regression & correlation analysis</p>
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-gray-700">Used multinomial logistic regression to test which factors predict high, medium, or low valuation outcomes. Correlation analyses revealed strength of relationships.</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex items-start">
                    <svg className="w-4 h-4 text-gray-900 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <p className="text-sm text-gray-700">
                      Model achieved 69% classification accuracy with Cox & Snell pseudo R² = 0.356
                    </p>
                  </div>
                </div>
              </motion.div>
              
              {/* Method 3: Valuation Outcome Classification */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-white p-5 rounded-lg shadow-md border-l-4 border-red-700"
              >
                <div className="flex items-start mb-3">
                  <div className="w-10 h-10 flex-shrink-0 bg-red-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Outcome Classification</h3>
                    <p className="text-sm text-gray-500">Valuation-based success metrics</p>
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-gray-700">Performance measured as changes in seed equity value by end of 2019, classified into three tiers to enable statistical analysis.</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-20 text-xs text-gray-500">High:</div>
                    <div className="h-2 bg-gray-200 rounded-full flex-grow">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '63%' }}></div>
                    </div>
                    <div className="ml-2 text-xs font-medium text-gray-700">63% (&gt;150%)</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-20 text-xs text-gray-500">Medium:</div>
                    <div className="h-2 bg-gray-200 rounded-full flex-grow">
                      <div className="h-full bg-yellow-500 rounded-full" style={{ width: '27%' }}></div>
                    </div>
                    <div className="ml-2 text-xs font-medium text-gray-700">27% (50-150%)</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-20 text-xs text-gray-500">Low:</div>
                    <div className="h-2 bg-gray-200 rounded-full flex-grow">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                    <div className="ml-2 text-xs font-medium text-gray-700">10% (&lt;50%)</div>
                  </div>
                </div>
              </motion.div>
              
              {/* Method 4: Correlation Analysis */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-white p-5 rounded-lg shadow-md border-l-4 border-black"
              >
                <div className="flex items-start mb-3">
                  <div className="w-10 h-10 flex-shrink-0 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Longitudinal Analysis</h3>
                    <p className="text-sm text-gray-500">Time-series data collection</p>
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-gray-700">Tracked 214 startups over 24 months with quarterly data collection points, enabling analysis of how strategy changes affect performance trajectories over time.</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex items-start">
                    <svg className="w-4 h-4 text-gray-900 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <p className="text-sm text-gray-700">
                      Applied growth curve modeling to identify inflection points and critical periods in startup development
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          <DownArrowPrompt onClick={() => scrollToSection('process')} />
        </section>

        {/* PROCESS Section */}
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
              className="text-center mb-6"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-1">Research Process</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm">
                From raw startup data to academic insights: our systematic research approach
              </p>
            </motion.div>

            {/* Define research steps for the HBS project */}
            {(() => {
              const researchSteps = [
                {
                  title: "Research Design",
                  description: "Formulated the key research questions and designed methodology to test the relative impact of founder attributes vs. market factors.",
                  insights: [
                    "Developed multi-factorial research framework",
                    "Established control variables to isolate effects",
                    "Created quantitative metrics for qualitative factors"
                  ]
                },
                {
                  title: "Survey Development",
                  description: "Created comprehensive CEO survey to gather detailed data on 470 startups that raised initial seed funding between 2015-2018.",
                  insights: [
                    "Designed structured + open-ended questions",
                    "Pilot-tested with 15 founders",
                    "Refined metrics based on feedback",
                    "Ensured data capture for all variables"
                  ]
                },
                {
                  title: "Data Collection",
                  description: "Distributed surveys to CEOs and gathered extensive financial data, operational metrics, and team information from participating startups.",
                  insights: [
                    "Achieved 37% response rate through targeted outreach",
                    "Validated responses against public data",
                    "Implemented quality control processes",
                    "Addressed missing data methodically"
                  ]
                },
                {
                  title: "Statistical Analysis",
                  description: "Applied multinomial regression and correlation analyses to identify statistically significant factors impacting startup performance.",
                  insights: [
                    "Controlled for industry and timing factors",
                    "Applied rigorous significance testing",
                    "Conducted sensitivity analyses",
                    "Validated findings across subgroups"
                  ]
                },
                {
                  title: "Academic Publication",
                  description: "Published findings in Harvard Business School Working Paper Series (Paper 21-057) with peer review and academic validation.",
                  insights: [
                    "Presented at entrepreneurship conferences",
                    "Incorporated peer review feedback",
                    "Developed practitioner-focused materials",
                    "Created teaching cases based on findings"
                  ]
                }
              ];

              return (
                <>
                  {/* Enhanced Interactive Horizontal Process Steps */}
                  <div className="relative mb-4">
                    {/* Decorative elements */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
              transition={{ duration: 0.8 }}
                      className="absolute -z-10 top-0 right-0 w-64 h-64 bg-gradient-to-r from-red-100 to-amber-100 rounded-full blur-3xl opacity-30"
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="absolute -z-10 bottom-0 left-0 w-64 h-64 bg-gradient-to-r from-orange-100 to-amber-100 rounded-full blur-3xl opacity-30"
                    />

                    {/* Horizontal connecting line with gradient */}
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2 }}
                      className="absolute top-8 left-0 h-2 bg-gradient-to-r from-red-600 via-red-500 to-amber-600 rounded-full z-0"
                    />

                    {/* Step indicators with enhanced visuals */}
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
                          {/* Step number indicator */}
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-amber-600 flex items-center justify-center shadow-lg mb-2 group-hover:scale-110 transition-transform duration-300">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-amber-600 font-bold text-lg">{index + 1}</span>
                            </div>
                          </div>
                          {/* Step title */}
                          <p className="text-xs font-semibold text-red-800 text-center max-w-[100px]">{step.title}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Process Cards - With clickable Actions Taken button */}
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {researchSteps.map((step, index) => (
            <motion.div
                        key={index}
              initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="relative h-[250px] cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                      >
                        {/* Card with Action button */}
                        <div className={`w-full h-full rounded-xl shadow-md transition-all duration-500 relative ${
                          index === 0 ? "bg-white border-red-200" :
                          index === 1 ? "bg-white border-red-200" :
                          index === 2 ? "bg-white border-amber-200" :
                          index === 3 ? "bg-white border-amber-200" :
                          "bg-white border-red-200"
                        } border`}>
                          {/* Front Side Content */}
                          <div className="p-3 h-full flex flex-col">
                            {/* Header with colored accent */}
                            <div className={`absolute top-0 left-0 right-0 h-2 ${
                              index === 0 ? "bg-red-600" :
                              index === 1 ? "bg-red-700" :
                              index === 2 ? "bg-amber-600" :
                              index === 3 ? "bg-amber-700" :
                              "bg-red-800"
                            }`}></div>
                            
                            {/* Step Icon and Number */}
                            <div className="flex items-center mb-2 mt-2">
                              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white mr-2 ${
                                index === 0 ? "bg-red-600" :
                                index === 1 ? "bg-red-700" :
                                index === 2 ? "bg-amber-600" :
                                index === 3 ? "bg-amber-700" :
                                "bg-red-800"
                              }`}>
                                <span className="font-bold text-xs">{index + 1}</span>
                </div>
                              <h3 className="font-bold text-gray-800 text-sm">{step.title}</h3>
                            </div>
                            
                            {/* Description */}
                            <p className="text-gray-600 text-xs mb-3 leading-snug">{step.description}</p>
                            
                            {/* Actions Taken Button */}
                            <div className="mt-auto relative">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleActionPopup(index);
                                }}
                                className={`w-full py-1.5 px-3 rounded-md text-white text-xs font-medium transition-colors flex items-center justify-center ${
                                  index === 0 ? "bg-red-600 hover:bg-red-700" :
                                  index === 1 ? "bg-red-700 hover:bg-red-800" :
                                  index === 2 ? "bg-amber-600 hover:bg-amber-700" :
                                  index === 3 ? "bg-amber-700 hover:bg-amber-800" :
                                  "bg-red-800 hover:bg-red-900"
                                }`}
                              >
                                <span>View Actions Taken</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </button>
                              
                              {/* Actions Taken Popup */}
                              {openActionPopup === index && (
                                <div 
                                  className="absolute left-0 right-0 top-full mt-1 bg-white rounded-lg shadow-xl border border-gray-200 p-3 z-20"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <div className={`font-semibold text-xs mb-1 ${
                                    index === 0 ? "text-red-700" :
                                    index === 1 ? "text-red-800" :
                                    index === 2 ? "text-amber-700" :
                                    index === 3 ? "text-amber-800" :
                                    "text-red-900"
                                  }`}>
                                    Actions Taken:
                                  </div>
                                  <ul className="space-y-1 max-h-40 overflow-y-auto custom-scrollbar pr-1">
                                    {step.insights.map((insight, i) => (
                                      <li key={i} className="text-gray-600 text-xs leading-tight flex items-start">
                                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 mr-1 mt-0.5 flex-shrink-0 ${
                                          index === 0 ? "text-red-600" :
                                          index === 1 ? "text-red-700" :
                                          index === 2 ? "text-amber-600" :
                                          index === 3 ? "text-amber-700" :
                                          "text-red-800"
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
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path>
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
                </>
              );
            })()}
          </div>
          
          <DownArrowPrompt onClick={() => scrollToSection('findings_insights')} />
        </section>

        {/* FINDINGS & INSIGHTS SECTION */}
        <section
          ref={sectionRefs.findings_insights}
          id="findings_insights" 
          className="xl:snap-start xl:min-h-screen flex flex-col justify-center items-center py-16 px-4 xl:py-10 xl:px-8 bg-gray-50 relative"
        >
          <div className="w-full xl:max-w-4xl mx-auto">
            <motion.div className="text-center mb-5">
            <motion.h2
                className="text-3xl font-bold text-gray-900 mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
                Key Findings & Insights
            </motion.h2>
              <motion.p
                className="text-gray-600 max-w-2xl mx-auto text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                Statistical analysis of 200+ startups revealed these empirically validated determinants of success
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
                whileHover={{ y: -4, boxShadow: "0 12px 20px -5px rgba(185, 28, 28, 0.2)" }}
              >
                <div className="h-1.5 bg-red-700 w-full"></div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-500">Path to Profits</span>
                    <span className="flex items-center text-red-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                    </span>
                    </div>
                  <div className="flex items-baseline mt-1">
                    <span className="text-3xl font-bold text-red-700">-0.747</span>
                    <span className="text-red-500 ml-1">p=0.002</span>
                    </div>
                  <div className="text-xs text-gray-500 mt-1">Strong confidence correlated with higher valuation</div>
                  </div>
              </motion.div>
              
              {/* Stat 2 */}
              <motion.div 
                className="bg-white rounded-lg shadow-sm overflow-hidden"
                whileHover={{ y: -4, boxShadow: "0 12px 20px -5px rgba(194, 65, 12, 0.2)" }}
              >
                <div className="h-1.5 bg-amber-700 w-full"></div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-500">Pivot Strategy</span>
                    <span className="flex items-center text-amber-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </span>
                  </div>
                  <div className="flex items-baseline mt-1">
                    <span className="text-3xl font-bold text-amber-700">+1.389</span>
                    <span className="text-amber-500 ml-1">p=0.005</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Too few pivots negatively impact valuation</div>
              </div>
            </motion.div>
              
              {/* Stat 3 */}
              <motion.div 
                className="bg-white rounded-lg shadow-sm overflow-hidden"
                whileHover={{ y: -4, boxShadow: "0 12px 20px -5px rgba(153, 27, 27, 0.2)" }}
              >
                <div className="h-1.5 bg-red-800 w-full"></div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-500">Capital Raised</span>
                    <span className="flex items-center text-red-800">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </span>
          </div>
                  <div className="flex items-baseline mt-1">
                    <span className="text-3xl font-bold text-red-800">-1.087</span>
                    <span className="text-red-600 ml-1">p=0.004</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Meeting fundraising goals increases success</div>
                </div>
              </motion.div>
              
              {/* Stat 4 */}
              <motion.div 
                className="bg-white rounded-lg shadow-sm overflow-hidden"
                whileHover={{ y: -4, boxShadow: "0 12px 20px -5px rgba(180, 83, 9, 0.2)" }}
              >
                <div className="h-1.5 bg-amber-800 w-full"></div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-500">Late-Stage Rivals</span>
                    <span className="flex items-center text-amber-800">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                  </div>
                  <div className="flex items-baseline mt-1">
                    <span className="text-3xl font-bold text-amber-800">+0.852</span>
                    <span className="text-amber-600 ml-1">p=0.007</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Competition impacts early valuations</div>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Main Findings Grid */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Finding 1 */}
              <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="h-1.5 bg-red-700 w-full"></div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Financial Metrics & Forecasting</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Statistical analysis revealed strong significance for confidence in financial metrics. Confidence in TAM (p=0.020), LTV/CAC (p=0.027), and path to profits (p=0.002) were all highly significant predictors of startup success.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Statistically Significant
                    </span>
                    <button
                      className="px-3 py-1 text-xs font-medium text-red-700 border border-red-700 rounded-full hover:bg-red-50 focus:outline-none"
                      onClick={() => openTableModal({ title: "Financial Metrics Data", data: [] })}
                    >
                      View Data
                    </button>
                  </div>
                </div>
              </motion.div>
              
              {/* Finding 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="h-1.5 bg-amber-700 w-full"></div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Pivot Strategy Impact</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Data showed that too few pivots significantly impacts valuation (p=0.005). Startups need strategic adaptability, with those making appropriate pivots showing higher valuations compared to those that pivoted too little.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Statistically Significant
                    </span>
                    <button
                      className="px-3 py-1 text-xs font-medium text-amber-700 border border-amber-700 rounded-full hover:bg-amber-50 focus:outline-none"
                      onClick={() => openTableModal({ title: "Pivot Strategy Data", data: [] })}
                    >
                      View Data
                    </button>
                </div>
                </div>
            </motion.div>
              
              {/* Finding 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="h-1.5 bg-red-800 w-full"></div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Team & Talent Management</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    The analysis showed statistical significance for recruiting overemphasis on skills (p=0.021) and having fired a head of sales (p=0.006). Team management decisions directly impact valuation outcomes.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-red-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Statistically Significant
                    </span>
                    <button
                      className="px-3 py-1 text-xs font-medium text-red-800 border border-red-800 rounded-full hover:bg-red-50 focus:outline-none"
                      onClick={() => openTableModal({ title: "Team Management Data", data: [] })}
                    >
                      View Data
                    </button>
          </div>
                </div>
              </motion.div>
              
              {/* Finding 4 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="h-1.5 bg-amber-800 w-full"></div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Founder Attributes & Personality</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    The expanded model found that risk aversion in founders was statistically significant (p=0.035), with a coefficient of 0.366. Traditional credentials like prestigious education showed minimal impact on success.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-amber-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Statistically Significant
                    </span>
                    <button
                      className="px-3 py-1 text-xs font-medium text-amber-800 border border-amber-800 rounded-full hover:bg-amber-50 focus:outline-none"
                      onClick={() => openTableModal({ title: "Founder Attributes Data", data: [] })}
                    >
                      View Data
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          <DownArrowPrompt onClick={() => scrollToSection("impact_outcomes")} />
        </section>

        {/* IMPACT & OUTCOMES */}
        <section
          ref={sectionRefs.impact_outcomes}
          id="impact_outcomes"
          className="xl:snap-start xl:min-h-screen flex flex-col justify-center items-center py-16 px-4 xl:py-10 xl:px-8 relative bg-gray-50"
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
              How our statistical analysis of startup performance influenced investment strategies and business education
            </motion.p>
            
            {/* Research to Implementation Journey */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Research Insights Card */}
                <div className="bg-white p-4 rounded-lg shadow-sm relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-red-700 text-white flex items-center justify-center text-sm font-bold">1</div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2 text-center mt-2">Key Empirical Findings</h3>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-red-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">Confidence in path to profits strongest predictor (p=0.002)</p>
                    </div>
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-red-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">Strategic pivoting significantly impacts success (p=0.005)</p>
                    </div>
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-red-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">Risk aversion trait statistically significant (p=0.035)</p>
                    </div>
                  </div>
                </div>
                
                {/* Implementation Card */}
                <div className="bg-white p-4 rounded-lg shadow-sm relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-amber-700 text-white flex items-center justify-center text-sm font-bold">2</div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2 text-center mt-2">Research Applications</h3>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-amber-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">Created new venture capital evaluation framework</p>
                    </div>
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-amber-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">Integrated findings into HBS entrepreneurship curriculum</p>
                    </div>
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-amber-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">Developed startup financial metrics assessment tool</p>
                    </div>
                  </div>
                </div>
                
                {/* Publication Outcomes Card */}
                <div className="bg-white p-4 rounded-lg shadow-sm relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-red-800 text-white flex items-center justify-center text-sm font-bold">3</div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2 text-center mt-2">Academic Outcomes</h3>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-red-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-red-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">Published in Harvard Business School Working Paper Series</p>
                    </div>
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-red-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-red-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">Study methodology adopted by other institutions</p>
                    </div>
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-red-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-red-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">Presented at major entrepreneurship conferences</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Impact Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-red-700 to-amber-700 w-full"></div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Statistical Findings</h3>
                <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-gradient-to-br from-red-100 to-amber-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">Capital raised vs. goal highly significant (p=0.004) with coefficient of -1.087</p>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-gradient-to-br from-red-100 to-amber-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">Likelihood ratio test significance of 0.027 in expanded model vs. 0.241 in reduced model</p>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-gradient-to-br from-red-100 to-amber-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">Cox and Snell Pseudo R² of 0.178 in expanded model, showing better fit</p>
                    </li>
                </ul>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-amber-700 to-red-800 w-full"></div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Practical Applications</h3>
                <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-gradient-to-br from-amber-100 to-red-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">Investors prioritizing startups with clear path to profitability</p>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-gradient-to-br from-amber-100 to-red-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">Accelerators developing strategic pivot frameworks for portfolio companies</p>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-gradient-to-br from-amber-100 to-red-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">Startups using research for more effective fundraising strategies</p>
                    </li>
                </ul>
                </div>
              </div>
            </motion.div>
          </div>
          
          <DownArrowPrompt onClick={() => scrollToSection("visuals1")} />
        </section>

        {/* VISUALS SECTION */}
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
              Statistical Research Visualizations
            </h2>
            <p className="text-xs text-gray-600 max-w-2xl mx-auto mt-1">
              Interactive data visualizations from the Harvard Business School startup performance study
            </p>
          </motion.div>
          
          <div className="max-w-5xl mx-auto w-full flex flex-col">
            <div className="grid grid-cols-2 gap-4 mb-4 flex-grow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <motion.div 
                  className="bg-white rounded-lg shadow-md p-3 overflow-hidden h-full flex flex-col"
                  whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  transition={{ duration: 0.2 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  animate={{ opacity: 1 }}
                >
                  <h3 className="text-sm font-semibold text-gray-800 mb-1">Predictor Means Analysis</h3>
                  <p className="text-xs text-gray-600 mb-2">Statistical comparison across valuation categories</p>
                  
                  <div className="relative overflow-hidden bg-gradient-to-r from-red-50 to-white p-2 rounded-md mb-2 flex-grow">
                    <div className="absolute top-0 right-0 bg-red-700 text-white text-xs px-1.5 py-0.5 rounded-bl-md">
                      Insights
                    </div>
                    <div className="pt-5">
                      {statisticalDatasets.predictorMeans.insights.map((insight, idx) => (
                        <div key={idx} className="flex items-center mb-1 text-xs">
                          <div className={`w-2 h-2 rounded-full mr-1 ${insight.significant ? 'bg-red-600' : 'bg-gray-400'}`}></div>
                          <div className="flex-1">
                            <span className="font-medium">{insight.label}:</span> {insight.value}
                            {insight.significant && (
                              <span className="text-red-600 ml-1 text-xs">p={insight.pValue}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => openDataModal(statisticalDatasets.predictorMeans)}
                    className="w-full mt-auto py-1.5 px-3 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition-colors flex items-center justify-center text-xs"
                  >
                    <FaSearch className="mr-1 text-xs" /> View Data
                  </button>
                </motion.div>

                <motion.div
                  className="bg-white rounded-lg shadow-md p-3 overflow-hidden h-full flex flex-col"
                  whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  transition={{ duration: 0.2 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  animate={{ opacity: 1 }}
                >
                  <h3 className="text-sm font-semibold text-gray-800 mb-1">Regression Analysis</h3>
                  <p className="text-xs text-gray-600 mb-2">Statistical significance of key predictors</p>
                  
                  <div className="relative overflow-hidden bg-gradient-to-r from-red-50 to-white p-2 rounded-md mb-2 flex-grow">
                    <div className="absolute top-0 right-0 bg-red-700 text-white text-xs px-1.5 py-0.5 rounded-bl-md">
                      Insights
                    </div>
                    <div className="pt-5">
                      {statisticalDatasets.regressionAnalysis.insights.map((insight, idx) => (
                        <div key={idx} className="flex items-center mb-1 text-xs">
                          <div className={`w-2 h-2 rounded-full mr-1 ${insight.significant ? 'bg-red-600' : 'bg-gray-400'}`}></div>
                          <div className="flex-1">
                            <span className="font-medium">{insight.label}:</span> {insight.value}
                            {insight.significant && (
                              <span className="text-red-600 ml-1 text-xs">p={insight.pValue}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => openDataModal(statisticalDatasets.regressionAnalysis)}
                    className="w-full mt-auto py-1.5 px-3 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition-colors flex items-center justify-center text-xs"
                  >
                    <FaSearch className="mr-1 text-xs" /> View Data
                  </button>
                </motion.div>
                
                            <motion.div
                  className="bg-white rounded-lg shadow-md p-3 overflow-hidden h-full flex flex-col"
                  whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  transition={{ duration: 0.2 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  animate={{ opacity: 1 }}
                >
                  <h3 className="text-sm font-semibold text-gray-800 mb-1">Model Comparison</h3>
                  <p className="text-xs text-gray-600 mb-2">Comparing predictive power of models</p>
                  
                  <div className="relative overflow-hidden bg-gradient-to-r from-red-50 to-white p-2 rounded-md mb-2 flex-grow">
                    <div className="absolute top-0 right-0 bg-red-700 text-white text-xs px-1.5 py-0.5 rounded-bl-md">
                      Insights
                              </div>
                    <div className="pt-5">
                      {statisticalDatasets.modelComparison.insights.map((insight, idx) => (
                        <div key={idx} className="flex items-center mb-1 text-xs">
                          <div className={`w-2 h-2 rounded-full mr-1 ${insight.significant ? 'bg-red-600' : 'bg-gray-400'}`}></div>
                          <div className="flex-1">
                            <span className="font-medium">{insight.label}:</span> {insight.value}
                            {insight.significant && (
                              <span className="text-red-600 ml-1 text-xs">p={insight.pValue}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={() => openDataModal(statisticalDatasets.modelComparison)}
                    className="w-full mt-auto py-1.5 px-3 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition-colors flex items-center justify-center text-xs"
                  >
                    <FaSearch className="mr-1 text-xs" /> View Data
                  </button>
                </motion.div>
                
                <motion.div 
                  className="bg-white rounded-lg shadow-md p-3 overflow-hidden h-full flex flex-col"
                  whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  transition={{ duration: 0.2 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  animate={{ opacity: 1 }}
                >
                  <h3 className="text-sm font-semibold text-gray-800 mb-1">Opportunity vs Execution</h3>
                  <p className="text-xs text-gray-600 mb-2">Impact of opportunity vs execution quality</p>
                  
                  <div className="relative overflow-hidden bg-gradient-to-r from-red-50 to-white p-2 rounded-md mb-2 flex-grow">
                    <div className="absolute top-0 right-0 bg-red-700 text-white text-xs px-1.5 py-0.5 rounded-bl-md">
                      Insights
                    </div>
                    <div className="pt-5">
                      {statisticalDatasets.opportunityVsExecution.insights.map((insight, idx) => (
                        <div key={idx} className="flex items-center mb-1 text-xs">
                          <div className={`w-2 h-2 rounded-full mr-1 ${insight.significant ? 'bg-red-600' : 'bg-gray-400'}`}></div>
                          <div className="flex-1">
                            <span className="font-medium">{insight.label}:</span> {insight.value}
                            {insight.significant && (
                              <span className="text-red-600 ml-1 text-xs">p={insight.pValue}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => openDataModal(statisticalDatasets.opportunityVsExecution)}
                    className="w-full mt-auto py-1.5 px-3 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition-colors flex items-center justify-center text-xs"
                  >
                    <FaSearch className="mr-1 text-xs" /> View Data
                  </button>
                </motion.div>
              </div>
              
              <motion.div
                className="bg-white rounded-lg shadow-md p-4 overflow-hidden flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h3 className="text-base font-semibold mb-2 text-gray-800">Key Statistical Findings</h3>
                <p className="text-xs text-gray-600 mb-3">
                  Our analysis of 200+ startups revealed these critical factors that significantly impact 
                  success (p&lt;0.05):
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 text-red-600 mt-0.5">
                      <FaCheckCircle className="h-3 w-3" />
                      </div>
                    <div className="ml-2">
                      <p className="text-xs text-gray-700">
                        <span className="font-medium">Path to Profits Confidence</span> 
                        (p=0.002) was the strongest predictor of success
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 text-red-600 mt-0.5">
                      <FaCheckCircle className="h-3 w-3" />
                    </div>
                    <div className="ml-2">
                      <p className="text-xs text-gray-700">
                        <span className="font-medium">Too Few Pivots</span> 
                        (p=0.005) significantly reduced valuation outcomes
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 text-red-600 mt-0.5">
                      <FaCheckCircle className="h-3 w-3" />
                    </div>
                    <div className="ml-2">
                      <p className="text-xs text-gray-700">
                        <span className="font-medium">Capital Raised vs Goal</span> 
                        (p=0.004) strongly correlated with success
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 text-red-600 mt-0.5">
                      <FaCheckCircle className="h-3 w-3" />
                    </div>
                    <div className="ml-2">
                      <p className="text-xs text-gray-700">
                        <span className="font-medium">CEO Risk Aversion</span> 
                        (p=0.035) was the only personality trait with significance
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-3 mt-4">
                  <div>
                    <h4 className="text-xs font-semibold mb-1">Most Significant Findings:</h4>
                    <div className="bg-gray-50 rounded-md p-2">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span>Path to Profits</span>
                          <div className="flex items-center">
                            <div className="w-24 h-2 bg-gray-200 rounded-full mr-1">
                              <div className="h-full bg-red-600 rounded-full" style={{ width: '98%' }}></div>
                            </div>
                            <span className="text-xs text-red-700">p=0.002</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs">
                          <span>Too Few Pivots</span>
                          <div className="flex items-center">
                            <div className="w-24 h-2 bg-gray-200 rounded-full mr-1">
                              <div className="h-full bg-red-600 rounded-full" style={{ width: '95%' }}></div>
                            </div>
                            <span className="text-xs text-red-700">p=0.005</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs">
                          <span>Capital Raised</span>
                          <div className="flex items-center">
                            <div className="w-24 h-2 bg-gray-200 rounded-full mr-1">
                              <div className="h-full bg-red-600 rounded-full" style={{ width: '96%' }}></div>
                            </div>
                            <span className="text-xs text-red-700">p=0.004</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs">
                          <span>Late-Stage Rivals</span>
                          <div className="flex items-center">
                            <div className="w-24 h-2 bg-gray-200 rounded-full mr-1">
                              <div className="h-full bg-red-600 rounded-full" style={{ width: '93%' }}></div>
                            </div>
                            <span className="text-xs text-red-700">p=0.007</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-auto">
                    <div className="flex items-center justify-center space-x-2 pt-4">
                      <motion.button
                        onClick={() => scrollToSection('overview')}
                        className="inline-flex items-center text-xs px-3 py-1.5 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition-colors"
                        whileHover={{ y: -2 }}
                      >
                        <FaChevronDown className="transform rotate-180 mr-1" />
                        <span>Return to Top</span>
                      </motion.button>
                    </div>
                  </div>
                  </div>
                </motion.div>
              </div>
          </div>
          
          {/* Modal for detailed data view */}
          <AnimatePresence>
            {dataModalOpen && currentDataSet && (
              <StatisticalDataModal
                isOpen={dataModalOpen}
                onClose={closeDataModal}
                title={currentDataSet.title}
                data={currentDataSet}
              />
            )}
          </AnimatePresence>
            </section>

        {/* Harvard Research Info Section (Contact/Thank You equivalent) */}
        <section
          ref={sectionRefs.research_info}
          id="research_info"
          className="xl:snap-start flex flex-col justify-center items-center pt-16 pb-24 px-4 md:py-10 md:px-4 xl:py-6 xl:px-8 bg-gray-50"
        >
          <div className="w-full xl:max-w-3xl mx-auto text-center">
            <motion.h2
              className="text-2xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Harvard Business School Startup Performance Research
            </motion.h2>
            
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Harvard Business School Working Paper Series</h3>
              <p className="text-gray-700 mb-3">Paper 21-057: "Determinants of Early-Stage Startup Performance"</p>
              <p className="text-gray-600 text-sm mb-4">This study explores determinants of new venture performance by surveying CEOs of 470 early-stage startups.</p>
              <Link href="https://www.hbs.edu/faculty/Pages/item.aspx?num=59163" target="_blank" rel="noopener noreferrer">
                <span className="text-red-700 hover:text-red-900 font-medium flex items-center justify-center">
                  <span>View on HBS Website</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                </span>
              </Link>
            </motion.div>
            
            <motion.div 
              className="mb-5 cursor-pointer inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => window.location.href = 'mailto:milt.stefanidis@gmail.com'}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-12 w-12 mx-auto text-red-700 hover:text-red-800 transition-colors"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </motion.div>
            
            <motion.div
              className="flex justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <button 
                onClick={() => scrollToSection('overview')} 
                className="inline-flex items-center px-5 py-3 bg-red-700 text-white rounded-md hover:bg-red-800 transition-colors"
              >
                Return to Top
              </button>
              
              <Link href="/" className="inline-flex items-center px-5 py-3 bg-red-700 text-white rounded-md hover:bg-red-800 transition-colors">
                Return to Portfolio
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Table Modal */}
        <TableModal 
          isOpen={modalOpen} 
          onClose={closeTableModal} 
          title={modalData?.title} 
          data={modalData?.data} 
          fullTable={modalData?.fullTableData} 
        />
      </main>
    </div>
  );
}
