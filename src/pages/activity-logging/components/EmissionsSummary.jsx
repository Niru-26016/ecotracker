import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmissionsSummary = ({ 
  emissions, 
  previousEntries = [], 
  onSave, 
  isSaving = false 
}) => {
  const totalEmissions = Object.values(emissions)?.reduce((sum, value) => sum + value, 0);
  
  const categories = [
    { key: 'transportation', label: 'Transportation', icon: 'Car', color: 'text-blue-600' },
    { key: 'energy', label: 'Energy Usage', icon: 'Zap', color: 'text-yellow-600' },
    { key: 'consumption', label: 'Consumption', icon: 'Package', color: 'text-purple-600' }
  ];

  const getComparisonText = () => {
    if (previousEntries?.length === 0) return null;
    
    const lastEntry = previousEntries?.[0];
    const difference = totalEmissions - lastEntry?.total;
    const percentChange = lastEntry?.total > 0 ? (difference / lastEntry?.total) * 100 : 0;
    
    return {
      difference: Math.abs(difference),
      isIncrease: difference > 0,
      percentChange: Math.abs(percentChange)
    };
  };

  const comparison = getComparisonText();

  return (
    <div className="bg-card border border-border rounded-lg p-6 sticky top-20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Emissions Summary</h3>
        <Icon name="BarChart3" size={20} className="text-muted-foreground" />
      </div>
      {/* Total Emissions */}
      <div className="bg-primary/10 rounded-lg p-4 mb-6">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Total Emissions</p>
          <p className="text-3xl font-bold text-primary">{totalEmissions?.toFixed(2)}</p>
          <p className="text-sm text-muted-foreground">kg CO₂</p>
        </div>
      </div>
      {/* Category Breakdown */}
      <div className="space-y-4 mb-6">
        <h4 className="font-medium text-foreground">Category Breakdown</h4>
        {categories?.map((category) => (
          <div key={category?.key} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name={category?.icon} size={16} className={category?.color} />
              <span className="text-sm text-foreground">{category?.label}</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-medium text-foreground">
                {emissions?.[category?.key]?.toFixed(2) || '0.00'} kg
              </span>
              {totalEmissions > 0 && (
                <p className="text-xs text-muted-foreground">
                  {((emissions?.[category?.key] || 0) / totalEmissions * 100)?.toFixed(1)}%
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Comparison with Previous Entry */}
      {comparison && (
        <div className={`rounded-lg p-4 mb-6 ${
          comparison?.isIncrease ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'
        }`}>
          <div className="flex items-center space-x-2 mb-2">
            <Icon 
              name={comparison?.isIncrease ? 'TrendingUp' : 'TrendingDown'} 
              size={16} 
              className={comparison?.isIncrease ? 'text-red-600' : 'text-green-600'} 
            />
            <span className={`text-sm font-medium ${
              comparison?.isIncrease ? 'text-red-900' : 'text-green-900'
            }`}>
              {comparison?.isIncrease ? 'Increase' : 'Decrease'} from last entry
            </span>
          </div>
          <p className={`text-sm ${
            comparison?.isIncrease ? 'text-red-800' : 'text-green-800'
          }`}>
            {comparison?.difference?.toFixed(2)} kg CO₂ ({comparison?.percentChange?.toFixed(1)}%)
          </p>
        </div>
      )}
      {/* Recent Entries */}
      {previousEntries?.length > 0 && (
        <div className="mb-6">
          <h4 className="font-medium text-foreground mb-3">Recent Entries</h4>
          <div className="space-y-2">
            {previousEntries?.slice(0, 3)?.map((entry, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                <div>
                  <p className="text-sm text-foreground">{entry?.date}</p>
                  <p className="text-xs text-muted-foreground">{entry?.activities} activities</p>
                </div>
                <span className="text-sm font-medium text-foreground">
                  {entry?.total?.toFixed(2)} kg
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          variant="default"
          fullWidth
          iconName="Save"
          iconPosition="left"
          onClick={onSave}
          loading={isSaving}
          disabled={totalEmissions === 0}
        >
          Save Activity Log
        </Button>
        
        <Button
          variant="outline"
          fullWidth
          iconName="MessageSquare"
          iconPosition="left"
          onClick={() => window.location.href = '/chat-interface'}
        >
          Switch to Chat Mode
        </Button>
      </div>
      {/* Environmental Impact */}
      <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="TreePine" size={20} className="text-green-600 mt-0.5" />
          <div>
            <h5 className="font-medium text-green-900 mb-1">Environmental Impact</h5>
            <p className="text-sm text-green-800">
              This activity generated emissions equivalent to driving {(totalEmissions * 2.31)?.toFixed(1)} miles in an average car.
            </p>
            {totalEmissions > 0 && (
              <p className="text-xs text-green-700 mt-1">
                Consider offsetting with {Math.ceil(totalEmissions / 22)} tree plantings.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmissionsSummary;