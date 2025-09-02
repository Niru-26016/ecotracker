import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import TransportationTab from './components/TransportationTab';
import EnergyUsageTab from './components/EnergyUsageTab';
import ConsumptionTab from './components/ConsumptionTab';
import EmissionsSummary from './components/EmissionsSummary';
import BulkUploadModal from './components/BulkUploadModal';

const ActivityLogging = () => {
  const [activeTab, setActiveTab] = useState('transportation');
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  const [activityData, setActivityData] = useState({
    transportation: {
      vehicleType: '',
      fuelType: '',
      distance: '',
      fuelConsumption: '',
      passengers: '1'
    },
    energy: {
      energyType: '',
      usageType: '',
      consumption: '',
      duration: '',
      costPerUnit: ''
    },
    consumption: {
      category: '',
      itemDescription: '',
      quantity: '',
      weight: '',
      cost: '',
      wasteType: '',
      wasteAmount: ''
    }
  });

  const [emissions, setEmissions] = useState({
    transportation: 0,
    energy: 0,
    consumption: 0
  });

  // Mock previous entries data
  const previousEntries = [
    {
      date: "Aug 31, 2025",
      activities: 3,
      total: 45.8,
      breakdown: { transportation: 25.3, energy: 15.2, consumption: 5.3 }
    },
    {
      date: "Aug 30, 2025", 
      activities: 2,
      total: 32.1,
      breakdown: { transportation: 18.7, energy: 13.4, consumption: 0 }
    },
    {
      date: "Aug 29, 2025",
      activities: 4,
      total: 52.3,
      breakdown: { transportation: 28.9, energy: 18.1, consumption: 5.3 }
    }
  ];

  const tabs = [
    {
      id: 'transportation',
      label: 'Transportation',
      icon: 'Car',
      description: 'Vehicle usage and travel'
    },
    {
      id: 'energy',
      label: 'Energy Usage',
      icon: 'Zap',
      description: 'Electricity, heating, cooling'
    },
    {
      id: 'consumption',
      label: 'Consumption',
      icon: 'Package',
      description: 'Purchases and waste'
    }
  ];

  // Auto-save functionality
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (Object.values(activityData)?.some(category => 
        Object.values(category)?.some(value => value !== '' && value !== '1')
      )) {
        handleAutoSave();
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, [activityData]);

  const handleDataChange = (category, newData) => {
    setActivityData(prev => ({
      ...prev,
      [category]: newData
    }));
  };

  const calculateEmissions = (category) => {
    setIsCalculating(true);
    
    // Simulate calculation delay
    setTimeout(() => {
      let calculatedEmissions = 0;
      const data = activityData?.[category];

      switch (category) {
        case 'transportation':
          if (data?.distance && data?.vehicleType) {
            const emissionFactors = {
              car_gasoline: 0.404,
              car_diesel: 0.411,
              car_hybrid: 0.202,
              car_electric: 0.123,
              motorcycle: 0.294,
              bus: 0.089,
              train: 0.041,
              flight_domestic: 0.255,
              flight_international: 0.298
            };
            const factor = emissionFactors?.[data?.vehicleType] || 0.404;
            const passengers = parseInt(data?.passengers) || 1;
            calculatedEmissions = (parseFloat(data?.distance) * factor) / passengers;
          }
          break;

        case 'energy':
          if (data?.consumption && data?.energyType) {
            const emissionFactors = {
              electricity: 0.92,
              natural_gas: 5.3,
              heating_oil: 10.15,
              propane: 5.75,
              coal: 2.23,
              solar: 0.04,
              wind: 0.01
            };
            const factor = emissionFactors?.[data?.energyType] || 0.92;
            calculatedEmissions = parseFloat(data?.consumption) * factor;
          }
          break;

        case 'consumption':
          if (data?.quantity && data?.category) {
            const emissionFactors = {
              food_meat: 6.61,
              food_plant: 2.0,
              clothing: 8.1,
              electronics: 300,
              furniture: 85,
              paper: 1.8,
              plastic: 3.4,
              other: 2.5
            };
            const factor = emissionFactors?.[data?.category] || 2.5;
            calculatedEmissions = parseFloat(data?.quantity) * factor;
            
            // Add waste emissions if specified
            if (data?.wasteAmount) {
              calculatedEmissions += parseFloat(data?.wasteAmount) * 0.5;
            }
          }
          break;
      }

      setEmissions(prev => ({
        ...prev,
        [category]: calculatedEmissions
      }));
      setIsCalculating(false);
    }, 1000);
  };

  const handleAutoSave = async () => {
    setIsAutoSaving(true);
    
    // Simulate auto-save
    setTimeout(() => {
      setLastSaved(new Date());
      setIsAutoSaving(false);
    }, 500);
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate save process
    setTimeout(() => {
      setLastSaved(new Date());
      setIsSaving(false);
      
      // Show success message
      alert('Activity log saved successfully!');
      
      // Reset form after save
      setActivityData({
        transportation: {
          vehicleType: '',
          fuelType: '',
          distance: '',
          fuelConsumption: '',
          passengers: '1'
        },
        energy: {
          energyType: '',
          usageType: '',
          consumption: '',
          duration: '',
          costPerUnit: ''
        },
        consumption: {
          category: '',
          itemDescription: '',
          quantity: '',
          weight: '',
          cost: '',
          wasteType: '',
          wasteAmount: ''
        }
      });
      
      setEmissions({
        transportation: 0,
        energy: 0,
        consumption: 0
      });
    }, 1500);
  };

  const handleBulkUpload = (uploadedData) => {
    // Process uploaded data and update emissions
    const newEmissions = { ...emissions };
    
    uploadedData?.forEach(item => {
      if (item?.category && item?.emissions) {
        newEmissions[item.category] = (newEmissions?.[item?.category] || 0) + item?.emissions;
      }
    });
    
    setEmissions(newEmissions);
    alert(`Successfully processed ${uploadedData?.length} activities from CSV upload!`);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'transportation':
        return (
          <TransportationTab
            data={activityData?.transportation}
            onChange={handleDataChange}
            onCalculate={calculateEmissions}
            emissions={emissions?.transportation}
            isCalculating={isCalculating}
          />
        );
      case 'energy':
        return (
          <EnergyUsageTab
            data={activityData?.energy}
            onChange={handleDataChange}
            onCalculate={calculateEmissions}
            emissions={emissions?.energy}
            isCalculating={isCalculating}
          />
        );
      case 'consumption':
        return (
          <ConsumptionTab
            data={activityData?.consumption}
            onChange={handleDataChange}
            onCalculate={calculateEmissions}
            emissions={emissions?.consumption}
            isCalculating={isCalculating}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
            <a href="/dashboard" className="hover:text-foreground transition-environmental">
              Dashboard
            </a>
            <Icon name="ChevronRight" size={16} />
            <span className="text-foreground">Log Activity</span>
          </nav>

          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Activity Logging</h1>
              <p className="text-muted-foreground">
                Manually track carbon-generating activities for comprehensive footprint analysis
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              {/* Auto-save indicator */}
              {isAutoSaving && (
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Save" size={16} className="animate-pulse" />
                  <span>Auto-saving...</span>
                </div>
              )}
              
              {lastSaved && (
                <div className="flex items-center space-x-2 text-sm text-success">
                  <Icon name="CheckCircle" size={16} />
                  <span>Saved {lastSaved?.toLocaleTimeString()}</span>
                </div>
              )}

              <Button
                variant="outline"
                iconName="Upload"
                iconPosition="left"
                onClick={() => setShowBulkUpload(true)}
              >
                Bulk Upload
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Tab Navigation */}
              <div className="bg-card border border-border rounded-lg mb-6">
                <div className="border-b border-border">
                  <nav className="flex space-x-8 px-6" aria-label="Activity categories">
                    {tabs?.map((tab) => (
                      <button
                        key={tab?.id}
                        onClick={() => setActiveTab(tab?.id)}
                        className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-environmental ${
                          activeTab === tab?.id
                            ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                        }`}
                      >
                        <Icon name={tab?.icon} size={18} />
                        <span>{tab?.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Description */}
                <div className="px-6 py-4 bg-muted/50">
                  <p className="text-sm text-muted-foreground">
                    {tabs?.find(tab => tab?.id === activeTab)?.description}
                  </p>
                </div>
              </div>

              {/* Tab Content */}
              <div className="bg-card border border-border rounded-lg p-6">
                {renderTabContent()}
              </div>

              {/* Mobile Summary (visible on mobile only) */}
              <div className="lg:hidden mt-6">
                <EmissionsSummary
                  emissions={emissions}
                  previousEntries={previousEntries}
                  onSave={handleSave}
                  isSaving={isSaving}
                />
              </div>
            </div>

            {/* Sidebar - Emissions Summary */}
            <div className="hidden lg:block">
              <EmissionsSummary
                emissions={emissions}
                previousEntries={previousEntries}
                onSave={handleSave}
                isSaving={isSaving}
              />
            </div>
          </div>

          {/* Quick Actions Bar (Mobile) */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
            <div className="flex space-x-3">
              <Button
                variant="outline"
                fullWidth
                iconName="Calculator"
                iconPosition="left"
                onClick={() => calculateEmissions(activeTab)}
                loading={isCalculating}
              >
                Calculate
              </Button>
              
              <Button
                variant="default"
                fullWidth
                iconName="Save"
                iconPosition="left"
                onClick={handleSave}
                loading={isSaving}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </main>
      {/* Bulk Upload Modal */}
      <BulkUploadModal
        isOpen={showBulkUpload}
        onClose={() => setShowBulkUpload(false)}
        onUpload={handleBulkUpload}
      />
    </div>
  );
};

export default ActivityLogging;