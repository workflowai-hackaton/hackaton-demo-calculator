'use client';

import { useState } from 'react';

export default function Calculator() {
    const [expression, setExpression] = useState('');
    const [display, setDisplay] = useState('0');

    const handleNumberClick = (num: string) => {
        if (display === '0' && expression === '') {
            setDisplay(num);
        } else if (display === '0' || ['+', '-', '*', '/', '('].includes(display[display.length - 1])) {
            setDisplay(display + num);
        } else {
            setDisplay(display + num);
        }
    };

    const handleOperationClick = (op: string) => {
        const lastChar = display[display.length - 1];
        
        // If last character is already an operator (except closing parenthesis), replace it
        if (['+', '-', '*', '/'].includes(lastChar)) {
            setDisplay(display.slice(0, -1) + op);
        } else if (display !== '0' && display !== '') {
            setDisplay(display + op);
        }
    };

    const handleParenthesisClick = (paren: '(' | ')') => {
        if (paren === '(') {
            // Allow opening parenthesis after operators or at the start
            const lastChar = display[display.length - 1];
            if (display === '0' || display === '') {
                setDisplay('(');
            } else if (['+', '-', '*', '/', '('].includes(lastChar)) {
                setDisplay(display + '(');
            }
        } else {
            // Allow closing parenthesis only if there are matching opening ones
            const openCount = (display.match(/\(/g) || []).length;
            const closeCount = (display.match(/\)/g) || []).length;
            const lastChar = display[display.length - 1];
            
            if (openCount > closeCount && !['+', '-', '*', '/', '('].includes(lastChar)) {
                setDisplay(display + ')');
            }
        }
    };

    const evaluateExpression = (expr: string): number => {
        // Remove any leading/trailing whitespace
        expr = expr.trim();
        
        // Handle empty or just zero
        if (!expr || expr === '0') return 0;
        
        // Remove trailing operators
        while (expr.length > 0 && ['+', '-', '*', '/'].includes(expr[expr.length - 1])) {
            expr = expr.slice(0, -1);
        }
        
        try {
            // Tokenize the expression
            const tokens = tokenize(expr);
            
            // Convert to postfix notation (Reverse Polish Notation)
            const postfix = infixToPostfix(tokens);
            
            // Evaluate the postfix expression
            return evaluatePostfix(postfix);
        } catch {
            throw new Error('Invalid expression');
        }
    };

    const tokenize = (expr: string): string[] => {
        const tokens: string[] = [];
        let currentNumber = '';
        
        for (let i = 0; i < expr.length; i++) {
            const char = expr[i];
            
            if (char >= '0' && char <= '9' || char === '.') {
                currentNumber += char;
            } else if (['+', '-', '*', '/', '(', ')'].includes(char)) {
                if (currentNumber) {
                    tokens.push(currentNumber);
                    currentNumber = '';
                }
                tokens.push(char);
            }
        }
        
        if (currentNumber) {
            tokens.push(currentNumber);
        }
        
        return tokens;
    };

    const getPrecedence = (op: string): number => {
        if (op === '+' || op === '-') return 1;
        if (op === '*' || op === '/') return 2;
        return 0;
    };

    const infixToPostfix = (tokens: string[]): string[] => {
        const output: string[] = [];
        const operators: string[] = [];
        
        for (const token of tokens) {
            if (!isNaN(parseFloat(token))) {
                // It's a number
                output.push(token);
            } else if (token === '(') {
                operators.push(token);
            } else if (token === ')') {
                // Pop operators until we find the matching '('
                while (operators.length > 0 && operators[operators.length - 1] !== '(') {
                    output.push(operators.pop()!);
                }
                operators.pop(); // Remove the '('
            } else if (['+', '-', '*', '/'].includes(token)) {
                // Pop operators with higher or equal precedence
                while (
                    operators.length > 0 &&
                    operators[operators.length - 1] !== '(' &&
                    getPrecedence(operators[operators.length - 1]) >= getPrecedence(token)
                ) {
                    output.push(operators.pop()!);
                }
                operators.push(token);
            }
        }
        
        // Pop remaining operators
        while (operators.length > 0) {
            output.push(operators.pop()!);
        }
        
        return output;
    };

    const evaluatePostfix = (postfix: string[]): number => {
        const stack: number[] = [];
        
        for (const token of postfix) {
            if (!isNaN(parseFloat(token))) {
                stack.push(parseFloat(token));
            } else {
                const b = stack.pop()!;
                const a = stack.pop()!;
                
                switch (token) {
                    case '+':
                        stack.push(a + b);
                        break;
                    case '-':
                        stack.push(a - b);
                        break;
                    case '*':
                        stack.push(a * b);
                        break;
                    case '/':
                        if (b === 0) throw new Error('Division by zero');
                        stack.push(a / b);
                        break;
                }
            }
        }
        
        return stack[0];
    };

    const handleEquals = () => {
        if (display && display !== '0') {
            try {
                const result = evaluateExpression(display);
                setExpression(display);
                setDisplay(String(result));
            } catch {
                setDisplay('Error');
                setTimeout(() => {
                    setDisplay('0');
                    setExpression('');
                }, 1500);
            }
        }
    };

    const handleClear = () => {
        setDisplay('0');
        setExpression('');
    };

    return (
        <div className="bg-gray-800 p-6 rounded-2xl shadow-2xl w-80">
            {/* Display - showing previous expression if exists */}
            <div className="bg-gray-900 rounded-lg mb-4 p-4">
                {expression && (
                    <div className="text-gray-400 text-right text-sm mb-1 overflow-hidden">
                        {expression}
                    </div>
                )}
                <div className="text-white text-right text-4xl overflow-hidden">
                    {display}
                </div>
            </div>

            {/* Button Grid */}
            <div className="grid grid-cols-4 gap-3">
                {/* Clear button */}
                <button
                    onClick={handleClear}
                    className="bg-red-500 hover:bg-red-600 text-white text-xl font-semibold py-4 rounded-lg transition-colors"
                >
                    C
                </button>

                {/* Parentheses buttons */}
                <button
                    onClick={() => handleParenthesisClick('(')}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-2xl font-semibold py-4 rounded-lg transition-colors"
                >
                    (
                </button>

                <button
                    onClick={() => handleParenthesisClick(')')}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-2xl font-semibold py-4 rounded-lg transition-colors"
                >
                    )
                </button>

                {/* Division button */}
                <button
                    onClick={() => handleOperationClick('/')}
                    className="bg-orange-500 hover:bg-orange-600 text-white text-2xl font-semibold py-4 rounded-lg transition-colors"
                >
                    ÷
                </button>

                {/* Number buttons 7-9 */}
                {[7, 8, 9].map((num) => (
                    <button
                        key={num}
                        onClick={() => handleNumberClick(String(num))}
                        className="bg-gray-600 hover:bg-gray-700 text-white text-2xl font-semibold py-4 rounded-lg transition-colors"
                    >
                        {num}
                    </button>
                ))}

                {/* Multiply button */}
                <button
                    onClick={() => handleOperationClick('*')}
                    className="bg-orange-500 hover:bg-orange-600 text-white text-2xl font-semibold py-4 rounded-lg transition-colors"
                >
                    ×
                </button>

                {/* Number buttons 4-6 */}
                {[4, 5, 6].map((num) => (
                    <button
                        key={num}
                        onClick={() => handleNumberClick(String(num))}
                        className="bg-gray-600 hover:bg-gray-700 text-white text-2xl font-semibold py-4 rounded-lg transition-colors"
                    >
                        {num}
                    </button>
                ))}

                {/* Minus button */}
                <button
                    onClick={() => handleOperationClick('-')}
                    className="bg-orange-500 hover:bg-orange-600 text-white text-2xl font-semibold py-4 rounded-lg transition-colors"
                >
                    -
                </button>

                {/* Number buttons 1-3 */}
                {[1, 2, 3].map((num) => (
                    <button
                        key={num}
                        onClick={() => handleNumberClick(String(num))}
                        className="bg-gray-600 hover:bg-gray-700 text-white text-2xl font-semibold py-4 rounded-lg transition-colors"
                    >
                        {num}
                    </button>
                ))}

                {/* Plus button */}
                <button
                    onClick={() => handleOperationClick('+')}
                    className="bg-orange-500 hover:bg-orange-600 text-white text-2xl font-semibold py-4 rounded-lg transition-colors"
                >
                    +
                </button>

                {/* Number 0 button - spans 2 columns */}
                <button
                    onClick={() => handleNumberClick('0')}
                    className="col-span-2 bg-gray-600 hover:bg-gray-700 text-white text-2xl font-semibold py-4 rounded-lg transition-colors"
                >
                    0
                </button>

                {/* Equals button */}
                <button
                    onClick={handleEquals}
                    className="col-span-2 bg-green-500 hover:bg-green-600 text-white text-2xl font-semibold py-4 rounded-lg transition-colors"
                >
                    =
                </button>
            </div>
        </div>
    );
}
