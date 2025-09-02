import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActivitiesTable = () => {
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const activities = [
    {
      id: 1,
      date: '2024-09-01',
      time: '10:30 AM',
      category: 'Transportation',
      activity: 'Daily commute - Car',
      distance: '25 miles',
      emissions: 12.5,
      source: 'Chat',
      status: 'Verified'
    },
    {
      id: 2,
      date: '2024-09-01',
      time: '09:15 AM',
      category: 'Energy',
      activity: 'Home electricity usage',
      distance: '450 kWh',
      emissions: 225.0,
      source: 'Manual',
      status: 'Verified'
    },
    {
      id: 3,
      date: '2024-08-31',
      time: '06:45 PM',
      category: 'Consumption',
      activity: 'Grocery shopping',
      distance: '15 items',
      emissions: 8.3,
      source: 'Chat',
      status: 'Processing'
    },
    {
      id: 4,
      date: '2024-08-30',
      time: '02:20 PM',
      category: 'Transportation',
      activity: 'Flight - NYC to LA',
      distance: '2,445 miles',
      emissions: 1250.0,
      source: 'Chat',
      status: 'Verified'
    },
    {
      id: 5,
      date: '2024-08-30',
      time: '11:00 AM',
      category: 'Energy',
      activity: 'Office AC usage',
      distance: '8 hours',
      emissions: 15.6,
      source: 'Manual',
      status: 'Verified'
    },
    {
      id: 6,
      date: '2024-08-29',
      time: '07:30 PM',
      category: 'Transportation',
      activity: 'Uber ride',
      distance: '8.5 miles',
      emissions: 4.2,
      source: 'Chat',
      status: 'Verified'
    }
  ];

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Transportation': return 'Car';
      case 'Energy': return 'Zap';
      case 'Consumption': return 'ShoppingBag';
      default: return 'Activity';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Transportation': return 'text-accent bg-accent/10';
      case 'Energy': return 'text-success bg-success/10';
      case 'Consumption': return 'text-warning bg-warning/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getSourceBadge = (source) => {
    return source === 'Chat' ?'bg-primary/10 text-primary' :'bg-muted text-muted-foreground';
  };

  const getStatusBadge = (status) => {
    return status === 'Verified' 
      ? 'bg-success/10 text-success' :'bg-warning/10 text-warning';
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-environmental">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-6 border-b border-border">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Recent Activities</h3>
          <p className="text-sm text-muted-foreground">Latest carbon footprint entries</p>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <Button variant="outline" size="sm" iconName="Filter">
            Filter
          </Button>
          <Button variant="outline" size="sm" iconName="Download">
            Export
          </Button>
        </div>
      </div>
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4">
                <button 
                  onClick={() => handleSort('date')}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Date & Time</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <button 
                  onClick={() => handleSort('category')}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Category</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <span className="text-sm font-medium text-muted-foreground">Activity</span>
              </th>
              <th className="text-left p-4">
                <button 
                  onClick={() => handleSort('emissions')}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Emissions</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <span className="text-sm font-medium text-muted-foreground">Source</span>
              </th>
              <th className="text-left p-4">
                <span className="text-sm font-medium text-muted-foreground">Status</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {activities?.map((activity) => (
              <tr key={activity?.id} className="border-b border-border hover:bg-muted/30 transition-environmental">
                <td className="p-4">
                  <div>
                    <div className="text-sm font-medium text-foreground">{activity?.date}</div>
                    <div className="text-xs text-muted-foreground">{activity?.time}</div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getCategoryColor(activity?.category)}`}>
                      <Icon name={getCategoryIcon(activity?.category)} size={16} />
                    </div>
                    <span className="text-sm font-medium text-foreground">{activity?.category}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div>
                    <div className="text-sm font-medium text-foreground">{activity?.activity}</div>
                    <div className="text-xs text-muted-foreground">{activity?.distance}</div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm font-bold text-foreground">{activity?.emissions} kg CO₂</span>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSourceBadge(activity?.source)}`}>
                    {activity?.source}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(activity?.status)}`}>
                    {activity?.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden p-4 space-y-4">
        {activities?.map((activity) => (
          <div key={activity?.id} className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getCategoryColor(activity?.category)}`}>
                  <Icon name={getCategoryIcon(activity?.category)} size={16} />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{activity?.category}</div>
                  <div className="text-xs text-muted-foreground">{activity?.date} • {activity?.time}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSourceBadge(activity?.source)}`}>
                  {activity?.source}
                </span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(activity?.status)}`}>
                  {activity?.status}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm font-medium text-foreground">{activity?.activity}</div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{activity?.distance}</span>
                <span className="text-sm font-bold text-foreground">{activity?.emissions} kg CO₂</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Load More */}
      <div className="p-6 border-t border-border text-center">
        <Button variant="outline" iconName="ChevronDown">
          Load More Activities
        </Button>
      </div>
    </div>
  );
};

export default RecentActivitiesTable;