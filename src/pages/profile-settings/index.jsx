import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import ProfileInformation from './components/ProfileInformation';
import CarbonTrackingPreferences from './components/CarbonTrackingPreferences';
import WorkflowSettings from './components/WorkflowSettings';
import SecuritySettings from './components/SecuritySettings';
import DataManagement from './components/DataManagement';
import Icon from '../../components/AppIcon';

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    {
      id: 'profile',
      label: 'Profile',
      icon: 'User',
      component: ProfileInformation
    },
    {
      id: 'tracking',
      label: 'Carbon Tracking',
      icon: 'BarChart3',
      component: CarbonTrackingPreferences
    },
    {
      id: 'workflow',
      label: 'Workflow',
      icon: 'Workflow',
      component: WorkflowSettings
    },
    {
      id: 'security',
      label: 'Security',
      icon: 'Shield',
      component: SecuritySettings
    },
    {
      id: 'data',
      label: 'Data Management',
      icon: 'Database',
      component: DataManagement
    }
  ];

  const ActiveComponent = tabs?.find(tab => tab?.id === activeTab)?.component;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <Icon name="Settings" size={28} className="text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Profile & Settings</h1>
            </div>
            <p className="text-muted-foreground">
              Manage your account information, carbon tracking preferences, and security settings
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg border border-border p-4 sticky top-24">
                <nav className="space-y-1">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-environmental ${
                        activeTab === tab?.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon name={tab?.icon} size={18} />
                      <span className="hidden sm:block lg:block">{tab?.label}</span>
                    </button>
                  ))}
                </nav>

                {/* Quick Stats */}
                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="text-sm font-medium text-foreground mb-3">Account Summary</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Member since:</span>
                      <span className="text-foreground font-medium">Mar 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Data points:</span>
                      <span className="text-foreground font-medium">1,247</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last sync:</span>
                      <span className="text-foreground font-medium">2 min ago</span>
                    </div>
                  </div>
                </div>

                {/* Help Section */}
                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="text-sm font-medium text-foreground mb-3">Need Help?</h4>
                  <div className="space-y-2">
                    <button className="w-full flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-environmental">
                      <Icon name="HelpCircle" size={16} />
                      <span className="hidden sm:block lg:block">Documentation</span>
                    </button>
                    <button className="w-full flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-environmental">
                      <Icon name="MessageSquare" size={16} />
                      <span className="hidden sm:block lg:block">Contact Support</span>
                    </button>
                    <button className="w-full flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-environmental">
                      <Icon name="ExternalLink" size={16} />
                      <span className="hidden sm:block lg:block">Community Forum</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {ActiveComponent && <ActiveComponent />}
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Tab Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-2 z-40">
        <div className="flex justify-around">
          {tabs?.slice(0, 4)?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-environmental ${
                activeTab === tab?.id
                  ? 'text-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={20} />
              <span className="text-xs font-medium">{tab?.label}</span>
            </button>
          ))}
          <button
            onClick={() => setActiveTab('data')}
            className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-environmental ${
              activeTab === 'data' ?'text-primary' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="Database" size={20} />
            <span className="text-xs font-medium">Data</span>
          </button>
        </div>
      </div>
      {/* Mobile Bottom Padding */}
      <div className="lg:hidden h-20" />
    </div>
  );
};

export default ProfileSettings;