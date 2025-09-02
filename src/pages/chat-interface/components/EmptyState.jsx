import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ onStartConversation }) => {
  const suggestions = [
    {
      icon: 'Calculator',
      title: 'Calculate my carbon footprint',
      description: 'Get instant calculations based on your activities',
      command: 'Calculate my carbon emissions for today'
    },
    {
      icon: 'TrendingUp',
      title: 'Show emission trends',
      description: 'View your carbon footprint over time',
      command: 'Show my emission trends for this month'
    },
    {
      icon: 'Car',
      title: 'Log transportation',
      description: 'Track your daily commute and travel',
      command: 'I want to log my transportation for today'
    },
    {
      icon: 'Home',
      title: 'Track energy usage',
      description: 'Monitor your home energy consumption',
      command: 'Help me track my home energy usage'
    },
    {
      icon: 'ShoppingBag',
      title: 'Log consumption',
      description: 'Record your purchases and consumption habits',
      command: 'I want to log my recent purchases'
    },
    {
      icon: 'BarChart3',
      title: 'Generate report',
      description: 'Create detailed carbon footprint reports',
      command: 'Generate my monthly carbon footprint report'
    }
  ];

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="MessageSquare" size={32} color="white" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Welcome to EcoTracker Chat
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Start a conversation to track your carbon footprint, get insights, and receive personalized recommendations for reducing your environmental impact.
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-card border border-border rounded-lg">
              <Icon name="Zap" size={24} className="text-primary mx-auto mb-2" />
              <h3 className="font-medium text-foreground mb-1">Real-time Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Get instant carbon footprint calculations
              </p>
            </div>
            <div className="p-4 bg-card border border-border rounded-lg">
              <Icon name="Brain" size={24} className="text-secondary mx-auto mb-2" />
              <h3 className="font-medium text-foreground mb-1">Smart Insights</h3>
              <p className="text-sm text-muted-foreground">
                AI-powered recommendations for reduction
              </p>
            </div>
            <div className="p-4 bg-card border border-border rounded-lg">
              <Icon name="Workflow" size={24} className="text-accent mx-auto mb-2" />
              <h3 className="font-medium text-foreground mb-1">Automated Workflows</h3>
              <p className="text-sm text-muted-foreground">
                Seamless integration with tracking systems
              </p>
            </div>
          </div>
        </div>

        {/* Suggestion Cards */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-foreground mb-4">
            Try asking about:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
            {[
              {
                title: "Daily Carbon Footprint",
                description: "I drove 50km to work and had lunch at a restaurant",
                icon: "Car"
              },
              {
                title: "Travel Analysis",
                description: "I'm planning a trip from Chennai to Pondicherry by car",
                icon: "MapPin"
              },
              {
                title: "Energy Usage",
                description: "My electricity bill this month was ₹2,500",
                icon: "Zap"
              },
              {
                title: "Food Impact",
                description: "I had beef for dinner and dairy products for breakfast",
                icon: "Utensils"
              }
            ]?.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 text-left hover:bg-primary/5 border-dashed"
                onClick={() => onStartConversation?.(suggestion?.description)}
              >
                <div className="flex items-start space-x-3">
                  <Icon name={suggestion?.icon} size={20} className="text-primary mt-1" />
                  <div>
                    <h4 className="font-medium text-sm">{suggestion?.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{suggestion?.description}</p>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Quick Start */}
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Or start with a quick command:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onStartConversation('/help')}
            >
              /help
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onStartConversation('/calculate')}
            >
              /calculate
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onStartConversation('/trends')}
            >
              /trends
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onStartConversation('/export')}
            >
              /export
            </Button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-accent/50 rounded-full">
            <Icon name="Zap" size={16} className="text-primary" />
            <span className="text-sm font-medium">Powered by n8n + Google Gemini</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;