🎨 Adobe Clone Design System

A modern, scalable, and type-safe component library built for speed and consistency.
The design is inspired by a Figma Community project that replicates Adobe Spectrum v2 using modern frontend tools.

This design system is engineered to provide a seamless developer experience while ensuring interfaces are beautiful, responsive, and accessible by default. It leverages utility-first CSS, isolated component development, declarative variant management, and robust testing practices.

👉 Live Storybook Preview:
Components can be explored, tested, and interacted with in real time at:
storybook page

---

🛠 Tech Stack

This project utilizes a modern and battle-tested stack to ensure maintainability, scalability, and performance:

* Tailwind CSS
Utility-first styling powered by a strict design token system to ensure visual consistency across all components.
* Storybook
Isolated UI development, interactive documentation, and visual testing.
* Class Variance Authority (CVA)
Type-safe and composable component variants without the overhead of runtime CSS-in-JS.
* Vitest
Fast and lightweight test runner designed for modern Vite-based projects.
* React Testing Library
A user-centric testing approach focuses on the behavior of components rather than implementation details.

---

🌟 Core Principles

1. Accessible by Design (a11y)

* Keyboard Navigation
Full support for focus management and keyboard interactions.
* ARIA Attributes & Semantic HTML
Components follow accessibility best practices, ensuring compatibility with assistive technologies.

---

2. Fully Responsive

* Mobile-First Approach
Components are designed to scale naturally from small to large screens.
* Fluid Layouts
UI adapts gracefully across different viewport sizes.
* Consistent Breakpoints
Unified breakpoints are defined in Tailwind’s configuration to guarantee layout consistency.

---

🧩 Component Architecture

This design system relies on Class Variance Authority (CVA) to handle component complexity in a clean and scalable way.

How it works

* Each component exposes a strict set of variants (e.g., intent, size, state)
* Variants map directly to Tailwind utility classes.
* Variant definitions are fully typed with TypeScript, ensuring compile-time safety.
* Components remain simple, predictable, and easy to extend.

This approach avoids excessive conditional logic and keeps styling declarative and maintainable.

---

🧪 Testing Strategy

Quality and reliability are first-class concerns in this project.

* Unit Testing with Vitest
Ensures components behave correctly under different states and variants.
* React Testing Library
Tests are written from the user’s perspective, validating accessibility, interactions, and visual states rather than internal implementation.
* Confidence to Refactor
A solid test suite allows safe iteration and evolution of the design system over time.

---

📚 Documentation & Visual Testing

The Storybook instance serves as the single source of truth for all UI components.

* Interactive Playground
Test component variants (sizes, intents, states) in real time without touching code.
* Auto-Generated Documentation
Component props and variants are automatically documented using TypeScript definitions.
* Visual Regression Testing
Detects unintended UI changes and prevents CSS regressions as the system evolves.
