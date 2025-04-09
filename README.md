# AI Research and Idea Generation Platform

An AI-powered research and idea generation platform that autonomously creates detailed research and innovative product ideas based on user input.

## Features

- **AI-Powered Research Generation**: Enter a topic and receive comprehensive research reports
- **Detailed Analysis**: Get market insights, technical analysis, and innovative ideas
- **Idea Storage**: Save research results for later reference
- **Responsive Design**: Works on mobile and desktop devices
- **Theme Support**: Toggle between light and dark themes

## Tech Stack

- **Frontend**: React, TailwindCSS, Shadcn UI Components
- **Backend**: Node.js, Express
- **AI Integration**: OpenAI API (GPT-4o)
- **State Management**: React Query
- **Form Handling**: React Hook Form with Zod validation

## Getting Started

### Prerequisites

- Node.js (v18+)
- An OpenAI API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ai-research-platform.git
   cd ai-research-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5000`

## Usage

1. Enter a research topic in the form
2. Select whether you want detailed research
3. Click "Generate Research"
4. View the comprehensive research results
5. Save interesting research for later reference

## Project Structure

- `/client` - Frontend React application
  - `/src/components` - UI components
  - `/src/hooks` - Custom React hooks
  - `/src/lib` - Utility functions and types
  - `/src/pages` - Page components
- `/server` - Backend Express application
  - `/api` - API endpoints
  - `openai.ts` - OpenAI integration
  - `storage.ts` - Data storage interface
- `/shared` - Shared types and schemas

## Security Note

- The application requires an OpenAI API key to function
- The API key is stored as an environment variable and not exposed in the code
- When deploying, ensure your API key is securely stored in environment variables

## License

This project is open source and available under the [MIT License](LICENSE).
