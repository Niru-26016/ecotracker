import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

import Button from '../../../components/ui/Button';

const CarbonTrendChart = () => {
  const [timeFilter, setTimeFilter] = useState('6months');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const chartData = [
    { month: 'Mar', transportation: 2.4, energy: 1.8, consumption: 1.2, total: 5.4 },
    { month: 'Apr', transportation: 2.1, energy: 1.6, consumption: 1.4, total: 5.1 },
    { month: 'May', transportation: 2.8, energy: 2.2, consumption: 1.1, total: 6.1 },
    { month: 'Jun', transportation: 2.3, energy: 1.9, consumption: 1.3, total: 5.5 },
    { month: 'Jul', transportation: 2.0, energy: 1.7, consumption: 1.0, total: 4.7 },
    { month: 'Aug', transportation: 1.9, energy: 1.5, consumption: 0.9, total: 4.3 }
  ];

  const timeFilters = [
    { value: '3months', label: '3M' },
    { value: '6months', label: '6M' },
    { value: '1year', label: '1Y' },
    { value: 'all', label: 'All' }
  ];

  const categoryFilters = [
    { value: 'all', label: 'All Categories', color: '#2D5A3D' },
    { value: 'transportation', label: 'Transportation', color: '#E67E22' },
    { value: 'energy', label: 'Energy', color: '#38A169' },
    { value: 'consumption', label: 'Consumption', color: '#D69E2E' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-environmental-md">
          <p className="text-sm font-medium text-foreground mb-2">{`${label} 2024`}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry?.color }}
                />
                <span className="text-xs text-muted-foreground capitalize">
                  {entry?.dataKey}
                </span>
              </div>
              <span className="text-sm font-medium text-foreground">
                {entry?.value} tons CO₂
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-environmental">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Carbon Footprint Trends</h3>
          <p className="text-sm text-muted-foreground">Track your emissions over time</p>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          {/* Time Filter */}
          <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
            {timeFilters?.map((filter) => (
              <button
                key={filter?.value}
                onClick={() => setTimeFilter(filter?.value)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-environmental ${
                  timeFilter === filter?.value
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {filter?.label}
              </button>
            ))}
          </div>
          
          {/* Export Button */}
          <Button variant="outline" size="sm" iconName="Download">
            Export
          </Button>
        </div>
      </div>
      {/* Category Filter */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {categoryFilters?.map((filter) => (
          <button
            key={filter?.value}
            onClick={() => setCategoryFilter(filter?.value)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-environmental ${
              categoryFilter === filter?.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
            }`}
          >
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: filter?.color }}
            />
            <span>{filter?.label}</span>
          </button>
        ))}
      </div>
      {/* Chart */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis 
              dataKey="month" 
              stroke="#4A5568"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#4A5568"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              label={{ value: 'CO₂ (tons)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            {categoryFilter === 'all' && (
              <>
                <Line 
                  type="monotone" 
                  dataKey="total" 
                  stroke="#2D5A3D" 
                  strokeWidth={3}
                  dot={{ fill: '#2D5A3D', strokeWidth: 2, r: 4 }}
                  name="Total"
                />
                <Line 
                  type="monotone" 
                  dataKey="transportation" 
                  stroke="#E67E22" 
                  strokeWidth={2}
                  dot={{ fill: '#E67E22', strokeWidth: 2, r: 3 }}
                  name="Transportation"
                />
                <Line 
                  type="monotone" 
                  dataKey="energy" 
                  stroke="#38A169" 
                  strokeWidth={2}
                  dot={{ fill: '#38A169', strokeWidth: 2, r: 3 }}
                  name="Energy"
                />
                <Line 
                  type="monotone" 
                  dataKey="consumption" 
                  stroke="#D69E2E" 
                  strokeWidth={2}
                  dot={{ fill: '#D69E2E', strokeWidth: 2, r: 3 }}
                  name="Consumption"
                />
              </>
            )}
            
            {categoryFilter !== 'all' && (
              <Line 
                type="monotone" 
                dataKey={categoryFilter} 
                stroke={categoryFilters?.find(f => f?.value === categoryFilter)?.color} 
                strokeWidth={3}
                dot={{ fill: categoryFilters?.find(f => f?.value === categoryFilter)?.color, strokeWidth: 2, r: 4 }}
                name={categoryFilters?.find(f => f?.value === categoryFilter)?.label}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CarbonTrendChart;