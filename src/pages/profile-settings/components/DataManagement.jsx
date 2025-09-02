import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const DataManagement = () => {
  const [exportSettings, setExportSettings] = useState({
    format: "json",
    dateRange: "all",
    includePersonalData: true,
    includeActivityData: true,
    includeCalculations: true,
    includeReports: false
  });

  const [privacySettings, setPrivacySettings] = useState({
    dataProcessing: true,
    analytics: false,
    marketing: false,
    thirdPartySharing: false
  });

  const [isExporting, setIsExporting] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  const exportFormatOptions = [
    { value: "json", label: "JSON", description: "Machine-readable format" },
    { value: "csv", label: "CSV", description: "Spreadsheet-compatible format" },
    { value: "pdf", label: "PDF", description: "Human-readable report format" },
    { value: "xml", label: "XML", description: "Structured data format" }
  ];

  const dateRangeOptions = [
    { value: "all", label: "All Time" },
    { value: "year", label: "Last 12 Months" },
    { value: "6months", label: "Last 6 Months" },
    { value: "3months", label: "Last 3 Months" },
    { value: "month", label: "Last Month" }
  ];

  const dataCategories = [
    {
      key: "personal",
      label: "Personal Information",
      description: "Profile data, preferences, and account settings",
      size: "2.3 KB"
    },
    {
      key: "activity",
      label: "Activity Data",
      description: "Transportation, energy usage, and consumption logs",
      size: "847 KB"
    },
    {
      key: "calculations",
      label: "Carbon Calculations",
      description: "Emission calculations and methodology data",
      size: "156 KB"
    },
    {
      key: "reports",
      label: "Generated Reports",
      description: "Historical reports and analytics",
      size: "1.2 MB"
    }
  ];

  const handleExportSettingChange = (field, value) => {
    setExportSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePrivacySettingChange = (field, value) => {
    setPrivacySettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleExportData = async () => {
    setIsExporting(true);
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsExporting(false);
    
    // Simulate file download
    const filename = `ecotracker-data-${new Date()?.toISOString()?.split('T')?.[0]}.${exportSettings?.format}`;
    console.log(`Downloading ${filename}`);
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation === "DELETE MY ACCOUNT") {
      setIsDeletingAccount(true);
      // Simulate account deletion
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsDeletingAccount(false);
      setShowDeleteConfirmation(false);
      // Redirect to goodbye page or login
    }
  };

  const getEstimatedSize = () => {
    let totalSize = 0;
    if (exportSettings?.includePersonalData) totalSize += 2.3;
    if (exportSettings?.includeActivityData) totalSize += 847;
    if (exportSettings?.includeCalculations) totalSize += 156;
    if (exportSettings?.includeReports) totalSize += 1200;
    
    if (totalSize < 1000) return `${totalSize?.toFixed(1)} KB`;
    return `${(totalSize / 1000)?.toFixed(1)} MB`;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="Database" size={24} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Data Management</h3>
      </div>
      <div className="space-y-8">
        {/* Data Export */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center">
            <Icon name="Download" size={18} className="mr-2 text-primary" />
            Export Your Data
          </h4>
          
          <div className="bg-muted rounded-lg p-4 mb-4">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={20} className="text-primary mt-0.5" />
              <div>
                <p className="text-sm text-foreground font-medium mb-1">
                  Data Portability Rights
                </p>
                <p className="text-sm text-muted-foreground">
                  You have the right to receive a copy of your personal data in a structured, commonly used format. This export includes all data associated with your account.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Select
                label="Export Format"
                options={exportFormatOptions}
                value={exportSettings?.format}
                onChange={(value) => handleExportSettingChange('format', value)}
                description="Choose the format for your exported data"
              />
              
              <Select
                label="Date Range"
                options={dateRangeOptions}
                value={exportSettings?.dateRange}
                onChange={(value) => handleExportSettingChange('dateRange', value)}
                description="Select the time period for data export"
              />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Data Categories to Include
                </label>
                <div className="space-y-3">
                  {dataCategories?.map((category) => (
                    <div key={category?.key} className="flex items-start space-x-3">
                      <Checkbox
                        checked={exportSettings?.[`include${category?.key?.charAt(0)?.toUpperCase() + category?.key?.slice(1)}Data`]}
                        onChange={(e) => handleExportSettingChange(
                          `include${category?.key?.charAt(0)?.toUpperCase() + category?.key?.slice(1)}Data`,
                          e?.target?.checked
                        )}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-foreground">
                            {category?.label}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {category?.size}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {category?.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-background border border-border rounded-lg p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Estimated export size:</span>
                  <span className="font-medium text-foreground">{getEstimatedSize()}</span>
                </div>
              </div>

              <Button
                variant="default"
                loading={isExporting}
                iconName="Download"
                iconPosition="left"
                onClick={handleExportData}
                fullWidth
              >
                {isExporting ? "Preparing Export..." : "Export Data"}
              </Button>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center">
            <Icon name="Shield" size={18} className="mr-2 text-primary" />
            Privacy Settings
          </h4>
          
          <div className="space-y-4">
            <div className="bg-muted rounded-lg p-4">
              <p className="text-sm text-foreground font-medium mb-2">
                GDPR Compliance
              </p>
              <p className="text-sm text-muted-foreground">
                We are committed to protecting your privacy and complying with GDPR regulations. You have full control over how your data is processed and shared.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Checkbox
                label="Essential Data Processing"
                description="Required for core functionality and account management"
                checked={privacySettings?.dataProcessing}
                onChange={(e) => handlePrivacySettingChange('dataProcessing', e?.target?.checked)}
                disabled
              />
              <Checkbox
                label="Analytics & Performance"
                description="Help us improve the service with anonymous usage data"
                checked={privacySettings?.analytics}
                onChange={(e) => handlePrivacySettingChange('analytics', e?.target?.checked)}
              />
              <Checkbox
                label="Marketing Communications"
                description="Receive updates about new features and environmental tips"
                checked={privacySettings?.marketing}
                onChange={(e) => handlePrivacySettingChange('marketing', e?.target?.checked)}
              />
              <Checkbox
                label="Third-party Data Sharing"
                description="Share anonymized data with environmental research partners"
                checked={privacySettings?.thirdPartySharing}
                onChange={(e) => handlePrivacySettingChange('thirdPartySharing', e?.target?.checked)}
              />
            </div>
          </div>
        </div>

        {/* Data Retention */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center">
            <Icon name="Clock" size={18} className="mr-2 text-primary" />
            Data Retention
          </h4>
          
          <div className="bg-background border border-border rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Account Data:</span>
                <div className="font-medium text-foreground">Until account deletion</div>
              </div>
              <div>
                <span className="text-muted-foreground">Activity Logs:</span>
                <div className="font-medium text-foreground">5 years</div>
              </div>
              <div>
                <span className="text-muted-foreground">Analytics Data:</span>
                <div className="font-medium text-foreground">2 years (anonymized)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Account Deletion */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center">
            <Icon name="Trash2" size={18} className="mr-2 text-error" />
            Delete Account
          </h4>
          
          <div className="bg-error/10 border border-error/20 rounded-lg p-4">
            <div className="flex items-start space-x-3 mb-4">
              <Icon name="AlertTriangle" size={20} className="text-error mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground mb-1">
                  Permanent Account Deletion
                </p>
                <p className="text-sm text-muted-foreground">
                  This action cannot be undone. All your data, including carbon tracking history, reports, and account information will be permanently deleted.
                </p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-2">What will be deleted:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Profile information and preferences</li>
                  <li>All carbon tracking data and calculations</li>
                  <li>Generated reports and analytics</li>
                  <li>Workflow configurations and chat history</li>
                  <li>Account settings and security information</li>
                </ul>
              </div>
              
              {!showDeleteConfirmation ? (
                <Button
                  variant="destructive"
                  iconName="Trash2"
                  iconPosition="left"
                  onClick={() => setShowDeleteConfirmation(true)}
                >
                  Delete My Account
                </Button>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Type "DELETE MY ACCOUNT" to confirm:
                    </label>
                    <input
                      type="text"
                      value={deleteConfirmation}
                      onChange={(e) => setDeleteConfirmation(e?.target?.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="DELETE MY ACCOUNT"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="destructive"
                      loading={isDeletingAccount}
                      onClick={handleDeleteAccount}
                      disabled={deleteConfirmation !== "DELETE MY ACCOUNT"}
                    >
                      Permanently Delete Account
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setShowDeleteConfirmation(false);
                        setDeleteConfirmation("");
                      }}
                      disabled={isDeletingAccount}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataManagement;