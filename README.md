# Mohammed Akbar K - Premium Portfolio Website

A highly interactive, production-ready personal portfolio website built with Next.js, React Three Fiber, Framer Motion, and Tailwind CSS. Features smooth scrolling, stunning 3D animations, and premium UI/UX design.

## 🌟 Features

- **Interactive 3D Background**: Data stream node network visualization using React Three Fiber
- **Smooth Scrolling**: Lenis integration for buttery smooth scroll experience
- **Advanced Animations**: Framer Motion for page transitions, scroll reveals, and interactions
- **Premium Design**: Dark mode aesthetic with a modern minimalistic approach
- **Responsive Layout**: Fully responsive design that works on all devices
- **Production Ready**: Clean, modular architecture with comprehensive comments
- **SEO Optimized**: Full meta tags, Open Graph, and Twitter Card support
- **Performance**: Optimized with Next.js 15+ and Turbopack

## 📋 Sections

1. **Hero Section** - Compelling introduction with 3D background and CTAs
2. **About & Skills** - Professional background with animated skills grid
3. **Experience** - Interactive timeline of work history
4. **Projects** - Premium project cards with hover effects
5. **Contact** - Contact form and social links
6. **Navigation** - Fixed header with smooth scroll navigation
7. **Footer** - Comprehensive footer with links and social media

## 🚀 Quick Start

### Prerequisites

- Node.js 18.17+ or 20.9+
- npm (comes with Node.js)

### Installation & Setup

1. **Navigate to project directory**
```bash
cd "d:\new portfolio"
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
# Build the project
npm run build

# Start production server
npm start
```

## 📦 Dependencies

### Core Framework
- **Next.js 15.1** - React-based framework for production
- **React 19** - Latest React version for UI components
- **TypeScript 5.3** - Type-safe JavaScript

### UI & Animation
- **Framer Motion 11** - Advanced animation library
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Lucide React** - Beautiful SVG icon library
- **Lenis 1.1** - Smooth scrolling library

### 3D Graphics
- **Three.js (r128)** - 3D graphics library
- **React Three Fiber 8.15** - React renderer for Three.js
- **React Three Drei 9.88** - Useful helpers for React Three Fiber

### Utilities
- **React Intersection Observer 9.5** - Viewport visibility detection
- **maath 0.5** - Math utility library
- **clsx 2.0** - Conditional className utility

### Development
- **ESLint** - Code linting
- **PostCSS & Autoprefixer** - CSS post-processing

## 🎨 Customization

### Update Personal Information

Edit the data in each section component:

- **Hero.tsx** - Update headline and introduction
- **About.tsx** - Update skills and professional background
- **Experience.tsx** - Add/modify work experience
- **Projects.tsx** - Update project portfolio
- **Contact.tsx** - Update contact email and information

### Customize Colors

Edit `tailwind.config.ts` to change the color scheme:

```typescript
colors: {
  accent: "#00d4ff",        // Cyan accent color
  "accent-hover": "#00b8d4", // Hover state
  background: "#0a0a0a",    // Dark background
  foreground: "#ffffff",     // Text color
}
```

### Update Social Links

Replace placeholder URLs in components:
- GitHub: `https://github.com`
- LinkedIn: `https://www.linkedin.com`
- Email: `makbarkozhikkal@gmail.com`

### 3D Canvas Settings

Modify `DataStreamCanvas.tsx` for different 3D effects:
- Number of points: Change `500` in the array generation
- Animation speed: Adjust rotation increments
- Colors: Edit `PointMaterial` color prop

## 📱 Responsive Design

The portfolio is designed with mobile-first approach:
- Mobile: Single column layouts
- Tablet: 2-column grids
- Desktop: Full 3-column grids with advanced effects

## ⚡ Performance Optimization

- Image optimization through Next.js
- Code splitting for faster load times
- Optimized 3D canvas rendering
- Lazy loading for components
- Minified and optimized CSS

## 🔧 Environment Variables

Create a `.env.local` file (if needed for future API integration):

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 📝 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Main layout with metadata
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
│
├── components/
│   ├── Navigation.tsx      # Fixed header navigation
│   ├── Footer.tsx          # Footer component
│   ├── providers.tsx       # App providers wrapper
│   │
│   ├── 3d/
│   │   └── DataStreamCanvas.tsx  # 3D scene with point cloud
│   │
│   └── sections/
│       ├── Hero.tsx        # Hero section with CTA
│       ├── About.tsx       # About & skills section
│       ├── Experience.tsx  # Experience timeline
│       ├── Projects.tsx    # Projects showcase
│       └── Contact.tsx     # Contact form & info
```

## 🎯 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project on Vercel.com
3. Environment variables setup
4. Deploy!

### Other Platforms

The project can be deployed on:
- Netlify
- AWS Amplify
- DigitalOcean
- Heroku
- Any Node.js hosting

## 📚 Documentation

### Adding New Sections

1. Create new component in `src/components/sections/`
2. Import `useInView` from react-intersection-observer
3. Use Framer Motion for animations
4. Add to main `page.tsx`

### Animation Patterns

The portfolio uses consistent animation patterns:
- **Fade & Slide**: For initial load animations
- **Scale & Rotate**: For interactive elements
- **Stagger**: For list items
- **Parallax**: For 3D effects

## 🐛 Troubleshooting

### 3D Canvas Not Displaying
- Ensure WebGL is enabled in browser
- Check browser console for errors
- Verify GPU acceleration is available

### Smooth Scrolling Not Working
- Ensure Lenis is properly initialized
- Check for conflicting CSS scroll-behavior
- Try disabling browser extensions

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

## 📄 License

This project is open source and available for personal and commercial use.

## 👨‍💻 Author

**Mohammed Akbar K**
- Email: makbarkozhikkal@gmail.com
- Phone: +91 9846475854
- Location: Malappuram, Kerala, India

## 🤝 Contributing

Feel free to fork, modify, and use this portfolio template for your own projects!

---

**Last Updated**: February 2026
**Version**: 1.0.0

For questions or support, please reach out via email or the contact form on the website.
