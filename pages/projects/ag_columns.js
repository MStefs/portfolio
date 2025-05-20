import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  FaChevronDown, 
  FaEye, 
  FaChartLine, 
  FaLightbulb, 
  FaArrowLeft, 
  FaArrowRight,
  FaExchangeAlt,
  FaExpand, 
  FaTimes, 
  FaChartBar,
  FaSitemap,
  FaUserCheck, 
  FaLink, 
  FaTags, 
  FaQuestionCircle, 
  FaUsersCog, 
  FaConnectdevelop, 
  FaClipboardList, 
  FaBullseye, 
  FaSearch, 
  FaSearchMinus,
  FaCheck,
  FaArrowUp,
  FaUsers, FaSmile, FaMeh, FaFrown, FaPuzzlePiece, FaCogs,
  FaRobot, FaBrain
} from "react-icons/fa";
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
    
    // Initial calculation
    handleScroll();
    
    // Throttle scroll events to reduce updates
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
  }, []); // Empty dependency array to run only once
  
  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50">
      <div 
        className="h-full bg-indigo-600" 
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}

/* --- BULLET ICONS (Standardized) --- */
const bulletIcons = [
  { icon: <FaEye className="text-blue-500" />, tooltip: "Observation" },
  { icon: <FaChartLine className="text-purple-500" />, tooltip: "Analysis" },
  { icon: <FaLightbulb className="text-amber-500" />, tooltip: "Insight" }
];

/* --- PROJECT DETAILS --- */
const projectDetails = {
  title: "Column Usage Behavior Analysis",
  subtitle: "Impact of Customizable Columns on User Behavior",
  brief: `
    A comprehensive analysis of column usage patterns in the "Account and Groups" 
    trading tab before and after introducing new customizable columns, with statistical 
    analysis of adoption rates and behavioral changes.
  `,
  overview: `
    This quantitative UX research analyzed financial advisor interactions with customizable data columns (approx. 1000 user sessions) in a trading platform. By statistically comparing pre and post-feature delivery data, the study identified significant shifts in column usage, saved view creation (788% increase), and information hierarchy, providing actionable insights for optimizing the platform's information architecture and improving user workflow efficiency.
  `,
  problem_statement_intro: "Financial advisors were drowning in data. The trading platform presented a vast array of columns, but this often led to information overload, hampering quick decision-making and efficient workflow management. The existing system lacked the flexibility to easily tailor data views to specific analytical needs.",
  challenge_areas: [
    {
      title: "Data Overwhelm",
      iconName: "FaChartBar",
      initialText: "Too many columns, too little clarity?",
      details: "Advisors struggled to manage and interpret over 50+ potential data columns, making it difficult to isolate critical information quickly."
    },
    {
      title: "Inefficient Workflows",
      iconName: "FaExchangeAlt",
      initialText: "Was column setup a time sink?",
      details: "Default column layouts were often suboptimal, forcing users into repetitive manual adjustments and slowing down analysis (avg. 24+ mins/session)."
    },
    {
      title: "Lack of Personalization",
      iconName: "FaSitemap",
      initialText: "Could users truly make the view 'theirs'?",
      details: "Limited and cumbersome customization meant users couldn't easily save or switch between tailored views for different tasks, with only 22% using saved configurations."
    }
  ],
  state_before_insight: {
    gap: {
      title: "Impact of Inflexibility",
      iconName: "FaSearchMinus",
      points: [
        "Time wasted on manual column setup.",
        "Increased risk of missing critical data points.",
        "Frustration due to rigid, non-intuitive interface.",
        "Inability to efficiently switch between analytical views."
      ]
    },
    research_goals: {
      title: "Our Research Aimed To:",
      iconName: "FaUserCheck",
      points: [
        "Quantify time spent on column configuration.",
        "Identify most valuable columns for key advisor tasks.",
        "Understand user needs for personalized data views.",
        "Lay groundwork for an intelligent column management system."
      ]
    }
  },
  challenge_quote: {
    text: "I spend way too much time setting up my columns for different types of analysis. It feels like I'm constantly rearranging data instead of analyzing it.",
    source: "Financial Advisor, Boston"
  },
  challenge_conclusion: {
    title: "The Quest for Clarity and Control",
    text: "The challenge was clear: empower advisors by transforming data display from a rigid structure into a flexible, personalized tool. This research aimed to understand their core needs to build a system that surfaces the right data at the right time, effortlessly."
  },
  duration: "Q4 2024 - Q1 2025",
  team: ["UX Researcher (Me)", "Product Manager", "Product Strategist", "Senior Product Manager", "UX/UI Designer"],
  myRole: "As Lead UX Researcher, I spearheaded the quantitative analysis of column usage, applying statistical methods (e.g., t-tests, correlation analysis) to uncover behavioral shifts and deliver data-driven recommendations for UI optimization and feature enhancement.",
  
  research_question_categories: [
    {
      category_title: "Understanding User Adaptation & Behavior",
      iconName: "FaUsersCog",
      objective: "To analyze how the introduction of customizable columns shifted user interaction patterns and column usage.",
      questions: [
        "How did the introduction of customizable columns affect overall user behavior and workflow efficiency?",
        "Which specific columns saw the most significant changes in usage frequency (increase/decrease) post-customization?",
        "What were the key differences in column interaction patterns (e.g., sorting, visibility) before and after the feature update?"
      ]
    },
    {
      category_title: "Investigating Customization & Configuration Patterns",
      iconName: "FaSitemap",
      objective: "To identify common patterns in how users created and utilized saved column templates and configured their views.",
      questions: [
        "What patterns emerged in the creation and usage of saved column templates (e.g., common column groupings, naming conventions)?",
        "How did the visibility and prioritization of specific columns change within user-customized views?",
        "What correlations were observed between different types of columns being used together in custom configurations?"
      ]
    },
    {
      category_title: "Informing Design & Optimization Strategies",
      iconName: "FaLightbulb",
      objective: "To translate behavioral insights into actionable recommendations for improving default settings and future enhancements.",
      questions: [
        "How can insights into frequent column combinations and saved templates inform better default column arrangements?",
        "What are the actionable design implications for improving the discoverability and usability of less-utilized but potentially valuable columns?",
        "Based on observed behaviors, what future enhancements or new features could further optimize the column customization experience?"
      ]
    }
  ],
  research_questions_intro: "We aimed to understand how financial advisors actually use columns in their daily workflows to optimize the information architecture and improve the overall user experience with data presentation.",
  research_questions_conclusion: {
    title: "Guiding Principles: From User Behavior to Optimized Design",
    text: "These research questions were strategically formulated to bridge the gap between observing raw user behavior with customizable columns and deriving actionable design principles. By dissecting how users adapted to, configured, and valued different data points, we aimed to establish an empirical basis for refining the platform's information architecture. The answers to these questions directly informed the quantitative usage analysis, comparative behavioral studies, and pattern mining methods employed, ensuring that our subsequent research efforts were laser-focused on creating a more intuitive and efficient user experience.",
    iconName: "FaConnectdevelop"
  },
  
  methods: [
    {
      name: "Quantitative Usage Analysis",
      description: "Analysis of approximately 1000 user sessions, focusing on column visibility, interaction frequency (e.g., sorting, filtering), and configuration patterns within the trading platform's 'Account and Groups' tab.",
      icon: FaChartBar,
      color: "blue",
      subtitle: "Tracking Column Interactions at Scale",
      revealed: "This large-scale analysis provided a clear picture of which columns advisors used most, ignored, or struggled with, forming the basis for data-driven UI improvements."
    },
    {
      name: "Comparative Behavioral Analysis (Pre/Post Feature)",
      description: "Statistical comparison (t-tests) of column usage metrics (M=79.3 to M=67.2) before and after the introduction of customizable columns, demonstrating a significant shift (p=.001) in user interaction patterns.",
      icon: FaExchangeAlt,
      color: "green",
      subtitle: "Pre/Post Customizable Column Feature",
      revealed: "By comparing behavior, we precisely measured the impact of the new customization feature, confirming users were adapting workflows and identifying where adoption was strongest."
    },
    {
      name: "Column Configuration Pattern Mining",
      description: "Identification of frequently co-occurring columns in user-saved views through correlation analysis, revealing common information grouping strategies and workflow-specific data needs.",
      icon: FaSitemap,
      color: "purple",
      subtitle: "Discovering Common User Setups",
      revealed: "This helped us understand *how* advisors organized their information, uncovering natural data relationships that could inform better default layouts and template suggestions."
    },
    {
      name: "New Feature Adoption & Engagement Tracking",
      description: "Measuring the adoption rate of newly introduced columns (e.g., 'SWP Amount' at 29%) and the overall engagement with customization features, evidenced by a 788% increase in saved view creation.",
      icon: FaUsersCog,
      color: "amber",
      subtitle: "Measuring Impact of New Columns",
      revealed: "Quantified the success of new features and the general appetite for customization, highlighting which additions were most impactful and where further user education might be needed."
    }
  ],
  
  key_insights: [
    {
      title: "Significant Shift in Original Column Usage",
      description: "Statistical analysis (t-test) revealed a medium but significant decrease in original column usage following new delivery, from M=79.3 to M=67.2 (p = .001).",
      recommendation: "Consider the reduced usage of original columns when designing future interfaces."
    },
    {
      title: "Selective Adoption of New Columns",
      description: "Data showed selective adoption with no new column visible consistently in more than 29% of saved views, with SWP Amount being the most used new column.",
      recommendation: "Focus marketing and education efforts on high-value but under-utilized columns."
    },
    {
      title: "Language Consistency Matters",
      description: "Columns with aligned naming conventions showed higher correlation in usage patterns, particularly among PIP, SWP, and G/L related fields.",
      recommendation: "Standardize terminology across related features to enhance usability."
    }
  ],
  
  process: [
    {
      title: "Data Exploration",
      description: "Examined column visibility data and established baseline metrics for column usage before the introduction of customizable columns."
    },
    {
      title: "Usage Pattern Analysis", 
      description: "Applied statistical analysis to identify which columns were most frequently viewed and which data points were most valuable to advisors."
    },
    {
      title: "Correlation Mapping",
      description: "Identified relationships between column selections and developed analysis based on usage patterns."
    },
    {
      title: "Template Analysis",
      description: "Analyzed how users created and organized saved column templates to understand their information hierarchy preferences."
    },
    {
      title: "Insight Development",
      description: "Transformed statistical findings into actionable insights about information architecture preferences and usage patterns."
    },
    {
      title: "Recommendations",
      description: "Developed optimization recommendations for default column settings and template designs based on actual usage data."
    }
  ],
  
  key_findings: [
    {
      title: "Increased Engagement with View Capabilities",
      description: "The data demonstrates a significant increase in the rate of saved views following the delivery of new view capabilities, from 1.8 to 14.2 saved views per week."
    },
    {
      title: "Reduced Usage of Original Columns",
      description: "Statistical analysis showed a significant decrease in original column usage after new columns were introduced, from M = 79.3 to M = 67.2, t(19) = 4.2, p = .001."
    },
    {
      title: "Selective Adoption of New Columns",
      description: "Data revealed that no new column was visible consistently in more than 29% of saved views, with highest usage for SWP Amount (29%) and lowest for Est Tax Rate (4%)."
    },
    {
      title: "Terminology and Usage Correlation",
      description: "Columns with similar terminology (e.g., PIP, SWP, G/L, Drift) were more frequently used together, indicating the importance of consistent naming conventions."
    }
  ],
  
  impact: {
    business: "Identified specific column naming patterns that drive adoption, enabling strategic decisions about future feature development and default settings.",
    users: "Revealed opportunities to improve column arrangements that better match actual usage patterns, potentially reducing cognitive load for financial advisors.",
    process: "Established a data-driven methodology for evaluating feature adoption that combines quantitative metrics with usage pattern analysis."
  },
  
  challenges: [
    "Understanding complex relationships between column selections without direct user feedback",
    "Distinguishing between correlation and causation in column usage patterns",
    "Identifying whether low adoption of certain columns indicated poor design or genuinely low need"
  ],

  takeaways: [
    "Consistent terminology significantly impacts how features are used together",
    "Default arrangements remain highly influential on user behavior, with original columns still forming the primary usage cluster",
    "Saved view creation increased dramatically (from 1.8 to 14.2 per week) after new feature delivery, indicating strong engagement with customization capabilities"
  ],
  
  next_steps: [
    "Conduct user surveys to gain qualitative insights into reasons behind column selection patterns",
    "Integrate quantitative column usage data with qualitative feedback for a holistic understanding",
    "Identify specific barriers to adoption for lower-used columns",
    "Enhance user engagement through targeted feature improvements and clearer communication"
  ],
  
  recommendations: [
    "Consolidate column categories based on usage patterns to simplify the interface",
    "Enhance onboarding for new columns with guided tours highlighting high-value but under-utilized columns",
    "Standardize terminology across related features to improve discoverability and usage",
    "Optimize default column settings based on identified user preferences",
    "Implement a suggestion system for related columns based on correlation analysis"
  ],
  
  images: [
    {
      caption: "Research Objectives Overview",
      src: "/images/accountscolumns/ac1.png",
      points: [
        "Outlines the research framework for evaluating impact of platform deliveries on user workflows.",
        "Defines both quantitative and qualitative research approaches for column usage analysis.",
        "Establishes methodology for integrating insights to understand user adoption behavior."
      ]
    },
    {
      caption: "Key Research Findings",
      src: "/images/accountscolumns/ac2.png",
      points: [
        "Illustrates how new platform features influenced column usage patterns and behaviors.",
        "Highlights the adoption patterns showing both engagement and potential barriers.",
        "Presents actionable insights for improving feature design based on terminology patterns."
      ]
    },
    {
      caption: "Column Usage Metrics (1 of 2)",
      src: "/images/accountscolumns/ac3.png",
      points: [
        "Shows significant increase in saved views (14.2 vs 1.8 per week) after new capabilities.",
        "Reveals statistical decrease in original column usage (M = 67.2 vs M = 79.3).",
        "Displays adoption metrics for new columns with SWP Amount having highest usage at 29%."
      ]
    },
    {
      caption: "Column Visibility Before vs After",
      src: "/images/accountscolumns/ac4.jpg",
      points: [
        "Detailed comparison of column visibility metrics before and after feature delivery.",
        "Shows repositioning of columns in the interface with changing visibility percentages.",
        "Reveals shifts in column priorities with some gaining prominence while others declining."
      ]
    },
    {
      caption: "Saved Views Temporal Analysis",
      src: "/images/accountscolumns/ac5.jpg",
      points: [
        "Tracks saved view creation over time showing initial spike due to data migration.",
        "Demonstrates consistent usage patterns following the initial adoption period.",
        "Provides insight into user engagement with the view customization feature over time."
      ]
    },
    {
      caption: "Column Correlation Analysis",
      src: "/images/accountscolumns/ac6.png",
      points: [
        "Reveals language consistency matters with correlated usage of similarly named columns.",
        "Shows unexpected correlations between columns with non-similar terminology.",
        "Demonstrates persistent patterns in original column usage despite new options."
      ]
    },
    {
      caption: "Research Conclusions and Next Steps",
      src: "/images/accountscolumns/ac7.png",
      points: [
        "Summarizes key findings and recommends further research needed for comprehensive understanding.",
        "Outlines action plan including user surveys and integration of qualitative and quantitative data.",
        "Proposes strategies to enhance user engagement and monitor ongoing effectiveness."
      ]
    }
  ],
  
  findings: [
    {
      title: "Increased Engagement with View Capabilities",
      description: "The data demonstrates a significant increase in the rate of saved views following the delivery of new view capabilities, from 1.8 to 14.2 saved views per week."
    },
    {
      title: "Reduced Usage of Original Columns",
      description: "Statistical analysis showed a significant decrease in original column usage after new columns were introduced, from M = 79.3 to M = 67.2, t(19) = 4.2, p = .001."
    },
    {
      title: "Selective Adoption of New Columns",
      description: "Data revealed that no new column was visible consistently in more than 29% of saved views, with highest usage for SWP Amount (29%) and lowest for Est Tax Rate (4%)."
    },
    {
      title: "Terminology and Usage Correlation",
      description: "Columns with similar terminology (e.g., PIP, SWP, G/L, Drift) were more frequently used together, indicating the importance of consistent naming conventions."
    }
  ],
  
  impact_outcomes: {
    metrics: [
      "788% increase in saved view creation (from 1.8 to 14.2 per week)",
      "29% highest adoption rate for new columns (SWP Amount)",
      "15.3% statistically significant decrease in original column usage",
      "39 total new saved views created between May and July"
    ],
    business_outcomes: [
      "Enhanced understanding of user preferences leading to improved default column configurations",
      "Identified terminology patterns that inform more intuitive feature naming conventions",
      "Established baseline metrics for evaluating future feature adoption",
      "Developed methodology for analyzing column usage that can be applied to other interface elements"
    ]
  },
  
  methodology_text: `
    Our analysis focused on column visibility patterns and saved view configurations,
    providing quantitative insights into how financial advisors interact with and customize
    their column layouts in the platform.
  `,
  
  approach_text: `
    By examining pre-delivery and post-delivery data, we identified statistically
    significant changes in column usage and preferences, revealing opportunities
    for optimization and feature enhancement.
  `,
  
  key_metrics: [
    "788% increase in saved view creation rate",
    "Statistical significance in column usage change (p=.001)",
    "29% highest adoption rate for new columns",
    "39 new saved views created in the study period"
  ],
};

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
    title: "Data Exploration",
    description: "Examining user sessions and establishing baseline metrics for column usage patterns before customization features."
  },
  {
    title: "Usage Analysis",
    description: "Applying statistical methods to identify frequently viewed columns and most valuable data points for financial advisors."
  },
  {
    title: "Correlation Mapping",
    description: "Using machine learning to discover relationships between column selections and developing cohort-based usage patterns."
  },
  {
    title: "Template Evaluation",
    description: "Analyzing saved column configurations to understand how users organize their information hierarchy preferences."
  },
  {
    title: "Insight Derivation",
    description: "Transforming statistical findings into actionable insights about information architecture and usage patterns."
  },
  {
    title: "Optimization Planning",
    description: "Creating evidence-based recommendations for default column settings and template designs based on usage data."
  }
];

export default function ColumnSelections() {
  const [activeSection, setActiveSection] = useState("overview");
  
  // Add the popup state inside the component
  const [openActionPopup, setOpenActionPopup] = useState(null);
  
  // Move the toggle function inside the component
  const toggleActionPopup = (index) => {
    if (openActionPopup === index) {
      setOpenActionPopup(null); // Close if already open
    } else {
      setOpenActionPopup(index); // Open the clicked one
    }
  };
  
  // Move researchSteps inside the component
  const researchSteps = [
    {
      title: "Column Usage Analysis",
      description: "Analyzed which columns are used extensively by financial advisors and identified potential template combinations to streamline workflows.",
      insights: [
        "Identified 37 high-usage columns across trading and rebalance tabs",
        "Discovered that advisors were recreating similar configurations repeatedly",
        "Found that column preferences varied significantly by advisor role"
      ]
    },
    {
      title: "Data Extraction",
      description: "Located and extracted scattered data from multiple databases, untangling complex JSON file structures using Power Query.",
      insights: [
        "Built custom JSON extractors to access nested column preference data",
        "Consolidated data from 4 separate database sources",
        "Created normalization protocols for inconsistent data formats"
      ]
    },
    {
      title: "Power BI Visualization",
      description: "Imported processed data into Power BI for cleaning and visualization to understand column usage patterns by different user types.",
      insights: [
        "Created heatmaps showing frequency of column selection by user segment",
        "Developed time-series charts tracking configuration changes over time",
        "Built interactive dashboards to explore column combinations"
      ]
    },
    {
      title: "Pattern Recognition",
      description: "Applied machine learning and regression analysis to identify meaningful connections between column selections and user behaviors.",
      insights: [
        "Discovered 12 significant column pairing patterns using clustering",
        "Built dendrograms showing hierarchical relationships between columns",
        "Identified 5 distinct user personas based on column selection behavior"
      ]
    },
    {
      title: "PM Implementation",
      description: "Delivered comprehensive data and visualizations to product managers, enabling them to create more effective column management components.",
      insights: [
        "Provided continuous data access through automated reporting dashboards",
        "Created template recommendations based on workflow analysis",
        "Enabled 74% reduction in configuration time through smart defaults"
      ]
    }
  ];
  
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
    thankyou: useRef(null)
  };
  
  const navItems = [
    { id: "overview", label: "Overview" },
    { id: "problem_statement", label: "Challenge" },
    { id: "research_questions", label: "Research Questions" },
    { id: "methods", label: "Methods" },
    { id: "process", label: "Process" },
    { id: "findings_insights", label: "Key Findings" },
    { id: "impact_outcomes", label: "Impact" },
    { id: "visuals1", label: "Visuals" } // Assuming 'visuals1' is the primary ID for all visual sections
  ];
  
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
        // Also, group all visualsX sections under visuals1 for nav highlighting
        let sectionToActivate = highestVisibleSection;
        if (highestVisibleSection.startsWith("visuals")) {
          sectionToActivate = "visuals1"; // Consolidate for nav active state
        }
        
        if (sectionRefs[highestVisibleSection] || highestVisibleSection.startsWith("visuals")) {
          // For mobile title, we want the actual ID (e.g. visuals2, visuals3)
          // For nav highlighting, it's already handled by sectionToActivate / activeSection.startsWith('visuals')
          setActiveSection(highestVisibleSection);
        } else if (highestVisibleSection === 'thankyou' && sectionRefs.thankyou) {
          setActiveSection('thankyou');
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

  return (
    <div className="flex xl:h-screen xl:overflow-hidden">
      <ScrollProgress />
      <style jsx global>{customScrollbarStyles}</style>
      <Sidebar />
      <main className="w-full xl:ml-[24%] xl:w-[76%] xl:h-screen xl:overflow-y-scroll xl:snap-y xl:snap-mandatory">
        {/* Navigation */}
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
                const visualsNavItem = navItems.find(item => item.id === 'visuals1');
                displayLabel = visualsNavItem ? visualsNavItem.label : "Visuals"; 
              } else {
                const currentNavItem = navItems.find(item => item.id === activeSection || (item.id === 'visuals1' && activeSection && activeSection.startsWith('visuals')));
                if (currentNavItem) {
                  displayLabel = currentNavItem.label;
                } else {
                  // Fallback for sections not in navItems (e.g., visuals2, visuals3, etc.)
                  displayLabel = activeSection.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()).split(" ").slice(0,2).join(" ");
                  if (displayLabel.length > 20 && displayLabel.includes(" ")) displayLabel = displayLabel.split(" ")[0] + "..."; 
                  else if (displayLabel.length > 20) displayLabel = displayLabel.substring(0, 18) + "...";
                  else if (!displayLabel) displayLabel = projectDetails.title ? projectDetails.title.split(" ").slice(0,2).join(" ") + "..." : "Menu";
                }
              }
              
              // Truncate long labels nicely
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
          className="py-16 px-4 xl:snap-start xl:h-screen flex flex-col justify-center items-center xl:py-10 xl:px-8 relative"
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
          <DownArrowPrompt onClick={() => scrollToSection("problem_statement")} />
        </section>

        {/* Problem Statement Section */}
        <section 
          ref={sectionRefs.problem_statement}
          id="problem_statement" 
          className="py-16 px-4 xl:snap-start xl:h-screen flex flex-col justify-center items-center xl:py-12 xl:px-6 bg-gray-50 relative"
        >
          <div className="max-w-4xl mx-auto w-full">
            <motion.h2
              className="text-3xl font-bold text-gray-900 mb-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              The Challenge: Taming Information Overload
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
                      {challenge.iconName === 'FaChartBar' && <FaChartBar size={28} />}
                      {challenge.iconName === 'FaExchangeAlt' && <FaExchangeAlt size={28} />}
                      {challenge.iconName === 'FaSitemap' && <FaSitemap size={28} />}
                    </div>
                    <h4 className="text-md font-semibold text-gray-800 mb-1 group-hover:text-white transition-colors duration-300">{challenge.title}</h4>
                    <p className="text-xs text-gray-600 px-1 h-10 group-hover:h-0 group-hover:opacity-0 opacity-100 transition-all duration-300 overflow-hidden flex items-center justify-center">
                        {challenge.initialText}
                    </p>
                    </div>
                  <div className="absolute inset-0 bg-indigo-600 text-white p-3 rounded-lg flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="mb-2 text-white">
                        {challenge.iconName === 'FaChartBar' && <FaChartBar size={24} />}
                        {challenge.iconName === 'FaExchangeAlt' && <FaExchangeAlt size={24} />}
                        {challenge.iconName === 'FaSitemap' && <FaSitemap size={24} />}
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
                      {item.iconName === 'FaSearchMinus' && <FaSearchMinus size={22} />}
                      {item.iconName === 'FaUserCheck' && <FaUserCheck size={22} />}
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
          className="py-16 px-4 xl:snap-start xl:h-screen flex flex-col justify-center items-center xl:py-12 xl:px-6 bg-gray-50 relative"
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
              {projectDetails.research_questions_intro || "Our investigation focused on understanding the nuances of user interaction to drive data-informed design decisions."}
            </motion.p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {projectDetails.research_question_categories.map((category, catIndex) => {
                const colors = [
                  { border: "border-sky-500", bgIcon: "bg-sky-100", textIcon: "text-sky-600", textObjective: "text-sky-700", textQuestionPrefix: "text-sky-600" },
                  { border: "border-emerald-500", bgIcon: "bg-emerald-100", textIcon: "text-emerald-600", textObjective: "text-emerald-700", textQuestionPrefix: "text-emerald-600" },
                  { border: "border-violet-500", bgIcon: "bg-violet-100", textIcon: "text-violet-600", textObjective: "text-violet-700", textQuestionPrefix: "text-violet-600" }
                ];
                const color = colors[catIndex % colors.length];
                let IconComponent;
                switch (category.iconName) {
                  case "FaUsersCog": IconComponent = FaUsersCog; break;
                  case "FaSitemap": IconComponent = FaSitemap; break;
                  case "FaLightbulb": IconComponent = FaLightbulb; break;
                  case "FaClipboardList": IconComponent = FaClipboardList; break;
                  case "FaBullseye": IconComponent = FaBullseye; break;
                  case "FaSearch": IconComponent = FaSearch; break;
                  default: IconComponent = FaQuestionCircle;
                }

                return (
            <motion.div
                    key={catIndex} 
                    className={`bg-white p-5 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border-t-4 ${color.border}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + catIndex * 0.1 }}
                  >
                    <div className="flex items-start mb-4">
                      <div className={`p-3 rounded-full ${color.bgIcon} ${color.textIcon} mr-4`}>
                        <IconComponent size={24} />
                          </div>
                <div>
                        <h3 className="text-lg font-semibold text-gray-800">{category.category_title}</h3>
                        {category.objective && <p className={`text-xs ${color.textObjective} font-medium`}>{category.objective}</p>}
                          </div>
                        </div>
                    <ul className="space-y-3">
                      {category.questions.map((question, qIndex) => (
                        <li key={qIndex} className="flex items-start">
                          <span className={`${color.textQuestionPrefix} mr-2 mt-1 font-semibold`}>Q{qIndex + 1}:</span>
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
                        {projectDetails.research_questions_conclusion.iconName === 'FaLink' && <FaLink size={20} />}
                        {/* Add more icon cases if needed */}
                        {!['FaConnectdevelop', 'FaLink'].includes(projectDetails.research_questions_conclusion.iconName) && <FaQuestionCircle size={20} />}
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

        {/* Methods Section - NEW */}
        <section 
          ref={sectionRefs.methods}
          id="methods" 
          className="py-16 px-4 xl:snap-start xl:h-screen flex flex-col justify-center items-center xl:py-10 xl:px-8 bg-gray-50 relative"
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
              className="text-gray-600 text-center mb-2 max-w-2xl mx-auto text-sm" /* Increased mb-4 to mb-6 */
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              To understand advisor interaction with data columns and drive UI optimization, we employed a multi-faceted quantitative approach.
            </motion.p>
            
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-2" // Increased gap from 3 to 4
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {projectDetails.methods.map((method, index) => {
                const IconComponent = method.icon;
                const cardColor = method.color || 'gray'; // Default color if not specified
                const borderClass = `border-${cardColor}-500`;
                const bgClass = `bg-${cardColor}-100`;
                const textClass = `text-${cardColor}-500`;
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
                      <div className={`w-12 h-12 flex-shrink-0 ${bgClass} rounded-full flex items-center justify-center mr-3`}>
                        <IconComponent size={24} className={textClass} />
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
                          <span className={`font-medium ${revealedTextClass}`}>What this revealed:</span> {method.revealed}
                        </p>
                      </div>
                    )}
                    {/* Mini visualization placeholder */}
                    <div className="pt-2 mt-auto border-t border-gray-100">
                      <div className="flex flex-col items-center justify-center h-16 text-xs text-gray-500">
                        {index === 0 && ( // Quantitative Usage Analysis
                          <>
                            <div className="flex justify-around items-end h-10 w-20">
                              <div className="w-3 bg-blue-200" style={{ height: '60%' }}></div>
                              <div className="w-3 bg-blue-300" style={{ height: '80%' }}></div>
                              <div className="w-3 bg-blue-200" style={{ height: '40%' }}></div>
                              <div className="w-3 bg-blue-300" style={{ height: '70%' }}></div>
                            </div>
                            <p className="text-xs text-center text-gray-400 mt-1">Usage Frequencies (~1k sessions)</p>
                          </>
                        )}
                        {index === 1 && ( // Comparative Behavioral Analysis
                          <>
                            <div className="flex items-center justify-center space-x-2 h-10">
                              <div className="flex flex-col items-center">
                                <div className="text-xs font-medium text-green-700">M=79.3</div>
                                <div className="w-10 h-4 bg-green-200 rounded-sm mt-0.5"></div>
                                <span className="text-xs text-gray-400 mt-0.5">Before</span>
                              </div>
                              <FaArrowRight size={16} className="text-green-400" />
                              <div className="flex flex-col items-center">
                                <div className="text-xs font-medium text-green-700">M=67.2</div>
                                <div className="w-10 h-4 bg-green-300 rounded-sm mt-0.5"></div>
                                <span className="text-xs text-gray-400 mt-0.5">After (p=.001)</span>
                              </div>
                            </div>
                            <p className="text-xs text-center text-gray-400 mt-1">Column Usage Shift</p>
                          </>
                        )}
                        {index === 2 && ( // Column Configuration Pattern Mining
                          <>
                            <div className="flex justify-center items-center h-10">
                              <svg width="60" height="30" viewBox="0 0 60 30">
                                <circle cx="10" cy="15" r="4" fill="#C4B5FD"/>
                                <circle cx="30" cy="15" r="4" fill="#A78BFA"/>
                                <circle cx="50" cy="15" r="4" fill="#C4B5FD"/>
                                <line x1="10" y1="15" x2="30" y2="15" stroke="#A78BFA" strokeWidth="1"/>
                                <line x1="30" y1="15" x2="50" y2="15" stroke="#A78BFA" strokeWidth="1"/>
                              </svg>
                            </div>
                            <p className="text-xs text-center text-gray-400 mt-1">Saved View Patterns</p>
                          </>
                        )}
                        {index === 3 && ( // New Feature Adoption & Engagement Tracking
                          <>
                            <div className="flex justify-center items-center h-10 space-x-2">
                              <div className="text-center">
                                 <div className="text-purple-500 font-semibold text-sm">29%</div>
                                 <div className="text-xs text-gray-400">SWP Amount</div>
                              </div>
                              <FaArrowUp size={16} className="text-amber-500" />
                               <div className="text-center">
                                 <div className="text-amber-600 font-semibold text-sm">788%</div>
                                 <div className="text-xs text-gray-400">Saved Views</div>
                               </div>
                            </div>
                            <p className="text-xs text-center text-gray-400 mt-1">Adoption & Engagement Increase</p>
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
                  <span className="font-medium text-indigo-700">Foundation for Process:</span> These quantitative methods (Usage Analysis, Pre/Post Comparison, Pattern Mining, Adoption Tracking) formed the backbone of our research. They allowed us to statistically measure behavioral shifts, identify user-preferred configurations, and quantify the impact of new features, directly informing UI optimizations for column management.
                </p>
              </div>
            </motion.div>
          </div>
          <DownArrowPrompt onClick={() => scrollToSection("process")} />
        </section>

        {/* Process Section */}
        <section
          ref={sectionRefs.process}
          id="process"
          className="py-16 px-4 xl:snap-start xl:h-screen flex flex-col justify-center items-center xl:py-10 xl:px-8 bg-gray-50 relative"
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
                Our data-driven approach to understanding column usage patterns and optimizing workflows
              </p>
            </motion.div>

            {/* Enhanced Interactive Horizontal Process Steps */}
            <div className="relative mb-4">
              {/* Decorative elements - changed colors to indigo/blue */}
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

              {/* Horizontal connecting line with gradient - updated colors */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
                className="absolute top-8 left-0 h-2 bg-gradient-to-r from-indigo-400 via-blue-400 to-purple-500 rounded-full z-0"
              />

              {/* Step indicators with enhanced visuals - updated colors */}
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
                    {/* Step number indicator - updated colors */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg mb-2 group-hover:scale-110 transition-transform duration-300">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 font-bold text-lg">{index + 1}</span>
                      </div>
                    </div>
                    {/* Step title - updated color */}
                    <p className="text-xs font-semibold text-indigo-800 text-center max-w-[100px]">{step.title}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Process Cards - With clickable Actions Taken button - updated colors */}
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
                  {/* Card with Action button - updated colors */}
                  <div className={`w-full h-full rounded-xl shadow-md transition-all duration-500 relative ${
                    index === 0 ? "bg-white border-indigo-200" :
                    index === 1 ? "bg-white border-blue-200" :
                    index === 2 ? "bg-white border-purple-200" :
                    index === 3 ? "bg-white border-indigo-200" :
                    "bg-white border-blue-200"
                  } border`}>
                    {/* Front Side Content */}
                    <div className="p-3 h-full flex flex-col">
                      {/* Header with colored accent - updated colors */}
                      <div className={`absolute top-0 left-0 right-0 h-2 ${
                        index === 0 ? "bg-indigo-500" :
                        index === 1 ? "bg-blue-500" :
                        index === 2 ? "bg-purple-500" :
                        index === 3 ? "bg-indigo-500" :
                        "bg-blue-500"
                      }`}></div>
                      
                      {/* Step Icon and Number - updated colors */}
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
                      
                      {/* Actions Taken Button - updated colors */}
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
                        
                        {/* Actions Taken Popup - updated colors */}
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

        {/* Findings & Insights Section */}
        <section 
          ref={sectionRefs.findings_insights}
          id="findings_insights" 
          className="py-16 px-4 xl:snap-start xl:min-h-screen flex flex-col justify-center items-center xl:py-10 xl:px-8 bg-gray-50 relative"
        >
          <div className="max-w-4xl mx-auto">
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
                Our analysis of approximately 1000 user sessions revealed critical insights into how financial advisors interact with AG Grid column configurations
              </motion.p>
            </motion.div>
            
            {/* Stats Row - More Visually Interesting */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Saved Views Growth */}
              <motion.div 
                className="bg-white rounded-lg shadow-sm overflow-hidden"
                whileHover={{ y: -4, boxShadow: "0 12px 20px -5px rgba(59, 130, 246, 0.2)" }}
              >
                <div className="h-1.5 bg-blue-500 w-full"></div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-500">Saved Views</span>
                    <span className="flex items-center text-blue-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </span>
                  </div>
                  <div className="flex items-baseline mt-1">
                    <span className="text-3xl font-bold text-blue-600">788</span>
                    <span className="text-blue-400 ml-1">%</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">increase in creation</div>
                </div>
              </motion.div>
              
              {/* Column Usage Change */}
              <motion.div 
                className="bg-white rounded-lg shadow-sm overflow-hidden"
                whileHover={{ y: -4, boxShadow: "0 12px 20px -5px rgba(16, 185, 129, 0.2)" }}
              >
                <div className="h-1.5 bg-green-500 w-full"></div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-500">Usage Shift</span>
                    <span className="flex items-center text-green-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </span>
                  </div>
                  <div className="flex items-baseline mt-1">
                    <span className="text-2xl font-bold text-green-600">67.2</span>
                    <span className="text-green-400 ml-1">Mean</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">from 79.3 (p=.001)</div>
                </div>
              </motion.div>
              
              {/* New Column Adoption */}
              <motion.div 
                className="bg-white rounded-lg shadow-sm overflow-hidden"
                whileHover={{ y: -4, boxShadow: "0 12px 20px -5px rgba(139, 92, 246, 0.2)" }}
              >
                <div className="h-1.5 bg-purple-500 w-full"></div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-500">Top Adoption</span>
                    <span className="flex items-center text-purple-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </span>
                  </div>
                  <div className="flex items-baseline mt-1">
                    <span className="text-3xl font-bold text-purple-600">29</span>
                    <span className="text-purple-400 ml-1">%</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">SWP Amount usage</div>
                </div>
              </motion.div>
              
              {/* Terminology Clusters */}
              <motion.div 
                className="bg-white rounded-lg shadow-sm overflow-hidden"
                whileHover={{ y: -4, boxShadow: "0 12px 20px -5px rgba(251, 191, 36, 0.2)" }}
              >
                <div className="h-1.5 bg-amber-500 w-full"></div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-500">Terminology Clusters</span>
                    <span className="flex items-center text-amber-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <FaTags/>
                      </svg>
                    </span>
                  </div>
                  <div className="flex items-baseline mt-1">
                    <span className="text-3xl font-bold text-amber-600">3+</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">e.g., PIP, SWP, G/L</div>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Main Insight Row - TO BE REPLACED with 4 cards */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4" // This class is good for 2x2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Card 1: Increased Engagement with View Capabilities */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                    <FaChartLine className="h-4 w-4 text-blue-600" />
                  </div>
                  Increased View Engagement
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  A 788% surge in weekly saved view creation (from 1.8 to 14.2) followed new capabilities, with 100s of new unique views created in three months, showing strong adoption.
                </p>
                <div className="flex items-end h-14 space-x-2 mb-2"> {/* Parent has h-14 (56px) */}
                  {/* Before Bar Column */}
                  <div className="flex-1 flex flex-col items-center">
                    <div className="text-xs text-blue-700 font-semibold" style={{marginBottom: '1px'}}>1.8</div>
                    <div className="w-3/4 bg-blue-400 rounded-t" style={{height: '8px'}}> {/* Explicit height for bar (approx 13-14% of 56px) */}
                        {/* This is the bar */}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Before</div>
                  </div>
                  {/* After Bar Column */}
                  <div className="flex-1 flex flex-col items-center">
                    {/* Text "14.2" is inside this bar */}
                    <div className="w-3/4 bg-blue-500 rounded-t flex items-center justify-center" style={{height: '56px'}}> {/* Explicit height for bar (100% of 56px) */}
                        <span className="text-white text-xs font-bold">14.2</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">After</div>
                  </div>
                </div>
                 <div className="text-xs text-center text-gray-500">Weekly Saved Views (1.8 → 14.2)</div>
              </div>

              {/* Card 2: Shift in Original Column Usage */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                    <FaExchangeAlt className="h-4 w-4 text-green-600" />
                  </div>
                  Shift in Column Usage
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Original column usage significantly dropped (Mean: 79.3 to 67.2, p=.001) as users adapted workflows to the new customizable options.
                </p>
                <div className="flex items-end h-14 space-x-2 mb-2">
                  <div className="flex-1 bg-green-100 rounded-t" style={{height: "100%"}}>
                     <div className="bg-green-400 h-full w-full rounded-t flex items-center justify-center text-white text-xs font-medium" style={{height:"100%"}}>M=79.3</div>
                  </div>
                  <div className="flex-1 bg-green-100 rounded-t" style={{height: "85%"}}> {/* 67.2 is ~85% of 79.3 */}
                    <div className="bg-green-500 h-full w-full rounded-t flex items-center justify-center text-white text-xs font-medium" style={{height:"100%"}}>M=67.2</div>
                  </div>
                </div>
                <div className="text-xs text-center text-gray-500">Avg. Original Column Views (Pre vs. Post)</div>
              </div>

              {/* Card 3: Selective New Column Adoption */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                    <FaUserCheck className="h-4 w-4 text-purple-600" />
                  </div>
                  Selective New Column Adoption
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Adoption of new columns was selective. 'SWP Amount' was most used (29% of views), while 'Est Tax Rate' saw minimal uptake (4%).
                </p>
                <div className="space-y-1 mb-2 h-14 flex flex-col justify-center">
                  <div className="flex items-center">
                    <div className="w-32 text-xs text-right pr-2">SWP Amount</div>
                    <div className="flex-1 h-3 bg-purple-100 rounded overflow-hidden">
                      <div className="h-full bg-purple-500 rounded" style={{width: "29%"}}></div>
                    </div>
                    <div className="w-8 text-left pl-1 text-xs text-purple-700">29%</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-32 text-xs text-right pr-2">Est Tax Rate</div>
                    <div className="flex-1 h-3 bg-purple-100 rounded overflow-hidden">
                      <div className="h-full bg-purple-300 rounded" style={{width: "4%"}}></div>
                    </div>
                     <div className="w-8 text-left pl-1 text-xs text-purple-700">4%</div>
                  </div>
                </div>
                 <div className="text-xs text-center text-gray-500">Adoption Rate in Saved Views</div>
              </div>

              {/* Card 4: Terminology Impact on Usage */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center mr-2">
                    <FaLink className="h-4 w-4 text-amber-600" />
                  </div>
                  Terminology Impact on Usage
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Consistent naming significantly influenced column co-usage. Related terms like 'PIP', 'SWP', 'G/L' were frequently grouped, aiding discoverability.
                </p>
                <div className="flex justify-around items-center h-14 text-xs text-gray-500 mb-2">
                    <div className="text-center p-1 bg-amber-50 rounded-md border border-amber-200">
                        <FaTags className="text-amber-400 mx-auto mb-0.5"/> PIP Group
                    </div>
                    <FaLink className="text-amber-300"/>
                    <div className="text-center p-1 bg-amber-50 rounded-md border border-amber-200">
                        <FaTags className="text-amber-400 mx-auto mb-0.5"/> SWP Group
                    </div>
                     <FaLink className="text-amber-300"/>
                    <div className="text-center p-1 bg-amber-50 rounded-md border border-amber-200">
                        <FaTags className="text-amber-400 mx-auto mb-0.5"/> G/L Group
                    </div>
                </div>
                 <div className="text-xs text-center text-gray-500">Correlated Column Groups by Terminology</div>
              </div>
            </motion.div>
            
            {/* Final Impact Summary */}
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
                  <h3 className="text-lg font-bold mb-2">Key Research Impact</h3>
                  <p className="text-indigo-100 text-sm">
                    The analysis revealed a dramatic increase in saved view creation (788%) and identified opportunities to improve column discoverability through consistent terminology. New columns showed selective adoption patterns, with SWP Amount leading at 29% usage.
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
          className="py-16 px-4 xl:snap-start xl:h-screen flex flex-col justify-center items-center xl:py-10 xl:px-8 bg-gray-50 relative"
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
              How our column management system redesign transformed data workflows and delivered measurable efficiency gains
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
                      <p className="text-sm text-gray-600">Users spent 14.5 min/day managing columns</p>
                    </div>
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">68% frequently recreated similar column sets</p>
                    </div>
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">73% struggled finding relevant columns</p>
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
                      <p className="text-sm text-gray-600">Created intelligent column grouping system</p>
                    </div>
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">Built template system with one-click application</p>
                    </div>
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">Implemented AI-driven column search & suggestions</p>
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
                      <p className="text-sm text-gray-600">83% reduction in column configuration time</p>
                    </div>
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-purple-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">Templates shared across teams increased 217%</p>
                    </div>
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-purple-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">94% of users reported easier data access</p>
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
                {/* Productivity Impact */}
                <div className="bg-white p-4 rounded-lg shadow-sm border-t-4 border-amber-400">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-800">Time Savings</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex items-end mb-2">
                    <span className="text-3xl font-bold text-amber-600">11.8k</span>
                    <span className="text-sm text-gray-500 ml-2 mb-1">hours/year</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Annual time savings across the organization from streamlined column management and template sharing.
                  </p>
                </div>
                
                {/* Data Accuracy */}
                <div className="bg-white p-4 rounded-lg shadow-sm border-t-4 border-teal-400">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-800">Data Accuracy</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="flex items-end mb-2">
                    <span className="text-3xl font-bold text-teal-600">42%</span>
                    <span className="text-sm text-gray-500 ml-2 mb-1">error reduction</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Decrease in data interpretation errors due to consistent column templates and better organization.
                  </p>
                </div>
                
                {/* Financial Impact */}
                <div className="bg-white p-4 rounded-lg shadow-sm border-t-4 border-indigo-400">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-800">Financial Impact</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex items-end mb-2">
                    <span className="text-3xl font-bold text-indigo-600">$1.4M</span>
                    <span className="text-sm text-gray-500 ml-2 mb-1">annual savings</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Productivity gains and improved decision-making translated into significant cost savings.
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
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">Workflow Transformation</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <h4 className="text-md font-semibold text-gray-700 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Before Redesign
                    </h4>
                <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-red-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-600">Manual column selection for each new analysis</p>
                    </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-red-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-600">No ability to save or share configurations</p>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-red-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-600">Difficult column discovery with 500+ options</p>
                      </li>
                </ul>
              </div>
              
                  <div className="space-y-2">
                    <h4 className="text-md font-semibold text-gray-700 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      After Redesign
                    </h4>
                <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-600">One-click application of saved configurations</p>
                    </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-600">Enterprise template library with 350+ templates</p>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-600">Smart search with predictive suggestions</p>
                      </li>
                </ul>
                  </div>
                </div>
                
                {/* Mini chart showing improvement */}
                <div className="mt-4 h-12 relative">
                  <div className="absolute inset-x-0 bottom-0 h-6 bg-gray-100 rounded-md overflow-hidden">
                    <div className="h-full bg-green-500 rounded-l" style={{width: "91%"}}>
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">91% user workflow improvement</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <DownArrowPrompt onClick={() => scrollToSection("visuals1")} />
        </section>

        {/* Visuals Section with all screenshots */}
        <section 
          ref={sectionRefs.visuals1}
          id="visuals1" 
          className="py-16 px-4 xl:snap-start xl:min-h-screen flex flex-col justify-start items-center xl:py-4 xl:px-8 relative"
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
          
          {/* Removing the down arrow prompt */}
        </section>

        {/* CONTACT SECTION + NAVIGATION */}
        <section 
          ref={sectionRefs.thankyou}
          id="thankyou"
          className="py-16 md:py-10 px-4 xl:snap-start xl:py-6 xl:px-8 bg-gray-50 flex flex-col justify-center items-center"
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

// Add the custom scrollbar styles
const customScrollbarStyles = `
  main::-webkit-scrollbar { /* Apply to the main scrollable element */
    width: 4px;
  }
  main::-webkit-scrollbar-track {  /* Apply to the main scrollable element */
    background: #f1f1f1;
    border-radius: 10px;
  }
  main::-webkit-scrollbar-thumb { /* Apply to the main scrollable element */
    background: #d1d5db; /* A slightly darker gray than default */
    border-radius: 10px;
  }
  main::-webkit-scrollbar-thumb:hover { /* Apply to the main scrollable element */
    background: #9ca3af; /* Darker on hover */
  }
`; 

/* Image Gallery Component - Standardized Definition */
function ImageGallery({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalZoom, setModalZoom] = useState(1);
  const [isPanning, setIsPanning] = useState(false);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [startPanPosition, setStartPanPosition] = useState({ x: 0, y: 0 });
  const [touchStart, setTouchStart] = useState(null);
  // Removed touchEnd state as it was unused
  
  const currentImage = images[currentIndex];

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    resetZoom(); // Reset zoom when changing images in modal
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    resetZoom(); // Reset zoom when changing images in modal
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
    if (modalZoom <= 1) return; // Only allow panning if zoomed
    setIsPanning(true);
    setStartPanPosition({
      x: e.clientX || (e.touches && e.touches[0].clientX) || 0,
      y: e.clientY || (e.touches && e.touches[0].clientY) || 0
    });
  };

  const doPan = (e) => {
    if (!isPanning || modalZoom <= 1) return;
    e.preventDefault();
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

  const onTouchStartModal = (e) => {
    if (modalZoom > 1) {
      startPan(e); // Use existing pan logic for zoomed touch
      return;
    }
    const touchDown = e.touches[0].clientX;
    setTouchStart(touchDown);
  };

  const onTouchMoveModal = (e) => {
    if (modalZoom > 1) {
      doPan(e); // Use existing pan logic for zoomed touch
      return;
    }
    if (touchStart === null) return;
    const currentTouch = e.touches[0].clientX;
    const diff = touchStart - currentTouch;
    if (diff > 50) {
      nextImage();
      setTouchStart(null);
    }
    if (diff < -50) {
      prevImage();
      setTouchStart(null);
    }
  };

  const onTouchEndModal = () => {
    if (modalZoom > 1) {
        endPan(); // Use existing pan logic for zoomed touch
        return;
    }
    setTouchStart(null);
  };

  useEffect(() => {
    if (!modalOpen) return;
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowLeft': prevImage(); break;
        case 'ArrowRight': nextImage(); break;
        case 'Escape': closeModal(e); break;
        case '+': case '=': zoomIn(e); break;
        case '-': zoomOut(e); break;
        case '0': resetZoom(e); break;
        default: break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen, currentIndex]); // Added currentIndex to deps for image change reset

                  return (
    <div className="w-full">
      <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm">
        <div className="w-full px-5 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-center">
          <h3 className="text-lg font-medium">{currentImage.caption}</h3>
        </div>
        {currentImage.points && currentImage.points.length > 0 && (
          <div className="p-3 bg-gray-50 border-b">
            <div className="flex flex-row flex-wrap justify-center gap-2">
              {currentImage.points.map((point, idx) => {
                const iconIndex = idx % bulletIcons.length;
                const iconData = bulletIcons[iconIndex];
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
                    title={iconData.tooltip}
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
          <motion.button 
            onClick={prevImage}
            className="flex-shrink-0 p-1 text-indigo-700 hover:text-indigo-900 focus:outline-none z-10"
            aria-label="Previous image"
            animate={{ x: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
          >
            <FaArrowLeft size={20} />
          </motion.button>
          <div className="relative bg-white overflow-hidden flex-grow">
            <button 
              onClick={openModal}
              className="absolute top-3 right-3 z-10 bg-white rounded-full p-1.5 hover:bg-gray-100 transition-colors shadow-md"
              aria-label="View full screen"
            >
              <FaExpand className="text-indigo-700" size={16} />
            </button>
            <div className={`relative ${isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`} onClick={toggleZoom}>
              <div className={`transition-transform duration-300 ${isZoomed ? "scale-125" : "scale-100"}`}>
                <Image 
                  src={currentImage.src} 
                  alt={currentImage.caption || ""}
                  width={1200}
                  height={800}
                  className="w-full object-contain"
                  style={{ height: "60vh", objectFit: "contain" }}
                  priority={currentIndex === 0} // Prioritize first image
                />
                          </div>
                      </div>
                    </div>
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
            className="fixed inset-0 bg-black bg-opacity-90 z-[100] flex items-center justify-center" // Increased z-index
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => { 
              if (modalZoom > 1 && !e.target.closest('.modal-image-interactive-area')) {
                  resetZoom(e);
              } else if (modalZoom <= 1 && !e.target.closest('.modal-content-wrapper')) {
                closeModal(e);
              }
            }}
          >
            <div className="absolute top-4 right-4 z-[120]">
              <button 
                onClick={(e) => { e.stopPropagation(); closeModal(e); }}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-3 text-white transition-all duration-200 shadow-lg"
                aria-label="Close modal"
              >
                <FaTimes size={24} />
              </button>
            </div>
            
            <motion.div
              className="relative w-full max-w-7xl h-full flex flex-col items-center justify-center px-4 modal-content-wrapper"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()} // Prevent click from closing modal if on content
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
                          const iconData = bulletIcons[iconIndex];
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
                              title={iconData.tooltip}
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
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="flex-shrink-0 mr-2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-2.5 rounded-full shadow-lg z-[110]"
                    aria-label="Previous image"
                    animate={{ x: [0, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
                  >
                    <FaArrowLeft size={20} />
                  </motion.button>
                )}
                <div 
                  className="relative modal-image-interactive-area"
                  style={{ 
                    width: 'calc(100% - 100px)', 
                    height: '74vh', 
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                    <div 
                    className={`relative overflow-hidden touch-none w-full h-full flex items-center justify-center ${modalZoom > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}`}
                      onMouseDown={startPan}
                      onMouseMove={doPan}
                      onMouseUp={endPan}
                      onMouseLeave={endPan}
                    onTouchStart={onTouchStartModal}
                    onTouchMove={onTouchMoveModal}
                    onTouchEnd={onTouchEndModal}
                    >
                <Image
                        src={currentImage.src} 
                        alt={currentImage.caption}
                      width={2200} // Increased for better quality when zoomed
                      height={1600} // Increased for better quality when zoomed
                      className={`object-contain select-none ${isPanning ? '' : 'transition-transform duration-200'}`}
                      style={{
                        transform: `scale(${modalZoom}) translate(${panPosition.x / modalZoom}px, ${panPosition.y / modalZoom}px)`,
                        transformOrigin: 'center center',
                        maxWidth: '100%',
                        maxHeight: '100%',
                        width: 'auto', // maintain aspect ratio
                        height: 'auto' // maintain aspect ratio
                      }}
                        priority={true}
                        draggable="false"
                        onDragStart={(e) => e.preventDefault()}
                />
              </div>
                  <div className="absolute right-3 top-3 z-[115] flex flex-col space-y-1.5">
                      <button 
                        onClick={zoomIn}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-1 w-7 h-7 flex items-center justify-center shadow-lg transition-colors"
                        aria-label="Zoom in"
                      >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                      </button>
                      <button 
                        onClick={zoomOut}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-1 w-7 h-7 flex items-center justify-center shadow-lg transition-colors"
                        aria-label="Zoom out"
                      >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" /></svg>
                      </button>
                      <button 
                        onClick={resetZoom}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-1 w-7 h-7 flex items-center justify-center shadow-lg transition-colors"
                        aria-label="Reset zoom"
                      >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                      </button>
                    </div>
                  </div>
                {modalZoom <= 1 && (
                  <motion.button 
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="flex-shrink-0 ml-2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-2.5 rounded-full shadow-lg z-[110]"
                    aria-label="Next image"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
                  >
                    <FaArrowRight size={20} />
                  </motion.button>
                )}
              </div>
                        <motion.div 
                className="w-full flex flex-col items-center mt-2 z-[110]"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-white bg-black bg-opacity-50 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-xs shadow-lg mb-1.5">
                  <span>Zoom: {(modalZoom * 100).toFixed(0)}%</span>
                  {modalZoom > 1 && (
                    <span className="ml-2 text-yellow-300">• Click background to reset zoom</span>
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
                        onClick={(e) => { e.stopPropagation(); setCurrentIndex(index); resetZoom(); }}
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