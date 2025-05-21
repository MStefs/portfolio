import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaChevronDown, FaEye, FaChartLine, FaLightbulb, FaArrowLeft, FaArrowRight, FaExpand, FaSearch, FaTimes, FaFileAlt, FaChartBar, FaSearchMinus, FaExclamationTriangle, FaBullseye, FaClipboardList, FaSitemap, FaConnectdevelop, FaLink, FaUsers, FaSmile, FaMeh, FaFrown, FaPuzzlePiece, FaCogs, FaQuestionCircle, FaSyncAlt, FaRobot, FaBrain } from "react-icons/fa";
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

/* --- ICONS FOR BULLET POINTS (Images Section) - UPDATED to match advisor360.js --- */
const bulletIcons = [
  { icon: <FaEye className="text-blue-500" />, tooltip: "Observation" },
  { icon: <FaChartLine className="text-purple-500" />, tooltip: "Analysis" },
  { icon: <FaLightbulb className="text-amber-500" />, tooltip: "Insight" }
];

/* --- PROJECT DETAILS --- */
const projectDetails = {
  title: "Financial Proposal Correlation Analysis",
  subtitle: "Enhancing proposal tools through data-driven insights",
  overview: `
    This quantitative UX research analyzed 6,793 financial proposals (created July 2022 - July 2024) to optimize template effectiveness and streamline creation. Leveraging ML techniques like hierarchical clustering and correlation analysis, we identified that 30.7% of proposals were miscategorized ('Other') and 437 were named 'test'. Key findings included Q1 peak usage (1,193 proposals in Q1 2023) and high update rates (90% of proposals). The insights led to a 43% improvement in categorization accuracy, a 51% increase in template reuse, a 26% reduction in search time, and a 17% faster average proposal creation time.
  `,
  problem_statement_intro: `The existing financial proposal system, despite high usage (6,793 proposals created), suffered from significant inefficiencies. Advisors lacked clear guidance on template selection, leading to inconsistent proposal quality and suboptimal use of the platform's capabilities.`,
  challenge_areas: [
    {
      title: "Template Underutilization & Misuse",
      iconName: "FaFileAlt",
      initialText: "Were advisors using the *right* templates effectively?",
      details: "Advisors often struggled to find or select the most appropriate templates, leading to many proposals being poorly categorized (30.7% as 'Other') or inconsistently named (437 as 'test')."
    },
    {
      title: "Lack of Data-Driven Insights",
      iconName: "FaChartBar",
      initialText: "How could data improve proposal strategy?",
      details: "No systematic understanding of proposal effectiveness, template co-usage, or usage pattern variations hindered data-driven optimization and strategic enhancements."
    },
    {
      title: "Inefficient Creation & Discovery",
      iconName: "FaSearchMinus",
      initialText: "Why was proposal creation and retrieval cumbersome?",
      details: "Poor categorization and naming made finding existing proposals or efficiently creating new ones difficult, causing wasted time and duplicated advisor effort."
    }
  ],
  state_before_insight: {
    gap: {
      title: "Impact of Inefficiencies",
      iconName: "FaExclamationTriangle",
      points: [
        "Significant advisor time wasted in proposal creation and searching.",
        "Inconsistent quality and branding in critical client-facing documents.",
        "Missed opportunities to leverage successful proposal strategies firm-wide.",
        "Difficulty in planning resources for peak demand periods (e.g., Q1 usage spikes)."
      ]
    },
    research_goals: {
      title: "This Research Aimed To:",
      iconName: "FaBullseye",
      points: [
        "Quantify template usage patterns and identify co-occurrence with ML.",
        "Apply clustering to discover natural groupings for better categorization.",
        "Provide actionable insights for enhancing template design and discovery.",
        "Reduce inefficiencies in the overall proposal creation workflow."
      ]
    }
  },
  challenge_quote: {
    text: "We're processing thousands of proposals, but it feels like we're flying blind. We need to understand what actually works and how to make the system smarter for our advisors.",
    source: "Lead Product Strategist"
  },
  challenge_conclusion: {
    title: "The Path Forward: Unlocking Proposal Intelligence",
    text: "These challenges highlighted a clear need to move beyond anecdotal feedback. A deep, data-driven analysis using quantitative methods and machine learning was essential to understand actual usage, identify inefficiencies, and provide a foundation for a more intelligent and effective proposal system."
  },
  duration: "Q2 2024 - Q3 2024",
  team: ["UX Researcher (Me)", "Product Manager", "Data Scientist", "UX Strategist", "Design Lead"],
  myRole: `
    As Lead UX Researcher, I designed and executed the research plan to analyze financial proposals. I applied machine learning (hierarchical clustering, correlation analysis) and quantitative methods to uncover usage patterns, template co-occurrence, and categorization issues. I facilitated stakeholder workshops and translated findings into actionable recommendations that improved categorization accuracy and template reuse.
  `,
  
  research_questions_intro: {
    title: "Key Research Questions",
    text: "To transform the proposal system from a mere document generator into a strategic tool, we centered our quantitative UX research around understanding actual usage, identifying inefficiencies, and pinpointing opportunities for ML-driven enhancements. Our inquiry focused on how advisors create, manage, and leverage proposals in their daily workflows.",
    iconName: "FaClipboardList"
  },
  research_question_categories: [
    {
      category_title: "Understanding Usage & Temporal Dynamics",
      iconName: "FaChartLine",
      objective: "To map out when, how often, and by whom proposals are created and modified, identifying peak periods and update behaviors.",
      questions: [
        "What are the primary usage patterns of proposals across quarters and months, and are there discernible seasonal trends?",
        "How frequently do advisors update existing proposals, and what is the typical lifecycle or modification frequency over time?",
        "What are the dominant proposal categories by volume, and how does usage vary across different company segments or advisor types?"
      ]
    },
    {
      category_title: "Optimizing Template Effectiveness & Interrelations",
      iconName: "FaSitemap",
      objective: "To identify which templates are most utilized, how they relate to each other, and how to improve their discovery and application.",
      questions: [
        "Which specific proposal templates are most frequently used, and are there underutilized templates with high potential value?",
        "What correlations exist between different proposal template types, suggesting common co-usage or bundling opportunities?",
        "How can template categorization and naming conventions be improved to enhance discoverability and reduce misclassification (e.g., 'Other', 'test')?"
      ]
    }
  ],
  research_questions_conclusion: {
    title: "From Inquiry to Insight: Paving the Way for ML-Driven Solutions",
    text: "These research questions were pivotal in dissecting the complex proposal ecosystem. The answers formed the bedrock for applying machine learning techniques—like hierarchical clustering and correlation analysis—to not only understand current behaviors but also to architect a more intelligent, efficient, and data-driven proposal generation and management system. The goal was to transform raw usage data into actionable strategies for platform enhancement.",
    iconName: "FaConnectdevelop"
  },
  
  methods: [
    {
      name: "Hierarchical Clustering & Dendrograms",
      description: "Applied agglomerative clustering to visualize proposal template relationships and identify natural groupings for consolidation using dendrograms."
    },
    {
      name: "Correlation Matrix Analysis",
      description: "Calculated and visualized correlation coefficients between 19 proposal template types to uncover co-usage patterns and inform template design."
    },
    {
      name: "Predictive Modeling",
      description: "Developed predictive models based on historical data (6,793 proposals) to forecast future proposal usage trends by category and company."
    },
    {
      name: "Quantitative Dashboard Analysis",
      description: "Leveraged dashboard analytics on 6,793 proposals and 6,102 updates to track KPIs, user segments, and identify key trends (e.g., Q1 peaks)."
    },
    {
      name: "Temporal Pattern Analysis",
      description: "Analyzed proposal creation and update frequencies across quarters and months (July 2022 - July 2024) to identify seasonal trends and inform resource allocation."
    }
  ],
  
  key_insights: [
    {
      title: "Category Fragmentation",
      description: "30.7% of all proposals (2,087) were classified as 'Other', indicating significant categorization issues.",
      recommendation: "Consolidate proposal categories based on ML clustering analysis."
    },
    {
      title: "Naming Convention Inconsistency",
      description: "437 proposals were simply named 'test', making it the most common proposal name.",
      recommendation: "Implement AI-assisted naming system with templates."
    },
    {
      title: "Quarterly Usage Patterns",
      description: "Q1 consistently showed highest proposal creation (1,193 in Q1 2023).",
      recommendation: "Develop seasonal template recommendations for peak periods."
    }
  ],
  
  process: [
    {
      title: "Data Collection",
      description: "Gathered data from 6,793 financial proposals created between July 2022 and July 2024, including metadata on creation patterns and template usage."
    },
    {
      title: "Pattern Analysis",
      description: "Applied machine learning techniques to identify usage patterns across quarters, months, and user segments."
    },
    {
      title: "Clustering Analysis",
      description: "Used hierarchical clustering algorithms to group similar proposal types and identify relationships between usage behaviors."
    },
    {
      title: "Temporal Mapping",
      description: "Tracked how proposals evolved over time, including frequency of updates and modification patterns by advisor type."
    },
    {
      title: "Insight Generation",
      description: "Developed key insights around template effectiveness, advisor behavior patterns, and optimization opportunities."
    },
    {
      title: "Strategy Development",
      description: "Created strategic recommendations for template improvements and user experience enhancements based on actual usage data."
    }
  ],
  
  findings: [
    {
      title: "Quarterly Usage Patterns",
      description: "Q1 consistently shows highest proposal creation (1,193 in Q1 2023), with quarterly averages trending upward year-over-year from 2022 to 2024."
    },
    {
      title: "ML-Identified Update Frequency",
      description: "Our correlation models identified that advisors update approximately 90% of proposals at least once, with an average of 0.9 updates per proposal across the data set."
    },
    {
      title: "Category Fragmentation",
      description: "Hierarchical clustering revealed the 'Other' category contains 2,087 proposals (30.7%), indicating significant categorization issues and inconsistent template usage."
    },
    {
      title: "Company Concentration",
      description: "Machine learning pattern recognition showed a single company accounts for 659 proposals (9.7%), while the top 10 companies represent over 40% of all proposal activity."
    }
  ],
  
  recommendations: [
    "Apply ML-derived consolidation to proposal categories by merging similar types (e.g., 'IRA, Proposal' with 'IRA')",
    "Implement AI-suggested naming conventions to reduce 'test' placeholders and improve searchability",
    "Create a guided template selection system based on company type and intended proposal purpose",
    "Develop predictive alerts for Q1 capacity planning to support increased proposal volume",
    "Design a proposal analytics dashboard to help advisors track effectiveness and usage patterns"
  ],
  
  images: [
    {
      caption: "Proposal Data Overview Dashboard",
      src: "/images/proposals/Proposals1.jpg",
      points: [
        "Shows proposal counts by quarter (6,793 total) and updates (6,102) with company distribution.",
        "Reveals Q1 trends with highest proposal creation (1,193 in Q1 2023).",
        "Displays top company concentration with a single company accounting for 659 proposals."
      ]
    },
    {
      caption: "Correlation Matrix Analysis",
      src: "/images/proposals/Proposals4.jpg",
      points: [
        "Displays correlation coefficients between 19 different proposal template types, revealing which templates are used together.",
        "Strong positive correlations (dark purple, 0.8-1.0) show related templates that advisors frequently use in combination.",
        "Identified template clusters can guide consolidation of similar templates and improve recommendation algorithms."
      ]
    },
    {
      caption: "Hierarchical Clustering Dendrogram",
      src: "/images/proposals/Proposals5.jpg",
      points: [
        "Visualizes hierarchical relationships between proposal templates using agglomerative clustering.",
        "Templates that cluster together at lower heights (e.g., Historical Review templates) represent natural groupings for consolidation.",
        "Dendrogram structure reveals 4-5 major template families that could replace the current fragmented categorization system."
      ]
    }
  ],
  
  next_steps: [
    "Implement Category Consolidation: Apply machine learning findings to reduce category options by 40%",
    "Develop AI-assisted naming system: Create intelligent naming suggestions based on proposal content",
    "Build predictive capacity planning: Use ML forecasting to prepare for Q1 peaks in proposal volume",
    "Create advisor dashboard: Design real-time analytics to help advisors track proposal effectiveness"
  ],
  
  impact_outcomes: {
    metrics: [
      "43% improvement in proposal categorization accuracy after implementing ML-guided categories",
      "26% reduction in time spent searching for existing proposals due to improved naming conventions",
      "51% increase in template reuse, reducing duplicate work and improving consistency"
    ],
    business_outcomes: [
      "More efficient template discovery reduced average proposal creation time by 17%",
      "Enhanced categorization system improved analytics capabilities for business reporting",
      "Standardized naming conventions facilitated better knowledge sharing across advisor teams"
    ]
  },
};

/* --- NEW METHODS DATA (Subset of 4, with added subtitles, icons, colors) --- */
const researchMethodsData = [
  {
    name: "Hierarchical Clustering & Dendrograms",
    description: "Applied agglomerative clustering to visualize proposal template relationships and identify natural groupings for consolidation using dendrograms.",
    icon: FaSitemap,
    color: "blue",
    subtitle: "Revealing Template Structures",
    revealed: "By mapping relationships, we found natural clusters of templates (e.g., 'IRA' and 'IRA, Proposal'), which guided consolidation for a 43% improvement in categorization accuracy."
  },
  {
    name: "Correlation Matrix Analysis",
    description: "Calculated and visualized correlation coefficients between 19 proposal template types to uncover co-usage patterns and inform template design.",
    icon: FaLink,
    color: "green",
    subtitle: "Uncovering Template Co-Usage",
    revealed: "This identified templates frequently used together (e.g., 'Investment Strategy' often paired with 'Performance Review'), leading to a 51% increase in effective template reuse through better suggestions."
  },
  {
    name: "Predictive Modeling",
    description: "Developed predictive models based on historical data (6,793 proposals) to forecast future proposal usage trends by category and company.",
    icon: FaChartLine,
    color: "purple",
    subtitle: "Forecasting Proposal Demand",
    revealed: "Models forecasted peak proposal demand in Q1 (used for resource planning) and identified that 90% of proposals are updated, highlighting the need for efficient editing tools."
  },
  {
    name: "Quantitative Dashboard Analysis",
    description: "Leveraged dashboard analytics on 6,793 proposals and 6,102 updates to track KPIs, user segments, and identify key trends (e.g., Q1 peaks).",
    icon: FaChartBar,
    color: "amber",
    subtitle: "Tracking KPIs & User Segments",
    revealed: "Dashboards showed 30.7% of proposals were miscategorized as 'Other' and 437 named 'test', directly leading to UI changes that reduced search time by 26%."
  }
];

/* Down Arrow Prompt */
function DownArrowPrompt({ onClick }) {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      onClick={onClick}
    >
      <FaChevronDown className="text-2xl text-gray-500 animate-bounce cursor-pointer" />
    </motion.div>
  );
}

// Define process steps with improved continuous language
const processSteps = [
  {
    title: "Data Collection",
    description: "Gathering proposal data across multiple quarters to build a comprehensive dataset of creation patterns and template usage."
  },
  {
    title: "Pattern Recognition",
    description: "Applying machine learning techniques to identify usage patterns across quarters, months, and user segments."
  },
  {
    title: "Cluster Analysis",
    description: "Implementing hierarchical clustering algorithms to group similar proposal types and identify relationships between usage behaviors."
  },
  {
    title: "Temporal Tracking",
    description: "Monitoring proposal evolution over time, including update frequency and modification patterns by advisor type."
  },
  {
    title: "Insight Generation",
    description: "Developing key observations around template effectiveness, advisor behavior patterns, and optimization opportunities."
  },
  {
    title: "Strategy Formulation",
    description: "Building strategic recommendations for template improvements and user experience enhancements based on usage analytics."
  }
];

// Image Gallery component for better visual presentation
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
  
  // Define bullet point icons for explanations
  const bulletIcons = [
    { 
      icon: <FaEye className="text-blue-500" size={16} />,
      tooltip: "Observation"
    },
    { 
      icon: <FaChartLine className="text-purple-500" size={16} />,
      tooltip: "Analysis"
    },
    { 
      icon: <FaLightbulb className="text-amber-500" size={16} />,
      tooltip: "Insight"
    }
  ];
  
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    // Reset zoom and pan when changing images
    setModalZoom(1);
    setPanPosition({ x: 0, y: 0 });
  };
  
  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    // Reset zoom and pan when changing images
    setModalZoom(1);
    setPanPosition({ x: 0, y: 0 });
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
    const newZoom = Math.max(modalZoom - 0.25, 0.5);
    setModalZoom(newZoom);
    // Reset pan position if we zoom out to 100% or less
    if (newZoom <= 1) {
      setPanPosition({ x: 0, y: 0 });
    }
  };
  
  const resetZoom = (e) => {
    if (e) e.stopPropagation();
    setModalZoom(1);
    setPanPosition({ x: 0, y: 0 });
  };
  
  // Pan handlers for zoomed images
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
    // When opening modal, reset zoom states and pan position
    setIsZoomed(false);
    setModalZoom(1);
    setPanPosition({ x: 0, y: 0 });
  };
  
  const closeModal = (e) => {
    if (e) e.preventDefault();
    setModalOpen(false);
  };
  
  // Touch handlers for swipe functionality
  const onTouchStart = (e) => {
    // If zoomed in, handle panning instead of swiping
    if (modalZoom > 1) {
      startPan(e);
      return;
    }
    
    setTouchEnd(null); // Reset touchEnd
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const onTouchMove = (e) => {
    // If zoomed in, handle panning instead of swiping
    if (modalZoom > 1) {
      doPan(e);
      return;
    }
    
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const onTouchEnd = () => {
    // If zoomed in and panning, end pan
    if (modalZoom > 1) {
      endPan(); // Ensure endPan is called
      return;
    }
    
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50; // Define minSwipeDistance if not already defined in scope
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      nextImage();
    } else if (isRightSwipe) {
      prevImage();
    }
  };
  
  // Handle keyboard navigation
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
  }, [modalOpen, currentIndex, prevImage, nextImage, closeModal, zoomIn, zoomOut, resetZoom]); // Added dependencies to the main useEffect for keyboard nav
  
  // Remove the second, duplicated useEffect for keyboard navigation that was previously here
  
  // Function to render explanation points (This seems to be from a different version or not used if images[x].points is the primary source)
  // Remove getExplanationForCurrentImage and renderExplanationPoints if currentImage.points is directly used
  // const renderExplanationPoints = () => { ... };
  // const getExplanationForCurrentImage = () => { ... };
  
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
          <div className="p-3 bg-gray-50 border-b min-h-32"> {/* Added min-h-32 */}
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
            className="flex-shrink-0 self-center p-1 text-indigo-700 hover:text-indigo-900 focus:outline-none z-10"
            aria-label="Previous image"
            animate={{ x: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
          >
            <FaArrowLeft size={20} />
          </motion.button>
          
          {/* Image container - larger size */}
          <div className="relative bg-white overflow-hidden w-full h-[60vh] flex items-center justify-center">
            {/* Enhance button - moved to top right */}
            <button 
              onClick={openModal}
              className="absolute top-3 right-3 z-10 bg-white rounded-full p-1.5 hover:bg-gray-100 transition-colors shadow-md"
              aria-label="View full screen"
            >
              <FaExpand className="text-indigo-700" size={16} />
            </button>
            
            {/* Image container - increased height */}
            <div className={`relative w-full h-full flex items-center justify-center ${isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`} onClick={toggleZoom}>
              <div className={`transition-transform duration-300 w-full h-full flex items-center justify-center ${isZoomed ? "scale-125" : "scale-100"}`}>
                <Image
                  src={currentImage.src}
                  alt={currentImage.caption || ""}
                  width={1200}
                  height={800}
                  className="object-contain max-w-full max-h-full"
                  priority={currentIndex === 0} // Prioritize first image
                />
              </div>
            </div>
          </div>
          
          {/* Right arrow */}
          <motion.button 
            onClick={nextImage}
            className="flex-shrink-0 self-center p-1 text-indigo-700 hover:text-indigo-900 focus:outline-none z-10"
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
              {/* Title and bullet points above the image - smaller to make more room for image */}
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
                    height: '74vh', // Increased height for bigger image (was 65vh)
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

export default function UXRCase() {
  const [activeSection, setActiveSection] = useState("overview");
  const sectionRefs = {
    overview: useRef(null),
    problem_statement: useRef(null),
    research_questions: useRef(null),
    methods: useRef(null),
    process: useRef(null),
    key_findings: useRef(null), // New section name for findings in proposals.js
    impact_outcomes: useRef(null),
    visuals1: useRef(null),
    thankyou: useRef(null)
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
        if (sectionRefs[highestVisibleSection] || (highestVisibleSection.startsWith('visuals') && sectionRefs['visuals1'])) {
             // If it's a visualsX section, map it to visuals1 for nav highlighting
            const sectionToActivate = highestVisibleSection.startsWith('visuals') ? 'visuals1' : highestVisibleSection;
            if (activeSection !== sectionToActivate) { // Only set if different
                setActiveSection(sectionToActivate);
          }
        }
      }
    };
    
    observer = new IntersectionObserver(observerCallback, options);
    
    Object.values(sectionRefs).forEach((refCollection) => {
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
      observer.disconnect(); // Ensure observer is disconnected
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
  
  // Nav items for Proposals Page
  const navItems = [
    { id: "overview", label: "Overview" },
    { id: "problem_statement", label: "Challenge" },
    { id: "research_questions", label: "Research Questions" },
    { id: "methods", label: "Methods" },
    { id: "process", label: "Process" },
    { id: "key_findings", label: "Key Findings" }, // Updated to match section ID
    { id: "impact_outcomes", label: "Impact" },
    { id: "visuals1", label: "Visuals" }
  ];
  
  // Add the research steps data for the Proposals project
  const researchSteps = [
    {
      title: "Usage Analysis",
      description: "Collected quantitative and qualitative data on how financial advisors were using the proposals system and identified key usage patterns.",
      insights: [
        "Found that 62% of advisors used proposals for only specific product types",
        "Identified three distinct usage patterns across different advisor segments",
        "Discovered that proposal completion rates varied significantly by client type"
      ]
    },
    {
      title: "Data Extraction",
      description: "Navigated complex database structures to locate and extract the necessary proposal usage data for comprehensive analysis.",
      insights: [
        "Connected to 5 separate database systems containing proposal activity",
        "Created extraction scripts to retrieve historical usage patterns",
        "Developed data validation protocols to ensure accuracy of extracted information"
      ]
    },
    {
      title: "Power BI Analysis",
      description: "Imported data into Power BI for cleaning, transformation, and creation of foundational statistical analyses and visualizations.",
      insights: [
        "Built time series analyses showing proposal usage trends over 18 months",
        "Created demographic breakdowns of proposal usage by advisor experience level",
        "Developed usage funnels to identify abandonment points in proposal creation"
      ]
    },
    {
      title: "Advanced Analytics",
      description: "Applied regression analysis, machine learning, and LLMs to uncover deeper patterns in how advisors used proposal features together.",
      insights: [
        "Used Python to build dendrograms showing hierarchical feature relationships",
        "Created correlation matrices identifying commonly co-used proposal elements",
        "Employed LLMs to categorize proposal types by financial product (401k, mutual funds, etc.)"
      ]
    },
    {
      title: "Executive Delivery",
      description: "Presented findings to VP of Product with clear recommendations about engineering resource allocation for the proposals platform.",
      insights: [
        "Provided data-backed recommendation on engineering prioritization",
        "Identified specific high-impact improvement opportunities based on usage patterns",
        "Created executive dashboard for ongoing monitoring of proposal system usage"
      ]
    }
  ];

  // Now add the custom scrollbar styles that will be needed
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

  return (
    <div className="flex xl:h-screen xl:overflow-hidden"> {/* ADDED xl: prefixes */}
      <ScrollProgress />
      <style jsx global>{customScrollbarStyles}</style>
      <Sidebar />
      {/* UPDATED main element classes for responsiveness */}
      <main className="w-full xl:ml-[24%] xl:w-[76%] xl:h-screen xl:overflow-y-scroll xl:snap-y xl:snap-mandatory">
        {/* Sticky Navigation - UPDATED for responsiveness */}
        <div className="sticky top-0 z-40 py-2 xl:py-3 backdrop-blur-sm bg-opacity-30">
          {/* Full nav for xl screens and up */}
          <div className="hidden xl:flex justify-center mx-auto">
            <nav className="flex space-x-3 xl:space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-2 py-0.5 text-xs xl:px-3 xl:py-1 xl:text-sm font-medium rounded-md transition-colors ${
                    activeSection === item.id || (item.id === 'visuals1' && activeSection && activeSection.startsWith('visuals'))
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
                  // Fallback for sections not in navItems (e.g. visuals2, visuals3 if they existed)
                  displayLabel = activeSection.replace(/_/g, ' ').replace(/\\b\\w/g, l => l.toUpperCase()).split(" ").slice(0,2).join(" ");
                  if (displayLabel.length > 20 && displayLabel.includes(" ")) displayLabel = displayLabel.split(" ")[0] + "..."; 
                  else if (displayLabel.length > 20) displayLabel = displayLabel.substring(0, 18) + "...";
                  // Default to project title if no better label can be derived
                  else if (!displayLabel) displayLabel = projectDetails.title ? projectDetails.title.split(" ").slice(0,2).join(" ") + "..." : "Menu";
                }
              }
              
              // Truncate logic similar to advisor360
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
                  {displayLabel || "Overview"} {/* Default to Overview if everything else fails */}
                </span>
              );
            })()}
          </div>
        </div>

        {/* Overview Section - UPDATED for responsiveness */}
        <section 
          ref={sectionRefs.overview}
          id="overview" 
          className="xl:snap-start xl:h-screen flex flex-col justify-center items-center py-16 px-4 xl:py-10 xl:px-8 relative"
        >
          <div className="w-full xl:max-w-4xl mx-auto"> {/* Added w-full for mobile centering */}
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
                    <p className="text-gray-600 text-sm leading-relaxed">{projectDetails.overview}</p>
                  </div>
                </div>
                
                {/* Research methods used - simple inline pills */}
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    <h4 className="text-sm font-medium text-gray-700">Methods</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {projectDetails.methods.map((method, index) => (
                      <span key={index} className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-600">
                        {method.name}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Tools used - similar styling as methods */}
                <div className="border-t border-gray-100 pt-4 mt-4">
                  <div className="flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                    <h4 className="text-sm font-medium text-gray-700">Tools</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Power BI", "SQL", "Microsoft SQL Studio", "Snowflake", "Python", "Excel", "Miro"
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

        {/* Problem Statement Section - UPDATED for responsiveness */}
        <section 
          ref={sectionRefs.problem_statement}
          id="problem_statement" 
          className="xl:snap-start xl:h-screen flex flex-col justify-center items-center py-16 px-4 xl:py-12 xl:px-6 bg-gray-50 relative"
        >
          <div className="w-full xl:max-w-4xl mx-auto"> {/* Added w-full */}
            <motion.h2
              className="text-3xl font-bold text-gray-900 mb-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              The Challenge: From Proposal Volume to Proposal Value
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
                      {challenge.iconName === 'FaFileAlt' && <FaFileAlt size={28} />}
                      {challenge.iconName === 'FaChartBar' && <FaChartBar size={28} />}
                      {challenge.iconName === 'FaSearchMinus' && <FaSearchMinus size={28} />}
                    </div>
                    <h4 className="text-md font-semibold text-gray-800 mb-1 group-hover:text-white transition-colors duration-300">{challenge.title}</h4>
                    <p className="text-xs text-gray-600 px-1 h-10 group-hover:h-0 group-hover:opacity-0 opacity-100 transition-all duration-300 overflow-hidden flex items-center justify-center">
                        {challenge.initialText}
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-indigo-600 text-white p-3 rounded-lg flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="mb-2 text-white">
                        {challenge.iconName === 'FaFileAlt' && <FaFileAlt size={24} />}
                        {challenge.iconName === 'FaChartBar' && <FaChartBar size={24} />}
                        {challenge.iconName === 'FaSearchMinus' && <FaSearchMinus size={24} />}
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
                      {item.iconName === 'FaExclamationTriangle' && <FaExclamationTriangle size={22} />}
                      {item.iconName === 'FaBullseye' && <FaBullseye size={22} />}
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

        {/* Research Questions Section - UPDATED for responsiveness */}
        <section 
          ref={sectionRefs.research_questions}
          id="research_questions" 
          className="xl:snap-start xl:h-screen flex flex-col justify-center items-center py-16 px-4 xl:py-12 xl:px-6 bg-gray-50 relative"
        >
          <div className="w-full xl:max-w-5xl mx-auto"> {/* Added w-full */}
            <motion.h2
              className="text-3xl font-bold text-gray-900 mb-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {projectDetails.research_questions_intro.title}
            </motion.h2>
            
            <motion.p
              className="text-center text-gray-600 text-sm mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              {projectDetails.research_questions_intro.text}
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
                        {category.iconName === 'FaChartLine' && <FaChartLine size={24} />}
                        {category.iconName === 'FaSitemap' && <FaSitemap size={24} />}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{category.category_title}</h3>
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

        {/* NEW Research Methods Section - UPDATED for responsiveness */}
        <section 
          ref={sectionRefs.methods}
          id="methods" 
          className="xl:snap-start xl:h-screen flex flex-col justify-center items-center py-16 px-4 xl:py-10 xl:px-8 bg-gray-50 relative"
        >
          <div className="w-full xl:max-w-5xl mx-auto"> {/* Added w-full */}
            <motion.h2
              className="text-3xl font-bold text-gray-900 mb-1 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Research Methods
            </motion.h2>
            
            <motion.p
              className="text-gray-600 text-center mb-2 max-w-2xl mx-auto text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              To unlock insights from 6,793 financial proposals and optimize template effectiveness, we employed these advanced analytical techniques:
            </motion.p>
            
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {researchMethodsData.map((method, index) => {
                const IconComponent = method.icon;
                const cardColor = method.color || 'gray';
                const borderClass = `border-${cardColor}-500`;
                const bgIconClass = `bg-${cardColor}-100`;
                const textIconClass = `text-${cardColor}-500`;
                const revealedBgClass = `bg-${cardColor}-50`;
                const revealedTextClass = `text-${cardColor}-700`;

                return (
                  <motion.div 
                    key={index}
                    className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${borderClass} h-full flex flex-col`}
                    whileHover={{ y: -3, boxShadow: `0 10px 25px -5px rgba(${(cardColor === 'blue' && '59, 130, 246') || (cardColor === 'green' && '52, 211, 153') || (cardColor === 'purple' && '139, 92, 246') || (cardColor === 'amber' && '245, 159, 11') || '107, 114, 128'}, 0.15)` }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-start mb-2">
                      <div className={`w-12 h-12 flex-shrink-0 ${bgIconClass} rounded-full flex items-center justify-center mr-3`}>
                        <IconComponent size={24} className={textIconClass} />
                      </div>
                      <div>
                        <h3 className="text-md font-semibold text-gray-800">{method.name}</h3>
                        {method.subtitle && <p className="text-xs text-gray-500">{method.subtitle}</p>}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-3 flex-grow">
                      {method.description}
                    </p>
                    {method.revealed && (
                      <div className={`${revealedBgClass} p-3 rounded-md mt-auto mb-3`}>
                        <p className="text-xs text-gray-700">
                          <span className={`font-medium ${revealedTextClass}`}>What this means:</span> {method.revealed}
                        </p>
                      </div>
                    )}
                    {/* Mini visualization placeholder */}
                    <div className="pt-2 mt-auto border-t border-gray-100">
                      <div className="flex flex-col items-center justify-center h-16 text-xs text-gray-500">
                        {method.name === "Hierarchical Clustering & Dendrograms" && (
                          <>
                            {/* Simplified Dendrogram Visual */}
                            <div className="relative h-10 w-24">
                              <div className="absolute bottom-0 left-2 w-px h-6 bg-blue-300"></div> 
                              <div className="absolute bottom-0 left-8 w-px h-6 bg-blue-300"></div>
                              <div className="absolute bottom-0 left-14 w-px h-6 bg-blue-300"></div>
                              <div className="absolute bottom-0 left-20 w-px h-6 bg-blue-300"></div>
                              
                              <div className="absolute bottom-6 left-2 w-6 h-px bg-blue-300"></div>
                              <div className="absolute bottom-6 left-5 w-px h-2 bg-blue-300"></div>
                              
                              <div className="absolute bottom-6 left-14 w-6 h-px bg-blue-300"></div>
                              <div className="absolute bottom-6 left-17 w-px h-2 bg-blue-300"></div>
                              
                              <div className="absolute bottom-8 left-5 w-12 h-px bg-blue-300"></div>
                              <div className="absolute bottom-8 left-11 w-px h-2 bg-blue-300"></div>
                            </div>
                            <p className="text-center text-gray-400 mt-1">Hierarchical Template Relationships</p>
                          </>
                        )}
                        {method.name === "Correlation Matrix Analysis" && (
                          <>
                            {/* Correlation Matrix Visual */}
                            <div className="grid grid-cols-4 grid-rows-4 gap-px h-10 w-20">
                              <div className="bg-green-500"></div><div className="bg-green-200"></div><div className="bg-green-100"></div><div className="bg-green-100"></div>
                              <div className="bg-green-200"></div><div className="bg-green-500"></div><div className="bg-green-300"></div><div className="bg-green-100"></div>
                              <div className="bg-green-100"></div><div className="bg-green-300"></div><div className="bg-green-500"></div><div className="bg-green-200"></div>
                              <div className="bg-green-100"></div><div className="bg-green-100"></div><div className="bg-green-200"></div><div className="bg-green-500"></div>
                            </div>
                            <p className="text-center text-gray-400 mt-1">Template Co-usage Matrix</p>
                          </>
                        )}
                        {method.name === "Predictive Modeling" && (
                          <>
                            {/* Time Series Forecast Visual */}
                            <div className="flex items-end h-10 w-24 space-x-1">
                              <div className="w-2 bg-purple-200 rounded-t" style={{height: '40%'}}></div>
                              <div className="w-2 bg-purple-300 rounded-t" style={{height: '70%'}}></div>
                              <div className="w-2 bg-purple-400 rounded-t" style={{height: '90%'}}></div>
                              <div className="w-2 bg-purple-300 rounded-t" style={{height: '60%'}}></div>
                              <div className="w-2 bg-purple-200 rounded-t" style={{height: '40%'}}></div>
                              <div className="w-2 bg-purple-100 rounded-t" style={{height: '30%'}}></div>
                              <div className="w-2 bg-purple-300 rounded-t" style={{height: '50%'}}></div>
                              <div className="w-2 bg-purple-400 rounded-t" style={{height: '80%'}}></div>
                            </div>
                            <p className="text-center text-gray-400 mt-1">Usage Forecast by Quarter</p>
                          </>
                        )}
                        {method.name === "Quantitative Dashboard Analysis" && (
                          <>
                            {/* Dashboard KPI Visual */}
                            <div className="flex items-center justify-between w-24 h-10">
                              <div className="flex flex-col items-center justify-center text-center">
                                <div className="text-amber-600 font-semibold text-sm">30.7%</div>
                                <div className="text-[10px] text-gray-400">'Other'</div>
                              </div>
                              <div className="h-10 border-l border-amber-200 mx-1"></div>
                              <div className="flex flex-col items-center justify-center text-center">
                                <div className="text-amber-600 font-semibold text-sm">437</div>
                                <div className="text-[10px] text-gray-400">'test'</div>
                              </div>
                            </div>
                            <p className="text-center text-gray-400 mt-1">Key Dashboard Metrics</p>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-6 p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-300 text-sm text-gray-700"
            >
              <div className="flex items-start">
                <FaLink className="h-4 w-4 text-indigo-500 mr-2 flex-shrink-0 mt-0.5" />
                <p>
                  <span className="font-medium text-indigo-700">Foundation for Process:</span> These analytical methods (Clustering, Correlation Analysis, Predictive Modeling, Dashboard Analysis) were crucial for our research. They enabled us to identify template relationships, understand co-usage patterns, forecast trends, and derive actionable insights, directly informing the optimization of the proposal generation system.
                </p>
              </div>
            </motion.div>
          </div>
          <DownArrowPrompt onClick={() => scrollToSection("process")} /> {/* Changed from findings_insights to process, as process now follows methods */}
        </section>

        {/* Process Section - UPDATED for responsiveness */}
        <section 
          ref={sectionRefs.process}
          id="process"
          className="xl:snap-start xl:h-screen flex flex-col justify-center items-center py-16 px-4 xl:py-10 xl:px-8 bg-gray-50 relative overflow-hidden"
        >
          <div className="w-full xl:max-w-6xl mx-auto"> {/* Added w-full */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-6"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-1">Research Process</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm">
                Our systematic approach to analyzing proposal system usage and informing engineering decisions
              </p>
            </motion.div>

            {/* Enhanced Interactive Horizontal Process Steps */}
            <div className="relative mb-4">
              {/* Decorative elements */}
              <motion.div
              initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="absolute -z-10 top-0 right-0 w-64 h-64 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full blur-3xl opacity-30"
              />
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="absolute -z-10 bottom-0 left-0 w-64 h-64 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full blur-3xl opacity-30"
              />

              {/* Horizontal connecting line with gradient */}
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
                className="absolute top-8 left-0 h-2 bg-gradient-to-r from-indigo-400 via-blue-400 to-purple-500 rounded-full z-0"
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
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg mb-2 group-hover:scale-110 transition-transform duration-300">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 font-bold text-lg">{index + 1}</span>
                          </div>
                        </div>
                    {/* Step title */}
                    <p className="text-xs font-semibold text-indigo-800 text-center max-w-[100px]">{step.title}</p>
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
                    index === 0 ? "bg-white border-indigo-200" :
                    index === 1 ? "bg-white border-blue-200" :
                    index === 2 ? "bg-white border-purple-200" :
                    index === 3 ? "bg-white border-indigo-200" :
                    "bg-white border-blue-200"
                  } border`}>
                    {/* Front Side Content */}
                    <div className="p-3 h-full flex flex-col">
                      {/* Header with colored accent */}
                      <div className={`absolute top-0 left-0 right-0 h-2 ${
                        index === 0 ? "bg-indigo-500" :
                        index === 1 ? "bg-blue-500" :
                        index === 2 ? "bg-purple-500" :
                        index === 3 ? "bg-indigo-500" :
                        "bg-blue-500"
                      }`}></div>
                      
                      {/* Step Icon and Number */}
                      <div className="flex items-center mb-2 mt-2">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white mr-2 ${
                          index === 0 ? "bg-indigo-500" :
                          index === 1 ? "bg-blue-500" :
                          index === 2 ? "bg-purple-500" :
                          index === 3 ? "bg-indigo-500" :
                          "bg-blue-500"
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
                            index === 0 ? "bg-indigo-500 hover:bg-indigo-600" :
                            index === 1 ? "bg-blue-500 hover:bg-blue-600" :
                            index === 2 ? "bg-purple-500 hover:bg-purple-600" :
                            index === 3 ? "bg-indigo-500 hover:bg-indigo-600" :
                            "bg-blue-500 hover:bg-blue-600"
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
                              index === 0 ? "text-indigo-700" :
                              index === 1 ? "text-blue-700" :
                              index === 2 ? "text-purple-700" :
                              index === 3 ? "text-indigo-700" :
                              "text-blue-700"
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
                                    "text-blue-500"
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
          
          <DownArrowPrompt onClick={() => scrollToSection('key_findings')} />
        </section>

        {/* Findings & Insights Section - (Now Key Findings) UPDATED for responsiveness */}
        <section 
          ref={sectionRefs.key_findings} // ensure ref matches new ID
          id="key_findings" // ensure ID matches new ID
          className="xl:snap-start xl:min-h-screen flex flex-col justify-center items-center py-16 px-4 xl:py-8 xl:px-8 bg-gray-50 relative" // Adjusted py for potentially more content
        >
          <div className="w-full xl:max-w-4xl mx-auto"> {/* Added w-full */}
            <motion.div className="text-center mb-4">
            <motion.h2
                className="text-3xl font-bold text-gray-900 mb-1"
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
                Our machine learning analysis of 6,793 financial proposals revealed these critical insights about advisor proposal creation and usage patterns.
              </motion.p>
            </motion.div>
            
            {/* Stats Row - Updated for Proposals Project */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Stat 1: Total Proposals */}
              <motion.div 
                className="bg-white rounded-lg shadow-sm overflow-hidden"
                whileHover={{ y: -4, boxShadow: "0 12px 20px -5px rgba(59, 130, 246, 0.2)" }}
              >
                <div className="h-1.5 bg-blue-500 w-full"></div>
                <div className="p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-500">Proposals</span>
                    <span className="flex items-center text-blue-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    </span>
                  </div>
                  <div className="flex items-baseline mt-1">
                    <span className="text-3xl font-bold text-blue-600">6,793</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">proposals analyzed</div>
                </div>
              </motion.div>
              
              {/* Stat 2: Updates */}
              <motion.div 
                className="bg-white rounded-lg shadow-sm overflow-hidden"
                whileHover={{ y: -4, boxShadow: "0 12px 20px -5px rgba(16, 185, 129, 0.2)" }}
              >
                <div className="h-1.5 bg-green-500 w-full"></div>
                <div className="p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-500">Updates</span>
                     <span className="flex items-center text-green-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                    </span>
                  </div>
                  <div className="flex items-baseline mt-1">
                    <span className="text-3xl font-bold text-green-600">6,102</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">updates tracked</div>
                </div>
              </motion.div>
              
              {/* Stat 3: Category Fragmentation */}
              <motion.div 
                className="bg-white rounded-lg shadow-sm overflow-hidden"
                whileHover={{ y: -4, boxShadow: "0 12px 20px -5px rgba(139, 92, 246, 0.2)" }}
              >
                <div className="h-1.5 bg-purple-500 w-full"></div>
                <div className="p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-500">'Other' Category</span>
                     <span className="flex items-center text-purple-500">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                    </span>
                  </div>
                  <div className="flex items-baseline mt-1">
                    <span className="text-3xl font-bold text-purple-600">30.7</span>
                    <span className="text-purple-400 ml-1">%</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">(2,087) miscategorized</div>
                </div>
              </motion.div>
              
              {/* Stat 4: 'Test' Proposals */}
              <motion.div 
                className="bg-white rounded-lg shadow-sm overflow-hidden"
                whileHover={{ y: -4, boxShadow: "0 12px 20px -5px rgba(245, 158, 11, 0.2)" }}
              >
                <div className="h-1.5 bg-amber-500 w-full"></div>
                <div className="p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-500">Naming Issues</span>
                     <span className="flex items-center text-amber-500">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                    </span>
                  </div>
                  <div className="flex items-baseline mt-1">
                    <span className="text-3xl font-bold text-amber-600">437</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">proposals named 'test'</div>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Main Insight Row - 2x2 Grid */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Finding 1: Quarterly Usage Patterns */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                  Quarterly Usage Patterns
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Analysis showed consistent Q1 peaks in proposal creation (e.g., 1,193 in Q1 2023), indicating predictable seasonal demand for proposal tools.
                </p>
                <div className="h-14 flex items-end space-x-1">
                  <div className="flex-1 bg-blue-200 rounded-t" style={{height: '60%'}}></div>
                  <div className="flex-1 bg-blue-400 rounded-t" style={{height: '100%'}}></div>
                  <div className="flex-1 bg-blue-200 rounded-t" style={{height: '80%'}}></div>
                  <div className="flex-1 bg-blue-200 rounded-t" style={{height: '70%'}}></div>
                </div>
                <div className="flex justify-around text-xs text-gray-500 mt-1">
                  <span>Q1</span><span>Q2</span><span>Q3</span><span>Q4</span>
                </div>
              </div>
              
              {/* Finding 2: Category Fragmentation & Consolidation Needs */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
                  </div>
                  Category Fragmentation
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Hierarchical clustering revealed that 30.7% of proposals were in 'Other'. Dendrograms showed 4-5 natural template families suitable for consolidation.
                </p>
                <div className="h-14 flex items-end justify-center">
                   {/* Simplified Dendrogram Visual */} 
                   <div className="relative h-full w-20">
                     <div className="absolute bottom-2 left-1 w-px h-6 bg-green-300"></div> 
                     <div className="absolute bottom-2 left-4 w-px h-6 bg-green-300"></div>
                     <div className="absolute bottom-8 left-2.5 w-3 h-px bg-green-300"></div>
                     <div className="absolute bottom-8 left-2.5 w-px h-3 bg-green-300"></div>
                     
                     <div className="absolute bottom-2 left-8 w-px h-4 bg-green-300"></div>
                     <div className="absolute bottom-2 left-11 w-px h-4 bg-green-300"></div>
                     <div className="absolute bottom-6 left-9.5 w-3 h-px bg-green-300"></div>
                     <div className="absolute bottom-6 left-9.5 w-px h-5 bg-green-300"></div>

                     <div className="absolute bottom-11 left-6 w-7 h-px bg-green-300"></div>
                     <div className="absolute bottom-11 left-6 w-px h-4 bg-green-300"></div>
                   </div>
                </div>
                 <div className="text-xs text-center text-gray-500 mt-1">Template Clustering Example</div>
              </div>
              
              {/* Finding 3: Naming Inconsistencies */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                  <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
                  </div>
                  Naming Inconsistencies
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Text analysis found 437 proposals named 'test', highlighting poor naming practices. Consistent naming correlated with template co-usage in the correlation matrix.
                </p>
                 <div className="flex flex-wrap gap-1 h-14 items-center justify-center">
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">test (437)</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">proposal (168)</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">IRA (161)</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">review (99)</span>
                 </div>
                  <div className="text-xs text-center text-gray-500 mt-1">Common (and problematic) Proposal Names</div>
              </div>
              
              {/* Finding 4: Correlation of Templates */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                  <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center mr-2">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                  </div>
                  Template Co-Usage Patterns
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Correlation matrix analysis revealed strong positive correlations (dark purple areas) between specific template types, indicating common advisor workflows.
                </p>
                <div className="h-14 flex justify-center items-center">
                   <div className="grid grid-cols-4 grid-rows-4 gap-px h-12 w-12">
                    <div className="bg-amber-500"></div><div className="bg-amber-200"></div><div className="bg-amber-100"></div><div className="bg-amber-100"></div>
                    <div className="bg-amber-200"></div><div className="bg-amber-500"></div><div className="bg-amber-300"></div><div className="bg-amber-100"></div>
                    <div className="bg-amber-100"></div><div className="bg-amber-300"></div><div className="bg-amber-500"></div><div className="bg-amber-200"></div>
                    <div className="bg-amber-100"></div><div className="bg-amber-100"></div><div className="bg-amber-200"></div><div className="bg-amber-500"></div>
                  </div>
                </div>
                <div className="text-xs text-center text-gray-500 mt-1">Simplified Correlation Matrix Visual</div>
              </div>
            </motion.div>
            
            {/* Final Call to Action / Key Opportunity */}
            <motion.div
              className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-md p-4 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              whileHover={{ y: -3, boxShadow: "0 15px 30px -5px rgba(79, 70, 229, 0.3)" }}
            >
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Key Opportunity</h3>
                  <p className="text-indigo-100 text-sm">
                    By addressing category fragmentation (consolidating based on ML) and implementing AI-assisted naming, we can improve proposal searchability by over 26% and increase template reuse by 51%, significantly boosting advisor efficiency.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
          <DownArrowPrompt onClick={() => scrollToSection("impact_outcomes")} />
        </section>

        {/* Impact & Outcomes Section - UPDATED for responsiveness */}
        <section 
          ref={sectionRefs.impact_outcomes}
          id="impact_outcomes" 
          className="xl:snap-start xl:h-screen flex flex-col justify-center items-center py-16 px-4 xl:py-10 xl:px-8 relative" // Removed bg-gray-50 if it's meant to be white like others, or keep if intended
        >
          <div className="w-full xl:max-w-4xl mx-auto"> {/* Added w-full */}
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
              How our financial proposal analysis transformed document creation workflows and delivered measurable efficiency improvements.
            </motion.p>
            
            {/* Research to Implementation Journey - Adapted for Proposals Project */}
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
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <p className="text-sm text-gray-600">Identified 30.7% proposals in 'Other' category</p>
                    </div>
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <p className="text-sm text-gray-600">Found 437 proposals named 'test', hindering search</p>
                    </div>
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <p className="text-sm text-gray-600">Revealed template co-usage patterns via correlations</p>
                    </div>
                  </div>
                </div>
                
                {/* Implementation Card */}
                <div className="bg-white p-4 rounded-lg shadow-sm relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold">2</div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2 text-center mt-2">Implementation</h3>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                      </div>
                      <p className="text-sm text-gray-600">Consolidated categories using ML cluster analysis</p>
                    </div>
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                      </div>
                      <p className="text-sm text-gray-600">Implemented AI-assisted naming suggestions</p>
                    </div>
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                      </div>
                      <p className="text-sm text-gray-600">Developed guided template selection system</p>
                    </div>
                  </div>
                </div>
                
                {/* User Impact Card */}
                <div className="bg-white p-4 rounded-lg shadow-sm relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-bold">3</div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2 text-center mt-2">User Impact</h3>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-purple-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                      </div>
                      <p className="text-sm text-gray-600">43% improvement in categorization accuracy</p>
                    </div>
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-purple-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                      </div>
                      <p className="text-sm text-gray-600">26% reduction in proposal search time</p>
                    </div>
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-purple-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                      </div>
                      <p className="text-sm text-gray-600">51% increase in template reuse</p>
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
                {/* Time Savings / Efficiency */}
                <div className="bg-white p-4 rounded-lg shadow-sm border-t-4 border-amber-400">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-800">Efficiency Gains</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div className="flex items-end mb-2">
                    <span className="text-3xl font-bold text-amber-600">17%</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Reduction in average proposal creation time due to better template discovery and reuse (51% increase).
                  </p>
                </div>
                
                {/* Analytics / Reporting Improvement */}
                <div className="bg-white p-4 rounded-lg shadow-sm border-t-4 border-teal-400">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-800">Improved Analytics</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a3 3 0 00-3-3H4a2 2 0 00-2 2v2a2 2 0 002 2h2a3 3 0 003-3zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                  </div>
                  <div className="flex items-end mb-2">
                    <span className="text-3xl font-bold text-teal-600">43%</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Improvement in categorization accuracy provided cleaner data for more reliable business reporting and trend analysis.
                  </p>
                </div>
                
                {/* Standardization / Knowledge Sharing */}
                <div className="bg-white p-4 rounded-lg shadow-sm border-t-4 border-indigo-400">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-800">Standardization</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6.001l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.317a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" /></svg>
                  </div>
                  <div className="flex items-end mb-2">
                    <span className="text-3xl font-bold text-indigo-600">26%</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Reduction in time spent searching due to standardized naming conventions, facilitating better knowledge sharing.
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Proposal Creation Transformation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-4"
            >
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">Proposal Workflow Transformation</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <h4 className="text-md font-semibold text-gray-700 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      Before Implementation
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-red-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </div>
                        <p className="text-sm text-gray-600">Fragmented categories, large 'Other' group</p>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-red-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </div>
                        <p className="text-sm text-gray-600">Inconsistent naming ('test', duplicates)</p>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-red-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </div>
                        <p className="text-sm text-gray-600">Limited template reuse, high search times</p>
                      </li>
                    </ul>
                  </div>
              
                  <div className="space-y-2">
                    <h4 className="text-md font-semibold text-gray-700 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      After Implementation
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <p className="text-sm text-gray-600">Consolidated, ML-derived categories (43% better)</p>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <p className="text-sm text-gray-600">AI-assisted naming & standardization</p>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <p className="text-sm text-gray-600">51% increased template reuse, 26% faster search</p>
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* Mini chart showing improvement */} 
                <div className="mt-4 h-12 relative">
                  <div className="absolute inset-x-0 bottom-0 h-6 bg-gray-100 rounded-md overflow-hidden">
                    <div className="h-full bg-green-500 rounded-l" style={{width: "75%"}}> 
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">Significant Workflow Efficiency Improvement</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <DownArrowPrompt onClick={() => scrollToSection("visuals1")} />
        </section>

        {/* Visuals Section (Only one for proposals.js) - UPDATED for responsiveness */}
        <section 
          ref={sectionRefs.visuals1}
          id="visuals1" 
          className="xl:snap-start xl:min-h-screen flex flex-col justify-start items-center py-16 px-4 xl:py-4 xl:px-8 relative"
        >
          <motion.div
            className="w-full xl:max-w-5xl mx-auto text-center mb-3 pt-14" // Added pt-14 to push content down a bit from sticky nav
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }} // Changed to whileInView for better trigger
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900">
              Visuals
            </h2>
          </motion.div>
          
          <div className="w-full xl:max-w-5xl mx-auto"> {/* Added w-full */}
            <ImageGallery images={projectDetails.images} />
          </div>
          
          {/* No DownArrowPrompt here as it's the last main content section before Thank You */}
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
              className="mb-4 cursor-pointer inline-block" // Added inline-block
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
              
              <Link href="/" className="inline-flex items-center px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                Back to Portfolio
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}