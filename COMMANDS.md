# 💻 Terminal Commands Reference

Complete list of all terminal commands for your portfolio project.

## 📍 Location: `d:\new portfolio`

---

## 🚀 Essential Commands

### Start Development Server
```bash
npm run dev
```
- Starts Next.js in development mode
- Auto-reloads on file changes
- Available at `http://localhost:3000`
- **Use this for everyday development**

### Create Production Build
```bash
npm run build
```
- Optimizes all code for production
- Creates `.next` folder with compiled files
- Takes ~2-5 minutes
- Run before deployment

### Run Production Server
```bash
npm start
```
- Runs the compiled production build
- Much faster than `npm run dev`
- Use for production environment
- Must run `npm run build` first

### Check Code Quality
```bash
npm run lint
```
- Checks for code issues and style violations
- Uses ESLint configuration
- Shows warnings and errors
- Run before committing code

---

## 📦 Dependency Management

### Install All Dependencies
```bash
npm install
```
- Installs packages from `package.json`
- Creates `node_modules` folder
- Run this after cloning or after editing `package.json`

### Update All Dependencies
```bash
npm update
```
- Updates packages to latest compatible versions
- Safe - respects semantic versioning
- Useful: `npm update framer-motion`

### Install New Package
```bash
npm install package-name --save
```
- Examples:
  - `npm install axios --save` (Add new dependency)
  - `npm install @types/node --save-dev` (Dev dependency)

### Remove Package
```bash
npm uninstall package-name --save
```

### Check for Vulnerabilities
```bash
npm audit
```
- Lists security issues in dependencies
- Shows severity levels
- Follow with `npm audit fix` to auto-fix

### Auto-fix Vulnerabilities
```bash
npm audit fix
```
- Automatically fixes security issues
- May update package versions
- For breaking changes: `npm audit fix --force`

---

## 🧹 Cleaning & Maintenance

### Remove Build Cache
```bash
rm -r .next
```
or on Windows:
```bash
rmdir /s /q .next
```
- Removes compiled files
- Use when you have persistent build issues

### Remove Node Modules
```bash
rm -r node_modules
npm install
```
or on Windows:
```bash
rmdir /s /q node_modules
npm install
```
- Complete clean reinstall
- Solves dependency issues
- Takes ~2-3 minutes

### Full Clean Rebuild
```bash
rm -r .next node_modules package-lock.json
npm install
npm run dev
```
or Windows (in PowerShell):
```bash
Remove-Item -Recurse -Force .next, node_modules, package-lock.json
npm install
npm run dev
```
- Nuclear option - fixes almost any issue
- Use only when other solutions fail

---

## 📊 Debugging & Analysis

### Check Project Health
```bash
npm run lint
npm run build
```
- Lint: Checks code quality
- Build: Tests production compilation

### Analyze Bundle Size
```bash
npm run build
# Then use a tool like:
npm install -g webpack-bundle-analyzer
```

### List Installed Packages
```bash
npm list
```
- Shows dependency tree
- Limit depth: `npm list --depth=0`

### Check Package Versions
```bash
npm list package-name
```
- Example: `npm list react`

---

## 🔧 Development Workflow

### Start Dev Server on Different Port
```bash
npm run dev -- -p 3001
```
- Useful if port 3000 is in use
- Visit `http://localhost:3001`

### Build and Start Production Server
```bash
npm run build && npm start
```
- Builds then immediately runs production server
- Test production build locally

### Watch for Changes Only
```bash
npm run build -- --watch
```
- Continuously rebuilds as you change files
- Doesn't start server
- Useful for CI/CD pipelines

---

## 📝 Project Information

### View Package.json Info
```bash
npm view akbar-portfolio
```
- Shows project metadata

### Get Help
```bash
npm help
```
- Shows npm command documentation

### Show Global Packages
```bash
npm list -g --depth=0
```
- Lists globally installed tools

---

## 🚢 Deployment Commands

### Build for Production
```bash
npm run build
```

### Verify Production Build Locally
```bash
npm run build
npm start
```

### Prepare for Deployment
```bash
npm run build && npm run lint
```
- Ensures code quality and build success

---

## 🔄 Version & Config

### Check Node.js Version
```bash
node --version
```
- Current: v18.17.1
- Required: ^18.18.0 or >= 20.0.0

### Check npm Version
```bash
npm --version
```

### Update npm
```bash
npm install -g npm@latest
```
- Updates npm to latest version globally

### Show Current Configuration
```bash
npm config list
```

---

## 📁 File & Directory Operations

### Navigate to Project
```bash
cd "d:\new portfolio"
```

### List Project Files
```bash
ls -la
```
or Windows:
```bash
dir /a
```

### Open in VS Code
```bash
code .
```

### Open in Browser from CLI
```bash
start http://localhost:3000
```
or macOS:
```bash
open http://localhost:3000
```

---

## 🐛 Troubleshooting Commands

### If Dev Server Crashes
```bash
# Kill existing process
# (Restart terminal or Press Ctrl+C)

# Remove cache and restart
rm -r .next
npm run dev
```

### If Styles Aren't Loading
```bash
# Rebuild with fresh Tailwind
rm -r .next
npm run dev
```

### If You Get Strange Errors
```bash
# Full clean and rebuild
rm -r .next node_modules package-lock.json
npm install
npm run dev
```

### Test Specific File
```bash
# Run lint on specific file
npm run lint -- src/components/sections/Hero.tsx
```

---

## 📚 Advanced Commands

### Generate Dependency Tree
```bash
npm list --all
```

### Find Outdated Packages
```bash
npm outdated
```

### Check if Package Can Be Installed
```bash
npm install --dry-run package-name
```

### Show Download Statistics
```bash
npm search react
```

### Get Package Info
```bash
npm info react
```

---

## ⚡ Useful Combinations

### Quick Development Start
```bash
npm install && npm run dev
```
- Install dependencies and start dev server

### Test Production
```bash
npm run build && npm start
```
- Build and immediately run production

### Quality Check Before Commit
```bash
npm run lint && npm run build
```
- Check code quality and build success

### Complete Reset
```bash
rm -r .next node_modules package-lock.json
npm install
npm run build
npm start
```

---

## 🎯 Daily Workflows

### Morning - Start Development
```bash
cd "d:\new portfolio"
npm run dev
```
Then open `http://localhost:3000` in browser.

### Before Committing
```bash
npm run lint
npm run build
```

### Deploy to Production
```bash
npm run build
npm start
# (or deploy .next folder to hosting)
```

### End of Day - Stop Server
```bash
# Press Ctrl+C in terminal
```

---

## 📞 Support

**If a command fails:**
1. Read the error message carefully
2. Try `npm cache clean --force` then the command again
3. Try the "Full Clean Rebuild" command
4. Check Node.js version: `node --version`

**Useful Resources:**
- npm docs: https://docs.npmjs.com/
- Next.js docs: https://nextjs.org/docs
- Node.js docs: https://nodejs.org/docs/

---

**Last Updated:** February 27, 2026  
**Node.js Version:** 18.17.1+  
**npm Version:** 10.1.0+
