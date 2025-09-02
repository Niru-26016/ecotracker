import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import ReportSummaryCard from './components/ReportSummaryCard';
import EmissionChart from './components/EmissionChart';
import ReportFilters from './components/ReportFilters';
import DataTable from './components/DataTable';
import ComparisonWidget from './components/ComparisonWidget';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ReportsAnalytics = () => {
  const [filters, setFilters] = useState({
    dateRange: 'last6months',
    category: 'all',
    reportType: 'summary'
  });
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  // Mock summary data
  const summaryData = [
    {
      title: "Total Emissions",
      value: "14.2",
      unit: "tCO₂e",
      change: "8.5% reduction",
      changeType: "positive",
      icon: "Zap",
      trend: [45, 52, 38, 65, 42, 58, 35, 48]
    },
    {
      title: "Monthly Average",
      value: "2.4",
      unit: "tCO₂e/month",
      change: "12% reduction",
      changeType: "positive",
      icon: "TrendingDown",
      trend: [65, 58, 52, 48, 42, 38, 35, 32]
    },
    {
      title: "Goal Progress",
      value: "76",
      unit: "% complete",
      change: "On track",
      changeType: "positive",
      icon: "Target",
      trend: [20, 35, 42, 58, 65, 72, 76, 78]
    },
    {
      title: "Cost Savings",
      value: "$1,240",
      unit: "USD",
      change: "$180 increase",
      changeType: "positive",
      icon: "DollarSign",
      trend: [25, 32, 45, 52, 58, 65, 72, 78]
    }
  ];

  // Mock chart data
  const emissionTrendData = [
    { name: 'Jan', emissions: 3.2, target: 2.8 },
    { name: 'Feb', emissions: 2.8, target: 2.7 },
    { name: 'Mar', emissions: 2.5, target: 2.6 },
    { name: 'Apr', emissions: 2.3, target: 2.5 },
    { name: 'May', emissions: 2.1, target: 2.4 },
    { name: 'Jun', emissions: 2.4, target: 2.3 },
    { name: 'Jul', emissions: 2.2, target: 2.2 },
    { name: 'Aug', emissions: 2.0, target: 2.1 }
  ];

  const categoryBreakdownData = [
    { name: 'Transportation', emissions: 5.2 },
    { name: 'Energy', emissions: 4.1 },
    { name: 'Food', emissions: 2.8 },
    { name: 'Waste', emissions: 1.3 },
    { name: 'Travel', emissions: 0.8 }
  ];

  // Mock detailed data for table
  const detailedData = [
    {
      date: '2024-08-30',
      category: 'Transportation',
      activity: 'Daily Commute - Car',
      emissions: 0.12,
      cost: 15.50,
      source: 'Chat Interface'
    },
    {
      date: '2024-08-30',
      activity: 'Home Energy Usage',
      category: 'Energy',
      emissions: 0.08,
      cost: 12.30,
      source: 'Manual Entry'
    },
    {
      date: '2024-08-29',
      category: 'Food',
      activity: 'Restaurant Meal',
      emissions: 0.05,
      cost: 8.20,
      source: 'Chat Interface'
    },
    {
      date: '2024-08-29',
      category: 'Transportation',
      activity: 'Uber Ride',
      emissions: 0.03,
      cost: 4.50,
      source: 'Manual Entry'
    },
    {
      date: '2024-08-28',
      category: 'Energy',
      activity: 'Office Electricity',
      emissions: 0.15,
      cost: 18.75,
      source: 'Workflow Automation'
    },
    {
      date: '2024-08-28',
      category: 'Waste',
      activity: 'Household Waste',
      emissions: 0.02,
      cost: 2.10,
      source: 'Manual Entry'
    },
    {
      date: '2024-08-27',
      category: 'Travel',
      activity: 'Flight - Domestic',
      emissions: 0.85,
      cost: 125.00,
      source: 'Chat Interface'
    },
    {
      date: '2024-08-27',
      category: 'Transportation',
      activity: 'Public Transport',
      emissions: 0.01,
      cost: 1.25,
      source: 'Manual Entry'
    }
  ];

  const tableColumns = [
    {
      key: 'date',
      header: 'Date',
      accessor: (row) => new Date(row.date)?.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      })
    },
    {
      key: 'category',
      header: 'Category',
      accessor: (row) => (
        <span className={`px-2 py-1 text-xs rounded-full ${
          row?.category === 'Transportation' ? 'bg-blue-100 text-blue-800' :
          row?.category === 'Energy' ? 'bg-yellow-100 text-yellow-800' :
          row?.category === 'Food' ? 'bg-green-100 text-green-800' :
          row?.category === 'Waste'? 'bg-red-100 text-red-800' : 'bg-purple-100 text-purple-800'
        }`}>
          {row?.category}
        </span>
      )
    },
    {
      key: 'activity',
      header: 'Activity'
    },
    {
      key: 'emissions',
      header: 'Emissions (tCO₂e)',
      accessor: (row) => row?.emissions?.toFixed(3)
    },
    {
      key: 'cost',
      header: 'Cost Impact',
      accessor: (row) => `$${row?.cost?.toFixed(2)}`
    },
    {
      key: 'source',
      header: 'Data Source',
      accessor: (row) => (
        <div className="flex items-center space-x-1">
          <Icon 
            name={
              row?.source === 'Chat Interface' ? 'MessageSquare' :
              row?.source === 'Manual Entry'? 'Edit' : 'Zap'
            } 
            size={14} 
            className="text-muted-foreground" 
          />
          <span className="text-xs">{row?.source}</span>
        </div>
      )
    }
  ];

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleExport = async (exportConfig) => {
    setIsGeneratingReport(true);
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock download
    const reportName = `carbon_footprint_report_${new Date()?.toISOString()?.split('T')?.[0]}.${exportConfig?.format}`;
    console.log(`Generating ${reportName} with config:`, exportConfig);
    
    setIsGeneratingReport(false);
  };

  const handleSaveReport = () => {
    console.log('Saving report configuration:', filters);
  };

  useEffect(() => {
    // Simulate data loading based on filters
    console.log('Loading data with filters:', filters);
  }, [filters]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
                <p className="mt-2 text-muted-foreground">
                  Comprehensive carbon footprint analysis and insights
                </p>
              </div>
              
              <div className="mt-4 sm:mt-0 flex space-x-3">
                <Button
                  variant="outline"
                  iconName="Calendar"
                  onClick={() => setFilters(prev => ({ ...prev, dateRange: 'custom' }))}
                >
                  Custom Range
                </Button>
                <Button
                  variant="default"
                  iconName="Download"
                  loading={isGeneratingReport}
                  onClick={() => handleExport({ ...filters, format: 'pdf' })}
                >
                  Generate Report
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <ReportFilters
                onFiltersChange={handleFiltersChange}
                onExport={handleExport}
                onSaveReport={handleSaveReport}
              />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {summaryData?.map((card, index) => (
                  <ReportSummaryCard
                    key={index}
                    title={card?.title}
                    value={card?.value}
                    unit={card?.unit}
                    change={card?.change}
                    changeType={card?.changeType}
                    icon={card?.icon}
                    trend={card?.trend}
                  />
                ))}
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <EmissionChart
                  data={emissionTrendData}
                  title="Emission Trends Over Time"
                  type="line"
                  height={350}
                />
                
                <EmissionChart
                  data={categoryBreakdownData}
                  title="Emissions by Category"
                  type="pie"
                  height={350}
                />
              </div>

              {/* Comparison Widget */}
              <ComparisonWidget
                data={emissionTrendData}
                title="Performance Comparison"
              />

              {/* Detailed Data Table */}
              <DataTable
                data={detailedData}
                columns={tableColumns}
                title="Detailed Activity Log"
                exportable={true}
              />
            </div>
          </div>

          {/* Additional Insights Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card rounded-lg p-6 shadow-environmental border border-border">
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Lightbulb" size={20} className="text-accent" />
                <h3 className="text-lg font-semibold text-foreground">Key Insights</h3>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start space-x-2">
                  <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
                  <span>Transportation emissions reduced by 15% through increased public transport usage</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Icon name="TrendingUp" size={16} className="text-warning mt-0.5" />
                  <span>Energy consumption peaked in July due to increased air conditioning usage</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Icon name="Target" size={16} className="text-success mt-0.5" />
                  <span>On track to achieve 20% reduction goal by year-end</span>
                </li>
              </ul>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-environmental border border-border">
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="TrendingDown" size={20} className="text-success" />
                <h3 className="text-lg font-semibold text-foreground">Recommendations</h3>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start space-x-2">
                  <Icon name="ArrowRight" size={16} className="text-primary mt-0.5" />
                  <span>Consider switching to renewable energy sources to reduce home emissions</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Icon name="ArrowRight" size={16} className="text-primary mt-0.5" />
                  <span>Implement carpooling or remote work to further reduce transportation impact</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Icon name="ArrowRight" size={16} className="text-primary mt-0.5" />
                  <span>Explore carbon offset programs for unavoidable travel emissions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReportsAnalytics;