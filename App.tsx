import React, { useState } from 'react';
import { BrainCog } from 'lucide-react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import axios from 'axios';
import './index.css';


interface Message {
  text: string;
  isBot: boolean;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm InvestIQ, your investment assistant. How can I help you today?",
      isBot: true,
    },
  ]);

  

  const handleSendMessage = async (message: string) => {
    // Add user message
    setMessages((prev) => [...prev, { text: message, isBot: false }]);

    // Simulate bot response
    try {
      const response = await axios.post('https://890b-34-48-175-162.ngrok-free.app/chat', {
        prompt: message,
      });
      
      // Add bot response to chat
      setMessages((prev) => [
        ...prev,
        { text: response.data.response, isBot: true },
      ]);
    } catch(error){
      console.error('Error fetching bot response:', error);
    }
   
    
  }; 

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <BrainCog className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">InvestIQ</h1>
              <p className="text-gray-600">Your AI Assistant</p>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="h-[600px] overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                message={message.text}
                isBot={message.isBot}
              />
            ))}
          </div>
          
          {/* Input Area */}
          <div className="border-t p-4">
            { <ChatInput onSendMessage={handleSendMessage} /> }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;