import React, { useState, useRef } from 'react';

import Button from '../../../components/ui/Button';

const MessageInput = ({ onSendMessage, isTyping, disabled }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim() && !disabled) {
      onSendMessage(message?.trim());
      setMessage('');
      if (textareaRef?.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  const handleTextareaChange = (e) => {
    setMessage(e?.target?.value);
    
    // Auto-resize textarea
    if (textareaRef?.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef?.current?.scrollHeight, 120)}px`;
    }
  };

  const handleFileUpload = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      // Handle file upload logic here
      console.log('File selected:', file?.name);
      // Reset file input
      e.target.value = '';
    }
  };

  const quickCommands = [
    { label: 'Calculate emissions', command: '/calculate' },
    { label: 'Show trends', command: '/trends' },
    { label: 'Export data', command: '/export' },
    { label: 'Help', command: '/help' }
  ];

  const handleQuickCommand = (command) => {
    setMessage(command);
    textareaRef?.current?.focus();
  };

  return (
    <div className="border-t border-border bg-surface p-4">
      {/* Quick Commands */}
      <div className="mb-3 overflow-x-auto">
        <div className="flex space-x-2 pb-2">
          {quickCommands?.map((cmd, index) => (
            <button
              key={index}
              onClick={() => handleQuickCommand(cmd?.command)}
              className="flex-shrink-0 px-3 py-1 text-xs bg-muted text-muted-foreground rounded-full hover:bg-secondary hover:text-secondary-foreground transition-environmental"
            >
              {cmd?.label}
            </button>
          ))}
        </div>
      </div>
      {/* Typing Indicator */}
      {isTyping && (
        <div className="flex items-center space-x-2 mb-3 text-muted-foreground">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
          <span className="text-sm">EcoTracker is typing...</span>
        </div>
      )}
      {/* Message Input Form */}
      <form onSubmit={handleSubmit} className="flex items-end space-x-2">
        {/* File Upload */}
        <div className="flex-shrink-0">
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileUpload}
            className="hidden"
            accept=".csv,.xlsx,.pdf,.jpg,.png"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            iconName="Paperclip"
            onClick={() => fileInputRef?.current?.click()}
            disabled={disabled}
            className="w-10 h-10"
          />
        </div>

        {/* Text Input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            onKeyPress={handleKeyPress}
            placeholder="Ask about your carbon footprint, log activities, or get insights..."
            disabled={disabled}
            className="w-full min-h-[44px] max-h-[120px] px-4 py-3 pr-12 bg-input border border-border rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent placeholder:text-muted-foreground text-sm leading-relaxed"
            rows={1}
          />
          
          {/* Character Count */}
          {message?.length > 0 && (
            <div className="absolute bottom-1 right-12 text-xs text-muted-foreground">
              {message?.length}/1000
            </div>
          )}
        </div>

        {/* Voice Recording */}
        <div className="flex-shrink-0">
          <Button
            type="button"
            variant={isRecording ? "destructive" : "ghost"}
            size="sm"
            iconName={isRecording ? "MicOff" : "Mic"}
            onClick={() => setIsRecording(!isRecording)}
            disabled={disabled}
            className="w-10 h-10"
          />
        </div>

        {/* Send Button */}
        <div className="flex-shrink-0">
          <Button
            type="submit"
            variant="default"
            size="sm"
            iconName="Send"
            disabled={!message?.trim() || disabled}
            className="w-10 h-10"
          />
        </div>
      </form>
      {/* Input Hints */}
      <div className="mt-2 text-xs text-muted-foreground">
        <span>Press Enter to send, Shift+Enter for new line</span>
        <span className="mx-2">•</span>
        <span>Use / for quick commands</span>
      </div>
    </div>
  );
};

export default MessageInput;