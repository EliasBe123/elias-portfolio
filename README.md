# Elias Benjaminsson - Portfolio Website

A modern, full-stack personal portfolio website showcasing projects, career timeline, and professional experience. This site demonstrates proficiency in contemporary web development technologies and infrastructure management, running entirely on a self-hosted Raspberry Pi 5 with enterprise-grade deployment practices.

## 🌟 Overview

This portfolio serves as both a professional showcase and a demonstration of full-stack development capabilities. The application features:

- **Personal Branding**: Professional introduction, resume, and contact information
- **Project Showcase**: Comprehensive display of personal and professional projects
- **Career Timeline**: Interactive visualization of professional journey
- **Analytics Dashboard**: Real-time visitor statistics and engagement metrics
- **Self-Hosted Infrastructure**: Deployed on Raspberry Pi 5 with VPS reverse proxy via WireGuard

The site is built with performance, scalability, and maintainability in mind, utilizing modern development practices including TypeScript, containerization, and monorepo architecture.

## 🚀 Technologies Used

### Frontend
- **React 18** - Modern UI library with hooks and concurrent features
- **TypeScript** - Type-safe JavaScript for enhanced development experience
- **Vite** - Next-generation frontend build tool for lightning-fast development
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **React Router** - Client-side routing for seamless navigation
- **Recharts** - Composable charting library for data visualization
- **Lucide React** - Beautiful, consistent icon set

### Backend
- **Node.js 20** - JavaScript runtime built on Chrome's V8 engine
- **Express** - Fast, minimalist web framework for Node.js
- **TypeScript** - Type-safe server-side development
- **Better-SQLite3** - Fast, embedded SQLite3 database
- **Compression** - Response compression middleware for optimal performance

### DevOps & Infrastructure
- **Docker** - Containerization for consistent deployment
- **Multi-stage Builds** - Optimized Docker images for production
- **Nginx** - Reverse proxy and load balancer on VPS
- **WireGuard** - Secure VPN tunnel between Raspberry Pi and VPS
- **Raspberry Pi 5** - Self-hosted hardware platform

## 📁 Project Structure

```
elias-portfolio/
├── apps/
│   ├── api/                    # Backend Express application
│   │   ├── src/
│   │   │   ├── server.ts      # Express server setup
│   │   │   ├── db.ts          # SQLite database configuration
│   │   │   └── routes/        # API route handlers
│   │   │       ├── health.ts  # Health check endpoint
│   │   │       └── stats.ts   # Visitor statistics API
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── web/                    # Frontend React application
│       ├── src/
│       │   ├── App.tsx        # Main application component
│       │   ├── Dashboard.tsx  # Analytics dashboard
│       │   ├── Projects.tsx   # Projects showcase
│       │   ├── Timeline.tsx   # Career timeline
│       │   ├── Navbar.tsx     # Navigation component
│       │   └── Footer.tsx     # Footer component
│       ├── package.json
│       ├── vite.config.ts
│       └── tailwind.config.cjs
│
├── infra/                      # Infrastructure configuration
│   ├── pi/                    # Raspberry Pi setup
│   │   └── docker-compose.yml
│   └── vps/                   # VPS configuration
│       └── nginx/             # Nginx reverse proxy config
│
├── Dockerfile                  # Multi-stage Docker build
└── README.md
```

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 20.x (see `.nvmrc`)
- npm or yarn package manager
- Docker (for containerized deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/EliasBe123/elias-portfolio.git
   cd elias-portfolio
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   cd apps/web
   npm install

   # Install backend dependencies
   cd ../api
   npm install
   ```

3. **Start development servers**

   **Frontend** (in `apps/web/`):
   ```bash
   npm run dev
   # Runs on http://localhost:5173
   ```

   **Backend** (in `apps/api/`):
   ```bash
   npm run dev
   # Runs on http://localhost:3000
   ```

### Production Build

#### Frontend
```bash
cd apps/web
npm run build
# Output: dist/ directory
```

#### Backend
```bash
cd apps/api
npm run build
# Output: dist/ directory (transpiled JavaScript)
```

## 🐳 Docker Deployment

The application uses a multi-stage Docker build for optimized production deployment:

```bash
# Build the Docker image
docker build -t elias-portfolio .

# Run the container
docker run -p 3000:3000 elias-portfolio
```

The Dockerfile follows these stages:
1. **Frontend Build** - Builds the React application with Vite
2. **Backend Build** - Compiles TypeScript backend and includes frontend assets
3. **Runtime** - Minimal production image with only necessary files

## 🏗️ Architecture

### Infrastructure Overview
- **Raspberry Pi 5**: Hosts the Docker container running the application
- **WireGuard VPN**: Secure tunnel between Pi and VPS
- **VPS with Nginx**: Acts as reverse proxy, handles SSL/TLS termination
- **SQLite Database**: Tracks visitor analytics and statistics

### Key Features
- **Visit Tracking**: Automatic logging of page visits with IP and timestamp
- **SPA Routing**: Fallback routing for React Router on the backend
- **Static Asset Serving**: Optimized static file serving with caching
- **Compression**: Gzip compression for improved performance
- **Health Checks**: API endpoint for monitoring application status

### API Endpoints
- `GET /api/health` - Health check endpoint
- `GET /api/stats` - Visitor statistics and analytics
- `/*` - SPA fallback, serves React application

## 🎨 Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Animated Background**: Custom CSS animations for visual appeal
- **Career Timeline**: Visual representation of professional experience
- **Project Cards**: Interactive showcase of personal projects
- **Analytics Dashboard**: Real-time visitor statistics and metrics
- **Dark Theme**: Modern, eye-friendly color scheme

## 📊 Analytics

The application tracks visitor analytics using a lightweight SQLite database:
- Page visits with timestamps
- Visitor IP addresses (anonymized)
- Path-based tracking
- Real-time statistics dashboard

## 🔒 Security

- Trust proxy configuration for accurate IP logging behind reverse proxy
- No exposed credentials or secrets in codebase
- Containerized deployment for isolation
- Regular security updates via dependabot

## 📝 Development Scripts

### Frontend (`apps/web/`)
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production bundle
- `npm run preview` - Preview production build locally

### Backend (`apps/api/`)
- `npm run dev` - Start development server with auto-reload (tsx watch)
- `npm run build` - Compile TypeScript to JavaScript
- `npm run start` - Start production server

## 🤝 Contributing

This is a personal portfolio project, but feedback and suggestions are welcome! Feel free to open an issue or submit a pull request.

## 📄 License

This project is personal and proprietary. Please contact for usage rights.

## 👤 Contact

**Elias Benjaminsson**
- GitHub: [@EliasBe123](https://github.com/EliasBe123)
- Portfolio: [Live Site](https://eliasbe.com) (if hosted)

---

*Built with ❤️ using React, TypeScript, and modern web technologies*
