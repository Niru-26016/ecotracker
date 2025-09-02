import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatHeader = ({ 
  conversationTitle, 
  participantCount, 
  workflowStatus, 
  onToggleSidebar, 
  onExportChat,
  onClearChat,
  isOnline 
}) => {
  const navigate = useNavigate();

  const getStatusColor = () => {
    switch (workflowStatus) {
      case 'active': return 'text-success';
      case 'processing': return 'text-warning';
      case 'error': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusText = () => {
    switch (workflowStatus) {
      case 'active': return 'Workflow Active';
      case 'processing': return 'Processing...';
      case 'error': return 'Connection Error';
      default: return 'Workflow Idle';
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-border bg-surface">
      {/* Left Section */}
      <div className="flex items-center space-x-3">
        {/* Mobile Sidebar Toggle */}
        <Button
          variant="ghost"
          size="sm"
          iconName="Menu"
          onClick={onToggleSidebar}
          className="w-9 h-9 lg:hidden"
        />

        {/* Back Button - Mobile */}
        <Button
          variant="ghost"
          size="sm"
          iconName="ArrowLeft"
          onClick={() => navigate('/dashboard')}
          className="w-9 h-9 md:hidden"
        />

        {/* Conversation Info */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
            <Icon name="Bot" size={20} color="white" />
          </div>
          
          <div>
            <h1 className="text-lg font-semibold text-foreground truncate max-w-[200px] md:max-w-none">
              {conversationTitle}
            </h1>
            <div className="flex items-center space-x-2 text-sm">
              <div className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${
                  isOnline ? 'bg-success' : 'bg-muted-foreground'
                }`} />
                <span className="text-muted-foreground">
                  {isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
              
              <span className="text-muted-foreground">•</span>
              
              <div className="flex items-center space-x-1">
                <Icon name="Activity" size={12} className={getStatusColor()} />
                <span className={`text-xs ${getStatusColor()}`}>
                  {getStatusText()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-2">
        {/* Search */}
        <Button
          variant="ghost"
          size="sm"
          iconName="Search"
          className="w-9 h-9 hidden md:flex"
        />

        {/* Export Chat */}
        <Button
          variant="ghost"
          size="sm"
          iconName="Download"
          onClick={onExportChat}
          className="w-9 h-9 hidden md:flex"
        />

        {/* More Options */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            iconName="MoreVertical"
            className="w-9 h-9"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;