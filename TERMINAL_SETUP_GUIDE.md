# Portfolio Website - Complete Terminal Setup Guide

## 📋 Prerequisites Check

Before starting, verify you have the required tools installed:

```bash
# Check Node.js version (requires 18.18+ or 20+)
node --version

# Check npm version
npm --version
```

If Node.js version is too old, upgrade from https://nodejs.org/

---

## 🚀 Complete Setup & Run Instructions

### Step 1: Navigate to Project Directory

```bash
cd "d:\new portfolio"
```

### Step 2: Install All Dependencies

The project includes all necessary dependencies configured in `package.json`:

```bash
npm install
```

**What gets installed:**
- Next.js 15 - Production React framework
- React 18 & React DOM - UI library
- Framer Motion 11 - Animation library
- Three.js & React Three Fiber - 3D graphics
- Tailwind CSS - Styling framework
- Lenis - Smooth scrolling
- React Intersection Observer - Viewport detection
- TypeScript - Type safety
- ESLint - Code linting

**Expected time:** 2-3 minutes

---

## 💻 Development Server

### Start Development Mode

```bash
npm run dev
```

**Output should show:**
```
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

**Access the site:**
- Open browser and go to `http://localhost:3000`
- Enjoy hot reloading - changes appear instantly!

### Stop Development Server

Press `Ctrl + C` in the terminal

---

## 🏗️ Production Build

### Build for Production

```bash
npm run build
```

This creates optimized production files in `.next/` folder.

### Start Production Server

```bash
npm start
```

Runs the compiled production build (much faster than development mode)

---

## 🔍 Other Available Commands

### Lint Code for Errors

```bash
npm run lint
```

Checks for code quality issues and style violations

### Clean Build Cache

```bash
rm -r .next node_modules
npm install
npm run build
```

Use this if you encounter build issues

---

## 📊 Project Structure After Installation

```
d:\new portfolio\
├── .next/                 # Build output (created after build)
├── node_modules/          # Dependencies (created after npm install)
├── public/                # Static files
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   └── components/
│       ├── Navigation.tsx
│       ├── Footer.tsx
│       ├── 3d/
│       │   └── DataStreamCanvas.tsx
│       └── sections/
│           ├── Hero.tsx
│           ├── About.tsx
│           ├── Experience.tsx
│           ├── Projects.tsx
│           └── Contact.tsx
├── .eslintrc.json
├── .gitignore
├── next.config.js
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
├── README.md
└── .env.example
```

---

## ⚙️ Environment Configuration

Create `.env.local` file for sensitive configurations (optional):

```bash
# Create file
echo "NEXT_PUBLIC_SITE_URL=http://localhost:3000" > .env.local

# Or edit manually and add:
# NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## 🎨 Customization Commands

### Update Specific Section Data

All section data is defined directly in component files:

1. **Hero Introduction** → `src/components/sections/Hero.tsx`
2. **Skills & About** → `src/components/sections/About.tsx`
3. **Work Experience** → `src/components/sections/Experience.tsx`
4. **Projects** → `src/components/sections/Projects.tsx`
5. **Contact Info** → `src/components/sections/Contact.tsx`

Simply edit the component file and save - changes appear instantly in dev mode!

---

## 🚨 Troubleshooting

### Issue: Build fails with Node version error

```bash
# Option 1: Upgrade Node.js
# Download from https://nodejs.org/ (Latest LTS recommended)

# Option 2: Downgrade Next.js (temporary workaround)
npm install next@14.0.0 --save
```

### Issue: 3D Scene not displaying

```bash
# Check browser console (F12) for WebGL errors
# Ensure GPU acceleration is enabled in browser
# Try a different browser (Chrome recommended)
```

### Issue: Port 3000 already in use

```bash
# Use different port
npm run dev -- -p 3001
# Then access at http://localhost:3001
```

### Issue: Styles not applying

```bash
# Rebuild Tailwind CSS
rm -r .next
npm run dev
```

### Issue: Memory error during build

```bash
# Node.js memory limit increased
set NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

---

## 📦 Deployment

### Deploy to Vercel (Easiest)

1. Push code to GitHub
2. Go to vercel.com
3. Import project
4. Deploy (automatic!)

### Deploy to Other Platforms

**Netlify:**
```bash
npm run build
# Deploy the .next folder and public folder
```

**AWS Amplify:**
```bash
npm run build
# Use Amplify console to deploy
```

**Traditional VPS/Server:**
```bash
# Build
npm run build

# Copy files to server
scp -r .next/* user@server:/app/
scp package.json user@server:/app/

# On server:
npm install --production
npm start
```

---

## 🔄 Regular Development Workflow

### Daily Development Loop

```bash
# 1. Start dev server
npm run dev

# 2. Edit files in src/components/sections/
# Changes auto-reload

# 3. Check for lint issues
npm run lint

# 4. Before committing, run full build
npm run build

# 5. If build succeeds, commit:
git add .
git commit -m "Update portfolio with new content"
```

### Update Dependencies

```bash
# Check for updates
npm outdated

# Update all packages safely
npm update

# Update specific package
npm install framer-motion@latest --save
```

---

## 📱 Testing Responsiveness

### Desktop Development
- Chrome/Firefox DevTools (F12)
- Test at: Desktop, Tablet (768px), Mobile (375px)

### Mobile Preview
```bash
# Access from phone on same network
# Find your IP address:
ipconfig getifaddr en0  # macOS
ipconfig               # Windows (look for your IP)

# Then open: http://<YOUR_IP>:3000
```

---

## 📝 Performance Monitoring

### Check Build Size

```bash
# Install package
npm install -g next-transpile-modules

# Analyze bundle
npm run build -- --analyze
```

### Lighthouse Score (Chrome)

1. Open site: http://localhost:3000
2. DevTools (F12) → Lighthouse tab
3. Run audit

Target scores:
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 90
- SEO: > 95

---

## 🔐 Security Best Practices

```bash
# Check for vulnerable dependencies
npm audit

# Fix vulnerabilities automatically
npm audit fix

# For major versions:
npm audit fix --force
```

---

## 📚 Additional Resources

### Documentation Links
- Next.js: https://nextjs.org/docs
- React: https://react.dev
- Framer Motion: https://www.framer.com/motion
- Tailwind CSS: https://tailwindcss.com/docs
- Three.js: https://threejs.org/docs
- React Three Fiber: https://docs.pmnd.rs/react-three-fiber

### Common Patterns Used

1. **Smooth Scrolling** - Lenis integration in page.tsx
2. **3D Animation** - React Three Fiber in DataStreamCanvas.tsx
3. **Animations** - Framer Motion variants in all components
4. **Scroll Animation** - React Intersection Observer in sections
5. **Styling** - Tailwind CSS utility classes

---

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] `npm install` completes without errors
- [ ] `npm run dev` starts server successfully
- [ ] Site loads at `http://localhost:3000`
- [ ] All sections visible and animated
- [ ] 3D canvas displays in Hero section
- [ ] Smooth scrolling works
- [ ] Navigation links scroll smoothly
- [ ] Contact form loads
- [ ] Mobile view is responsive
- [ ] `npm run build` completes successfully

---

## 🆘 Get Help

If you encounter issues:

1. **Check Console Errors**: F12 → Console tab
2. **Read Full Error Message**: Copy entire error and search online
3. **Check .next folder**: It should exist after build
4. **Verify Node version**: Should be 18.18+ or 20+
5. **Clear cache**: `rm -r .next node_modules`

---

## 📅 Version Information

**Created**: February 27, 2026
**Node.js Tested**: 18.17.1 (works with 18.18+, 20+)
**npm Version**: 10.1.0+
**Next.js**: 15.1.0

---

For more information, see README.md or individual component files with detailed comments.
