import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const ComparisonWidget = ({ data, title }) => {
  const [comparisonType, setComparisonType] = useState('period');
  const [selectedPeriods, setSelectedPeriods] = useState(['current', 'previous']);

  const comparisonTypes = [
    { id: 'period', label: 'Period Comparison', icon: 'Calendar' },
    { id: 'benchmark', label: 'Industry Benchmark', icon: 'Target' },
    { id: 'goals', label: 'Goal Progress', icon: 'TrendingUp' }
  ];

  const periodOptions = [
    { id: 'current', label: 'Current Month', value: 2.4, color: 'bg-primary' },
    { id: 'previous', label: 'Previous Month', value: 2.8, color: 'bg-secondary' },
    { id: 'lastyear', label: 'Same Month Last Year', value: 3.2, color: 'bg-accent' },
    { id: 'average', label: '6-Month Average', value: 2.6, color: 'bg-muted-foreground' }
  ];

  const benchmarkData = [
    { label: 'Your Emissions', value: 2.4, color: 'bg-primary', isUser: true },
    { label: 'Industry Average', value: 3.1, color: 'bg-warning' },
    { label: 'Best in Class', value: 1.8, color: 'bg-success' },
    { label: 'Global Average', value: 4.2, color: 'bg-error' }
  ];

  const goalData = [
    { label: 'Current Progress', value: 2.4, target: 2.0, color: 'bg-primary' },
    { label: 'Monthly Target', value: 2.0, target: 2.0, color: 'bg-success' },
    { label: 'Year-end Goal', value: 1.5, target: 1.5, color: 'bg-accent' }
  ];

  const getComparisonData = () => {
    switch (comparisonType) {
      case 'benchmark':
        return benchmarkData;
      case 'goals':
        return goalData;
      default:
        return periodOptions?.filter(option => selectedPeriods?.includes(option?.id));
    }
  };

  const getMaxValue = () => {
    const data = getComparisonData();
    return Math.max(...data?.map(item => item?.target || item?.value)) * 1.2;
  };

  const getPercentageWidth = (value, maxValue) => {
    return (value / maxValue) * 100;
  };

  const getComparisonInsight = () => {
    if (comparisonType === 'period') {
      const current = periodOptions?.find(p => p?.id === 'current')?.value || 0;
      const previous = periodOptions?.find(p => p?.id === 'previous')?.value || 0;
      const change = ((current - previous) / previous * 100)?.toFixed(1);
      const isImprovement = current < previous;
      
      return {
        text: `${Math.abs(change)}% ${isImprovement ? 'reduction' : 'increase'} from last month`,
        type: isImprovement ? 'positive' : 'negative',
        icon: isImprovement ? 'TrendingDown' : 'TrendingUp'
      };
    }
    
    if (comparisonType === 'benchmark') {
      const userValue = benchmarkData?.find(b => b?.isUser)?.value || 0;
      const industryAvg = benchmarkData?.find(b => b?.label === 'Industry Average')?.value || 0;
      const betterThanIndustry = userValue < industryAvg;
      
      return {
        text: `${betterThanIndustry ? 'Below' : 'Above'} industry average by ${Math.abs(((userValue - industryAvg) / industryAvg * 100))?.toFixed(1)}%`,
        type: betterThanIndustry ? 'positive' : 'negative',
        icon: betterThanIndustry ? 'CheckCircle' : 'AlertCircle'
      };
    }
    
    return {
      text: "On track to meet year-end reduction goal",
      type: 'positive',
      icon: 'Target'
    };
  };

  const insight = getComparisonInsight();
  const maxValue = getMaxValue();

  return (
    <div className="bg-card rounded-lg p-6 shadow-environmental border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          {comparisonTypes?.map((type) => (
            <button
              key={type?.id}
              onClick={() => setComparisonType(type?.id)}
              className={`flex items-center space-x-1 px-3 py-1 text-xs font-medium rounded-md transition-environmental ${
                comparisonType === type?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={type?.icon} size={14} />
              <span className="hidden sm:inline">{type?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Comparison Bars */}
      <div className="space-y-4 mb-6">
        {getComparisonData()?.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">{item?.label}</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold text-foreground">
                  {item?.value?.toFixed(1)} tCO₂e
                </span>
                {item?.target && (
                  <span className="text-xs text-muted-foreground">
                    / {item?.target?.toFixed(1)} target
                  </span>
                )}
              </div>
            </div>
            
            <div className="relative">
              <div className="w-full bg-muted rounded-full h-3">
                <div
                  className={`h-3 rounded-full ${item?.color} transition-all duration-500`}
                  style={{ width: `${getPercentageWidth(item?.value, maxValue)}%` }}
                />
                {item?.target && (
                  <div
                    className="absolute top-0 w-0.5 h-3 bg-foreground"
                    style={{ left: `${getPercentageWidth(item?.target, maxValue)}%` }}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Insight */}
      <div className={`flex items-center space-x-2 p-3 rounded-lg ${
        insight?.type === 'positive' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
      }`}>
        <Icon name={insight?.icon} size={16} />
        <span className="text-sm font-medium">{insight?.text}</span>
      </div>
      {/* Period Selection for Period Comparison */}
      {comparisonType === 'period' && (
        <div className="mt-4 pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-2">Compare Periods</h4>
          <div className="flex flex-wrap gap-2">
            {periodOptions?.map((period) => (
              <button
                key={period?.id}
                onClick={() => {
                  if (selectedPeriods?.includes(period?.id)) {
                    setSelectedPeriods(prev => prev?.filter(p => p !== period?.id));
                  } else {
                    setSelectedPeriods(prev => [...prev, period?.id]);
                  }
                }}
                className={`px-3 py-1 text-xs rounded-md border transition-environmental ${
                  selectedPeriods?.includes(period?.id)
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'text-muted-foreground border-border hover:border-primary'
                }`}
              >
                {period?.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparisonWidget;