import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ReportFilters = ({ onFiltersChange, onExport, onSaveReport }) => {
  const [filters, setFilters] = useState({
    dateRange: 'last6months',
    category: 'all',
    reportType: 'summary',
    customStartDate: '',
    customEndDate: ''
  });

  const [showCustomDate, setShowCustomDate] = useState(false);

  const dateRangeOptions = [
    { value: 'last7days', label: 'Last 7 Days' },
    { value: 'last30days', label: 'Last 30 Days' },
    { value: 'last3months', label: 'Last 3 Months' },
    { value: 'last6months', label: 'Last 6 Months' },
    { value: 'lastyear', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'energy', label: 'Energy Usage' },
    { value: 'food', label: 'Food & Diet' },
    { value: 'waste', label: 'Waste Management' },
    { value: 'travel', label: 'Travel & Tourism' },
    { value: 'shopping', label: 'Shopping & Consumption' }
  ];

  const reportTypeOptions = [
    { value: 'summary', label: 'Executive Summary' },
    { value: 'detailed', label: 'Detailed Analysis' },
    { value: 'comparison', label: 'Period Comparison' },
    { value: 'benchmark', label: 'Industry Benchmark' },
    { value: 'trends', label: 'Trend Analysis' },
    { value: 'goals', label: 'Goal Progress' }
  ];

  const exportFormats = [
    { id: 'pdf', label: 'PDF Report', icon: 'FileText' },
    { id: 'excel', label: 'Excel Spreadsheet', icon: 'FileSpreadsheet' },
    { id: 'csv', label: 'CSV Data', icon: 'Database' },
    { id: 'json', label: 'JSON Data', icon: 'Code' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    if (key === 'dateRange') {
      setShowCustomDate(value === 'custom');
    }
    
    onFiltersChange(newFilters);
  };

  const handleExport = (format) => {
    onExport({ ...filters, format });
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-environmental border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Report Configuration</h3>
        <Button
          variant="outline"
          size="sm"
          iconName="Save"
          onClick={onSaveReport}
        >
          Save Config
        </Button>
      </div>
      <div className="space-y-6">
        {/* Date Range Selection */}
        <div>
          <Select
            label="Date Range"
            options={dateRangeOptions}
            value={filters?.dateRange}
            onChange={(value) => handleFilterChange('dateRange', value)}
            className="mb-4"
          />
          
          {showCustomDate && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Start Date"
                type="date"
                value={filters?.customStartDate}
                onChange={(e) => handleFilterChange('customStartDate', e?.target?.value)}
              />
              <Input
                label="End Date"
                type="date"
                value={filters?.customEndDate}
                onChange={(e) => handleFilterChange('customEndDate', e?.target?.value)}
              />
            </div>
          )}
        </div>

        {/* Category Filter */}
        <Select
          label="Category Filter"
          description="Filter data by emission category"
          options={categoryOptions}
          value={filters?.category}
          onChange={(value) => handleFilterChange('category', value)}
        />

        {/* Report Type */}
        <Select
          label="Report Type"
          description="Choose the type of analysis to generate"
          options={reportTypeOptions}
          value={filters?.reportType}
          onChange={(value) => handleFilterChange('reportType', value)}
        />

        {/* Export Options */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Export Options</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {exportFormats?.map((format) => (
              <Button
                key={format?.id}
                variant="outline"
                size="sm"
                iconName={format?.icon}
                iconPosition="left"
                onClick={() => handleExport(format?.id)}
                className="justify-start"
              >
                {format?.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-3">Quick Actions</h4>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="secondary"
              size="sm"
              iconName="Calendar"
              onClick={() => handleFilterChange('dateRange', 'last30days')}
            >
              Last Month
            </Button>
            <Button
              variant="secondary"
              size="sm"
              iconName="TrendingUp"
              onClick={() => handleFilterChange('reportType', 'trends')}
            >
              Trend Report
            </Button>
            <Button
              variant="secondary"
              size="sm"
              iconName="Target"
              onClick={() => handleFilterChange('reportType', 'goals')}
            >
              Goal Progress
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportFilters;