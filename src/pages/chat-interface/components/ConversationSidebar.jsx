import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConversationSidebar = ({ conversations, activeConversationId, onSelectConversation, onNewConversation, workflowStatus, isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = conversations?.filter(conv =>
    conv?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    conv?.lastMessage?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const formatDate = (date) => {
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return date?.toLocaleDateString();
  };

  const getWorkflowStatusIcon = () => {
    switch (workflowStatus) {
      case 'active': return { icon: 'Activity', color: 'text-success' };
      case 'processing': return { icon: 'Loader2', color: 'text-warning animate-spin' };
      case 'error': return { icon: 'AlertCircle', color: 'text-error' };
      default: return { icon: 'Circle', color: 'text-muted-foreground' };
    }
  };

  const statusInfo = getWorkflowStatusIcon();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-80 bg-surface border-r border-border transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col h-full
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Conversations</h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="Plus"
              onClick={onNewConversation}
              className="w-8 h-8"
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onClose}
              className="w-8 h-8 lg:hidden"
            />
          </div>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Workflow Status */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
            <Icon 
              name={statusInfo?.icon} 
              size={16} 
              className={statusInfo?.color} 
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Workflow Status</p>
              <p className="text-xs text-muted-foreground capitalize">
                {workflowStatus === 'active' ? 'Connected & Active' :
                 workflowStatus === 'processing' ? 'Processing Request' :
                 workflowStatus === 'error'? 'Connection Error' : 'Idle'}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-b border-border">
          <h3 className="text-sm font-medium text-foreground mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full flex items-center space-x-3 p-2 text-left hover:bg-muted rounded-lg transition-environmental">
              <Icon name="Calculator" size={16} className="text-primary" />
              <span className="text-sm text-foreground">Calculate Emissions</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-2 text-left hover:bg-muted rounded-lg transition-environmental">
              <Icon name="TrendingUp" size={16} className="text-secondary" />
              <span className="text-sm text-foreground">View Trends</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-2 text-left hover:bg-muted rounded-lg transition-environmental">
              <Icon name="Download" size={16} className="text-accent" />
              <span className="text-sm text-foreground">Export Data</span>
            </button>
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-sm font-medium text-foreground mb-3">Recent Chats</h3>
            {filteredConversations?.length === 0 ? (
              <div className="text-center py-8">
                <Icon name="MessageSquare" size={48} className="mx-auto text-muted-foreground mb-3" />
                <p className="text-sm text-muted-foreground">No conversations found</p>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Plus"
                  onClick={onNewConversation}
                  className="mt-3"
                >
                  Start New Chat
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredConversations?.map((conversation) => (
                  <button
                    key={conversation?.id}
                    onClick={() => onSelectConversation(conversation?.id)}
                    className={`w-full p-3 text-left rounded-lg transition-environmental ${
                      activeConversationId === conversation?.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="text-sm font-medium truncate flex-1 mr-2">
                        {conversation?.title}
                      </h4>
                      {conversation?.unreadCount > 0 && (
                        <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full">
                          {conversation?.unreadCount}
                        </span>
                      )}
                    </div>
                    <p className="text-xs opacity-80 truncate mb-2">
                      {conversation?.lastMessage}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs opacity-60">
                        {formatDate(conversation?.lastActivity)}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Icon name="MessageSquare" size={12} className="opacity-60" />
                        <span className="text-xs opacity-60">{conversation?.messageCount}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <div className="text-xs text-muted-foreground text-center">
            <p>Connected to n8n workflows</p>
            <p className="mt-1">Last sync: {new Date()?.toLocaleTimeString()}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConversationSidebar;