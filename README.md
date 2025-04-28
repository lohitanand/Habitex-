# LifeQuest

## Overview

LifeQuest is a gamified habit tracking application designed to make building and maintaining healthy habits more engaging and fun. By transforming daily routines into quests and achievements, Habitex motivates users through game-like mechanics such as experience points, levels, and rewards.

## Features

### Core Features
- **Habit Tracking**: Log and monitor daily, weekly, and monthly habits
- **Gamification Elements**: Earn XP, level up, and unlock achievements
- **Task Management**: Organize tasks with customizable categories
- **Progress Visualization**: View habit streaks and completion rates
- **Statistics Dashboard**: Track overall progress and habit consistency

### Placeholder/In-Development Features
- **Guild System**: Collaborate with friends on shared goals (placeholder)
- **Avatar Customization**: Personalize your in-app character (placeholder)
- **Loot Box System**: Earn rewards for completing challenges (partially implemented)
- **Quest Rewards**: Earn in-game gold currency for completing quests (placeholder)

## Tech Stack

### Frontend
- React.js
- Next.js
- TailwindCSS
- Framer Motion (for animations)
- Chart.js (for progress visualization)

### Backend
- Node.js
- Express.js
- Mongoose (ODM)

### Authentication
- NextAuth.js

### State Management
- React Context API
- Redux (for more complex state management)

## Dependencies

### Frontend Dependencies
```
"dependencies": {
  "next": "^14.0.0",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "tailwindcss": "^3.3.0",
  "framer-motion": "^10.16.4",
  "chart.js": "^4.4.0",
  "react-chartjs-2": "^5.2.0",
  "next-auth": "^4.24.4",
  "axios": "^1.5.1",
  "date-fns": "^2.30.0"
}
```

### Backend Dependencies
```
"dependencies": {
  "express": "^4.18.2",
  "mongoose": "^7.6.3",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.2",
  "morgan": "^1.10.0"
}
```

### Dev Dependencies
```
"devDependencies": {
  "eslint": "^8.52.0",
  "prettier": "^3.0.3",
  "nodemon": "^3.0.1",
  "jest": "^29.7.0"
}
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation Steps
1. Clone the repository
   ```
   git clone https://github.com/lohitanand/Habitex-.git
   cd Habitex-
   ```

2. Install dependencies
   ```
   npm install
   ```

## Running the Application

To run the application locally in development mode:

```
npm run dev
```

The application should now be running at `http://localhost:3000`.

## Project Structure

```
Habitex/
├── components/         # React components
├── pages/              # Next.js pages
├── public/             # Static assets
├── styles/             # CSS/TailwindCSS styles
├── lib/                # Utility functions
├── models/             # Database models
├── api/                # API routes
├── context/            # React Context providers
├── hooks/              # Custom React hooks
└── config/             # Configuration files
```

## Acknowledgements

This project was built entirely by myself (Lohitanand). 

Development tools:
- Claude AI for creative thinking and ideation
- V0 for main development assistance
- ChatGPT and Claude for debugging support

Special inspiration taken from [Codedex](https://www.codedex.io/) for the gamified learning approach.
