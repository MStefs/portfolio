import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import { FaEye, FaChartLine, FaLightbulb, FaCheck, FaLink, FaArrowLeft, FaArrowRight, FaExpand, FaTimes, FaSearch, FaCog, FaUsers, FaQuestionCircle, FaClipboardList, FaConnectdevelop, FaCheckCircle, FaBalanceScale, FaTh, FaChevronDown, FaPuzzlePiece, FaSitemap, FaSyncAlt, FaBullseye, FaRobot, FaBrain, FaFileAlt, FaUsersCog, FaSmile, FaMeh, FaFrown } from 'react-icons/fa';
import Sidebar from '../../components/Sidebar';
import Image from "next/image";
import Link from "next/link";
import CircularProcess from "../../components/CircularProcess";

/* --- SCROLL PROGRESS BAR --- */
function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalHeight) * 100;
      setScrollProgress(Math.min(progress, 100)); // Ensure it never exceeds 100%
    };
    
    // Initial calc
    handleScroll();
    
    // Throttle the scroll events
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
        className="h-full bg-blue-500"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}

/* --- DOWN ARROW PROMPT --- */
function DownArrowPrompt({ onClick }) {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      onClick={onClick}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </motion.div>
  );
}

/* --- ICONS FOR BULLET POINTS --- */
const bulletIcons = [
  { icon: <FaEye className="text-blue-500" />, tooltip: "Observation" },
  { icon: <FaChartLine className="text-purple-500" />, tooltip: "Analysis" },
  { icon: <FaLightbulb className="text-amber-500" />, tooltip: "Insight" }
];

/* --- PROJECT DETAILS (Survey content) --- */
const projectDetails = {
  title: "Trader & Financial Advisor Value Map Survey",
  subtitle: "Insights on Pain Points, Software Preferences, and Activity Patterns",
  overview: `
    This quantitative UX research initiative surveyed 169 US-based finance professionals to deeply understand their daily challenges, software experiences, and critical workflow patterns. Leveraging advanced methods like MaxDiff analysis for value prioritization and data-driven segmentation (Overall, Role-Based, Activity-Based), we uncovered key insights into user pain points, software preferences, task frequencies, and the core values driving their technology choices. The findings provided a robust, evidence-based foundation to inform strategic product decisions, platform design enhancements, and targeted UX improvements for financial technology solutions.
  `,
  problem_statement_intro: `Financial technology providers faced a critical blind spot: a nuanced understanding of their core users, financial advisors. This gap in knowledge about their daily tasks, software pain points, and unmet needs hindered the creation of truly user-centric solutions.`,
  challenge_areas: [
    {
      title: "Unclear Advisor Pain Points",
      iconName: "FaSearch",
      initialText: "What *truly* frustrated advisors?",
      details: "Pinpointing and quantifying key recurring pain points in advisors' daily tech use, moving beyond anecdotes to identify specific usability hurdles and unmet needs."
    },
    {
      title: "Opaque Daily Workflows",
      iconName: "FaCog",
      initialText: "How did advisors *actually* work and use software?",
      details: "Mapping common advisor workflows, task frequencies, and tool-switching to uncover inefficiencies, workarounds, and UX improvement opportunities."
    },
    {
      title: "Undefined User Segments",
      iconName: "FaUsers",
      initialText: "Did 'one-size-fits-all' work, or were needs diverse?",
      details: "Investigating if different advisor types (by role, activity) had unique needs, preferences, and pain points requiring tailored, not generic, solutions."
    }
  ],
  state_before_insight: {
    gap: {
      title: "Impact of the Knowledge Gap",
      iconName: "FaQuestionCircle",
      points: [
        "Product strategy often relied on assumptions, not solid user data.",
        "Risk of building features misaligned with core user needs.",
        "Difficulty prioritizing development and marketing effectively.",
        "Missed opportunities for market differentiation."
      ]
    },
    research_goals: {
      title: "Our Research Aimed To:",
      iconName: "FaLightbulb",
      points: [
        "Replace assumptions with robust quantitative data on advisor behaviors.",
        "Build an evidence-based foundation for product strategy and UX design.",
        "Identify high-impact opportunities for UX enhancements.",
        "Define distinct user segments for targeted solutions."
      ]
    }
  },
  challenge_quote: {
    text: "We need to understand not just what advisors want, but how they actually spend their time and what truly frustrates them about their current tools.",
    source: "VP of Product Strategy"
  },
  challenge_conclusion: {
    title: "The Path Forward: Seeking Clarity",
    text: "The confluence of these knowledge gaps—unclear pain points, opaque workflows, and undefined user segments—underscored an urgent need. To navigate this uncertainty and inform effective product strategy, a dedicated research initiative was essential to illuminate these critical areas and pave the way for data-driven decisions."
  },
  duration: "Q2 2023 - Q3 2023",
  team: ["UX Researcher (Me)", "Senior Design Manager", "Senior Product Manager", "Product Manager", "UXR Manager"],
  myRole: `
    As the lead UX Researcher, I designed and executed this quantitative study, employing MaxDiff analysis for value prioritization and data-driven segmentation. I analyzed the findings to deliver strategic recommendations, informing product and UX enhancements for financial advisor platforms.
  `,
  
  research_questions: [
    "What are the most common software-related pain points financial professionals experience?",
    "How frequently do advisors perform key tasks like rebalancing, trade management, and client interactions?",
    "What differences exist between current software setups and ideal platform preferences?",
    "How do software needs differ between general financial professionals and active traders?",
    "What platform benefits and attributes do professionals value most across different segments?"
  ],
  
  methods: [
    {
      name: "Quantitative Survey & Persona Segmentation",
      subtitle: "Defining User Needs via Data-Driven Personas",
      description: "Surveyed 169 finance professionals, using statistical segmentation (Overall, Role-Based, Activity-Based) to create data-driven personas and define varied UX needs.",
      revealed: "This Quant UX approach identified specific, measurable differences in how advisor personas experience pain points and value technology, enabling targeted design solutions.",
      icon: FaUsers,
      color: "blue"
    },
    {
      name: "MaxDiff Analysis for Value Prioritization",
      subtitle: "Uncovering True User Preferences Through Trade-Offs",
      description: "Implemented MaxDiff (n=169) by presenting sets of features/benefits, forcing trade-off choices to establish a true preference hierarchy for software values.",
      revealed: "MaxDiff scores showed 'Time Savings' (3.87) and 'Efficiency' (3.66) as significantly prioritized over 'Established Brand' (5.51), directly informing UX strategy.",
      icon: FaCheckCircle,
      color: "green"
    },
    {
      name: "Current vs. Preferred UX Gap Analysis",
      subtitle: "Identifying Key UX Improvement Opportunities",
      description: "Analyzed survey data (n=169) to quantify disparities between current financial tool experiences (e.g., 26% use all-in-one) and stated preferences (e.g., 55% prefer all-in-one).",
      revealed: "This highlighted significant demand for integrated platforms, offering a clear path to enhance user satisfaction by addressing these gaps.",
      icon: FaBalanceScale,
      color: "purple"
    },
    {
      name: "Competitive UX & Platform Benchmarking",
      subtitle: "Understanding the Competitive UX Landscape",
      description: "Benchmarked against competitor UX (e.g., Fidelity, Schwab) via survey data (n=169) to identify strategic opportunities and unmet needs.",
      revealed: "Provided insights into market standards and segment-specific preferences (e.g., Schwab reliance by activity-based users), informing differentiation strategies.",
      icon: FaTh,
      color: "amber"
    }
  ],
  
  key_insights: [
    {
      title: "Redundant Data Entry & Organization",
      description: "75% of respondents enter the same information repeatedly at least 'sometimes', and 82% struggle with staying organized.",
      recommendation: "Invest in cross-platform data synchronization and organizational tools designed specifically for financial workflows."
    },
    {
      title: "All-in-One Platform Preference",
      description: "64% agree they prefer investment features in an all-in-one platform, while current usage shows far more fragmented solutions.",
      recommendation: "Focus on comprehensive platform development with specialized investment functionality integration."
    },
    {
      title: "Segment-Specific Triggers",
      description: "Client requests (22.2%) drive most trading activity overall, but activity-based users rely more on market events (14.7%) than role-based users.",
      recommendation: "Design segment-specific alert systems and dashboards that prioritize relevant triggers."
    }
  ],
  
  process: [
    {
      title: "Survey Design",
      description: "Created comprehensive survey with targeted questions about pain points, software usage, and workflow patterns for financial professionals."
    },
    {
      title: "Market Sampling",
      description: "Recruited 169 US-based finance professionals across various roles, ensuring representation of key market segments."
    },
    {
      title: "Segmentation",
      description: "Implemented three distinct segmentation approaches: Overall (n=169), Role-Based (n=31), and Activity-Based (n=97) to enable multi-dimensional analysis."
    },
    {
      title: "Cross-Segment Analysis",
      description: "Compared findings across segments to identify both common pain points and segment-specific challenges and preferences."
    },
    {
      title: "Pain Point Prioritization",
      description: "Ranked pain points by frequency and severity to identify highest-impact improvement opportunities for technology platforms."
    },
    {
      title: "Strategic Recommendations",
      description: "Developed tailored recommendations for feature development and platform optimization based on segment-specific insights."
    }
  ],
  
  findings: [
    {
      title: "Critical Pain Points",
      description: "Most problematic issues include redundant data entry (75%), organizational challenges (82%), multiple logins (70%), and needing workarounds to accomplish tasks (75%). Trust issues with software outputs affect 70% of respondents at least 'sometimes'."
    },
    {
      title: "Task Frequency Patterns",
      description: "Client interaction tasks occur more frequently than technical trading tasks. 22.5% seek client signatures daily, while specialized activities like applying trade minimums (42.6%) and setting equivalencies (45%) are never performed by a large portion of respondents."
    },
    {
      title: "Platform Preferences Gap",
      description: "Current usage shows 56 respondents using specialized collections vs. 44 using all-in-one platforms. However, preferred usage would shift dramatically to 93 wanting all-in-one platforms and only 30 preferring specialized collections."
    },
    {
      title: "Value & Benefit Rankings",
      description: "Efficiency ranks highest across all segments (3.66 overall), while established brand ranks lowest (5.51). Time savings is the most valued benefit (3.87), significantly outranking money benefits (3.51). Activity-based users value performance (3.91) more than role-based users (3.65)."
    }
  ],
  
  impact_outcomes: {
    research_driven_insights: [ // Renamed from metrics
      "75% of professionals report redundant data entry, and 82% struggle with organization.",
      "A significant 29 percentage point gap exists: 26% currently use all-in-one platforms, while 55% state this as their preference.",
      "Client requests are the primary trade trigger (22.2% overall), but 'Activity-Based' users prioritize market events (14.7%) more.",
      "MaxDiff analysis reveals 'Time Savings' (3.87 score) and 'Efficiency' (3.66 score) as top-valued attributes, over 'Established Brand' (5.51)."
    ],
    strategic_outcomes: [ // Renamed from business_outcomes and rephrased
      "Informed product strategy by highlighting the strong market demand for integrated, all-in-one financial platforms.",
      "Guided UX improvements by quantifying major pain points like data re-entry (75%) and task workarounds (70%).",
      "Enabled targeted product development and marketing by identifying distinct value drivers and needs across user segments (Overall, Role-Based, Activity-Based).",
      "Provided an evidence-based foundation for prioritizing features that deliver tangible time savings and efficiency gains for advisors."
    ]
  },
  
  images: [
    {
      caption: "Pain Points (1/3)",
      src: "/images/trading_survey/pp1.jpg",
      points: [
        "75% enter the same information repeatedly at least 'sometimes'",
        "Over 82% find it hard to be organized at least 'sometimes'",
        "70% need multiple logins to complete one task"
      ]
    },
    {
      caption: "Pain Points (2/3)",
      src: "/images/trading_survey/pp2.jpg",
      points: [
        "Tools incompatibility affects 77% at least 'sometimes'",
        "Software speed issues impact 74% of respondents",
        "Customer service problems reported by 51% of users"
      ]
    },
    {
      caption: "Pain Points (3/3)",
      src: "/images/trading_survey/pp3.jpg",
      points: [
        "75% need workarounds to accomplish tasks",
        "54% feel their software doesn't do enough",
        "70% struggle to trust what the software tells them"
      ]
    },
    {
      caption: "Frequency (1/2): Task Performance",
      src: "/images/trading_survey/fr1.jpg",
      points: [
        "42.6% never apply trade minimums to rebalance",
        "Only 22.5% of respondents seek client signatures daily",
        "31.4% review investment performance with clients quarterly"
      ]
    },
    {
      caption: "Frequency (2/2): Task Performance",
      src: "/images/trading_survey/fr2.jpg",
      points: [
        "44.4% never create additional trades while rebalancing",
        "45% never set equivalencies",
        "Only 13.6% review gains/losses prior to trading daily"
      ]
    },
    {
      caption: "Platform Preference - Overall Results",
      src: "/images/trading_survey/trs1.jpg",
      points: [
        "64% agree they prefer investment features in an all-in-one platform",
        "71% would rather use integrated platforms or be happy to stop using current tools",
        "Only 13.6% would not use integrated features"
      ]
    },
    {
      caption: "Current vs. Preferred Software Setup",
      src: "/images/trading_survey/trs2.jpg",
      points: [
        "Current: 56 use specialized collections vs. 44 use all-in-one platforms",
        "Preferred: 93 want all-in-one platforms vs. only 30 wanting specialized collections",
        "Microsoft Office usage drops from 21 (current) to 14 (preferred)"
      ]
    },
    {
      caption: "Trade Activity Triggers Across Segments",
      src: "/images/trading_survey/trs3.jpg",
      points: [
        "Client requests (22.2%) are the top trigger overall",
        "Activity-based users rely more heavily on market events (14.7%)",
        "Role-based users have higher tax harvesting triggers (15.6%)"
      ]
    },
    {
      caption: "Client Communication Methods",
      src: "/images/trading_survey/trs4.jpg",
      points: [
        "Current: In-person meetings (87) and digital reports (81) dominate",
        "Preferred: Self-serve client portals (45) and digital reports (49) increase in preference",
        "Remote video calls drop from 73 (current) to 19 (preferred)"
      ]
    },
    {
      caption: "Value Rankings Across Segments",
      src: "/images/trading_survey/trs5.jpg",
      points: [
        "Efficiency ranks highest (3.66) across all segments",
        "Established brand ranks lowest (5.51) overall",
        "Activity-based users value performance (3.91) more than role-based users (3.65)"
      ]
    },
    {
      caption: "Software Applications Used",
      src: "/images/trading_survey/trs6.jpg",
      points: [
        "Fidelity (47), Charles Schwab (43), and Robinhood (41) are most popular overall",
        "Activity-based segment relies heavily on Charles Schwab (34)",
        "Role-based segment prefers Charles Schwab (11) and Ameritrade (9)"
      ]
    },
    {
      caption: "Benefit Rankings Across Segments",
      src: "/images/trading_survey/trs7.jpg",
      points: [
        "Time savings ranked most important benefit (3.87 overall)",
        "Money benefits ranked lowest (3.51) overall",
        "Activity-based users value time savings more (4.06) than role-based users (3.84)"
      ]
    }
  ]
};

// Define process steps with improved continuous language
const processSteps = [
  {
    title: "Survey Design",
    description: "Developing comprehensive surveys with targeted questions to capture pain points, software usage patterns, and workflow challenges for financial professionals."
  },
  {
    title: "Market Sampling",
    description: "Recruiting representative financial professionals across various roles and specializations to ensure balanced market representation."
  },
  {
    title: "Segmentation Analysis",
    description: "Applying multi-dimensional segmentation approaches: Overall (n=169), Role-Based (n=31), and Activity-Based (n=97) to uncover nuanced insights."
  },
  {
    title: "Cross-Segment Comparison",
    description: "Identifying patterns across segments to highlight both universal pain points and segment-specific challenges and preferences."
  },
  {
    title: "Pain Point Ranking",
    description: "Evaluating and prioritizing identified pain points based on frequency and severity to target high-impact improvement opportunities."
  },
  {
    title: "Recommendation Development",
    description: "Creating tailored, actionable strategies for feature development and platform optimization based on segment-specific insights."
  }
];

/* --- Image Gallery Component - REPLACED with advisor360.js version --- */
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
  
  const currentImage = images[currentIndex];
  // Note: The ImageGallery component now uses the globally defined `bulletIcons` from above.

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
    
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    
    const deltaX = clientX - startPanPosition.x;
    const deltaY = clientY - startPanPosition.y;
    
    setPanPosition({
      x: panPosition.x + deltaX,
      y: panPosition.y + deltaY
    });
    
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
      <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm">
        <div className="w-full px-5 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-center">
          <h3 className="text-lg font-medium">{currentImage.caption}</h3>
        </div>
        
        {/* Bullet points under the header - modal-like style */}
        {currentImage.points && currentImage.points.length > 0 && (
          <div className="p-3 bg-gray-50 border-b min-h-32"> {/* Added min-h-32 */}
            <div className="flex flex-row flex-wrap justify-center gap-2">
              {currentImage.points.map((point, idx) => {
                const iconIndex = idx % bulletIcons.length;
                const iconData = bulletIcons[iconIndex]; // Use the global bulletIcons
                
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
                    title={iconData.tooltip} // Use tooltip from global bulletIcons
                  >
                    <div className="flex-shrink-0 mr-2 mt-0.5">
                      {iconData.icon}
                    </div>
                    <p className={`text-sm ${colorSet.text}`}>{point}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

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

      <AnimatePresence>
        {modalOpen && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => { 
              if (modalZoom > 1) {
                if (!e.target.closest('.modal-image-container')) {
                  resetZoom(e);
                }
              } else {
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
              {modalZoom <= 1 && (
                <motion.div 
                  className="w-full max-w-5xl mb-2"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg text-white shadow-lg mx-auto mb-2 max-w-fit">
                    <h3 className="text-base font-medium">{currentImage.caption}</h3>
                  </div>
                  
                  {currentImage.points && currentImage.points.length > 0 && (
                    <div className="backdrop-blur-md bg-black bg-opacity-30 rounded-xl p-1.5 max-w-5xl mx-auto shadow-xl">
                      <div className="flex flex-row justify-center flex-wrap">
                        {currentImage.points.map((point, idx) => {
                          const iconIndex = idx % bulletIcons.length;
                          const iconData = bulletIcons[iconIndex]; // Use the global bulletIcons
                          
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
                              title={iconData.tooltip} // Use tooltip from global bulletIcons
                            >
                              <div className="flex-shrink-0 mr-2 w-5 h-5 flex items-center justify-center bg-white/20 rounded-full shadow-inner">
                                <span className={colorSet.accent}>{iconData.icon}</span>
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

              <div className="flex items-center justify-center w-full">
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

                <div 
                  className="relative modal-image-container" 
                  style={{ 
                    width: 'calc(100% - 100px)', 
                    height: '74vh', 
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
                  {modalZoom <= 1 && (
                    <div 
                      className="absolute inset-0 z-10"
                      onTouchStart={onTouchStart}
                      onTouchMove={onTouchMove}
                      onTouchEnd={onTouchEnd}
                    />
                  )}
                  
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
                        style={{ maxHeight: "74vh" }}
                        priority={true}
                        draggable="false"
                        onDragStart={(e) => e.preventDefault()}
                      />
                    </div>
                    
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

              <motion.div 
                className="w-full flex flex-col items-center mt-2 z-30"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-white bg-black bg-opacity-50 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-xs shadow-lg mb-1.5">
                  <span>Zoom: {(modalZoom * 100).toFixed(0)}%</span>
                  {modalZoom > 1 && (
                    <span className="ml-2 text-yellow-300">• Click outside to reset zoom</span>
                  )}
                </div>
                
                <div className="flex bg-black bg-opacity-50 backdrop-blur-sm px-3 py-1.5 rounded-full items-center shadow-lg">
                  <div className="text-white text-sm font-medium mr-3">
                    {currentIndex + 1} of {images.length}
                  </div>
                  
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

export default function TradingSurveyPage() {
  const [activeSection, setActiveSection] = useState("overview");

  // Updated sectionRefs for single visuals section
  const sectionRefs = {
    overview: useRef(null),
    problem_statement: useRef(null),
    research_questions: useRef(null),
    methods: useRef(null),
    process: useRef(null),
    findings_insights: useRef(null),
    impact_outcomes: useRef(null),
    visuals1: useRef(null), // Single ref for the entire visuals gallery section
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
  
  // Add the research steps data for the Value Map project
  const researchSteps = [
    {
      title: "Research Planning",
      description: "Defined research objectives to understand the financial advisor value map, including key pain points, priorities, and frequency of tasks.",
      insights: [
        "Identified key value areas to investigate through stakeholder interviews",
        "Created research plan focusing on segmentation by role and activity level",
        "Established baseline hypotheses about advisor priorities to test"
      ]
    },
    {
      title: "Survey Development",
      description: "Built a comprehensive survey using Survey Monkey to gather structured data about financial advisor values and workflow challenges.",
      insights: [
        "Designed 27-question survey with mixed quantitative and qualitative inputs",
        "Incorporated value ranking exercises to establish priority hierarchies",
        "Pre-tested survey with 6 advisors to refine question clarity and flow"
      ]
    },
    {
      title: "Data Analysis",
      description: "Exported survey results to Excel and Power BI for systematic analysis of response patterns and statistical significance.",
      insights: [
        "Analyzed responses from 169 financial advisors across experience levels",
        "Applied correlation analysis to identify linked value factors",
        "Created initial visualization models to identify data patterns"
      ]
    },
    {
      title: "Insight Generation",
      description: "Developed visualization dashboard and PowerPoint presentation highlighting key findings and actionable recommendations.",
      insights: [
        "Built comprehensive value map visualization showing priority relationships",
        "Created pain point heat map revealing highest friction areas",
        "Developed segmentation model showing value differences by advisor type"
      ]
    },
    {
      title: "Delivery & Impact",
      description: "Presented findings to the product team with clear visualization of advisor values, pain points, and opportunity areas.",
      insights: [
        "Delivered interactive dashboard for ongoing reference by product teams",
        "Created prioritized recommendation list based on highest value impact",
        "Established value metrics framework for future product decisions"
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

  // Updated IntersectionObserver logic
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
        if (sectionRefs[highestVisibleSection]) {
            // If it is any visuals section (even if sections were visuals2, visuals3 etc.),
            // set activeSection to 'visuals1' to highlight the correct nav item.
            if (highestVisibleSection.startsWith('visuals')) {
                setActiveSection('visuals1');
            } else {
                setActiveSection(highestVisibleSection);
            }
        }
      }
    };

    observer = new IntersectionObserver(observerCallback, options);
    
    Object.values(sectionRefs).forEach((refCollection) => {
      // sectionRefs will now only contain single refs, not arrays of refs
      if (refCollection && refCollection.current) {
        observer.observe(refCollection.current);
      }
    });
    
    return () => {
      Object.values(sectionRefs).forEach((refCollection) => {
        if (refCollection && refCollection.current) {
          observer.unobserve(refCollection.current);
        }
      });
      observer.disconnect();
    };
  }, []); // Empty dependency array: run only on mount and clean up on unmount

  const scrollToSection = (sectionId) => {
    if (sectionRefs[sectionId]?.current) {
      sectionRefs[sectionId].current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    // Responsive main layout
    <div className="flex xl:h-screen xl:overflow-hidden">
      <Head>
        <title>Trading & Financial Advisors Survey Results</title>
        <meta name="description" content="Insights on Pain Points, Software Preferences, and Activity Patterns" />
        <meta name="keywords" content="Trading, Financial Advisors, Survey, Insights, Software, Preferences, Activity Patterns" />
        <meta name="author" content="Your Name" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ScrollProgress />
      <style jsx global>{customScrollbarStyles}</style>
      <Sidebar />
      {/* Responsive main content area */}
      <main className="w-full xl:ml-[24%] xl:w-[76%] xl:h-screen xl:overflow-y-scroll xl:snap-y xl:snap-mandatory custom-scrollbar">
        {/* Sticky Navigation */}
        <div className="sticky top-0 z-40 py-2 xl:py-3 backdrop-blur-sm bg-opacity-30">
          {/* Full nav for xl screens and up */}
          <div className="hidden xl:flex justify-center mx-auto">
            <nav className="flex space-x-3 xl:space-x-6"> {/* Adjusted space-x for xl too */}
              {[
                { id: "overview", label: "Overview" },
                { id: "problem_statement", label: "Challenge" },
                { id: "research_questions", label: "Research Qs" }, // Abbreviated for space
                { id: "methods", label: "Methods" },
                { id: "process", label: "Process" },
                { id: "findings_insights", label: "Findings" }, // Abbreviated
                { id: "impact_outcomes", label: "Impact" },
                { id: "visuals1", label: "Visuals" },
              ].map((item) => (
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
              const currentActiveSectionID = activeSection; // Use a local var to avoid issues with state in closure
              // Define navItemsForMobile here so it's in scope for both branches
              const navItemsForMobile = [
                { id: "overview", label: "Overview" },
                { id: "problem_statement", label: "Challenge" },
                { id: "research_questions", label: "Research Qs" },
                { id: "methods", label: "Methods" },
                { id: "process", label: "Process" },
                { id: "findings_insights", label: "Findings" },
                { id: "impact_outcomes", label: "Impact" },
                { id: "visuals1", label: "Visuals" }
              ];

              if (currentActiveSectionID === 'thankyou') {
                // displayLabel = "Contact"; // Old logic
                // New logic: Set to "Visuals" (label of the last main content section)
                const visualsNavItem = navItemsForMobile.find(item => item.id === 'visuals1');
                displayLabel = visualsNavItem ? visualsNavItem.label : "Visuals"; 
              } else {
                const currentNavItem = navItemsForMobile.find(item => item.id === currentActiveSectionID || (item.id === 'visuals1' && currentActiveSectionID && currentActiveSectionID.startsWith('visuals')));
                if (currentNavItem) {
                  displayLabel = currentNavItem.label;
                } else {
                  displayLabel = currentActiveSectionID.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()).split(" ").slice(0,2).join(" ");
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

        {/* Overview Section - Responsive padding and height */}
        <section 
          ref={sectionRefs.overview}
          id="overview" 
          className="xl:snap-start xl:h-screen flex flex-col justify-center items-center py-16 px-4 xl:py-10 xl:px-8 relative"
        >
          <div className="max-w-4xl mx-auto">
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
                      "SurveyMonkey", "Power BI", "Python", "Excel", "Miro"
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
          <DownArrowPrompt onClick={() => scrollToSection("problem_statement")} />
        </section>

        {/* Problem Statement Section - Responsive padding and height */}
        <section 
          ref={sectionRefs.problem_statement}
          id="problem_statement" 
          className="xl:snap-start xl:h-screen flex flex-col justify-center items-center py-16 px-4 xl:py-12 xl:px-6 bg-gray-50 relative"
        >
          <div className="max-w-4xl mx-auto w-full"> {/* Changed max-w-3xl to max-w-4xl and added w-full */}
            <motion.h2
              className="text-3xl font-bold text-gray-900 mb-4 text-center" // Reduced mb-8 to mb-4
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              The Challenge: Navigating the Fog of User Understanding
            </motion.h2>

            <motion.p
              className="text-center text-gray-600 text-sm mb-6 max-w-3xl mx-auto" // Reduced mb and text size
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              {projectDetails.problem_statement_intro}
            </motion.p>

            {/* Challenge Areas */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6" // Reduced gap and mb
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {projectDetails.challenge_areas.map((challenge, index) => (
                <motion.div
                  key={index}
                  className="relative group bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 min-h-[160px] flex flex-col justify-center" // Increased padding and min-height
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-2 text-indigo-600 group-hover:text-white transition-colors duration-300">
                      {challenge.iconName === 'FaSearch' && <FaSearch size={28} />}{/* Increased icon size */}
                      {challenge.iconName === 'FaCog' && <FaCog size={28} />}
                      {challenge.iconName === 'FaUsers' && <FaUsers size={28} />}
                    </div>
                    <h4 className="text-md font-semibold text-gray-800 mb-1 group-hover:text-white transition-colors duration-300">{challenge.title}</h4>
                    {/* Initial text visible, shrinks on hover */}
                    <p className="text-xs text-gray-600 px-1 h-10 group-hover:h-0 group-hover:opacity-0 opacity-100 transition-all duration-300 overflow-hidden flex items-center justify-center">
                        {challenge.initialText}
                    </p>
                  </div>
                  {/* Detailed text revealed on hover */}
                  <div className="absolute inset-0 bg-indigo-600 text-white p-3 rounded-lg flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="mb-2 text-white">
                        {challenge.iconName === 'FaSearch' && <FaSearch size={24} />}
                        {challenge.iconName === 'FaCog' && <FaCog size={24} />}
                        {challenge.iconName === 'FaUsers' && <FaUsers size={24} />}
                    </div>
                    <h5 className="font-semibold mb-1 text-sm text-center">{challenge.title}</h5>
                    <p className="text-xs text-center text-indigo-100 leading-snug">{challenge.details}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* State Before Insight */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6" // Reduced gap and mb
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
                  <ul className="space-y-1.5"> {/* Increased space-y */}
                    {item.points.map((point, pIndex) => (
                      <li key={pIndex} className="flex items-start text-xs text-gray-700 leading-relaxed"> {/* Added leading-relaxed */}
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
              className="italic text-xs text-gray-700 border-l-4 border-indigo-300 pl-4 py-3 my-6 bg-indigo-50 rounded-r-md shadow-sm" // Adjusted padding, margin, added shadow
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              "{projectDetails.challenge_quote.text}"
              <div className="text-xs text-indigo-600 mt-1.5 font-normal text-right">— {projectDetails.challenge_quote.source}</div>
            </motion.div>

            {/* Challenge Conclusion */}
            <motion.div
              className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-4 rounded-lg shadow-lg" // Enhanced styling
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

        {/* Research Questions Section - Responsive padding and height */}
        <section 
          ref={sectionRefs.research_questions}
          id="research_questions" 
          className="xl:snap-start xl:h-screen flex flex-col justify-center items-center py-16 px-4 xl:py-12 xl:px-6 bg-gray-50 relative"
        >
          <div className="max-w-5xl mx-auto w-full">
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
              Our research aimed to uncover detailed insights about how financial professionals work and what technology challenges they face, focusing on their daily workflows and pain points.
            </motion.p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Current Workflow Analysis */}
              <motion.div
                className="bg-gray-50 p-5 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border-t-4 border-blue-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                    <FaClipboardList size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Current Workflow Analysis</h3>
                    <p className="text-xs text-blue-600 font-medium">Understanding Daily Operations & Pain Points</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1 font-semibold">Q1:</span>
                    <p className="text-sm text-gray-700 leading-relaxed">What are the most common software-related pain points financial professionals experience?</p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1 font-semibold">Q2:</span>
                    <p className="text-sm text-gray-700 leading-relaxed">How frequently do advisors perform key tasks like rebalancing, trade management, and client interactions?</p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1 font-semibold">Q3:</span>
                    <p className="text-sm text-gray-700 leading-relaxed">What differences exist between current software setups and ideal platform preferences?</p>
                  </li>
                </ul>
              </motion.div>

              {/* Market Segment Analysis */}
              <motion.div
                className="bg-gray-50 p-5 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border-t-4 border-purple-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                    <FaUsers size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Market Segment Analysis</h3>
                    <p className="text-xs text-purple-600 font-medium">Identifying Segment-Specific Needs</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3 mt-1 font-semibold">Q1:</span>
                    <p className="text-sm text-gray-700 leading-relaxed">How do software needs differ between general financial professionals and active traders?</p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3 mt-1 font-semibold">Q2:</span>
                    <p className="text-sm text-gray-700 leading-relaxed">What platform benefits and attributes do professionals value most across different segments?</p>
                  </li>
                </ul>
              </motion.div>
            </div>
              
            <motion.div
              className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-5 rounded-lg shadow-xl mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-white bg-opacity-20 text-white mr-3">
                  <FaConnectdevelop size={20} />
                </div>
                <div>
                  <h4 className="text-md font-semibold mb-1">Driving Data-Informed Solutions</h4>
                  <p className="text-sm text-indigo-100">These research questions guided our quantitative analysis of 169 financial professionals, enabling us to identify clear patterns in user needs and preferences across different market segments.</p>
                </div>
              </div>
            </motion.div>
          </div>
          <DownArrowPrompt onClick={() => scrollToSection("methods")} />
        </section>

        {/* Methods Section - Responsive padding and height */}
        <section 
          ref={sectionRefs.methods}
          id="methods" 
          className="xl:snap-start xl:h-screen flex flex-col justify-center items-center py-16 px-4 xl:py-10 xl:px-8 relative"
        >
          <div className="max-w-5xl mx-auto w-full">
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
              To uncover hidden patterns in how financial advisors approach trading, we employed these specialized techniques:
            </motion.p>
            
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {projectDetails.methods.map((method, index) => {
                const IconComponent = method.icon;
                const cardColor = method.color || 'gray';
                // Ensure border-l-4 is applied for the side color strip
                const borderClass = `border-l-4 border-${cardColor}-500`; 
                const bgIconClass = `bg-${cardColor}-100`;
                const textIconClass = `text-${cardColor}-500`;
                const revealedBgClass = `bg-${cardColor}-50`;
                const revealedTextClass = `text-${cardColor}-700`;

                // Slightly more descriptive texts
                let currentDescription = method.description;
                let currentRevealed = method.revealed;

                if (method.name === "Quantitative Survey & Persona Segmentation") {
                  currentDescription = "Surveyed 169 finance professionals, applying statistical segmentation (Overall, Role-Based, Activity-Based) to develop data-driven personas and precisely define diverse UX needs.";
                  currentRevealed = "This quantitative UX method pinpointed specific, measurable differences in how various advisor personas experience pain points and value technology, directly enabling more targeted design solutions.";
                } else if (method.name === "MaxDiff Analysis for Value Prioritization") {
                  currentDescription = "Implemented MaxDiff analysis, presenting respondents with sets of features/benefits and forcing trade-off choices to establish a robust, true preference hierarchy for software values.";
                  currentRevealed = "MaxDiff scores clearly demonstrated that 'Time Savings' (3.87) and 'Efficiency' (3.66) were significantly prioritized over attributes like 'Established Brand' (5.51), directly informing our UX and product strategy.";
                } else if (method.name === "Current vs. Preferred UX Gap Analysis") {
                  currentDescription = "Analyzed survey data to rigorously quantify the disparities between their current financial tool experiences (e.g., 26% use all-in-one) and their stated preferences (e.g., 55% prefer all-in-one solutions).";
                  currentRevealed = "This analysis highlighted a significant unmet demand for integrated platforms, offering a clear, data-backed path to enhance user satisfaction by addressing these identified gaps in the market.";
                } else if (method.name === "Competitive UX & Platform Benchmarking") {
                  currentDescription = "Conducted UX benchmarking against key competitor platforms (such as Fidelity and Schwab) using survey data to identify strategic differentiation opportunities and currently unmet user needs.";
                  currentRevealed = "Provided crucial insights into prevailing market standards and segment-specific preferences (e.g., Schwab reliance by activity-based users), which directly informed our competitive positioning and differentiation strategies.";
                }

                return (
                  <motion.div 
                    key={index}
                    className={`bg-white p-4 rounded-lg shadow-md ${borderClass} h-full flex flex-col`} // Applied borderClass here
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
                      {currentDescription}
                    </p>
                    {method.revealed && (
                      <div className={`${revealedBgClass} p-3 rounded-md mt-auto mb-3`}>
                        <p className="text-xs text-gray-700">
                          <span className={`font-medium ${revealedTextClass}`}>What this means:</span> {currentRevealed}
                        </p>
                      </div>
                    )}
                    {/* Mini visualization placeholder - ensure consistent styling if needed */}
                    <div className="pt-2 mt-auto border-t border-gray-100">
                      <div className="flex flex-col items-center justify-center h-16 text-xs text-gray-500">
                        {method.name === "Quantitative Survey & Persona Segmentation" && (
                          <>
                            <div className="flex justify-around h-10 w-24 mb-1">
                              {/* Visual for Segmentation: Three overlapping/distinct circles representing segments */}
                              <div className="relative">
                                <div className="w-12 h-12 rounded-full bg-blue-100 absolute -top-6 flex items-center justify-center shadow-inner">
                                  <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center">
                                    <div className="text-xs text-blue-700 font-medium">O</div>
                                  </div>
                                </div>
                              </div>
                              <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-blue-100 absolute -top-5 flex items-center justify-center shadow-inner">
                                  <div className="w-6 h-6 rounded-full bg-blue-300 flex items-center justify-center">
                                    <div className="text-xs text-blue-700 font-medium">A</div>
                                  </div>
                                </div>
                              </div>
                              <div className="relative">
                                <div className="w-8 h-8 rounded-full bg-blue-100 absolute -top-4 flex items-center justify-center shadow-inner">
                                  <div className="w-4 h-4 rounded-full bg-blue-400 flex items-center justify-center">
                                     <div className="text-[8px] text-blue-700 font-medium">R</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <p className="text-center text-gray-400 mt-1 text-[10px]">Segments: Overall, Activity, Role</p>
                          </>
                        )}
                        {method.name === "MaxDiff Analysis for Value Prioritization" && (
                          <>
                            {/* Visual for MaxDiff: Simplified horizontal bars showing relative scores */}
                            <div className="space-y-0.5 w-full max-w-[160px] mb-1">
                              {[
                                { label: "Time Savings", score: 3.87, color: "bg-green-500" },
                                { label: "Efficiency", score: 3.66, color: "bg-green-400" },
                                { label: "Brand", score: 5.51, color: "bg-green-200" },
                              ].sort((a, b) => a.score - b.score)
                               .map(item => {
                                  const minScore = 3.5;
                                  const maxScore = 5.5;
                                  const percent = Math.max(0, 100 - ((item.score - minScore) / (maxScore - minScore)) * 70 - 10);
                                  return (
                                    <div key={item.label} className="flex items-center">
                                      <span className="text-[10px] text-gray-500 w-16 truncate pr-1 text-right">{item.label}</span>
                                      <div className="flex-1 bg-gray-200 h-2.5 rounded-full shadow-inner">
                                        <div className={`${item.color} h-2.5 rounded-full`} style={{ width: `${percent}%` }}></div>
                                      </div>
                                    </div>
                                  );
                               })}
                            </div>
                            <p className="text-center text-gray-400 mt-1 text-[10px]">Value Priority (MaxDiff Scores)</p>
                          </>
                        )}
                        {method.name === "Current vs. Preferred UX Gap Analysis" && (
                          <>
                            {/* Visual for Gap Analysis: Two sets of bars (Current vs. Preferred) */}
                            <div className="grid grid-cols-2 gap-2 w-full max-w-[180px] mb-1">
                              <div className="text-center">
                                <p className="text-[10px] font-medium text-gray-500 mb-0.5">Current</p>
                                <div className="flex justify-around items-end h-8">
                                  <div className="w-5 bg-purple-200 rounded-t-sm shadow-inner" style={{ height: `${(26/100)*100*0.8}%` }} title="All-in-One: 26%"></div>
                                  <div className="w-5 bg-purple-300 rounded-t-sm shadow-inner" style={{ height: `${(74/100)*100*0.8}%` }} title="Specialized: 74%"></div>
                                </div>
                                <div className="flex justify-around text-[9px] text-gray-400"><span>All-1</span><span>Spec.</span></div>
                              </div>
                              <div className="text-center">
                                <p className="text-[10px] font-medium text-gray-500 mb-0.5">Preferred</p>
                                <div className="flex justify-around items-end h-8">
                                  <div className="w-5 bg-purple-400 rounded-t-sm shadow-inner" style={{ height: `${(55/100)*100*0.8}%` }} title="All-in-One: 55%"></div>
                                  <div className="w-5 bg-purple-500 rounded-t-sm shadow-inner" style={{ height: `${(45/100)*100*0.8}%` }} title="Specialized: 45%"></div>
                                </div>
                                <div className="flex justify-around text-[9px] text-gray-400"><span>All-1</span><span>Spec.</span></div>
                              </div>
                            </div>
                            <p className="text-center text-gray-400 mt-1 text-[10px]">Platform Setup Gap (All-in-One)</p>
                          </>
                        )}
                        {method.name === "Competitive UX & Platform Benchmarking" && (
                          <>
                            {/* Visual for Benchmarking: Simple bars for competitor comparison */}
                            <div className="flex justify-between h-10 items-end mb-1 w-32">
                              <div className="w-5 bg-amber-400 rounded-t-sm shadow-inner text-center" style={{height: "80%"}} title="Fidelity: Top Tier">
                                <div className="text-[9px] mt-0.5 text-amber-800 font-medium">F</div>
                              </div>
                              <div className="w-5 bg-amber-300 rounded-t-sm shadow-inner text-center" style={{height: "75%"}} title="C. Schwab: High Use">
                                <div className="text-[9px] mt-0.5 text-amber-800 font-medium">CS</div>
                              </div>
                              <div className="w-5 bg-amber-300 rounded-t-sm shadow-inner text-center" style={{height: "70%"}} title="Robinhood: Popular">
                                <div className="text-[9px] mt-0.5 text-amber-800 font-medium">RH</div>
                              </div>
                              <div className="w-5 bg-amber-200 rounded-t-sm shadow-inner text-center" style={{height: "50%"}} title="Ameritrade: Mid Tier">
                                <div className="text-[9px] mt-0.5 text-amber-700 font-medium">AT</div>
                              </div>
                              <div className="w-5 bg-amber-100 rounded-t-sm shadow-inner text-center" style={{height: "30%"}} title="Other: Lower Use">
                                <div className="text-[9px] mt-0.5 text-amber-700 font-medium">O</div>
                              </div>
                            </div>
                            <p className="text-center text-gray-400 mt-1 text-[10px]">Competitor Landscape</p>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
            
            {/* Foundation for Process block */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-6 p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-300 text-sm text-gray-700"
            >
              <div className="flex items-start">
                <FaLink className="h-4 w-4 text-indigo-500 mr-2 flex-shrink-0 mt-0.5" />
                <p>
                  <span className="font-medium text-indigo-700">Foundation for Process:</span> These methods (Survey, MaxDiff, Gap Analysis, Benchmarking) were vital. They enabled data-driven segmentation, value prioritization, identified UX gaps, and informed competitive strategy, directly shaping our design solutions.
                </p>
              </div>
            </motion.div>
          </div>
          <DownArrowPrompt onClick={() => scrollToSection("impact_outcomes")} />
        </section>

        {/* Process Section - Responsive padding and height */}
        <section
          ref={sectionRefs.process}
          id="process"
          className="xl:snap-start xl:h-screen flex flex-col justify-center items-center py-16 px-4 xl:py-10 xl:px-8 bg-gray-50 relative overflow-hidden"
        >
          <div className="max-w-6xl w-full mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-6"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-1">Research Process</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm">
                Our methodical approach to uncovering financial advisor values and pain points
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
          
          <DownArrowPrompt onClick={() => scrollToSection('findings_insights')} />
        </section>

        {/* Findings & Insights Section - Responsive padding and height */}
        <section 
          ref={sectionRefs.findings_insights}
          id="findings_insights" 
          className="xl:snap-start xl:min-h-screen flex flex-col justify-center items-center py-16 px-4 xl:py-8 xl:px-8 bg-gray-50 relative"
        >
          <div className="max-w-4xl mx-auto">
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
                Our survey of 169 financial professionals revealed these critical insights about preferences and behavior
              </motion.p>
            </motion.div>
            
            {/* Stats Row */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Stat 1: Advisor Segments */}
              <motion.div 
                className="bg-white rounded-lg shadow-sm overflow-hidden"
                whileHover={{ y: -4, boxShadow: "0 12px 20px -5px rgba(59, 130, 246, 0.2)" }}
              >
                <div className="h-1.5 bg-teal-500 w-full"></div>
                <div className="p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-500">Segments</span>
                    <span className="flex items-center text-teal-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </span>
                </div>
                  <div className="flex items-baseline mt-1">
                    <span className="text-3xl font-bold text-teal-600">3</span>
                    <span className="text-teal-400 ml-1">types</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">distinct advisor segments</div>
                </div>
              </motion.div>
              
              {/* Stat 2: Feature Priority */}
              <motion.div 
                className="bg-white rounded-lg shadow-sm overflow-hidden"
                whileHover={{ y: -4, boxShadow: "0 12px 20px -5px rgba(16, 185, 129, 0.2)" }}
              >
                <div className="h-1.5 bg-blue-500 w-full"></div>
                <div className="p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-500">Top Value</span>
                    <span className="flex items-center text-blue-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </span>
                  </div>
                  <div className="flex items-baseline mt-1">
                    <span className="text-3xl font-bold text-blue-600">Time</span>
                    <span className="text-blue-400 ml-1">3.87</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">highest ranked benefit</div>
                </div>
              </motion.div>
              
              {/* Stat 3: Platform Preference */}
              <motion.div 
                className="bg-white rounded-lg shadow-sm overflow-hidden"
                whileHover={{ y: -4, boxShadow: "0 12px 20px -5px rgba(139, 92, 246, 0.2)" }}
              >
                <div className="h-1.5 bg-purple-500 w-full"></div>
                <div className="p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-500">Platform Preference</span>
                    <span className="flex items-center text-purple-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                  </div>
                  <div className="flex items-baseline mt-1">
                    <span className="text-3xl font-bold text-purple-600">64</span>
                    <span className="text-purple-400 ml-1">%</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">prefer all-in-one platform</div>
                </div>
              </motion.div>
              
              {/* Stat 4: Top Trigger */}
              <motion.div 
                className="bg-white rounded-lg shadow-sm overflow-hidden"
                whileHover={{ y: -4, boxShadow: "0 12px 20px -5px rgba(245, 158, 11, 0.2)" }}
              >
                <div className="h-1.5 bg-amber-500 w-full"></div>
                <div className="p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-500">Top Trigger</span>
                    <span className="flex items-center text-amber-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </span>
                  </div>
                  <div className="flex items-baseline mt-1">
                    <span className="text-3xl font-bold text-amber-600">22.2</span>
                    <span className="text-amber-400 ml-1">%</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">client requests drive trading</div>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Main Insight Row */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Segment Analysis */}
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                  <div className="h-6 w-6 rounded-full bg-teal-100 flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  Software Usage & Preferences
                </h3>
                
                <p className="text-sm text-gray-600 mb-2">
                  Our analysis revealed a significant <span className="font-medium text-teal-600">gap between current and preferred software setup</span> among financial professionals.
                </p>
                
                {/* Current vs Preferred visualization */}
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div>
                    <div className="text-xs font-medium text-gray-700 mb-1 text-center">Current Setup</div>
                    <div className="flex flex-col items-center">
                      <div className="h-16 w-full bg-teal-100 rounded-t-lg relative overflow-hidden">
                        <div className="absolute bottom-0 inset-x-0 h-[56%] bg-teal-500"></div>
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Collection of specialized tools</div>
                      <div className="text-xs text-gray-500">56 respondents</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-700 mb-1 text-center">Preferred Setup</div>
                    <div className="flex flex-col items-center">
                      <div className="h-16 w-full bg-teal-100 rounded-t-lg relative overflow-hidden">
                        <div className="absolute bottom-0 inset-x-0 h-[93%] bg-teal-500"></div>
                      </div>
                      <div className="text-xs text-gray-600 mt-1">All-in-one platform</div>
                      <div className="text-xs text-gray-500">93 respondents</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Value Ranking Matrix */}
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  Value Ranking Matrix
                </h3>
                
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium text-blue-600">Efficiency (3.66)</span> and <span className="font-medium text-blue-600">Performance (3.99)</span> were highest-valued attributes, while established brand (5.51) ranked lowest.
                </p>
                
                {/* Value ranking chart */}
                <div className="space-y-1 mb-2">
                  <div className="flex items-center">
                    <div className="w-28 text-xs text-right pr-2">Efficiency</div>
                    <div className="flex-1 h-5 bg-gray-100 rounded overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-l" style={{width: "86%"}}>
                        <span className="text-white text-xs pl-1">3.66</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-28 text-xs text-right pr-2">Performance</div>
                    <div className="flex-1 h-5 bg-gray-100 rounded overflow-hidden">
                      <div className="h-full bg-blue-400 rounded-l" style={{width: "80%"}}>
                        <span className="text-white text-xs pl-1">3.99</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-28 text-xs text-right pr-2">Shared Access</div>
                    <div className="flex-1 h-5 bg-gray-100 rounded overflow-hidden">
                      <div className="h-full bg-blue-300 rounded-l" style={{width: "76%"}}>
                        <span className="text-gray-800 text-xs pl-1">4.23</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-28 text-xs text-right pr-2">Cost of Product</div>
                    <div className="flex-1 h-5 bg-gray-100 rounded overflow-hidden">
                      <div className="h-full bg-blue-200 rounded-l" style={{width: "65%"}}>
                        <span className="text-gray-800 text-xs pl-1">4.59</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-28 text-xs text-right pr-2">Established Brand</div>
                    <div className="flex-1 h-5 bg-gray-100 rounded overflow-hidden">
                      <div className="h-full bg-blue-100 rounded-l" style={{width: "55%"}}>
                        <span className="text-gray-800 text-xs pl-1">5.51</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Secondary Insight Row */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Trading Triggers */}
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                  <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  Trading Activity Triggers
                </h3>
                
                <p className="text-sm text-gray-600 mb-2">
                  Client requests (22.2%) are the primary driver of trading activity, with segment-specific differences in secondary triggers.
                </p>
                
                {/* Trading trigger visualization */}
                <div className="space-y-1">
                  <div className="flex items-center">
                    <div className="w-24 text-xs text-right pr-2">Client Requests</div>
                    <div className="flex-1 h-5 bg-gray-100 rounded overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-l" style={{width: "87%"}}>
                        <span className="text-white text-xs pl-1">22.2%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-24 text-xs text-right pr-2">Market Events</div>
                    <div className="flex-1 h-5 bg-gray-100 rounded overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-l" style={{width: "57%"}}>
                        <span className="text-white text-xs pl-1">14.3%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-24 text-xs text-right pr-2">Investment Research</div>
                    <div className="flex-1 h-5 bg-gray-100 rounded overflow-hidden">
                      <div className="h-full bg-amber-300 rounded-l" style={{width: "55%"}}>
                        <span className="text-gray-800 text-xs pl-1">12.9%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-24 text-xs text-right pr-2">Rebalancing</div>
                    <div className="flex-1 h-5 bg-gray-100 rounded overflow-hidden">
                      <div className="h-full bg-amber-200 rounded-l" style={{width: "50%"}}>
                        <span className="text-gray-800 text-xs pl-1">12.4%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Segment difference note */}
                <div className="mt-2 pt-2 border-t border-gray-100 text-xs text-gray-600">
                  <span className="font-medium text-amber-600">Segment differences:</span> Activity-based users rely more on market events (14.7%), while role-based users have higher tax harvesting triggers (15.6%).
                </div>
              </div>
              
              {/* Top Applications Used */}
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                  <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  Top Applications Used
                </h3>
                
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium text-indigo-600">Fidelity (47)</span>, <span className="font-medium text-indigo-600">Charles Schwab (43)</span>, and <span className="font-medium text-indigo-600">Robinhood (41)</span> are the most commonly used applications overall.
                </p>
                
                {/* Apps visualization */}
                <div className="space-y-1 mb-2">
                  <div className="flex items-center">
                    <div className="w-24 text-xs text-right pr-2">Fidelity</div>
                    <div className="flex-1 h-5 bg-gray-100 rounded overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-l" style={{width: "94%"}}>
                        <span className="text-white text-xs pl-1">47 users</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-24 text-xs text-right pr-2">C. Schwab</div>
                    <div className="flex-1 h-5 bg-gray-100 rounded overflow-hidden">
                      <div className="h-full bg-indigo-400 rounded-l" style={{width: "86%"}}>
                        <span className="text-white text-xs pl-1">43 users</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-24 text-xs text-right pr-2">Robinhood</div>
                    <div className="flex-1 h-5 bg-gray-100 rounded overflow-hidden">
                      <div className="h-full bg-indigo-300 rounded-l" style={{width: "82%"}}>
                        <span className="text-gray-800 text-xs pl-1">41 users</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-24 text-xs text-right pr-2">Ameritrade</div>
                    <div className="flex-1 h-5 bg-gray-100 rounded overflow-hidden">
                      <div className="h-full bg-indigo-200 rounded-l" style={{width: "80%"}}>
                        <span className="text-gray-800 text-xs pl-1">40 users</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Segment difference note */}
                <div className="mt-2 pt-2 border-t border-gray-100 text-xs text-gray-600">
                  <span className="font-medium text-indigo-600">Segment differences:</span> Activity-based segment relies heavily on Charles Schwab (34), while role-based segment prefers Charles Schwab (11) and Ameritrade (9).
                </div>
              </div>
            </motion.div>
            
            {/* Final Call to Action */}
            <motion.div
              className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-md p-3 text-white"
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
                    By targeting algorithmic traders with a $89/month solution featuring real-time data and custom alerts, we can capture a <span className="font-bold text-white">34% market share</span> and reach <span className="font-bold text-white">$4.2M annual revenue</span> within the first year.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
          <DownArrowPrompt onClick={() => scrollToSection("impact_outcomes")} />
        </section>

        {/* Impact & Outcomes Section - Responsive padding and height */}
        <section 
          ref={sectionRefs.impact_outcomes}
          id="impact_outcomes" 
          className="xl:snap-start xl:h-screen flex flex-col justify-center items-center py-16 px-4 xl:py-10 xl:px-6 bg-gray-50 relative"
        >
          <div className="max-w-4xl mx-auto">
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
              How our value mapping research transformed product messaging and delivered measurable improvements in user acquisition and retention
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
                  <h3 className="text-lg font-bold text-gray-800 mb-2 text-center mt-2">Key Discoveries from Survey</h3>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                        <FaCheck className="h-3 w-3 text-blue-600" />
                      </div>
                      <p className="text-sm text-gray-600">Identified critical pain points: 75% face redundant data entry, 82% struggle with organization.</p>
                    </div>
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                        <FaCheck className="h-3 w-3 text-blue-600" />
                      </div>
                      <p className="text-sm text-gray-600">Revealed strong preference for all-in-one platforms (64% agree/somewhat agree).</p>
                    </div>
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                        <FaCheck className="h-3 w-3 text-blue-600" />
                      </div>
                      <p className="text-sm text-gray-600">Uncovered core values: 'Time Savings' & 'Efficiency' significantly outrank 'Established Brand'.</p>
                    </div>
                  </div>
                </div>
                
                {/* Engineering & Design Decisions Card */}
                <div className="bg-white p-4 rounded-lg shadow-sm relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold">2</div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2 text-center mt-2">Strategic Actions Enabled</h3>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                        <FaCog className="h-3 w-3 text-green-600" />
                      </div>
                      <p className="text-sm text-gray-600">Redesigned value proposition across touchpoints</p>
                    </div>
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                        <FaCog className="h-3 w-3 text-green-600" />
                      </div>
                      <p className="text-sm text-gray-600">Built segment-based onboarding flows</p>
                    </div>
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                        <FaCog className="h-3 w-3 text-green-600" />
                      </div>
                      <p className="text-sm text-gray-600">Created value-based pricing structure</p>
                    </div>
                  </div>
                </div>
                
                {/* Outcomes Card */}
                <div className="bg-white p-4 rounded-lg shadow-sm relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-bold">3</div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2 text-center mt-2">Anticipated User & Business Benefits</h3>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-purple-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                        <FaChartLine className="h-3 w-3 text-purple-600" />
                      </div>
                      <p className="text-sm text-gray-600">Improved clarity on user needs, guiding more effective product development.</p>
                    </div>
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-purple-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                        <FaChartLine className="h-3 w-3 text-purple-600" />
                      </div>
                      <p className="text-sm text-gray-600">Enhanced ability to create targeted solutions for distinct advisor segments.</p>
                    </div>
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-purple-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                        <FaChartLine className="h-3 w-3 text-purple-600" />
                      </div>
                      <p className="text-sm text-gray-600">Stronger alignment between product offerings and advisor priorities.</p>
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
                {/* Card 1: Demand for Integrated Platforms */}
                <div className="bg-white p-4 rounded-lg shadow-sm border-t-4 border-blue-400">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-800">Demand for Integrated Platforms</h3>
                    <FaPuzzlePiece className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="flex items-end mb-2">
                    <span className="text-3xl font-bold text-blue-600">64%</span>
                    <span className="text-sm text-gray-500 ml-2 mb-1">Prefer All-in-One Solutions</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Of professionals prefer investment features within an integrated platform, signaling a clear market opportunity.
                  </p>
                </div>
                
                {/* Card 2: Top Workflow Inefficiency */}
                <div className="bg-white p-4 rounded-lg shadow-sm border-t-4 border-teal-400">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-800">Top Workflow Inefficiency</h3>
                    <FaSyncAlt className="h-6 w-6 text-teal-500" />
                  </div>
                  <div className="flex items-end mb-2">
                    <span className="text-3xl font-bold text-teal-600">75%</span>
                    <span className="text-sm text-gray-500 ml-2 mb-1">Face Redundant Data Entry</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Report entering the same information 'sometimes' to 'all the time,' highlighting a major friction point.
                  </p>
                </div>
                
                {/* Card 3: Most Valued Benefit */}
                <div className="bg-white p-4 rounded-lg shadow-sm border-t-4 border-amber-400">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-800">Most Valued Benefit</h3>
                    <FaBullseye className="h-6 w-6 text-amber-500" />
                  </div>
                  <div className="flex items-end mb-2">
                    <span className="text-3xl font-bold text-amber-600">Time</span>
                    <span className="text-sm text-gray-500 ml-2 mb-1">3.87 MaxDiff Score</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    'Time Savings' ranked as the most important benefit, guiding value proposition focus.
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Value Perception Transformation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-4"
            >
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">Informing a Shift in Value Communication</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <h4 className="text-md font-semibold text-gray-700 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Before Value Mapping
                    </h4>
                <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-red-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-600">Generic one-size-fits-all value proposition</p>
                    </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-red-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-600">Feature-focused messaging that missed user needs</p>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-red-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-600">Pricing disconnected from perceived value</p>
                      </li>
                </ul>
              </div>
              
                  <div className="space-y-2">
                    <h4 className="text-md font-semibold text-gray-700 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      After Value Mapping
                    </h4>
                <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-600">Tailored value propositions for each segment</p>
                    </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-600">Benefit-oriented communication highlighting outcomes</p>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-600">Value-based pricing aligned with willingness to pay</p>
                      </li>
                </ul>
                  </div>
                </div>
                
                {/* Mini chart showing improvement - REMOVED */}
                <p className="text-sm text-gray-600 mt-4 text-center italic">
                  This research provides a clear blueprint for transforming product messaging to resonate more effectively with advisor priorities.
                </p>
              </div>
            </motion.div>
          </div>
          <DownArrowPrompt onClick={() => scrollToSection("visuals1")} />
        </section>

        {/* Visuals Section - ensure ref is visuals1, responsive padding */}
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
          
          <div className="max-w-5xl mx-auto w-full">
            <ImageGallery images={projectDetails.images} />
          </div>
          
          {/* Removing the down arrow prompt as requested */}
        </section>

        {/* CONTACT SECTION + NAVIGATION - Responsive padding and height */}
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