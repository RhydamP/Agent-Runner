# 🤖 AI Agent

<div align="center">
  <h3>🧠 A Minimal AI Agent Runner with Tool Integration</h3>
  <p>Built as a full-stack engineering assignment showcasing modern web development practices</p>
</div>

---

## 🎯 Overview

Alpha Agent is a sophisticated AI-powered tool runner that combines the power of OpenAI's language models with practical tools like calculator and web search. Built with modern full-stack technologies, it provides a seamless user experience with real-time processing and intelligent responses.

### ✨ Key Highlights

- 🎨 **Modern UI/UX** - Typewriter effects, smooth animations, and responsive design
- 🛠️ **Tool Integration** - Calculator and web search with intelligent routing
- 🔒 **Type Safety** - Full TypeScript implementation with Zod validation
- ⚡ **Performance** - Optimized with Next.js 14 App Router and efficient backend
- 🎭 **Professional UX** - Loading states, error handling, and smooth interactions

---

## 🏗️ Architecture

### Frontend Stack
- **⚛️ Next.js 14** - App Router with React Server Components
- **🎨 Tailwind CSS** - Utility-first styling framework
- **🧩 shadcn/ui** - Beautiful, accessible component library
- **✨ Framer Motion** - Smooth animations and transitions
- **📱 Responsive Design** - Mobile-first approach

### Backend Stack
- **🟢 Node.js** - Runtime environment
- **🚀 Express.js** - Web application framework
- **📘 TypeScript** - Type-safe development
- **🔍 Zod** - Runtime type validation
- **🧮 Math.js** - Safe mathematical expression evaluation
- **🌐 SerpAPI** - Real-time web search integration
- **🤖 OpenAI API** - AI-powered summarization

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- OpenAI API key
- SerpAPI key (for web search)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/alpha-agent.git
   cd alpha-agent
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   
   # Create environment file
   cp .env.example .env
   ```

3. **Configure Environment Variables**
   ```env
   # backend/.env
   OPENAI_API_KEY=your-openai-api-key-here
   SERPAPI_API_KEY=your-serpapi-key-here
   PORT=4000
   NODE_ENV=development
   ```

4. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

5. **Start Development Servers**
   
   **Backend (Terminal 1):**
   ```bash
   cd backend
   npm run dev
   # 🚀 Server running on http://localhost:4000
   ```
   
   **Frontend (Terminal 2):**
   ```bash
   cd frontend
   npm run dev
   # 🌐 Frontend running on http://localhost:3000
   ```

---

## 🎮 Usage Examples

### 🧮 Calculator Tool
```
Input: "Calculate 2 + 3 * (4 - 1) ^ 2"
Output: 29
```

### 🔍 Web Search Tool
```
Input: "What's the latest news about artificial intelligence?"
Output: [AI-powered summary of recent AI developments]
```

### 🤖 Natural Language Processing
```
Input: "What is 15% of 240 and also search for weather today"
Output: [Calculated result + Weather information]
```

---

## 📁 Project Structure

```
alpha-agent/
├── 📁 backend/
│   ├── 📄 index.ts              # Express server entry point
│   ├── 📁 tools/                # Tool implementations
│   │   ├── 📄 calculator.ts     # Math evaluation tool
│   │   ├── 📄 web-search.ts     # Web search integration
│   │   └── 📄 index.ts          # Tool registry
│   ├── 📁 llm/                  # OpenAI integration
│   │   └── 📄 openai.ts         # AI processing logic
│   ├── 📄 schema.ts             # Zod validation schemas
│   ├── 📄 types.ts              # TypeScript type definitions
│   └── 📄 utils.ts              # Utility functions
│
├── 📁 frontend/
│   ├── 📁 app/
│   │   ├── 📄 page.tsx          # Main application page
│   │   ├── 📄 layout.tsx        # Root layout component
│   │   └── 📄 globals.css       # Global styles
│   ├── 📁 components/
│   │   ├── 📄 chat-interface.tsx # Main chat component
│   │   ├── 📄 tool-selector.tsx  # Tool selection UI
│   │   └── 📄 typewriter.tsx     # Typing animation
│   ├── 📁 lib/
│   │   ├── 📄 api.ts            # API client functions
│   │   └── 📄 utils.ts          # Frontend utilities
│   └── 📄 tailwind.config.js    # Tailwind configuration
│
├── 📁 docs/                     # Documentation assets
├── 📄 README.md                 # This file
└── 📄 package.json              # Project configuration
```

---

## 🛠️ API Documentation

### POST `/api/run`

Execute a tool with the provided input.

**Request Body:**
```json
{
  "tool": "calculator" | "web-search",
  "input": "string"
}
```

**Response:**
```json
{
  "success": true,
  "result": "string",
  "tool": "string",
  "executionTime": "number"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "string",
  "code": "VALIDATION_ERROR" | "TOOL_ERROR" | "SERVER_ERROR"
}
```

---

## 🧪 Testing

### Running Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# E2E tests
npm run test:e2e
```

### Test Coverage

- ✅ Unit tests for tool functions
- ✅ API endpoint testing
- ✅ Frontend component testing
- ✅ Integration testing
- ✅ Error handling validation

---

## 🚀 Deployment

### Production Build

```bash
# Backend
cd backend
npm run build
npm start

# Frontend
cd frontend
npm run build
npm start
```

### Environment Variables (Production)

```env
OPENAI_API_KEY=your-production-key
SERPAPI_API_KEY=your-production-key
NODE_ENV=production
PORT=4000
FRONTEND_URL=https://your-domain.com
```

### Docker Deployment

```dockerfile
# Available Docker configuration
docker-compose up -d
```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Standards

- TypeScript for type safety
- ESLint + Prettier for code formatting
- Conventional commits for commit messages
- Comprehensive testing required

---

## 📈 Performance Metrics

- ⚡ **Response Time**: < 200ms for calculator operations
- 🌐 **Search Speed**: < 2s for web search with summarization
- 📱 **Mobile Performance**: 95+ Lighthouse score
- 🔄 **Uptime**: 99.9% availability target

---

## 🔒 Security

- 🛡️ Input validation with Zod schemas
- 🔐 API key encryption and secure storage
- 🚫 XSS and injection attack prevention
- 📋 CORS configuration for production
- 🔍 Regular security audits

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

Built with ❤️ by [Your Name]

- 🐦 Twitter: [@yourhandle](https://twitter.com/yourhandle)
- 💼 LinkedIn: [Your Profile](https://linkedin.com/in/yourprofile)
- 📧 Email: your.email@example.com

---

## 🙏 Acknowledgments

- OpenAI for providing powerful language models
- SerpAPI for reliable web search functionality
- The Next.js team for an excellent framework
- shadcn for beautiful UI components
- The open-source community for inspiration and tools

---

```bash
docker compose up --build


<div align="center">
  <h3>⭐ If you found this project helpful, please give it a star!</h3>
  <p>Made with 💻 and ☕ in 2025</p>