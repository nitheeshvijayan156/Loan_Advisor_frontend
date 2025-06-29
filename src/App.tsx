import React, { useState } from 'react';
import { MessageSquare, FileText } from 'lucide-react';
import { ChatWindow } from './components/ChatWindow';
import { FormMode } from './components/FormMode';

function App() {
  const [isFormMode, setIsFormMode] = useState(false);

  const toggleMode = () => {
    setIsFormMode(!isFormMode);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header with Toggle */}
      <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
              {isFormMode ? (
                <FileText className="w-5 h-5 text-white" />
              ) : (
                <MessageSquare className="w-5 h-5 text-white" />
              )}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                {isFormMode ? 'Loan Application Form' : 'Loan Advisor Chatbot'}
              </h1>
              <p className="text-sm text-gray-600">
                {isFormMode 
                  ? 'Complete the form to get instant loan recommendations' 
                  : 'Chat with our AI advisor for personalized loan guidance'
                }
              </p>
            </div>
          </div>

          <button
            onClick={toggleMode}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg hover:from-blue-600 hover:to-teal-600 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            {isFormMode ? (
              <>
                <MessageSquare className="w-4 h-4" />
                <span>Back to Chat 💬</span>
              </>
            ) : (
              <>
                <FileText className="w-4 h-4" />
                <span>Use Form 📝</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {isFormMode ? <FormMode /> : <ChatWindow />}
      </div>
    </div>
  );
}

export default App;