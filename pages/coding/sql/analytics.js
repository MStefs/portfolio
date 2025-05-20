import { useState, useRef, useEffect } from "react";
import Sidebar from "../../../components/Sidebar";
import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Link from "next/link";
import { FaArrowRight, FaChartLine, FaDatabase, FaCode, FaLightbulb, FaSnowflake, FaChevronDown } from "react-icons/fa";
import { BiLineChart, BiCodeAlt, BiLayer } from "react-icons/bi";

// ScrollProgress component
function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const mainElement = document.querySelector('main');
      if (mainElement) {
        const totalHeight = mainElement.scrollHeight - mainElement.clientHeight;
        const progress = (mainElement.scrollTop / totalHeight) * 100;
        setScrollProgress(Math.min(progress, 100));
      } else {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.pageYOffset / totalHeight) * 100;
        setScrollProgress(Math.min(progress, 100));
      }
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
    
    const mainElement = document.querySelector('main');
    const scrollableElement = mainElement || window;

    scrollableElement.addEventListener("scroll", throttledScroll);
    return () => {
      scrollableElement.removeEventListener("scroll", throttledScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);
  
  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 xl:ml-[24%]">
      <div 
        className="h-full bg-indigo-600" 
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}

// ContentNavigation component
function ContentNavigation({ sections, activeSection, scrollToSection }) {
  let displayLabel = "";
  const currentNavItem = sections.find(item => item.id === activeSection);
  if (currentNavItem) {
    displayLabel = currentNavItem.label;
  } else if (activeSection) {
    displayLabel = activeSection.replace(/_/g, ' ').replace(/\\b\\w/g, l => l.toUpperCase()).split(" ").slice(0,2).join(" ");
    if (displayLabel.length > 20 && displayLabel.includes(" ")) displayLabel = displayLabel.split(" ")[0] + "..."; 
    else if (displayLabel.length > 20) displayLabel = displayLabel.substring(0, 18) + "...";
  } else {
    displayLabel = "Menu";
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
      <div className="flex xl:hidden justify-center items-center h-full px-4">
        <span className="text-xs font-medium text-indigo-700 bg-indigo-100 px-3 py-1 rounded-md truncate" style={{ maxWidth: '180px' }}> 
          {displayLabel || "Overview"}
        </span>
      </div>
    </div>
  );
}

// DownArrow component
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

