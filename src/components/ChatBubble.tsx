import React from 'react';
import { User, Bot } from 'lucide-react';
import { ChatMessage } from '../types';

interface ChatBubbleProps {
  message: ChatMessage;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex items-start space-x-3 ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      <div className={`
        flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0
        ${message.isUser ? 'bg-blue-500' : 'bg-teal-500'}
      `}>
        {message.isUser ? (
          <User className="w-4 h-4 text-white" />
        ) : (
          <Bot className="w-4 h-4 text-white" />
        )}
      </div>
      
      <div className={`
        max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm
        ${message.isUser 
          ? 'bg-blue-500 text-white rounded-tr-sm' 
          : 'bg-white text-gray-800 rounded-tl-sm border border-gray-100'
        }
      `}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>
        <p className={`
          text-xs mt-2 opacity-70
          ${message.isUser ? 'text-blue-100' : 'text-gray-500'}
        `}>
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
};