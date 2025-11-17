'use client';

import { useState } from 'react';

export default function Calculator() {
    const [display, setDisplay] = useState('0');
    const [previousValue, setPreviousValue] = useState<number | null>(null);
    const [operation, setOperation] = useState<'+' | '-' | null>(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);

    const handleNumberClick = (num: string) => {
        if (waitingForOperand) {
            setDisplay(num);
            setWaitingForOperand(false);
        } else {
            setDisplay(display === '0' ? num : display + num);
        }
    };

    const handleOperationClick = (op: '+' | '-') => {
        const currentValue = parseFloat(display);

        if (previousValue === null) {
            setPreviousValue(currentValue);
        } else if (operation) {
            const newValue = performCalculation(previousValue, currentValue, operation);
            setDisplay(String(newValue));
            setPreviousValue(newValue);
        }

        setOperation(op);
        setWaitingForOperand(true);
    };

    const performCalculation = (prev: number, current: number, op: '+' | '-'): number => {
        switch (op) {
            case '+':
                return prev + current;
            case '-':
                return prev - current;
            default:
                return current;
        }
    };

    const handleEquals = () => {
        if (operation && previousValue !== null) {
            const currentValue = parseFloat(display);
            const result = performCalculation(previousValue, currentValue, operation);
            setDisplay(String(result));
            setPreviousValue(null);
            setOperation(null);
            setWaitingForOperand(true);
        }
    };

    const handleClear = () => {
        setDisplay('0');
        setPreviousValue(null);
        setOperation(null);
        setWaitingForOperand(false);
    };

    return (
        <div className="bg-gray-800 p-6 rounded-2xl shadow-2xl w-80">
            {/* Display */}
            <div className="bg-gray-900 text-white text-right text-4xl p-4 rounded-lg mb-4 overflow-hidden">
                {display}
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

                {/* Plus button */}
                <button
                    onClick={() => handleOperationClick('+')}
                    className="bg-orange-500 hover:bg-orange-600 text-white text-2xl font-semibold py-4 rounded-lg transition-colors"
                >
                    +
                </button>

                {/* Minus button */}
                <button
                    onClick={() => handleOperationClick('-')}
                    className="bg-orange-500 hover:bg-orange-600 text-white text-2xl font-semibold py-4 rounded-lg transition-colors"
                >
                    -
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

                {/* Placeholder for grid alignment */}
                <div></div>

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

                {/* Placeholder for grid alignment */}
                <div></div>

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

                {/* Placeholder for grid alignment */}
                <div></div>

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
