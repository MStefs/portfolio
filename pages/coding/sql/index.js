import { useState, useRef, useEffect } from "react";
import Sidebar from "../../../components/Sidebar";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowRight, FaDatabase, FaChartLine, FaNetworkWired, FaChevronDown } from "react-icons/fa";

// ScrollProgress component
function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const mainElement = document.querySelector('main'); // Use the main scrolling element for calculations
      if (mainElement) {
        const totalHeight = mainElement.scrollHeight - mainElement.clientHeight;
        const progress = (mainElement.scrollTop / totalHeight) * 100;
        setScrollProgress(Math.min(progress, 100));
      } else {
        // Fallback for initial render or if main is not found
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.pageYOffset / totalHeight) * 100;
        setScrollProgress(Math.min(progress, 100));
      }
    };
    
    // Initial calculation
    handleScroll(); // Call once to set initial state based on current scroll
    
    // Throttle scroll events
    let timeoutId = null;
    const throttledScroll = () => {
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          handleScroll();
          timeoutId = null;
        }, 100);
      }
    };
    
    const mainElement = document.querySelector('main');
    const scrollableElement = mainElement || window; // Listen to main or window

    scrollableElement.addEventListener("scroll", throttledScroll);
    return () => {
      scrollableElement.removeEventListener("scroll", throttledScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);
  
  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 xl:ml-[24%]"> {/* Adjust margin for xl screens */}
      <div 
        className="h-full bg-indigo-600" 
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}

// ContentNavigation component
function ContentNavigation({ sections, activeSection, scrollToSection }) {
  // Determine the display label for mobile view
  let displayLabel = "";
  const currentNavItem = sections.find(item => item.id === activeSection);
  if (currentNavItem) {
    displayLabel = currentNavItem.label;
  } else if (activeSection) {
    // Fallback for sections not in navItems (e.g. if observer picks up something else)
    displayLabel = activeSection.replace(/_/g, ' ').replace(/\\b\\w/g, l => l.toUpperCase()).split(" ").slice(0,2).join(" ");
    if (displayLabel.length > 20 && displayLabel.includes(" ")) displayLabel = displayLabel.split(" ")[0] + "..."; 
    else if (displayLabel.length > 20) displayLabel = displayLabel.substring(0, 18) + "...";
  } else {
    displayLabel = "Menu"; // Default if no active section
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
    <div className="sticky top-0 z-40 py-2 xl:py-3 backdrop-blur-sm bg-opacity-30">
      {/* Full nav for xl screens and up */}
      <div className="hidden xl:flex justify-center mx-auto">
        <nav className="flex space-x-3 xl:space-x-6">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`px-2 py-0.5 text-xs xl:px-3 xl:py-1 xl:text-sm font-medium rounded-md transition-colors ${
                activeSection === section.id
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {section.label}
            </button>
          ))}
        </nav>
      </div>
      {/* Active section title for screens smaller than xl */}
      <div className="flex xl:hidden justify-center items-center h-full px-4">
        <span className="text-xs font-medium text-indigo-700 bg-indigo-100 px-3 py-1 rounded-md truncate" style={{ maxWidth: '180px' }}> 
          {displayLabel || "Overview"}
        </span>
      </div>
    </div>
  );
}

// Down Arrow component
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

export default function SQLPortfolio() {
  const [activeSection, setActiveSection] = useState("overview");
  // const mainScrollRef = useRef(null); // No longer needed for IntersectionObserver root with viewport observation
  
  // Section refs
  const sectionRefs = {
    overview: useRef(null),
    analyticsSummary: useRef(null),
    dataModelingSummary: useRef(null)
  };

  // Define sections for navigation
  const contentSections = [
    { id: "overview", label: "Overview" },
    { id: "analyticsSummary", label: "Analytics & Events" },
    { id: "dataModelingSummary", label: "Data Modelling" },
  ];

  // Scrolling function
  const scrollToSection = (sectionId) => {
    if (sectionRefs[sectionId] && sectionRefs[sectionId].current) {
      sectionRefs[sectionId].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Track active section using IntersectionObserver
  useEffect(() => {
    let observer;
    const options = {
      root: null, // viewport
      rootMargin: "0px 0px -66% 0px", // Target the top 33% of the viewport
      threshold: 0.01, // Section needs to be 1% visible
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
        if (contentSections.find(s => s.id === highestVisibleSection)) {
            setActiveSection(highestVisibleSection);
        }
      }
    };

    observer = new IntersectionObserver(observerCallback, options);
    
    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
      observer.disconnect();
    };
  }, []); // Empty dependency array: run only on mount and clean up on unmount

  return (
    <div className="flex xl:h-screen xl:overflow-hidden">
      <Sidebar />
      <ScrollProgress /> {/* ScrollProgress should be inside the scrollable main on xl screens or track main's scroll */}
      
      <main className="w-full xl:ml-[24%] xl:w-[76%] xl:h-screen xl:overflow-y-scroll xl:snap-y xl:snap-mandatory">
        <ContentNavigation
          sections={contentSections}
          activeSection={activeSection}
          scrollToSection={scrollToSection}
        />
        {/* Hero Section */}
        <section
          ref={sectionRefs.overview}
          id="overview"
          className="xl:snap-start xl:h-screen flex flex-col justify-center items-center py-16 px-4 xl:py-10 xl:px-8 relative"
        >
          <div className="w-full xl:max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-10 text-center"
            >
              <h1 className="text-4xl font-bold mb-4 text-blue-600">
                SQL Portfolio
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                A collection of SQL projects demonstrating data analysis, transformation, and modeling 
                capabilities across different databases and business domains.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
            >
              {/* Analytics & Events Card */}
              <div onClick={() => scrollToSection("analyticsSummary")} className="bg-white p-6 rounded-lg shadow-md border border-blue-100 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <FaChartLine className="text-blue-600 text-xl" />
                  </div>
                  <h3 className="text-xl font-bold ml-3 text-blue-700">Analytics & Events</h3>
                </div>
                <p className="text-gray-700 mb-6">
                  Advanced SQL techniques for analyzing user behavior, tracking events, and 
                  measuring engagement patterns from large datasets in Snowflake.
                </p>
                <div className="flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors">
                  Explore analytics scripts <FaArrowRight className="ml-2" />
                </div>
              </div>
              
              {/* Data Modeling Card */}
              <div onClick={() => scrollToSection("dataModelingSummary")} className="bg-white p-6 rounded-lg shadow-md border border-green-100 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <FaNetworkWired className="text-green-600 text-xl" />
                  </div>
                  <h3 className="text-xl font-bold ml-3 text-green-700">Data Modeling</h3>
                </div>
                <p className="text-gray-700 mb-6">
                  Demonstrating database schema design, normalization techniques, and optimized 
                  querying approaches for complex relational data structures.
                </p>
                <div className="flex items-center text-green-600 font-medium hover:text-green-800 transition-colors">
                  Explore modeling scripts <FaArrowRight className="ml-2" />
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gray-50 p-6 rounded-lg border border-gray-200"
            >
              <h2 className="text-2xl font-bold mb-3 text-gray-800">My SQL Journey</h2>
              <p className="text-gray-700 mb-4">
                With over 5 years of SQL experience across PostgreSQL, MySQL, SQL Server, and Snowflake, 
                I've developed expertise in data transformation, analytics, and performance optimization.
                The examples in this portfolio demonstrate both functional approaches for specific business 
                problems and foundational techniques that can be applied across domains.
              </p>
              
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-full">
                  <FaDatabase className="text-blue-600" />
                </div>
                <div className="ml-3">
                  <h3 className="font-medium text-gray-900">Databases I've worked with:</h3>
                  <p className="text-gray-600 text-sm">
                    Snowflake, MySQL, SQL Server, PopSQL, Amazon Redshift
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
          <DownArrowPrompt onClick={() => scrollToSection("analyticsSummary")} />
        </section>
        
        {/* Analytics Summary Section */}
        <section
          ref={sectionRefs.analyticsSummary}
          id="analyticsSummary"
          className="xl:snap-start xl:min-h-screen flex flex-col justify-center items-center py-16 px-4 xl:py-10 xl:px-8 bg-gray-50 relative"
        >
          <div className="w-full xl:max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Analytics & Events</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                SQL scripts for extracting meaningful insights from user behavior data
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="md:w-1/2">
                  <h3 className="text-xl font-bold text-blue-700 mb-4">
                    Session & Event Analysis
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Collection of SQL scripts that transform raw web analytics data into meaningful user 
                    engagement metrics. These queries were developed for the Google Analytics data project 
                    to help product teams understand user behavior patterns.
                  </p>
                  
                  <h4 className="font-semibold text-gray-800 mt-6 mb-2">Key Techniques:</h4>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    <li>Window functions for sequence detection</li>
                    <li>Session identification and attribute extraction</li>
                    <li>Hierarchical categorization of events</li>
                    <li>Temporal analysis of user journeys</li>
                    <li>Performance optimization for large datasets</li>
                  </ul>
                  
                  <Link 
                    href="/coding/sql/analytics"
                    className="inline-flex items-center mt-6 bg-blue-100 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-200 transition-colors"
                  >
                    View detailed examples <FaArrowRight className="ml-2" />
                  </Link>
                </div>
                
                <div className="md:w-1/2 bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-4">Sample SQL Concepts</h4>
                  
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded border border-gray-200">
                      <h5 className="font-medium text-gray-800">Window Functions</h5>
                      <p className="text-gray-600 text-sm">
                        Using LEAD(), LAG(), ROW_NUMBER() for tracking sequential events and timing
                      </p>
                    </div>
                    
                    <div className="bg-white p-4 rounded border border-gray-200">
                      <h5 className="font-medium text-gray-800">Common Table Expressions</h5>
                      <p className="text-gray-600 text-sm">
                        Complex, multi-stage data processing using WITH clauses for readability and modularity
                      </p>
                    </div>
                    
                    <div className="bg-white p-4 rounded border border-gray-200">
                      <h5 className="font-medium text-gray-800">JSON Processing</h5>
                      <p className="text-gray-600 text-sm">
                        Extracting and transforming nested parameters from semi-structured event data
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <DownArrowPrompt onClick={() => scrollToSection("dataModelingSummary")} />
        </section>
        
        {/* Data Modeling Summary Section */}
        <section
          ref={sectionRefs.dataModelingSummary}
          id="dataModelingSummary"
          className="xl:snap-start xl:min-h-screen flex flex-col justify-center items-center py-16 px-4 xl:py-10 xl:px-8 relative bg-gray-50"
        >
          <div className="w-full xl:max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Data Modeling</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Designing efficient database schemas and data warehousing solutions
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="md:w-1/2">
                  <h3 className="text-xl font-bold text-green-700 mb-4">
                    Schema Design & Optimization
                  </h3>
                  <p className="text-gray-700 mb-4">
                    SQL scripts demonstrating database design principles, normalization, and optimization 
                    techniques. These examples showcase dimensional modeling for analytics and efficient 
                    relational designs for transactional systems.
                  </p>
                  
                  <h4 className="font-semibold text-gray-800 mt-6 mb-2">Key Techniques:</h4>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    <li>Star schema design for analytics</li>
                    <li>Index optimization strategies</li>
                    <li>Denormalization for performance</li>
                    <li>Slowly changing dimension handling</li>
                    <li>Complex join optimization</li>
                  </ul>
                  
                  <Link 
                    href="/coding/sql/data-modeling"
                    className="inline-flex items-center mt-6 bg-green-100 text-green-700 px-4 py-2 rounded-md hover:bg-green-200 transition-colors"
                  >
                    View detailed examples <FaArrowRight className="ml-2" />
                  </Link>
                </div>
                
                <div className="md:w-1/2 bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-4">Sample SQL Concepts</h4>
                  
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded border border-gray-200">
                      <h5 className="font-medium text-gray-800">Table Design</h5>
                      <p className="text-gray-600 text-sm">
                        CREATE TABLE statements with proper constraints, keys and index definitions
                      </p>
                    </div>
                    
                    <div className="bg-white p-4 rounded border border-gray-200">
                      <h5 className="font-medium text-gray-800">Materialized Views</h5>
                      <p className="text-gray-600 text-sm">
                        Creating and efficiently refreshing materialized views for analytics performance
                      </p>
                    </div>
                    
                    <div className="bg-white p-4 rounded border border-gray-200">
                      <h5 className="font-medium text-gray-800">Partitioning</h5>
                      <p className="text-gray-600 text-sm">
                        Implementing table partitioning strategies for improved query performance on large tables
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
} 