# Project Components Reference

This document provides detailed implementation examples of common components used across all project pages in the UX portfolio.

## Navigation Components

### 1. Sidebar

The `Sidebar` component is imported from `../../components/Sidebar` and used on all project pages.

### 2. ScrollProgress

Used at the top of all project pages to show scroll progress.

**Implementation example:**
```jsx
function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalHeight) * 100;
      setScrollProgress(Math.min(progress, 100)); // Ensure it never exceeds 100%
    };
    
    // Initial calc
    handleScroll();
    
    // Throttle the scroll events
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
        className="h-full bg-blue-500" // Varies by project (blue-500, indigo-600)
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
```

### 3. DownArrowPrompt

Navigation prompt used to guide users to scroll to the next section.

**Implementation example:**
```jsx
function DownArrowPrompt({ onClick }) {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      onClick={onClick}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </motion.div>
  );
}

// Usage:
<DownArrowPrompt onClick={() => scrollToSection("sectionId")} />
```

## Content Components

### 1. ImageGallery

Interactive image gallery with zoom and navigation functionality.

**Full implementation example:**
```jsx
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
  
  // Define bullet point icons for explanations
  const bulletIcons = [
    { 
      icon: <FaEye className="text-blue-500" size={16} />,
      tooltip: "Observation"
    },
    { 
      icon: <FaChartLine className="text-purple-500" size={16} />,
      tooltip: "Analysis"
    },
    { 
      icon: <FaLightbulb className="text-amber-500" size={16} />,
      tooltip: "Insight"
    }
  ];

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
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
    setIsPanning(true);
    setStartPanPosition({
      x: e.clientX || (e.touches && e.touches[0].clientX) || 0,
      y: e.clientY || (e.touches && e.touches[0].clientY) || 0
    });
  };

  const doPan = (e) => {
    if (!isPanning) return;
    
    e.preventDefault();
    
    // Get current mouse/touch position
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    
    // Calculate the distance moved
    const deltaX = clientX - startPanPosition.x;
    const deltaY = clientY - startPanPosition.y;
    
    // Update the pan position
    setPanPosition({
      x: panPosition.x + deltaX,
      y: panPosition.y + deltaY
    });
    
    // Update the start position for the next move
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

  const onTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    setTouchStart(touchDown);
  };

  const onTouchMove = (e) => {
    if (modalZoom > 1) {
      // If zoomed in, handle panning instead of swiping
      doPan(e);
      return;
    }
    
    const touchDown = touchStart;
    
    if (touchDown === null) {
      return;
    }
    
    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;
    
    if (diff > 50) {
      nextImage();
      setTouchStart(null);
    }
    
    if (diff < -50) {
      prevImage();
      setTouchStart(null);
    }
  };

  const onTouchEnd = () => {
    setTouchStart(null);
    setIsPanning(false);
  };

  // Key event handlers
  useEffect(() => {
    if (!modalOpen) return;
    
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          prevImage();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        case 'Escape':
          closeModal(e);
          break;
        case '+':
        case '=':
          zoomIn(e);
          break;
        case '-':
          zoomOut(e);
          break;
        case '0':
          resetZoom(e);
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen]);
  
  // UI rendering implementation...
}
```

**Usage example:**
```jsx
const projectImages = [
  {
    src: "/images/project1/dashboard.png",
    alt: "Dashboard interface",
    caption: "Financial Dashboard Overview",
    points: [
      "UI layout prioritizes key financial metrics",
      "Data visualization helps identify patterns",
      "Custom filters allow for personalized views"
    ]
  },
  // more images...
];

<ImageGallery images={projectImages} />
```

### 2. CircularProcess

Imported from `../../components/CircularProcess` and used to display process steps in a circular format.

**Usage example:**
```jsx
import CircularProcess from "../../components/CircularProcess";

// Later in the component:
<CircularProcess 
  steps={[
    "Research",
    "Analysis",
    "Design",
    "Testing",
    "Implementation"
  ]} 
  activeStep={2} // Optional: highlights current step
/>
```

## Common Icon Sets

### 1. bulletIcons

Used for consistent visual categorization across all project pages.

**Implementation example:**
```jsx
const bulletIcons = [
  { icon: <FaEye className="text-blue-500" />, tooltip: "What this shows" },
  { icon: <FaChartLine className="text-red-500" />, tooltip: "Key data insights" },
  { icon: <FaLightbulb className="text-yellow-500" />, tooltip: "Why this matters" }
];

// Usage:
<div className="flex items-center">
  {bulletIcons[0].icon}
  <span className="ml-2">{pointText}</span>
</div>
```

## Common Functions

### 1. scrollToSection

Used for smooth scrolling between sections.

**Implementation example:**
```jsx
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// Usage:
<button onClick={() => scrollToSection("methods")}>
  See Methods
</button>
```

### 2. toggleActionPopup

Used to toggle informational popups.

**Implementation example:**
```jsx
const [actionPopups, setActionPopups] = useState(Array(items.length).fill(false));

const toggleActionPopup = (index) => {
  setActionPopups(prev => {
    const newPopups = [...prev];
    newPopups[index] = !newPopups[index];
    return newPopups;
  });
};

// Usage:
<div 
  className="cursor-pointer relative" 
  onClick={() => toggleActionPopup(index)}
>
  <div className="p-3">
    Content always visible
  </div>
  
  {actionPopups[index] && (
    <div className="absolute top-0 left-0 w-full h-full bg-white p-3 z-10">
      Popup content visible on click
    </div>
  )}
</div>
```

## Section Structure Template

Each project page typically follows this structure pattern:

```jsx
export default function ProjectPage() {
  // State variables
  const [actionPopups, setActionPopups] = useState([]);
  
  // Section refs for scrolling
  const sectionRefs = {
    overview: useRef(null),
    research_questions: useRef(null),
    methods: useRef(null),
    findings: useRef(null),
    impact: useRef(null)
  };
  
  // Common functions
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const toggleActionPopup = (index) => {
    setActionPopups(prev => {
      const newPopups = [...prev];
      newPopups[index] = !newPopups[index];
      return newPopups;
    });
  };
  
  // Project-specific data
  const projectDetails = {
    title: "Project Title",
    subtitle: "Project Subtitle",
    // other project data...
  };
  
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>{projectDetails.title} | UX Portfolio</title>
        <meta name="description" content={projectDetails.overview} />
      </Head>
      
      <ScrollProgress />
      <Sidebar />
      
      {/* Hero Section */}
      <section
        id="overview"
        ref={sectionRefs.overview}
        className="snap-start h-screen flex flex-col justify-center items-center p-8 relative"
      >
        {/* Hero section content */}
        <DownArrowPrompt onClick={() => scrollToSection("research_questions")} />
      </section>
      
      {/* Research Questions Section */}
      <section
        id="research_questions"
        ref={sectionRefs.research_questions}
        className="snap-start h-screen flex flex-col justify-center items-center p-8 bg-gray-50 relative"
      >
        {/* Research questions content */}
        <DownArrowPrompt onClick={() => scrollToSection("methods")} />
      </section>
      
      {/* Repeat for other sections... */}
      
    </div>
  );
} 