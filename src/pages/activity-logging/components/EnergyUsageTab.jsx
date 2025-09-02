import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const EnergyUsageTab = ({ 
  data, 
  onChange, 
  onCalculate, 
  emissions = 0, 
  isCalculating = false 
}) => {
  const energyTypes = [
    { value: 'electricity', label: 'Electricity' },
    { value: 'natural_gas', label: 'Natural Gas' },
    { value: 'heating_oil', label: 'Heating Oil' },
    { value: 'propane', label: 'Propane' },
    { value: 'coal', label: 'Coal' },
    { value: 'solar', label: 'Solar' },
    { value: 'wind', label: 'Wind' }
  ];

  const usageTypes = [
    { value: 'heating', label: 'Heating' },
    { value: 'cooling', label: 'Cooling/AC' },
    { value: 'lighting', label: 'Lighting' },
    { value: 'appliances', label: 'Appliances' },
    { value: 'water_heating', label: 'Water Heating' },
    { value: 'other', label: 'Other' }
  ];

  const handleInputChange = (field, value) => {
    onChange('energy', { ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Energy Type"
          description="Primary energy source used"
          options={energyTypes}
          value={data?.energyType || ''}
          onChange={(value) => handleInputChange('energyType', value)}
          required
          className="mb-4"
        />

        <Select
          label="Usage Category"
          description="What the energy was used for"
          options={usageTypes}
          value={data?.usageType || ''}
          onChange={(value) => handleInputChange('usageType', value)}
          required
          className="mb-4"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Input
          label="Consumption Amount"
          type="number"
          placeholder="0"
          description="kWh, therms, or gallons"
          value={data?.consumption || ''}
          onChange={(e) => handleInputChange('consumption', e?.target?.value)}
          required
          min="0"
          step="0.1"
        />

        <Input
          label="Usage Duration"
          type="number"
          placeholder="0"
          description="Hours of usage"
          value={data?.duration || ''}
          onChange={(e) => handleInputChange('duration', e?.target?.value)}
          min="0"
          step="0.5"
        />

        <Input
          label="Cost per Unit"
          type="number"
          placeholder="0.00"
          description="USD per kWh/therm"
          value={data?.costPerUnit || ''}
          onChange={(e) => handleInputChange('costPerUnit', e?.target?.value)}
          min="0"
          step="0.01"
        />
      </div>
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-foreground">Energy Emissions</h4>
          <Button
            variant="outline"
            size="sm"
            iconName="Calculator"
            iconPosition="left"
            onClick={() => onCalculate('energy')}
            loading={isCalculating}
            disabled={!data?.energyType || !data?.consumption}
          >
            Calculate
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Icon name="Zap" size={20} className="text-muted-foreground" />
          <span className="text-2xl font-bold text-primary">
            {emissions?.toFixed(2)} kg CO₂
          </span>
        </div>
        
        {emissions > 0 && (
          <div className="mt-3 space-y-1">
            <p className="text-sm text-muted-foreground">
              Based on {data?.consumption} {data?.energyType === 'electricity' ? 'kWh' : 'units'} of {data?.energyType?.replace('_', ' ')}
            </p>
            {data?.costPerUnit && (
              <p className="text-sm text-success">
                Estimated cost: ${(parseFloat(data?.consumption || 0) * parseFloat(data?.costPerUnit || 0))?.toFixed(2)}
              </p>
            )}
          </div>
        )}
      </div>
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Leaf" size={20} className="text-green-600 mt-0.5" />
          <div>
            <h5 className="font-medium text-green-900 mb-1">Energy Saving Tips</h5>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Switch to LED bulbs to reduce electricity usage by 75%</li>
              <li>• Set thermostat 2°F lower in winter, 2°F higher in summer</li>
              <li>• Unplug electronics when not in use to eliminate phantom loads</li>
              <li>• Use programmable thermostats for optimal energy efficiency</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnergyUsageTab;