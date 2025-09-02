import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatActivitySummary = () => {
  const navigate = useNavigate();

  const recentActivities = [
    {
      id: 1,
      type: 'transportation',
      message: "Logged 25 miles of driving to work",
      emissions: 12.5,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      status: 'processed'
    },
    {
      id: 2,
      type: 'energy',
      message: "Updated monthly electricity usage: 450 kWh",
      emissions: 225.0,
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      status: 'processed'
    },
    {
      id: 3,
      type: 'consumption',
      message: "Added grocery shopping trip",
      emissions: 8.3,
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      status: 'processing'
    },
    {
      id: 4,
      type: 'transportation',
      message: "Flight booking: NYC to LA roundtrip",
      emissions: 1250.0,
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      status: 'processed'
    }
  ];

  const workflowStatus = {
    active: 2,
    completed: 15,
    failed: 0
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'transportation': return 'Car';
      case 'energy': return 'Zap';
      case 'consumption': return 'ShoppingBag';
      default: return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'transportation': return 'text-accent';
      case 'energy': return 'text-success';
      case 'consumption': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-environmental">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Recent Chat Activity</h3>
          <p className="text-sm text-muted-foreground">Latest workflow interactions</p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          iconName="MessageSquare"
          onClick={() => navigate('/chat-interface')}
        >
          Open Chat
        </Button>
      </div>
      {/* Workflow Status */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="flex items-center justify-center w-8 h-8 bg-warning/10 rounded-lg mx-auto mb-2">
            <Icon name="Clock" size={16} className="text-warning" />
          </div>
          <div className="text-lg font-bold text-foreground">{workflowStatus?.active}</div>
          <div className="text-xs text-muted-foreground">Active</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-8 h-8 bg-success/10 rounded-lg mx-auto mb-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
          </div>
          <div className="text-lg font-bold text-foreground">{workflowStatus?.completed}</div>
          <div className="text-xs text-muted-foreground">Completed</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-8 h-8 bg-error/10 rounded-lg mx-auto mb-2">
            <Icon name="XCircle" size={16} className="text-error" />
          </div>
          <div className="text-lg font-bold text-foreground">{workflowStatus?.failed}</div>
          <div className="text-xs text-muted-foreground">Failed</div>
        </div>
      </div>
      {/* Recent Activities */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-foreground mb-3">Recent Activities</h4>
        {recentActivities?.map((activity) => (
          <div key={activity?.id} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
            <div className={`flex items-center justify-center w-8 h-8 rounded-lg bg-muted ${getActivityColor(activity?.type)}`}>
              <Icon name={getActivityIcon(activity?.type)} size={16} />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground font-medium truncate">
                {activity?.message}
              </p>
              <div className="flex items-center justify-between mt-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground">
                    {formatTimestamp(activity?.timestamp)}
                  </span>
                  <div className={`flex items-center space-x-1 ${
                    activity?.status === 'processed' ? 'text-success' : 'text-warning'
                  }`}>
                    <Icon 
                      name={activity?.status === 'processed' ? 'CheckCircle' : 'Clock'} 
                      size={12} 
                    />
                    <span className="text-xs capitalize">{activity?.status}</span>
                  </div>
                </div>
                <span className="text-xs font-medium text-foreground">
                  +{activity?.emissions} kg CO₂
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            iconName="Plus"
            onClick={() => navigate('/activity-logging')}
            fullWidth
          >
            Log Activity
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            iconName="BarChart3"
            onClick={() => navigate('/reports-analytics')}
            fullWidth
          >
            View Reports
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatActivitySummary;