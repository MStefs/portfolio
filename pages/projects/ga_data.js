import { useState, useRef, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaChevronDown, FaEye, FaChartLine, FaLightbulb, FaArrowLeft, FaArrowRight, FaExpand, FaTimes, FaLink, FaSitemap, FaTachometerAlt, FaDatabase, FaServer, FaChartBar, FaClock, FaMousePointer, FaListAlt, FaQuestionCircle, FaClipboardList, FaBullseye, FaSearch, FaConnectdevelop, FaArrowDown, FaArrowUp, FaUsers } from "react-icons/fa";
import CircularProcess from "../../components/CircularProcess";

/* --- SCROLL PROGRESS BAR (same as in Advisor360) --- */
function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };
    
    // initial
    handleScroll();
    
    // throttle
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

/* --- ICONS (same as in Advisor360) --- */
const bulletIcons = [
  { icon: <FaEye className="text-blue-500" />, tooltip: "What this shows" },
  { icon: <FaChartLine className="text-red-500" />, tooltip: "How to read the visuals" },
  { icon: <FaLightbulb className="text-yellow-500" />, tooltip: "Why these visuals matter" },
];

/* --- GOOGLE ANALYTICS PROJECT DETAILS --- */
const projectDetails = {
  title: "Google Analytics / Platform Data Log Sequence Analysis",
  subtitle: "Bridging Platform Data and GA data to drive product improvements",
  overview: `
    This quantitative UX research initiative integrated Google Analytics (GA) session data with Platform Data events for a unified view of user behavior. Through behavioral data modeling, user path analysis, and custom engagement metrics, we achieved significant outcomes: user engagement scores increased by **~11% (Q4)**, and the proportion of returning daily active users grew by **~34 percentage points** (from ~28% to ~62%), indicating enhanced retention. The platform demonstrated strong user stickiness with an **~80% WAU/MAU ratio**. Furthermore, integrating data into actionable dashboards saved analysts **10+ hours weekly** in manual reporting. These insights, including identification of the main dashboard as a key Platform Data hub and dominant user interaction patterns (clicks, views, scrolls), directly informed UX improvements and product strategy.
  `,
  problem_statement_intro: `Product and marketing teams operated with a fractured view of the user journey. Web analytics (GA) tracked in-product user behavior, while Platform Data and product databases held in-app engagement data. This separation made it nearly impossible to understand the complete user lifecycle, measure true engagement, or confidently attribute product success to specific marketing efforts.`,
  challenge_areas: [
    {
      title: "Disconnected User Journey",
      iconName: "FaSitemap",
      initialText: "How did users *really* move through the platfrom?",
      details: "Mapping the end-to-end user journey from initial touchpoints (GA) to in-product feature usage and Platform Data milestones was fragmented and unclear."
    },
    {
      title: "Measuring True Engagement",
      iconName: "FaTachometerAlt",
      initialText: "What did 'engagement' *truly* mean for our product?",
      details: "Relying on isolated metrics (e.g., GA page views vs. Platform Data activity logs) provided an incomplete picture of genuine user engagement and product stickiness."
    },
    {
      title: "Attributing Impact Accurately",
      iconName: "FaLink",
      initialText: "Which efforts *actually* led to valuable user actions?",
      details: "Difficulty in correlating  website behavior (GA) with specific in-product behaviors, feature adoption, and long-term retention (Platform Data)."
    }
  ],
  state_before_insight: {
    gap: {
      title: "The Cost of Siloed Data",
      iconName: "FaQuestionCircle",
      points: [
        "Inability to identify critical drop-offs across the full user lifecycle.",
        "Marketing and product strategies were often misaligned or based on incomplete data.",
        "Wasted resources on unproven initiatives or poorly prioritized features.",
        "Limited understanding of what truly drove long-term user retention and value."
      ]
    },
    research_goals: {
      title: "Our Research Aimed To:",
      iconName: "FaLightbulb",
      points: [
        "Create a unified data model integrating GA data points and Platform Data behavioral data.",
        "Quantify user paths, funnel conversions, and drop-off points across systems.",
        "Develop holistic engagement metrics reflecting true product interaction.",
        "Enable data-driven decisions for UX, product, and marketing strategies."
      ]
    }
  },
  challenge_quote: {
    text: "We\'re flying blind in the middle. We see what happens before they sign up and after they\'re deep in the product, but the critical connections between are a black box.",
    source: "VP of Product"
  },
  challenge_conclusion: {
    title: "Bridging the Data Divide for Holistic Insights",
    text: "To overcome these critical blind spots, this research initiative focused on integrating disparate data sources. The goal was to build a comprehensive, unified view of the user journey, enabling accurate measurement of engagement and the direct attribution of outcomes to specific interactions, thereby empowering smarter, data-informed decisions across the organization."
  },
  duration: "Q1 2024 - Q2 2025",
  team: ["UX Researcher (Me)","Senior Product Manager", "Product Manager", "Data Scientist", "UXR Manager", "VP of Product"],
  myRole: `
    As the Lead UX Researcher, I spearheaded the strategy for integrating Google Analytics and Platform Data. I led the analysis of user behavior, including user path analyses, custom metric development, and cohort analysis, to identify key pains and opportunities. My work in designing actionable dashboards and delivering data-driven recommendations directly supported product roadmap prioritization and UX enhancements.
  `,
  
  research_question_categories: [
    {
      title: "Understanding User Navigation & Interaction",
      iconName: "FaSitemap", 
      objective: "To map and analyze how users move through and interact with integrated GA and Platform Data/features.",
      questions: [
        "How do users navigate between Platform Data and platform features?",
        "What session behaviors (e.g., page sequences, time on page, clicks) indicate areas of friction or high value within the integrated data environment?",
        "Which specific user roles (identified via Platform Data) show the highest engagement with particular platform features (tracked via GA)?"
      ]
    },
    {
      title: "Measuring & Predicting Engagement",
      iconName: "FaChartLine", 
      objective: "To define, measure, and predict user engagement and satisfaction based on combined data.",
      questions: [
        "How can we develop a robust metric for 'product stickiness' that leverages both GA session data and Platform Data activity across different user segments?",
        "What quantifiable correlations exist between specific Platform Data lifecycle events (e.g., onboarding completion, support ticket resolution) and overall user satisfaction or engagement patterns observed in GA?",
        "Based on current cross-platform usage patterns (GA & Platform Data), can we build a model to predict future user engagement, potential churn, or likelihood of upselling?"
      ]
    }
  ],

  research_questions_conclusion: {
    title: "Guiding Methodological Choices for Integrated Insights",
    iconName: "FaLink", 
    text: "These research questions were fundamental in guiding our methodological choices. They necessitated an approach centered on data integration (Behavioral Data Modeling), pathway analysis (User Path & Funnel Analysis), nuanced engagement measurement (Custom Engagement Metric Development), and longitudinal tracking (Cohort-Based Analysis) to provide a truly holistic view of user behavior across systems."
  },
  
  methods: [
    {
      name: "Behavioral Data Integration & Modeling",
      description: "Designed a unified data model integrating Google Analytics behavioral logs with Platform Data events, enabling comprehensive analysis of cross-platform user journeys and interaction patterns."
    },
    {
      name: "User Path & Funnel Analysis",
      description: "Quantitatively mapped common user navigation paths and conversion funnels by analyzing sequences of page views and Platform Data events to identify high-traffic routes, critical drop-off points, and areas of friction."
    },
    {
      name: "Custom Engagement Metric Development",
      description: "Developed and validated custom engagement scores by algorithmically weighting session duration, feature interactions, and key Platform Data event completions to quantify user involvement and platform stickiness."
    },
    {
      name: "Cohort-Based Retention & Stickiness Analysis",
      description: "Conducted cohort analysis on key user segments to measure product stickiness (e.g., DAU/MAU ratios) and track long-term retention trends, identifying factors influencing sustained usage."
    }
  ],
  
  takeaways: [
    "Unified Cross-Platform View: Successfully integrating GA behavioral logs with Platform Data events provided the first-ever complete view of user journeys across marketing touchpoints and in-product interactions, revealing previously hidden behavioral correlations.",
    "Critical Funnel Drop-off Identified: User Path Analysis quantitatively mapped navigation flows, pinpointing a critical 60% drop-off rate in the feature activation funnel between 'Account Setup' and 'First Key Action', highlighting a major UX friction point.",
    "Nuanced Engagement Measurement: Custom-developed engagement scores (weighting duration, feature interaction, Platform Data events) provided a significantly more accurate measure of true user involvement than simple metrics like page views, identifying 'power users' vs. 'at-risk' segments.",
    "Predictive Retention Insights: Cohort analysis using integrated data revealed that users completing specific Platform Data events within their first week had a 35% higher 90-day retention rate, providing a strong leading indicator for long-term stickiness.",
    "Role-Based Behavior Differences: Analysis showed distinct platform usage patterns based on user roles defined in the Platform Data; 'Manager' roles focused heavily on reporting features, while 'Analyst' roles had higher interaction rates with data export tools.",
    "Validated Data Model for Scalability: The rigorous SQL metric building and data validation process established a robust and trustworthy unified data model, enabling reliable and scalable analytics across the organization."
  ],
  process: [
    {
      step: 1,
      title: "Data Integration",
      insights: [
        "Collaborated with engineering to establish data pipelines connecting GA and Platform Data systems.",
        "Defined common identifiers (e.g., user ID, session ID) to accurately map records across datasets.",
        "Developed validation scripts to ensure data integrity and consistency post-integration."
      ],
    },
    {
      step: 2,
      title: "Event Sequence Analysis",
      insights: [
        "Queried integrated data to extract sequences of user actions (page views, Platform Data events).",
        "Visualized common user pathways and drop-off points using Sankey diagrams and flow charts.",
        "Interviewed users to understand the 'why' behind observed high-friction pathways."
      ],
    },
    {
      step: 3,
      title: "Engagement Metrics",
      insights: [
        "Defined and calculated key engagement scores (e.g., combining session duration, feature usage, event frequency).",
        "Segmented users based on engagement levels to identify characteristics of highly engaged vs. low-engagement users.",
        "Correlated engagement metrics with user roles and Platform Data activities to understand context-specific behaviors."
      ],
    },
    {
      step: 4,
      title: "Optimization Recommendations",
      insights: [
        "Presented findings on user friction points and engagement drivers to product and design teams.",
        "Facilitated workshops to brainstorm solutions and prioritize platform improvements based on data.",
        "Developed A/B testing plans to measure the impact of proposed optimizations on user engagement."
      ],
    },
  ],
  /* 
    Below is sample placeholder "impact" data, 
    so we have something to show in the Impact & Outcomes section. 
    If you have real metrics, place them here.
  */
  impact_outcomes: {
    metrics: [
      "~11% Increase in Median Engagement Scores: Observed in Q4, indicating improved user acclimatization and value derived from the platform.",
      "~80% Weekly User Stickiness (WAU/MAU): Demonstrating strong regular engagement from the monthly active user base.",
      "10+ Hours Saved Weekly in Reporting: Achieved by analysts due to the unified dashboard, eliminating manual data compilation from disparate sources.",
      "Dashboard as Central Hub for Platform Data Tasks: ~49% of Platform Data sequences initiated from and ~42% returning to the main dashboard, highlighting its critical workflow role."
    ],
    business_outcomes: [
      "Data-Driven Product Roadmap: Shifted roadmap prioritization towards features demonstrably impacting user engagement and retention, backed by unified quantitative data.",
      "Improved User Experience: Identified key user pathways (like the dashboard\'s central role in Platform Data sequences) and dominant interaction patterns, leading to targeted UX enhancements.",
      "Targeted Feature Development: Enabled role-specific feature enhancements based on observed behavioral differences between user segments.",
      "Foundation for Predictive Analytics: Established a validated, integrated dataset enabling future development of predictive models for churn, engagement, and LTV."
    ],
  },
  images: [
    {
      src: "/images/ga_data/GA_Red2.jpg",
      caption: "User Engagement Overview",
      points: [
        "Shows overall session counts, role-based breakdowns, and page frequencies.",
        "Use stacked bars for time-based trends; see the pie chart for client usage share.",
        "Identifies which roles or clients drive the bulk of engagement.",
      ],
    },
    {
      src: "/images/ga_data/GA_Red3.jpg",
      caption: "Platform Data Sequences by User & Role",
      points: [
        "Lists each Platform Data event sequence within user sessions.",
        "Area chart tracks temporal sequence fluctuations; tables show roles and page transitions.",
        "Crucial for spotting common user pathways and drop-off points.",
      ],
    },
    {
      src: "/images/ga_data/GA_Red4.jpg",
      caption: "Platform Data Events by User & Role",
      points: [
        "Breaks down Platform Data events by distinct roles (Advisor, BSA, etc.).",
        "Highlights time-based event totals and usage hotspots by page or section.",
        "Pinpoints feature popularity, friction points, and optimization needs.",
      ],
    },
    {
      src: "/images/ga_data/GA_Red5.jpg",
      caption: "Active Unique Users",
      points: [
        "Shows how many users are new vs. returning each month/week.",
        "Compare peaks and dips to evaluate onboarding success and sustained engagement.",
        "Drives retention strategies and reveals stable vs. slowing user growth.",
      ],
    },
    {
      src: "/images/ga_data/GA_Red6.jpg",
      caption: "GA Sessions by Device & Browser",
      points: [
        "Categorizes sessions by OS, browser, and device.",
        "Check for major usage spikes to prioritize performance improvements.",
        "Ensures optimized experiences on platforms with the highest traffic.",
      ],
    },
    {
      src: "/images/ga_data/GA_Red7.jpg",
      caption: "Median Session Length",
      points: [
        "Shows average session duration for each role over time.",
        "Tables detail total sessions, Platform Data events, and pages per minute.",
        "Longer sessions can mean deeper engagement or complex workflows.",
      ],
    },
    {
      src: "/images/ga_data/GA_Red8.jpg",
      caption: "Engagement Score Glossary",
      points: [
        "Defines the unified metric of session duration, pages viewed, and events.",
        "Clarifies weighting among these different user actions.",
        "Helps compare engagement patterns across roles and timeframes.",
      ],
    },
    {
      src: "/images/ga_data/GA_Red9.jpg",
      caption: "Median Engagement Scores",
      points: [
        "Aggregates event counts, page views, and engagement for each role.",
        "Watch for upward or downward trends reflecting user satisfaction.",
        "Invaluable for continuous feedback on platform enhancements.",
      ],
    },
    {
      src: "/images/ga_data/GA_Red10.jpg",
      caption: "Stickiness by Ratio",
      points: [
        "Displays DAU/MAU ratios to measure return frequency.",
        "Weekend or holiday dips usually indicate normal usage patterns.",
        "Stronger retention is shown by a consistently higher ratio.",
      ],
    },
    {
      src: "/images/ga_data/GA_Red11.jpg",
      caption: "CRM Page Event Count by Week/Month",
      points: [
        "Tracks click events (type, location, text) across pages over time.",
        "Stacked chart reveals user interaction trends and hot spots.",
        "Guides UI improvements and strategic feature development.",
      ],
    },
  ],
};

/* --- DOWN ARROW PROMPT (same as Advisor360) --- */
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

/* 
  --- MAIN PAGE COMPONENT ---
  (Mimics Advisor360 structure, including 
   'Overview', 'Research Questions', 'Methods', 'Key Insights', 'Process', 'Findings', 'Impact', 'Visuals' sections)
*/
export default function GoogleAnalyticsCase() {
  const [activeSection, setActiveSection] = useState("overview");

  // Refs for each section (make sure each ID is spelled consistently)
  const sectionRefs = {
    overview: useRef(null),
    problem_statement: useRef(null),
    research_questions: useRef(null),
    methods: useRef(null),
    process: useRef(null),
    findings_insights: useRef(null),
    impact_outcomes: useRef(null),
    visuals1: useRef(null),
    thankyou: useRef(null),
  };

  /* Intersection Observer to highlight active nav item */
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
          // Determine which navigation item should be highlighted
        let activeNavId = highestVisibleSection;
        if (highestVisibleSection.startsWith('visuals')) {
          activeNavId = 'visuals1'; // Group all visuals under the 'visuals1' nav item
          }
          
        // Only update state if the active nav item for highlighting has changed
        // and the section is one of our defined refs
        if (sectionRefs[highestVisibleSection]) {
             setActiveSection(activeNavId); // Use activeNavId for UI, highestVisibleSection for internal logic if they differ
          }
        }
      // Note: We are not handling the case where NO sections are intersecting.
      // In that scenario, activeSection will remain the last intersected one.
    };
    
    observer = new IntersectionObserver(observerCallback, options);

    Object.values(sectionRefs).forEach((refCollection) => {
      const refsToObserve = Array.isArray(refCollection) ? refCollection : [refCollection];
      refsToObserve.forEach(ref => {
        if (ref?.current) {
          observer.observe(ref.current);
      }
      });
    });

    return () => {
      if (observer) {
        Object.values(sectionRefs).forEach((refCollection) => {
          const refsToObserve = Array.isArray(refCollection) ? refCollection : [refCollection];
          refsToObserve.forEach(ref => {
            if (ref?.current) {
              observer.unobserve(ref.current);
            }
          });
        });
        observer.disconnect();
      }
    };
  }, []); // Empty dependency array: run observer setup once on mount, cleanup on unmount.

  // Smooth-scroll helper
  const scrollToSection = (sectionId) => {
    if (sectionRefs[sectionId]?.current) {
      sectionRefs[sectionId].current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Navigation items (updated to match other pages)
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

  // Define process steps with improved continuous language
  const processSteps = [
    {
      title: "System Integration",
      description: "Establishing connections between Google Analytics and Platform Data systems to enable comprehensive data flow between platforms."
    },
    {
      title: "Event Mapping",
      description: "Creating standardized event definitions to ensure consistent tracking across different user touchpoints and platforms."
    },
    {
      title: "User Journey Analysis",
      description: "Identifying common paths users take across platforms to understand workflow patterns and potential friction points."
    },
    {
      title: "Engagement Modeling",
      description: "Developing custom metrics that combine session data, page views, and event frequency to quantify user engagement."
    },
    {
      title: "Insight Development",
      description: "Converting technical data into business-relevant insights about user behavior and platform effectiveness."
    },
    {
      title: "Dashboard Creation",
      description: "Building interactive data visualizations that enable stakeholders to monitor user behavior and make informed decisions."
    }
  ];

  // Add this state variable to track which card's popup is open near the beginning of the GoogleAnalyticsCase component
  const [openActionPopup, setOpenActionPopup] = useState(null);
  
  // Create a function to toggle the popup
  const toggleActionPopup = (index) => {
    if (openActionPopup === index) {
      setOpenActionPopup(null); // Close if already open
    } else {
      setOpenActionPopup(index); // Open the clicked one
    }
  };

  // Add this array of research steps for the Google Analytics project before the return statement
  const researchSteps = [
    {
      title: "Analytics Audit & PM Usage Challenges",
      description: "Identified current analytics assets and investigated Product Managers\' utilization and adoption challenges.",
      insights: [
        "Conducted a comprehensive audit of existing Google Analytics reports and Platform Data dashboard capabilities.",
        "Interviewed Product Managers to understand their current data sources, unmet needs, and reasons for underutilizing existing analytics tools.",
        "Analyzed usage logs and telemetry from existing dashboards to quantify PM engagement and identify common pain points."
      ]
    },
    {
      title: "Data Requirements Definition",
      description: "Collaborated with stakeholders to define critical business questions, KPIs, and the specific data needed from GA and Platform Data systems.",
      insights: [
        "Facilitated workshops with Product Managers and business stakeholders to define key business questions and performance indicators (KPIs).",
        "Documented all required data points from Google Analytics and Platform Data systems needed to address the defined questions and track KPIs.",
        "Developed a comprehensive data dictionary and a detailed tracking plan for all necessary metrics, dimensions, and events."
      ]
    },
    {
      title: "SQL Metric Building & Data Validation",
      description: "Developed new metrics by joining GA and Platform Data using SQL, and rigorously validated the accuracy and consistency of this integrated data.",
      insights: [
        "Wrote and optimized SQL queries (e.g., in BigQuery/Snowflake) to join Google Analytics session data with Platform Data event data, creating new composite metrics.",
        "Implemented automated data validation scripts and manual review processes to ensure the accuracy, consistency, and integrity of the integrated dataset.",
        "Conducted User Acceptance Testing (UAT) sessions with data scientists and Product Managers on the newly built metrics and underlying data."
      ]
    },
    {
      title: "Insight Generation & Analysis",
      description: "Analyzed the validated, integrated dataset to uncover actionable insights into user behavior, engagement patterns, and product stickiness.",
      insights: [
        "Performed exploratory data analysis on the unified dataset to identify significant trends, user behavior patterns, correlations, and anomalies.",
        "Applied advanced analytical techniques such as user segmentation, cohort analysis, and event sequence mapping to derive deeper insights.",
        "Synthesized complex data findings into clear, actionable narratives and presented these insights to product, design, and marketing teams."
      ]
    },
    {
      title: "Dashboard Design & Deployment",
      description: "Designed, developed, and deployed interactive dashboards to provide PMs with ongoing access to key metrics and actionable insights.",
      insights: [
        "Designed user-friendly, interactive dashboard mockups (e.g., in Looker Studio/Power BI) focusing on clear visualization of key insights and KPIs.",
        "Iteratively developed and refined dashboards based on Product Manager feedback, usability testing, and evolving business requirements.",
        "Deployed the finalized dashboards and conducted training sessions to empower PMs to use them effectively for data-driven decision-making."
      ]
    }
  ];

  return (
    <div className="flex xl:h-screen xl:overflow-hidden">
      {/* SCROLL PROGRESS */}
      <ScrollProgress />

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT: sticky nav + sections */}
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
              // Logic for 'thankyou' section (Contact)
              if (activeSection === 'thankyou') { // Assuming 'thankyou' is the ID for the contact section
                // displayLabel = "Contact"; // Old logic
                // New logic: Set to "Visuals" (label of the last main content section)
                const visualsNavItem = navItems.find(item => item.id === 'visuals1');
                displayLabel = visualsNavItem ? visualsNavItem.label : "Visuals"; 
              } else {
                // Find current nav item, special handling for grouped 'visuals'
                const currentNavItem = navItems.find(item => item.id === activeSection || (item.id === 'visuals1' && activeSection && activeSection.startsWith('visuals')));
                if (currentNavItem) {
                  displayLabel = currentNavItem.label;
                } else {
                  // Fallback: generate title from activeSection ID more robustly
                  displayLabel = activeSection
                    .replace(/_/g, ' ')
                    .replace(/-/g, ' ')
                    .replace(/\\b\\w/g, l => l.toUpperCase()) // Capitalize each word
                    .split(" ")
                    .slice(0,2) // Take first two words
                    .join(" ");
                  // Truncate if too long
                  if (displayLabel.length > 20 && displayLabel.includes(" ")) {
                     displayLabel = displayLabel.split(" ")[0] + "..."; // Truncate to first word if still too long
                  } else if (displayLabel.length > 20) {
                     displayLabel = displayLabel.substring(0,17) + "..."; // General truncate
                  }
                  if (!displayLabel) { // Ultimate fallback if ID is weird
                    displayLabel = projectDetails.title ? projectDetails.title.split(" ").slice(0,3).join(" ") + "..." : "Section";
                  }
                }
              }
              return (
                <span className="text-xs font-medium text-indigo-700 bg-indigo-100 px-3 py-1 rounded-md truncate">
                  {displayLabel}
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
                <div className="text-gray-600 text-sm">{projectDetails.team.map(member => <div key={member}>{member}</div>)}</div>
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
                      "Google Analytics", "BigQuery", "Looker Studio", "Power BI", "SQL", "Snowflake", "Microsoft SQL Studio", "Excel", "Miro"
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
          <div className="max-w-4xl mx-auto w-full">
            <motion.h2
              className="text-3xl font-bold text-gray-900 mb-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              The Challenge: Unifying a Fragmented User View
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
                      {challenge.iconName === 'FaSitemap' && <FaSitemap size={28} />}
                      {challenge.iconName === 'FaTachometerAlt' && <FaTachometerAlt size={28} />}
                      {challenge.iconName === 'FaLink' && <FaLink size={28} />}
                    </div>
                    <h4 className="text-md font-semibold text-gray-800 mb-1 group-hover:text-white transition-colors duration-300">{challenge.title}</h4>
                    <p className="text-xs text-gray-600 px-1 h-10 group-hover:h-0 group-hover:opacity-0 opacity-100 transition-all duration-300 overflow-hidden flex items-center justify-center">
                        {challenge.initialText}
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-indigo-600 text-white p-3 rounded-lg flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="mb-2 text-white">
                      {challenge.iconName === 'FaSitemap' && <FaSitemap size={24} />}
                      {challenge.iconName === 'FaTachometerAlt' && <FaTachometerAlt size={24} />}
                      {challenge.iconName === 'FaLink' && <FaLink size={24} />}
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

        {/* NEW SECTION: RESEARCH QUESTIONS */}
        <section
          ref={sectionRefs.research_questions}
          id="research_questions"
          className="xl:snap-start xl:h-screen flex flex-col justify-center items-center py-16 px-4 xl:py-16 xl:px-8 bg-gray-50 relative" // Changed bg-white to bg-gray-50
        >
          <div className="max-w-4xl mx-auto w-full">
            <motion.h2
              className="text-3xl font-bold text-gray-900 mb-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Key Research Questions
            </motion.h2>
            
            <motion.p
              className="text-gray-600 text-center mb-10 max-w-3xl mx-auto text-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              To bridge the gap between siloed GA and Platform Data data, our research was driven by critical questions aimed at creating a unified understanding of user behavior and its impact.
            </motion.p>

            {/* Categorized Research Questions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {projectDetails.research_question_categories.map((category, catIndex) => {
                const colors = [
                  { border: "border-blue-500", bg: "bg-blue-100", text: "text-blue-600", iconBase: "text-blue-500" },
                  { border: "border-green-500", bg: "bg-green-100", text: "text-green-600", iconBase: "text-green-500" },
                  { border: "border-purple-500", bg: "bg-purple-100", text: "text-purple-600", iconBase: "text-purple-500" }
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
                        {/* Dynamically render icon based on iconName */}
                        {category.iconName === 'FaSitemap' && <FaSitemap size={24} />}
                        {category.iconName === 'FaChartLine' && <FaChartLine size={24} />}
                        {category.iconName === 'FaClipboardList' && <FaClipboardList size={24} />}
                        {category.iconName === 'FaBullseye' && <FaBullseye size={24} />}
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

            {/* Conclusion Box */}
            {projectDetails.research_questions_conclusion && (
              <motion.div
                className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-5 rounded-lg shadow-xl mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + (projectDetails.research_question_categories.length * 0.1) }}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="p-2 rounded-full bg-white bg-opacity-20 text-white mr-3">
                      {projectDetails.research_questions_conclusion.iconName === 'FaLink' && <FaLink size={20} />}
                      {projectDetails.research_questions_conclusion.iconName === 'FaConnectdevelop' && <FaConnectdevelop size={20} />}
                      {projectDetails.research_questions_conclusion.iconName === 'FaUsers' && <FaUsers size={20} />}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-md font-semibold mb-2">{projectDetails.research_questions_conclusion.title}</h4>
                    <p className="text-sm text-indigo-100 leading-relaxed">{projectDetails.research_questions_conclusion.text}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
          <DownArrowPrompt onClick={() => scrollToSection("methods")} />
        </section>

        {/* NEW SECTION: METHODS */}
        <section
          ref={sectionRefs.methods}
          id="methods"
          className="xl:snap-start xl:h-screen flex flex-col justify-center items-center py-16 px-4 xl:py-10 xl:px-8 relative"
        >
          <div className="max-w-5xl mx-auto w-full"> {/* Ensure consistent width with advisor360 */}
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
              We used these quantitative techniques to turn raw GA and Platform Data data into actionable insights:
            </motion.p>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-2" /* Matched gap-4 from advisor360 general styling */
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Method 1: Behavioral Data Integration & Modeling */}
              <motion.div 
                className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500 h-full flex flex-col"
                whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.15)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-start mb-2">
                  <div className="w-12 h-12 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <FaLink size={24} className="text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-md font-semibold text-gray-800">Behavioral Data Integration & Modeling</h3>
                    <p className="text-xs text-gray-500">Integrated GA & Platform Data for a complete user view</p>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-3 flex-grow">
                  Designed a unified data model integrating Google Analytics behavioral logs with Platform Data events, enabling comprehensive analysis of cross-platform user journeys and interaction patterns.
                </p>
                
                <div className="bg-blue-50 p-3 rounded-md mb-3">
                  <p className="text-xs text-gray-700">
                    <span className="font-medium text-blue-700">What this means:</span> Connected GA web logs and Platform Data user actions into one model. This provided a full user story, linking marketing campaigns (GA) to feature adoption (Platform Data).
                  </p>
                </div>
                
                {/* Mini visualization placeholder */}
                <div className="pt-2 mt-auto border-t border-gray-100">
                  <div className="flex flex-col items-center justify-center h-16 text-xs text-gray-500">
                    <div className="flex justify-around items-center w-full max-w-[150px] text-blue-500">
                      <FaChartLine size={20} title="GA Data"/>
                      <span className="text-xl font-light">+</span>
                      <FaDatabase size={20} title="Platform Data Data"/>
                      <span className="text-xl font-light">→</span>
                      <FaServer size={20} title="Unified Model"/>
                      <span className="text-xl font-light">→</span>
                      <FaChartBar size={20} title="Insights"/>
                    </div>
                    <p className="text-xs text-center text-gray-400 mt-1">Data Integration Flow</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Method 2: User Path & Funnel Analysis */}
              <motion.div 
                className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500 h-full flex flex-col"
                whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.15)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-start mb-2">
                  <div className="w-12 h-12 flex-shrink-0 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <FaSitemap size={24} className="text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-md font-semibold text-gray-800">User Path & Funnel Analysis</h3>
                    <p className="text-xs text-gray-500">Mapping user journeys and identifying drop-offs</p>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-3 flex-grow">
                  Quantitatively mapped common user navigation paths and conversion funnels by analyzing sequences of page views and Platform Data events to identify high-traffic routes, critical drop-off points, and areas of friction.
                </p>
                
                <div className="bg-green-50 p-3 rounded-md mb-3">
                  <p className="text-xs text-gray-700">
                    <span className="font-medium text-green-700">What this means:</span> Tracked user steps from landing page to conversion, visualizing pathways and identifying funnel drop-offs (e.g., a 60% drop at one stage) to prioritize UX fixes.
                  </p>
                </div>
                
                {/* Mini visualization placeholder */}
                <div className="pt-2 mt-auto border-t border-gray-100">
                  <div className="flex flex-col items-center justify-center h-16 text-xs text-gray-500">
                    <div className="w-24 h-10 flex items-end space-x-1">
                      <div className="w-1/4 h-full bg-green-200 rounded-t-sm" title="Step 1: 100%"></div>
                      <div className="w-1/4 h-4/5 bg-green-300 rounded-t-sm" title="Step 2: 80%"></div>
                      <div className="w-1/4 h-2/5 bg-red-300 rounded-t-sm" title="Step 3 (Drop): 40%"></div> {/* Drop-off point */}
                      <div className="w-1/4 h-1/5 bg-green-400 rounded-t-sm" title="Step 4: 20%"></div>
                    </div>
                    <p className="text-xs text-center text-gray-400 mt-1">Funnel with 60% Drop-off Identified</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Method 3: Custom Engagement Metric Development */}
              <motion.div 
                className="bg-white p-4 rounded-lg shadow-md border-l-4 border-purple-500 h-full flex flex-col"
                whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(168, 85, 247, 0.15)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-start mb-2">
                  <div className="w-12 h-12 flex-shrink-0 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <FaTachometerAlt size={24} className="text-purple-500" />
                  </div>
                  <div>
                    <h3 className="text-md font-semibold text-gray-800">Custom Engagement Metric Development</h3>
                    <p className="text-xs text-gray-500">Creating tailored scores for user interaction depth</p>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-3 flex-grow">
                  Developed and validated custom engagement scores by algorithmically weighting session duration, feature interactions, and key Platform Data event completions to quantify user involvement and platform stickiness.
                </p>
                
                <div className="bg-purple-50 p-3 rounded-md mb-3">
                  <p className="text-xs text-gray-700">
                    <span className="font-medium text-purple-700">What this means:</span> Developed a composite engagement score combining GA session duration, Platform Data feature use frequency, and GA interaction depth. This offered a better measure of true engagement, identifying power users and at-risk segments.
                  </p>
                </div>
                
                {/* Mini visualization placeholder */}
                <div className="pt-2 mt-auto border-t border-gray-100">
                  <div className="flex flex-col items-center justify-center h-16 text-xs text-gray-500">
                    <div className="flex justify-around items-center w-full max-w-[180px] text-purple-500">
                      <FaClock size={18} title="Session Duration"/>
                      <span className="text-xl font-light">+</span>
                      <FaMousePointer size={18} title="Feature Interactions"/>
                      <span className="text-xl font-light">+</span>
                      <FaListAlt size={18} title="Platform Data Event Completions"/>
                      <span className="text-xl font-light">→</span>
                      <FaTachometerAlt size={22} title="Engagement Score"/>
                    </div>
                    <p className="text-xs text-center text-gray-400 mt-1">Inputs to Engagement Score</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Method 4: Cohort-Based Retention & Stickiness Analysis */}
              <motion.div 
                className="bg-white p-4 rounded-lg shadow-md border-l-4 border-amber-500 h-full flex flex-col"
                whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(245, 159, 64, 0.15)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-start mb-2">
                  <div className="w-12 h-12 flex-shrink-0 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                    <FaChartLine size={24} className="text-amber-500" /> {/* Using FaChartLine as a general analysis icon */}
                  </div>
                  <div>
                    <h3 className="text-md font-semibold text-gray-800">Cohort-Based Retention & Stickiness Analysis</h3>
                    <p className="text-xs text-gray-500">Tracking user groups\' long-term engagement</p>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-3 flex-grow">
                  Conducted cohort analysis on key user segments to measure product stickiness (e.g., DAU/MAU ratios) and track long-term retention trends, identifying factors influencing sustained usage.
                </p>
                
                <div className="bg-amber-50 p-3 rounded-md mb-3">
                  <p className="text-xs text-gray-700">
                    <span className="font-medium text-amber-700">What this means:</span> Grouped users by start date (cohorts) and analyzed their activity over time. This showed retention and stickiness (DAU/MAU), revealing long-term UX impact and that specific Platform Data events boosted 90-day retention by 35%.
                  </p>
                </div>
                
                {/* Mini visualization placeholder */}
                <div className="pt-2 mt-auto border-t border-gray-100">
                  <div className="flex flex-col items-center justify-center h-16 text-xs text-gray-500">
                    <div className="w-full max-w-[150px] space-y-1">
                      <div className="flex items-center text-xs">
                        <span className="w-10 text-gray-500">Wk 1:</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2.5 shadow-inner"><div className="bg-amber-300 h-2.5 rounded-full" style={{ width: '90%' }}></div></div>
                      </div>
                      <div className="flex items-center text-xs">
                        <span className="w-10 text-gray-500">Wk 4:</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2.5 shadow-inner"><div className="bg-amber-400 h-2.5 rounded-full" style={{ width: '70%' }}></div></div>
                      </div>
                      <div className="flex items-center text-xs">
                        <span className="w-10 text-gray-500">Wk 12:</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2.5 shadow-inner"><div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '55%' }}></div></div> {/* Representing 35% higher retention might be more abstract, showing overall decline */}
                      </div>
                    </div>
                    <p className="text-xs text-center text-gray-400 mt-1">Cohort Retention Over Time</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Foundation for Process note - adapted from advisor360 */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-6 p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-300 text-sm text-gray-700"
            >
              <div className="flex items-start">
                <FaLink className="h-4 w-4 text-indigo-500 mr-2 flex-shrink-0 mt-0.5" />
                <p>
                  <span className="font-medium text-indigo-700">Foundation for Process:</span> The chosen analytical methods (Data Integration, Path Analysis, Custom Metrics, Cohort Analysis) were instrumental in executing our research process. They directly enabled the crucial stages of defining data requirements (leading to SQL Metric Building), uncovering user behaviors for insight generation, and ultimately informed the evidence-based dashboard design.
                </p>
              </div>
            </motion.div>
          </div>
          <DownArrowPrompt onClick={() => scrollToSection("process")} />
        </section>

        {/* SECTION: PROCESS */}
        <section
          ref={sectionRefs.process}
          id="process"
          className="xl:snap-start xl:h-screen flex flex-col justify-center items-center py-16 px-4 xl:py-10 xl:px-8 bg-gray-50 relative"
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
                Our systematic approach to implementing analytics and uncovering actionable insights
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
                className="absolute -z-10 top-0 right-0 w-64 h-64 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full blur-3xl opacity-30"
              />
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="absolute -z-10 bottom-0 left-0 w-64 h-64 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-full blur-3xl opacity-30"
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
                    "bg-white border-blue-200" // Adjusted for 5 steps, repeating pattern
                  } border`}>
                    {/* Front Side Content */}
                    <div className="p-3 h-full flex flex-col">
                      {/* Header with colored accent */}
                      <div className={`absolute top-0 left-0 right-0 h-2 ${
                        index === 0 ? "bg-indigo-500" :
                        index === 1 ? "bg-blue-500" :
                        index === 2 ? "bg-purple-500" :
                        index === 3 ? "bg-indigo-500" :
                        "bg-blue-500" // Adjusted for 5 steps
                      }`}></div>
                      
                      {/* Step Icon and Number */}
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
                            "bg-blue-500 hover:bg-blue-600" // Adjusted for 5 steps
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

        {/* SECTION: FINDINGS (Placeholder or custom text for GA) */}
        <section
          ref={sectionRefs.findings_insights}
          id="findings_insights"
          className="xl:snap-start min-h-screen flex flex-col justify-center items-center py-16 px-4 xl:py-8 xl:px-8 bg-gray-50 relative"
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
                Our analysis of 70+ million data points revealed these critical insights about user behavior
              </motion.p>
            </motion.div>
            
            {/* Stats Row */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Stat 1: User Stickiness (WAU/MAU) */}
              <motion.div 
                className="bg-white rounded-lg shadow-sm overflow-hidden"
                whileHover={{ y: -4, boxShadow: "0 12px 20px -5px rgba(59, 130, 246, 0.2)" }}
              >
                <div className="h-1.5 bg-blue-500 w-full"></div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-500">User Stickiness</span>
                    <span className="flex items-center text-blue-500">
                      <FaBullseye className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="flex items-baseline mt-1">
                    <span className="text-3xl font-bold text-blue-600">~80</span>
                    <span className="text-blue-400 ml-1">%</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">of monthly users active weekly</div>
                </div>
              </motion.div>
              
              {/* Stat 2: Engagement Growth */}
              <motion.div 
                className="bg-white rounded-lg shadow-sm overflow-hidden"
                whileHover={{ y: -4, boxShadow: "0 12px 20px -5px rgba(16, 185, 129, 0.2)" }}
              >
                <div className="h-1.5 bg-green-500 w-full"></div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-500">Engagement Growth</span>
                    <span className="flex items-center text-green-500">
                      <FaChartLine className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="flex items-baseline mt-1">
                    <span className="text-3xl font-bold text-green-600">+11</span>
                    <span className="text-green-400 ml-1">%</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">in median session scores (Q4)</div>
                </div>
              </motion.div>
              
              {/* Stat 3: Top User Action */}
              <motion.div 
                className="bg-white rounded-lg shadow-sm overflow-hidden"
                whileHover={{ y: -4, boxShadow: "0 12px 20px -5px rgba(139, 92, 246, 0.2)" }}
              >
                <div className="h-1.5 bg-purple-500 w-full"></div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-500">Top User Action</span>
                    <span className="flex items-center text-purple-500">
                      <FaMousePointer className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="flex items-baseline mt-1">
                    <span className="text-3xl font-bold text-purple-600">Clicks</span>
                    <span className="text-purple-400 ml-1">50.03%</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">of all session events</div>
                </div>
              </motion.div>
              
              {/* Stat 4: Analyst Time Saved */}
              <motion.div 
                className="bg-white rounded-lg shadow-sm overflow-hidden"
                whileHover={{ y: -4, boxShadow: "0 12px 20px -5px rgba(245, 158, 11, 0.2)" }}
              >
                <div className="h-1.5 bg-amber-500 w-full"></div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-500">Analyst Time Saved</span>
                    <span className="flex items-center text-amber-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                  </div>
                  <div className="flex items-baseline mt-1">
                    <span className="text-3xl font-bold text-amber-600">10+</span>
                    <span className="text-amber-400 ml-1">hrs/wk</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">in manual reporting</div>
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
              {/* User Flow Insights */}
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                  Platform Data Sequence Transition Analysis
                </h3>
                
                <p className="text-sm text-gray-600 mb-3">
                This pattern below suggests the dashboard serves as a primary launchpad for, and return point from, Platform Data-related tasks, underscoring its importance in the user workflow for these key activities.
                </p>
                
                {/* Mini flow diagram */}
                <div className="relative h-24 mb-3 flex items-center justify-around py-2 bg-gray-50 rounded-md border border-gray-200">
                  {/* Node 1: Before */}
                  <div className="flex flex-col items-center text-center w-1/3 px-1">
                    <div className="text-xs text-gray-500 mb-0.5 leading-tight">Before Sequence</div>
                    <div className="h-7 w-7 rounded-full bg-blue-100 flex items-center justify-center z-10 mb-0.5 text-blue-500 shadow-sm">
                      <FaArrowDown size={14}/>
                    </div>
                    <div className="text-xs font-semibold text-blue-600 leading-tight">Dashboard</div>
                    <div className="text-xs text-gray-700 font-bold">49.24%</div>
                  </div>

                  {/* Arrow */}
                  <div className="text-blue-400 text-2xl font-light self-center transform -translate-y-1">→</div>

                  {/* Node 2: Platform Data Sequence */}
                  <div className="flex flex-col items-center text-center w-1/3 px-1">
                    <div className="text-xs text-gray-500 mb-0.5 leading-tight">Core Activity</div>
                    <div className="h-9 w-9 rounded-lg bg-blue-500 text-white flex items-center justify-center z-10 mb-0.5 shadow-md">
                      <FaConnectdevelop size={18} />
                    </div>
                    <div className="text-xs font-semibold text-blue-700 leading-tight">Platform Data Sequence</div>
                  </div>

                  {/* Arrow */}
                  <div className="text-blue-400 text-2xl font-light self-center transform -translate-y-1">→</div>

                  {/* Node 3: After */}
                  <div className="flex flex-col items-center text-center w-1/3 px-1">
                    <div className="text-xs text-gray-500 mb-0.5 leading-tight">After Sequence</div>
                    <div className="h-7 w-7 rounded-full bg-blue-100 flex items-center justify-center z-10 mb-0.5 text-blue-500 shadow-sm">
                       <FaArrowUp size={14}/>
                    </div>
                    <div className="text-xs font-semibold text-blue-600 leading-tight">Dashboard</div>
                    <div className="text-xs text-gray-700 font-bold">42.06%</div>
                  </div>
                </div>
                <div className="flex justify-around text-xs text-gray-500 mt-1 px-2">
                  <span>Entry: Dashboard</span>
                  <span className="font-semibold text-blue-500">&rarr;</span>
                  <span>Platform Data Sequence</span>
                  <span className="font-semibold text-blue-500">&rarr;</span>
                  <span>Return: Dashboard</span>
                </div>
              </div>
              
              {/* Engagement Analysis */}
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  Engagement Trend Analysis
                </h3>
                
                <p className="text-sm text-gray-600 mb-3">
                  Analysis of median 'Whole Session Engagement Scores' indicated a positive growth in engagement, suggesting increased user acclimatization and value derived from the platform of nearly <span className="font-medium text-green-600">11%</span>.
                </p>
                
                {/* Mini chart */}
                <div className="bg-gray-50 p-3 rounded-lg mb-3">
                  <div className="flex justify-around items-center text-center">
                    <div>
                      <p className="text-xs text-gray-500">Early Oct '24</p>
                      <p className="text-2xl font-bold text-green-500">24.94</p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500 shrink-0 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    <div>
                      <p className="text-xs text-gray-500">Late Dec '24</p>
                      <p className="text-2xl font-bold text-green-600">27.64</p>
                    </div>
                  </div>
                  <p className="text-center text-xs text-green-700 mt-2">Median Whole Session Engagement Score</p>
                </div>
                <div className="flex justify-center space-x-2 text-xs text-gray-500 mt-1">
                  <span>Oct Score: 24.94</span>
                  <span className="font-semibold text-green-500">&rarr;</span>
                  <span>Dec Score: 27.64</span>
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
              {/* Dominant User Interactions */}
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                  <div className="h-6 w-6 rounded-full bg-teal-100 flex items-center justify-center mr-2">
                    <FaMousePointer className="h-4 w-4 text-teal-600" />
                  </div>
                  Dominant User Interactions
                </h3>
                
                <p className="text-sm text-gray-600 mb-2">
                  Analysis of over <span className="font-medium text-teal-600">23.2 million</span> session events highlights core user interaction patterns. This data signifies a highly engaged user base actively navigating content and interacting with page elements, forming the foundational layer of user experience on the platform.
                </p>
                
                {/* Session event breakdown chart */}
                <div className="space-y-1.5 mb-2">
                  {[
                    { label: "Internal Clicks", value: 50.03, color: "bg-teal-500" },
                    { label: "Page Views", value: 26.15, color: "bg-teal-400" },
                    { label: "Scroll Actions", value: 10.55, color: "bg-teal-300" },
                  ].map(event => (
                    <div key={event.label} className="flex items-center">
                      <div className="w-28 text-xs text-gray-600 text-right pr-2 shrink-0">{event.label}</div>
                      <div className="flex-1 h-5 bg-gray-100 rounded overflow-hidden shadow-inner">
                        <div 
                          className={`h-full ${event.color} rounded-l flex items-center justify-end pr-1`} 
                          style={{width: `${event.value}%`}}
                        >
                          <span className="text-white text-[10px] font-medium">{event.value.toFixed(2)}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
              
              {/* Data Integration Impact */}
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                  <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </div>
                  Streamlined Reporting & Efficiency Gains
                </h3>
                
                <p className="text-sm text-gray-600 mb-2">
                  Integrating multiple data systems into a unified dashboard saved analysts <span className="font-medium text-amber-600">10+ hours weekly</span> by eliminating manual report compilation from disparate sources. This streamlined workflow significantly boosted efficiency and contributed to <span className="font-medium text-amber-600">$312,000 in annual operational savings</span>.
                </p>
                
                {/* Before/After diagram */}
                <div className="flex items-stretch space-x-4 mb-2">
                  <div className="flex-1">
                    <div className="text-xs text-gray-500 mb-1 text-center">Before Integration</div>
                    <div className="h-16 rounded-lg border border-gray-200 flex items-center justify-center bg-gray-50 relative">
                      <div className="grid grid-cols-3 gap-1 w-full px-2">
                        <div className="h-8 bg-amber-100 rounded"></div>
                        <div className="h-8 bg-amber-100 rounded"></div>
                        <div className="h-8 bg-amber-100 rounded"></div>
                      </div>
                      <div className="absolute inset-x-0 top-1/2 h-0.5 bg-gray-200 z-0"></div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-500 mb-1 text-center">After Integration</div>
                    <div className="h-16 rounded-lg border border-gray-200 flex items-center justify-center bg-gray-50">
                      <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center">
                        <div className="w-6 h-6 bg-amber-400 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between text-xs text-gray-500">
                  <div>3 separate systems</div>
                  <div>Unified data model</div>
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
                    Leveraging integrated GA and Platform Data data provided deep insights into user behavior. Key achievements include an <span className="font-bold text-white">~11% increase in median user engagement scores (Q4)</span> and a reduction of <span className="font-bold text-white">10+ hours per week</span> in manual analytics preparation time.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
          <DownArrowPrompt onClick={() => scrollToSection("impact_outcomes")} />
        </section>

        {/* SECTION: IMPACT & OUTCOMES (populated from projectDetails.impact_outcomes) */}
        <section
          ref={sectionRefs.impact_outcomes}
          id="impact_outcomes"
          className="xl:snap-start xl:h-screen flex flex-col justify-center items-center py-16 px-4 xl:py-10 xl:px-8 bg-gray-50 relative"
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
              How our analytics integration transformed raw data into actionable business intelligence and measurable results
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
                  <h3 className="text-lg font-bold text-gray-800 mb-2 text-center mt-2">Data Insights</h3>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">Tracked engagement growth (~11% increase in Q4 median scores).</p>
                    </div>
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">Identified dominant user actions (clicks, views, scrolls).</p>
                    </div>
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">Unified dashboard visualizations revealed critical Platform Data interaction patterns.</p>
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
                      <p className="text-sm text-gray-600">Redesigned user flows based on behavioral analytics</p>
                    </div>
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">Developed custom engagement metrics for deeper behavioral understanding.</p>
                    </div>
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">Created automated data visualization dashboards for teams</p>
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
                      <p className="text-sm text-gray-600">Improved understanding of user engagement and stickiness.</p>
                    </div>
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-purple-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">Enabled data-informed UX and product strategy decisions.</p>
                    </div>
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-purple-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">Increased team adoption of data for informed actions.</p>
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
                {/* Card 1: Strengthened User Retention */}
                <div className="bg-white p-4 rounded-lg shadow-sm border-t-4 border-blue-400">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-800">Strengthened User Retention</h3>
                    <FaUsers className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="flex items-end mb-2">
                    <span className="text-3xl font-bold text-blue-600">~+34pt</span>
                    <span className="text-sm text-gray-500 ml-2 mb-1">Growth in Returning Daily Users</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    The proportion of daily active users who were returning users grew significantly from ~28% to ~62% over Q4.
                  </p>
                </div>
                
                {/* Card 2: Elevated Platform Engagement */}
                <div className="bg-white p-4 rounded-lg shadow-sm border-t-4 border-teal-400">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-800">Elevated Platform Engagement</h3>
                    <FaChartLine className="h-6 w-6 text-teal-500" />
                  </div>
                  <div className="flex items-end mb-2">
                    <span className="text-3xl font-bold text-teal-600">~+11%</span>
                    <span className="text-sm text-gray-500 ml-2 mb-1">Median Session Score Increase</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Observed in Q4, indicating improved user acclimatization and perceived platform value.
                  </p>
                </div>
                
                {/* Card 3: Time Efficiency Card Updated (Remains as is from previous step) */}
                <div className="bg-white p-4 rounded-lg shadow-sm border-t-4 border-amber-400">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-800">Time Efficiency</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex items-end mb-2">
                    <span className="text-3xl font-bold text-amber-600">10+ hrs</span>
                    <span className="text-sm text-gray-500 ml-2 mb-1">saved weekly</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    By analysts due to unified dashboard, eliminating manual data compilation.
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
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">Analytics Transformation</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <h4 className="text-md font-semibold text-gray-700 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Before Integration
                    </h4>
                <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-red-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-600">10+ hours per week manually gathering analytics</p>
                    </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-red-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-600">Data silos between marketing and product teams</p>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-red-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-600">Only 19% of decisions backed by user data</p>
                      </li>
                </ul>
              </div>
              
                  <div className="space-y-2">
                    <h4 className="text-md font-semibold text-gray-700 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      After Integration
                    </h4>
                <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-600">93% of analytics work automated through dashboards</p>
                    </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-600">Unified data platform accessible to all teams</p>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-600">87% of key decisions now data-informed</p>
                      </li>
                </ul>
                  </div>
                </div>
                
                {/* Mini chart showing improvement */}
                <div className="mt-4 h-12 relative">
                  <div className="absolute inset-x-0 bottom-0 h-6 bg-gray-100 rounded-md overflow-hidden">
                    <div className="h-full bg-green-500 rounded-l" style={{width: "83%"}}>
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">83% improvement in actionable insights</span>
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
          className="xl:snap-start min-h-screen flex flex-col justify-start items-center py-16 px-4 xl:py-4 xl:px-8 relative"
        >
          <motion.div
            className="max-w-5xl mx-auto w-full text-center mb-3 pt-14"
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

// Add custom scrollbar styles if not already present
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

// Make sure to add this style in the return statement, just after the <ScrollProgress /> component
// <style jsx global>{customScrollbarStyles}</style>

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
  
  // Define bullet point icons for explanations (more descriptive for gallery context)
  const bulletIcons = [
    { 
      icon: <FaEye className="text-blue-500" size={16} />, // text-blue-500 will be overridden by dynamic colorSet
      tooltip: "Observation: Key things to notice in this visual."
    },
    { 
      icon: <FaChartLine className="text-purple-500" size={16} />, // text-purple-500 will be overridden
      tooltip: "Analysis: How to interpret the data or elements shown."
    },
    { 
      icon: <FaLightbulb className="text-amber-500" size={16} />, // text-amber-500 will be overridden
      tooltip: "Insight: The significance or takeaway from this visual."
    }
  ];

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    resetZoom(); // Reset zoom when changing image
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    resetZoom(); // Reset zoom when changing image
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
    if (modalZoom <= 1) return; // Only pan if zoomed
    e.preventDefault();
    e.stopPropagation();
    setIsPanning(true);
    setStartPanPosition({
      x: e.clientX || (e.touches && e.touches[0].clientX) || 0,
      y: e.clientY || (e.touches && e.touches[0].clientY) || 0
    });
  };

  const doPan = (e) => {
    if (!isPanning || modalZoom <= 1) return;
    e.preventDefault();
    e.stopPropagation();
    
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    
    const deltaX = clientX - startPanPosition.x;
    const deltaY = clientY - startPanPosition.y;
    
    setPanPosition(prev => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY
    }));
    
    setStartPanPosition({
      x: clientX,
      y: clientY
    });
  };

  const endPan = (e) => {
    if (modalZoom <= 1) return;
    e.stopPropagation();
    setIsPanning(false);
  };

  const openModal = () => {
    setModalOpen(true);
    resetZoom();
  };

  const closeModal = (e) => {
    if (e) e.stopPropagation(); // Prevent event bubbling if needed
    setModalOpen(false);
  };

  const onTouchStart = (e) => {
    if (modalZoom > 1) { // If zoomed, use for panning
      startPan(e);
      return;
    }
    // For swipe navigation
    const touchDown = e.touches[0].clientX;
    setTouchStart(touchDown);
    setTouchEnd(null); // Reset touchEnd
  };

  const onTouchMove = (e) => {
    if (modalZoom > 1) { // If zoomed, use for panning
      doPan(e);
      return;
    }
    // For swipe navigation
    const touchDown = touchStart;
    if (touchDown === null) return;
    
    const currentTouch = e.touches[0].clientX;
    setTouchEnd(currentTouch); // Store current touch for end decision
  };

  const onTouchEnd = () => {
    if (modalZoom > 1) { // If zoomed, end panning
      endPan();
      return;
    }
    // For swipe navigation
    if (touchStart === null || touchEnd === null) return;
    
    const diff = touchStart - touchEnd;
    const threshold = 50; // Min swipe distance
    
    if (diff > threshold) { // Swiped left
      nextImage();
    } else if (diff < -threshold) { // Swiped right
      prevImage();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  useEffect(() => {
    if (!modalOpen) return;
    
    const handleKeyDown = (e) => {
      e.stopPropagation(); // Stop event from propagating to other handlers
      switch (e.key) {
        case 'ArrowLeft':
          if (modalZoom <=1) prevImage(); // Navigate only if not zoomed
          break;
        case 'ArrowRight':
          if (modalZoom <=1) nextImage(); // Navigate only if not zoomed
          break;
        case 'Escape':
          closeModal(e);
          break;
        case '+':
        case '=': // Handle both + and = for zoom in
          e.preventDefault(); // Prevent page zoom
          zoomIn(e);
          break;
        case '-':
          e.preventDefault(); // Prevent page zoom
          zoomOut(e);
          break;
        case '0':
          e.preventDefault();
          resetZoom(e);
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen, currentIndex, modalZoom, images.length]); // Add dependencies

  // Effect to handle body scroll lock when modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
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
                const iconDetail = bulletIcons[idx % bulletIcons.length];
                const IconComponent = iconDetail.icon; // This will be the JSX element e.g. <FaEye .../>
                
                const colors = [
                  { bg: "bg-indigo-50", border: "border-indigo-200", text: "text-indigo-700", iconColor: "text-indigo-500" },
                  { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", iconColor: "text-blue-500" },
                  { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700", iconColor: "text-purple-500" }
                ];
                const colorSet = colors[idx % colors.length];
                
                return (
                  <div 
                    key={idx} 
                    className={`flex items-start p-2 rounded-lg ${colorSet.bg} border ${colorSet.border} shadow-sm flex-1`}
                    style={{ maxWidth: "32%", minWidth: "200px" }}
                    title={iconDetail.tooltip}
                  >
                    <div className={`flex-shrink-0 mr-2 mt-0.5 ${colorSet.iconColor}`}>
                      {IconComponent}
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
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
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
              title="View full screen"
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
                  priority={currentIndex === 0} // Prioritize first image
                />
              </div>
            </div>
          </div>
          
          {/* Right arrow */}
          <motion.button 
            onClick={nextImage}
            className="flex-shrink-0 p-1 text-indigo-700 hover:text-indigo-900 focus:outline-none z-10"
            aria-label="Next image"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
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
                  className={`w-2 h-2 rounded-full transition-all ${currentIndex === index ? 'bg-indigo-600 scale-110' : 'bg-gray-300 hover:bg-gray-400'}`}
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
            className="fixed inset-0 bg-black bg-opacity-90 z-[100] flex items-center justify-center" // Increased z-index
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal} // Click on backdrop closes modal
          >
            <div className="absolute top-4 right-4 z-[120]"> {/* Ensure close button is above content */}
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
              onClick={(e) => e.stopPropagation()} // Prevent modal content click from closing modal
            >
              {/* Title and bullet points above the image - only if not zoomed significantly */}
              {modalZoom <= 1.1 && ( // Show info if zoom is near 100%
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
                          const iconDetail = bulletIcons[idx % bulletIcons.length];
                          const IconComponent = iconDetail.icon;
                          const modalColors = [
                            { bg: "from-indigo-600/90 to-indigo-700/90", iconColor: "text-indigo-300" },
                            { bg: "from-blue-600/90 to-blue-700/90", iconColor: "text-blue-300" },
                            { bg: "from-purple-600/90 to-purple-700/90", iconColor: "text-purple-300" }
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
                              title={iconDetail.tooltip}
                            >
                              <div className={`flex-shrink-0 mr-2 w-5 h-5 flex items-center justify-center bg-white/10 rounded-full shadow-inner ${colorSet.iconColor}`}>
                                {IconComponent}
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

              <div className="flex items-center justify-center w-full relative z-[110]"> {/* Ensure controls are above image container logic */}
                {modalZoom <= 1 && (
                  <motion.button 
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-0 top-1/2 -translate-y-1/2 flex-shrink-0 ml-2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-2.5 rounded-full shadow-lg z-30"
                    aria-label="Previous image"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaArrowLeft size={20} />
                  </motion.button>
                )}

                <div 
                  className="relative modal-image-container" 
                  style={{ 
                    width: modalZoom <=1 ? 'calc(100% - 100px)' : '100%', 
                    height: '74vh', 
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                    <div 
                    className={`${modalZoom > 1 ? 'cursor-grab active:cursor-grabbing' : ''} ${isPanning ? '' : 'transition-transform duration-200'} w-full h-full flex items-center justify-center`} 
                      style={{ 
                        transform: `scale(${modalZoom}) translate(${panPosition.x / modalZoom}px, ${panPosition.y / modalZoom}px)`,
                        transformOrigin: 'center center',
                      }}
                      onMouseDown={startPan}
                      onMouseMove={doPan}
                      onMouseUp={endPan}
                    onMouseLeave={endPan} // End pan if mouse leaves image area
                      onTouchStart={onTouchStart}
                      onTouchMove={onTouchMove}
                      onTouchEnd={onTouchEnd}
                    >
                      <Image 
                        src={currentImage.src} 
                        alt={currentImage.caption}
                      width={2200} // Larger intrinsic size for better quality when zoomed
                        height={1600}
                      className="w-auto h-auto object-contain select-none" // Allow image to scale within its container
                      style={{ maxWidth: "100%", maxHeight: "100%" }}
                        priority={true}
                        draggable="false"
                        onDragStart={(e) => e.preventDefault()}
                      />
                    </div>
                    
                    <div className="absolute right-3 top-3 z-30 flex flex-col space-y-1.5">
                      <button 
                        onClick={zoomIn}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-1 w-7 h-7 flex items-center justify-center shadow-lg transition-colors"
                      aria-label="Zoom in" title="Zoom In (+)"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                      <button 
                        onClick={zoomOut}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-1 w-7 h-7 flex items-center justify-center shadow-lg transition-colors"
                      aria-label="Zoom out" title="Zoom Out (-)"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                        </svg>
                      </button>
                      <button 
                        onClick={resetZoom}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-1 w-7 h-7 flex items-center justify-center shadow-lg transition-colors"
                      aria-label="Reset zoom" title="Reset Zoom (0)"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </button>
                  </div>
                </div>

                {modalZoom <= 1 && (
                  <motion.button 
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 flex-shrink-0 mr-2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-2.5 rounded-full shadow-lg z-30"
                    aria-label="Next image"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaArrowRight size={20} />
                  </motion.button>
                )}
              </div>

              <motion.div 
                className="w-full flex flex-col items-center mt-2 z-[110]" // Ensure this is also above potential image overlap
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-white bg-black bg-opacity-50 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-xs shadow-lg mb-1.5">
                  <span>Zoom: {(modalZoom * 100).toFixed(0)}%</span>
                  {modalZoom > 1 && (
                    <span className="ml-2 text-yellow-300">• Click backdrop or Esc to close</span>
                  )}
                </div>
                
                {modalZoom <= 1 && ( // Show dots only if not zoomed
                <div className="flex bg-black bg-opacity-50 backdrop-blur-sm px-3 py-1.5 rounded-full items-center shadow-lg">
                  <div className="text-white text-sm font-medium mr-3">
                    {currentIndex + 1} of {images.length}
                  </div>
                  
                  <div className="flex space-x-1.5">
                    {images.map((_, index) => (
                      <button
                        key={index}
                          onClick={(e) => { e.stopPropagation(); setCurrentIndex(index); resetZoom(); }} // Reset zoom when clicking dot
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-white scale-110' : 'bg-gray-500 hover:bg-white/70'}`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}