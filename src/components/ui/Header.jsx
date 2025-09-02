import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ className = '' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [workflowStatus, setWorkflowStatus] = useState('idle');
  const [dataSyncStatus, setDataSyncStatus] = useState('synced');

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'BarChart3',
      tooltip: 'View carbon footprint overview and metrics'
    },
    {
      label: 'Chat',
      path: '/chat-interface',
      icon: 'MessageSquare',
      tooltip: 'Automated data collection through conversation'
    },
    {
      label: 'Log Activity',
      path: '/activity-logging',
      icon: 'Plus',
      tooltip: 'Manually track carbon-generating activities'
    },
    {
      label: 'Reports',
      path: '/reports-analytics',
      icon: 'TrendingUp',
      tooltip: 'Analyze trends and export data'
    },
    {
      label: 'Leaderboard',
      path: '/leaderboard-competitions',
      icon: 'Trophy',
      tooltip: 'View rankings and compete for carbon reduction prizes'
    }
  ];

  const secondaryItems = [
    {
      label: 'Settings',
      path: '/profile-settings',
      icon: 'Settings',
      tooltip: 'Profile and system preferences'
    }
  ];

  useEffect(() => {
    // Simulate workflow status updates
    const interval = setInterval(() => {
      const statuses = ['idle', 'active', 'processing'];
      setWorkflowStatus(statuses?.[Math.floor(Math.random() * statuses?.length)]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const getWorkflowStatusColor = () => {
    switch (workflowStatus) {
      case 'active': return 'text-success';
      case 'processing': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getSyncStatusColor = () => {
    return dataSyncStatus === 'synced' ? 'text-success' : 'text-warning';
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-surface border-b border-border shadow-environmental ${className}`}>
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Leaf" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground">EcoTracker</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems?.map((item) => {
            const isActive = location?.pathname === item?.path;
            return (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-environmental ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                title={item?.tooltip}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Status Indicators & Secondary Actions */}
        <div className="flex items-center space-x-4">
          {/* Workflow Status */}
          <div className="hidden lg:flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              workflowStatus === 'active' ? 'bg-success animate-pulse-soft' :
              workflowStatus === 'processing'? 'bg-warning animate-pulse-soft' : 'bg-muted-foreground'
            }`} />
            <span className={`text-xs ${getWorkflowStatusColor()}`}>
              {workflowStatus === 'active' ? 'Workflow Active' :
               workflowStatus === 'processing'? 'Processing' : 'Workflow Idle'}
            </span>
          </div>

          {/* Data Sync Status */}
          <div className="hidden lg:flex items-center space-x-1">
            <Icon 
              name={dataSyncStatus === 'synced' ? 'CheckCircle' : 'AlertCircle'} 
              size={16} 
              className={getSyncStatusColor()}
            />
            <span className={`text-xs ${getSyncStatusColor()}`}>
              {dataSyncStatus === 'synced' ? 'Synced' : 'Syncing'}
            </span>
          </div>

          {/* Settings - Desktop */}
          <div className="hidden md:block">
            <Button
              variant={location?.pathname === '/profile-settings' ? 'default' : 'ghost'}
              size="sm"
              iconName="Settings"
              onClick={() => handleNavigation('/profile-settings')}
              className="w-9 h-9"
            />
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              iconName={isMobileMenuOpen ? 'X' : 'Menu'}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-9 h-9"
            />
          </div>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface border-t border-border shadow-environmental-md">
          <nav className="px-4 py-2 space-y-1">
            {navigationItems?.map((item) => {
              const isActive = location?.pathname === item?.path;
              return (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-environmental ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.label}</span>
                </button>
              );
            })}
            
            {/* Settings in mobile menu */}
            <button
              onClick={() => handleNavigation('/profile-settings')}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-environmental ${
                location?.pathname === '/profile-settings' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name="Settings" size={20} />
              <span>Settings</span>
            </button>

            {/* Mobile Status Indicators */}
            <div className="flex items-center justify-between px-3 py-2 mt-4 pt-4 border-t border-border">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  workflowStatus === 'active' ? 'bg-success animate-pulse-soft' :
                  workflowStatus === 'processing'? 'bg-warning animate-pulse-soft' : 'bg-muted-foreground'
                }`} />
                <span className={`text-xs ${getWorkflowStatusColor()}`}>
                  {workflowStatus === 'active' ? 'Active' :
                   workflowStatus === 'processing'? 'Processing' : 'Idle'}
                </span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Icon 
                  name={dataSyncStatus === 'synced' ? 'CheckCircle' : 'AlertCircle'} 
                  size={14} 
                  className={getSyncStatusColor()}
                />
                <span className={`text-xs ${getSyncStatusColor()}`}>
                  {dataSyncStatus === 'synced' ? 'Synced' : 'Syncing'}
                </span>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;