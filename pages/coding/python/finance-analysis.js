import { useState, useRef, useEffect } from "react";
import Sidebar from "../../../components/Sidebar";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { FaArrowRight, FaPython, FaChartLine, FaFilePdf, FaChevronDown, FaCalculator, FaFileAlt, FaShieldAlt, FaLightbulb, FaBalanceScale, FaDollarSign, FaExclamationTriangle, FaArrowUp, FaArrowDown, FaCalendarAlt, FaChartArea } from "react-icons/fa";

// ScrollProgress component
function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };
    
    // Initial calculation
    handleScroll();
    
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

// ContentNavigation component (Copied from other pages)
function ContentNavigation({ sections, activeSection, scrollToSection }) {
  return (
    <div className="sticky top-0 z-40 py-3 backdrop-blur-sm bg-opacity-30">
      <div className="flex justify-center mx-auto">
        <nav className="flex space-x-6">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
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
    </div>
  );
}

// Down Arrow component
function DownArrowPrompt({ onClick, isVisible }) {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      initial={{ opacity: 0, y: 10 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 10,
      }}
      transition={{ duration: 0.3 }}
      onClick={isVisible ? onClick : null}
      style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
    >
      <FaChevronDown className="text-2xl text-gray-500 animate-bounce cursor-pointer" />
    </motion.div>
  );
}

