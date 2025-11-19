'use client';

interface NavigationProps {
  activeTab: 'calculator' | 'workspace';
  onTabChange: (tab: 'calculator' | 'workspace') => void;
}

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <div className="flex justify-center mb-8">
      <div className="bg-gray-800 rounded-lg p-1 flex space-x-1">
        <button
          onClick={() => onTabChange('calculator')}
          className={`px-6 py-2 rounded-lg transition-colors ${
            activeTab === 'calculator'
              ? 'bg-blue-500 text-white'
              : 'text-gray-300 hover:text-white'
          }`}
        >
          Calculator
        </button>
        <button
          onClick={() => onTabChange('workspace')}
          className={`px-6 py-2 rounded-lg transition-colors ${
            activeTab === 'workspace'
              ? 'bg-purple-500 text-white'
              : 'text-gray-300 hover:text-white'
          }`}
        >
          AI Workspace
        </button>
      </div>
    </div>
  );
}