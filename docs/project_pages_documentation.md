# Project Pages Documentation

This document outlines the common components, settings, and rules used across the project pages in the UX portfolio.

## Common Components

### 1. ScrollProgress

A horizontal progress bar at the top of the page that shows scrolling progress.

```jsx
function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Updates scroll progress percentage based on page scroll position
  // Uses throttling to improve performance
  
  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50">
      <div 
        className="h-full bg-[color]" 
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
```

**Styling notes:**
- Bar colors vary by project: `bg-blue-500`, `bg-indigo-600`
- Height is consistently `h-1`
- Always has `z-50` to stay above other content

### 2. DownArrowPrompt

An animated down arrow used to prompt users to scroll to the next section.

```jsx
function DownArrowPrompt({ onClick }) {
  return (
    <motion.div
      // Animation settings for subtle bounce effect
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
      onClick={onClick}
    >
      <svg>...</svg>
    </motion.div>
  );
}
```

**Usage:**
- Placed at the bottom of major sections
- The `onClick` handler usually calls `scrollToSection(nextSectionId)`

### 3. ImageGallery

A reusable component for displaying interactive image galleries with features like zooming and panning.

```jsx
function ImageGallery({ images }) {
  // State variables for controlling gallery behavior
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalZoom, setModalZoom] = useState(1);
  const [isPanning, setIsPanning] = useState(false);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [startPanPosition, setStartPanPosition] = useState({ x: 0, y: 0 });
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  
  // Core functions:
  // - nextImage/prevImage: Navigate between images
  // - toggleZoom: Toggle zoom state
  // - zoomIn/zoomOut/resetZoom: Control zoom level
  // - startPan/doPan/endPan: Handle panning when zoomed
  // - openModal/closeModal: Control modal display
  // - onTouchStart/onTouchMove/onTouchEnd: Handle touch interactions
  // - handleKeyDown: Handle keyboard navigation
}
```

**Expected props:**
```jsx
// Image format
images = [
  {
    src: "/path/to/image.jpg",
    alt: "Description of image",
    caption: "Image caption",
    points: [
      "Observation or key point about the image",
      "Analysis point about the image",
      "Insight derived from the image"
    ]
  }
]
```

**Styling notes:**
- Uses a consistent pattern of colored indicators for observations/analysis/insights
- Modal has zoom and pan capabilities for detailed inspection
- Full-width display with rounded corners and border

### 4. bulletIcons

Common icon definitions used across components for visual consistency.

```jsx
const bulletIcons = [
  { icon: <FaEye className="text-blue-500" />, tooltip: "Observation" },
  { icon: <FaChartLine className="text-purple-500" />, tooltip: "Analysis" },
  { icon: <FaLightbulb className="text-amber-500" />, tooltip: "Insight" }
];
```

**Usage:**
- Used in bullet points and as visual indicators across the pages
- Icon colors are coordinated with the overall color scheme of the page

## Page Structure

Each project page follows a consistent structure:

1. **Hero Section**
   - Project title and subtitle
   - Brief overview
   - Down arrow prompt for scrolling

2. **Research Questions / Problem Statement**
   - Clearly defined questions or problem statements
   - Usually displayed in card format with icons

3. **Methods Section**
   - Research methodology
   - Techniques used
   - Often includes visual representations of processes

4. **Findings / Results**
   - Key insights from the project
   - Visual data representations
   - Before/after comparisons when applicable

5. **Visual Assets**
   - Image galleries with annotations
   - Interactive elements for exploration

6. **Conclusion / Impact**
   - Outcomes and impact measurement
   - Lessons learned
   - Next steps when applicable

## Animation Settings

Consistent animation patterns using Framer Motion:

```jsx
// Fade-in animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.2 }}
>
  {content}
</motion.div>

// Staggered list items
<motion.li
  className="flex items-start"
  initial={{ opacity: 0, x: -10 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.3 + (index * 0.1) }}
>
  {content}
</motion.li>
```

## Common Functions

### scrollToSection

Used to smooth scroll to different sections of the page:

```jsx
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
```

### toggleActionPopup

Used to show/hide additional information:

```jsx
const toggleActionPopup = (index) => {
  setActionPopups(prev => {
    const newPopups = [...prev];
    newPopups[index] = !newPopups[index];
    return newPopups;
  });
};
```

## Color Schemes

Each project uses a consistent color palette throughout:

- Primary colors: blues and indigos (`blue-500`, `indigo-600`)
- Secondary accents: ambers, teals, and purples
- Background variations: white, `gray-50`, `gray-100`
- Text colors: `gray-900` (headings), `gray-700`/`gray-600` (body)

## Responsive Design Patterns

- Consistent use of Flexbox and Grid for layouts
- Section heights use `h-screen` for full-screen sections
- Mobile-first approach with responsive breakpoints:
  ```css
  className="grid grid-cols-1 md:grid-cols-2 gap-8"
  ```

## Best Practices

1. **Consistency**: Maintain consistent component structure and function names across pages
2. **Performance**: Use throttling for scroll events
3. **Accessibility**: Include alt text for images and maintain keyboard navigation
4. **Visual Hierarchy**: Follow established patterns for headings, body text, and UI elements
5. **Code Organization**: Group related functions and maintain consistent section comments 