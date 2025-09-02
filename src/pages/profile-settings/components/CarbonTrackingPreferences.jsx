import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const CarbonTrackingPreferences = () => {
  const [preferences, setPreferences] = useState({
    calculationMethod: "ipcc",
    defaultUnits: "metric",
    trackingFrequency: "daily",
    annualGoal: "2500",
    reductionTarget: "15",
    categories: {
      transportation: true,
      energy: true,
      food: true,
      consumption: true,
      travel: false
    },
    notifications: {
      dailyReminders: true,
      weeklyReports: true,
      goalMilestones: true,
      exceedThreshold: true
    },
    autoCalculation: true,
    includeOffsets: false
  });

  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const calculationMethodOptions = [
    { value: "ipcc", label: "IPCC Guidelines", description: "International standard methodology" },
    { value: "epa", label: "EPA Method", description: "US Environmental Protection Agency" },
    { value: "defra", label: "DEFRA Method", description: "UK Department for Environment" },
    { value: "custom", label: "Custom Factors", description: "User-defined emission factors" }
  ];

  const unitOptions = [
    { value: "metric", label: "Metric (kg CO₂e)" },
    { value: "imperial", label: "Imperial (lbs CO₂e)" },
    { value: "tons", label: "Tons CO₂e" }
  ];

  const frequencyOptions = [
    { value: "daily", label: "Daily Tracking" },
    { value: "weekly", label: "Weekly Summary" },
    { value: "monthly", label: "Monthly Review" }
  ];

  const handlePreferenceChange = (field, value) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  const handleCategoryChange = (category, checked) => {
    setPreferences(prev => ({
      ...prev,
      categories: {
        ...prev?.categories,
        [category]: checked
      }
    }));
    setHasChanges(true);
  };

  const handleNotificationChange = (notification, checked) => {
    setPreferences(prev => ({
      ...prev,
      notifications: {
        ...prev?.notifications,
        [notification]: checked
      }
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setHasChanges(false);
  };

  const handleReset = () => {
    // Reset to default preferences
    setHasChanges(false);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Settings" size={24} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Carbon Tracking Preferences</h3>
        </div>
        {hasChanges && (
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              disabled={isSaving}
            >
              Reset
            </Button>
            <Button
              variant="default"
              size="sm"
              loading={isSaving}
              iconName="Save"
              iconPosition="left"
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </div>
        )}
      </div>
      <div className="space-y-8">
        {/* Calculation Settings */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center">
            <Icon name="Calculator" size={18} className="mr-2 text-primary" />
            Calculation Settings
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Calculation Method"
              options={calculationMethodOptions}
              value={preferences?.calculationMethod}
              onChange={(value) => handlePreferenceChange('calculationMethod', value)}
              description="Choose your preferred emission calculation standard"
            />
            <Select
              label="Default Units"
              options={unitOptions}
              value={preferences?.defaultUnits}
              onChange={(value) => handlePreferenceChange('defaultUnits', value)}
              description="Units for displaying carbon emissions"
            />
          </div>
        </div>

        {/* Goals & Targets */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center">
            <Icon name="Target" size={18} className="mr-2 text-primary" />
            Goals & Targets
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Annual Goal (kg CO₂e)"
              type="number"
              value={preferences?.annualGoal}
              onChange={(e) => handlePreferenceChange('annualGoal', e?.target?.value)}
              description="Your target annual carbon footprint"
            />
            <Input
              label="Reduction Target (%)"
              type="number"
              value={preferences?.reductionTarget}
              onChange={(e) => handlePreferenceChange('reductionTarget', e?.target?.value)}
              description="Percentage reduction goal"
              min="0"
              max="100"
            />
            <Select
              label="Tracking Frequency"
              options={frequencyOptions}
              value={preferences?.trackingFrequency}
              onChange={(value) => handlePreferenceChange('trackingFrequency', value)}
              description="How often to review progress"
            />
          </div>
        </div>

        {/* Tracking Categories */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center">
            <Icon name="Layers" size={18} className="mr-2 text-primary" />
            Tracking Categories
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Checkbox
              label="Transportation"
              description="Cars, public transport, flights"
              checked={preferences?.categories?.transportation}
              onChange={(e) => handleCategoryChange('transportation', e?.target?.checked)}
            />
            <Checkbox
              label="Energy Usage"
              description="Electricity, heating, cooling"
              checked={preferences?.categories?.energy}
              onChange={(e) => handleCategoryChange('energy', e?.target?.checked)}
            />
            <Checkbox
              label="Food & Diet"
              description="Meals, groceries, dining"
              checked={preferences?.categories?.food}
              onChange={(e) => handleCategoryChange('food', e?.target?.checked)}
            />
            <Checkbox
              label="Consumption"
              description="Shopping, goods, services"
              checked={preferences?.categories?.consumption}
              onChange={(e) => handleCategoryChange('consumption', e?.target?.checked)}
            />
            <Checkbox
              label="Travel & Leisure"
              description="Vacations, entertainment"
              checked={preferences?.categories?.travel}
              onChange={(e) => handleCategoryChange('travel', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Notifications */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center">
            <Icon name="Bell" size={18} className="mr-2 text-primary" />
            Notification Preferences
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Checkbox
              label="Daily Reminders"
              description="Remind me to log daily activities"
              checked={preferences?.notifications?.dailyReminders}
              onChange={(e) => handleNotificationChange('dailyReminders', e?.target?.checked)}
            />
            <Checkbox
              label="Weekly Reports"
              description="Send weekly carbon footprint summary"
              checked={preferences?.notifications?.weeklyReports}
              onChange={(e) => handleNotificationChange('weeklyReports', e?.target?.checked)}
            />
            <Checkbox
              label="Goal Milestones"
              description="Notify when reaching reduction milestones"
              checked={preferences?.notifications?.goalMilestones}
              onChange={(e) => handleNotificationChange('goalMilestones', e?.target?.checked)}
            />
            <Checkbox
              label="Threshold Alerts"
              description="Alert when exceeding daily/weekly limits"
              checked={preferences?.notifications?.exceedThreshold}
              onChange={(e) => handleNotificationChange('exceedThreshold', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Advanced Options */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center">
            <Icon name="Cog" size={18} className="mr-2 text-primary" />
            Advanced Options
          </h4>
          <div className="space-y-4">
            <Checkbox
              label="Auto-calculation"
              description="Automatically calculate emissions from activity data"
              checked={preferences?.autoCalculation}
              onChange={(e) => handlePreferenceChange('autoCalculation', e?.target?.checked)}
            />
            <Checkbox
              label="Include Carbon Offsets"
              description="Factor in purchased carbon offsets in calculations"
              checked={preferences?.includeOffsets}
              onChange={(e) => handlePreferenceChange('includeOffsets', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Current Settings Summary */}
        <div className="bg-muted rounded-lg p-4">
          <h5 className="text-sm font-medium text-foreground mb-3">Current Configuration</h5>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Method:</span>
              <div className="font-medium text-foreground">
                {calculationMethodOptions?.find(opt => opt?.value === preferences?.calculationMethod)?.label}
              </div>
            </div>
            <div>
              <span className="text-muted-foreground">Units:</span>
              <div className="font-medium text-foreground">
                {unitOptions?.find(opt => opt?.value === preferences?.defaultUnits)?.label}
              </div>
            </div>
            <div>
              <span className="text-muted-foreground">Annual Goal:</span>
              <div className="font-medium text-foreground">{preferences?.annualGoal} kg CO₂e</div>
            </div>
            <div>
              <span className="text-muted-foreground">Reduction:</span>
              <div className="font-medium text-foreground">{preferences?.reductionTarget}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonTrackingPreferences;