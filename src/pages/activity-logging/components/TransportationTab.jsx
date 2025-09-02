import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TransportationTab = ({ 
  data, 
  onChange, 
  onCalculate, 
  emissions = 0, 
  isCalculating = false 
}) => {
  const vehicleTypes = [
    { value: 'car_gasoline', label: 'Car (Gasoline)' },
    { value: 'car_diesel', label: 'Car (Diesel)' },
    { value: 'car_hybrid', label: 'Car (Hybrid)' },
    { value: 'car_electric', label: 'Car (Electric)' },
    { value: 'motorcycle', label: 'Motorcycle' },
    { value: 'bus', label: 'Bus' },
    { value: 'train', label: 'Train' },
    { value: 'flight_domestic', label: 'Flight (Domestic)' },
    { value: 'flight_international', label: 'Flight (International)' }
  ];

  const fuelTypes = [
    { value: 'gasoline', label: 'Gasoline' },
    { value: 'diesel', label: 'Diesel' },
    { value: 'electric', label: 'Electric' },
    { value: 'hybrid', label: 'Hybrid' }
  ];

  const handleInputChange = (field, value) => {
    onChange('transportation', { ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Vehicle Type"
          description="Select the type of transportation used"
          options={vehicleTypes}
          value={data?.vehicleType || ''}
          onChange={(value) => handleInputChange('vehicleType', value)}
          required
          className="mb-4"
        />

        <Select
          label="Fuel Type"
          description="Type of fuel or energy source"
          options={fuelTypes}
          value={data?.fuelType || ''}
          onChange={(value) => handleInputChange('fuelType', value)}
          required
          className="mb-4"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Input
          label="Distance Traveled"
          type="number"
          placeholder="0"
          description="Distance in miles"
          value={data?.distance || ''}
          onChange={(e) => handleInputChange('distance', e?.target?.value)}
          required
          min="0"
          step="0.1"
        />

        <Input
          label="Fuel Consumption"
          type="number"
          placeholder="0"
          description="Gallons or kWh used"
          value={data?.fuelConsumption || ''}
          onChange={(e) => handleInputChange('fuelConsumption', e?.target?.value)}
          min="0"
          step="0.01"
        />

        <Input
          label="Number of Passengers"
          type="number"
          placeholder="1"
          description="Including yourself"
          value={data?.passengers || '1'}
          onChange={(e) => handleInputChange('passengers', e?.target?.value)}
          min="1"
          max="50"
        />
      </div>
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-foreground">Transportation Emissions</h4>
          <Button
            variant="outline"
            size="sm"
            iconName="Calculator"
            iconPosition="left"
            onClick={() => onCalculate('transportation')}
            loading={isCalculating}
            disabled={!data?.vehicleType || !data?.distance}
          >
            Calculate
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Icon name="Car" size={20} className="text-muted-foreground" />
          <span className="text-2xl font-bold text-primary">
            {emissions?.toFixed(2)} kg CO₂
          </span>
        </div>
        
        {emissions > 0 && (
          <p className="text-sm text-muted-foreground mt-2">
            Based on {data?.distance} miles using {data?.vehicleType?.replace('_', ' ')}
          </p>
        )}
      </div>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} className="text-blue-600 mt-0.5" />
          <div>
            <h5 className="font-medium text-blue-900 mb-1">Reduction Tips</h5>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Consider carpooling to reduce per-person emissions</li>
              <li>• Electric vehicles produce 50-70% fewer emissions</li>
              <li>• Public transport can reduce emissions by up to 80%</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportationTab;