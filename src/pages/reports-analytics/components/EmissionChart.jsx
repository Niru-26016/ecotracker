import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';


const EmissionChart = ({ data, title, type = 'line', height = 300 }) => {
  const [chartType, setChartType] = useState(type);
  const [timeRange, setTimeRange] = useState('6months');

  const chartTypes = [
    { id: 'line', label: 'Line', icon: 'TrendingUp' },
    { id: 'area', label: 'Area', icon: 'AreaChart' },
    { id: 'bar', label: 'Bar', icon: 'BarChart3' },
    { id: 'pie', label: 'Pie', icon: 'PieChart' }
  ];

  const timeRanges = [
    { id: '1month', label: '1M' },
    { id: '3months', label: '3M' },
    { id: '6months', label: '6M' },
    { id: '1year', label: '1Y' }
  ];

  const colors = ['#2D5A3D', '#4A7C59', '#E67E22', '#38A169', '#D69E2E', '#E53E3E'];

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    };

    switch (chartType) {
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="name" stroke="#4A5568" fontSize={12} />
            <YAxis stroke="#4A5568" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#FFFFFF', 
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(45, 90, 61, 0.1)'
              }} 
            />
            <Legend />
            <Area type="monotone" dataKey="emissions" stroke="#2D5A3D" fill="#2D5A3D" fillOpacity={0.3} />
          </AreaChart>
        );
      
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="name" stroke="#4A5568" fontSize={12} />
            <YAxis stroke="#4A5568" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#FFFFFF', 
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(45, 90, 61, 0.1)'
              }} 
            />
            <Legend />
            <Bar dataKey="emissions" fill="#2D5A3D" radius={[4, 4, 0, 0]} />
          </BarChart>
        );
      
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100)?.toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="emissions"
            >
              {data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors?.[index % colors?.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        );
      
      default:
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="name" stroke="#4A5568" fontSize={12} />
            <YAxis stroke="#4A5568" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#FFFFFF', 
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(45, 90, 61, 0.1)'
              }} 
            />
            <Legend />
            <Line type="monotone" dataKey="emissions" stroke="#2D5A3D" strokeWidth={2} dot={{ fill: '#2D5A3D' }} />
          </LineChart>
        );
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-environmental border border-border">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 sm:mb-0">{title}</h3>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          {/* Time Range Selector */}
          <div className="flex space-x-1 bg-muted rounded-lg p-1">
            {timeRanges?.map((range) => (
              <button
                key={range?.id}
                onClick={() => setTimeRange(range?.id)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-environmental ${
                  timeRange === range?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {range?.label}
              </button>
            ))}
          </div>

          {/* Chart Type Selector */}
          <div className="flex space-x-1 bg-muted rounded-lg p-1">
            {chartTypes?.map((type) => (
              <button
                key={type?.id}
                onClick={() => setChartType(type?.id)}
                className={`p-2 rounded-md transition-environmental ${
                  chartType === type?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                title={type?.label}
              >
                <Icon name={type?.icon} size={16} />
              </button>
            ))}
          </div>
        </div>
      </div>
      <div style={{ width: '100%', height }}>
        <ResponsiveContainer>
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EmissionChart;