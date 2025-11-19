'use client';

import { useState } from 'react';

interface Story {
  title: string;
  description: string;
  acceptanceCriteria: string[];
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AIWorkspace() {
  const [initiative, setInitiative] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [generatedStory, setGeneratedStory] = useState<Story | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [jiraIssueUrl, setJiraIssueUrl] = useState<string | null>(null);

  const handleInitiativeSubmit = () => {
    if (!initiative.trim()) return;
    
    const userMessage: ChatMessage = {
      role: 'user',
      content: initiative,
      timestamp: new Date()
    };
    
    setMessages([userMessage]);
    setInitiative('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        role: 'assistant',
        content: `I'll help you evolve the requirements for "${initiative}". Let's break this down into structured acceptance criteria. What specific outcomes do you want to achieve?`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const handleChatSubmit = () => {
    if (!currentMessage.trim()) return;
    
    const userMessage: ChatMessage = {
      role: 'user',
      content: currentMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    
    // Simulate AI response with story generation
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        role: 'assistant',
        content: 'Based on our conversation, I\'ve generated a structured story for you.',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      // Generate example story
      const story: Story = {
        title: 'Chat-First AI Workspace Integration',
        description: 'As a hackathon squad lead, I want a chat-first workspace so we can evolve requirements with AI before pushing a Jira card.',
        acceptanceCriteria: [
          'Given a squad inputs an initiative, when the AI session finishes, then a structured story (title, description, AC) is generated.',
          'Given acceptance criteria are approved, when Create in Jira runs, then the issue is created with transcript links.',
          'Given the Jira issue exists, when Copilot is triggered, then branch context references the generated acceptance criteria.'
        ]
      };
      
      setGeneratedStory(story);
    }, 1500);
  };

  const handleCreateJiraIssue = () => {
    if (!generatedStory) return;
    
    setIsLoading(true);
    
    // Simulate Jira API call
    setTimeout(() => {
      const mockJiraUrl = `https://your-org.atlassian.net/browse/HACK-${Math.floor(Math.random() * 1000)}`;
      setJiraIssueUrl(mockJiraUrl);
      setIsLoading(false);
    }, 2000);
  };

  const handleTriggerCopilot = () => {
    if (!jiraIssueUrl) return;
    
    // Simulate Copilot trigger with branch context
    alert('Copilot triggered! Branch context now references the generated acceptance criteria from this AI session.');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">AI Workspace</h1>
        <p className="text-gray-300">Chat-first requirement evolution with Jira integration</p>
      </div>

      {/* Initiative Input */}
      {messages.length === 0 && (
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Start with your initiative</h2>
          <div className="space-y-4">
            <textarea
              value={initiative}
              onChange={(e) => setInitiative(e.target.value)}
              placeholder="Describe your hackathon initiative..."
              className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none resize-none"
              rows={3}
            />
            <button
              onClick={handleInitiativeSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Start AI Session
            </button>
          </div>
        </div>
      )}

      {/* Chat Interface */}
      {messages.length > 0 && (
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">AI Conversation</h2>
          
          {/* Messages */}
          <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white ml-12'
                    : 'bg-gray-700 text-gray-100 mr-12'
                }`}
              >
                <div className="text-sm opacity-75 mb-1">
                  {message.role === 'user' ? 'You' : 'AI Assistant'} - {message.timestamp.toLocaleTimeString()}
                </div>
                {message.content}
              </div>
            ))}
          </div>
          
          {/* Chat Input */}
          {!generatedStory && (
            <div className="flex space-x-2">
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
                placeholder="Continue the conversation..."
                className="flex-1 p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
              />
              <button
                onClick={handleChatSubmit}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Send
              </button>
            </div>
          )}
        </div>
      )}

      {/* Generated Story */}
      {generatedStory && (
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Generated Story</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-blue-400 mb-2">Title</h3>
              <p className="text-white bg-gray-700 p-3 rounded">{generatedStory.title}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-blue-400 mb-2">Description</h3>
              <p className="text-white bg-gray-700 p-3 rounded">{generatedStory.description}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-blue-400 mb-2">Acceptance Criteria</h3>
              <ul className="space-y-2">
                {generatedStory.acceptanceCriteria.map((criteria, index) => (
                  <li key={index} className="text-white bg-gray-700 p-3 rounded">
                    {index + 1}. {criteria}
                  </li>
                ))}
              </ul>
            </div>
            
            {!jiraIssueUrl && (
              <button
                onClick={handleCreateJiraIssue}
                disabled={isLoading}
                className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                {isLoading ? 'Creating in Jira...' : 'Create in Jira'}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Jira Integration */}
      {jiraIssueUrl && (
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Jira Integration</h2>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-green-400">✓</span>
              <span className="text-white">Issue created in Jira:</span>
              <a
                href={jiraIssueUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                {jiraIssueUrl}
              </a>
            </div>
            
            <div className="text-sm text-gray-300">
              Transcript links have been attached to the Jira issue for full context.
            </div>
            
            <button
              onClick={handleTriggerCopilot}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Trigger Copilot
            </button>
          </div>
        </div>
      )}
    </div>
  );
}