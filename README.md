# Basic Calculator App

A simple and elegant calculator built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Number Input**: Buttons for digits 0-9
- **Multiple Operations**: Addition (+), subtraction (-), multiplication (×), and division (÷)
- **Order of Operations**: Follows standard PEMDAS/BODMAS rules (multiplication and division before addition and subtraction)
- **Parentheses Support**: Use parentheses to group operations and control calculation order
- **Expression Chaining**: Chain multiple operations together for complex calculations
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
2. Click operation buttons (`+`, `-`, `×`, `÷`) to add operations
3. Use `(` and `)` buttons to group operations with parentheses
4. Chain multiple operations together (e.g., `2+3×4` will correctly calculate as 14)
5. Click `=` to evaluate the expression and see the result
6. Click `C` to clear and start over

### Examples:
- Simple: `5 + 3 = 8`
- Order of operations: `2 + 3 × 4 = 14` (multiplication first)
- With parentheses: `(2 + 3) × 4 = 20` (parentheses first)
- Complex: `(10 + 5) ÷ 3 - 2 = 3`

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
