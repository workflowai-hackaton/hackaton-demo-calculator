# Basic Calculator App

A simple and elegant calculator built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Number Input**: Buttons for digits 0-9
- **Basic Operations**: Addition (+) and subtraction (-)
- **Clear Function**: Reset the calculator to start fresh
- **Modern UI**: Beautiful gradient background with a sleek dark-themed calculator
- **Responsive Design**: Works seamlessly on desktop and mobile devices

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

1. Click number buttons (0-9) to input numbers
2. Click the `+` or `-` button to select an operation
3. Click more numbers to input the second operand
4. Click `=` to see the result
5. Click `C` to clear and start over

## Project Structure

```
├── app/
│   ├── components/
│   │   └── Calculator.tsx    # Main calculator component
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── public/                   # Static assets
├── next.config.ts            # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
```

## Development

To make changes to the calculator:

1. Edit `app/components/Calculator.tsx` to modify calculator logic
2. Edit `app/page.tsx` to change the layout or styling
3. The page will auto-update as you save files

## Build for Production

```bash
npm run build
npm start
```

## License

MIT

## Author

dannygmr
