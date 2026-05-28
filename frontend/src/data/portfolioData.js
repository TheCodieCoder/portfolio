export const profile = {
  name: 'Misbah Ur Rahman',
  role: 'Student',
  title: 'B.Tech CSE Student & low-code builder',
  tagline: 'Building today. Improving tomorrow',
  email: 'misbahrahman2006@gmail.com',
  phone: '+919289751389',
  linkedin: 'https://linkedin.com/in/misbah-ur-rahman-0a24ba320',
  github: 'https://github.com/TheCodieCoder',
  location: 'India',
  cgpa: '8.48',
};

export const education = [
  {
    id: 'xth',
    title: 'Xth Class',
    institution: 'New Horizon School',
    period: 'Completed in 2021',
    current: false,
  },
  {
    id: 'xii',
    title: 'XIIth Class',
    institution: 'Dr. Radhakrishnan International School',
    period: 'Completed in 2023',
    current: false,
  },
  {
    id: 'btech',
    title: 'VII Semester — B.Tech CSE',
    institution: 'Jamia Hamdard University',
    period: 'Since September 2023',
    detail: `CGPA: ${profile.cgpa}`,
    current: true,
  },
  {
    id: 'masai-iim-ai',
    title: 'AI for Managers — 6 Month Program',
    institution: 'Masai × IIM Ranchi',
    period: 'Commencing on July 2026',
    detail: 'Professional Certification',
    current: true
  },
];

export const skills = [
  {
    id: 'java',
    name: 'Java',
    color: '#f89820',
    projects: ['Basic development'],
    icon: 'java',
    proficiency: 'Basic',
    concepts: [
      "Functions", "loops", "Conditional statements", "Arrays", "Strings", "Abstract Window Toolkit (AWT)", "Swing"
    ]
  },
  {
    id: 'cpp',
    name: 'C++',
    color: '#00599c',
    projects: ['DSA foundations'],
    icon: 'cpp',
    proficiency: 'Basic',
    concepts: [
      "Functions", "loops", "Conditional statements", "Arrays", "Strings", "Abstract Window Toolkit (AWT)", "Swing", "File handling"
    ]
  },
  {
    id: 'mysql',
    name: 'MySQL',
    color: '#00758f',
    projects: ['e-commerce-sql-analytics', 'Customer-relationship-management'],
    icon: 'mysql',
    proficiency: 'Intermediate',
    concepts: ["DDL (CREATE, USE, DROP)", "Data Types (INT, VARCHAR, TEXT, DATE, TIME, DECIMAL, ENUM)", "Primary Keys & AUTO_INCREMENT", "Foreign Keys & Referential Integrity", "Constraints (NOT NULL, UNIQUE, DEFAULT)", "ENUM Type", "Junction Tables (Many-to-Many)", "ER Diagram & Database Modeling", "JOINs (INNER, multi-table)", "Aggregate Functions (SUM, COUNT, AVG)", "GROUP BY & HAVING", "Subqueries (Nested & Correlated)", "CTEs (WITH clause)", "Date Functions (DATE_FORMAT, CURDATE, INTERVAL)", "Conditional Logic (CASE, COALESCE)", "Customer Retention Analysis", "Sales Funnel Analysis", "Employee Performance Benchmarking", "Revenue & Order Analytics"]
  },
  {
    id: 'nodejs',
    name: 'NodeJS',
    color: '#68a063',
    projects: ['snapURL-url_shortener'],
    icon: 'nodejs',
    proficiency: 'Intermediate',
    concepts: ["Node.js HTTP Server Setup", "ES Modules (import/export, type: module)", "req & res Object Handling", "HTTP Redirects (res.redirect)", "nodemon (Dev Server Auto-restart)", "npm Package Management (package.json, dependencies)", "Deployment to Render.com"]
  },
  {
    id: 'express',
    name: 'ExpressJS',
    color: '#94a3b8',
    projects: ['snapURL-url_shortener'],
    icon: 'express',
    proficiency: 'Intermediate',
    concepts: ["Express App Initialization", "Express Routing (app.use, app.get, app.post)", "Modular Route Files (Express Router)", "MVC Architecture (controllers, models, routes separation)", "Middleware (custom & third-party)", "Authentication Middleware (JWT verification)", "Cookie Parsing (cookie-parser)", "Environment Variables (dotenv, process.env)", "JWT Authentication (jsonwebtoken — sign, verify)", "Password Hashing (bcryptjs)", "Rate Limiting (express-rate-limit)", "Static File Serving (express.static)", "Template Engine Integration (EJS with Express)"]
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    color: '#47a248',
    projects: ['snapURL-url_shortener'],
    icon: 'mongodb',
    proficiency: 'Basic',
    concepts: [
      "MongoDB collections and documents", "Database design basics", "Schema creation with Mongoose", "Model creation", "CRUD operations", "Document insertion", "Finding documents", "Updating documents", "Deleting documents", "MongoDB connection setup", "Connection string handling", "Environment variables (.env)", "Mongoose ODM usage", "Schema validation", "Required fields", "Unique field constraints", "Default values in schema", "Timestamps in documents", "ObjectId basics", "Indexing basics", "Data persistence", "Query methods (find, findOne)", "Asynchronous database operations", "Error handling in database operations", "Duplicate key handling", "Database relationship basics", "URL storage structure", "Short URL mapping logic", "Document-based data modeling"
    ]
  },
];

export const developerTools = [
  {
    id: 'intellij',
    name: 'IntelliJ',
    color: '#fe315d',
    projects: ['Java development'],
    icon: 'intellij',
  },
  {
    id: 'mysql-workbench',
    name: 'MySQL Workbench',
    color: '#00758f',
    projects: ['e-commerce-sql-analytics', 'Customer-relationship-management'],
    icon: 'mysql',
  },
  {
    id: 'vscode',
    name: 'VS Code',
    color: '#007acc',
    projects: ['snapURL-url_shortener', 'Portfolio website'],
    icon: 'vscode',
  },
  {
    id: 'postman',
    name: 'Postman',
    color: '#ff6c37',
    projects: ['API testing for backend projects'],
    icon: 'postman',
  },
  {
    id: 'cursor',
    name: 'Cursor',
    color: '#a78bfa',
    projects: ['Portfolio website', 'AI-assisted development'],
    icon: 'cursor',
  },
];

export const projects = [
  {
    id: 'ecommerce-sql',
    title: 'e-commerce-sql-analytics',
    period: 'Mar 2026',
    description:
      'E-commerce analytics using SQL to analyze sales performance, customer behavior, and product trends. Extracted insights on top-selling products, revenue distribution, and monthly sales patterns.',
    stack: ['SQL', 'MySQL', 'Analytics'],
    features: [
      'Top-selling product analysis',
      'Revenue distribution insights',
      'Monthly sales pattern tracking',
      'Repeat buyer identification',
    ],
    github: 'https://github.com/TheCodieCoder/ecommerce-sql-analytics',
    live: '',
    gradient: 'from-emerald-500/30 to-cyan-500/20',
    accent: '#10b981',
  },
  {
    id: 'crm',
    title: 'Customer-relationship-management',
    period: 'Mar 2026 — Apr 2026',
    description:
      'CRM analytics system using MySQL to analyze customer behavior, sales funnel performance, and revenue trends with retention and pipeline drop-off analysis.',
    stack: ['MySQL', 'SQL', 'CTEs', 'Analytics'],
    features: [
      'Customer retention analysis',
      'Lead-to-deal funnel tracking',
      'Revenue trend benchmarking',
      'Employee performance metrics',
    ],
    github: 'https://github.com/TheCodieCoder/Customer_Realtionship_Management',
    live: '',
    gradient: 'from-violet-500/30 to-fuchsia-500/20',
    accent: '#8b5cf6',
  },
  {
    id: 'snapurl',
    title: 'snapURL-url_shortener',
    period: '2025 — Present',
    description:
      'URL shortener converting long URLs into compact links with click analytics, authentication, password reset, and email verification.',
    stack: ['ExpressJS', 'EJS', 'MongoDB Atlas', 'Node.js'],
    features: [
      'Short URL generation',
      'Click analytics with timestamps',
      'User authentication',
      'Password reset & verification',
    ],
    github: 'https://github.com/TheCodieCoder/url_shortner---project',
    live: 'https://snap-hxbz.onrender.com/',
    gradient: 'from-cyan-500/30 to-blue-500/20',
    accent: '#22d3ee',
  },
];

export const heroRoles = [
  'AI-assisted Full-Stack Developer',
  'SQL Analytics Engineer',
  'MERN Stack Builder',
  'Data-Driven Problem Solver',
];
