import { useState, useRef, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaChevronDown, FaEye, FaChartLine, FaLightbulb, FaArrowLeft, FaArrowRight, 
  FaExpand, FaTimes, FaTable, FaSearch, FaChartBar, FaChartPie, FaExclamationTriangle, 
  FaCheckCircle, FaPercentage, FaGraduationCap, FaUsers, FaUniversity, FaEnvelope, FaArrowUp, FaHome, FaArrowDown, FaCheck, FaStar, FaGlobe } from "__barrel_optimize__?names=FaArrowDown,FaArrowLeft,FaArrowRight,FaArrowUp,FaChartBar,FaChartLine,FaChartPie,FaCheck,FaCheckCircle,FaChevronDown,FaEnvelope,FaExclamationTriangle,FaExpand,FaEye,FaGlobe,FaGraduationCap,FaHome,FaLightbulb,FaPercentage,FaSearch,FaStar,FaTable,FaTimes,FaUniversity,FaUsers!=!react-icons/fa";
import Head from 'next/head';

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
      <div className="h-full bg-yellow-400" style={{ width: `${scrollProgress}%` }} />
    </div>
  );
}

/* --- ICONS FOR BULLET POINTS --- */
const bulletIcons = [
  { icon: <FaEye className="text-yellow-500" />, tooltip: "What this shows" },
  { icon: <FaChartLine className="text-yellow-600" />, tooltip: "Key data insights" },
  { icon: <FaLightbulb className="text-yellow-400" />, tooltip: "Implications / Why it matters" },
];

/* --- PROJECT DETAILS --- 
   Adapting content from the Master's Project doc (Experimental Psychology).
   You can expand/shorten these fields as needed.
*/
const projectDetails = {
  title: "Can Engaging in Creative Work Increase Willingness to Take Risks?",
  subtitle: "The Mediating Roles of Need for Uniqueness & Self-Esteem",
  overview: `
    This Master's project explores whether performing creative tasks
    can enhance an individual's willingness to take risks. Two studies
    tested creativity vs. practicality conditions, then measured risk-taking 
    alongside potential mediators (Need for Uniqueness & State Self-Esteem).
    Findings: Creativity tasks significantly increased willingness to take risks, 
    but neither mediator explained that effect. The significant results and novel 
    methodological approach led to a research assistant position at the UCL School of Management.
  `,
  duration: "MSc in Cognitive & Decision Sciences, August 26, 2016",
  team: ["Candidate: KCPK2", "Supervisor: Dr. Verena Krause", "University College London"],
  myRole: `
    Primary researcher for this MSc Psychology thesis, designing study methodology, collecting data, conducting statistical analysis, and formulating insights.
  `,

  research_questions: [
    "Does engaging in creative tasks directly increase willingness to take risks?",
    "Could that effect be mediated by Need for Uniqueness?",
    "Could state Self-Esteem also explain that effect?",
    "How do these findings inform organizational contexts that promote creativity?",
    "What does this say about popular \"creativity climate\" strategies in modern companies?",
  ],

  methods: [
    {
      name: "Study 1 (N=233)",
      description: `
        - Design: Two-group (Creative Task vs. Practical Task) between-subjects
        - Measures: Need for Uniqueness Scale (SANU), Willingness to Take Risks (WTR)
        - Procedure: Participants on MTurk wrote ~300 characters describing
          either a novel 'napping station' (creative) or a standard clothing retailer 
          (practical). Then rated WTR & SANU.
        - Analysis: Independent t-tests + Baron & Kenny steps for mediation
      `,
    },
    {
      name: "Study 2 (N=303)",
      description: `
        - Design: Two-group (Creative vs. Practical) using Alternate Uses Task
        - Measures: State Self-Esteem Scale (SSES), Willingness to Take Risks (WTR)
        - Procedure: 5-minute idea-generation for an empty mall space 
          (creative = novel/original ideas, practical = feasible/useful ideas),
          then measured SSES & WTR.
        - Analysis: Independent t-tests + mediation testing via Preacher & Hayes
      `,
    },
    {
      name: "Key Variables",
      description: `
        - Creativity vs. Practical Condition: manipulated via instructions
        - Need for Uniqueness (SANU)
        - State Self-Esteem (SSES partial: performance & social subscales)
        - Willingness to Take Risks (WTR), focusing on work-related risk acceptance
      `,
    },
    {
      name: "Limitations",
      description: `
        - MTurk setting might not replicate real organizational risk contexts
        - Short-term creativity tasks may not capture all motivational processes
        - Underrepresentation of certain demographics (managers vs. general sample)
      `,
    },
  ],

  key_insights: [
    "Creative Task → significantly higher willingness to take risks in both studies.",
    "Need for Uniqueness & State Self-Esteem each correlated with risk-taking, but did NOT mediate creativity's effect.",
    "Short, \"on-the-spot\" creative exercises still shifted participants' risk attitudes—suggesting a direct link from creativity to riskiness.",
    "Implication: Being asked to \"be creative\" may foster a mindset more open to uncertain options, even if short-lived.",
  ],

  process: [
    {
      step: 1,
      title: "Literature Review",
      description: `
• Surveyed existing research connecting risk and creativity
• Identified gap: most studies treat risk as cause, creativity as effect
• Hypothesized reversing direction: creative engagement → risk-taking
      `,
    },
    {
      step: 2,
      title: "Experimental Design",
      description: `
• Two separate studies with different tasks (to confirm results)
• Random assignment to creative vs. practical tasks
• Post-task measures of risk, plus mediators
      `,
    },
    {
      step: 3,
      title: "Mediation Analyses",
      description: `
• Applied Baron & Kenny (1986) steps
• Indirect effect tested with Preacher & Hayes bootstrapping
• Found direct effect of creativity → risk, but no mediator effect
      `,
    },
    {
      step: 4,
      title: "Organizational Implications",
      description: `
• Even minimal creative instructions might foster risk-taking
• Need for uniqueness / self-esteem might be overshadowed by immediate creative mindset
• Future research: prolonged creative sessions, actual workplace settings
      `,
    },
  ],

  findings: [
    {
      title: "Study 1 Results",
      description: `
Independent t-test: Creative group (M=5.18) > Practical group (M=4.78) in WTR (p<.01).
Need for Uniqueness was a strong predictor of WTR, but did NOT mediate 
the creativity → risk relationship.
      `,
    },
    {
      title: "Study 2 Results",
      description: `
Creative group (M=4.89) > Practical group (M=4.63) in WTR (p<.05).
State Self-Esteem correlated with WTR, but no mediational path found. 
Thus, creativity had a direct effect on risk-taking again.
      `,
    },
    {
      title: "Discussion",
      description: `
Both studies confirm a direct link from creative tasks to increased willingness to take risks. 
Contrary to hypotheses, neither Need for Uniqueness nor Self-Esteem explained the link. 
Possibly these constructs are overshadowed by situational creative demands.
      `,
    },
    {
      title: "Conclusions",
      description: `
Supports the notion that creativity might 'unlock' risk-taking behavior. 
Highlights the need for deeper inquiry into other potential mediators (motivation, 
mood states, personality). 

The findings were statistically significant (p < .05) across both studies, with medium 
effect sizes. This demonstrated robust evidence for creativity's direct effect on risk attitudes.

Applications: Encouraging employees to be creative could elevate constructive risk 
behavior, fueling innovation in organizational settings. These findings led to 
further exploration with different populations (including managers vs. employees) 
and alternate creativity exercises to test boundary conditions.
      `,
    },
    {
      title: "Career Impact & Further Research",
      description: `
The project's innovative approach and significant findings led to a research assistant 
position at the UCL School of Management, where I continued exploring risk-taking behavior 
in organizational contexts.

Follow-up studies examined:
• Whether group-based creativity exercises produce similar effects
• Individual differences in the creativity-risk relationship
• Examining whether the effect persists in high-stakes decision scenarios

The research contributed to a growing body of work on fostering innovation cultures 
where calculated risk-taking is encouraged rather than punished.
      `,
    },
  ],

  impact_outcomes: {
    metrics: [
      "Study 1: +0.40 effect size difference in WTR (Cohen's d .35 approx)",
      "Study 2: +0.26 effect size difference in WTR (Cohen's d .24 approx)",
      "No significant differences in demographic variables between conditions",
    ],
    business_outcomes: [
      "Creativity tasks → fosters risk-taking mindsets among participants",
      "Need for uniqueness / self-esteem not strongly shaping that shift",
      "Potential strategy: short creative breaks or \"creative priming\" sessions in workplaces",
    ],
  },

  tables: [
    // Example tables if you want to show them as a data section
    {
      title: "Table 1: Creativity vs. Practical Groups (Study 1)",
      description: "Means and t-test results for WTR & SANU by condition",
      points: [
        "Creativity group had higher Willingness to Take Risks",
        "No difference in Need for Uniqueness means by condition",
        "Sample size: N=233"
      ],
      data: {
        headers: ["Condition", "WTR (Mean)", "t-test p", "SANU (Mean)", "t-test p"],
        rows: [
          ["Creative (n=124)", "5.18", ".005", "3.45", ".350"],
          ["Practical (n=109)", "4.78", "—", "3.34", "—"]
        ],
        footnote: "WTR = Willingness to Take Risks scale (1-7). SANU = Self-Attributed Need for Uniqueness (1-5)."
      },
      fullTableData: {
        headers: ["Condition", "WTR Mean", "Std Dev", "SANU Mean", "Std Dev", "p-value (WTR)", "p-value (SANU)"],
        rows: [
          { cells: ["Creative (n=124)", "5.18", "0.95", "3.45", "0.77", "0.005", "0.350"], isSignificant: true },
          { cells: ["Practical (n=109)", "4.78", "1.19", "3.34", "0.72", "—", "—"] }
        ],
        footnote: "Significant difference in WTR (p < .01), but not in SANU."
      }
    },
    {
      title: "Table 2: Mediation Check (Study 1)",
      description: "Regression coefficients for creativity → WTR with Need for Uniqueness as mediator",
      points: [
        "Path C (creativity → WTR) significant",
        "Path A (creativity → uniqueness) not significant",
        "Thus no mediation effect"
      ],
      data: {
        headers: ["Path", "Coefficient", "p-value", "Interpretation"],
        rows: [
          ["Creativity → WTR (C)", "0.396", "0.005", "Significant total effect"],
          ["Creativity → Uniqueness (A)", "0.110", "0.350", "Not significant"],
          ["Uniqueness → WTR (B)", "0.205", "0.0096", "Significant predictor, but no mediation"],
          ["Direct effect (C')", "0.374", "0.008", "Still significant after controlling for Uniqueness"]
        ],
        footnote: "Bootstrap test: indirect effect = 0.022, p=0.407 → no mediation."
      },
      fullTableData: {
        headers: ["Regression Step", "Coeff (b)", "SE", "t-value", "p-value"],
        rows: [
          { cells: ["Path C: Condition → WTR", "0.3960", "0.1411", "2.81", "0.0054"], isSignificant: true },
          { cells: ["Path A: Condition → Uniqueness", "0.1095", "0.1170", "0.94", "0.3503"] },
          { cells: ["Path B: Uniqueness → WTR", "0.2046", "0.0784", "2.61", "0.0096"], isSignificant: true },
          { cells: ["Path C': Condition → WTR (controlling for Uniqueness)", "0.3736", "0.1396", "2.68", "0.0080"], isSignificant: true }
        ],
        footnote: "No full or partial mediation as A is not significant."
      }
    },
    {
      title: "Table 3: Creativity vs. Practical Groups (Study 2)",
      description: "Means and t-test results for WTR & SSES by condition",
      points: [
        "Creativity group had higher Willingness to Take Risks again",
        "No difference in Self-Esteem means by condition",
        "Sample size: N=303"
      ],
      data: {
        headers: ["Condition", "WTR (Mean)", "p-value", "SSES (Mean)", "p-value"],
        rows: [
          ["Creative (n=148)", "4.89", "0.037", "3.02", "0.975"],
          ["Practical (n=155)", "4.63", "—", "3.02", "—"]
        ],
        footnote: "WTR = Willingness to Take Risks (1-7), SSES = State Self-Esteem scale (1-5)."
      },
      fullTableData: {
        headers: ["Condition", "WTR Mean", "Std Dev", "SSES Mean", "Std Dev", "p-value (WTR)", "p-value (SSES)"],
        rows: [
          { cells: ["Creative (n=148)", "4.89", "1.06", "3.02", "0.62", "0.037", "0.975"], isSignificant: true },
          { cells: ["Practical (n=155)", "4.63", "1.12", "3.02", "0.60", "—", "—"] }
        ],
        footnote: "Significant difference in WTR (p<.05), no difference in SSES."
      }
    },
    {
      title: "Table 4: Mediation Check (Study 2)",
      description: "Regression coefficients for creativity → WTR with State Self-Esteem as mediator",
      points: [
        "Path C (creativity → WTR) significant",
        "Path A (creativity → SSES) not significant",
        "No mediation effect again"
      ],
      data: {
        headers: ["Path", "Coefficient", "p-value", "Interpretation"],
        rows: [
          ["Creativity → WTR (C)", "0.2646", "0.0365", "Significant total effect"],
          ["Creativity → SSES (A)", "-0.0043", "0.9754", "Not significant"],
          ["SSES → WTR (B)", "0.1962", "0.0001", "Significant predictor, no mediation unless A is significant"],
          ["Direct effect (C')", "0.2655", "0.0319", "Still significant controlling for SSES"]
        ],
        footnote: "Bootstrap: indirect effect = -0.0009, p=0.976 → no mediation."
      },
      fullTableData: {
        headers: ["Regression Step", "Coeff (b)", "SE", "t-value", "p-value"],
        rows: [
          { cells: ["Path C: Condition → WTR", "0.2646", "0.1260", "2.10", "0.0365"], isSignificant: true },
          { cells: ["Path A: Condition → SSES", "-0.0043", "0.055", "0.31", "0.9754"] },
          { cells: ["Path B: SSES → WTR", "0.1962", "0.051", "3.88", "0.0001"], isSignificant: true },
          { cells: ["Path C': Condition → WTR (controlling for SSES)", "0.2655", "0.1231", "2.16", "0.0319"], isSignificant: true }
        ],
        footnote: "Again, no mediation effect as path A is nonsignificant."
      }
    }
  ],
};

