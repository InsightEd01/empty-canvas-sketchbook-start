
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export function SettingsPage() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    autoApproveTeachers: false,
    allowSignups: true,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSaveSettings = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Settings saved",
        description: "Your preferences have been updated successfully",
      });
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Settings className="h-7 w-7" /> Settings
        </h1>
        <p className="text-muted-foreground">
          Configure your master admin preferences
        </p>
      </div>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Configure how you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <Switch 
                id="email-notifications"
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => 
                  setSettings(prev => ({ ...prev, emailNotifications: checked }))
                }
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Receive email notifications when new schools are created or administrators are added.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>School Management</CardTitle>
            <CardDescription>
              Configure school management settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="auto-approve">Auto-approve Teacher Registrations</Label>
              <Switch 
                id="auto-approve"
                checked={settings.autoApproveTeachers}
                onCheckedChange={(checked) => 
                  setSettings(prev => ({ ...prev, autoApproveTeachers: checked }))
                }
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Automatically approve teacher registration requests without admin review.
            </p>
            
            <div className="pt-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="allow-signups">Allow New School Signups</Label>
                <Switch 
                  id="allow-signups"
                  checked={settings.allowSignups}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, allowSignups: checked }))
                  }
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Allow new schools to register through the public sign-up page.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end">
          <Button 
            onClick={handleSaveSettings}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </div>
    </div>
  );
}
