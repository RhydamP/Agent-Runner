# Alpha Agent 🤖

A minimal AI agent runner with tool integration - built as a full-stack engineering assignment.

![Demo](demo.gif)

## Features

- 🧮 **Calculator Tool** - Safe math expression evaluation
- 🔍 **Web Search** - Real-time search with AI summarization  
- 🤖 **OpenAI Integration** - Intelligent response generation
- 📊 **Data Storage** - Postgres + Redis for runs and caching
- 🐳 **Docker Ready** - One-command setup

## Tech Stack

**Frontend:** Next.js 14, React, Tailwind CSS  
**Backend:** Node.js, Express, TypeScript, Zod validation  
**Database:** PostgreSQL, Redis  
**AI:** OpenAI GPT, SerpAPI for search  

## Quick Start

### Option 1: Docker (Recommended)

1. **Clone and setup environment**
   ```bash
   git clone <your-repo-url>
   cd alpha-agent
   
   # Setup backend environment
   cd backend
   cp .env.example .env
   
   # Setup frontend environment  
   cd ../frontend
   cp .env.example .env
   cd ..
   ```

2. **Add your API keys**
   ```bash
   # Edit backend/.env
   OPENAI_API_KEY=your-key-here
   SERPAPI_API_KEY=your-key-here
   ```

3. **Start with Docker Compose**
   ```bash
   docker compose up --build
   ```

### Option 2: Manual Setup

1. **Backend**
   ```bash
   cd backend
   cp .env.example .env
   npm install
   npm run dev
   ```

2. **Frontend**
   ```bash  
   cd frontend
   cp .env.local .env
   npm install
   npm run dev
   ```

3. **Database** (if not using Docker)
   ```bash
   # Start PostgreSQL and Redis locally
   # Update connection strings in backend/.env
   ```

### Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- Database: PostgreSQL on port 5432, Redis on port 6379

## Usage Examples

**Calculator:**
```
Input: "15*10-20"
Output: "The answer to your calculation is 130."
```

**Web Search:**
```
Input: "Latest AI news"
Output: "Based on my search, here's what I found: [AI summary]"
```

## Project Structure

```
alpha-agent/
├── frontend/          # Next.js React app
├── backend/           # Express.js API
├── docker-compose.yml # Complete stack setup
└── README.md
```

## API Endpoint

```bash
POST /run
{
  "prompt": "Calculate 2+2",
  "tool": "calculator"
}
```

## Testing

```bash
npm test  # Run backend tests
```

## Architecture Decisions

- **TypeScript** for type safety across the stack
- **Zod schemas** for runtime validation
- **Docker Compose** for easy development setup
- **Postgres + Redis** for persistence and caching
- **lucide-react** for consistent, accessible components

Built in 2-3 days as a technical demonstration of full-stack development skills.
