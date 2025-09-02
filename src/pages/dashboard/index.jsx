import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import MetricCard from './components/MetricCard';
import CarbonTrendChart from './components/CarbonTrendChart';
import ChatActivitySummary from './components/ChatActivitySummary';
import RecentActivitiesTable from './components/RecentActivitiesTable';
import QuickActionPanel from './components/QuickActionPanel';
import Icon from '../../components/AppIcon';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userName] = useState('Alex Johnson');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const currentMetrics = [
    {
      title: 'Current Month CO₂',
      value: '4.3',
      unit: 'tons',
      change: '12% reduction',
      changeType: 'positive',
      icon: 'Leaf',
      color: 'success',
      trend: 'down'
    },
    {
      title: 'Weekly Average',
      value: '1.1',
      unit: 'tons/week',
      change: '8% increase',
      changeType: 'negative',
      icon: 'TrendingUp',
      color: 'warning',
      trend: 'up'
    },
    {
      title: 'Goal Progress',
      value: '73',
      unit: '%',
      change: '15% ahead',
      changeType: 'positive',
      icon: 'Target',
      color: 'primary',
      trend: 'up'
    },
    {
      title: 'Carbon Offset',
      value: '2.1',
      unit: 'tons',
      change: '5% increase',
      changeType: 'positive',
      icon: 'TreePine',
      color: 'success',
      trend: 'up'
    }
  ];

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                  Welcome back, {userName}
                </h1>
                <p className="text-muted-foreground">
                  {formatDate(currentTime)} • {formatTime(currentTime)}
                </p>
              </div>
              
              <div className="mt-4 sm:mt-0 flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Wifi" size={16} className="text-success" />
                  <span>Connected</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Database" size={16} className="text-success" />
                  <span>Synced</span>
                </div>
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {currentMetrics?.map((metric, index) => (
              <MetricCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                unit={metric?.unit}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                color={metric?.color}
                trend={metric?.trend}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Chart Section - Takes 2 columns on large screens */}
            <div className="lg:col-span-2">
              <CarbonTrendChart />
            </div>

            {/* Sidebar - Takes 1 column on large screens */}
            <div className="space-y-6">
              <ChatActivitySummary />
              <QuickActionPanel />
            </div>
          </div>

          {/* Recent Activities Table */}
          <div className="mb-8">
            <RecentActivitiesTable />
          </div>

          {/* Bottom Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card rounded-lg border border-border p-6 shadow-environmental">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="MessageSquare" size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Chat Sessions</h3>
                  <p className="text-sm text-muted-foreground">This month</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-foreground mb-2">47</div>
              <div className="flex items-center space-x-1 text-success">
                <Icon name="ArrowUp" size={14} />
                <span className="text-sm font-medium">23% increase</span>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-6 shadow-environmental">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="Zap" size={20} className="text-success" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Workflows</h3>
                  <p className="text-sm text-muted-foreground">Automated</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-foreground mb-2">15</div>
              <div className="flex items-center space-x-1 text-success">
                <Icon name="CheckCircle" size={14} />
                <span className="text-sm font-medium">All active</span>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-6 shadow-environmental">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Icon name="Award" size={20} className="text-warning" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Achievements</h3>
                  <p className="text-sm text-muted-foreground">Unlocked</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-foreground mb-2">8</div>
              <div className="flex items-center space-x-1 text-warning">
                <Icon name="Star" size={14} />
                <span className="text-sm font-medium">2 new this week</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;