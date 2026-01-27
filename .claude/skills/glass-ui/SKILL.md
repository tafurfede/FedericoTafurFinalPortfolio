---
name: glass-ui
description: Create stunning glassmorphism interfaces with frosted glass effects, blur, transparency, and depth. Generates React + Tailwind components with dark/light mode support, accessibility compliance, and proper backdrop-filter fallbacks.
license: Complete terms in LICENSE.txt
---

This skill guides creation of glassmorphism UI components—frosted glass effects with blur, transparency, subtle borders, and depth. Implements production-ready React + Tailwind code with accessibility and browser fallbacks.

## Core Glassmorphism Properties

The signature glass effect combines these CSS properties:

```css
.glass {
  background: rgba(255, 255, 255, 0.1);      /* Semi-transparent background */
  backdrop-filter: blur(12px);               /* Frosted glass blur */
  -webkit-backdrop-filter: blur(12px);       /* Safari support */
  border: 1px solid rgba(255, 255, 255, 0.2); /* Subtle light border */
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1); /* Soft depth shadow */
  border-radius: 16px;                       /* Rounded corners */
}
```

## CSS Custom Properties (Required)

Always define glass properties as CSS variables for easy theming:

```css
:root {
  /* Light mode glass */
  --glass-bg: rgba(255, 255, 255, 0.25);
  --glass-border: rgba(255, 255, 255, 0.3);
  --glass-shadow: rgba(0, 0, 0, 0.1);
  --glass-blur: 12px;
  --glass-text: rgba(0, 0, 0, 0.8);
  --glass-text-muted: rgba(0, 0, 0, 0.6);
}

.dark {
  /* Dark mode glass (preferred for glass effects) */
  --glass-bg: rgba(255, 255, 255, 0.08);
  --glass-border: rgba(255, 255, 255, 0.15);
  --glass-shadow: rgba(0, 0, 0, 0.3);
  --glass-blur: 16px;
  --glass-text: rgba(255, 255, 255, 0.9);
  --glass-text-muted: rgba(255, 255, 255, 0.6);
}
```

## Tailwind Configuration

Extend Tailwind with glass utilities:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      backdropBlur: {
        xs: '2px',
        glass: '12px',
        'glass-heavy': '20px',
      },
      backgroundColor: {
        'glass-light': 'rgba(255, 255, 255, 0.25)',
        'glass-dark': 'rgba(255, 255, 255, 0.08)',
        'glass-frost': 'rgba(255, 255, 255, 0.15)',
      },
      borderColor: {
        'glass-light': 'rgba(255, 255, 255, 0.3)',
        'glass-dark': 'rgba(255, 255, 255, 0.15)',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0, 0, 0, 0.1)',
        'glass-dark': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'glass-glow': '0 0 40px rgba(255, 255, 255, 0.1)',
      },
    },
  },
}
```

## Component Patterns

### Glass Card (Base Component)

```tsx
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'light' | 'medium' | 'heavy';
}

const GlassCard = ({ children, className, intensity = 'medium' }: GlassCardProps) => {
  const blurMap = { light: 'backdrop-blur-sm', medium: 'backdrop-blur-glass', heavy: 'backdrop-blur-glass-heavy' };
  const bgMap = { light: 'bg-white/10', medium: 'bg-white/15', heavy: 'bg-white/25' };

  return (
    <div className={`
      ${bgMap[intensity]} ${blurMap[intensity]}
      border border-white/20 rounded-2xl
      shadow-glass
      ${className}
    `}>
      {children}
    </div>
  );
};
```

### Glass Button

```tsx
const GlassButton = ({ children, onClick, variant = 'default' }) => (
  <button
    onClick={onClick}
    className={`
      px-6 py-3 rounded-xl
      bg-white/10 backdrop-blur-glass
      border border-white/20
      text-white font-medium
      transition-all duration-300
      hover:bg-white/20 hover:border-white/30
      hover:shadow-glass-glow
      active:scale-[0.98]
      focus:outline-none focus:ring-2 focus:ring-white/30
    `}
  >
    {children}
  </button>
);
```

### Glass Input

```tsx
const GlassInput = ({ placeholder, ...props }) => (
  <input
    placeholder={placeholder}
    className={`
      w-full px-4 py-3 rounded-xl
      bg-white/5 backdrop-blur-sm
      border border-white/10
      text-white placeholder:text-white/40
      transition-all duration-300
      focus:bg-white/10 focus:border-white/30
      focus:outline-none focus:ring-2 focus:ring-white/20
    `}
    {...props}
  />
);
```

### Glass Modal

```tsx
const GlassModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="
        relative z-10 w-full max-w-lg mx-4
        bg-white/10 backdrop-blur-glass-heavy
        border border-white/20 rounded-3xl
        shadow-glass-dark p-8
      ">
        {children}
      </div>
    </div>
  );
};
```

### Glass Navigation

```tsx
const GlassNav = ({ children }) => (
  <nav className="
    fixed top-4 left-1/2 -translate-x-1/2 z-50
    px-6 py-3 rounded-full
    bg-white/10 backdrop-blur-glass
    border border-white/15
    shadow-glass
  ">
    {children}
  </nav>
);
```

## Background Requirements

**Glass effects require interesting backgrounds to shine.** Never use glass over plain solid colors.

### Recommended Backgrounds:

```tsx
// Gradient mesh background
<div className="bg-gradient-to-br from-purple-900 via-blue-900 to-teal-800">

// Image with overlay
<div className="relative">
  <img src="..." className="absolute inset-0 object-cover" />
  <div className="absolute inset-0 bg-black/30" /> {/* Dim for readability */}
</div>

// Animated gradient
<div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
               animate-gradient-x bg-[length:200%_100%]">

// Noise texture overlay
<div className="relative">
  <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800" />
  <div className="absolute inset-0 opacity-30"
       style={{ backgroundImage: 'url("/noise.svg")' }} />
</div>
```

## Accessibility (CRITICAL)

Glass UI has inherent accessibility challenges. Follow these rules:

### 1. Contrast Requirements (WCAG 2.1)
- **Text**: Minimum 4.5:1 contrast ratio for normal text, 3:1 for large text
- **Interactive elements**: 3:1 contrast against adjacent colors
- **Never rely solely on glass opacity for text backgrounds**

### 2. Safe Text Patterns

```tsx
// BAD - text directly on glass (contrast varies with background)
<div className="bg-white/10 backdrop-blur">
  <p className="text-white/70">Unsafe text</p>
</div>

// GOOD - solid background pill for critical text
<div className="bg-white/10 backdrop-blur">
  <span className="bg-black/40 px-3 py-1 rounded-full text-white">
    Readable text
  </span>
</div>

// GOOD - sufficient text opacity
<div className="bg-white/10 backdrop-blur">
  <p className="text-white font-medium">High contrast text</p>
</div>
```

### 3. Focus States (Required)

```tsx
// Always provide visible focus indicators
className="focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent"
```

### 4. Reduced Motion

```tsx
// Respect user preferences
className="transition-all duration-300 motion-reduce:transition-none"
```

### 5. Test Accessibility
- Use browser DevTools contrast checker
- Test with screen readers
- Verify focus states are visible
- Check against different background images/colors

## Browser Fallbacks

`backdrop-filter` isn't supported in all browsers. Always provide fallbacks:

```tsx
const GlassCard = ({ children }) => (
  <div className="
    bg-slate-800/90                           /* Fallback solid bg */
    supports-[backdrop-filter]:bg-white/10    /* Glass bg when supported */
    supports-[backdrop-filter]:backdrop-blur-glass
    border border-white/20 rounded-2xl
  ">
    {children}
  </div>
);
```

Or with CSS:

```css
.glass {
  /* Fallback for browsers without backdrop-filter */
  background: rgba(30, 41, 59, 0.95);
}

@supports (backdrop-filter: blur(1px)) {
  .glass {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(12px);
  }
}
```

## Dark vs Light Mode

### Dark Mode (Recommended for Glass)
- Glass effects look best on dark, rich backgrounds
- Use lower opacity backgrounds (5-15%)
- Higher blur values (16-24px)
- White/light borders and text

### Light Mode
- Requires more opaque backgrounds (20-35%)
- Lower blur values (8-12px)
- Use subtle shadows for depth
- Dark text on light glass

```tsx
// Responsive to color scheme
<div className="
  bg-white/25 dark:bg-white/10
  backdrop-blur-[8px] dark:backdrop-blur-[16px]
  border-black/10 dark:border-white/20
  text-gray-900 dark:text-white
">
```

## Anti-Patterns to Avoid

1. **Glass on solid backgrounds** - Defeats the purpose; use gradients/images
2. **Too many glass layers** - Performance hit and visual noise
3. **Low-contrast text** - Accessibility violation
4. **Missing fallbacks** - Breaks on older browsers
5. **Excessive blur** - Becomes muddy; 8-20px is the sweet spot
6. **Uniform opacity everywhere** - Vary intensity for hierarchy
7. **Glass without borders** - Elements blend into each other

## Performance Considerations

- `backdrop-filter` is GPU-accelerated but expensive
- Limit glass elements on screen (5-10 max)
- Avoid glass on frequently-updating elements
- Use `will-change: backdrop-filter` sparingly
- Consider `transform: translateZ(0)` for smooth animations
