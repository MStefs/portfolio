# Animation Patterns Documentation

This document outlines the common animation patterns used across the UX portfolio project pages using Framer Motion.

## Basic Animation Concepts

All project pages use Framer Motion for animations. The import is typically:

```jsx
import { motion, AnimatePresence } from 'framer-motion';
```

### Common Animation Properties

| Property | Purpose | Example |
|----------|---------|---------|
| `initial` | Starting state of the animation | `initial={{ opacity: 0, y: 20 }}` |
| `animate` | End state of the animation | `animate={{ opacity: 1, y: 0 }}` |
| `transition` | Controls timing, delay, etc. | `transition={{ duration: 0.8, delay: 0.2 }}` |
| `whileHover` | State during hover | `whileHover={{ scale: 1.05 }}` |
| `whileTap` | State during tap/click | `whileTap={{ scale: 0.95 }}` |
| `variants` | Named animation states | `variants={cardVariants}` |

## Section & Component Entrance Animations

### Fade-in with Upward Movement (Section Headers)

Used consistently for section headings across all project pages:

```jsx
<motion.h2
  className="text-3xl font-bold text-gray-900 mb-6 text-center"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  Research Questions
</motion.h2>
```

### Staggered List Item Entrances

Used for lists of items that should appear in sequence:

```jsx
{items.map((item, index) => (
  <motion.div 
    key={index} 
    className="bg-indigo-50 p-3 rounded-lg"
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.3 + (index * 0.1) }}
  >
    {item.content}
  </motion.div>
))}
```

### Card Entrance Animations

Used for major content blocks:

```jsx
<motion.div
  className="bg-white p-6 rounded-lg shadow-sm"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.2 }}
>
  {content}
</motion.div>
```

## Interaction Animations

### Hover Effects

Used to indicate interactive elements:

```jsx
<motion.div
  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
  whileHover={{ 
    y: -5,
    transition: { duration: 0.2 }
  }}
  whileTap={{ 
    y: 0,
    transition: { duration: 0.2 }
  }}
>
  {content}
</motion.div>
```

### Button Hover & Click Effects

Used on action buttons:

```jsx
<motion.button
  className="px-4 py-2 bg-indigo-600 text-white rounded-md"
  whileHover={{ 
    backgroundColor: "#4338ca", // indigo-700
    scale: 1.05 
  }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.2 }}
>
  View Details
</motion.button>
```

### Continuous Animations

Used for elements that should have persistent motion (like the down arrow prompt):

```jsx
<motion.div
  className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ 
    duration: 0.5, 
    repeat: Infinity, 
    repeatType: "reverse" 
  }}
  onClick={onClick}
>
  {/* Arrow SVG */}
</motion.div>
```

## Modal & Popup Animations

### Modal Open/Close

Used for modal dialogs, especially in ImageGallery component:

```jsx
<AnimatePresence>
  {modalOpen && (
    <motion.div
      className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-white rounded-lg p-6 w-11/12 max-w-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {modalContent}
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
```

### Info Popup Animations

Used for contextual information or tooltips:

```jsx
<AnimatePresence>
  {isVisible && (
    <motion.div
      className="absolute top-0 right-0 bg-white shadow-md rounded-md p-3 z-10"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
    >
      {popupContent}
    </motion.div>
  )}
</AnimatePresence>
```

## Animation Variants

Using variants to define reusable animation states:

```jsx
// Define variants outside component
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: { 
      delay: custom * 0.1, 
      duration: 0.5 
    }
  })
};

// Use in component
{items.map((item, i) => (
  <motion.div
    key={i}
    custom={i}
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    className="bg-white p-4 rounded-lg shadow-sm"
  >
    {item.content}
  </motion.div>
))}
```

## Scroll-Linked Animations

Animations that are triggered based on scroll position:

```jsx
function ScrollLinkedAnimation() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
    >
      {content}
    </motion.div>
  );
}
```

## Best Practices

1. **Keep animations subtle** - Avoid excessive or distracting animations. The project pages use subtle animation effects that enhance rather than distract.

2. **Use consistent timing** - Most animations use a duration between 0.3s and 0.8s. Shorter for simple transitions (0.2-0.3s), longer for entrance animations (0.5-0.8s).

3. **Consider accessibility** - All pages offer animations that respect user preferences via the `prefers-reduced-motion` media query:

```jsx
const prefersReducedMotion = typeof window !== 'undefined' 
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
  : false;

// Use in animation settings
transition={{ 
  duration: prefersReducedMotion ? 0 : 0.5
}}
```

4. **Stagger animations** - When animating lists or groups of items, stagger their animations to create a pleasing sequence rather than having everything appear at once.

5. **Use motion.div sparingly** - For performance reasons, only apply motion components to elements that actually need animation. Avoid wrapping entire page sections unnecessarily.

6. **Consistent animation styles** - Use similar animation patterns for similar UI elements for a cohesive feel. Headers and cards consistently use the fade-in-up pattern. 