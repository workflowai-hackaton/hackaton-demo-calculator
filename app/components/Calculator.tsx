'use client';

import { useState } from 'react';

export default function Calculator() {
    const [expression, setExpression] = useState('');
    const [display, setDisplay] = useState('0');
    const [lastResult, setLastResult] = useState<number | null>(null);

    const handleNumberClick = (num: string) => {
        if (display === '0' || lastResult !== null) {
            setDisplay(num);
            setExpression(lastResult !== null ? num : expression + num);
            setLastResult(null);
        } else {
            setDisplay(display + num);
            setExpression(expression + num);
        }
    };

    const handleOperationClick = (op: string) => {
        if (lastResult !== null) {
            setExpression(String(lastResult) + op);
            setLastResult(null);
        } else {
            setExpression(expression + op);
        }
        setDisplay('0');
    };

    const handleParenthesisClick = (paren: string) => {
        setExpression(expression + paren);
        setDisplay(display + paren);
    };

    const evaluateExpression = (expr: string): number => {
        // Remove spaces
        expr = expr.replace(/\s/g, '');
        
        // Validate parentheses
        let parenCount = 0;
        for (const char of expr) {
            if (char === '(') parenCount++;
            if (char === ')') parenCount--;
            if (parenCount < 0) throw new Error('Invalid parentheses');
        }
        if (parenCount !== 0) throw new Error('Unmatched parentheses');

        // Parse and evaluate with order of operations
        return parseExpression(expr);
    };

    const parseExpression = (expr: string): number => {
        // Handle addition and subtraction (lowest precedence)
        let pos = expr.length - 1;
        let parenDepth = 0;
        
        // Find rightmost + or - outside parentheses
        while (pos >= 0) {
            if (expr[pos] === ')') parenDepth++;
            if (expr[pos] === '(') parenDepth--;
            
            if (parenDepth === 0 && (expr[pos] === '+' || expr[pos] === '-')) {
                // Make sure it's not a unary minus at start or after operator
                if (pos > 0 && !'+-*/('.includes(expr[pos - 1])) {
                    const left = parseExpression(expr.substring(0, pos));
                    const right = parseTerm(expr.substring(pos + 1));
                    return expr[pos] === '+' ? left + right : left - right;
                }
            }
            pos--;
        }
        
        return parseTerm(expr);
    };

    const parseTerm = (expr: string): number => {
        // Handle multiplication and division (higher precedence)
        let pos = expr.length - 1;
        let parenDepth = 0;
        
        // Find rightmost * or / outside parentheses
        while (pos >= 0) {
            if (expr[pos] === ')') parenDepth++;
            if (expr[pos] === '(') parenDepth--;
            
            if (parenDepth === 0 && (expr[pos] === '*' || expr[pos] === '/')) {
                const left = parseTerm(expr.substring(0, pos));
                const right = parseFactor(expr.substring(pos + 1));
                return expr[pos] === '*' ? left * right : left / right;
            }
            pos--;
        }
        
        return parseFactor(expr);
    };

    const parseFactor = (expr: string): number => {
        // Handle parentheses and numbers
        if (expr.startsWith('(') && expr.endsWith(')')) {
            return parseExpression(expr.substring(1, expr.length - 1));
        }
        
        const num = parseFloat(expr);
        if (isNaN(num)) {
            throw new Error('Invalid expression');
        }
        return num;
    };

    const handleEquals = () => {
        try {
            if (expression === '') {
                setDisplay('0');
                return;
            }
            
            const result = evaluateExpression(expression);
            setDisplay(String(result));
            setLastResult(result);
            setExpression('');
        } catch (error) {
            setDisplay('Error');
            setExpression('');
            setLastResult(null);
        }
    };

    const handleClear = () => {
        setDisplay('0');
        setExpression('');
        setLastResult(null);
    };

    return (
        <div className="bg-gray-800 p-6 rounded-2xl shadow-2xl w-80">
            {/* Display */}
            <div className="bg-gray-900 text-white rounded-lg mb-4 p-4">
                <div className="text-sm text-gray-400 h-6 overflow-x-auto whitespace-nowrap">
                    {expression || '\u00A0'}
                </div>
                <div className="text-right text-4xl overflow-hidden">
                    {display}
                </div>
            </div>

            {/* Button Grid */}
            <div className="grid grid-cols-4 gap-3">
                {/* Clear button */}
                <button
                    onClick={handleClear}
                    className="col-span-2 bg-red-500 hover:bg-red-600 text-white text-xl font-semibold py-4 rounded-lg transition-colors"
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

                {/* Number buttons 7-9 */}
                {[7, 8, 9].map((num) => (
                    <button
                        key={num}
                        onClick={() => handleNumberClick(String(num))}
                        className="bg-blue-500 hover:bg-blue-600 text-white text-2xl font-semibold py-4 rounded-lg transition-colors"
                    >
                        {num}
                    </button>
                ))}

                {/* Division button */}
                <button
                    onClick={() => handleOperationClick('/')}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-2xl font-semibold py-4 rounded-lg transition-colors"
                >
                    ÷
                </button>

                {/* Number buttons 4-6 */}
                {[4, 5, 6].map((num) => (
                    <button
                        key={num}
                        onClick={() => handleNumberClick(String(num))}
                        className="bg-blue-500 hover:bg-blue-600 text-white text-2xl font-semibold py-4 rounded-lg transition-colors"
                    >
                        {num}
                    </button>
                ))}

                {/* Multiplication button */}
                <button
                    onClick={() => handleOperationClick('*')}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-2xl font-semibold py-4 rounded-lg transition-colors"
                >
                    ×
                </button>

                {/* Number buttons 1-3 */}
                {[1, 2, 3].map((num) => (
                    <button
                        key={num}
                        onClick={() => handleNumberClick(String(num))}
                        className="bg-blue-500 hover:bg-blue-600 text-white text-2xl font-semibold py-4 rounded-lg transition-colors"
                    >
                        {num}
                    </button>
                ))}

                {/* Minus button */}
                <button
                    onClick={() => handleOperationClick('-')}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-2xl font-semibold py-4 rounded-lg transition-colors"
                >
                    -
                </button>

                {/* Number 0 button */}
                <button
                    onClick={() => handleNumberClick('0')}
                    className="col-span-2 bg-blue-500 hover:bg-blue-600 text-white text-2xl font-semibold py-4 rounded-lg transition-colors"
                >
                    0
                </button>

                {/* Plus button */}
                <button
                    onClick={() => handleOperationClick('+')}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-2xl font-semibold py-4 rounded-lg transition-colors"
                >
                    +
                </button>

                {/* Equals button */}
                <button
                    onClick={handleEquals}
                    className="bg-green-500 hover:bg-green-600 text-white text-2xl font-semibold py-4 rounded-lg transition-colors"
                >
                    =
                </button>
            </div>
        </div>
    );
}
