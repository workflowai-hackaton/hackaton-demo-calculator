'use client';

import { useState } from 'react';
import Calculator from './components/Calculator';
import AIWorkspace from './components/AIWorkspace';
import Navigation from './components/Navigation';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'calculator' | 'workspace'>('calculator');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Danny's Team Library
          </h1>
          <p className="text-xl text-white/80 drop-shadow">
            Hackathon Calculator & AI Workspace
          </p>
        </div>
        
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="flex justify-center">
          {activeTab === 'calculator' ? (
            <Calculator />
          ) : (
            <AIWorkspace />
          )}
        </div>
      </div>
    </div>
  );
}