export default function SQLAnalytics() {
  const [activeTab, setActiveTab] = useState("sessions");
  const [activeSection, setActiveSection] = useState("overview");
  // const mainScrollRef = useRef(null); // No longer needed for IntersectionObserver root
  
  // Section refs
  const sectionRefs = {
    overview: useRef(null),
    analysis: useRef(null),
    code: useRef(null)
  };

  // Define sections for navigation
  const contentSections = [
    { id: "overview", label: "Overview" },
    { id: "analysis", label: "Analytics Details" },
    { id: "code", label: "Implementation" },
  ];

  // SQL Examples from your files
  const sqlExamples = {
    sessions: {
      title: "Session Analysis",
      icon: <BiLineChart className="text-blue-500 text-4xl" />,
      description: "Comprehensive session-level metrics and engagement scoring of user interaction patterns",
      shortDescription: "Comprehensive metrics on user engagement, with segmentation by factors like device type, geography, and browser.",
      businessValue: "Provides a 360-degree view of user engagement across different segments, helping identify both power users and those at risk of churning. Enables product teams to understand how factors like geography, device type, and browser affect usage patterns and satisfaction.",
      technicalDetails: "Implements sophisticated engagement scoring algorithms incorporating multiple dimensions (events, page views, duration). Features browser/device detection logic that identifies user environment changes within sessions.",
      keyPoints: [
        "Calculates custom engagement scores to quantify user interaction intensity",
        "Predicts churn probability based on usage frequency and patterns",
        "Segments users into engagement categories (Low/Medium/High)",
        "Tracks browser changes and geographical patterns within sessions",
        "Computes interaction rates (clicks per minute, pages per minute)"
      ],
      usedIn: "GA Data project for creating user segmentation models and predicting product stickiness based on measured engagement patterns",
      code: `-- ***************************************************************
-- Session Event & Engagement Analysis
-- This script demonstrates how to:
--  1. Identify the first event per session.
--  2. Filter sessions that include at least one \"designated\" page view.
--  3. Capture detailed event-level data for these sessions.
--  4. Derive session attributes and user engagement metrics.
-- ***************************************************************

-- Step 1: Identify the first event per session using ROW_NUMBER()
WITH FirstEventPerSession AS (
    SELECT
        \"EVENT_PARAMS_GA_SESSION_ID\",             -- Session identifier
        \"TENANTID\",
        \"USER_ID\" AS \"FIRST_USER_ID\",              -- The first user ID in the session
        CONCAT(\"TENANTID\", \"USER_ID\") AS \"TENANT_USER_ID\",  -- Combined tenant & user ID for uniqueness
        \"EVENT_TIMESTAMP\" AS \"FIRST_EVENT_TIMESTAMP\"  -- Timestamp of the first event
    FROM (
        SELECT
            \"EVENT_PARAMS_GA_SESSION_ID\",
            \"TENANTID\",
            \"USER_ID\",
            \"EVENT_TIMESTAMP\",
            ROW_NUMBER() OVER (
                PARTITION BY \"EVENT_PARAMS_GA_SESSION_ID\", \"TENANTID\"
                ORDER BY \"EVENT_TIMESTAMP\"
            ) AS rn  -- Rank events within each session by timestamp
        FROM \"YOUR_SCHEMA\".\"YOUR_TABLE\"  -- Replace with your actual schema/table
        WHERE \"EVENT_TIMESTAMP\" >= DATEADD(month, -3, CURRENT_DATE)
    ) t
    WHERE rn = 1  -- Keep only the first event per session
)
-- Explanation: This CTE extracts the earliest event per session for each tenant.

-- Step 2: Identify sessions with at least one designated URL event
, AllSessions AS (
    SELECT
        F.\"EVENT_PARAMS_GA_SESSION_ID\",
        F.\"TENANTID\",
        F.\"FIRST_USER_ID\",
        F.\"TENANT_USER_ID\",
        -- Create a unique session identifier by combining session and tenant-user info
        TO_NUMBER(CONCAT(F.\"EVENT_PARAMS_GA_SESSION_ID\", REPLACE(F.\"TENANT_USER_ID\", '-', ''))) AS \"SESSION_ID_USER_ID\",
        COUNT(DISTINCT CASE 
            -- Designated URL condition: using a generic example link pattern
            WHEN E.\"EVENT_PARAMS_PAGE_LOCATION\" ILIKE 'https://example.com/ExampleLink%' THEN 1 
            ELSE NULL 
         END) AS \"DESIGNATED_URL_COUNT\"
    FROM \"YOUR_SCHEMA\".\"YOUR_TABLE\" E
    INNER JOIN FirstEventPerSession F
        ON E.\"EVENT_PARAMS_GA_SESSION_ID\" = F.\"EVENT_PARAMS_GA_SESSION_ID\"
        AND E.\"TENANTID\" = F.\"TENANTID\"
        AND E.\"USER_ID\" = F.\"FIRST_USER_ID\"  -- Only consider events from the first user in the session
    WHERE E.\"EVENT_TIMESTAMP\" >= DATEADD(month, -3, CURRENT_DATE)
    GROUP BY 
        F.\"EVENT_PARAMS_GA_SESSION_ID\", 
        F.\"TENANTID\", 
        F.\"FIRST_USER_ID\", 
        F.\"TENANT_USER_ID\"
    HAVING \"DESIGNATED_URL_COUNT\" > 0  -- Only include sessions with at least one designated URL event
)
-- Explanation: This CTE filters sessions to those where the user visited at least one \"designated\" page (using an example link).

-- Step 3: Capture all events from the filtered sessions for the first USER_ID only
, AllSessionEvents AS (
    SELECT
        S.\"SESSION_ID_USER_ID\",
        E.\"EVENT_PARAMS_GA_SESSION_ID\",
        E.\"EVENT_NAME\",
        E.\"EVENT_TIMESTAMP\",
        DATE(E.\"EVENT_TIMESTAMP\") AS \"SESSION_DATE\",
        E.\"EVENT_PARAMS_PAGE_LOCATION\",
        E.\"TENANTID\",
        S.\"TENANT_USER_ID\",
        E.\"USER_ID\",
        E.\"GEO_CITY\",
        E.\"GEO_COUNTRY\",
        E.\"GEO_METRO\",
        E.\"GEO_REGION\",
        E.\"DEVICE_CATEGORY\",
        E.\"DEVICE_OPERATING_SYSTEM\",
        E.\"DEVICE_WEB_INFO_BROWSER\",
        E.\"EVENT_PARAMS_VIEWPORT\",
        E.\"EVENT_PARAMS_CUSTOM_ZOOM_PERCENTAGE\",
        E.\"EVENT_PARAMS_CUSTOM_ZOOM_PERCENTAGE_PIXELRATIO\",
        -- Assign event priority for later ordering: session_start first, then page_view, then others.
        CASE 
            WHEN E.\"EVENT_NAME\" = 'session_start' THEN 1
            WHEN E.\"EVENT_NAME\" = 'page_view' THEN 2
            ELSE 3
        END AS \"EVENT_PRIORITY\",
        -- Clean the page URL: remove the base URL if it matches our example domain.
        CASE 
            WHEN E.\"EVENT_PARAMS_PAGE_LOCATION\" ILIKE 'https://example.com/%' 
                 THEN SPLIT_PART(REPLACE(E.\"EVENT_PARAMS_PAGE_LOCATION\", 'https://example.com/', ''), '?', 1)
            ELSE SPLIT_PART(E.\"EVENT_PARAMS_PAGE_LOCATION\", '?', 1)
        END AS \"CLEANED_PAGE_LOCATION\",
        -- Flag if this event's page is a designated URL (using the generic example link)
        CASE 
            WHEN E.\"EVENT_PARAMS_PAGE_LOCATION\" ILIKE 'https://example.com/ExampleLink%' THEN 1 
            ELSE 0 
        END AS \"IS_DESIGNATED_URL\",
        -- Capture the first browser used in the session
        FIRST_VALUE(E.\"DEVICE_WEB_INFO_BROWSER\") OVER (
            PARTITION BY S.\"SESSION_ID_USER_ID\" 
            ORDER BY E.\"EVENT_TIMESTAMP\"
        ) AS \"INITIAL_BROWSER\",
        -- Capture the last browser used in the session
        LAST_VALUE(E.\"DEVICE_WEB_INFO_BROWSER\") OVER (
            PARTITION BY S.\"SESSION_ID_USER_ID\" 
            ORDER BY E.\"EVENT_TIMESTAMP\" 
            ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
        ) AS \"LAST_BROWSER\",
        -- Calculate timestamps to help identify new vs. returning users and churn
        MIN(E.\"EVENT_TIMESTAMP\") OVER (PARTITION BY S.\"TENANT_USER_ID\") AS \"FIRST_USER_EVENT_TIMESTAMP\",
        MIN(E.\"EVENT_TIMESTAMP\") OVER (PARTITION BY S.\"SESSION_ID_USER_ID\") AS \"FIRST_SESSION_EVENT_TIMESTAMP\",
        MAX(E.\"EVENT_TIMESTAMP\") OVER (PARTITION BY S.\"TENANT_USER_ID\") AS \"LAST_USER_EVENT_TIMESTAMP\"
    FROM \"YOUR_SCHEMA\".\"YOUR_TABLE\" E
    INNER JOIN AllSessions S
        ON E.\"EVENT_PARAMS_GA_SESSION_ID\" = S.\"EVENT_PARAMS_GA_SESSION_ID\"
        AND E.\"TENANTID\" = S.\"TENANTID\"
        AND E.\"USER_ID\" = S.\"FIRST_USER_ID\"  -- Limit to events from the first user of each session
    WHERE E.\"EVENT_TIMESTAMP\" >= DATEADD(month, -3, CURRENT_DATE)
)
-- Explanation: This CTE gathers detailed event data for sessions that passed the filter, cleans the URL, and flags designated URL events.

-- Step 4: Get session-level attributes from the first event in each session
, SessionAttributes AS (
    SELECT DISTINCT
        \"SESSION_ID_USER_ID\",
        FIRST_VALUE(\"TENANTID\") OVER (PARTITION BY \"SESSION_ID_USER_ID\" ORDER BY \"EVENT_TIMESTAMP\", \"EVENT_PRIORITY\") AS \"TENANTID\",
        FIRST_VALUE(\"TENANT_USER_ID\") OVER (PARTITION BY \"SESSION_ID_USER_ID\" ORDER BY \"EVENT_TIMESTAMP\", \"EVENT_PRIORITY\") AS \"TENANT_USER_ID\",
        FIRST_VALUE(\"USER_ID\") OVER (PARTITION BY \"SESSION_ID_USER_ID\" ORDER BY \"EVENT_TIMESTAMP\", \"EVENT_PRIORITY\") AS \"USER_ID\",
        FIRST_VALUE(\"SESSION_DATE\") OVER (PARTITION BY \"SESSION_ID_USER_ID\" ORDER BY \"EVENT_TIMESTAMP\", \"EVENT_PRIORITY\") AS \"SESSION_DATE\",
        FIRST_VALUE(\"GEO_CITY\") OVER (PARTITION BY \"SESSION_ID_USER_ID\" ORDER BY \"EVENT_TIMESTAMP\", \"EVENT_PRIORITY\") AS \"GEO_CITY\",
        FIRST_VALUE(\"GEO_COUNTRY\") OVER (PARTITION BY \"SESSION_ID_USER_ID\" ORDER BY \"EVENT_TIMESTAMP\", \"EVENT_PRIORITY\") AS \"GEO_COUNTRY\",
        FIRST_VALUE(\"GEO_METRO\") OVER (PARTITION BY \"SESSION_ID_USER_ID\" ORDER BY \"EVENT_TIMESTAMP\", \"EVENT_PRIORITY\") AS \"GEO_METRO\",
        FIRST_VALUE(\"GEO_REGION\") OVER (PARTITION BY \"SESSION_ID_USER_ID\" ORDER BY \"EVENT_TIMESTAMP\", \"EVENT_PRIORITY\") AS \"GEO_REGION\",
        FIRST_VALUE(\"DEVICE_CATEGORY\") OVER (PARTITION BY \"SESSION_ID_USER_ID\" ORDER BY \"EVENT_TIMESTAMP\", \"EVENT_PRIORITY\") AS \"DEVICE_CATEGORY\",
        FIRST_VALUE(\"DEVICE_OPERATING_SYSTEM\") OVER (PARTITION BY \"SESSION_ID_USER_ID\" ORDER BY \"EVENT_TIMESTAMP\", \"EVENT_PRIORITY\") AS \"DEVICE_OPERATING_SYSTEM\",
        FIRST_VALUE(\"DEVICE_WEB_INFO_BROWSER\") OVER (PARTITION BY \"SESSION_ID_USER_ID\" ORDER BY \"EVENT_TIMESTAMP\", \"EVENT_PRIORITY\") AS \"DEVICE_WEB_INFO_BROWSER\",
        FIRST_VALUE(\"EVENT_PARAMS_VIEWPORT\") OVER (PARTITION BY \"SESSION_ID_USER_ID\" ORDER BY \"EVENT_TIMESTAMP\", \"EVENT_PRIORITY\") AS \"MAX_VIEWPORT\",
        FIRST_VALUE(\"EVENT_PARAMS_CUSTOM_ZOOM_PERCENTAGE\") OVER (PARTITION BY \"SESSION_ID_USER_ID\" ORDER BY \"EVENT_TIMESTAMP\", \"EVENT_PRIORITY\") AS \"MAX_ZOOM_PERCENTAGE\",
        FIRST_VALUE(\"EVENT_PARAMS_CUSTOM_ZOOM_PERCENTAGE_PIXELRATIO\") OVER (PARTITION BY \"SESSION_ID_USER_ID\" ORDER BY \"EVENT_TIMESTAMP\", \"EVENT_PRIORITY\") AS \"MAX_ZOOM_PERCENTAGE_PIXELRATIO\",
        -- Establish first and last event timestamps for additional metrics
        MIN(\"FIRST_USER_EVENT_TIMESTAMP\") OVER (PARTITION BY \"SESSION_ID_USER_ID\") AS \"FIRST_USER_EVENT_TIMESTAMP\",
        MIN(\"FIRST_SESSION_EVENT_TIMESTAMP\") OVER (PARTITION BY \"SESSION_ID_USER_ID\") AS \"FIRST_SESSION_EVENT_TIMESTAMP\",
        MAX(\"LAST_USER_EVENT_TIMESTAMP\") OVER (PARTITION BY \"SESSION_ID_USER_ID\") AS \"LAST_USER_EVENT_TIMESTAMP\",
        -- Determine if the user is new or returning based on first event timestamps
        CASE 
            WHEN MIN(\"FIRST_USER_EVENT_TIMESTAMP\") OVER (PARTITION BY \"SESSION_ID_USER_ID\") =
                 MIN(\"FIRST_SESSION_EVENT_TIMESTAMP\") OVER (PARTITION BY \"SESSION_ID_USER_ID\")
            THEN 'New User'
            ELSE 'Returning User'
        END AS \"USER_TYPE\",
        -- Assess churn probability based on days since the last event
        CASE
            WHEN DATEDIFF('day', MAX(\"LAST_USER_EVENT_TIMESTAMP\") OVER (PARTITION BY \"SESSION_ID_USER_ID\"), CURRENT_DATE) > 30 THEN 'High'
            WHEN DATEDIFF('day', MAX(\"LAST_USER_EVENT_TIMESTAMP\") OVER (PARTITION BY \"SESSION_ID_USER_ID\"), CURRENT_DATE) BETWEEN 10 AND 30 THEN 'Medium'
            ELSE 'Low'
        END AS \"CHURN_PROBABILITY\"
    FROM AllSessionEvents
)
-- Explanation: This CTE summarizes session-level attributes using window functions on the event data.

-- Step 5: Calculate session order, gaps, and counts per tenant user
, UserSessionOrder AS (
    SELECT
        SA.\"TENANT_USER_ID\",
        SA.\"SESSION_ID_USER_ID\",
        SA.\"SESSION_DATE\",
        ROW_NUMBER() OVER (PARTITION BY SA.\"TENANT_USER_ID\" ORDER BY SA.\"SESSION_DATE\") AS \"SESSION_ORDER\",
        LAG(SA.\"SESSION_DATE\") OVER (PARTITION BY SA.\"TENANT_USER_ID\" ORDER BY SA.\"SESSION_DATE\") AS \"PREVIOUS_SESSION_DATE\",
        DATEDIFF('day', LAG(SA.\"SESSION_DATE\") OVER (PARTITION BY SA.\"TENANT_USER_ID\" ORDER BY SA.\"SESSION_DATE\"), SA.\"SESSION_DATE\") AS \"DAYS_BETWEEN_SESSIONS\"
    FROM SessionAttributes SA
)
-- Explanation: This CTE orders sessions per tenant user and calculates the days between sessions.

-- Step 6: Count the number of sessions in the last 60 days per tenant user
, UserSessionCounts AS (
    SELECT
        \"TENANT_USER_ID\",
        COUNT(*) AS \"SESSIONS_LAST_60_DAYS\"
    FROM UserSessionOrder
    WHERE \"SESSION_DATE\" >= DATEADD('day', -60, CURRENT_DATE)
    GROUP BY \"TENANT_USER_ID\"
)
-- Explanation: This CTE computes how many sessions a user had in the previous 60 days.

-- Step 7: Aggregate events to generate session-level statistics
, AggregatedSessionEvents AS (
    SELECT
        ASE.\"SESSION_ID_USER_ID\",
        SA.\"TENANTID\",
        SA.\"TENANT_USER_ID\",
        SA.\"SESSION_DATE\",
        SA.\"USER_ID\",
        SA.\"GEO_CITY\",
        SA.\"GEO_COUNTRY\",
        SA.\"GEO_METRO\",
        SA.\"GEO_REGION\",
        SA.\"DEVICE_CATEGORY\",
        SA.\"DEVICE_OPERATING_SYSTEM\",
        SA.\"DEVICE_WEB_INFO_BROWSER\",
        SA.\"MAX_VIEWPORT\",
        SA.\"MAX_ZOOM_PERCENTAGE\",
        SA.\"MAX_ZOOM_PERCENTAGE_PIXELRATIO\",
        SA.\"USER_TYPE\",
        SA.\"CHURN_PROBABILITY\",
        -- Concatenate event names and cleaned page URLs in order of occurrence
        LISTAGG(ASE.\"EVENT_NAME\", ' > ') WITHIN GROUP (ORDER BY ASE.\"EVENT_TIMESTAMP\", ASE.\"EVENT_PRIORITY\") AS \"ALL_SESSION_EVENT_NAMES\",
        LISTAGG(ASE.\"CLEANED_PAGE_LOCATION\", ' > ') WITHIN GROUP (ORDER BY ASE.\"EVENT_TIMESTAMP\", ASE.\"EVENT_PRIORITY\") AS \"ALL_SESSION_EVENT_URLS\",
        COUNT(ASE.\"EVENT_NAME\") AS \"TOTAL_EVENTS_IN_SESSION\",
        COUNT(DISTINCT ASE.\"CLEANED_PAGE_LOCATION\") AS \"TOTAL_UNIQUE_PAGES_IN_SESSION\",
        -- Capture the initial and final browsers used during the session
        MIN(ASE.\"INITIAL_BROWSER\") AS \"STARTING_BROWSER\",
        MIN(ASE.\"LAST_BROWSER\") AS \"ENDING_BROWSER\",
        -- Determine if the browser changed during the session
        CASE
            WHEN MIN(ASE.\"INITIAL_BROWSER\") != MIN(ASE.\"LAST_BROWSER\") THEN MIN(ASE.\"LAST_BROWSER\")
            ELSE NULL
        END AS \"SWITCHED_BROWSER\"
    FROM AllSessionEvents ASE
    INNER JOIN SessionAttributes SA ON ASE.\"SESSION_ID_USER_ID\" = SA.\"SESSION_ID_USER_ID\"
    GROUP BY 
        ASE.\"SESSION_ID_USER_ID\",
        SA.\"TENANTID\",
        SA.\"TENANT_USER_ID\",
        SA.\"SESSION_DATE\",
        SA.\"USER_ID\",
        SA.\"GEO_CITY\",
        SA.\"GEO_COUNTRY\",
        SA.\"GEO_METRO\",
        SA.\"GEO_REGION\",
        SA.\"DEVICE_CATEGORY\",
        SA.\"DEVICE_OPERATING_SYSTEM\",
        SA.\"DEVICE_WEB_INFO_BROWSER\",
        SA.\"MAX_VIEWPORT\",
        SA.\"MAX_ZOOM_PERCENTAGE\",
        SA.\"MAX_ZOOM_PERCENTAGE_PIXELRATIO\",
        SA.\"USER_TYPE\",
        SA.\"CHURN_PROBABILITY\"
)
-- Explanation: This CTE aggregates event data into session-level metrics (e.g., total events, unique pages, browser details).

-- Step 8: Calculate time differences between consecutive events within each session
, TimeBetweenEvents AS (
    SELECT
        \"SESSION_ID_USER_ID\",
        \"EVENT_PARAMS_GA_SESSION_ID\",
        \"CLEANED_PAGE_LOCATION\",
        \"IS_DESIGNATED_URL\",
        \"EVENT_TIMESTAMP\",
        DATEDIFF(
            'second', 
            LAG(\"EVENT_TIMESTAMP\") OVER (PARTITION BY \"SESSION_ID_USER_ID\" ORDER BY \"EVENT_TIMESTAMP\", \"EVENT_PRIORITY\"), 
            \"EVENT_TIMESTAMP\"
        ) AS \"TIME_BETWEEN_EVENTS_SECONDS\"
    FROM AllSessionEvents
)
-- Explanation: This CTE computes the elapsed time between events in seconds.

-- Step 9: Summarize time and counts for events occurring on designated URLs
, TimeOnDesignatedURLs AS (
    SELECT
        \"SESSION_ID_USER_ID\",
        SUM(CASE 
            WHEN \"IS_DESIGNATED_URL\" = 1 THEN COALESCE(\"TIME_BETWEEN_EVENTS_SECONDS\", 0)
            ELSE 0
        END) AS \"TOTAL_TIME_ON_DESIGNATED_URLS_SECONDS\",
        COUNT(CASE 
            WHEN \"IS_DESIGNATED_URL\" = 1 THEN 1 
            ELSE NULL 
        END) AS \"EVENTS_ON_DESIGNATED_URLS\",
        COUNT(DISTINCT CASE 
            WHEN \"IS_DESIGNATED_URL\" = 1 THEN \"CLEANED_PAGE_LOCATION\"
            ELSE NULL 
        END) AS \"UNIQUE_PAGES_ON_DESIGNATED_URLS\"
    FROM TimeBetweenEvents
    GROUP BY \"SESSION_ID_USER_ID\"
)
-- Explanation: This CTE aggregates the total time (and counts) spent on designated (example) URLs per session.

-- Step 10: Compute overall session statistics such as duration and bounce rate
, AllSessionStats AS (
    SELECT
        \"SESSION_ID_USER_ID\",
        COUNT(\"EVENT_NAME\") AS \"ALL_EVENT_COUNT\",
        COUNT(DISTINCT \"EVENT_PARAMS_PAGE_LOCATION\") AS \"ALL_PAGE_COUNT\",
        MIN(\"EVENT_TIMESTAMP\") AS \"FIRST_EVENT_TIMESTAMP\",
        MAX(\"EVENT_TIMESTAMP\") AS \"LAST_EVENT_TIMESTAMP\",
        DATEDIFF('second', MIN(\"EVENT_TIMESTAMP\"), MAX(\"EVENT_TIMESTAMP\")) / 60.0 AS \"ALL_SESSION_DURATION_MINUTES\",
        -- Define a bounce: a single event on one page in under 10 seconds
        CASE 
            WHEN COUNT(DISTINCT \"EVENT_PARAMS_PAGE_LOCATION\") = 1 
                 AND COUNT(\"EVENT_NAME\") = 1 
                 AND DATEDIFF('second', MIN(\"EVENT_TIMESTAMP\"), MAX(\"EVENT_TIMESTAMP\")) < 10 THEN 'Yes'
            ELSE 'No'
        END AS \"BOUNCE_INDICATOR\",
        -- Categorize session length based on duration
        CASE 
            WHEN DATEDIFF('second', MIN(\"EVENT_TIMESTAMP\"), MAX(\"EVENT_TIMESTAMP\")) < 300 THEN 'Short' 
            WHEN DATEDIFF('second', MIN(\"EVENT_TIMESTAMP\"), MAX(\"EVENT_TIMESTAMP\")) < 900 THEN 'Medium'
            ELSE 'Long' 
        END AS \"SESSION_LENGTH_CATEGORY\"
    FROM AllSessionEvents
    GROUP BY \"SESSION_ID_USER_ID\"
)
-- Explanation: This CTE computes overall metrics per session including total events, duration (in minutes), bounce rate, and length category.

-- Final Output: Join all aggregated metrics to provide a comprehensive session-level report
SELECT
    ASE.\"SESSION_ID_USER_ID\",
    ASE.\"TENANTID\",
    ASE.\"TENANT_USER_ID\",
    ASE.\"USER_ID\",
    ASE.\"SESSION_DATE\",
    USO.\"DAYS_BETWEEN_SESSIONS\",
    USC.\"SESSIONS_LAST_60_DAYS\",
    ASE.\"GEO_CITY\",
    ASE.\"GEO_COUNTRY\",
    ASE.\"GEO_METRO\",
    ASE.\"GEO_REGION\",
    ASE.\"DEVICE_CATEGORY\",
    ASE.\"DEVICE_OPERATING_SYSTEM\",
    ASE.\"DEVICE_WEB_INFO_BROWSER\",
    ASE.\"STARTING_BROWSER\",
    ASE.\"ENDING_BROWSER\",
    ASE.\"SWITCHED_BROWSER\",
    ASE.\"MAX_VIEWPORT\",
    ASE.\"MAX_ZOOM_PERCENTAGE\",
    ASE.\"MAX_ZOOM_PERCENTAGE_PIXELRATIO\",
    ASE.\"USER_TYPE\",
    ASE.\"CHURN_PROBABILITY\",
    ASE.\"ALL_SESSION_EVENT_NAMES\",
    ASE.\"ALL_SESSION_EVENT_URLS\",
    TD.\"EVENTS_ON_DESIGNATED_URLS\" AS \"TOTAL_EVENTS_ON_DESIGNATED_URLS\",
    ASE.\"TOTAL_EVENTS_IN_SESSION\",
    ASE.\"TOTAL_UNIQUE_PAGES_IN_SESSION\",
    TD.\"UNIQUE_PAGES_ON_DESIGNATED_URLS\" AS \"TOTAL_UNIQUE_PAGES_ON_DESIGNATED_URLS\",
    ASSTATS.\"ALL_SESSION_DURATION_MINUTES\",
    ASSTATS.\"BOUNCE_INDICATOR\",
    ASSTATS.\"SESSION_LENGTH_CATEGORY\",
    CASE 
        WHEN ASSTATS.\"ALL_SESSION_DURATION_MINUTES\" > 0 
        THEN ROUND(ASSTATS.\"ALL_EVENT_COUNT\" / ASSTATS.\"ALL_SESSION_DURATION_MINUTES\", 2)
        ELSE 0
    END AS \"CLICKS_PER_MINUTE_ALL_SESSION\",
    CASE 
        WHEN ASSTATS.\"ALL_SESSION_DURATION_MINUTES\" > 0 
        THEN ROUND(ASSTATS.\"ALL_PAGE_COUNT\" / ASSTATS.\"ALL_SESSION_DURATION_MINUTES\", 2)
        ELSE 0
    END AS \"PAGES_PER_MINUTE_ALL_SESSION\",
    -- Percentage of designated URL events relative to all session events
    CASE 
        WHEN ASSTATS.\"ALL_EVENT_COUNT\" > 0 
        THEN ROUND((TD.\"EVENTS_ON_DESIGNATED_URLS\"::FLOAT / ASSTATS.\"ALL_EVENT_COUNT\") * 100, 2)
        ELSE 0
    END AS \"PERCENTAGE_DESIGNATED_IN_ALL\",
    -- Convert total time on designated URLs from seconds to minutes
    COALESCE(TD.\"TOTAL_TIME_ON_DESIGNATED_URLS_SECONDS\", 0) / 60.0 AS \"TOTAL_TIME_ON_DESIGNATED_URLS_MINUTES\",
    CASE 
        WHEN COALESCE(TD.\"TOTAL_TIME_ON_DESIGNATED_URLS_SECONDS\", 0) > 0 
        THEN ROUND(TD.\"EVENTS_ON_DESIGNATED_URLS\" / (TD.\"TOTAL_TIME_ON_DESIGNATED_URLS_SECONDS\" / 60.0), 2)
        ELSE 0
    END AS \"EVENTS_PER_MINUTE_DESIGNATED_URLS\",
    CASE 
        WHEN COALESCE(TD.\"TOTAL_TIME_ON_DESIGNATED_URLS_SECONDS\", 0) > 0 
        THEN ROUND(TD.\"UNIQUE_PAGES_ON_DESIGNATED_URLS\" / (TD.\"TOTAL_TIME_ON_DESIGNATED_URLS_SECONDS\" / 60.0), 2)
        ELSE 0
    END AS \"UNIQUE_PAGES_PER_MINUTE_DESIGNATED_URLS\",
    -- Engagement Score for the overall session: a weighted combination of events, unique pages, and duration factors
    CASE 
        WHEN ASSTATS.\"ALL_SESSION_DURATION_MINUTES\" > 0 
        THEN (ASE.\"TOTAL_EVENTS_IN_SESSION\" * 0.4 
              + ASE.\"TOTAL_UNIQUE_PAGES_IN_SESSION\" * 0.4 
              + (CASE WHEN ASSTATS.\"ALL_SESSION_DURATION_MINUTES\" < 10 THEN 0.5 ELSE 1 END) * 0.2)
        ELSE 0 
    END AS \"ENGAGEMENT_SCORE_ALL_SESSION\",
    -- Engagement Score for designated URL events
    CASE 
        WHEN COALESCE(TD.\"TOTAL_TIME_ON_DESIGNATED_URLS_SECONDS\", 0) > 0 
        THEN (TD.\"EVENTS_ON_DESIGNATED_URLS\" * 0.4 
              + TD.\"UNIQUE_PAGES_ON_DESIGNATED_URLS\" * 0.4 
              + (CASE WHEN (TD.\"TOTAL_TIME_ON_DESIGNATED_URLS_SECONDS\" / 60.0) < 10 THEN 0.5 ELSE 1 END) * 0.2)
        ELSE 0 
    END AS \"ENGAGEMENT_SCORE_DESIGNATED_URLS\",
    -- New: Session Engagement Category for overall session
    CASE
        WHEN 
            (CASE 
                WHEN ASSTATS.\"ALL_SESSION_DURATION_MINUTES\" > 0 
                THEN (ASE.\"TOTAL_EVENTS_IN_SESSION\" * 0.4 
                      + ASE.\"TOTAL_UNIQUE_PAGES_IN_SESSION\" * 0.4 
                      + (CASE WHEN ASSTATS.\"ALL_SESSION_DURATION_MINUTES\" < 10 THEN 0.5 ELSE 1 END) * 0.2)
                ELSE 0 
             END) < 15 THEN 'Low'
        WHEN 
            (CASE 
                WHEN ASSTATS.\"ALL_SESSION_DURATION_MINUTES\" > 0 
                THEN (ASE.\"TOTAL_EVENTS_IN_SESSION\" * 0.4 
                      + ASE.\"TOTAL_UNIQUE_PAGES_IN_SESSION\" * 0.4 
                      + (CASE WHEN ASSTATS.\"ALL_SESSION_DURATION_MINUTES\" < 10 THEN 0.5 ELSE 1 END) * 0.2)
                ELSE 0 
             END) BETWEEN 15 AND 30 THEN 'Medium'
        ELSE 'High'
    END AS \"SESSION_ENGAGEMENT_CATEGORY_ALL\",
    -- New: Session Engagement Category for designated URL events
    CASE
        WHEN 
            (CASE 
                WHEN COALESCE(TD.\"TOTAL_TIME_ON_DESIGNATED_URLS_SECONDS\", 0) > 0 
                THEN (TD.\"EVENTS_ON_DESIGNATED_URLS\" * 0.4 
                      + TD.\"UNIQUE_PAGES_ON_DESIGNATED_URLS\" * 0.4 
                      + (CASE WHEN (TD.\"TOTAL_TIME_ON_DESIGNATED_URLS_SECONDS\" / 60.0) < 10 THEN 0.5 ELSE 1 END) * 0.2)
                ELSE 0 
             END) < 5 THEN 'Low'
        WHEN 
            (CASE 
                WHEN COALESCE(TD.\"TOTAL_TIME_ON_DESIGNATED_URLS_SECONDS\", 0) > 0 
                THEN (TD.\"EVENTS_ON_DESIGNATED_URLS\" * 0.4 
                      + TD.\"UNIQUE_PAGES_ON_DESIGNATED_URLS\" * 0.4 
                      + (CASE WHEN (TD.\"TOTAL_TIME_ON_DESIGNATED_URLS_SECONDS\" / 60.0) < 10 THEN 0.5 ELSE 1 END) * 0.2)
                ELSE 0 
             END) BETWEEN 5 AND 10 THEN 'Medium'
        ELSE 'High'
    END AS \"SESSION_ENGAGEMENT_CATEGORY_DESIGNATED\"
FROM AggregatedSessionEvents ASE
LEFT JOIN TimeOnDesignatedURLs TD ON ASE.\"SESSION_ID_USER_ID\" = TD.\"SESSION_ID_USER_ID\"
LEFT JOIN AllSessionStats ASSTATS ON ASE.\"SESSION_ID_USER_ID\" = ASSTATS.\"SESSION_ID_USER_ID\"
LEFT JOIN UserSessionOrder USO ON ASE.\"SESSION_ID_USER_ID\" = USO.\"SESSION_ID_USER_ID\"
LEFT JOIN UserSessionCounts USC ON ASE.\"TENANT_USER_ID\" = USC.\"TENANT_USER_ID\"
ORDER BY ASE.\"SESSION_ID_USER_ID\";
`,
    },
    sequences: {
      title: "Sequence Analysis",
      icon: <BiCodeAlt className="text-green-500 text-4xl" />,
      description: "Detecting and analyzing user journey flows through critical product features",
      shortDescription: "Analysis of user journey paths, measuring precise timing between steps and identifying workflow bottlenecks.",
      businessValue: "Reveals exactly how users navigate through key workflows, identifying friction points where they abandon tasks. Provides precise timing between steps to spotlight bottlenecks and shows which features commonly lead users into high-value workflows.",
      technicalDetails: "Implements advanced sequence detection using state tracking and window functions. Creates unique sequence identifiers with cumulative sums and calculates precise timing between each step in user journeys.",
      keyPoints: [
        "Maps complete event sequences showing how users progress through workflows",
        "Measures exact timing between steps to identify friction points",
        "Determines which pages lead users into and out of critical features",
        "Calculates sequence completion rates and abandonment patterns",
        "Quantifies sequence complexity through event and page counts"
      ],
      usedIn: "GA Data Dashboard project to optimize user workflow paths and reduce abandonment rates on key features",
      code: `-- ***************************************************************
-- Detecting and Aggregating Sequences of Designated Events
-- This script demonstrates how to:
--   1. Identify the first event per session.
--   2. Filter sessions containing at least one designated URL event.
--   3. Capture all events from those sessions and clean the URL data.
--   4. Detect sequences based on transitions into designated URL events.
--   5. Assign unique sequence IDs using a cumulative sum.
--   6. Calculate time differences between consecutive events within each sequence.
--   7. Determine entry/exit pages for each sequence.
--   8. Aggregate sequence-level statistics.
-- ***************************************************************

-- Step 1: Identify the first event per session using ROW_NUMBER()
WITH FirstEventPerSession AS (
    SELECT
        \"EVENT_PARAMS_GA_SESSION_ID\",    -- Unique session identifier
        \"TENANTID\",
        \"USER_ID\" AS \"FIRST_USER_ID\",     -- First user ID in the session
        \"EVENT_TIMESTAMP\" AS \"FIRST_EVENT_TIMESTAMP\"
    FROM (
        SELECT
            \"EVENT_PARAMS_GA_SESSION_ID\",
            \"TENANTID\",
            \"USER_ID\",
            \"EVENT_TIMESTAMP\",
            ROW_NUMBER() OVER (
                PARTITION BY \"EVENT_PARAMS_GA_SESSION_ID\", \"TENANTID\"
                ORDER BY \"EVENT_TIMESTAMP\"
            ) AS rn  -- Rank events by timestamp within each session/tenant
        FROM \"YOUR_SCHEMA\".\"YOUR_TABLE\"  -- Replace with your actual schema/table
        WHERE \"EVENT_TIMESTAMP\" >= DATEADD(month, -3, CURRENT_DATE)
    ) t
    WHERE rn = 1  -- Keep only the first event per session
),
    
-- Step 2: Identify sessions with at least one designated URL event using the first USER_ID
AllSessions AS (
    SELECT
        F.\"EVENT_PARAMS_GA_SESSION_ID\",
        F.\"TENANTID\",
        F.\"FIRST_USER_ID\",
        -- Create a unique session identifier by concatenating session and tenant/user info,
        -- and removing any dashes for conversion to a number.
        TO_NUMBER(CONCAT(F.\"EVENT_PARAMS_GA_SESSION_ID\", REPLACE(CONCAT(F.\"TENANTID\", F.\"FIRST_USER_ID\"), '-', ''))) AS \"SESSION_ID_USER_ID\",
        COUNT(DISTINCT CASE 
            -- Check if the event URL matches any of the designated patterns (generic example links)
            WHEN E.\"EVENT_PARAMS_PAGE_LOCATION\" ILIKE 'https://example.com/ExampleLink%' THEN 1
            -- Additional conditions could be added here if needed
            ELSE NULL 
        END) AS \"DESIGNATED_URL_COUNT\"
    FROM \"YOUR_SCHEMA\".\"YOUR_TABLE\" E
    INNER JOIN FirstEventPerSession F
        ON E.\"EVENT_PARAMS_GA_SESSION_ID\" = F.\"EVENT_PARAMS_GA_SESSION_ID\"
       AND E.\"TENANTID\" = F.\"TENANTID\"
       AND E.\"USER_ID\" = F.\"FIRST_USER_ID\"  -- Only include events from the first user in the session
    WHERE E.\"EVENT_TIMESTAMP\" >= DATEADD(month, -3, CURRENT_DATE)
    GROUP BY F.\"EVENT_PARAMS_GA_SESSION_ID\", F.\"TENANTID\", F.\"FIRST_USER_ID\"
    HAVING \"DESIGNATED_URL_COUNT\" > 0  -- Only include sessions with at least one designated URL event
),
    
-- Step 3: Capture all events from the sessions that passed the filter (only for the first USER_ID)
AllSessionEvents AS (
    SELECT
        S.\"SESSION_ID_USER_ID\",
        S.\"EVENT_PARAMS_GA_SESSION_ID\",
        E.\"EVENT_NAME\",
        E.\"EVENT_TIMESTAMP\",
        E.\"EVENT_PARAMS_PAGE_LOCATION\",
        -- Clean the page location by removing the base URL and anything after \"?\"
        CASE 
            WHEN E.\"EVENT_PARAMS_PAGE_LOCATION\" ILIKE 'https://example.com/%' THEN 
                REGEXP_REPLACE(
                    SPLIT_PART(REPLACE(E.\"EVENT_PARAMS_PAGE_LOCATION\", 'https://example.com/', ''), '?', 1),
                    '/[0-9]+$', ''
                )
            ELSE 
                REGEXP_REPLACE(
                    SPLIT_PART(E.\"EVENT_PARAMS_PAGE_LOCATION\", '?', 1),
                    '/[0-9]+$', ''
                )
        END AS \"CLEANED_PAGE_LOCATION\",
        -- Flag the event if it is on a designated URL (using our generic example link)
        CASE 
            WHEN E.\"EVENT_PARAMS_PAGE_LOCATION\" ILIKE 'https://example.com/ExampleLink%' THEN 1
            ELSE 0 
        END AS \"IS_DESIGNATED_URL\"
    FROM \"YOUR_SCHEMA\".\"YOUR_TABLE\" E
    INNER JOIN AllSessions S
        ON E.\"EVENT_PARAMS_GA_SESSION_ID\" = S.\"EVENT_PARAMS_GA_SESSION_ID\"
       AND E.\"TENANTID\" = S.\"TENANTID\"
       AND E.\"USER_ID\" = S.\"FIRST_USER_ID\"  -- Limit to events from the first user in the session
    WHERE E.\"EVENT_TIMESTAMP\" >= DATEADD(month, -3, CURRENT_DATE)
),
    
-- Step 4: Detect when a new sequence starts based on designated URL transitions
SequenceDetect AS (
    SELECT
        ASE.\"SESSION_ID_USER_ID\",
        ASE.\"EVENT_PARAMS_GA_SESSION_ID\",
        ASE.\"CLEANED_PAGE_LOCATION\",
        ASE.\"EVENT_TIMESTAMP\",
        ASE.\"IS_DESIGNATED_URL\",
        -- Mark the start of a new sequence:
        -- If the current event is designated and the previous event was not designated, flag as start (1)
        CASE 
            WHEN \"IS_DESIGNATED_URL\" = 1 
                 AND LAG(\"IS_DESIGNATED_URL\") OVER (PARTITION BY ASE.\"SESSION_ID_USER_ID\" ORDER BY ASE.\"EVENT_TIMESTAMP\") = 0 
            THEN 1 
            ELSE 0 
        END AS \"SEQUENCE_START\"
    FROM AllSessionEvents ASE
),
    
-- Step 5: Assign a unique sequence ID for each sequence using a cumulative sum
SequenceIDAssign AS (
    SELECT 
        SD.\"SESSION_ID_USER_ID\",
        SD.\"EVENT_PARAMS_GA_SESSION_ID\",
        SD.\"CLEANED_PAGE_LOCATION\",
        SD.\"EVENT_TIMESTAMP\",
        SD.\"IS_DESIGNATED_URL\",
        SD.\"SEQUENCE_START\",
        -- The cumulative sum of sequence starts assigns a unique sequence number within each session
        SUM(SD.\"SEQUENCE_START\") OVER (PARTITION BY SD.\"SESSION_ID_USER_ID\" ORDER BY SD.\"EVENT_TIMESTAMP\") AS \"SEQUENCE_ID\"
    FROM SequenceDetect SD
),
    
-- Step 6: Calculate the time difference between consecutive events within each sequence
TimeBetweenEvents AS (
    SELECT
        \"SESSION_ID_USER_ID\",
        \"EVENT_PARAMS_GA_SESSION_ID\",
        \"SEQUENCE_ID\",
        \"CLEANED_PAGE_LOCATION\",
        \"IS_DESIGNATED_URL\",
        \"EVENT_TIMESTAMP\",
        -- Calculate time in seconds between the current event and the previous event in the same sequence
        DATEDIFF(
            'second', 
            LAG(\"EVENT_TIMESTAMP\") OVER (PARTITION BY \"SESSION_ID_USER_ID\", \"SEQUENCE_ID\" ORDER BY \"EVENT_TIMESTAMP\"), 
            \"EVENT_TIMESTAMP\"
        ) AS \"TIME_BETWEEN_EVENTS_SECONDS\"
    FROM SequenceIDAssign
),
    
-- Step 7: Add entry and exit points for each sequence using LAG/LEAD functions
SequenceEntryExit AS (
    SELECT 
        \"SESSION_ID_USER_ID\",
        \"EVENT_PARAMS_GA_SESSION_ID\",
        \"SEQUENCE_ID\",
        \"CLEANED_PAGE_LOCATION\",
        \"IS_DESIGNATED_URL\",
        \"EVENT_TIMESTAMP\",
        -- Get the last non-designated page before the current event (if any)
        LAG(CASE WHEN \"IS_DESIGNATED_URL\" = 0 THEN \"CLEANED_PAGE_LOCATION\" ELSE NULL END)
            OVER (PARTITION BY \"SESSION_ID_USER_ID\" ORDER BY \"EVENT_TIMESTAMP\") AS \"LAST_NON_DESIGNATED_BEFORE\",
        -- Get the first non-designated page after the current event (if any)
        LEAD(CASE WHEN \"IS_DESIGNATED_URL\" = 0 THEN \"CLEANED_PAGE_LOCATION\" ELSE NULL END)
            OVER (PARTITION BY \"SESSION_ID_USER_ID\" ORDER BY \"EVENT_TIMESTAMP\") AS \"FIRST_NON_DESIGNATED_AFTER\"
    FROM TimeBetweenEvents
),
    
-- Step 8: Aggregate sequence-level statistics and add entry/exit pages
SequencesSplit AS (
    SELECT
        SE.\"SESSION_ID_USER_ID\",
        SE.\"EVENT_PARAMS_GA_SESSION_ID\",
        SE.\"SEQUENCE_ID\",
        -- Concatenate the cleaned URLs in order of the sequence
        LISTAGG(SE.\"CLEANED_PAGE_LOCATION\", ' > ') WITHIN GROUP (ORDER BY SE.\"EVENT_TIMESTAMP\") AS \"SEQUENCE_URLS\",
        MIN(SE.\"EVENT_TIMESTAMP\") AS \"SEQUENCE_START_TIMESTAMP\",
        MAX(SE.\"EVENT_TIMESTAMP\") AS \"SEQUENCE_END_TIMESTAMP\",
        -- Calculate the duration of the sequence in seconds
        DATEDIFF('second', MIN(SE.\"EVENT_TIMESTAMP\"), MAX(SE.\"EVENT_TIMESTAMP\")) AS \"SEQUENCE_DURATION_SECONDS\",
        COUNT(SE.\"CLEANED_PAGE_LOCATION\") AS \"SEQUENCE_EVENT_COUNT\",
        COUNT(DISTINCT SE.\"CLEANED_PAGE_LOCATION\") AS \"SEQUENCE_UNIQUE_PAGES\",
        MIN(SE.\"LAST_NON_DESIGNATED_BEFORE\") AS \"LAST_NON_DESIGNATED_BEFORE\",
        MAX(SE.\"FIRST_NON_DESIGNATED_AFTER\") AS \"FIRST_NON_DESIGNATED_AFTER\"
    FROM SequenceEntryExit SE
    -- Only consider sequences within designated URL events
    WHERE SE.\"IS_DESIGNATED_URL\" = 1
    GROUP BY SE.\"SESSION_ID_USER_ID\", SE.\"EVENT_PARAMS_GA_SESSION_ID\", SE.\"SEQUENCE_ID\"
)
    
-- Final output: Return individual sequences and their aggregated metrics
SELECT
    \"SESSION_ID_USER_ID\",
    \"EVENT_PARAMS_GA_SESSION_ID\",
    \"SEQUENCE_ID\",
    \"SEQUENCE_URLS\",                          -- The ordered list of designated URL paths in the sequence
    \"SEQUENCE_DURATION_SECONDS\" / 60.0 AS \"SEQUENCE_DURATION_MINUTES\",  -- Convert duration to minutes
    \"SEQUENCE_EVENT_COUNT\" AS \"EVENTS_IN_SEQUENCE\",       -- Total number of events in the sequence
    \"SEQUENCE_UNIQUE_PAGES\" AS \"UNIQUE_PAGES_IN_SEQUENCE\",  -- Number of unique pages in the sequence
    \"LAST_NON_DESIGNATED_BEFORE\",             -- Last non-designated page before the sequence started
    \"FIRST_NON_DESIGNATED_AFTER\"              -- First non-designated page after the sequence ended
FROM SequencesSplit
ORDER BY \"SESSION_ID_USER_ID\", \"SEQUENCE_ID\";
`,
    },
    events: {
      title: "Events Analysis",
      icon: <BiLayer className="text-purple-500 text-4xl" />,
      description: "Micro-level tracking and categorization of individual user interactions",
      shortDescription: "Granular tracking of individual user interactions, capturing click details and mapping to a business taxonomy.",
      businessValue: "Provides granular insights into exactly which elements users interact with, supporting detailed UI/UX improvements. Enables precise A/B testing measurement and helps prioritize enhancements based on actual usage patterns rather than assumptions.",
      technicalDetails: "Uses multi-level categorization system to transform raw event data into business-meaningful dimensions. Features specialized parameter extraction for different event types (e.g., clicks, views) to capture full interaction context.",
      keyPoints: [
        "Transforms cryptic URLs into business-meaningful page names and sections",
        "Extracts detailed metadata from click events including text and location",
        "Maps each interaction to a hierarchical business taxonomy",
        "Enables drill-down analysis from application sections to specific elements",
        "Creates clean, standardized event data ready for visualization tools"
      ],
      usedIn: "GA Data project to create heatmaps of user interactions and identify under-utilized features that needed redesign or promotion",
      code: `-- ***************************************************************
-- Portfolio Example: Event-Level Data Aggregation & Mapping
-- This script demonstrates how to:
--   1. Identify the first event per session.
--   2. Filter sessions that contain at least one designated URL event.
--   3. Clean and map URL data to human-readable page names and sections.
--   4. Extract additional parameters for specific events (e.g., internal clicks).
-- ***************************************************************

-- Step 1: Identify the first USER_ID per session using ROW_NUMBER()
WITH FirstEventPerSession AS (
    SELECT
        \"EVENT_PARAMS_GA_SESSION_ID\",    -- Unique session identifier
        \"TENANTID\",
        \"USER_ID\" AS \"FIRST_USER_ID\",     -- Capture the first user in the session
        \"EVENT_TIMESTAMP\" AS \"FIRST_EVENT_TIMESTAMP\"
    FROM (
        SELECT
            \"EVENT_PARAMS_GA_SESSION_ID\",
            \"TENANTID\",
            \"USER_ID\",
            \"EVENT_TIMESTAMP\",
            ROW_NUMBER() OVER (
                PARTITION BY \"EVENT_PARAMS_GA_SESSION_ID\", \"TENANTID\"
                ORDER BY \"EVENT_TIMESTAMP\"
            ) AS rn  -- Rank events within each session by timestamp
        FROM \"YOUR_SCHEMA\".\"YOUR_TABLE\"  -- Replace with your actual schema/table
        WHERE \"EVENT_TIMESTAMP\" >= DATEADD(month, -3, CURRENT_DATE)
    ) t
    WHERE rn = 1  -- Keep only the first event per session
),
-- Explanation: This CTE extracts the first event per session based on the event timestamp.

-- Step 2: Identify sessions with at least one designated URL event
AllSessions AS (
    SELECT
        F.\"EVENT_PARAMS_GA_SESSION_ID\",
        F.\"TENANTID\",
        F.\"FIRST_USER_ID\",
        -- Create a unique session identifier by combining session and tenant/user information,
        -- while removing any dashes to facilitate conversion to a number.
        TO_NUMBER(CONCAT(F.\"EVENT_PARAMS_GA_SESSION_ID\", REPLACE(CONCAT(F.\"TENANTID\", F.\"FIRST_USER_ID\"), '-', ''))) AS \"SESSION_ID_USER_ID\",
        COUNT(DISTINCT CASE 
            -- Check if the event URL matches a designated pattern (using a generic example link)
            WHEN E.\"EVENT_PARAMS_PAGE_LOCATION\" ILIKE 'https://example.com/ExampleLink%' THEN 1
            ELSE NULL
        END) AS \"DESIGNATED_URL_COUNT\"
    FROM \"YOUR_SCHEMA\".\"YOUR_TABLE\" E
    INNER JOIN FirstEventPerSession F
      ON E.\"EVENT_PARAMS_GA_SESSION_ID\" = F.\"EVENT_PARAMS_GA_SESSION_ID\"
     AND E.\"TENANTID\" = F.\"TENANTID\"
     AND E.\"USER_ID\" = F.\"FIRST_USER_ID\"  -- Only include events from the first user in the session
    WHERE E.\"EVENT_TIMESTAMP\" >= DATEADD(month, -3, CURRENT_DATE)
    GROUP BY F.\"EVENT_PARAMS_GA_SESSION_ID\", F.\"TENANTID\", F.\"FIRST_USER_ID\"
    HAVING \"DESIGNATED_URL_COUNT\" > 0  -- Retain only sessions with at least one designated URL
),
-- Explanation: This CTE filters sessions to include only those that feature at least one designated URL event.

-- Step 3: Capture all events from the filtered sessions and map URL details
AllSessionEvents AS (
    SELECT
        S.\"SESSION_ID_USER_ID\",
        E.\"EVENT_TIMESTAMP\",
        E.\"EVENT_NAME\",
        -- Clean the page location by removing the base URL and any trailing numeric IDs.
        CASE 
            WHEN E.\"EVENT_PARAMS_PAGE_LOCATION\" ILIKE 'https://example.com/%' THEN 
                REGEXP_REPLACE(
                    SPLIT_PART(REPLACE(E.\"EVENT_PARAMS_PAGE_LOCATION\", 'https://example.com/', ''), '?', 1),
                    '/[0-9]+$', ''
                )
            ELSE 
                REGEXP_REPLACE(
                    SPLIT_PART(E.\"EVENT_PARAMS_PAGE_LOCATION\", '?', 1),
                    '/[0-9]+$', ''
                )
        END AS \"CLEANED_PAGE_LOCATION\",
        -- Map the URL to a human-readable Page Name based on generic example patterns
        CASE 
            WHEN E.\"EVENT_PARAMS_PAGE_LOCATION\" ILIKE 'https://example.com/contacts%' THEN 'Contacts'
            WHEN E.\"EVENT_PARAMS_PAGE_LOCATION\" ILIKE 'https://example.com/overview%' THEN 'Overview'
            WHEN E.\"EVENT_PARAMS_PAGE_LOCATION\" ILIKE 'https://example.com/household%' THEN 'Household'
            WHEN E.\"EVENT_PARAMS_PAGE_LOCATION\" ILIKE 'https://example.com/people%' THEN 'People'
            WHEN E.\"EVENT_PARAMS_PAGE_LOCATION\" ILIKE 'https://example.com/activities%' THEN 'Activities'
            WHEN E.\"EVENT_PARAMS_PAGE_LOCATION\" ILIKE 'https://example.com/workflows%' THEN 'Workflows'
            ELSE 'Other'
        END AS \"Page_Name\",
        -- Map the URL to a Section using similar generic patterns
        CASE
            WHEN E.\"EVENT_PARAMS_PAGE_LOCATION\" ILIKE 'https://example.com/contacts%' THEN 'Contacts'
            WHEN E.\"EVENT_PARAMS_PAGE_LOCATION\" ILIKE 'https://example.com/overview%' THEN 'Overview'
            WHEN E.\"EVENT_PARAMS_PAGE_LOCATION\" ILIKE 'https://example.com/household%' THEN 'Household'
            WHEN E.\"EVENT_PARAMS_PAGE_LOCATION\" ILIKE 'https://example.com/people%' THEN 'People'
            WHEN E.\"EVENT_PARAMS_PAGE_LOCATION\" ILIKE 'https://example.com/activities%' THEN 'Activities'
            WHEN E.\"EVENT_PARAMS_PAGE_LOCATION\" ILIKE 'https://example.com/workflows%' THEN 'Workflows'
            ELSE 'Other'
        END AS \"Section\",
        -- For \"click_internal\" events, extract additional event-specific parameters
        CASE 
            WHEN E.\"EVENT_NAME\" = 'click_internal' THEN E.\"EVENT_PARAMS_CUSTOM_EVENT_LOCATION\"
            ELSE NULL
        END AS \"1_EVENT_LOCATION\",
        CASE 
            WHEN E.\"EVENT_NAME\" = 'click_internal' THEN E.\"EVENT_PARAMS_CUSTOM_EVENT_TYPE\"
            ELSE NULL
        END AS \"2_EVENT_TYPE\",
        CASE 
            WHEN E.\"EVENT_NAME\" = 'click_internal' THEN E.\"EVENT_PARAMS_LINK_TEXT\"
            ELSE NULL
        END AS \"3_LINK_TEXT\"
    FROM \"YOUR_SCHEMA\".\"YOUR_TABLE\" E
    INNER JOIN AllSessions S
      ON E.\"EVENT_PARAMS_GA_SESSION_ID\" = S.\"EVENT_PARAMS_GA_SESSION_ID\"
     AND E.\"TENANTID\" = S.\"TENANTID\"
     AND E.\"USER_ID\" = S.\"FIRST_USER_ID\"  -- Only include events from the first user in the session
    WHERE E.\"EVENT_TIMESTAMP\" >= DATEADD(month, -3, CURRENT_DATE)
)
-- Explanation: This CTE collects event-level data from the filtered sessions,
-- cleans the URLs, maps them to page names/sections, and extracts parameters for specific events.

-- Final Output: Return the mapped events along with event-specific details
SELECT
    \"SESSION_ID_USER_ID\",
    \"EVENT_TIMESTAMP\",
    \"EVENT_NAME\",
    \"CLEANED_PAGE_LOCATION\",
    \"Page_Name\",
    \"Section\",
    \"1_EVENT_LOCATION\",  -- Location parameter for click_internal events
    \"2_EVENT_TYPE\",      -- Type parameter for click_internal events
    \"3_LINK_TEXT\"        -- Link text for click_internal events
FROM AllSessionEvents
ORDER BY \"SESSION_ID_USER_ID\", \"EVENT_TIMESTAMP\" ASC;
`,
    }
  };
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

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
        if (contentSections.find(s => s.id === highestVisibleSection)) {
          setActiveSection(highestVisibleSection);
        }
      }
    };

    observer = new IntersectionObserver(observerCallback, options);
    
    Object.values(sectionRefs).forEach(ref => {
      if (ref.current && contentSections.some(s => s.id === ref.current.id)) { // Ensure only main sections are observed
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach(ref => {
        if (ref.current && contentSections.some(s => s.id === ref.current.id)) {
          observer.unobserve(ref.current);
        }
      });
      observer.disconnect();
    };
  }, []); // Empty dependency array for mount/unmount only

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
        {/* Overview Section */}
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
              <h1 className="text-3xl font-bold mb-4 text-blue-600">SQL for Analytics & User Events</h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Collection of SQL scripts developed for the Snowflake Data Cloud to analyze Google Analytics events, 
                user sequences, and session engagement for data-driven product improvements.
              </p>
              <div className="mt-4 flex items-center justify-center gap-4">
                <Link 
                  href="/projects/ga_data"
                  className="text-blue-600 hover:underline flex items-center"
                >
                  See how these scripts were used in the GA Data project <FaArrowRight className="ml-2" />
                </Link>
                <div className="flex items-center text-gray-500">
                  <FaSnowflake className="mr-2" />
                  <span className="text-sm">Implemented in Snowflake SQL</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
            >
              {/* Session Analysis Card */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-blue-100">
                <div className="flex items-center mb-4">
                  {sqlExamples.sessions.icon}
                  <h3 className="text-xl font-bold ml-3 text-blue-700">Session Analysis</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  {sqlExamples.sessions.shortDescription}
                </p>
                <button
                  onClick={() => {
                    handleTabChange("sessions");
                    scrollToSection("analysis");
                  }}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center transition-colors"
                >
                  View details <FaArrowRight className="ml-1" />
                </button>
              </div>
              
              {/* Sequence Analysis Card */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-green-100">
                <div className="flex items-center mb-4">
                  {sqlExamples.sequences.icon}
                  <h3 className="text-xl font-bold ml-3 text-green-700">Sequence Analysis</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  {sqlExamples.sequences.shortDescription}
                </p>
                <button
                  onClick={() => {
                    handleTabChange("sequences");
                    scrollToSection("analysis");
                  }}
                  className="text-green-600 hover:text-green-800 font-medium text-sm flex items-center transition-colors"
                >
                  View details <FaArrowRight className="ml-1" />
                </button>
              </div>
              
              {/* Events Analysis Card */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-purple-100">
                <div className="flex items-center mb-4">
                  {sqlExamples.events.icon}
                  <h3 className="text-xl font-bold ml-3 text-purple-700">Events Analysis</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  {sqlExamples.events.shortDescription}
                </p>
                <button
                  onClick={() => {
                    handleTabChange("events");
                    scrollToSection("analysis");
                  }}
                  className="text-purple-600 hover:text-purple-800 font-medium text-sm flex items-center transition-colors"
                >
                  View details <FaArrowRight className="ml-1" />
                </button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-16 bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-xl shadow-sm"
            >
              <h2 className="text-2xl font-bold mb-6 text-center">Analytics Stack</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-indigo-700 mb-2">Data Collection</h3>
                  <p className="text-gray-600 text-sm">Google Analytics events and custom tracking solutions providing detailed user interaction data with millisecond precision.</p>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-indigo-700 mb-2">Processing Framework</h3>
                  <p className="text-gray-600 text-sm">Snowflake SQL environment with comprehensive ETL processes to transform raw events into business-meaningful metrics.</p>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-indigo-700 mb-2">Dashboard Delivery</h3>
                  <p className="text-gray-600 text-sm">Interactive visualization dashboards connecting directly to the analytics database, providing real-time insights for product decisions.</p>
                </div>
              </div>
            </motion.div>
          </div>
          <DownArrowPrompt onClick={() => scrollToSection("analysis")} />
        </section>
        
        {/* Analysis Section */}
        <section
          ref={sectionRefs.analysis}
          id="analysis"
          className="xl:snap-start xl:min-h-screen flex flex-col justify-center items-center py-16 px-4 xl:py-10 xl:px-8 bg-gray-50 relative"
        >
          <div className="w-full xl:max-w-6xl mx-auto">
            <motion.h2
              className="text-3xl font-bold text-center mb-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              SQL Analytics Details
            </motion.h2>
            
            <motion.div
              className="mb-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="border-b border-gray-200">
                  <div className="flex">
                    <button
                      onClick={() => handleTabChange("sessions")}
                      className={`py-3 px-6 font-medium transition-colors ${
                        activeTab === "sessions"
                          ? "text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50"
                          : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      Session Analysis
                    </button>
                    <button
                      onClick={() => handleTabChange("sequences")}
                      className={`py-3 px-6 font-medium transition-colors ${
                        activeTab === "sequences"
                          ? "text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50"
                          : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      Sequence Analysis
                    </button>
                    <button
                      onClick={() => handleTabChange("events")}
                      className={`py-3 px-6 font-medium transition-colors ${
                        activeTab === "events"
                          ? "text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50"
                          : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      Events Analysis
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="bg-white rounded-lg shadow overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="p-4 xl:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 xl:gap-8 mb-8">
                  {/* Left Column: Business Value */}
                  <div className="bg-white p-4 xl:p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center mb-4">
                      <FaChartLine className="text-blue-500 text-xl mr-3" />
                      <h3 className="text-lg font-semibold">Business Value</h3>
                    </div>
                    <p className="text-sm xl:text-base text-gray-700">{sqlExamples[activeTab].businessValue}</p>
                    
                    <div className="mt-6 flex items-center">
                      <FaLightbulb className="text-yellow-500 text-xl mr-3" />
                      <h3 className="text-lg font-semibold">Used In</h3>
                    </div>
                    <p className="text-sm xl:text-base text-gray-700">{sqlExamples[activeTab].usedIn}</p>
                  </div>
                  
                  {/* Middle Column: Key Capabilities */}
                  <div className="bg-white p-4 xl:p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center mb-4">
                      <FaCode className="text-green-500 text-xl mr-3" />
                      <h3 className="text-lg font-semibold">Key Capabilities</h3>
                    </div>
                    <ul className="list-disc pl-5 text-sm xl:text-base text-gray-700 space-y-2">
                      {sqlExamples[activeTab].keyPoints.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Right Column: Description & More Context */}
                  <div className="bg-white p-4 xl:p-6 rounded-lg shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold mb-4">{sqlExamples[activeTab].title}</h2>
                    <p className="text-sm xl:text-base text-gray-700 mb-4">{sqlExamples[activeTab].description}</p>
                    
                    <div className="mt-4 bg-gray-50 p-4 rounded border border-gray-200">
                      <h4 className="text-xs xl:text-sm font-medium text-gray-500 uppercase mb-2">For Non-Technical Audiences</h4>
                      <p className="text-xs xl:text-sm text-gray-700">
                        These SQL scripts transform complex digital footprints into actionable business insights. They answer questions like "Which features are most engaging?", "Where do users get stuck in workflows?", and "How do different user segments interact with our product?". The analysis helps prioritize improvements based on real user behavior rather than assumptions.
                      </p>
                    </div>
                    
                    <div className="mt-4 bg-gray-50 p-4 rounded border border-gray-200">
                      <h4 className="text-xs xl:text-sm font-medium text-gray-500 uppercase mb-2">For Technical Audiences</h4>
                      <p className="text-xs xl:text-sm text-gray-700">
                        This analytical framework uses Common Table Expressions (CTEs) for modular processing, with window functions for temporal and state analysis. It implements sophisticated data transformations including sequence detection algorithms, engagement scoring formulas, and hierarchical categorization systems—all optimized for performance with large datasets.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <DownArrowPrompt onClick={() => scrollToSection("code")} />
        </section>
        
        {/* Code Section */}
        <section
          ref={sectionRefs.code}
          id="code"
          className="xl:snap-start xl:min-h-screen flex flex-col justify-center items-center py-16 px-4 xl:py-10 xl:px-8 relative"
        >
          <div className="w-full xl:max-w-6xl mx-auto">
            <motion.h2
              className="text-3xl font-bold text-center mb-6 xl:mb-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              SQL Implementation
            </motion.h2>
            
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="border-b border-gray-200">
                  <div className="flex">
                    <button
                      onClick={() => handleTabChange("sessions")}
                      className={`py-3 px-6 font-medium transition-colors ${
                        activeTab === "sessions"
                          ? "bg-indigo-100 text-indigo-700"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      Session Analysis
                    </button>
                    <button
                      onClick={() => handleTabChange("sequences")}
                      className={`py-3 px-6 font-medium transition-colors ${
                        activeTab === "sequences"
                          ? "bg-indigo-100 text-indigo-700"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      Sequence Analysis
                    </button>
                    <button
                      onClick={() => handleTabChange("events")}
                      className={`py-3 px-6 font-medium transition-colors ${
                        activeTab === "events"
                          ? "bg-indigo-100 text-indigo-700"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      Events Analysis
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-900 rounded-lg overflow-hidden shadow-lg"
            >
              <div className="px-4 py-3 bg-gray-800 text-white flex justify-between items-center">
                <h3 className="font-mono text-sm">{activeTab === "events" ? "GA_Events_Ex.sql" : activeTab === "sequences" ? "GA_Sequences_Ex.sql" : "GA_Sessions_Ex.sql"}</h3>
                <span className="text-xs bg-blue-600 px-2 py-1 rounded">SQL</span>
              </div>
              <div className="p-1 max-h-[460px] overflow-auto">
                <SyntaxHighlighter
                  language="sql"
                  style={atomDark}
                  showLineNumbers={true}
                  wrapLines={true}
                >
                  {sqlExamples[activeTab].code}
                </SyntaxHighlighter>
              </div>
              <div className="px-4 py-3 bg-gray-800 text-gray-400 text-xs">
                Note: This is a simplified excerpt. The full script contains additional logic and optimization.
              </div>
            </motion.div>
            
            {/* Call To Action */}
            <motion.div 
              className="mt-8 p-6 bg-blue-50 border border-blue-100 rounded-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold text-blue-700 mb-2">Want to see how this data powers real insights?</h3>
              <p className="text-gray-600 mb-4">
                Check out the GA Data project where these SQL scripts drive interactive dashboards 
                that helped improve product features and user satisfaction.
              </p>
              <Link
                href="/projects/ga_data"
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                View the GA Data Project
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
} 