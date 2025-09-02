import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const SecuritySettings = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [backupCodes, setBackupCodes] = useState([]);
  const [showBackupCodes, setShowBackupCodes] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isEnabling2FA, setIsEnabling2FA] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const activeSessions = [
    {
      id: 1,
      device: "MacBook Pro",
      browser: "Chrome 118.0",
      location: "San Francisco, CA",
      lastActive: "2025-09-01T14:45:00Z",
      current: true
    },
    {
      id: 2,
      device: "iPhone 15",
      browser: "Safari Mobile",
      location: "San Francisco, CA",
      lastActive: "2025-09-01T12:30:00Z",
      current: false
    },
    {
      id: 3,
      device: "iPad Air",
      browser: "Safari",
      location: "San Francisco, CA",
      lastActive: "2025-08-31T18:15:00Z",
      current: false
    }
  ];

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleChangePassword = async () => {
    setIsChangingPassword(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsChangingPassword(false);
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handleEnable2FA = async () => {
    setIsEnabling2FA(true);
    // Simulate generating QR code
    setQrCodeUrl("https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/EcoTracker:sarah.johnson@email.com?secret=JBSWY3DPEHPK3PXP&issuer=EcoTracker");
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsEnabling2FA(false);
  };

  const handleVerify2FA = async () => {
    if (verificationCode?.length === 6) {
      setIsEnabling2FA(true);
      // Simulate verification
      await new Promise(resolve => setTimeout(resolve, 1500));
      setTwoFactorEnabled(true);
      setBackupCodes([
        "1a2b-3c4d-5e6f",
        "7g8h-9i0j-1k2l",
        "3m4n-5o6p-7q8r",
        "9s0t-1u2v-3w4x",
        "5y6z-7a8b-9c0d"
      ]);
      setShowBackupCodes(true);
      setQrCodeUrl("");
      setVerificationCode("");
      setIsEnabling2FA(false);
    }
  };

  const handleDisable2FA = async () => {
    setIsEnabling2FA(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setTwoFactorEnabled(false);
    setBackupCodes([]);
    setIsEnabling2FA(false);
  };

  const handleRevokeSession = async (sessionId) => {
    // Simulate session revocation
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const getPasswordStrength = () => {
    const password = passwordData?.newPassword;
    if (password?.length < 6) return { strength: 0, label: "Too short", color: "text-error" };
    if (password?.length < 8) return { strength: 25, label: "Weak", color: "text-error" };
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/?.test(password)) return { strength: 50, label: "Fair", color: "text-warning" };
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/?.test(password)) return { strength: 75, label: "Good", color: "text-primary" };
    return { strength: 100, label: "Strong", color: "text-success" };
  };

  const passwordStrength = getPasswordStrength();
  const passwordsMatch = passwordData?.newPassword === passwordData?.confirmPassword && passwordData?.confirmPassword !== "";

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="Shield" size={24} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Security Settings</h3>
      </div>
      <div className="space-y-8">
        {/* Password Change */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center">
            <Icon name="Key" size={18} className="mr-2 text-primary" />
            Change Password
          </h4>
          <div className="space-y-4 max-w-md">
            <Input
              label="Current Password"
              type="password"
              value={passwordData?.currentPassword}
              onChange={(e) => handlePasswordChange('currentPassword', e?.target?.value)}
              required
            />
            <Input
              label="New Password"
              type="password"
              value={passwordData?.newPassword}
              onChange={(e) => handlePasswordChange('newPassword', e?.target?.value)}
              description="Must be at least 8 characters with uppercase, lowercase, number, and special character"
              required
            />
            {passwordData?.newPassword && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Password strength:</span>
                  <span className={`font-medium ${passwordStrength?.color}`}>
                    {passwordStrength?.label}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      passwordStrength?.strength <= 25 ? 'bg-error' :
                      passwordStrength?.strength <= 50 ? 'bg-warning' :
                      passwordStrength?.strength <= 75 ? 'bg-primary' : 'bg-success'
                    }`}
                    style={{ width: `${passwordStrength?.strength}%` }}
                  />
                </div>
              </div>
            )}
            <Input
              label="Confirm New Password"
              type="password"
              value={passwordData?.confirmPassword}
              onChange={(e) => handlePasswordChange('confirmPassword', e?.target?.value)}
              error={passwordData?.confirmPassword && !passwordsMatch ? "Passwords do not match" : ""}
              required
            />
            <Button
              variant="default"
              loading={isChangingPassword}
              onClick={handleChangePassword}
              disabled={!passwordData?.currentPassword || !passwordData?.newPassword || !passwordsMatch || passwordStrength?.strength < 75}
            >
              Change Password
            </Button>
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center">
            <Icon name="Smartphone" size={18} className="mr-2 text-primary" />
            Two-Factor Authentication
          </h4>
          
          {!twoFactorEnabled ? (
            <div className="space-y-4">
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Icon name="Info" size={20} className="text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-foreground font-medium mb-1">
                      Enhance your account security
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Two-factor authentication adds an extra layer of security to your account by requiring a verification code from your mobile device.
                    </p>
                  </div>
                </div>
              </div>
              
              {!qrCodeUrl ? (
                <Button
                  variant="default"
                  loading={isEnabling2FA}
                  iconName="Plus"
                  iconPosition="left"
                  onClick={handleEnable2FA}
                >
                  Enable Two-Factor Authentication
                </Button>
              ) : (
                <div className="space-y-4 max-w-md">
                  <div className="text-center">
                    <p className="text-sm text-foreground mb-4">
                      Scan this QR code with your authenticator app:
                    </p>
                    <div className="inline-block p-4 bg-white rounded-lg border">
                      <img src={qrCodeUrl} alt="2FA QR Code" className="w-48 h-48" />
                    </div>
                  </div>
                  <Input
                    label="Verification Code"
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e?.target?.value?.replace(/\D/g, '')?.slice(0, 6))}
                    placeholder="Enter 6-digit code"
                    description="Enter the 6-digit code from your authenticator app"
                  />
                  <div className="flex space-x-2">
                    <Button
                      variant="default"
                      loading={isEnabling2FA}
                      onClick={handleVerify2FA}
                      disabled={verificationCode?.length !== 6}
                    >
                      Verify & Enable
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => setQrCodeUrl("")}
                      disabled={isEnabling2FA}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-success/10 border border-success/20 rounded-lg">
                <Icon name="CheckCircle" size={20} className="text-success" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Two-factor authentication is enabled
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Your account is protected with 2FA
                  </p>
                </div>
              </div>
              
              {showBackupCodes && backupCodes?.length > 0 && (
                <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                  <div className="flex items-start space-x-3 mb-3">
                    <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">
                        Save your backup codes
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Store these codes in a safe place. You can use them to access your account if you lose your device.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-sm">
                    {backupCodes?.map((code, index) => (
                      <div key={index} className="bg-background p-2 rounded border">
                        {code}
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Download"
                    iconPosition="left"
                    onClick={() => setShowBackupCodes(false)}
                    className="mt-3"
                  >
                    I've saved these codes
                  </Button>
                </div>
              )}
              
              <Button
                variant="destructive"
                loading={isEnabling2FA}
                iconName="X"
                iconPosition="left"
                onClick={handleDisable2FA}
              >
                Disable Two-Factor Authentication
              </Button>
            </div>
          )}
        </div>

        {/* Active Sessions */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center">
            <Icon name="Monitor" size={18} className="mr-2 text-primary" />
            Active Sessions
          </h4>
          <div className="space-y-3">
            {activeSessions?.map((session) => (
              <div key={session?.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={session?.device?.includes('iPhone') ? 'Smartphone' : 
                          session?.device?.includes('iPad') ? 'Tablet' : 'Monitor'} 
                    size={20} 
                    className="text-muted-foreground" 
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-foreground">
                        {session?.device}
                      </span>
                      {session?.current && (
                        <span className="text-xs bg-success text-success-foreground px-2 py-0.5 rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {session?.browser} • {session?.location}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Last active: {new Date(session.lastActive)?.toLocaleString()}
                    </div>
                  </div>
                </div>
                {!session?.current && (
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="X"
                    onClick={() => handleRevokeSession(session?.id)}
                  >
                    Revoke
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Security Preferences */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center">
            <Icon name="Settings" size={18} className="mr-2 text-primary" />
            Security Preferences
          </h4>
          <div className="space-y-4">
            <Checkbox
              label="Email notifications for new sign-ins"
              description="Get notified when someone signs in to your account from a new device"
              checked
              onChange={() => {}}
            />
            <Checkbox
              label="Require password for sensitive actions"
              description="Ask for password confirmation before changing security settings"
              checked
              onChange={() => {}}
            />
            <Checkbox
              label="Auto-logout inactive sessions"
              description="Automatically sign out sessions that have been inactive for 30 days"
             
              onChange={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;