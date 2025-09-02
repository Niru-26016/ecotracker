import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ConsumptionTab = ({ 
  data, 
  onChange, 
  onCalculate, 
  emissions = 0, 
  isCalculating = false 
}) => {
  const consumptionCategories = [
    { value: 'food_meat', label: 'Food - Meat & Dairy' },
    { value: 'food_plant', label: 'Food - Plant-based' },
    { value: 'clothing', label: 'Clothing & Textiles' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'furniture', label: 'Furniture' },
    { value: 'paper', label: 'Paper Products' },
    { value: 'plastic', label: 'Plastic Items' },
    { value: 'other', label: 'Other Purchases' }
  ];

  const wasteTypes = [
    { value: 'general', label: 'General Waste' },
    { value: 'recycling', label: 'Recycling' },
    { value: 'compost', label: 'Compost/Organic' },
    { value: 'electronic', label: 'Electronic Waste' },
    { value: 'hazardous', label: 'Hazardous Materials' }
  ];

  const handleInputChange = (field, value) => {
    onChange('consumption', { ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="font-medium text-foreground mb-4 flex items-center">
          <Icon name="ShoppingCart" size={20} className="mr-2" />
          Purchases & Consumption
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Category"
            description="Type of item purchased"
            options={consumptionCategories}
            value={data?.category || ''}
            onChange={(value) => handleInputChange('category', value)}
            required
            className="mb-4"
          />

          <Input
            label="Item Description"
            type="text"
            placeholder="e.g., Beef steak, Cotton t-shirt"
            description="Brief description of the item"
            value={data?.itemDescription || ''}
            onChange={(e) => handleInputChange('itemDescription', e?.target?.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Input
            label="Quantity"
            type="number"
            placeholder="1"
            description="Number of items"
            value={data?.quantity || ''}
            onChange={(e) => handleInputChange('quantity', e?.target?.value)}
            required
            min="1"
          />

          <Input
            label="Weight/Volume"
            type="number"
            placeholder="0"
            description="lbs, kg, or liters"
            value={data?.weight || ''}
            onChange={(e) => handleInputChange('weight', e?.target?.value)}
            min="0"
            step="0.1"
          />

          <Input
            label="Purchase Cost"
            type="number"
            placeholder="0.00"
            description="Total cost in USD"
            value={data?.cost || ''}
            onChange={(e) => handleInputChange('cost', e?.target?.value)}
            min="0"
            step="0.01"
          />
        </div>
      </div>
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="font-medium text-foreground mb-4 flex items-center">
          <Icon name="Trash2" size={20} className="mr-2" />
          Waste Generation
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Waste Type"
            description="Category of waste generated"
            options={wasteTypes}
            value={data?.wasteType || ''}
            onChange={(value) => handleInputChange('wasteType', value)}
            className="mb-4"
          />

          <Input
            label="Waste Amount"
            type="number"
            placeholder="0"
            description="Weight in pounds"
            value={data?.wasteAmount || ''}
            onChange={(e) => handleInputChange('wasteAmount', e?.target?.value)}
            min="0"
            step="0.1"
          />
        </div>
      </div>
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-foreground">Consumption Emissions</h4>
          <Button
            variant="outline"
            size="sm"
            iconName="Calculator"
            iconPosition="left"
            onClick={() => onCalculate('consumption')}
            loading={isCalculating}
            disabled={!data?.category || !data?.quantity}
          >
            Calculate
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Icon name="Package" size={20} className="text-muted-foreground" />
          <span className="text-2xl font-bold text-primary">
            {emissions?.toFixed(2)} kg CO₂
          </span>
        </div>
        
        {emissions > 0 && (
          <div className="mt-3 space-y-1">
            <p className="text-sm text-muted-foreground">
              Based on {data?.quantity} {data?.category?.replace('_', ' ')} items
            </p>
            {data?.weight && (
              <p className="text-sm text-muted-foreground">
                Total weight: {data?.weight} lbs
              </p>
            )}
          </div>
        )}
      </div>
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Recycle" size={20} className="text-purple-600 mt-0.5" />
          <div>
            <h5 className="font-medium text-purple-900 mb-1">Sustainable Consumption Tips</h5>
            <ul className="text-sm text-purple-800 space-y-1">
              <li>• Choose local and seasonal products to reduce transport emissions</li>
              <li>• Buy in bulk to reduce packaging waste</li>
              <li>• Opt for durable, repairable items over disposable ones</li>
              <li>• Consider second-hand options for clothing and electronics</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsumptionTab;