import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MessageBubble = ({ message, isUser, timestamp, onRetry }) => {
  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })?.format(date);
  };

  const renderContent = () => {
    if (message?.type === 'text') {
      return <p className="text-sm leading-relaxed">{message?.content}</p>;
    }
    
    if (message?.type === 'data') {
      return (
        <div className="space-y-3">
          <p className="text-sm leading-relaxed">{message?.content}</p>
          {message?.data && (
            <div className="bg-muted rounded-lg p-3 border">
              <div className="grid grid-cols-1 gap-2 text-xs">
                {Object.entries(message?.data)?.map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-1">
                    <span className="text-muted-foreground font-medium">{key}:</span>
                    <span className="font-semibold text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Add n8n attribution for emission data */}
          {message?.content?.includes('n8n') && (
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Icon name="Zap" size={12} />
              <span>Powered by n8n + Google Gemini</span>
            </div>
          )}
        </div>
      );
    }
    
    if (message?.type === 'error') {
      return (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-error" />
            <p className="text-sm text-error">{message?.content}</p>
          </div>
          {onRetry && (
            <Button
              variant="outline"
              size="sm"
              iconName="RefreshCw"
              onClick={() => onRetry(message?.id)}
            >
              Retry
            </Button>
          )}
        </div>
      );
    }
    
    if (message?.type === 'action') {
      return (
        <div className="space-y-3">
          <p className="text-sm leading-relaxed">{message?.content}</p>
          {message?.actions && (
            <div className="flex flex-wrap gap-2">
              {message?.actions?.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  iconName={action?.icon}
                  onClick={() => action?.onClick()}
                  className="bg-primary/5 hover:bg-primary/10"
                >
                  {action?.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      );
    }
    
    return <p className="text-sm leading-relaxed">{message?.content}</p>;
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[80%] md:max-w-[70%] ${isUser ? 'order-2' : 'order-1'}`}>
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? 'bg-primary text-primary-foreground rounded-br-md'
              : 'bg-card border border-border rounded-bl-md shadow-environmental'
          }`}
        >
          {renderContent()}
        </div>
        <div className={`flex items-center mt-1 px-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
          <span className="text-xs text-muted-foreground">
            {formatTime(timestamp)}
          </span>
          {message?.status === 'sending' && isUser && (
            <Icon name="Clock" size={12} className="ml-1 text-muted-foreground" />
          )}
          {message?.status === 'sent' && isUser && (
            <Icon name="Check" size={12} className="ml-1 text-muted-foreground" />
          )}
          {message?.status === 'delivered' && isUser && (
            <Icon name="CheckCheck" size={12} className="ml-1 text-success" />
          )}
        </div>
      </div>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center ml-3 mt-1 flex-shrink-0">
          <Icon name="Bot" size={16} color="white" />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;