// Sample code sections
const pythonSections = {
  dataPrep: `# -------------------------------
# 1. DATA PREPARATION
# -------------------------------
# Note: All figures below are projected numbers as outlined in the business plan.
# Revised Yearly Financial Data (Projections for Years 1-3)
data_years = {
    "Year": ["Year 1", "Year 2", "Year 3"],
    "Total Sales (USD)": [2970000, 3320000, 3570000],
    "Total Cost of Sales (USD)": [928000, 1038000, 1120000],
    "Gross Profit Margin (USD)": [2042000, 2282000, 2450000],
    "Total Staff Costs (USD)": [775400, 885000, 940000],
    "Operating Expenses (USD)": [425000, 486200, 548950],
    "EBITA (USD)": [590600, 652300, 694050],
}
df_years = pd.DataFrame(data_years)

# Revised Monthly Financial Data for Year 1 (Projections)
data_months = {
    "Month": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    "Total Sales (USD)": [148500, 178200, 197505, 276210, 276210, 259875, 259875, 259875, 326700, 259875, 259875, 267300],
    "Total Cost of Sales (USD)": [46400, 55680, 61712, 86304, 86304, 81200, 81200, 81200, 102080, 81200, 81200, 83520],
    "Gross Profit Margin (USD)": [102100, 122520, 135793, 189906, 189906, 178675, 178675, 178675, 224620, 178675, 178675, 183780],
    "Total Staff Costs (USD)": [38770, 46524, 51564, 72112, 72112, 67847, 67847, 67847, 85294, 67847, 67847, 69786],
    "Operating Expenses (USD)": [21250, 25500, 28262, 39525, 39525, 37187, 37187, 37187, 46750, 37187, 37187, 38250],
    "EBITA (USD)": [21163, 29579, 35049, 57352, 57352, 52723, 52723, 52723, 71659, 52723, 52723, 54827],
}
df_months = pd.DataFrame(data_months)`,
  
  visuals: `# -------------------------------
# 2. GENERATE PRIMARY VISUALS
# -------------------------------
# 2A. Yearly Visuals (Trends over 3 Years)
fig, axes = plt.subplots(2, 2, figsize=(14, 10))
sns.barplot(ax=axes[0, 0], x=df_years["Year"], y=df_years["Total Sales (USD)"], color="blue", label="Total Sales")
sns.barplot(ax=axes[0, 0], x=df_years["Year"], y=df_years["Total Cost of Sales (USD)"], color="red", label="Cost of Sales")
axes[0, 0].set_title("Total Sales vs Cost of Sales")
axes[0, 0].legend()

sns.lineplot(ax=axes[0, 1], x=df_years["Year"], y=df_years["Gross Profit Margin (USD)"], marker="o", color="green", label="Gross Profit Margin")
axes[0, 1].set_title("Gross Profit Margin Over 3 Years")
axes[0, 1].set_ylabel("USD")

sns.lineplot(ax=axes[1, 0], x=df_years["Year"], y=df_years["Total Staff Costs (USD)"], marker="s", color="orange", label="Staff Costs")
sns.lineplot(ax=axes[1, 0], x=df_years["Year"], y=df_years["Operating Expenses (USD)"], marker="D", color="red", label="Operating Expenses")
axes[1, 0].set_title("Staff Costs vs Operating Expenses")
axes[1, 0].legend()

sns.lineplot(ax=axes[1, 1], x=df_years["Year"], y=df_years["EBITA (USD)"], marker="^", color="purple", label="EBITA")
axes[1, 1].set_title("EBITA Growth Over 3 Years")
axes[1, 1].set_ylabel("USD")

plt.tight_layout()
yearly_chart_path = "yearly_financials.png"
fig.savefig(yearly_chart_path)
plt.close(fig)

# 2B. Monthly Visuals for Year 1
fig, axes = plt.subplots(2, 2, figsize=(14, 10))
sns.lineplot(ax=axes[0, 0], x=df_months["Month"], y=df_months["Total Sales (USD)"], marker="o", label="Sales")
sns.lineplot(ax=axes[0, 0], x=df_months["Month"], y=df_months["Total Cost of Sales (USD)"], marker="s", label="Cost of Sales")
axes[0, 0].set_title("Monthly Sales vs Cost of Sales (Year 1)")
axes[0, 0].set_ylabel("USD")
axes[0, 0].legend()`,
  
  breakeven: `# 3B. Revised Break-even Analysis
# Calculation: Fixed costs = (Staff Costs + Operating Expenses)/12; Contribution margin = 68.75%
fixed_year1 = (775400 + 425000) / 12
fixed_year2 = (885000 + 486200) / 12
fixed_year3 = (940000 + 548950) / 12
breakeven1 = fixed_year1 / 0.6875
breakeven2 = fixed_year2 / 0.6875
breakeven3 = fixed_year3 / 0.6875
avg_sales_year1 = df_years.loc[df_years["Year"]=="Year 1", "Total Sales (USD)"].values[0] / 12
avg_sales_year2 = df_years.loc[df_years["Year"]=="Year 2", "Total Sales (USD)"].values[0] / 12
avg_sales_year3 = df_years.loc[df_years["Year"]=="Year 3", "Total Sales (USD)"].values[0] / 12
df_breakeven = pd.DataFrame({
    "Month": df_months["Month"],
    "Year 1 Sales": [avg_sales_year1] * 12,
    "Year 2 Sales": [avg_sales_year2] * 12,
    "Year 3 Sales": [avg_sales_year3] * 12,
    "Year 1 Break-even": [breakeven1] * 12,
    "Year 2 Break-even": [breakeven2] * 12,
    "Year 3 Break-even": [breakeven3] * 12,
})
fig, ax = plt.subplots(figsize=(10, 5))
sns.lineplot(x="Month", y="Year 1 Sales", data=df_breakeven, marker="o", label="Year 1 Sales", color="blue", ax=ax)
sns.lineplot(x="Month", y="Year 1 Break-even", data=df_breakeven, marker="s", label="Year 1 Break-even", color="orange", ax=ax)
sns.lineplot(x="Month", y="Year 2 Sales", data=df_breakeven, marker="o", label="Year 2 Sales", color="green", ax=ax)
sns.lineplot(x="Month", y="Year 2 Break-even", data=df_breakeven, marker="s", label="Year 2 Break-even", color="red", ax=ax)
sns.lineplot(x="Month", y="Year 3 Sales", data=df_breakeven, marker="o", label="Year 3 Sales", color="purple", ax=ax)
sns.lineplot(x="Month", y="Year 3 Break-even", data=df_breakeven, marker="s", label="Year 3 Break-even", color="brown", ax=ax)
ax.set_title("Revised Break-even Analysis (Monthly Trends)")
ax.set_ylabel("USD")
ax.legend()
plt.tight_layout()
breakeven_path = "revised_break_even.png"
fig.savefig(breakeven_path)
plt.close(fig)`,
  
  pdfReport: `# -------------------------------
# 4. GENERATE PDF REPORT
# -------------------------------
class PDFReport(FPDF):
    def header(self):
        self.set_font("Arial", style='B', size=12)
        self.cell(0, 10, "Phyllo Financial Analysis Report", ln=True, align='C')
        self.ln(5)
    def footer(self):
        self.set_y(-15)
        self.set_font("Arial", size=8)
        self.cell(0, 10, f"Page {self.page_no()}", align='C')

pdf = PDFReport()
pdf.set_auto_page_break(auto=True, margin=15)

# Page 1: Executive Summary (Cover)
pdf.add_page()
pdf.set_font("Arial", style='B', size=20)
pdf.cell(0, 15, "Executive Summary", ln=True, align='C')
pdf.ln(5)
pdf.set_font("Arial", size=12)
executive_summary = (
    "This report presents projected financial performance for Phyllo, a boutique Greek bakery that is set to open soon. "
    "The figures below are based on the business plan projections. Key insights include a 20.2% increase in Total Sales over three years "
    "and a 17.5% growth in EBITA. The report details trends in sales, costs, gross profit, and operating margins, while also analyzing risk factors "
    "and break-even requirements."
)
pdf.multi_cell(0, 8, sanitize_text(executive_summary))
pdf.ln(4)

# Save the final PDF
final_pdf_path = "Phyllo_Fin_Anlytics_Final.pdf"
pdf.output(final_pdf_path)`
};

