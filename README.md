
# ☕ Coffee Roulette

Welcome to Coffee Roulette! Let fate (and a little bit of AI) decide your next cup of coffee. This application helps you discover new coffee recipes based on the ingredients you have on hand and your flavor preferences.

## 🌟 Features

*   **AI-Powered Suggestions:** Get personalized coffee recipe suggestions using Genkit and Google's Gemini model.
*   **Ingredient-Based:** Tell the app what ingredients you have, and it will suggest something you can make.
*   **Flavor Preference:** Optionally specify your preferred flavor profile (e.g., sweet, strong, bitter).
*   **Recipe Details:** View the name, ingredients, and preparation instructions for each suggested coffee.
*   **Coffee Log:** Keep a log of the coffees you've tried.
*   **Favorites:** Mark your favorite recipes for quick access.
*   **Responsive Design:** Enjoy a seamless experience on desktop and mobile devices.
*   **Modern UI:** Built with ShadCN UI components and Tailwind CSS for a clean and appealing look.
*   **Local Storage:** Your coffee log and favorites are saved in your browser's local storage.

## 🛠️ Tech Stack

*   **Frontend:**
    *   [Next.js](https://nextjs.org/) (v15, App Router) - React framework for server-side rendering and static site generation.
    *   [React](https://reactjs.org/) (v18) - JavaScript library for building user interfaces.
    *   [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript.
    *   [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for styling.
    *   [ShadCN UI](https://ui.shadcn.com/) - Re-usable UI components.
    *   [Lucide React](https://lucide.dev/) - Icon library.
*   **AI/Generative Features:**
    *   [Genkit (Firebase Genkit)](https://firebase.google.com/docs/genkit) - Toolkit for building AI-powered applications.
    *   [Google AI (Gemini Models)](https://ai.google.dev/) - Language models for generating coffee suggestions.
*   **Development & Build:**
    *   [Node.js](https://nodejs.org/) - JavaScript runtime environment.
    *   [npm](https://www.npmjs.com/) - Node package manager.
    *   [Docker](https://www.docker.com/) - Containerization platform.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

*   [Node.js](https://nodejs.org/) (v18 or newer recommended, which includes npm)
*   [Docker Desktop](https://www.docker.com/products/docker-desktop/) (if you plan to use Docker)
*   A Google AI API Key (for Genkit features). You can obtain one from [Google AI Studio](https://aistudio.google.com/app/apikey).

## 🚀 Getting Started (Local Development)

Follow these steps to get the Coffee Roulette app running on your local machine:

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/your-username/coffee-roulette-app.git
    cd coffee-roulette-app
    ```
    *(Replace `your-username/coffee-roulette-app.git` with the actual URL of your repository if it's different)*

2.  **Set Up Environment Variables:**
    Create a `.env` file in the root of the project and add your Google AI API key:
    ```env
    GOOGLE_API_KEY=YOUR_GOOGLE_API_KEY_HERE
    ```
    Replace `YOUR_GOOGLE_API_KEY_HERE` with your actual API key.

3.  **Install Dependencies:**
    ```bash
    npm install
    ```

4.  **Run the Development Servers:**
    This application requires two servers to be running concurrently:
    *   **Next.js Frontend Server:**
        Open a terminal and run:
        ```bash
        npm run dev
        ```
        This will usually start the app on `http://localhost:9002`.

    *   **Genkit AI Flows Server:**
        Open a *new* terminal and run:
        ```bash
        npm run genkit:dev
        ```
        or for auto-reloading on changes to AI flows:
        ```bash
        npm run genkit:watch
        ```
        This server handles the AI requests, typically running on `http://localhost:3400` (Genkit Flow Server) and `http://localhost:4001` (Genkit Inspector).

5.  **Access the Application:**
    Open your web browser and navigate to `http://localhost:9002`.

## 🐳 Running with Docker

You can also build and run this project using Docker:

1.  **Build the Docker Image:**
    Ensure Docker Desktop is running. In the project root, run:
    ```bash
    docker build -t coffee-roulette-app .
    ```

2.  **Run the Docker Container:**
    ```bash
    docker run -p 9002:3000 -p 3400:3400 -e GOOGLE_API_KEY="YOUR_ACTUAL_GOOGLE_API_KEY" --name my-coffee-app coffee-roulette-app
    ```
    *   This maps port `9002` (for Next.js) and `3400` (for Genkit) from the container to your host.
    *   **Important:** Replace `"YOUR_ACTUAL_GOOGLE_API_KEY"` with your real API key.

3.  **Access the Application:**
    Open your web browser and navigate to `http://localhost:9002`.

## 📁 Project Structure

A brief overview of the key directories:

```
.
├── public/                # Static assets
├── src/
│   ├── ai/                # Genkit AI flows and configuration
│   │   ├── flows/         # AI flow implementations (e.g., suggest-coffee.ts)
│   │   ├── dev.ts         # Development server entry for Genkit
│   │   └── genkit.ts      # Genkit global configuration
│   ├── app/               # Next.js App Router (pages, layouts, global styles)
│   ├── components/        # React components
│   │   ├── coffee-roulette/ # App-specific components
│   │   └── ui/            # ShadCN UI components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   └── types/             # TypeScript type definitions
├── .env                   # Environment variables (ignored by Git, create locally)
├── .gitignore             # Specifies intentionally untracked files that Git should ignore
├── Dockerfile             # Instructions for building the Docker image
├── next.config.ts         # Next.js configuration
├── package.json           # Project dependencies and scripts
├── postcss.config.js      # PostCSS configuration (for Tailwind CSS)
├── tailwind.config.ts     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```


---

Happy Brewing! ☕
