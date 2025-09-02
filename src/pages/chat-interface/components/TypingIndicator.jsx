import React from 'react';
import Icon from '../../../components/AppIcon';

const TypingIndicator = ({ isVisible, userName = "EcoTracker" }) => {
  if (!isVisible) return null;

  return (
    <div className="flex justify-start mb-4">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
          <Icon name="Bot" size={16} color="white" />
        </div>
        
        <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3 shadow-environmental">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div 
                className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" 
                style={{ animationDelay: '0ms', animationDuration: '1.4s' }}
              />
              <div 
                className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" 
                style={{ animationDelay: '0.2s', animationDuration: '1.4s' }}
              />
              <div 
                className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" 
                style={{ animationDelay: '0.4s', animationDuration: '1.4s' }}
              />
            </div>
            <span className="text-xs text-muted-foreground ml-2">
              {userName} is analyzing...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;