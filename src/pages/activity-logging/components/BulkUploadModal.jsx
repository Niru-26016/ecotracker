import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const BulkUploadModal = ({ isOpen, onClose, onUpload }) => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const selectedFile = e?.target?.files?.[0];
    if (selectedFile && selectedFile?.type === 'text/csv') {
      setFile(selectedFile);
    } else {
      alert('Please select a valid CSV file');
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate file processing
    setTimeout(() => {
      clearInterval(progressInterval);
      setUploadProgress(100);

      // Mock processed data
      const mockData = [
        { category: 'transportation', vehicleType: 'car_gasoline', distance: 25.5, emissions: 12.3 },
        { category: 'energy', energyType: 'electricity', consumption: 150, emissions: 45.2 },
        { category: 'consumption', itemCategory: 'food_meat', quantity: 2, emissions: 8.7 }
      ];


      setTimeout(() => {
        onUpload(mockData);
        setIsUploading(false);
        setUploadProgress(0);
        setFile(null);
        onClose();
      }, 500);
    }, 2000);
  };

  const downloadTemplate = () => {
    const csvContent = `Category,Vehicle Type,Distance,Energy Type,Consumption,Item Category,Quantity,Description
transportation,car_gasoline,25.5,,,,,Daily commute
energy,,,,electricity,150,,,Home usage
consumption,,,,,food_meat,2,Beef steaks`;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL?.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'activity_template.csv';
    a?.click();
    window.URL?.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-environmental-lg max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Bulk Upload Activities</h3>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
            className="w-8 h-8"
          />
        </div>

        <div className="p-6 space-y-6">
          <div className="text-center">
            <Icon name="Upload" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-sm text-muted-foreground">
              Upload a CSV file with your activity data for bulk processing
            </p>
          </div>

          <div className="space-y-4">
            <Input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              label="Select CSV File"
              description="Only CSV files are supported"
            />

            {file && (
              <div className="bg-muted rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <Icon name="FileText" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-foreground">{file?.name}</span>
                  <span className="text-xs text-muted-foreground">
                    ({(file?.size / 1024)?.toFixed(1)} KB)
                  </span>
                </div>
              </div>
            )}

            {isUploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Processing...</span>
                  <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={20} className="text-blue-600 mt-0.5" />
              <div>
                <h5 className="font-medium text-blue-900 mb-1">CSV Format Requirements</h5>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Include headers: Category, Vehicle Type, Distance, etc.</li>
                  <li>• Use standard units (miles, kWh, pounds)</li>
                  <li>• Maximum file size: 5MB</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button
              variant="outline"
              fullWidth
              iconName="Download"
              iconPosition="left"
              onClick={downloadTemplate}
            >
              Download Template
            </Button>

            <Button
              variant="default"
              fullWidth
              iconName="Upload"
              iconPosition="left"
              onClick={handleUpload}
              disabled={!file || isUploading}
              loading={isUploading}
            >
              Upload & Process
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkUploadModal;