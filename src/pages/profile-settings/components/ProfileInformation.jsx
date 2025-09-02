import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ProfileInformation = () => {
  const [profileData, setProfileData] = useState({
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    userType: "individual",
    organization: "",
    location: "San Francisco, CA",
    bio: "Environmental enthusiast passionate about reducing carbon footprint through technology and sustainable living practices."
  });

  const [profileImage, setProfileImage] = useState("https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const userTypeOptions = [
    { value: "individual", label: "Individual User" },
    { value: "business", label: "Business Professional" },
    { value: "consultant", label: "Environmental Consultant" },
    { value: "organization", label: "Organization Manager" }
  ];

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e?.target?.result);
      };
      reader?.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original data if needed
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="User" size={24} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Profile Information</h3>
        </div>
        {!isEditing ? (
          <Button
            variant="outline"
            size="sm"
            iconName="Edit"
            iconPosition="left"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              disabled={isSaving}
            >
              Cancel
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Image Section */}
        <div className="lg:col-span-1">
          <div className="text-center">
            <div className="relative inline-block">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-border bg-muted">
                <Image
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-environmental">
                  <Icon name="Camera" size={16} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              {isEditing ? "Click camera icon to change photo" : "Profile Photo"}
            </p>
          </div>
        </div>

        {/* Profile Details Section */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First Name"
              type="text"
              value={profileData?.firstName}
              onChange={(e) => handleInputChange('firstName', e?.target?.value)}
              disabled={!isEditing}
              required
            />
            <Input
              label="Last Name"
              type="text"
              value={profileData?.lastName}
              onChange={(e) => handleInputChange('lastName', e?.target?.value)}
              disabled={!isEditing}
              required
            />
          </div>

          <Input
            label="Email Address"
            type="email"
            value={profileData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            disabled={!isEditing}
            description="Used for notifications and account recovery"
            required
          />

          <Input
            label="Phone Number"
            type="tel"
            value={profileData?.phone}
            onChange={(e) => handleInputChange('phone', e?.target?.value)}
            disabled={!isEditing}
            description="Optional - for SMS notifications"
          />

          <Select
            label="User Type"
            options={userTypeOptions}
            value={profileData?.userType}
            onChange={(value) => handleInputChange('userType', value)}
            disabled={!isEditing}
            description="Helps customize your experience"
          />

          {profileData?.userType !== 'individual' && (
            <Input
              label="Organization"
              type="text"
              value={profileData?.organization}
              onChange={(e) => handleInputChange('organization', e?.target?.value)}
              disabled={!isEditing}
              placeholder="Company or organization name"
            />
          )}

          <Input
            label="Location"
            type="text"
            value={profileData?.location}
            onChange={(e) => handleInputChange('location', e?.target?.value)}
            disabled={!isEditing}
            description="Used for regional carbon calculations"
          />

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Bio
            </label>
            <textarea
              value={profileData?.bio}
              onChange={(e) => handleInputChange('bio', e?.target?.value)}
              disabled={!isEditing}
              rows={3}
              className={`w-full px-3 py-2 border border-border rounded-lg text-sm transition-environmental ${
                isEditing 
                  ? 'bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring' 
                  : 'bg-muted text-muted-foreground'
              }`}
              placeholder="Tell us about your environmental goals..."
            />
            <p className="text-xs text-muted-foreground mt-1">
              Optional - share your environmental interests and goals
            </p>
          </div>
        </div>
      </div>
      {/* Account Stats */}
      <div className="mt-8 pt-6 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-4">Account Statistics</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-lg font-semibold text-foreground">127</div>
            <div className="text-xs text-muted-foreground">Days Active</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-lg font-semibold text-foreground">2.4t</div>
            <div className="text-xs text-muted-foreground">CO₂ Tracked</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-lg font-semibold text-foreground">89</div>
            <div className="text-xs text-muted-foreground">Activities Logged</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-lg font-semibold text-foreground">15%</div>
            <div className="text-xs text-muted-foreground">Reduction Goal</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInformation;