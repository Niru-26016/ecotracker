import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ 
  title, 
  value, 
  unit, 
  change, 
  changeType, 
  icon, 
  color = 'primary',
  trend = null 
}) => {
  const getColorClasses = () => {
    switch (color) {
      case 'success':
        return 'bg-success text-success-foreground';
      case 'warning':
        return 'bg-warning text-warning-foreground';
      case 'error':
        return 'bg-error text-error-foreground';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-environmental">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses()}`}>
          <Icon name={icon} size={24} />
        </div>
        {trend && (
          <div className="flex items-center space-x-1">
            <Icon 
              name={trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
              size={16} 
              className={trend === 'up' ? 'text-success' : 'text-error'} 
            />
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-bold text-foreground">{value}</span>
          <span className="text-sm text-muted-foreground">{unit}</span>
        </div>
        {change && (
          <div className="flex items-center space-x-1">
            <Icon 
              name={changeType === 'positive' ? 'ArrowUp' : 'ArrowDown'} 
              size={14} 
              className={getChangeColor()} 
            />
            <span className={`text-sm font-medium ${getChangeColor()}`}>
              {change}
            </span>
            <span className="text-xs text-muted-foreground">vs last month</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;