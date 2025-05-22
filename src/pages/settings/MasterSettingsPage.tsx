import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Building2, Shield, Gauge } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const MasterSettingsPage = () => {
  const { toast } = useToast();
  const [isSystemUp, setIsSystemUp] = useState(true);
  const [isFirewallEnabled, setIsFirewallEnabled] = useState(false);
  const [performanceLevel, setPerformanceLevel] = useState([50]);

  const handleSystemToggle = () => {
    setIsSystemUp(!isSystemUp);
    toast({
      title: 'System Status Updated',
      description: `System is now ${isSystemUp ? 'shutting down' : 'starting up'}...`,
    });
  };

  const handleFirewallToggle = () => {
    setIsFirewallEnabled(!isFirewallEnabled);
    toast({
      title: 'Firewall Settings Updated',
      description: `Firewall is now ${isFirewallEnabled ? 'disabled' : 'enabled'}.`,
    });
  };

  // Example of using the Slider component
  const handleSliderChange = (value: number[]) => {
    console.log('Slider value changed:', value);
    // Update relevant state here
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-10">
        <Tabs defaultValue="general" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
                <CardDescription>Control the overall system availability.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="system-up">System Up</Label>
                  <Switch id="system-up" checked={isSystemUp} onCheckedChange={handleSystemToggle} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Firewall</CardTitle>
                <CardDescription>Manage firewall settings to protect your system.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="firewall">Enable Firewall</Label>
                  <Switch id="firewall" checked={isFirewallEnabled} onCheckedChange={handleFirewallToggle} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Performance Level</CardTitle>
                <CardDescription>Adjust system performance settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="performance">Set Performance Level</Label>
                    <Slider
                      id="performance"
                      defaultValue={performanceLevel}
                      max={100}
                      step={1}
                      aria-label="Performance Level"
                      onValueChange={setPerformanceLevel}
                    />
                  </div>
                  <p>Selected Performance Level: {performanceLevel[0]}%</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};
