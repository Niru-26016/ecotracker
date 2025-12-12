# EcoTracker 🌱

Track and reduce your carbon footprint with AI-powered insights. Log your daily activities, analyze your emissions, and compete with others to build sustainable habits.

## 🚀 Features

- **Activity Logging** - Log your transport, energy, food, and lifestyle activities
- **AI-Powered Analysis** - Natural language chat interface powered by n8n + Google Gemini
- **Dashboard & Analytics** - Visualize your carbon footprint trends over time
- **Leaderboard** - Compete with others to reduce emissions
- **Reports** - Generate detailed emission reports

## 📋 Prerequisites

- Node.js (v16.x or higher)
- npm or yarn
- n8n webhook endpoint (for AI chat features)

## 🛠️ Installation

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Create your environment file:
   ```bash
   cp .env.example .env
   ```

3. Configure your environment variables in `.env`:
   - `VITE_N8N_WEBHOOK_URL` - Your n8n webhook URL (required for chat)
   - See `.env.example` for all available options

4. Start the development server:
   ```bash
   npm start
   ```

## 📁 Project Structure

```
ecotracker/
├── public/             # Static assets and PWA manifest
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── services/       # API and external service integrations
│   ├── styles/         # Global styles
│   └── utils/          # Utility functions
├── .env.example        # Environment variable template
├── index.html          # HTML template
└── vite.config.mjs     # Vite configuration
```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server on port 4028 |
| `npm run build` | Build for production |
| `npm run serve` | Preview production build |

## 🚀 Deployment

1. Build the production bundle:
   ```bash
   npm run build
   ```

2. Deploy the `build/` directory to your hosting provider (Vercel, Netlify, etc.)

3. Set environment variables in your hosting dashboard

## 🔒 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_N8N_WEBHOOK_URL` | Yes | n8n webhook URL for AI chat |
| `VITE_SUPABASE_URL` | Optional | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Optional | Supabase anonymous key |
| `VITE_GOOGLE_ANALYTICS_ID` | Optional | Google Analytics tracking ID |

## 📱 Tech Stack

- **React 18** with Vite
- **Redux Toolkit** for state management
- **TailwindCSS** for styling
- **Framer Motion** for animations
- **Recharts & D3** for data visualization
- **React Hook Form** for form handling
