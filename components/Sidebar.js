import { useState, useEffect } from "react";
import Link from "next/link";
import { FaLinkedin, FaEnvelope, FaFilePdf, FaHandsHelping, FaBars, FaTimes } from "react-icons/fa";
import { useRouter } from "next/router";

export default function Sidebar() {
  const router = useRouter();
  const [expandedMenus, setExpandedMenus] = useState({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLinkClick = (e) => {
    const currentRoute = router.asPath.split(/[?#]/)[0];
    const clickedPath = e.currentTarget.getAttribute('href');

    if (currentRoute === clickedPath) {
      e.preventDefault(); 
      const mainContentArea = document.querySelector('main[class*="overflow-y-scroll"], main[class*="overflow-scroll"]');
      if (mainContentArea) {
        if (mainContentArea.scrollTop !== 0) {
          mainContentArea.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        console.warn('Scrollable main content area not found. Attempting window scroll as fallback.');
        if (window.scrollY !== 0) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    }
    // Close mobile menu on link click if it's open
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMenu = (menuKey, e) => {
    if (e) {
      e.stopPropagation();
    }
    setExpandedMenus(prev => ({ ...prev, [menuKey]: !prev[menuKey] }));
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    if (router.pathname.startsWith('/coding/sql') && !expandedMenus.sql) {
      setExpandedMenus(prev => ({ ...prev, sql: true }));
    }
  }, [router.pathname]);

  const isActive = (href) => {
    if (href === "/" && router.pathname === "/") return true;
    return href !== "/" && router.pathname.startsWith(href);
  };

  const sidebarContent = (
    <>
      {/* Header: Name */}
      <header className="w-full px-4 pt-8 xl:pt-0 xl:px-0"> {/* Adjusted padding for mobile */}
        <Link 
          href="/" 
          className={`block mb-12 transition-colors duration-300 hover:text-blue-600 hover:font-black nav-link ${
            isActive("/") ? "font-extrabold" : ""
          }`}
          onClick={handleLinkClick} // Added handleLinkClick here too for mobile
        >
          <div className="sidebar-header">
            <span className="text-3xl font-extrabold tracking-wide block">
              MILTIADIS
            </span>
            <span className="text-3xl font-extrabold tracking-wide block">
              STEFANIDIS
            </span>
            <p className="text-med font-bold text-indigo-600 mt-1">Quantitative Researcher / Data Analyst (UX / ML)</p>
          </div>
        </Link>
      </header>

      {/* Main Navigation Sections */}
      <main className="w-full flex flex-col gap-10 px-4 xl:px-0"> {/* Adjusted padding for mobile */}
        {/* Industry Section */}
        <nav>
          <h2 className="text-base font-bold uppercase mb-2 text-gray-700">
            Industry Work
          </h2>
          <ul className="space-y-1 text-base text-gray-600">
            <li><Link href="/projects/advisor360" className={`transition-colors duration-300 hover:text-blue-600 hover:font-black nav-link ${isActive("/projects/advisor360") ? "font-extrabold text-blue-600" : ""}`} onClick={handleLinkClick}>Feedback Sentiment Analysis</Link></li>
            <li><Link href="/projects/ga_data" className={`transition-colors duration-300 hover:text-blue-600 hover:font-black nav-link ${isActive("/projects/ga_data") ? "font-extrabold text-blue-600" : ""}`} onClick={handleLinkClick}>Log Sequence Visualizations</Link></li>
            <li><Link href="/projects/ag_columns" className={`transition-colors duration-300 hover:text-blue-600 hover:font-black nav-link ${isActive("/projects/ag_columns") ? "font-extrabold text-blue-600" : ""}`} onClick={handleLinkClick}>User Behavior Clustering</Link></li>
            <li><Link href="/projects/proposals" className={`transition-colors duration-300 hover:text-blue-600 hover:font-black nav-link ${isActive("/projects/proposals") ? "font-extrabold text-blue-600" : ""}`} onClick={handleLinkClick}>ML Correlation Analysis</Link></li>
            <li><Link href="/projects/valuemap" className={`transition-colors duration-300 hover:text-blue-600 hover:font-black nav-link ${isActive("/projects/valuemap") ? "font-extrabold text-blue-600" : ""}`} onClick={handleLinkClick}>Value Mapping Survey</Link></li>
          </ul>
        </nav>

        {/* Academia Section */}
        <nav>
          <h2 className="text-base font-bold uppercase mb-2 text-gray-700">
            Academia Work
          </h2>
          <ul className="space-y-1 text-base text-gray-600">
            <li><Link href="/projects/hbs" className={`transition-colors duration-300 hover:text-blue-600 hover:font-black nav-link ${isActive("/projects/hbs") ? "font-extrabold text-blue-600" : ""}`} onClick={handleLinkClick}>HBS – Startup Performance Metrics</Link></li>
            <li><Link href="/projects/ucl" className={`transition-colors duration-300 hover:text-blue-600 hover:font-black nav-link ${isActive("/projects/ucl") ? "font-extrabold text-blue-600" : ""}`} onClick={handleLinkClick}>UCL – Risky Decision Making</Link></li>
          </ul>
        </nav>

        {/* Coding Section */}
        <nav>
          <h2 className="text-base font-bold uppercase mb-2 text-gray-700">
            <Link href="/coding/codinghub" className={`transition-colors duration-300 hover:text-blue-600 hover:font-black nav-link ${router.pathname === "/coding/codinghub" ? "font-extrabold text-blue-600" : ""}`} onClick={handleLinkClick}>Coding Work</Link>
          </h2>
          <ul className="space-y-1 text-base text-gray-600">
            <li><Link href="/coding/sql" className={`transition-colors duration-300 hover:text-blue-600 hover:font-black nav-link ${isActive("/coding/sql") ? "font-extrabold text-blue-600" : ""}`} onClick={handleLinkClick}>SQL</Link></li>
            <li><Link href="/coding/python" className={`transition-colors duration-300 hover:text-blue-600 hover:font-black nav-link ${isActive("/coding/python") ? "font-extrabold text-blue-600" : ""}`} onClick={handleLinkClick}>Python</Link></li>
            <li><Link href="/coding/web-apps" className={`transition-colors duration-300 hover:text-blue-600 hover:font-black nav-link ${isActive("/coding/web-apps") ? "font-extrabold text-blue-600" : ""}`} onClick={handleLinkClick}>Web Apps</Link></li>
          </ul>
        </nav>

        {/* More Section */}
        <nav>
          <ul className="space-y-1 text-base font-bold mb-10 text-gray-600">
            <li><Link href="/more/about" className={`transition-colors duration-300 hover:text-gray-600 hover:font-black nav-link ${isActive("/more/about") ? "font-black text-gray-900" : ""}`} onClick={handleLinkClick}>ABOUT</Link></li>
          </ul>
        </nav>
      </main>

      {/* Footer: Social Icons */}
      <footer className="w-full mt-4 px-4 xl:px-0 pb-8 xl:pb-0"> {/* Adjusted padding for mobile */}
        <div className="flex justify-center space-x-4 text-gray-500 text-2xl">
          <a href="https://linkedin.com/in/miltiadis-stefanidis" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="hover:text-black transition-colors duration-300 social-icon"><FaLinkedin /></a>
          <a href="mailto:milt.stefanidis@gmail.com" title="Email" className="hover:text-black transition-colors duration-300 social-icon"><FaEnvelope /></a>
          <a href="/images/MiltoStefanidisCV(Researcher).pdf" target="_blank" rel="noopener noreferrer" title="View CV" className="hover:text-black transition-colors duration-300 social-icon"><FaFilePdf /></a>
        </div>
      </footer>
    </>
  );

  return (
    <>
      {/* Hamburger Menu Button (visible on small screens) */}
      <button
        className="xl:hidden fixed top-4 left-4 z-[60] p-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Overlay for Mobile Menu (visible when mobile menu is open) */}
      {isMobileMenuOpen && (
        <div 
          className="xl:hidden fixed inset-0 bg-black bg-opacity-50 z-[50]"
          onClick={toggleMobileMenu}
        ></div>
      )}

      {/* Mobile Menu (slides in from left) */}
      <div
        className={`xl:hidden fixed top-0 left-0 h-full w-3/4 max-w-xs bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-[55] flex flex-col items-center py-6 text-center overflow-y-auto
                    ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {sidebarContent}
      </div>

      {/* Desktop Sidebar (visible on medium screens and up) */}
      <aside className="hidden xl:flex fixed left-16 top-16 w-[20%] h-screen flex-col items-center px-8 py-6 text-center">
        {sidebarContent}
      </aside>

      {/* Global Styles (unchanged) */}
      <style jsx global>{`
        @keyframes popShake {
          0% { transform: scale(1); }
          25% { transform: scale(1.15) rotate(-2deg); }
          50% { transform: scale(1.2) rotate(2deg); }
          75% { transform: scale(1.15) rotate(-1deg); }
          100% { transform: scale(1.1) rotate(0); }
        }
        
        .nav-link {
          display: inline-block;
          position: relative;
          transition: color 0.3s;
        }
        
        .nav-link:hover {
          animation: popShake 0.4s ease forwards;
        }

        main .nav-link { /* Specificity for nav links in main sections to prevent wrapping */
          white-space: nowrap;
        }
        
        .social-icon {
          display: inline-block;
          transition: color 0.3s, transform 0.3s;
        }
        
        .social-icon:hover {
          animation: popShake 0.4s ease forwards;
        }
      `}</style>
    </>
  );
}