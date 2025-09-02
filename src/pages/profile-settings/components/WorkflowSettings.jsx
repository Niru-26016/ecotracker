import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const WorkflowSettings = () => {
  const [workflowConfig, setWorkflowConfig] = useState({
    n8nEndpoint: "https://n8n.ecotracker.app/webhook/carbon-data",
    apiKey: "ect_live_sk_1234567890abcdef",
    webhookSecret: "whsec_1234567890abcdef1234567890abcdef",
    autoTrigger: true,
    chatIntegration: true,
    dataSync: "realtime",
    retryAttempts: 3,
    timeout: 30,
    enableLogging: true,
    logLevel: "info"
  });

  const [connectionStatus, setConnectionStatus] = useState("connected");
  const [lastSync, setLastSync] = useState("2025-09-01T14:45:00Z");
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [showWebhookSecret, setShowWebhookSecret] = useState(false);

  const dataSyncOptions = [
    { value: "realtime", label: "Real-time", description: "Immediate data synchronization" },
    { value: "hourly", label: "Hourly", description: "Sync every hour" },
    { value: "daily", label: "Daily", description: "Sync once per day" },
    { value: "manual", label: "Manual", description: "Sync only when requested" }
  ];

  const logLevelOptions = [
    { value: "error", label: "Error Only" },
    { value: "warn", label: "Warnings & Errors" },
    { value: "info", label: "Info, Warnings & Errors" },
    { value: "debug", label: "All Messages (Debug)" }
  ];

  const handleConfigChange = (field, value) => {
    setWorkflowConfig(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    // Simulate connection test
    await new Promise(resolve => setTimeout(resolve, 2000));
    setConnectionStatus("connected");
    setIsTesting(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setHasChanges(false);
  };

  const handleGenerateApiKey = () => {
    const newApiKey = `ect_live_sk_${Math.random()?.toString(36)?.substring(2, 15)}${Math.random()?.toString(36)?.substring(2, 15)}`;
    handleConfigChange('apiKey', newApiKey);
  };

  const handleGenerateWebhookSecret = () => {
    const newSecret = `whsec_${Math.random()?.toString(36)?.substring(2, 15)}${Math.random()?.toString(36)?.substring(2, 15)}`;
    handleConfigChange('webhookSecret', newSecret);
  };

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return 'text-success';
      case 'disconnected': return 'text-error';
      case 'testing': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = () => {
    switch (connectionStatus) {
      case 'connected': return 'CheckCircle';
      case 'disconnected': return 'XCircle';
      case 'testing': return 'Clock';
      default: return 'AlertCircle';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Workflow" size={24} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Workflow Settings</h3>
        </div>
        {hasChanges && (
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
        )}
      </div>
      <div className="space-y-8">
        {/* Connection Status */}
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold text-foreground">Connection Status</h4>
            <Button
              variant="outline"
              size="sm"
              loading={isTesting}
              iconName="RefreshCw"
              iconPosition="left"
              onClick={handleTestConnection}
            >
              Test Connection
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Icon name={getStatusIcon()} size={18} className={getStatusColor()} />
              <span className={`text-sm font-medium ${getStatusColor()}`}>
                {connectionStatus === 'connected' ? 'Connected' : 
                 connectionStatus === 'testing' ? 'Testing...' : 'Disconnected'}
              </span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Last Sync:</span>
              <div className="font-medium text-foreground">
                {new Date(lastSync)?.toLocaleString()}
              </div>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Data Points:</span>
              <div className="font-medium text-foreground">1,247 synced</div>
            </div>
          </div>
        </div>

        {/* n8n Integration */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center">
            <Icon name="Link" size={18} className="mr-2 text-primary" />
            n8n Integration
          </h4>
          <div className="space-y-4">
            <Input
              label="n8n Webhook Endpoint"
              type="url"
              value={workflowConfig?.n8nEndpoint}
              onChange={(e) => handleConfigChange('n8nEndpoint', e?.target?.value)}
              description="Your n8n workflow webhook URL"
              required
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  label="API Key"
                  type={showApiKey ? "text" : "password"}
                  value={workflowConfig?.apiKey}
                  onChange={(e) => handleConfigChange('apiKey', e?.target?.value)}
                  description="Authentication key for API access"
                  required
                />
                <div className="flex space-x-2 mt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName={showApiKey ? "EyeOff" : "Eye"}
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    {showApiKey ? "Hide" : "Show"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="RefreshCw"
                    onClick={handleGenerateApiKey}
                  >
                    Generate New
                  </Button>
                </div>
              </div>
              
              <div>
                <Input
                  label="Webhook Secret"
                  type={showWebhookSecret ? "text" : "password"}
                  value={workflowConfig?.webhookSecret}
                  onChange={(e) => handleConfigChange('webhookSecret', e?.target?.value)}
                  description="Secret for webhook verification"
                />
                <div className="flex space-x-2 mt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName={showWebhookSecret ? "EyeOff" : "Eye"}
                    onClick={() => setShowWebhookSecret(!showWebhookSecret)}
                  >
                    {showWebhookSecret ? "Hide" : "Show"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="RefreshCw"
                    onClick={handleGenerateWebhookSecret}
                  >
                    Generate New
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Automation Settings */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center">
            <Icon name="Zap" size={18} className="mr-2 text-primary" />
            Automation Settings
          </h4>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Checkbox
                label="Auto-trigger Workflows"
                description="Automatically trigger n8n workflows on data changes"
                checked={workflowConfig?.autoTrigger}
                onChange={(e) => handleConfigChange('autoTrigger', e?.target?.checked)}
              />
              <Checkbox
                label="Chat Integration"
                description="Enable workflow triggers from chat interactions"
                checked={workflowConfig?.chatIntegration}
                onChange={(e) => handleConfigChange('chatIntegration', e?.target?.checked)}
              />
            </div>
            
            <Select
              label="Data Synchronization"
              options={dataSyncOptions}
              value={workflowConfig?.dataSync}
              onChange={(value) => handleConfigChange('dataSync', value)}
              description="How frequently to sync data with n8n"
            />
          </div>
        </div>

        {/* Advanced Configuration */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center">
            <Icon name="Settings2" size={18} className="mr-2 text-primary" />
            Advanced Configuration
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Retry Attempts"
              type="number"
              value={workflowConfig?.retryAttempts}
              onChange={(e) => handleConfigChange('retryAttempts', e?.target?.value)}
              description="Number of retry attempts for failed requests"
              min="1"
              max="10"
            />
            <Input
              label="Timeout (seconds)"
              type="number"
              value={workflowConfig?.timeout}
              onChange={(e) => handleConfigChange('timeout', e?.target?.value)}
              description="Request timeout duration"
              min="5"
              max="300"
            />
            <Select
              label="Log Level"
              options={logLevelOptions}
              value={workflowConfig?.logLevel}
              onChange={(value) => handleConfigChange('logLevel', value)}
              description="Logging verbosity level"
            />
          </div>
          
          <div className="mt-4">
            <Checkbox
              label="Enable Detailed Logging"
              description="Log all workflow interactions and API calls"
              checked={workflowConfig?.enableLogging}
              onChange={(e) => handleConfigChange('enableLogging', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Workflow Templates */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center">
            <Icon name="FileText" size={18} className="mr-2 text-primary" />
            Workflow Templates
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border border-border rounded-lg p-4 hover:bg-muted transition-environmental">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="BarChart" size={16} className="text-primary" />
                <span className="text-sm font-medium text-foreground">Daily Report</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Generate daily carbon footprint reports
              </p>
              <Button variant="outline" size="sm" fullWidth>
                Install Template
              </Button>
            </div>
            
            <div className="border border-border rounded-lg p-4 hover:bg-muted transition-environmental">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Bell" size={16} className="text-primary" />
                <span className="text-sm font-medium text-foreground">Alert System</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Send alerts when thresholds are exceeded
              </p>
              <Button variant="outline" size="sm" fullWidth>
                Install Template
              </Button>
            </div>
            
            <div className="border border-border rounded-lg p-4 hover:bg-muted transition-environmental">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Database" size={16} className="text-primary" />
                <span className="text-sm font-medium text-foreground">Data Export</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Export data to external systems
              </p>
              <Button variant="outline" size="sm" fullWidth>
                Install Template
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowSettings;