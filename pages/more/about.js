import { useState, useRef, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  FaCode,
  FaDatabase,
  FaUserCheck,
  FaLightbulb,
  FaChevronDown,
  FaUserAlt,
  FaBriefcase,
  FaGraduationCap,
  FaTools,
  FaHandsHelping,
  FaQuoteLeft,
  FaQuoteRight,
  FaHeart,
  FaMusic,
  FaChartLine,
  FaLaptopCode,
} from "react-icons/fa";
import Image from "next/image";

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

// ====== Timeline Item Component ======
function TimelineItem({ date, logo, title, subtitle, description }) {
  return (
    <motion.div
      className="flex w-full mb-8"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="w-full">
        <div className="flex items-start">
          <div className="flex-none mr-6">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center overflow-hidden border-2 border-indigo-300">
              {logo ? (
                <Image
                  src={logo}
                  alt={title}
                  width={60}
                  height={60}
                  className="object-cover"
                />
              ) : (
                <div className="w-12 h-12 bg-indigo-500 rounded-full"></div>
              )}
            </div>
          </div>
          <div className="flex-grow">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-500">
              <div className="font-bold text-xl text-gray-800">{title}</div>
              <div className="text-indigo-600 font-medium mb-3">{subtitle}</div>
              <div className="text-gray-600 whitespace-pre-line">{description}</div>
            </div>
            <div className="text-sm font-semibold mt-2 text-indigo-500">
              {date}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ====== Skills Data ======
const skillsData = {
  Programming: {
    bgColor: "bg-blue-50",
    intro: [
      "Building robust, efficient applications",
      "Creating data pipelines and APIs",
      "Optimizing code for performance and scalability",
    ],
    tools: [
      { name: "Python", description: "Scripting, data analysis, ML prototypes", proficiency: 90 },
      { name: "SQL", description: "Relational queries, schema design, ETL", proficiency: 90 },
      { name: "MATLAB", description: "Scientific computing, prototyping", proficiency: 60 },
      { name: "C/C++", description: "High-performance apps, embedded systems", proficiency: 50 },
    ],
    icon: <FaCode className="text-5xl mb-4 mx-auto text-blue-700" />,
  },
  "Data & Databases": {
    bgColor: "bg-green-50",
    intro: [
      "Turning raw data into actionable insights",
      "Designing dashboards and data visualizations",
      "Leveraging modern databases for data storage",
    ],
    tools: [
      { name: "Power BI", description: "Interactive dashboards & data viz", proficiency: 100 },
      { name: "Tableau", description: "Drag-and-drop data visualizations", proficiency: 75 },
      { name: "Google Analytics", description: "Web analytics & traffic insights", proficiency: 100 },
      { name: "Microsoft SQL", description: "Relational DBMS for large-scale apps", proficiency: 95 },
      { name: "Snowflake", description: "Cloud-based data warehousing", proficiency: 100 },
      { name: "MongoDB", description: "NoSQL document-oriented database", proficiency: 60 },
      { name: "R", description: "Statistical computing & data wrangling", proficiency: 85 },
      { name: "SPSS", description: "Advanced stats & market research", proficiency: 100 },
      { name: "STATA", description: "Econometric analysis", proficiency: 75 },
    ],
    icon: <FaDatabase className="text-5xl mb-4 mx-auto text-green-700" />,
  },
  "UX & Mixed Methods": {
    bgColor: "bg-red-50",
    intro: [
      "Uncovering deep user insights",
      "Designing user interviews & field studies",
      "Analyzing open-ended feedback + quantitative surveys",
    ],
    tools: [
      { name: "Qualtrics", description: "Advanced survey & research platform", proficiency: 95 },
      { name: "SurveyMonkey", description: "Quick online surveys", proficiency: 100 },
      { name: "Dovetail", description: "Qualitative data organization & analysis", proficiency: 100 },
      { name: "UserTesting", description: "Remote user testing platform", proficiency: 85 },
      { name: "Optimal Workshop", description: "Card sorts & tree tests", proficiency: 90 },
      { name: "Userlytics", description: "Remote video-based user interviews", proficiency: 80 },
      { name: "NVivo", description: "Software for analyzing unstructured data", proficiency: 70 },
      { name: "UserPilot", description: "Remote user education platform", proficiency: 100 },
    ],
    icon: <FaUserCheck className="text-5xl mb-4 mx-auto text-red-700" />,
  },
  "Prototyping & Collaboration": {
    bgColor: "bg-yellow-50",
    intro: [
      "Translating ideas into interactive prototypes",
      "Facilitating team brainstorming",
      "Gathering rapid user feedback on designs",
    ],
    tools: [
      { name: "Miro", description: "Visual collaboration & whiteboarding", proficiency: 95 },
      { name: "Figma", description: "Design, prototype & gather feedback", proficiency: 80 },
      { name: "Adobe XD", description: "UI/UX design & prototyping", proficiency: 55 },
    ],
    icon: <FaLightbulb className="text-5xl mb-4 mx-auto text-yellow-600" />,
  },
};

// ====== Experience Data ======
const experienceData = [
  {
    title: "Advisor 360°",
    subtitle: "Quantitative Researcher / Data Analyst (UX/ML)",
    date: "March 2022 - March 2025",
    description: "Led quantitative UX research, integrating CRM/GA data, applying ML to optimize financial tools and feedback analysis, and mapping user value to drive data-informed product decisions.",
    logo: "/images/a360.png",
  },
  {
    title: "Harvard Business School",
    subtitle: "Research Associate (Arthur Rock Center for Entrepreneurship)",
    date: "January 2020 - October 2020",
    description: "Piloted research on startup performance metrics using survey data (Crunchbase, PitchBook), developing insights that informed revitalized engagement strategies and survey design.",
    logo: "/images/hbs2.png",
  },
  {
    title: "UCL School of Management",
    subtitle: "Research Associate (Organizational Psychology and Risky Decision Making)",
    date: "January 2016 - September 2019",
    description: "Pioneered organizational risk perception studies, deployed innovative experimental techniques, and collaborated with industry leaders to uncover key insights into decision-making.",
    logo: "/images/UCLSoM_logo.jpg",
  },
  {
    title: "AHEPA University Hospital",
    subtitle: "Research Assistant (Experimental Psychology)",
    date: "February 2014 - April 2015",
    description: "Headed research on cognitive assessment and neuropsychological testing, designing experimental protocols to investigate the behavioral consequences of dopamine medication on cognitive flexibility in Parkinson's Disease patients.",
    logo: "/images/ahepa.png",
  },
];

// ====== Education Data ======
const educationData = [
  {
    title: "University College London, UK",
    subtitle: "Master of Science in Cognitive and Decision Sciences",
    date: "2015 - 2016",
    description: "MSc Grade: 3.8 USA GPA\n\nAdvanced Student Academic Representative (StAR)",
    logo: "/images/ucl-logo-black-on-grey_2.jpg",
  },
  {
    title: "University of Sheffield, UK",
    subtitle: "Bachelor of Science (Hons) in Psychology",
    date: "2011 - 2014",
    description: "BSc Grade: First Class Honors; 4.0 USA GPA\n\nFirst Class Representative",
    logo: "/images/shef_primary_logo.jpg",
  },
];

// Update the volunteering data to use simple sentences instead of bullet points
const volunteeringData = [
  {
    title: "Harvard Business School, Boston, MA, USA",
    subtitle: "Online Learning Facilitator for Prof. Brian Hall's module, Behavioral Approaches to Decision-Making",
    date: "March 2020 - June 2020",
    description: "Collaborated with HBS faculty to streamline course delivery for 20 PhD students and led the effective adoption of Zoom and other remote learning tools, preserving classroom engagement during distance learning.",
    logo: "/images/hbs2.png",
  },
  {
    title: "London Science Museum, London, UK",
    subtitle: "Project Coordinator for UCL's Institute of Cognitive Neuroscience Pocket Smile Residency",
    date: "September 2016 - December 2016",
    description: "Directed a team of 10 Masters students in a novel cognitive intervention study, achieving record-breaking engagement rates while conducting rigorous regression analysis to correlate intervention data with established neuroimaging findings.",
    logo: "/images/sm.png",
  },
];

// A helper component for the arrow prompt
function DownArrowPrompt({ onClick }) {
  return (
    <motion.div
      className="absolute bottom-4 sm:bottom-2 md:bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-20"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.5 }} 
      onClick={onClick}
    >
      <FaChevronDown className="text-2xl sm:text-3xl text-gray-500 animate-bounce" />
    </motion.div>
  );
}

// Interest bubble component
const InterestBubble = ({ icon, text }) => (
  <motion.div
    className="bg-indigo-100 text-indigo-800 rounded-full px-3 sm:px-4 py-1 sm:py-2 flex items-center gap-1 sm:gap-2 shadow-sm text-xs sm:text-sm"
    whileHover={{ scale: 1.05, backgroundColor: "#c7d2fe" }}
    whileTap={{ scale: 0.95 }}
  >
    {icon}
    <span className="font-medium">{text}</span>
  </motion.div>
);

// Interactive card component for timeline items with hover effects
function TimelineCard({ date, logo, title, subtitle, description, index }) {
  return (
    <motion.div
      className="relative z-10 bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -5, 
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        borderColor: "#6366f1"
      }}
    >
      <div className="h-1 bg-indigo-600 w-full" />
      <div className="p-4 sm:p-6">
        <div className="flex items-center mb-4">
          <div className="relative flex-shrink-0 mr-3 sm:mr-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white shadow-sm flex items-center justify-center overflow-hidden">
              {logo ? (
                <div className="absolute inset-0 flex items-center justify-center bg-white">
                  <Image
                    src={logo}
                    alt={title}
                    width={45}
                    height={45}
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="w-full h-full bg-indigo-500" />
              )}
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-indigo-100" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">{title}</h3>
            <p className="text-sm sm:text-base text-indigo-600 font-medium">{subtitle}</p>
          </div>
        </div>
        
        <p className="text-sm sm:text-base text-gray-600 mb-4 whitespace-pre-line">{description}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-xs sm:text-sm font-semibold text-indigo-500 bg-indigo-50 py-1 px-3 rounded-full">
            {date}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// Section title component for consistency
function SectionTitle({ title }) {
  return (
    <motion.div
      className="mb-6 sm:mb-10 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <motion.h2
        className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-3"
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {title}
      </motion.h2>
      <motion.div
        className="h-1 w-24 sm:w-32 bg-indigo-600 rounded"
        initial={{ width: 0 }}
        whileInView={{ width: 128 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      />
    </motion.div>
  );
}

// ====== SkillProgressWrapper Component ======
function SkillProgressWrapper({ tool, animatedProgressBars, setAnimatedProgressBars }) {
  const toolIdentifier = tool.name;
  const ref = useRef(null);
  // useInView will become true once and stay true for this instance when it enters viewport
  const isInView = useInView(ref, { once: true, amount: 0.8 });

  useEffect(() => {
    // If this instance is in view AND it hasn't been globally marked as animated yet,
    // mark it now. This ensures the global state is updated even if animation is interrupted.
    if (isInView && !animatedProgressBars.has(toolIdentifier)) {
      setAnimatedProgressBars(prev => new Set(prev).add(toolIdentifier));
    }
  }, [isInView, toolIdentifier, animatedProgressBars, setAnimatedProgressBars]);

  const hasBeenAnimatedGlobally = animatedProgressBars.has(toolIdentifier);

  return (
    <div ref={ref} className="w-full h-1 sm:h-1.5 bg-gray-200 rounded-full overflow-hidden">
      {hasBeenAnimatedGlobally ? (
        // Render statically if globally marked as animated
        <div
          className="h-full bg-indigo-600 rounded-full"
          style={{ width: `${tool.proficiency}%` }}
        />
      ) : (
        // Otherwise, render the motion component that will animate when isInView becomes true
        <motion.div
          className="h-full bg-indigo-600 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: isInView ? `${tool.proficiency}%` : "0%" }}
          transition={{ duration: 0.8, ease: "easeOut" /* No individual delay here */ }}
        />
      )}
    </div>
  );
}

export default function About() {
  const [activeTab, setActiveTab] = useState("Programming");
  const [activeSection, setActiveSection] = useState("about");
  const [animatedProgressBars, setAnimatedProgressBars] = useState(new Set());
  const sectionRefs = {
    about: useRef(null),
    experience: useRef(null),
    education: useRef(null),
    volunteering: useRef(null),
    skills: useRef(null),
  };
  const mainRef = useRef(null);

  // Intersection Observer to track active section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionRefs]);

  // Function to scroll to a section
  const scrollToSection = (sectionId) => {
    sectionRefs[sectionId].current?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };

  return (
    <div className="flex flex-col xl:flex-row h-screen overflow-hidden bg-gray-50">
      <ScrollProgress />
      <div className="w-full xl:w-[24%]">
        <Sidebar />
      </div>
      {/* Main Content */}
      <main
        ref={mainRef}
        className="w-full xl:w-[76%] h-screen overflow-y-scroll xl:snap-y xl:snap-mandatory"
      >
        {/* Navigation */}
        <div className="sticky top-0 z-40 py-3 backdrop-blur-sm">
          <div className="flex justify-center mx-auto">
            {/* Mobile nav - single active section display */}
            <div className="flex xl:hidden">
              <span className="px-4 py-2 text-sm font-medium rounded-md bg-indigo-100 text-indigo-700">
                {activeSection.charAt(0).toUpperCase() + activeSection.slice(1).replace(/([A-Z])/g, ' $1')}
              </span>
            </div>
            
            {/* Desktop nav - all sections */}
            <nav className="hidden xl:flex space-x-6">
              {[
                { id: "about", label: "About Me", icon: <FaUserAlt className="mr-2" /> },
                { id: "experience", label: "Experience", icon: <FaBriefcase className="mr-2" /> },
                { id: "education", label: "Education", icon: <FaGraduationCap className="mr-2" /> },
                { id: "volunteering", label: "Volunteering", icon: <FaHandsHelping className="mr-2" /> },
                { id: "skills", label: "Skills & Tools", icon: <FaTools className="mr-2" /> },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 flex items-center ${
                    activeSection === item.id
                      ? "bg-indigo-600 text-white shadow-md"
                      : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* ====== About Me Section ====== */}
        <section 
          id="about" 
          ref={sectionRefs.about}
          className="xl:snap-start min-h-screen flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-6 sm:py-10 lg:py-16 relative"
        >
          <div className="max-w-6xl mx-auto">
            {/* Animated Header */}
            <motion.div
              className="mb-6 sm:mb-12 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3"
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="text-indigo-600">Hello,</span> I'm Miltos
              </motion.h1>
              <motion.div
                className="h-1 w-24 sm:w-32 bg-indigo-600 rounded"
                initial={{ width: 0 }}
                animate={{ width: 128 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 sm:gap-8 items-start">
              {/* Profile Photo & Quote */}
              <motion.div 
                className="md:col-span-2 space-y-4 sm:space-y-8"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <motion.div 
                  className="rounded-2xl overflow-hidden border-4 border-indigo-500 shadow-xl max-w-xs mx-auto mx-70"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Image 
                    src="/images/me.jpeg" 
                    alt="Miltiadis Stefanidis" 
                    width={400} 
                    height={400}
                    className="object-cover w-full" 
                  />
                </motion.div>
                
                {/* Quote - Hidden on smallest screens */}
                <motion.div 
                  className="hidden sm:block bg-white p-4 sm:p-6 rounded-xl shadow-md border-l-4 border-indigo-500 relative"
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FaQuoteLeft className="text-indigo-200 text-2xl sm:text-4xl absolute top-3 left-3 opacity-50" />
                  <p className="text-gray-700 italic text-sm sm:text-lg ml-7 mt-4">
                    The most surprising insights often surface when you listen for the unexpected.
                  </p>
                  <FaQuoteRight className="text-indigo-200 text-2xl sm:text-4xl absolute bottom-3 right-3 opacity-50" />
                </motion.div>
              </motion.div>
              
              {/* About Content */}
              <motion.div
                className="md:col-span-3 flex flex-col space-y-4 sm:space-y-6"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="text-xl sm:text-2xl font-semibold text-indigo-700">Quantitative UX Researcher & Behavioral Scientist</h2>
                
                <div className="text-sm sm:text-base text-gray-700 leading-relaxed sm:leading-loose space-y-3 sm:space-y-4">
                  <p>
                    I'm driven by an endless curiosity about how people think, decide, and interact with technology. Rooted in experimental psychology, behavioral economics, and data science, I turn "messy" behavioral signals into crisp, actionable insights that help product teams ship experiences users love.
                  </p>
                  
                  <p>
                    At Advisor360°, Harvard Business School, and UCL, I've built research programs that reveal not just what users do, but why. Whether I'm mapping end-to-end journeys, designing large-scale experiments, or building real-time dashboards, I blend empirical rigor with human empathy to translate complex findings into clear product strategy.
                  </p>
                  
                  <p>
                    My toolkit spans quantitative research, predictive modeling, and interactive analytics. By fusing cognitive science with computational methods, I help teams cut through noise, challenge assumptions, and make data-informed decisions that move the metrics that matter.
                  </p>
                </div>
                
                {/* Interests & Hobbies */}
                <div className="mt-4 sm:mt-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">Beyond Work</h3>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    <InterestBubble icon={<FaMusic />} text="Playing Instruments" />
                    <InterestBubble icon={<FaChartLine />} text="Economics" />
                    <InterestBubble icon={<FaLaptopCode />} text="Coding" />
                    <InterestBubble icon={<FaHeart />} text="Volunteering" />
                  </div>
                </div>
                
                {/* Animated Stats */}
                <motion.div 
                  className="grid grid-cols-3 gap-2 sm:gap-4 mt-4 sm:mt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  {[
                    { label: "Years Experience", value: "8+" },
                    { label: "Research Projects", value: "50+" },
                    { label: "Research & Data Methods", value: "25+" }
                  ].map((stat, index) => (
                    <motion.div 
                      key={index}
                      className="bg-white p-2 sm:p-4 rounded-lg shadow-sm text-center"
                      whileHover={{ scale: 1.05, backgroundColor: "#EEF2FF" }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <span className="block text-xl sm:text-3xl font-bold text-indigo-600">{stat.value}</span>
                      <span className="text-xs sm:text-sm text-gray-600">{stat.label}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>

          <DownArrowPrompt onClick={() => scrollToSection("experience")} />
        </section>

        {/* ====== Experience Section ====== */}
        <section 
          id="experience" 
          ref={sectionRefs.experience}
          className="xl:snap-start min-h-screen flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-6 sm:py-10 lg:py-20 relative"
        >
          <div className="max-w-6xl mx-auto">
            <SectionTitle title="Experience" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
              {experienceData.map((item, idx) => (
                <TimelineCard 
                  key={idx}
                  index={idx}
                  date={item.date}
                  logo={item.logo}
                  title={item.title}
                  subtitle={item.subtitle}
                  description={item.description}
                />
              ))}
            </div>
          </div>

          <DownArrowPrompt onClick={() => scrollToSection("education")} />
        </section>

        {/* ====== Education Section ====== */}
        <section 
          id="education" 
          ref={sectionRefs.education}
          className="xl:snap-start min-h-screen flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-6 sm:py-10 lg:py-20 relative"
        >
          <div className="max-w-6xl mx-auto">
            <SectionTitle title="Education" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
              {educationData.map((item, idx) => (
                <TimelineCard 
                  key={idx}
                  index={idx}
                  date={item.date}
                  logo={item.logo}
                  title={item.title}
                  subtitle={item.subtitle}
                  description={item.description}
                />
              ))}
            </div>
          </div>

          <DownArrowPrompt onClick={() => scrollToSection("volunteering")} />
        </section>

        {/* ====== Volunteering Section ====== */}
        <section 
          id="volunteering" 
          ref={sectionRefs.volunteering}
          className="xl:snap-start min-h-screen flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-6 sm:py-10 lg:py-20 relative"
        >
          <div className="max-w-6xl mx-auto">
            <SectionTitle title="Volunteering" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
              {volunteeringData.map((item, idx) => (
                <TimelineCard 
                  key={idx}
                  index={idx}
                  date={item.date}
                  logo={item.logo}
                  title={item.title}
                  subtitle={item.subtitle}
                  description={item.description}
                />
              ))}
            </div>
          </div>

          <DownArrowPrompt onClick={() => scrollToSection("skills")} />
        </section>

        {/* ====== Skills & Tools Section ====== */}
        <section 
          id="skills" 
          ref={sectionRefs.skills}
          className="xl:snap-start min-h-screen flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-6 sm:py-10 lg:py-20 relative"
        >
          <div className="max-w-6xl mx-auto w-full">
            <SectionTitle title="Skills &amp; Tools" />

            {/* Interactive Tabs */}
            <motion.div
              className="w-full"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Tab Buttons */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-10">
                {Object.keys(skillsData).map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setActiveTab(category)}
                    className={`px-3 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                      activeTab === category
                        ? "bg-indigo-600 text-white shadow-lg transform scale-105"
                        : "bg-white text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 shadow-md"
                    }`}
                    whileHover={{ scale: activeTab === category ? 1.05 : 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white p-4 sm:p-8 rounded-2xl shadow-xl border border-gray-100 min-h-[480px] sm:min-h-[520px] lg:min-h-[500px]"
                >
                  {/* Icon and Intro */}
                  <motion.div 
                    className="mb-4 sm:mb-8 flex flex-col items-center"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {skillsData[activeTab].icon}
                    <div className="max-w-3xl mx-auto">
                      <ul className="list-none space-y-1 sm:space-y-2 text-center">
                        {skillsData[activeTab].intro.map((item, idx) => (
                          <motion.li 
                            key={idx} 
                            className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>

                  {/* Tools Grid with improved cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
                    {skillsData[activeTab].tools.map((tool, idx) => {
                      return (
                        <motion.div
                          key={tool.name}
                          className="relative group bg-gradient-to-br from-indigo-50 to-white p-3 sm:p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-indigo-100"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          whileHover={{ 
                            y: -5,
                            boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.2)",
                            borderColor: "#6366f1" 
                          }}
                        >
                          <div className="flex flex-col h-full">
                            <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-1 sm:mb-2">{tool.name}</h3>
                            <p className="text-xs sm:text-sm text-gray-600 flex-grow">{tool.description}</p>
                            <div className="mt-auto pt-2 sm:pt-3">
                              <SkillProgressWrapper
                                tool={tool}
                                animatedProgressBars={animatedProgressBars}
                                setAnimatedProgressBars={setAnimatedProgressBars}
                              />
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}