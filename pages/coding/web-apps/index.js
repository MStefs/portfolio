import { useState, useRef, useEffect } from "react";
import Sidebar from "../../../components/Sidebar";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight, FaReact, FaCode, FaChevronDown, FaGlobe, FaLaptopCode, FaDatabase, FaLayerGroup, FaMobileAlt, FaDesktop } from "react-icons/fa";

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
                  ? "bg-indigo-100 text-indigo-700" // Using indigo theme consistent with SQL pages
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
      <FaChevronDown className="text-2xl text-gray-500 animate-bounce cursor-pointer" />
    </motion.div>
  );
}

export default function WebAppsPortfolio() {
  const [activeSection, setActiveSection] = useState("overview");
  // const mainScrollRef = useRef(null); // No longer needed for IntersectionObserver root with viewport observation
  
  // Section refs
  const sectionRefs = {
    overview: useRef(null),
    portfolio: useRef(null),
    features: useRef(null),
    technologies: useRef(null),
    connect: useRef(null)
  };

  // Define sections for navigation
  const contentSections = [
    { id: "overview", label: "Overview" },
    { id: "portfolio", label: "Portfolio Website" },
    { id: "features", label: "Modern Web Features" },
    { id: "technologies", label: "Technologies" },
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
      // Ensure connect ref is not observed if it's null or its id is not in contentSections
      if (ref.current && contentSections.some(s => s.id === ref.current.id)) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach(ref => {
        if (ref.current && contentSections.some(s => s.id === ref.current.id)) {
          observer.unobserve(ref.current);
        }
      });
      if (observer) observer.disconnect();
    };
  }, []); // Empty dependency array: run only on mount and clean up on unmount

  return (
    <div className="flex xl:h-screen xl:overflow-hidden">
      <Sidebar />
      <ScrollProgress />
      
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
          <div className="w-full xl:max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12 text-center"
            >
              <h1 className="text-4xl font-bold mb-4 text-blue-600">
                Web Applications Portfolio
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Showcasing my web development projects built with modern frameworks like Next.js and React,
                focusing on responsive design, clean code, and exceptional user experience.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10"
            >
              {/* Portfolio Website Card */}
              <div onClick={(e) => { e.preventDefault(); scrollToSection("portfolio"); }} className="bg-white p-6 rounded-lg shadow-md border border-purple-100 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-purple-100 rounded-full">
                    <FaGlobe className="text-purple-600 text-xl" />
                  </div>
                  <h3 className="text-xl font-bold ml-3 text-purple-700">Portfolio Website</h3>
                </div>
                <p className="text-gray-700 mb-6">
                  A responsive Next.js portfolio website with smooth animations, interactive UI, and 
                  an elegant design to showcase professional work and coding projects.
                </p>
                <div className="flex items-center text-purple-600 font-medium hover:text-purple-800 transition-colors">
                  Explore project details <FaArrowRight className="ml-2" />
                </div>
              </div>
              
              {/* Modern Web Features Card */}
              <div onClick={(e) => { e.preventDefault(); scrollToSection("features"); }} className="bg-white p-6 rounded-lg shadow-md border border-blue-100 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <FaLaptopCode className="text-blue-600 text-xl" />
                  </div>
                  <h3 className="text-xl font-bold ml-3 text-blue-700">Modern Web Features</h3>
                </div>
                <p className="text-gray-700 mb-6">
                  Implementation of modern web development features including animations with Framer Motion,
                  responsive design, and component-based architecture.
                </p>
                <div className="flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors">
                  View feature details <FaArrowRight className="ml-2" />
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gray-50 p-8 rounded-lg border border-gray-200"
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-800">My Web Development Approach</h2>
              <p className="text-gray-700 mb-6">
                I focus on creating web applications that are not only visually appealing but also 
                functionally robust. My approach emphasizes clean code, component reusability, performance 
                optimization, and thoughtful UX design to deliver exceptional digital experiences.
              </p>
              
              <div className="flex items-center">
                <div className="bg-indigo-100 p-2 rounded-full">
                  <FaReact className="text-indigo-600" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">Technologies I work with:</h3>
                  <p className="text-gray-600">
                    React, Next.js, Tailwind CSS, Framer Motion, JavaScript/TypeScript
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
          <DownArrowPrompt onClick={() => scrollToSection("portfolio")} />
        </section>
        
        {/* Portfolio Website Project Section */}
        <section
          ref={sectionRefs.portfolio}
          id="portfolio"
          className="xl:snap-start xl:h-screen flex flex-col justify-center items-center py-16 px-4 xl:py-10 xl:px-8 bg-gray-50 relative"
        >
          <div className="w-full xl:max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Portfolio Website</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                A deep dive into the development of this portfolio website, showcasing the design decisions,
                technical implementation, and UX considerations.
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
                <div className="w-full md:w-1/2">
                  <h3 className="text-xl font-bold text-purple-700 mb-4">
                    Project Overview & Objectives
                  </h3>
                  <p className="text-gray-700 mb-4">
                    This portfolio website was designed to showcase professional work and coding projects in 
                    an elegant, interactive manner. The primary objectives included:
                  </p>
                  
                  <ul className="list-disc pl-5 text-gray-700 space-y-2 mb-6">
                    <li>Creating a responsive, modern interface that works across all devices</li>
                    <li>Implementing smooth scrolling and animations for an engaging user experience</li>
                    <li>Building a maintainable component structure for easy updates</li>
                    <li>Optimizing performance for fast loading and smooth interactions</li>
                    <li>Showcasing projects in a visually appealing, organized manner</li>
                  </ul>
                  
                  <h4 className="font-semibold text-gray-800 mt-6 mb-2">Key Design Decisions:</h4>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    <li>Fixed sidebar navigation for easy access to all sections</li>
                    <li>Snap scrolling for focused section viewing</li>
                    <li>Animated transitions between sections for visual continuity</li>
                    <li>Consistent color scheme and typography for brand identity</li>
                    <li>Card-based layout for project showcases</li>
                  </ul>
                </div>
                
                <div className="w-full md:w-1/2 bg-gray-50 p-3 md:p-6 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-4">Sidebar Component Implementation</h4>
                  <div className="w-full bg-gray-900 rounded-lg overflow-hidden">
                    <div className="px-3 py-1 bg-gray-800 text-white text-xs font-mono">
                      Sidebar.js
                    </div>
                    <pre className="p-2 text-green-400 text-xs font-mono overflow-auto max-h-[200px]">
{`import { useState, useEffect } from "react";
import Link from "next/link";
import { FaLinkedin, FaEnvelope, FaFilePdf } from "react-icons/fa";
import { useRouter } from "next/router";

export default function Sidebar() {
  const router = useRouter();
  
  // Helper function to determine if a link is active
  const isActive = (href) => {
    // Exact match for homepage
    if (href === "/" && router.pathname === "/") {
      return true;
    }
    // For other pages, check if the pathname starts with the href
    return href !== "/" && router.pathname.startsWith(href);
  };

  const handleLinkClick = (e) => {
    const currentPath = window.location.pathname;
    const clickedPath = e.currentTarget.getAttribute('href');
    
    if (currentPath === clickedPath) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <aside className="fixed left-16 top-16 w-[20%] h-screen flex flex-col items-center px-8 py-6 text-center">
      {/* Header: Name */}
      <header className="w-full">
        <Link href="/" className="block mb-12">
          <div className="sidebar-header">
            <span className="text-3xl font-extrabold tracking-wide block">
              MILTIADIS
            </span>
            <span className="text-3xl font-extrabold tracking-wide block">
              STEFANIDIS
            </span>
          </div>
        </Link>
      </header>

      {/* Main Navigation */}
      <main className="w-full flex flex-col gap-14">
        {/* Navigation sections... */}
      </main>

      {/* Footer: Social Icons */}
      <footer className="w-full mt-16">
        <div className="flex justify-center space-x-4">
          <a href="https://linkedin.com" target="_blank">
            <FaLinkedin />
          </a>
          {/* More social icons... */}
        </div>
      </footer>
    </aside>
  );
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <DownArrowPrompt onClick={() => scrollToSection("features")} />
        </section>
        
        {/* Modern Web Features Section */}
        <section
          ref={sectionRefs.features}
          id="features"
          className="xl:snap-start xl:h-screen flex flex-col justify-center items-center py-16 px-4 xl:py-10 xl:px-8 relative"
        >
          <div className="w-full xl:max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Modern Web Features</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                A closer look at the modern web development techniques used in this portfolio
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
            >
              {/* Smooth Animations */}
              <div className="bg-white p-4 rounded-lg shadow-md border border-indigo-100">
                <div className="flex items-center mb-2">
                  <div className="p-2 bg-indigo-100 rounded-full">
                    <FaCode className="text-indigo-600 text-lg" />
                  </div>
                  <h3 className="text-lg font-bold ml-3 text-indigo-700">Smooth Animations</h3>
                </div>
                <p className="text-gray-700 mb-2 text-sm">
                  The portfolio integrates Framer Motion for fluid, engaging animations that enhance the user experience.
                </p>
                
                <div className="bg-gray-900 rounded-lg overflow-hidden">
                  <div className="px-3 py-1 bg-gray-800 text-white text-xs font-mono">
                    animation-example.js
                  </div>
                  <pre className="p-2 text-green-400 text-xs font-mono overflow-auto max-h-[200px]">
{`import { motion } from "framer-motion";

export default function AnimatedComponent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card"
    >
      <h2>Card Title</h2>
      <p>Card content goes here...</p>
    </motion.div>
  );
}`}
                  </pre>
                </div>
                
                <ul className="list-disc pl-5 text-gray-700 space-y-0 mt-2 text-xs">
                  <li>Page transitions with opacity and movement effects</li>
                  <li>Hover animations for interactive elements</li>
                  <li>Scroll-triggered animations for content sections</li>
                </ul>
              </div>
              
              {/* Responsive Design */}
              <div className="bg-white p-4 rounded-lg shadow-md border border-purple-100">
                <div className="flex items-center mb-2">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <FaMobileAlt className="text-purple-600 text-lg" />
                  </div>
                  <h3 className="text-lg font-bold ml-3 text-purple-700">Responsive Design</h3>
                </div>
                <p className="text-gray-700 mb-2 text-sm">
                  Implemented with Tailwind CSS, the portfolio features a fully responsive design that adapts
                  to all device sizes.
                </p>
                
                <div className="bg-gray-900 rounded-lg overflow-hidden">
                  <div className="px-3 py-1 bg-gray-800 text-white text-xs font-mono">
                    responsive-layout.js
                  </div>
                  <pre className="p-2 text-green-400 text-xs font-mono overflow-auto max-h-[200px]">
{`<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-lg font-bold mb-2">Card 1</h3>
    <p className="text-gray-600">Content...</p>
  </div>
  
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-lg font-bold mb-2">Card 2</h3>
    <p className="text-gray-600">Content...</p>
  </div>
</div>`}
                  </pre>
                </div>
                
                <div className="flex items-center justify-between mt-2 text-xs text-gray-700">
                  <div className="flex items-center">
                    <FaDesktop className="text-purple-600 mr-1" />
                    <span>Desktop</span>
                  </div>
                  <div className="flex items-center">
                    <FaMobileAlt className="text-purple-600 mr-1" />
                    <span>Tablet</span>
                  </div>
                  <div className="flex items-center">
                    <FaMobileAlt className="text-purple-600 mr-1 transform scale-75" />
                    <span>Mobile</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-4 rounded-lg shadow-md"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Component-Based Architecture
              </h3>
              <p className="text-gray-700 mb-4 text-sm">
                Built with a modular, component-based architecture following React best practices for:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-gray-50 p-3 rounded border border-gray-200">
                  <h4 className="font-medium text-gray-800 text-sm">Reusability</h4>
                  <p className="text-gray-600 text-xs">
                    Components are reused throughout the site
                  </p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded border border-gray-200">
                  <h4 className="font-medium text-gray-800 text-sm">Maintainability</h4>
                  <p className="text-gray-600 text-xs">
                    Changes automatically propagate
                  </p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded border border-gray-200">
                  <h4 className="font-medium text-gray-800 text-sm">Scalability</h4>
                  <p className="text-gray-600 text-xs">
                    New features added without affecting existing ones
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
          <DownArrowPrompt onClick={() => scrollToSection("technologies")} />
        </section>
        
        {/* Technologies Section */}
        <section
          ref={sectionRefs.technologies}
          id="technologies"
          className="xl:snap-start xl:h-screen flex flex-col justify-center items-center py-16 px-4 xl:py-10 xl:px-8 bg-gray-50 relative"
        >
          <div className="w-full xl:max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Technologies Used</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                A breakdown of the key technologies and tools used to build this portfolio website
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            >
              {/* Next.js Card */}
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-black">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Next.js</h3>
                <p className="text-gray-700 mb-4 text-sm">
                  React framework providing server-side rendering, static site generation, and optimized routing.
                </p>
                <ul className="text-gray-600 space-y-1 text-xs">
                  <li>• File-based routing system</li>
                  <li>• Optimized performance</li>
                  <li>• Server-side rendering capabilities</li>
                  <li>• Built-in API routes</li>
                </ul>
              </div>
              
              {/* React Card */}
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
                <h3 className="text-xl font-bold text-gray-900 mb-3">React</h3>
                <p className="text-gray-700 mb-4 text-sm">
                  JavaScript library for building interactive user interfaces with reusable components.
                </p>
                <ul className="text-gray-600 space-y-1 text-xs">
                  <li>• Component-based architecture</li>
                  <li>• Virtual DOM for performance</li>
                  <li>• Hooks for state management</li>
                  <li>• Context API for shared state</li>
                </ul>
              </div>
              
              {/* Tailwind CSS Card */}
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-cyan-500">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Tailwind CSS</h3>
                <p className="text-gray-700 mb-4 text-sm">
                  Utility-first CSS framework for rapid UI development with consistent design elements.
                </p>
                <ul className="text-gray-600 space-y-1 text-xs">
                  <li>• Responsive design utilities</li>
                  <li>• Customizable design system</li>
                  <li>• Dark mode support</li>
                  <li>• Performance optimization</li>
                </ul>
              </div>
              
              {/* Framer Motion Card */}
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-purple-500">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Framer Motion</h3>
                <p className="text-gray-700 mb-4 text-sm">
                  Animation library for React that makes creating smooth, interactive UIs simple.
                </p>
                <ul className="text-gray-600 space-y-1 text-xs">
                  <li>• Declarative animations</li>
                  <li>• Gesture recognition</li>
                  <li>• Spring physics</li>
                  <li>• Variants for orchestrated animations</li>
                </ul>
              </div>
              
              {/* React Icons Card */}
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-red-500">
                <h3 className="text-xl font-bold text-gray-900 mb-3">React Icons</h3>
                <p className="text-gray-700 mb-4 text-sm">
                  Library providing popular icon packs as React components for easy integration.
                </p>
                <ul className="text-gray-600 space-y-1 text-xs">
                  <li>• Multiple icon sets (Font Awesome, etc.)</li>
                  <li>• Customizable size and colors</li>
                  <li>• Tree-shakable imports</li>
                  <li>• SVG-based for scalability</li>
                </ul>
              </div>
              
              {/* JavaScript Card */}
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-yellow-500">
                <h3 className="text-xl font-bold text-gray-900 mb-3">JavaScript (ES6+)</h3>
                <p className="text-gray-700 mb-4 text-sm">
                  Modern JavaScript with ES6+ features for clean, functional programming patterns.
                </p>
                <ul className="text-gray-600 space-y-1 text-xs">
                  <li>• Arrow functions</li>
                  <li>• Destructuring</li>
                  <li>• Async/await</li>
                  <li>• Array methods</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
} 