# Danny's Team Library - Hackathon Demo

A comprehensive hackathon toolkit featuring a calculator and AI-powered workspace for requirement evolution, built with Next.js, TypeScript, and Tailwind CSS.

## Features

### 🧮 Calculator
- **Number Input**: Buttons for digits 0-9
- **Basic Operations**: Addition (+) and subtraction (-)
- **Clear Function**: Reset the calculator to start fresh
- **Modern UI**: Beautiful gradient background with a sleek dark-themed calculator
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### 🤖 AI Workspace (NEW)
- **Chat-First Interface**: Interactive AI conversations for requirement evolution
- **Initiative Input**: Squad leads can input and evolve hackathon initiatives
- **Structured Story Generation**: Automatic creation of user stories with title, description, and acceptance criteria
- **Jira Integration**: One-click issue creation with transcript links for full context
- **Copilot Integration**: Trigger development workflows with AI-generated requirements as context
- **Real-time Messaging**: Simulated AI responses with timestamps

## Tech Stack

- **Next.js 16** - React framework for production
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React** - UI component library

## Getting Started

### Prerequisites

- Node.js 18+ installed on your machine
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/dannygmr/hackaton-demo-calculator.git
cd hackaton-demo-calculator
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the calculator.

## Usage

### Calculator
1. Click number buttons (0-9) to input numbers
2. Click the `+` or `-` button to select an operation
3. Click more numbers to input the second operand
4. Click `=` to see the result
5. Click `C` to clear and start over

### AI Workspace
1. Navigate to the "AI Workspace" tab
2. Input your hackathon initiative in the text area
3. Start an AI session to evolve requirements through conversation
4. Review the generated structured story (title, description, acceptance criteria)
5. Create a Jira issue with transcript links for full context
6. Trigger Copilot with the generated acceptance criteria as branch context

## Acceptance Criteria Flow

The AI Workspace implements a complete workflow:

✅ **Initiative Input → Structured Story**: Squad inputs initiative → AI generates title, description, and acceptance criteria

✅ **Story Approval → Jira Creation**: Approved criteria → Create Jira issue with conversation transcript links

✅ **Jira Issue → Copilot Context**: Existing Jira issue → Copilot references generated acceptance criteria

## Project Structure

```
├── app/
│   ├── components/
│   │   ├── Calculator.tsx    # Calculator component
│   │   ├── AIWorkspace.tsx   # AI workspace for requirement evolution
│   │   └── Navigation.tsx    # Tab navigation component
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main page with navigation
├── public/                   # Static assets
├── next.config.ts            # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
```

## Development

To make changes to the application:

1. Edit `app/components/Calculator.tsx` to modify calculator logic
2. Edit `app/components/AIWorkspace.tsx` to enhance AI features
3. Edit `app/components/Navigation.tsx` to modify tab navigation
4. Edit `app/page.tsx` to change the overall layout
5. The page will auto-update as you save files

### Key Components

- **AIWorkspace**: Main AI interaction component with chat, story generation, and Jira integration
- **Navigation**: Tab switching between Calculator and AI Workspace
- **Calculator**: Original calculator functionality (preserved)

## Build for Production

```bash
npm run build
npm start
```

## License

MIT

## Author

dannygmr
