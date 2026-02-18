# hackathon@welham — DevTools Sprint Terminal Website

An interactive, terminal-style hackathon website built using pure HTML, CSS, and JavaScript.

This site simulates a full CLI-driven lifecycle of a 36-hour DevTools-focused hackathon — from compilation to judging to registration — entirely in the browser.

---

## 🚀 Overview

The website is designed as a sequential terminal experience:

```
boot → compile → config → workshops → rules → mini events → judging → timeline → registration
```

It emphasizes:

- DevTools engineering discipline
- Git-based workflow enforcement
- Structured judging
- Interactive terminal UI
- Scroll-driven section activation
- Mobile-compatible input handling

---

## 🧱 Project Structure

```
/
│
├── index.html
│
├── CSS/
│   ├── base.css
│   ├── layout.css
│   ├── terminal.css
│   ├── windows.css
│   ├── animations.css
│   └── responsive.css
│
├── JS/
│   ├── main.js
│   ├── boot.js
│   ├── terminalEngine.js
│   ├── scrollEngine.js
│   ├── windowManager.js
│   └── utils.js
│
├── DATA/
│   ├── eventConfig.js
│   ├── rules.js
│   ├── workshops.js
│   ├── miniEvents.js
│   ├── judging.js
│   ├── timeline.js
│   ├── registration.js
│   └── footer.js
│
└── assets/
    └── images, logos, etc.
```

---

## ⚙️ Core Components

### 1. TerminalEngine
Handles:
- Character-by-character typing
- ASCII block rendering
- Command simulation
- Cursor behavior

### 2. ScrollEngine
Controls:
- Section activation via IntersectionObserver
- Sequential rendering control
- Delayed transitions between major sections
- Registration interaction
- Footer insertion

### 3. DATA Modules
All content is modular and editable via `/DATA/`:

- Configuration
- Rules
- Workshops
- Mini Events
- Judging (CI-style validation)
- Timeline (36-hour progress bar)
- Registration prompt
- Final system metadata

This separation allows easy updates without touching logic.

---

## 🧠 Key Features

### 🖥 Terminal Simulation
- `g++` compilation aesthetic
- CLI-style commands
- Structured ASCII outputs
- CI-style judging test suite
- 36-hour lifecycle timeline

### 📊 DevTools-Focused Judging
Includes weighted criteria:

- Code Quality & Architecture
- Originality & Innovation
- Utility / Impact
- Execution & Polish
- Tool Practicality
- Git Discipline
- Performance Efficiency

Rendered as a simulated test suite:

```
[TEST 01] code_quality_architecture ..... PASS
...
tests passed: 7 / 7
confidence score: 0.96
```

### 🧾 Interactive Registration
- Mobile-compatible input
- Terminal-style `> y/n` prompt
- Opens Google Sites registration in new tab
- Secure connection simulation
- Final system metadata display

---

## 📱 Mobile Compatibility

Registration input uses a styled `<input>` field instead of global key listeners.

Works on:
- Desktop
- Phone
- Tablet
- Touch devices

---

## 🔒 Design Principles

- No backend
- No frameworks
- No build tools
- Fully static
- Fully modular
- Clean separation of logic and data
- Deterministic sequential rendering
- No race conditions between sections

---

## 🎨 Styling Philosophy

- Monospace typography
- Dark terminal theme
- Minimal color accents
- Structured ASCII layouts
- Responsive grid layout
- System status panel

---

## 🔄 How Section Flow Works

ScrollEngine ensures:

1. Only one section renders at a time
2. Sections do not fire simultaneously
3. Judging completes before timeline
4. Timeline completes before registration
5. Registration completes before footer

Controlled delays create a polished, intentional pacing.

---

## 🛠 To Update Content

Modify files inside `/DATA/`:

Example:

- Update judging criteria → `DATA/judging.js`
- Change mini events → `DATA/miniEvents.js`
- Edit rules → `DATA/rules.js`
- Change registration text → `DATA/registration.js`

No logic edits required.

---

## 🌐 Deployment

This is a fully static site.

You can deploy via:

- GitHub Pages
- Netlify
- Vercel (static mode)
- School server hosting
- Any static hosting provider

No server runtime required.

---

## 🏁 Final System State

After registration:

```
system metadata:
host .............. Welham Boys' School
location .......... Dehradun, India
established ....... 1937
theme ............. devtools

system status: ready
awaiting participants...
```

---

## 📌 Future Enhancements (Optional)

- Auto-scroll to active section
- PASS/FAIL color highlighting
- Subtle background scan animation
- Sound effects toggle
- GitHub live commit counter
- Animated progress bar fill
- Scroll snapping per section

---

## 👨‍💻 Built For

hackathon@welham  
36-Hour DevTools Sprint  
Online, Git-Enforced, AI-Restricted  

---

System status: production ready.