export default function PythonFinancialAnalysis() {
  const [activeSection, setActiveSection] = useState("overview");
  const [activeTab, setActiveTab] = useState("dataPrep");
  const mainScrollRef = useRef(null); // Added for IntersectionObserver root

  // Section refs
  const sectionRefs = {
    overview: useRef(null),
    visualizations: useRef(null),
    report: useRef(null)
  };

  // Define sections for navigation
  const contentSections = [
    { id: "overview", label: "Overview" },
    { id: "visualizations", label: "Financial Visualizations" },
    { id: "report", label: "Automated Report Generation" },
  ];

  // Scrolling function
  const scrollToSection = (sectionId) => {
    if (sectionRefs[sectionId] && sectionRefs[sectionId].current) {
      sectionRefs[sectionId].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Track active section using IntersectionObserver
  useEffect(() => {
    const mainElement = mainScrollRef.current;
    if (!mainElement) {
      return;
    }

    const observerOptions = {
      root: mainElement,
      rootMargin: '0px',
      threshold: 0.75
    };

    const observerCallback = (entries) => {
      const intersectingEntries = entries.filter(entry => entry.isIntersecting);
      if (intersectingEntries.length > 0) {
        intersectingEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const mostVisibleSectionId = intersectingEntries[0].target.id;
        setActiveSection(prevActiveSection => {
          if (prevActiveSection !== mostVisibleSectionId) {
            return mostVisibleSectionId;
          }
          return prevActiveSection;
        });
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    // Ensure we only observe refs that are part of contentSections for this page
    const refsToObserve = Object.values(sectionRefs).filter(ref => 
      contentSections.some(s => ref.current && s.id === ref.current.id)
    );

    refsToObserve.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      refsToObserve.forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
      observer.disconnect();
    };
  }, [setActiveSection, sectionRefs, contentSections]); // contentSections added to dependencies

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <ScrollProgress />
      
      <main ref={mainScrollRef} className="ml-[24%] w-[76%] snap-y snap-mandatory h-screen overflow-scroll">
        <ContentNavigation
          sections={contentSections}
          activeSection={activeSection}
          scrollToSection={scrollToSection}
        />
        {/* Overview Section */}
        <section
          ref={sectionRefs.overview}
          id="overview"
          className="snap-start min-h-screen flex flex-col justify-center p-8 relative overflow-hidden"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12 text-center"
            >
              <h1 className="text-3xl font-bold mb-4 text-blue-600">
                Python for Financial Analysis
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Leveraging Python's data science libraries to create comprehensive financial 
                analyses, visualizations, and automated reports for business decision-making.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-8 rounded-lg shadow-md border border-gray-200"
            >
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="md:w-1/2">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Bakery Financial Analysis</h2>
                  <p className="text-gray-700 mb-4">
                    This project showcases a comprehensive financial analysis system for a bakery business, 
                    demonstrating Python's capabilities for business intelligence and financial reporting.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Key Features:</h3>
                  <ul className="list-disc pl-5 text-gray-700 space-y-2">
                    <li>Data preparation and transformation with Pandas</li>
                    <li>Multi-dimensional visualizations using Matplotlib and Seaborn</li>
                    <li>Detailed financial calculations (break-even analysis, margins, etc.)</li>
                    <li>Automated PDF report generation with FPDF</li>
                    <li>Risk analysis and sensitivity testing</li>
                  </ul>
                </div>
                
                <div className="md:w-1/2 bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-4">Project Highlights</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded border border-blue-100">
                      <div className="flex items-center mb-2">
                        <FaChartLine className="text-blue-600 mr-2" />
                        <h4 className="font-medium text-gray-800">Financial Trend Analysis</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Analyzed 3-year financial projections showing a 20.2% revenue growth and 17.5% EBITA increase
                      </p>
                    </div>
                    
                    <div className="bg-white p-4 rounded border border-green-100">
                      <div className="flex items-center mb-2">
                        <FaCalculator className="text-green-600 mr-2" />
                        <h4 className="font-medium text-gray-800">Break-even Calculation</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Automated calculation of monthly break-even points for financial planning and risk assessment
                      </p>
                    </div>
                    
                    <div className="bg-white p-4 rounded border border-purple-100">
                      <div className="flex items-center mb-2">
                        <FaFilePdf className="text-purple-600 mr-2" />
                        <h4 className="font-medium text-gray-800">Executive Reporting</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Generated professional PDF reports with visualizations and key metrics for stakeholders
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <DownArrowPrompt onClick={() => scrollToSection("visualizations")} isVisible={activeSection === "overview"} />
        </section>
        
        {/* Data Visualization Section */}
        <section
          ref={sectionRefs.visualizations}
          id="visualizations"
          className="snap-start min-h-screen flex flex-col justify-center p-6 bg-gray-50 relative overflow-hidden"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-6"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Financial Visualizations</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Using Python to transform financial data into actionable insights
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-5 rounded-lg shadow-md"
            >
              <div className="mb-4">
                <div className="flex border-b border-gray-200 mb-3 overflow-x-auto">
                  <button
                    onClick={() => handleTabChange("dataPrep")}
                    className={`py-2 px-4 font-medium transition-colors whitespace-nowrap text-sm ${
                      activeTab === "dataPrep"
                        ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Data Preparation
                  </button>
                  <button
                    onClick={() => handleTabChange("visuals")}
                    className={`py-2 px-4 font-medium transition-colors whitespace-nowrap text-sm ${
                      activeTab === "visuals"
                        ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Visualizations
                  </button>
                  <button
                    onClick={() => handleTabChange("breakeven")}
                    className={`py-2 px-4 font-medium transition-colors whitespace-nowrap text-sm ${
                      activeTab === "breakeven"
                        ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Break-even Analysis
                  </button>
                  <button
                    onClick={() => handleTabChange("pdfReport")}
                    className={`py-2 px-4 font-medium transition-colors whitespace-nowrap text-sm ${
                      activeTab === "pdfReport"
                        ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    PDF Report
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                <div className="px-3 py-2 bg-gray-800 text-white flex justify-between items-center">
                  <h3 className="font-mono text-xs">
                    {activeTab === "dataPrep" ? "data_preparation.py" : 
                     activeTab === "visuals" ? "visualizations.py" : 
                     activeTab === "breakeven" ? "break_even_analysis.py" : "pdf_report.py"}
                  </h3>
                  <span className="text-xs bg-blue-600 px-2 py-0.5 rounded">Python</span>
                </div>
                <div className="p-1 max-h-[350px] overflow-auto">
                  <SyntaxHighlighter
                    language="python"
                    style={atomDark}
                    showLineNumbers={true}
                    wrapLines={true}
                    className="text-xs"
                  >
                    {pythonSections[activeTab]}
                  </SyntaxHighlighter>
                </div>
                <div className="px-3 py-2 bg-gray-800 text-gray-400 text-xs">
                  Libraries used: pandas, matplotlib, seaborn, numpy, fpdf
                </div>
              </div>
              
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <h3 className="text-base font-semibold text-gray-800 mb-1">Technical Approach</h3>
                  <p className="text-gray-700 text-xs">
                    Using Pandas DataFrames for data manipulation, Matplotlib/Seaborn for visualizations, 
                    and custom calculations for financial metrics. FPDF generates professional PDF reports 
                    integrating all analysis components.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <h3 className="text-base font-semibold text-gray-800 mb-1">Business Impact</h3>
                  <p className="text-gray-700 text-xs">
                    Analysis identified seasonal fluctuations requiring $145,700 monthly revenue to break even. 
                    Automated reporting saved ~15 hours of manual work per review cycle and supported 
                    successful funding acquisition.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
          <DownArrowPrompt onClick={() => scrollToSection("report")} isVisible={activeSection === "visualizations"} />
        </section>
        
        {/* Report Generation Section */}
        <section
          ref={sectionRefs.report}
          id="report"
          className="snap-start min-h-screen flex flex-col justify-center p-6 relative"
        >
          <div className="max-w-6xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Automated Report Generation</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Creating dynamic PDF reports with Python for business insights
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-xl"
            >
              <div className="flex flex-col lg:flex-row items-start gap-6">
                
                {/* Left Column: PDF Report Structure - Enhanced */}
                <div className="lg:w-1/2 w-full">
                  <h3 className="text-xl font-bold text-blue-700 mb-4 flex items-center">
                    <FaFilePdf className="mr-3 text-2xl text-blue-500" />
                    PDF Report Structure
                  </h3>
                  
                  <div className="space-y-3 mb-6">
                    {[
                      { title: "Executive Summary", text: "Key financial projections and business insights", icon: <FaFileAlt className="text-indigo-500"/> },
                      { title: "Financial Metrics", text: "Revenue, costs, and profitability analysis", icon: <FaCalculator className="text-green-500"/> },
                      { title: "Visualizations", text: "Charts showing trends and projections", icon: <FaChartLine className="text-purple-500"/> },
                      { title: "Risk Assessment", text: "Break-even analysis and sensitivity testing", icon: <FaShieldAlt className="text-red-500"/> }
                    ].map((item, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center mb-1">
                          <div className="mr-2 h-6 w-6 flex items-center justify-center rounded-full bg-gray-200">
                            {item.icon}
                          </div>
                          <h4 className="font-semibold text-gray-800 text-md">{item.title}</h4>
                        </div>
                        <p className="text-gray-600 text-sm ml-8">{item.text}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-400">
                    <p className="text-indigo-800 text-sm font-medium">
                      This automated system generates an 11-page financial document, a task that would typically 
                      take 15+ hours manually. Charts, tables, and calculations are dynamically populated 
                      from the source data, ensuring accuracy and efficiency.
                    </p>
                  </div>
                </div>
                
                {/* Right Column: Key Findings - Enhanced */}
                <div className="lg:w-1/2 w-full space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center">
                       <FaLightbulb className="mr-3 text-2xl text-green-500" />
                      Key Financial Projections
                    </h3>
                    <div className="bg-green-50 p-5 rounded-lg border border-green-200 shadow-sm">
                      <ul className="space-y-2">
                        {[
                          { text: "20.2% increase in total sales over three years", icon: <FaArrowUp className="text-green-500"/> },
                          { text: "17.5% growth in EBITA from Year 1 to Year 3", icon: <FaArrowUp className="text-green-500"/> },
                          { text: "Stable operating margins between 19.9% and 20.0%", icon: <FaBalanceScale className="text-green-500"/> },
                          { text: "Monthly break-even point of approximately $145,700", icon: <FaDollarSign className="text-green-500"/> }
                        ].map((item, index) => (
                          <li key={index} className="flex items-start">
                            <div className="mr-2 mt-1 h-5 w-5 flex items-center justify-center rounded-full bg-green-100">
                                {item.icon}
                            </div>
                            <p className="text-gray-700 text-sm">{item.text}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-red-700 mb-4 flex items-center">
                      <FaExclamationTriangle className="mr-3 text-2xl text-red-500" />
                      Key Risk Assessment
                    </h3>
                    <div className="bg-red-50 p-5 rounded-lg border border-red-200 shadow-sm">
                      <ul className="space-y-2">
                        {[
                          { text: "10% decrease in sales would reduce EBITA by approximately 13.5%", icon: <FaArrowDown className="text-red-500"/> },
                          { text: "10% increase in costs would reduce EBITA by approximately 20.8%", icon: <FaArrowDown className="text-red-500"/> },
                          { text: "Seasonal demand patterns require careful cash flow management", icon: <FaCalendarAlt className="text-red-500"/> },
                          { text: "Fixed costs increase 23.7% over the three-year period", icon: <FaChartArea className="text-red-500"/> }
                        ].map((item, index) => (
                          <li key={index} className="flex items-start">
                            <div className="mr-2 mt-1 h-5 w-5 flex items-center justify-center rounded-full bg-red-100">
                                {item.icon}
                            </div>
                            <p className="text-gray-700 text-sm">{item.text}</p>
                          </li>
                        ))}
                      </ul>
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