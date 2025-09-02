import React from 'react';
import Icon from '../../../components/AppIcon';

const ReportSummaryCard = ({ title, value, unit, change, changeType, icon, trend }) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-environmental border border-border">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name={icon} size={20} className="text-primary" />
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-semibold text-foreground">{value}</span>
            <span className="text-sm text-muted-foreground">{unit}</span>
          </div>
          {change && (
            <div className={`flex items-center space-x-1 mt-2 ${getChangeColor()}`}>
              <Icon name={getChangeIcon()} size={14} />
              <span className="text-sm font-medium">{change}</span>
              <span className="text-xs text-muted-foreground">vs last month</span>
            </div>
          )}
        </div>
        {trend && (
          <div className="w-16 h-8 flex items-end space-x-1">
            {trend?.map((point, index) => (
              <div
                key={index}
                className={`flex-1 rounded-sm ${
                  point > 50 ? 'bg-success' : point > 25 ? 'bg-warning' : 'bg-error'
                }`}
                style={{ height: `${Math.max(point, 10)}%` }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportSummaryCard;