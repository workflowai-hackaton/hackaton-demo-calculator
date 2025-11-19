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

    const handleDecimalClick = () => {
        if (lastResult !== null) {
            setDisplay('0.');
            setExpression('0.');
            setLastResult(null);
        } else if (!display.split(/[\+\-\*\/\(\)]/).pop()?.includes('.')) {
            setDisplay(display + '.');
            setExpression(expression + '.');
        }
    };

    const handleOperationClick = (op: string) => {
        if (lastResult !== null) {
            setExpression(String(lastResult) + op);
            setDisplay(String(lastResult) + op);
            setLastResult(null);
        } else {
            const lastChar = expression.slice(-1);
            if (['+', '-', '*', '/'].includes(lastChar)) {
                setExpression(expression.slice(0, -1) + op);
                setDisplay(op);
            } else {
                setExpression(expression + op);
                setDisplay(op);
            }
        }
    };

    const handleParenthesisClick = (paren: string) => {
        if (lastResult !== null && paren === '(') {
            setExpression('(');
            setDisplay('(');
            setLastResult(null);
        } else {
            setExpression(expression + paren);
            setDisplay(display + paren);
        }
    };

    const evaluateExpression = (expr: string): number => {
        try {
            const sanitized = expr.replace(/[^0-9+\-*/().\s]/g, '');
            if (!sanitized) return 0;
            
            const result = Function('"use strict"; return (' + sanitized + ')')();
            return typeof result === 'number' && isFinite(result) ? result : 0;
        } catch {
            return 0;
        }
    };

    const handleEquals = () => {
        if (expression) {
            const result = evaluateExpression(expression);
            const formattedResult = Number.isInteger(result) ? result : parseFloat(result.toFixed(8));
            setDisplay(String(formattedResult));
            setLastResult(formattedResult);
            setExpression('');
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
            <div className="bg-gray-900 text-white text-right p-4 rounded-lg mb-4">
                <div className="text-sm text-gray-400 h-6 overflow-x-auto whitespace-nowrap">
                    {expression || '\u00A0'}
                </div>
                <div className="text-4xl overflow-x-auto whitespace-nowrap">
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

                {/* Parenthesis buttons */}
                <button
                    onClick={() => handleParenthesisClick('(')}
                    className="bg-gray-700 hover:bg-gray-600 text-white text-2xl font-semibold py-4 rounded-lg transition-colors"
                >
                    (
                </button>

                <button
                    onClick={() => handleParenthesisClick(')')}
                    className="bg-gray-700 hover:bg-gray-600 text-white text-2xl font-semibold py-4 rounded-lg transition-colors"
                >
                    )
                </button>

                {/* Divide button */}
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

                {/* Number 0 button */}
                <button
                    onClick={() => handleNumberClick('0')}
                    className="col-span-2 bg-gray-600 hover:bg-gray-700 text-white text-2xl font-semibold py-4 rounded-lg transition-colors"
                >
                    0
                </button>

                {/* Decimal button */}
                <button
                    onClick={handleDecimalClick}
                    className="bg-gray-600 hover:bg-gray-700 text-white text-2xl font-semibold py-4 rounded-lg transition-colors"
                >
                    .
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