/* --- DOWN ARROW PROMPT --- */
function DownArrowPrompt({ onClick }) {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-10"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      onClick={onClick}
      whileHover={{ y: 5 }}
    >
      <FaChevronDown className="text-yellow-500 text-3xl animate-bounce" />
    </motion.div>
  );
}

/* MEDIATION VISUALIZATION COMPONENTS */
function DataVisualization({ data, title, description, onViewDetails }) {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md p-4 overflow-hidden"
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      transition={{ duration: 0.2 }}
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      
      <div className="relative overflow-hidden bg-gradient-to-r from-yellow-50 to-white p-3 rounded-md mb-3">
        <div className="absolute top-0 right-0 bg-black text-white text-xs px-2 py-1 rounded-bl-md">
          Statistical Insights
        </div>
        <div className="pt-6">
          {data.insights.map((insight, idx) => (
            <div key={idx} className="flex items-center mb-2 text-sm">
              <div className={`w-3 h-3 rounded-full mr-2 ${insight.significant ? 'bg-yellow-500' : 'bg-gray-400'}`}></div>
              <div className="flex-1">
                <span className="font-medium">{insight.label}:</span> {insight.value}
                {insight.significant && (
                  <span className="text-yellow-600 ml-2 text-xs">{insight.significance}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <button 
        onClick={onViewDetails}
        className="w-full mt-2 py-2 px-4 bg-black text-white rounded hover:bg-gray-800 transition-colors flex items-center justify-center text-sm"
      >
        <FaSearch className="mr-2" /> View Detailed Data
      </button>
    </motion.div>
  );
}

// Mediation Models Data
const mediationModels = {
  uniquenessModel: {
    title: "Creativity → Need for Uniqueness → Risk-Taking",
    description: "This model examines how the need for uniqueness mediates the relationship between creativity and risk-taking behavior",
    imageSrc: "/images/ucl/figure1.jpg",
    insights: [
      { label: "Path A", value: "A = .110 (Creativity → Uniqueness)", significant: false, significance: "" },
      { label: "Path B", value: "B = .205* (Uniqueness → Risk-Taking)", significant: true, significance: "p < 0.05" },
      { label: "Path C", value: "C = .396* (Total Effect)", significant: true, significance: "p < 0.05" },
      { label: "Path C'", value: "C' = .373* (Direct Effect)", significant: true, significance: "p < 0.05" },
    ],
    interpretation: "While creativity does not significantly predict need for uniqueness (Path A), need for uniqueness significantly predicts risk-taking behavior (Path B = 0.205, p < 0.05). This suggests that individuals with higher need for uniqueness tend to engage in more risk-taking behavior, regardless of their creativity levels.",
    statisticalDetails: [
      "A = .110, p > 0.05 (non-significant)",
      "B = 0.205, p < 0.05",
      "C = 0.396, p < 0.05 (Total Effect)",
      "C' = 0.373, p < 0.05 (Direct Effect)",
      "Indirect Effect = 0.023, not significant"
    ]
  },
  selfEsteemModel: {
    title: "Creativity → Self-Esteem → Risk-Taking",
    description: "This model examines how self-esteem mediates the relationship between creativity and risk-taking behavior",
    imageSrc: "/images/ucl/figure2.jpg",
    insights: [
      { label: "Path A", value: "A = -.004 (Creativity → Self-Esteem)", significant: false, significance: "" },
      { label: "Path B", value: "B = .196* (Self-Esteem → Risk-Taking)", significant: true, significance: "p < 0.05" },
      { label: "Path C", value: "C = .264* (Total Effect)", significant: true, significance: "p < 0.05" },
      { label: "Path C'", value: "C' = .265 (Direct Effect)", significant: false, significance: "" },
    ],
    interpretation: "Creativity does not significantly predict self-esteem (Path A), but self-esteem significantly predicts risk-taking behavior (Path B = 0.196, p < 0.05). This suggests that self-esteem operates as an independent predictor of risk-taking, rather than as a mediator of creativity's effect on risk-taking.",
    statisticalDetails: [
      "A = -.004, p > 0.05 (non-significant)",
      "B = 0.196, p < 0.05",
      "C = 0.264, p < 0.05 (Total Effect)",
      "C' = 0.265, p > 0.05 (Direct Effect)",
      "Indirect Effect = -0.001, not significant"
    ]
  }
};

// Create a Mediation Model Modal Component
function MediationModelModal({ isOpen, onClose, title, data }) {
  if (!isOpen) return null;
  
  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 20 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-gray-900">{data.title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Model Description</h3>
            <p className="text-gray-600">{data.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Path Analysis</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="space-y-3">
                  {data.insights.map((insight, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-2 ${insight.significant ? 'bg-yellow-500' : 'bg-gray-400'}`}></div>
                        <span className="text-gray-700">{insight.value}</span>
                      </div>
                      {insight.significant && (
                        <span className="font-medium text-yellow-600">{insight.significance}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Statistical Details</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <ul className="space-y-2">
                  {data.statisticalDetails.map((detail, idx) => (
                    <li key={idx} className="text-sm text-gray-700">{detail}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Interpretation</h3>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-sm text-gray-700">{data.interpretation}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Visualization</h3>
            <div className="bg-white border border-gray-200 rounded-md p-4 flex justify-center">
              {data.imageSrc && (
                <div className="relative h-64 w-full">
                  <img 
                    src={data.imageSrc} 
                    alt={`${data.title} visualization`} 
                    className="object-contain h-full mx-auto"
                  />
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* 
  --- MAIN PAGE COMPONENT ---
*/
export default function MastersProjectCase() {
  // State for tracking active section
  const [activeSection, setActiveSection] = useState('overview');
  const [modalOpen, setModalOpen] = useState(false);
  const [currentModelData, setCurrentModelData] = useState(null);
  const [openActionPopup, setOpenActionPopup] = useState(null);
  
  // Refs for all sections - matching the section structure from HBS and Advisor360
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
    research_info: useRef(null),
    thank_you: useRef(null),
  };
  
  // Function to toggle action popup like in advisor360.js
  const toggleActionPopup = (index) => {
    if (openActionPopup === index) {
      setOpenActionPopup(null); // Close if already open
    } else {
      setOpenActionPopup(index); // Open the clicked one
    }
  };
  
  // Function to open the mediation model modal
  const openMediationModal = (modelData) => {
    setCurrentModelData(modelData);
    setModalOpen(true);
  };
  
  // Function to close the mediation model modal
  const closeMediationModal = () => {
    setModalOpen(false);
  };
  
  // Function to scroll to a specific section
  const scrollToSection = (sectionId) => {
    if (sectionRefs[sectionId]?.current) {
      sectionRefs[sectionId].current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  
  // Intersection Observer logic matching HBS structure
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
        // If it's a "visualsX" ID, ensure "visuals1" is highlighted in the nav
        // The mobile nav title logic will handle displaying the correct label (e.g. "Visualizations")
        let sectionToSetActive = highestVisibleSection;
        if (highestVisibleSection.startsWith("visuals") && highestVisibleSection !== "visuals1") {
          // This ensures that for any visualsX section, the nav item 'visuals1' (labeled "Visualizations") is active.
          // The mobile title display logic handles showing the generic "Visualizations" title.
        }
        // Check if this section is one of our defined sections before setting
        if (sectionRefs[sectionToSetActive]) {
            setActiveSection(sectionToSetActive);
        } else if (sectionRefs[highestVisibleSection]) { // Fallback if sectionToSetActive isn't directly in sectionRefs (e.g. visuals2, etc)
            setActiveSection(highestVisibleSection);
        }
      }
    };

    observer = new IntersectionObserver(observerCallback, options);

    Object.keys(sectionRefs).forEach((key) => {
      if (sectionRefs[key]?.current) {
        observer.observe(sectionRefs[key].current);
      }
    });

    return () => {
      Object.keys(sectionRefs).forEach((key) => {
        if (sectionRefs[key]?.current) {
          observer.unobserve(sectionRefs[key].current);
        }
      });
      if (observer) observer.disconnect();
    };
  }, []); // Empty dependency array: run only on mount and clean up on unmount

  return (
    <div className="flex xl:h-screen xl:overflow-hidden">
      <Head>
        <title>UCL Psychology Research | Portfolio</title>
        <meta name="description" content="Exploring the relationship between creativity and risk-taking behavior" />
      </Head>
      
      <Sidebar />
      
      <main className="w-full xl:ml-[24%] xl:w-[76%] xl:h-screen xl:overflow-y-scroll xl:snap-y xl:snap-mandatory">
        <ScrollProgress />
        
        {/* Sticky Navigation */}
        <div className="sticky top-0 z-40 py-2 xl:py-3 backdrop-blur-sm bg-opacity-30">
          {/* Full nav for xl screens and up */}
          <div className="hidden xl:flex justify-center mx-auto">
            <nav className="flex space-x-3 xl:space-x-6">
              {[
                { id: "overview", label: "Overview" },
                { id: "problem_statement", label: "Challenge" },
                { id: "research_questions", label: "Research Questions" },
                { id: "methods", label: "Methods" },
                { id: "process", label: "Process" },
                { id: "findings_insights", label: "Findings" },
                { id: "impact_outcomes", label: "Impact" },
                { id: "visuals1", label: "Visuals" } // Assuming visuals1 is the main/first visuals section
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-2 py-0.5 text-xs xl:px-3 xl:py-1 xl:text-sm font-medium rounded-md transition-colors ${
                    activeSection === item.id || (item.id === 'visuals1' && activeSection && activeSection.startsWith('visuals'))
                      ? "bg-yellow-100 text-yellow-700"
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
              const navItems = [
                { id: "overview", label: "Overview" },
                { id: "problem_statement", label: "Challenge" },
                { id: "research_questions", label: "Research Questions" },
                { id: "methods", label: "Methods" },
                { id: "process", label: "Process" },
                { id: "findings_insights", label: "Findings" },
                { id: "impact_outcomes", label: "Impact" },
                { id: "visuals1", label: "Visuals" },
                { id: "thank_you", label: "Contact" } // Or whatever the last section is, map to "Contact" or "Visuals"
              ];
              let displayLabel = "";
              if (activeSection === 'thank_you') { // Or the ID of your final "contact" section
                const visualsNavItem = navItems.find(item => item.id === 'visuals1'); // Default to "Visuals" if no specific "Contact" label
                displayLabel = visualsNavItem ? visualsNavItem.label : "Menu";
              } else {
                const currentNavItem = navItems.find(item => item.id === activeSection || (item.id === 'visuals1' && activeSection && activeSection.startsWith('visuals')));
                if (currentNavItem) {
                  displayLabel = currentNavItem.label;
                } else {
                  // Fallback for sections not in navItems (e.g. visuals2, visuals3, etc.)
                  // Attempt to create a generic label, or default to a known one
                  displayLabel = activeSection.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()).split(" ").slice(0,2).join(" ");
                  if (displayLabel.length > 20 && displayLabel.includes(" ")) displayLabel = displayLabel.split(" ")[0] + "..."; 
                  else if (displayLabel.length > 20) displayLabel = displayLabel.substring(0, 18) + "...";
                  else if (!displayLabel) displayLabel = projectDetails.title ? projectDetails.title.split(" ").slice(0,2).join(" ") + "..." : "Menu";
                }
              }
              
              // Truncate long labels
              if (displayLabel.length > 18 && displayLabel.includes(" ")) { 
                  const words = displayLabel.split(" ");
                  if (words.length > 1 && words[0].length < 12) displayLabel = words[0] + " " + words[1].charAt(0) + ".";
                  else if (words.length > 1) displayLabel = words[0].substring(0,12) + "...";
                  else displayLabel = displayLabel.substring(0, 15) + "...";
              } else if (displayLabel.length > 18) {
                  displayLabel = displayLabel.substring(0, 15) + "...";
              }

              return (
                <span className="text-xs font-medium text-yellow-700 bg-yellow-100 px-3 py-1 rounded-md truncate" style={{ maxWidth: '180px' }}> 
                  {displayLabel || "Overview"}
                </span>
              );
            })()}
          </div>
        </div>

        {/* OVERVIEW SECTION - Matching HBS.js structure exactly */}
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
              className="text-center mb-4"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gray-900">
                Can Engaging in Creative Work Increase Willingness to Take Risks?
              </h1>
              <p className="text-xl text-gray-600 mb-2">
                The Mediating Roles of Need for Uniqueness & Self-Esteem
              </p>
              <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
            </motion.div>
            
            {/* Project details cards - grid layout matching HBS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4"
            >
              {/* Duration card */}
              <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-yellow-500 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="font-semibold text-gray-900">Duration</h3>
                </div>
                <p className="text-gray-700">
                  <span className="font-medium">8 months</span><br />
                  January 2016 - September 2019
                </p>
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
                  <li>Primary Researcher: Me</li>
                  <li>SupervisorA : Dr. Veronika Krause</li>
                  <li>Supervisor B: Dr. Chia-Jung Tsay</li>
                </ul>
              </div>
              
              {/* My role card */}
              <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-yellow-500 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <h3 className="font-semibold text-gray-900">My Role</h3>
                </div>
                <p className="text-gray-700">
                  Primary researcher for this MSc Psychology thesis, designing study methodology, collecting data, conducting statistical analysis, and formulating insights.
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
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Study Overview</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      This research explores the psychological links between creativity, personality traits, and risk-taking behavior in entrepreneurial contexts. The study employed a mediation analysis approach with 105 participants to examine how creativity influences risk-taking, both directly and through psychological mechanisms like need for uniqueness and self-esteem. Statistical analysis revealed significant pathways that help explain the psychology behind entrepreneurial behavior.
                    </p>
                    
                    {/* Technologies & Methods - Similar to Advisor360 */}
                    <div className="border-t border-gray-100 pt-4 mt-4">
                      <div className="flex items-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        <h4 className="text-sm font-medium text-gray-700">Technologies & Methods</h4>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-600">
                          Experimental Design
                        </span>
                        <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-600">
                          Mediation Analysis
                        </span>
                        <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-600">
                          Baron & Kenny Framework
                        </span>
                        <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-600">
                          Independent T-Tests
                        </span>
                        <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-600">
                          Bootstrapping
                        </span>
                        <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-600">
                          Randomized Control Trial
                        </span>
                      </div>
                    </div>

                    {/* Tools Section */}
                    <div className="border-t border-gray-100 pt-4 mt-4">
                      <div className="flex items-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <h4 className="text-sm font-medium text-gray-700">Tools</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-600">
                          SPSS
                        </span>
                        <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-600">
                          MTurk
                        </span>
                        <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-600">
                          Qualtrics
                        </span>
                        <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-600">
                          R Statistics
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          <DownArrowPrompt onClick={() => scrollToSection("problem_statement")} />
        </section>

        {/* PROBLEM STATEMENT - Matching HBS.js structure exactly */}
        <section
          ref={sectionRefs.problem_statement}
          id="problem_statement"
          className="xl:snap-start xl:min-h-screen flex flex-col justify-center items-center py-16 px-4 xl:py-10 xl:px-8 bg-gray-50 relative"
        >
          <div className="w-full xl:max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8 text-center"
            >
              <h2 className="text-3xl font-bold mb-4 text-gray-900">The Challenge</h2>
              <div className="w-20 h-1 bg-yellow-500 mx-auto mb-8"></div>
              <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
                Despite growing interest in entrepreneurial psychology, the relationship between creativity and risk-taking remains unclear.
                This research addresses a critical question: <span className="font-semibold">What psychological mechanisms connect creativity to risk-taking behavior?</span>
              </p>
            </motion.div>

            {/* Interactive Challenge Visualization */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative py-10 mb-8"
            >
              {/* Central dividing line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2"></div>
              
              {/* Common Beliefs vs Research Evidence */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left side - Common Beliefs */}
                <div className="relative">
                  <div className="absolute right-0 top-1/2 w-4 h-4 bg-yellow-400 rounded-full transform translate-x-2 -translate-y-1/2 z-10"></div>
                  <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white p-6 rounded-lg shadow-md mr-4 border-l-4 border-yellow-400"
                  >
                    <h3 className="text-lg font-semibold mb-3 text-gray-900">Common Assumptions</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-yellow-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span className="text-gray-700">Creative people naturally take more risks</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-yellow-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span className="text-gray-700">Creativity directly leads to entrepreneurial behavior</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-yellow-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span className="text-gray-700">Self-esteem is the primary driver of risk-taking</span>
                      </li>
                    </ul>
                  </motion.div>
                </div>
                
                {/* Right side - Research Questions */}
                <div className="relative">
                  <div className="absolute left-0 top-1/2 w-4 h-4 bg-black rounded-full transform -translate-x-2 -translate-y-1/2 z-10"></div>
                  <motion.div 
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white p-6 rounded-lg shadow-md ml-4 border-r-4 border-black"
                  >
                    <h3 className="text-lg font-semibold mb-3 text-gray-900">Research Questions</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-black mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span className="text-gray-700">What mediating psychological mechanisms connect creativity to risk-taking?</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-black mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span className="text-gray-700">Does the need for uniqueness explain this relationship?</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-black mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span className="text-gray-700">How does self-esteem influence entrepreneurial risk-taking?</span>
                      </li>
                    </ul>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid md:grid-cols-2 gap-8"
            >
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 transform transition-all hover:-translate-y-1 hover:shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
                  <span className="inline-block w-8 h-8 rounded-full bg-yellow-400 text-black flex items-center justify-center mr-3">1</span>
                  Research Motivation
                </h3>
                <p className="text-gray-700">
                  While creativity has been linked to entrepreneurial behavior, the psychological mechanisms underlying this relationship remain poorly understood. This research aimed to identify the specific pathways connecting creativity to risk-taking behavior.
                </p>
                  </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 transform transition-all hover:-translate-y-1 hover:shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
                  <span className="inline-block w-8 h-8 rounded-full bg-yellow-400 text-black flex items-center justify-center mr-3">2</span>
                  Core Hypothesis
                </h3>
                <p className="text-gray-700">
                  The study hypothesized that creativity's influence on risk-taking is mediated by personality factors, particularly the need for uniqueness and self-esteem, which may explain the psychological mechanisms driving entrepreneurial behavior.
                </p>
                </div>
            </motion.div>
          </div>
          
          <DownArrowPrompt onClick={() => scrollToSection("research_questions")} />
        </section>

        {/* RESEARCH QUESTIONS SECTION */}
        <section
          ref={sectionRefs.research_questions}
          id="research_questions"
          className="xl:snap-start xl:h-screen flex flex-col justify-center items-center py-16 px-4 xl:py-10 xl:px-8 relative"
        >
          <div className="w-full xl:max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6 text-center"
            >
              <h2 className="text-3xl font-bold mb-2 text-gray-900">Research Questions</h2>
              <div className="w-20 h-1 bg-yellow-500 mx-auto mb-4"></div>
              <p className="text-lg text-gray-700 mb-4 max-w-3xl mx-auto">
                Exploring fundamental questions about creativity and risk-taking behavior
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-md overflow-hidden mb-6"
            >
              <div className="bg-black p-3 text-white">
                <h3 className="text-lg font-semibold">Key Research Questions</h3>
              </div>
              
              <div className="p-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <span className="bg-yellow-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-xs">1</span>
                      Primary Research
                    </h4>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-gray-700 text-sm mb-1">How does creativity influence risk-taking?</p>
                      <ul className="space-y-1">
                        <li className="flex items-start text-xs">
                          <svg className="w-3 h-3 text-yellow-500 mr-1 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <span>Causal relationship</span>
                        </li>
                        <li className="flex items-start text-xs">
                          <svg className="w-3 h-3 text-yellow-500 mr-1 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <span>Effect size and significance</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <span className="bg-yellow-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-xs">2</span>
                      Mediating Factors
                    </h4>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-gray-700 text-sm mb-1">What connects creativity and risk-taking?</p>
                      <ul className="space-y-1">
                        <li className="flex items-start text-xs">
                          <svg className="w-3 h-3 text-yellow-500 mr-1 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <span>Need for uniqueness</span>
                        </li>
                        <li className="flex items-start text-xs">
                          <svg className="w-3 h-3 text-yellow-500 mr-1 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <span>Self-esteem as mediator</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <span className="bg-yellow-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-xs">3</span>
                      Entrepreneurial Implications
                    </h4>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-gray-700 text-sm mb-1">How can findings inform education?</p>
                      <ul className="space-y-1">
                        <li className="flex items-start text-xs">
                          <svg className="w-3 h-3 text-yellow-500 mr-1 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <span>Training program development</span>
                        </li>
                        <li className="flex items-start text-xs">
                          <svg className="w-3 h-3 text-yellow-500 mr-1 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <span>Practical applications</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <span className="bg-yellow-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-xs">4</span>
                      Risk Perception
                    </h4>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-gray-700 text-sm mb-1">How do creatives perceive risks?</p>
                      <ul className="space-y-1">
                        <li className="flex items-start text-xs">
                          <svg className="w-3 h-3 text-yellow-500 mr-1 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <span>Risk perception differences</span>
                        </li>
                        <li className="flex items-start text-xs">
                          <svg className="w-3 h-3 text-yellow-500 mr-1 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <span>Decision-making processes</span>
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
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                <svg className="w-5 h-5 text-yellow-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Central Research Question
              </h3>
              <p className="text-gray-800 font-medium">
                Do psychological constructs like the need for uniqueness and self-esteem explain how creativity influences risk-taking behavior?
              </p>
              <p className="text-gray-600 mt-1 text-sm">
                This explores the "why" and "how" behind the relationship, offering deeper insights for both theory and practice.
              </p>
            </motion.div>
          </div>
          
          <DownArrowPrompt onClick={() => scrollToSection("methods")} />
        </section>

        {/* METHODS SECTION */}
        <section
          ref={sectionRefs.methods}
          id="methods"
          className="xl:snap-start xl:h-screen flex flex-col justify-center items-center py-16 px-4 xl:py-10 xl:px-8 bg-white relative"
        >
          <div className="w-full xl:max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-8 text-center"
            >
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Research Methods</h2>
              <div className="w-20 h-1 bg-yellow-500 mx-auto mb-8"></div>
              <p className="text-lg text-gray-700 mb-4 max-w-3xl mx-auto">
                A rigorous experimental approach to exploring the psychology of creativity and risk-taking
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Method 1: Experimental Design */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-5 rounded-lg shadow-md border-l-4 border-yellow-500"
              >
                <div className="flex items-start mb-3">
                  <div className="w-10 h-10 flex-shrink-0 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Experimental Design</h3>
                    <p className="text-sm text-gray-500">Two randomized controlled studies</p>
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-gray-700">Two separate experiments with random assignment to creative vs. practical task conditions, with each study using different creativity manipulations to ensure robustness of findings.</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex items-start">
                    <svg className="w-4 h-4 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <p className="text-sm text-gray-700">
                      Total sample of 536 participants across two studies (Study 1: n=233, Study 2: n=303)
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Method 2: Mediation Analysis */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-5 rounded-lg shadow-md border-l-4 border-yellow-500"
              >
                <div className="flex items-start mb-3">
                  <div className="w-10 h-10 flex-shrink-0 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Mediation Analysis</h3>
                    <p className="text-sm text-gray-500">Baron & Kenny framework with bootstrapping</p>
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-gray-700">Applied formal statistical mediation analysis to test whether need for uniqueness and self-esteem mediate the relationship between creativity and risk-taking behavior.</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex items-start">
                    <svg className="w-4 h-4 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <p className="text-sm text-gray-700">
                      Used PROCESS macro for SPSS with 5,000 bootstrap samples for confidence intervals
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Method 3: Psychological Measures */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-white p-5 rounded-lg shadow-md border-l-4 border-yellow-500"
              >
                <div className="flex items-start mb-3">
                  <div className="w-10 h-10 flex-shrink-0 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Psychometric Measures</h3>
                    <p className="text-sm text-gray-500">Validated assessment instruments</p>
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-gray-700">Employed established psychological scales to measure creativity, need for uniqueness, self-esteem, and risk-taking propensity.</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex items-start">
                    <svg className="w-4 h-4 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <p className="text-sm text-gray-700">
                      Used CNFU-S for uniqueness, Rosenberg for self-esteem, and domain-specific risk scales
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Method 4: Creativity Manipulation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-white p-5 rounded-lg shadow-md border-l-4 border-yellow-500"
              >
                <div className="flex items-start mb-3">
                  <div className="w-10 h-10 flex-shrink-0 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Creativity Tasks</h3>
                    <p className="text-sm text-gray-500">Task-based experimental manipulation</p>
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-gray-700">Participants were randomly assigned to either creative idea generation tasks or practical problem-solving tasks to manipulate their creative mindset.</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex items-start">
                    <svg className="w-4 h-4 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <p className="text-sm text-gray-700">
                      Manipulation checks confirmed significant differences in creative thinking between conditions
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          <DownArrowPrompt onClick={() => scrollToSection("process")} />
        </section>

        {/* PROCESS SECTION */}
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
                From experimental design to academic insights: our systematic approach to creativity and risk-taking
              </p>
            </motion.div>

            {/* Define research steps for the UCL project */}
            {(() => {
              const researchSteps = [
                {
                  title: "Literature Review",
                  description: "Conducted comprehensive analysis of existing research on creativity and risk-taking, identifying key research gaps.",
                  insights: [
                    "Identified research gap in causal direction",
                    "Analyzed 40+ academic papers",
                    "Focused on psychological mechanisms",
                    "Developed testable hypotheses"
                  ]
                },
                {
                  title: "Study Design",
                  description: "Created experimental protocols to test the causal relationship between creativity tasks and risk-taking behavior.",
                  insights: [
                    "Designed randomized controlled trials",
                    "Created validation protocols",
                    "Established control conditions",
                    "Developed creativity manipulation tasks"
                  ]
                },
                {
                  title: "Data Collection",
                  description: "Recruited participants through Amazon MTurk and administered experimental conditions with control measures.",
                  insights: [
                    "Collected data from 233 participants (Study 1)",
                    "Collected data from 303 participants (Study 2)",
                    "Implemented data quality controls",
                    "Managed participant compensation"
                  ]
                },
                {
                  title: "Statistical Analysis",
                  description: "Applied mediation analysis and regression techniques to test hypothesized relationships between variables.",
                  insights: [
                    "Applied Baron & Kenny mediation steps",
                    "Used PROCESS macro for mediation",
                    "Conducted bootstrapping analysis",
                    "Performed robustness checks"
                  ]
                },
                {
                  title: "Report & Publication",
                  description: "Compiled findings into a Masters thesis and prepared results for potential academic publication.",
                  insights: [
                    "Completed MSc Psychology thesis",
                    "Identified practical implications",
                    "Prepared materials for peer review",
                    "Developed follow-up research questions"
                  ]
                }
              ];

              // State for action popup
              const [openActionPopup, setOpenActionPopup] = useState(null);
                
              // Toggle action popup
              const toggleActionPopup = (index) => {
                if (openActionPopup === index) {
                  setOpenActionPopup(null);
                } else {
                  setOpenActionPopup(index);
                }
              };

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
                      className="absolute -z-10 top-0 right-0 w-64 h-64 bg-gradient-to-r from-yellow-100 to-yellow-50 rounded-full blur-3xl opacity-30"
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="absolute -z-10 bottom-0 left-0 w-64 h-64 bg-gradient-to-r from-yellow-100 to-yellow-50 rounded-full blur-3xl opacity-30"
                    />

                    {/* Horizontal connecting line with gradient */}
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2 }}
                      className="absolute top-8 left-0 h-2 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600 rounded-full z-0"
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
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg mb-2 group-hover:scale-110 transition-transform duration-300">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600 font-bold text-lg">{index + 1}</span>
                            </div>
                          </div>
                          {/* Step title */}
                          <p className="text-xs font-semibold text-yellow-600 text-center max-w-[100px]">{step.title}</p>
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
                          index === 0 ? "bg-white border-yellow-200" :
                          index === 1 ? "bg-white border-yellow-200" :
                          index === 2 ? "bg-white border-yellow-200" :
                          index === 3 ? "bg-white border-yellow-200" :
                          "bg-white border-yellow-200"
                        } border`}>
                          {/* Front Side Content */}
                          <div className="p-3 h-full flex flex-col">
                            {/* Header with colored accent */}
                            <div className={`absolute top-0 left-0 right-0 h-2 ${
                              index === 0 ? "bg-yellow-400" :
                              index === 1 ? "bg-yellow-500" :
                              index === 2 ? "bg-yellow-500" :
                              index === 3 ? "bg-yellow-500" :
                              "bg-yellow-600"
                            }`}></div>
                            
                            {/* Step Icon and Number */}
                            <div className="flex items-center mb-2 mt-2">
                              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white mr-2 ${
                                index === 0 ? "bg-yellow-400" :
                                index === 1 ? "bg-yellow-500" :
                                index === 2 ? "bg-yellow-500" :
                                index === 3 ? "bg-yellow-500" :
                                "bg-yellow-600"
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
                                  index === 0 ? "bg-yellow-400 hover:bg-yellow-500" :
                                  index === 1 ? "bg-yellow-500 hover:bg-yellow-600" :
                                  index === 2 ? "bg-yellow-500 hover:bg-yellow-600" :
                                  index === 3 ? "bg-yellow-500 hover:bg-yellow-600" :
                                  "bg-yellow-600 hover:bg-yellow-700"
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
                                    index === 0 ? "text-yellow-500" :
                                    index === 1 ? "text-yellow-600" :
                                    index === 2 ? "text-yellow-600" :
                                    index === 3 ? "text-yellow-600" :
                                    "text-yellow-700"
                                  }`}>
                                    Actions Taken:
                                  </div>
                                  <ul className="space-y-1 max-h-40 overflow-y-auto custom-scrollbar pr-1">
                                    {step.insights.map((insight, i) => (
                                      <li key={i} className="text-gray-600 text-xs leading-tight flex items-start">
                                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 mr-1 mt-0.5 flex-shrink-0 ${
                                          index === 0 ? "text-yellow-400" :
                                          index === 1 ? "text-yellow-500" :
                                          index === 2 ? "text-yellow-500" :
                                          index === 3 ? "text-yellow-500" :
                                          "text-yellow-600"
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

        {/* FINDINGS SECTION */}
        <section
          ref={sectionRefs.findings_insights}
          id="findings_insights"
          className="xl:snap-start xl:min-h-screen flex flex-col justify-center items-center py-16 px-4 xl:py-10 xl:px-8 relative"
        >
          <div className="w-full xl:max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-5"
            >
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
                Statistical evidence on the relationship between creativity, personality traits, and risk-taking behavior
              </motion.p>
            </motion.div>
            
            {/* Stats Row */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Stat 1 - Creativity Effect */}
              <motion.div 
                className="bg-white rounded-lg shadow-sm overflow-hidden"
                whileHover={{ y: -4, boxShadow: "0 12px 20px -5px rgba(234, 179, 8, 0.2)" }}
              >
                <div className="h-1.5 bg-yellow-500 w-full"></div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-500">Creative Effect</span>
                    <span className="flex items-center text-yellow-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </span>
                  </div>
                  <div className="flex items-baseline mt-1">
                    <span className="text-3xl font-bold text-yellow-500">+0.40</span>
                    <span className="text-yellow-500 ml-1">p&lt;.01</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Increase in risk-taking willingness</div>
                </div>
              </motion.div>
              
              {/* Stat 2 - Study 2 Replication */}
              <motion.div 
                className="bg-white rounded-lg shadow-sm overflow-hidden"
                whileHover={{ y: -4, boxShadow: "0 12px 20px -5px rgba(234, 179, 8, 0.2)" }}
              >
                <div className="h-1.5 bg-yellow-500 w-full"></div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-500">Replication</span>
                    <span className="flex items-center text-yellow-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </span>
                  </div>
                  <div className="flex items-baseline mt-1">
                    <span className="text-3xl font-bold text-yellow-500">+0.26</span>
                    <span className="text-yellow-500 ml-1">p&lt;.05</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Study 2 confirmed effect</div>
                </div>
              </motion.div>
              
              {/* Stat 3 - Uniqueness Pathway */}
              <motion.div 
                className="bg-white rounded-lg shadow-sm overflow-hidden"
                whileHover={{ y: -4, boxShadow: "0 12px 20px -5px rgba(30, 30, 30, 0.2)" }}
              >
                <div className="h-1.5 bg-black w-full"></div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-500">Uniqueness</span>
                    <span className="flex items-center text-black">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                  <div className="flex items-baseline mt-1">
                    <span className="text-3xl font-bold text-black">0.205</span>
                    <span className="text-gray-600 ml-1">p&lt;.05</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">NFU predicts risk-taking</div>
                </div>
              </motion.div>
              
              {/* Stat 4 - Self Esteem Pathway */}
              <motion.div 
                className="bg-white rounded-lg shadow-sm overflow-hidden"
                whileHover={{ y: -4, boxShadow: "0 12px 20px -5px rgba(30, 30, 30, 0.2)" }}
              >
                <div className="h-1.5 bg-black w-full"></div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-500">Self-Esteem</span>
                    <span className="flex items-center text-black">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                  <div className="flex items-baseline mt-1">
                    <span className="text-3xl font-bold text-black">0.196</span>
                    <span className="text-gray-600 ml-1">p&lt;.05</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">SE predicts risk-taking</div>
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
                <div className="h-1.5 bg-yellow-500 w-full"></div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Study 1: Creativity Increases Risk-Taking</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Independent t-test showed the Creative group (M=5.18) had significantly higher Willingness to Take Risks than the Practical group (M=4.78) with p&lt;.01, demonstrating that engaging in creative work directly increases risk propensity.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Statistically Significant (p&lt;.01)
                    </span>
                    <button
                      className="px-3 py-1 text-xs font-medium text-yellow-600 border border-yellow-500 rounded-full hover:bg-yellow-50 focus:outline-none"
                      onClick={() => openMediationModal(mediationModels.uniquenessModel)}
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
                <div className="h-1.5 bg-yellow-500 w-full"></div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Study 2: Results Replicated</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Creative group (M=4.89) again showed higher Willingness to Take Risks than Practical group (M=4.63) with p&lt;.05, confirming the primary finding with an alternate creativity manipulation task.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Statistically Significant (p&lt;.05)
                    </span>
                    <button
                      className="px-3 py-1 text-xs font-medium text-yellow-600 border border-yellow-500 rounded-full hover:bg-yellow-50 focus:outline-none"
                      onClick={() => openMediationModal(mediationModels.selfEsteemModel)}
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
                <div className="h-1.5 bg-black w-full"></div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Need for Uniqueness Mediation</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Need for Uniqueness did not mediate the relationship between creativity and risk-taking. While NFU predicted risk-taking (B = 0.205, p &lt; 0.05), the pathway from creativity to NFU was not significant.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Partial Significance
                    </span>
                    <button
                      className="px-3 py-1 text-xs font-medium text-gray-800 border border-black rounded-full hover:bg-gray-50 focus:outline-none"
                      onClick={() => openMediationModal(mediationModels.uniquenessModel)}
                    >
                      View Mediation
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
                <div className="h-1.5 bg-black w-full"></div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Self-Esteem Mediation</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Self-Esteem did not mediate the creativity-risk relationship. Though Self-Esteem predicted risk-taking (B = 0.196, p &lt; 0.05), the pathway from creativity to Self-Esteem was not significant.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Partial Significance
                    </span>
                    <button
                      className="px-3 py-1 text-xs font-medium text-gray-800 border border-black rounded-full hover:bg-gray-50 focus:outline-none"
                      onClick={() => openMediationModal(mediationModels.selfEsteemModel)}
                    >
                      View Mediation
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          <DownArrowPrompt onClick={() => scrollToSection("impact_outcomes")} />
        </section>

        {/* IMPACT SECTION */}
        <section
          ref={sectionRefs.impact_outcomes}
          id="impact_outcomes"
          className="xl:snap-start xl:min-h-screen flex flex-col justify-center items-center py-16 px-4 xl:py-10 xl:px-8 relative"
        >
          <div className="w-full xl:max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-12 text-center"
            >
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Impact & Outcomes</h2>
              <div className="w-20 h-1 bg-yellow-500 mx-auto mb-8"></div>
              <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
                How our research influences psychological theory and entrepreneurial education
              </p>
            </motion.div>

            {/* Impact content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
              >
                <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-yellow-500 text-white flex items-center justify-center mr-3">📊</span>
                  Research Metrics
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-yellow-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span className="text-gray-700">Study 1: +0.40 effect size difference in WTR (Cohen's d .35 approx)</span>
                    </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-yellow-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span className="text-gray-700">Study 2: +0.26 effect size difference in WTR (Cohen's d .24 approx)</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-yellow-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span className="text-gray-700">No significant differences in demographic variables between conditions</span>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
              >
                <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-yellow-500 text-white flex items-center justify-center mr-3">🚀</span>
                  Business Implications
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-yellow-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span className="text-gray-700">Creativity tasks foster risk-taking mindsets among participants</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-yellow-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span className="text-gray-700">Need for uniqueness / self-esteem not strongly shaping that shift</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-yellow-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span className="text-gray-700">Potential strategy: short creative breaks or "creative priming" sessions in workplaces</span>
                  </li>
                </ul>
              </motion.div>
              </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-8 bg-white p-6 rounded-lg shadow-md border border-gray-100"
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Career Impact & Further Research</h3>
              <p className="text-gray-700 mb-4">
                The project's innovative approach and significant findings led to a research assistant position at the UCL School of Management, where I continued exploring risk-taking behavior in organizational contexts.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="bg-yellow-50 p-4 rounded-md">
                  <h4 className="font-medium text-gray-800 mb-2">Follow-up Studies</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-yellow-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      <span>Whether group-based creativity exercises produce similar effects</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-yellow-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      <span>Individual differences in the creativity-risk relationship</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-yellow-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      <span>Whether the effect persists in high-stakes decision scenarios</span>
                    </li>
                </ul>
                </div>
                <div className="bg-yellow-50 p-4 rounded-md">
                  <h4 className="font-medium text-gray-800 mb-2">Broader Contributions</h4>
                  <p className="text-sm text-gray-700">
                    The research contributed to a growing body of work on fostering innovation cultures where calculated risk-taking is encouraged rather than punished. This provides valuable insights for organizational psychology and management practices.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
          <DownArrowPrompt onClick={() => scrollToSection("visuals1")} />
        </section>

        {/* VISUALIZATIONS SECTION 1: Mediation Models (Uniqueness) */}
        <section
          ref={sectionRefs.visuals1}
          id="visuals1"
          className="xl:snap-start xl:min-h-screen flex flex-col justify-center items-center py-16 px-4 xl:py-10 xl:px-8 bg-gray-50 relative"
        >
          <div className="w-full xl:max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Mediation Model Visualizations</h2>
              <div className="w-20 h-1 bg-yellow-500 mx-auto mb-4"></div>
              <p className="text-lg text-gray-700 mb-4 max-w-3xl mx-auto">
                Statistical analysis of creativity and risk-taking relationships
              </p>
            </motion.div>

            {/* Visualizations content */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {/* Uniqueness Mediation Model Card */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Figure 1. Mediation Model</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Need For Uniqueness as mediator between creativity and risk-taking
                  </p>
                  
                  {/* Image placeholder */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <Image
                      src="/images/ucl/figure1.jpg"
                      alt="Mediation Model 1: Need for Uniqueness"
                      width={500}
                      height={350}
                      className="w-full h-auto"
                    />
                  </div>
                  
                  <button
                    onClick={() => openMediationModal(mediationModels.uniquenessModel)}
                    className="w-full py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors text-sm font-medium"
                  >
                    View Detailed Analysis
                  </button>
                </div>
              </motion.div>
              
              {/* Self-Esteem Mediation Model Card */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Figure 2. Mediation Model</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Self-Esteem as mediator between creativity and risk-taking
                  </p>
                  
                  {/* Image placeholder */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <Image
                      src="/images/ucl/figure2.jpg"
                      alt="Mediation Model 2: Self-Esteem"
                      width={500}
                      height={350}
                      className="w-full h-auto"
                    />
                  </div>
                  
                  <button
                    onClick={() => openMediationModal(mediationModels.selfEsteemModel)}
                    className="w-full py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors text-sm font-medium"
                  >
                    View Detailed Analysis
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>
          <DownArrowPrompt onClick={() => scrollToSection("visuals2")} />
        </section>

        {/* THANK YOU / CONTACT SECTION */}
        <section
          ref={sectionRefs.thank_you}
          id="thank_you"
          className="xl:snap-start flex flex-col justify-center items-center py-16 pb-24 px-4 md:py-10 xl:py-6 xl:px-8 bg-gray-50"
        >
          <div className="w-full xl:max-w-3xl mx-auto text-center">
            <motion.h2
              className="text-2xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              UCL Psychology Research Study on Creativity & Risk
            </motion.h2>
            
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold mb-2 text-gray-900">University College London, Department of Psychology</h3>
              <p className="text-gray-700 mb-3">MSc Psychology Thesis: "Connecting Creativity and Risk-Taking: Psychological Mechanisms"</p>
              <p className="text-gray-600 text-sm mb-4">This experimental study examined how engaging in creative activities influences risk-taking tendencies, with implications for entrepreneurship and innovation contexts.</p>
              <Link href="https://www.ucl.ac.uk/psychology-language-sciences/" target="_blank" rel="noopener noreferrer">
                <span className="text-yellow-700 hover:text-yellow-900 font-medium flex items-center justify-center">
                  <span>Visit UCL Psychology Department</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                </span>
              </Link>
            </motion.div>
            
            <motion.div 
              className="mb-8 cursor-pointer inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => window.location.href = 'mailto:milt.stefanidis@gmail.com'}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-12 w-12 mx-auto text-yellow-500 hover:text-yellow-600 transition-colors"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <button 
                onClick={() => scrollToSection('overview')} 
                className="inline-flex items-center px-5 py-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
              >
                Return to Top
              </button>
              
              <Link 
                href="https://www.ucl.ac.uk/pals/ucl-division-psychology-and-language-sciences" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
              >
                Visit UCL Psychology Department
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Mediation Model Modal */}
        <MediationModelModal 
          isOpen={modalOpen} 
          onClose={closeMediationModal} 
          title={currentModelData?.title} 
          data={currentModelData} 
        />
      </main>
    </div>
  );
}