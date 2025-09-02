import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionPanel = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'chat',
      title: 'Start Chat Session',
      description: 'Begin automated data collection',
      icon: 'MessageSquare',
      color: 'primary',
      path: '/chat-interface',
      featured: true
    },
    {
      id: 'log',
      title: 'Log Activity',
      description: 'Manually track emissions',
      icon: 'Plus',
      color: 'secondary',
      path: '/activity-logging',
      featured: false
    },
    {
      id: 'reports',
      title: 'View Reports',
      description: 'Analyze your carbon data',
      icon: 'BarChart3',
      color: 'accent',
      path: '/reports-analytics',
      featured: false
    },
    {
      id: 'settings',
      title: 'Settings',
      description: 'Configure preferences',
      icon: 'Settings',
      color: 'muted',
      path: '/profile-settings',
      featured: false
    }
  ];

  const recentSuggestions = [
    {
      id: 1,
      title: "Switch to public transport",
      impact: "Save 15.2 kg CO₂/week",
      icon: 'Bus',
      type: 'transportation'
    },
    {
      id: 2,
      title: "Use LED bulbs",
      impact: "Reduce 8.5 kg CO₂/month",
      icon: 'Lightbulb',
      type: 'energy'
    },
    {
      id: 3,
      title: "Buy local produce",
      impact: "Cut 12.3 kg CO₂/month",
      icon: 'Leaf',
      type: 'consumption'
    }
  ];

  const getActionVariant = (color, featured) => {
    if (featured) return 'default';
    return 'outline';
  };

  const getSuggestionColor = (type) => {
    switch (type) {
      case 'transportation': return 'text-accent bg-accent/10';
      case 'energy': return 'text-success bg-success/10';
      case 'consumption': return 'text-warning bg-warning/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-environmental">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-1">Quick Actions</h3>
          <p className="text-sm text-muted-foreground">Common tasks and workflows</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickActions?.map((action) => (
            <Button
              key={action?.id}
              variant={getActionVariant(action?.color, action?.featured)}
              size={action?.featured ? 'lg' : 'default'}
              iconName={action?.icon}
              iconPosition="left"
              onClick={() => navigate(action?.path)}
              fullWidth
              className={`justify-start text-left h-auto p-4 ${action?.featured ? 'col-span-full sm:col-span-2' : ''}`}
            >
              <div className="flex items-center space-x-3 w-full">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  action?.featured 
                    ? 'bg-primary-foreground/20' 
                    : 'bg-muted'
                }`}>
                  <Icon name={action?.icon} size={20} />
                </div>
                <div className="flex-1 text-left">
                  <div className={`font-medium ${action?.featured ? 'text-base' : 'text-sm'}`}>
                    {action?.title}
                  </div>
                  <div className={`text-muted-foreground ${action?.featured ? 'text-sm' : 'text-xs'} mt-1`}>
                    {action?.description}
                  </div>
                </div>
                <Icon name="ChevronRight" size={16} className="opacity-50" />
              </div>
            </Button>
          ))}
        </div>
      </div>
      {/* AI Suggestions */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-environmental">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">AI Suggestions</h3>
            <p className="text-sm text-muted-foreground">Personalized carbon reduction tips</p>
          </div>
          <div className="flex items-center space-x-1 text-primary">
            <Icon name="Sparkles" size={16} />
            <span className="text-xs font-medium">AI Powered</span>
          </div>
        </div>

        <div className="space-y-3">
          {recentSuggestions?.map((suggestion) => (
            <div key={suggestion?.id} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-environmental cursor-pointer">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getSuggestionColor(suggestion?.type)}`}>
                <Icon name={suggestion?.icon} size={16} />
              </div>
              
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground">{suggestion?.title}</div>
                <div className="text-xs text-success font-medium mt-1">{suggestion?.impact}</div>
              </div>
              
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <Button variant="outline" size="sm" iconName="RefreshCw" fullWidth>
            Get More Suggestions
          </Button>
        </div>
      </div>
      {/* Workflow Status */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-environmental">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Workflow Status</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse-soft" />
            <span className="text-xs text-success font-medium">Active</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-success/5 border border-success/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm font-medium text-foreground">Data Collection</span>
            </div>
            <span className="text-xs text-success">Running</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-warning/5 border border-warning/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-warning" />
              <span className="text-sm font-medium text-foreground">Processing Queue</span>
            </div>
            <span className="text-xs text-warning">2 pending</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="Database" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Data Sync</span>
            </div>
            <span className="text-xs text-success">Synced</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionPanel;