# OpenAI Chat Completions Streaming App

This project demonstrates a real-time chat application using OpenAI's Chat Completions API with streaming responses. It consists of a React frontend with Tailwind CSS for styling and a Node.js backend with Express.

## Features

- Real-time streaming of AI responses
- Clean and responsive UI with Tailwind CSS
- Express backend for handling API requests
- Integration with OpenAI's GPT-3.5 Turbo model

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm (v6 or later)
- An OpenAI API key

## Installation

1. Clone the repository:
git clone https://github.com/your-username/your-repo-name.git cd your-repo-name




2. Install backend dependencies:
cd backend npm install




3. Install frontend dependencies:
cd ../frontend npm install




4. Create a `.env` file in the backend directory and add your OpenAI API key:
OPENAI_API_KEY=your_api_key_here




## Usage

1. Start the backend server:
cd backend npm start



The server will run on `http://localhost:8000` by default.

2. In a new terminal, start the frontend development server:
cd frontend npm start



The React app will run on `http://localhost:3000` by default.

3. Open your browser and navigate to `http://localhost:3000` to use the application.

## Acknowledgements

- [OpenAI](https://openai.com/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Express](https://expressjs.com/)
