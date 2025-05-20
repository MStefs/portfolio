import { useState, useRef, useEffect } from "react";
import Sidebar from "../../../components/Sidebar";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowRight, FaPython, FaChartBar, FaNetworkWired, FaChevronDown, FaBrain, FaCalculator, FaLayerGroup } from "react-icons/fa";

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
    displayLabel = activeSection.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()).split(" ").slice(0,2).join(" ");
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

// Define sections for navigation (moved outside component)
const contentSections = [
  { id: "overview", label: "Overview" },
  { id: "machineLearningSummary", label: "Machine Learning" },
  { id: "dataVisualizationSummary", label: "Data Visualization" },
  { id: "financialAnalysisSummary", label: "Financial Analysis" },
  { id: "agGridSummary", label: "AG Grid Customization" },
];

export default function PythonPortfolio() {
  const [activeSection, setActiveSection] = useState("overview");
  
  // Section refs
  const sectionRefs = {
    overview: useRef(null),
    machineLearningSummary: useRef(null),
    dataVisualizationSummary: useRef(null),
    financialAnalysisSummary: useRef(null),
    agGridSummary: useRef(null)
  };

  // Scrolling function
  const scrollToSection = (sectionId) => {
    if (sectionRefs[sectionId] && sectionRefs[sectionId].current) { // Check if ref and current exist
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
  }, []); // Dependency array changed to empty

  return (
    <div className="flex xl:h-screen xl:overflow-hidden">
      <Sidebar />
      <ScrollProgress />
      
      <main className="w-full xl:ml-[24%] xl:w-[76%] xl:h-screen xl:overflow-y-scroll xl:snap-y xl:snap-mandatory custom-scrollbar">
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
          <div className="max-w-5xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 text-center"
            >
              <h1 className="text-4xl font-bold mb-1 text-blue-600">
                Python Portfolio
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Data science, machine learning, and visualization projects showcasing Python's 
                power for turning complex data into actionable insights.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-2"
            >
              {/* Machine Learning Card */}
              <div onClick={() => scrollToSection("machineLearningSummary")} className="bg-white p-6 rounded-lg shadow-md border border-purple-100 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-purple-100 rounded-full">
                    <FaBrain className="text-purple-600 text-xl" />
                  </div>
                  <h3 className="text-xl font-bold ml-3 text-purple-700">Machine Learning</h3>
                </div>
                <p className="text-gray-700 mb-6">
                  Predictive modeling, regression analysis, and classification algorithms 
                  to identify patterns and make data-driven predictions.
                </p>
                <div className="flex items-center text-purple-600 font-medium hover:text-purple-800 transition-colors">
                  Explore ML models <FaArrowRight className="ml-2" />
                </div>
              </div>
              
              {/* Data Visualization Card */}
              <div onClick={() => scrollToSection("dataVisualizationSummary")} className="bg-white p-6 rounded-lg shadow-md border border-blue-100 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <FaChartBar className="text-blue-600 text-xl" />
                  </div>
                  <h3 className="text-xl font-bold ml-3 text-blue-700">Data Visualization</h3>
                </div>
                <p className="text-gray-700 mb-6">
                  Creating insightful visualizations with matplotlib, seaborn, and other libraries 
                  to communicate complex data relationships effectively.
                </p>
                <div className="flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors">
                  Explore visualizations <FaArrowRight className="ml-2" />
                </div>
              </div>

              {/* Financial Analysis Card */}
              <div onClick={() => scrollToSection("financialAnalysisSummary")} className="bg-white p-6 rounded-lg shadow-md border border-green-100 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <FaCalculator className="text-green-600 text-xl" />
                  </div>
                  <h3 className="text-xl font-bold ml-3 text-green-700">Financial Analysis</h3>
                </div>
                <p className="text-gray-700 mb-6">
                  Automated financial modeling, break-even analysis, and report generation for business decision-making and planning.
                </p>
                <div className="flex items-center text-green-600 font-medium hover:text-green-800 transition-colors">
                  View bakery case study <FaArrowRight className="ml-2" />
                </div>
              </div>

              {/* AG Columns Project Card */}
              <div onClick={() => scrollToSection("agGridSummary")} className="bg-white p-6 rounded-lg shadow-md border border-blue-100 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <FaLayerGroup className="text-blue-600 text-xl" />
                  </div>
                  <h3 className="text-xl font-bold ml-3 text-blue-700">AG Grid Customization</h3>
                </div>
                <p className="text-gray-700 mb-6">
                  Python-based data processing and transformation for AG Grid column customization, enabling dynamic UI configuration and data visualization.
                </p>
                <div className="flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors">
                  View column customization project <FaArrowRight className="ml-2" />
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gray-50 p-6 rounded-lg border border-gray-200"
            >
              <h2 className="text-2xl font-bold mb-3 text-gray-800">My Python Journey</h2>
              <p className="text-gray-700 mb-4">
                Over the past 5+ years, I've used Python for data analysis, machine learning, and visualization 
                projects across finance, marketing, and product analytics. My approach combines statistical rigor with 
                practical business application, focusing on creating actionable insights from complex datasets.
              </p>
              
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-full">
                  <FaPython className="text-green-600" />
                </div>
                <div className="ml-3">
                  <h3 className="font-medium text-gray-900">Python libraries I work with:</h3>
                  <p className="text-gray-600 text-sm">
                    Pandas, NumPy, Scikit-learn, PyTorch, Matplotlib, Seaborn, SciPy, TensorFlow
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
          <DownArrowPrompt onClick={() => scrollToSection("machineLearningSummary")} />
        </section>
        
        {/* Machine Learning Summary Section */}
        <section
          ref={sectionRefs.machineLearningSummary}
          id="machineLearningSummary"
          className="xl:snap-start xl:h-screen flex flex-col justify-center items-center py-16 px-4 xl:py-10 xl:px-8 bg-gray-50 relative"
        >
          <div className="max-w-6xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Machine Learning</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Leveraging Python's machine learning libraries to build predictive models and extract insights
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
                    Logistic Regression Classifier
                  </h3>
                  <p className="text-gray-700 mb-4">
                    A predictive model that analyzes portfolio characteristics to identify accounts that may 
                    require rebalancing or special attention. This model was implemented in PowerQuery for portfolio 
                    management teams to proactively address client needs.
                  </p>
                  
                  <h4 className="font-semibold text-gray-800 mt-6 mb-2">Key Techniques:</h4>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    <li>Feature selection from large financial datasets</li>
                    <li>Data preprocessing and normalization</li>
                    <li>Train/test split for model validation</li>
                    <li>Probability-based classification</li>
                    <li>Model performance evaluation</li>
                  </ul>
                  
                  <Link 
                    href="/projects/proposals#machine-learning"
                    className="inline-flex items-center mt-6 bg-purple-100 text-purple-700 px-4 py-2 rounded-md hover:bg-purple-200 transition-colors"
                  >
                    View project implementation <FaArrowRight className="ml-2" />
                  </Link>
                </div>
                
                <div className="w-full md:w-1/2 bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-4">Code Sample</h4>
                  <div className="w-full bg-gray-900 rounded-lg overflow-hidden">
                    <div className="px-4 py-2 bg-gray-800 text-white text-sm font-mono">
                      PowerQuery_Correlation_Regression.py
                    </div>
                    <pre className="p-4 text-green-400 text-sm font-mono overflow-auto max-h-[300px]">
{`# Training logistic regression model
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression

# Select features from dataset
features = ['AccountGroupValueDollars', 
    'CashBufferPercent', 'ClassDrift',
    'CategoryDrift', 'PositionDrift', 
    'TaxType', 'AccountType',
    'ModelPositionsNotHeld', 'Equivalencies']
X = dataset[features]
y = dataset[['Columns']]

# Split data into train and test dataset
X_train, X_test, y_train, y_test = train_test_split(X, y)

# Train logistic regression model
log = LogisticRegression()
log.fit(X_train, y_train)

# Testing the algorithm
y_pred_test = log.predict(X_test)
y_prob_test = log.predict_proba(X_test)

# Predict for all inputs
y_pred = log.predict(X)
y_prob = log.predict_proba(X)

# Output results with probabilities
dataset2 = dataset[features + ['Columns']]
dataset2['predictions'] = y_pred
dataset2['probability'] = y_prob[:,1]`}
                    </pre>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <DownArrowPrompt onClick={() => scrollToSection("dataVisualizationSummary")} />
        </section>
        
        {/* Data Visualization Summary Section */}
        <section
          ref={sectionRefs.dataVisualizationSummary}
          id="dataVisualizationSummary"
          className="xl:snap-start xl:h-screen flex flex-col justify-center items-center py-16 px-4 xl:py-10 xl:px-8 relative"
        >
          <div className="max-w-6xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Data Visualization</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Creating visual representations to uncover patterns in complex datasets
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
            >
              {/* Correlation Matrix */}
              <div className="bg-white p-4 rounded-lg shadow-md border border-blue-100">
                <div className="flex items-center mb-2">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <FaChartBar className="text-blue-600 text-lg" />
                  </div>
                  <h3 className="text-lg font-bold ml-3 text-blue-700">Correlation Matrix</h3>
                </div>
                <p className="text-gray-700 mb-2 text-sm">
                  A heatmap visualization revealing relationships between proposal sections 
                  and client engagement metrics.
                </p>
                
                <div className="bg-gray-900 rounded-lg overflow-hidden">
                  <div className="px-3 py-1 bg-gray-800 text-white text-xs font-mono">
                    correlation_matrix.py
                  </div>
                  <pre className="p-2 text-green-400 text-xs font-mono overflow-auto max-h-[200px]">
{`import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Calculate the correlation matrix
correlation_matrix = dataset.corr(method='pearson')

# Create a heatmap
plt.figure(figsize=(24, 12))
heatmap = sns.heatmap(correlation_matrix, 
                     annot=True,
                     cmap="BuPu")

plt.title('Correlation Matrix', fontsize=34)
plt.show()`}
                  </pre>
                </div>
                
                <Link 
                  href="/projects/proposals#visualizations"
                  className="inline-flex items-center mt-3 bg-blue-100 text-blue-700 px-3 py-1 rounded-md hover:bg-blue-200 transition-colors text-sm"
                >
                  See implementation <FaArrowRight className="ml-1" />
                </Link>
              </div>
              
              {/* Dendrogram */}
              <div className="bg-white p-4 rounded-lg shadow-md border border-green-100">
                <div className="flex items-center mb-2">
                  <div className="p-2 bg-green-100 rounded-full">
                    <FaNetworkWired className="text-green-600 text-lg" />
                  </div>
                  <h3 className="text-lg font-bold ml-3 text-green-700">Hierarchical Clustering</h3>
                </div>
                <p className="text-gray-700 mb-2 text-sm">
                  A dendrogram showing hierarchical relationships between investment proposal 
                  features and identifying natural content groupings.
                </p>
                
                <div className="bg-gray-900 rounded-lg overflow-hidden">
                  <div className="px-3 py-1 bg-gray-800 text-white text-xs font-mono">
                    dendrogram.py
                  </div>
                  <pre className="p-2 text-green-400 text-xs font-mono overflow-auto max-h-[200px]">
{`import numpy as np
import matplotlib.pyplot as plt
from scipy.cluster.hierarchy import ward, dendrogram
import seaborn as sns

# Calculate correlation and distance matrices
correlation_matrix = dataset.corr(method='pearson')
distance_matrix = 1 - correlation_matrix

# Create linkage matrix using Ward's method
linkage_matrix = ward(distance_matrix)

plt.figure(figsize=(24, 13))
dendrogram(linkage_matrix, labels=correlation_matrix.columns)
plt.show()`}
                  </pre>
                </div>
                
                <Link 
                  href="/projects/proposals#visualizations"
                  className="inline-flex items-center mt-3 bg-green-100 text-green-700 px-3 py-1 rounded-md hover:bg-green-200 transition-colors text-sm"
                >
                  See implementation <FaArrowRight className="ml-1" />
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-4 rounded-lg border border-gray-200"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Key Insights
              </h3>
              <p className="text-gray-700 mb-4 text-sm">
                These visualizations revealed important correlations between proposal sections and client engagement, 
                with "Risk vs Return" and "Hypothetical Growth" sections showing strong client interest.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-white p-3 rounded border border-gray-200">
                  <h4 className="font-medium text-gray-800 text-sm">Key Finding #1</h4>
                  <p className="text-gray-600 text-xs">
                    Historical performance sections had strongest correlation with proposal acceptance.
                  </p>
                </div>
                
                <div className="bg-white p-3 rounded border border-gray-200">
                  <h4 className="font-medium text-gray-800 text-sm">Key Finding #2</h4>
                  <p className="text-gray-600 text-xs">
                    Risk visualizations clustered separately from growth projections.
                  </p>
                </div>
                
                <div className="bg-white p-3 rounded border border-gray-200">
                  <h4 className="font-medium text-gray-800 text-sm">Key Finding #3</h4>
                  <p className="text-gray-600 text-xs">
                    Customized sections showed higher engagement than templates.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
          <DownArrowPrompt onClick={() => scrollToSection("financialAnalysisSummary")} />
        </section>

        {/* Financial Analysis Summary Section */}
        <section
          ref={sectionRefs.financialAnalysisSummary}
          id="financialAnalysisSummary"
          className="xl:snap-start xl:h-screen flex flex-col justify-center items-center py-16 px-4 xl:py-10 xl:px-8 bg-gray-50 relative"
        >
          <div className="max-w-6xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Financial Analysis</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Automated financial modeling, break-even analysis, and report generation using Python.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold text-green-700 mb-4 text-center">Bakery Financial Analysis Case Study</h3>
              <p className="text-gray-700 mb-4">
                This project demonstrates a Python-based system for comprehensive financial analysis for a bakery, 
                covering data preparation, multi-dimensional visualizations (trends, monthly performance), 
                detailed calculations like break-even points, and automated PDF executive report generation.
              </p>
              <h4 className="font-semibold text-gray-800 mt-6 mb-2">Key Features & Outcomes:</h4>
              <ul className="list-disc pl-5 text-gray-700 space-y-1 mb-6">
                <li>Analyzed 3-year projections: 20.2% revenue growth & 17.5% EBITA increase.</li>
                <li>Automated monthly break-even calculations for financial planning.</li>
                <li>Generated professional PDF reports with key metrics and visualizations.</li>
                <li>Identified seasonal fluctuations impacting revenue and cash flow.</li>
                <li>Risk assessment: e.g., a 10% sales decrease reduces EBITA by ~13.5%.</li>
              </ul>
              <div className="text-center">
                <Link 
                  href="/coding/python/finance-analysis"
                  className="inline-flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-md hover:bg-green-200 transition-colors"
                >
                  View Full Bakery Case Study <FaArrowRight className="ml-2" />
                </Link>
              </div>
            </motion.div>
          </div>
          <DownArrowPrompt onClick={() => scrollToSection("agGridSummary")} />
        </section>

        {/* AG Grid Customization Summary Section - Enhanced */}
        <section
          ref={sectionRefs.agGridSummary}
          id="agGridSummary"
          className="xl:snap-start xl:h-screen flex flex-col justify-center items-center py-16 px-4 xl:py-10 xl:px-8 bg-gray-50 relative"
        >
          <div className="max-w-6xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">AG Grid Column Customization</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Leveraging Python for dynamic data processing and UI configuration in advanced data grids.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold text-blue-700 mb-4 text-center">Dynamic AG Grid Configuration</h3>
              <p className="text-gray-700 mb-4">
                This project focuses on using Python for backend data processing and transformation to dynamically 
                configure AG Grid columns. It allows for flexible UI based on user roles or data characteristics, 
                enhancing data visualization and interaction within complex enterprise applications.
              </p>
              <h4 className="font-semibold text-gray-800 mt-6 mb-2">Core Functionality:</h4>
              <ul className="list-disc pl-5 text-gray-700 space-y-1 mb-6">
                <li>Python scripts to define column visibility, order, and formatting.</li>
                <li>Transformation of data structures to match AG Grid's expected schema.</li>
                <li>Enabling features like dynamic grouping, sorting, and filtering based on processed data.</li>
                <li>Improving user experience by presenting tailored views of large datasets.</li>
              </ul>
              <div className="text-center">
                <Link 
                  href="/projects/ag_columns"
                  className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-200 transition-colors"
                >
                  View Column Customization Project <FaArrowRight className="ml-2" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
} 