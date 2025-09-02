import React from 'react';
import Icon from '../../../components/AppIcon';

const FilterSidebar = ({ 
  activeFilter, 
  categoryFilter, 
  segmentFilter, 
  onFilterChange, 
  isMobile = false 
}) => {
  const timeFilters = [
    { id: 'weekly', label: 'This Week', icon: 'Calendar' },
    { id: 'monthly', label: 'This Month', icon: 'CalendarDays' },
    { id: 'yearly', label: 'This Year', icon: 'CalendarRange' }
  ];

  const categoryFilters = [
    { id: 'all', label: 'All Categories', icon: 'Globe' },
    { id: 'transportation', label: 'Transportation', icon: 'Car' },
    { id: 'energy', label: 'Energy Usage', icon: 'Zap' },
    { id: 'consumption', label: 'Consumption', icon: 'ShoppingCart' }
  ];

  const segmentFilters = [
    { id: 'individual', label: 'Individual', icon: 'User' },
    { id: 'corporate', label: 'Corporate', icon: 'Building2' },
    { id: 'regional', label: 'Regional', icon: 'Map' }
  ];

  const FilterSection = ({ title, items, activeValue, onSelect, filterType }) => (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground flex items-center space-x-2">
        <Icon name="Filter" size={16} />
        <span>{title}</span>
      </h3>
      <div className="space-y-1">
        {items?.map((item) => (
          <button
            key={item?.id}
            onClick={() => onSelect(filterType, item?.id)}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors ${
              activeValue === item?.id
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <Icon name={item?.icon} size={16} />
            <span>{item?.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const containerClass = isMobile 
    ? "bg-card rounded-lg border border-border p-4 space-y-6" :"bg-card rounded-lg border border-border p-6 shadow-environmental sticky top-24 space-y-6";

  return (
    <div className={containerClass}>
      <div>
        <h2 className="text-lg font-bold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="SlidersHorizontal" size={20} />
          <span>Filters</span>
        </h2>
      </div>

      <FilterSection
        title="Time Period"
        items={timeFilters}
        activeValue={activeFilter}
        onSelect={onFilterChange}
        filterType="time"
      />

      <FilterSection
        title="Category"
        items={categoryFilters}
        activeValue={categoryFilter}
        onSelect={onFilterChange}
        filterType="category"
      />

      <FilterSection
        title="Segment"
        items={segmentFilters}
        activeValue={segmentFilter}
        onSelect={onFilterChange}
        filterType="segment"
      />

      {/* Quick Stats */}
      <div className="pt-4 border-t border-border">
        <h3 className="text-sm font-semibold text-foreground mb-3">Quick Stats</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Active Users</span>
            <span className="font-medium text-foreground">1,247</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total CO₂ Saved</span>
            <span className="font-medium text-success">892.5 tons</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Avg. Reduction</span>
            <span className="font-medium text-foreground">18.6%</span>
          </div>
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="pt-4 border-t border-border">
        <h3 className="text-sm font-semibold text-foreground mb-3">Your Badges</h3>
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center p-2 bg-muted/50 rounded-lg">
            <Icon name="Leaf" size={16} className="text-success mx-auto mb-1" />
            <span className="text-xs text-muted-foreground">Eco Starter</span>
          </div>
          <div className="text-center p-2 bg-muted/50 rounded-lg">
            <Icon name="Zap" size={16} className="text-warning mx-auto mb-1" />
            <span className="text-xs text-muted-foreground">Energy Saver</span>
          </div>
          <div className="text-center p-2 bg-muted/30 rounded-lg opacity-50">
            <Icon name="Trophy" size={16} className="text-muted-foreground mx-auto mb-1" />
            <span className="text-xs text-muted-foreground">Champion</span>
          </div>
        </div>
      </div>

      {!isMobile && (
        <div className="pt-4 border-t border-border text-center">
          <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
            Join Competition
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterSidebar;