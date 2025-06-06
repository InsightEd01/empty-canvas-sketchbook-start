
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getSchoolById } from '@/services/masterAdminService';
import { useSchoolManagement } from '@/hooks/use-school-management';
import { LoadingSpinner } from '@/components/ui/loading';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ColorPicker } from '@/components/ui/color-picker';
import type { School } from '@/types/school.types';

const settingsFormSchema = z.object({
  name: z.string().min(2, "School name must be at least 2 characters"),
  domain: z.string().min(3, "Domain must be at least 3 characters"),
  theme: z.object({
    primary: z.string(),
    secondary: z.string()
  }),
  settings: z.object({
    allowTeacherRegistration: z.boolean(),
    allowStudentUpload: z.boolean()
  })
});

type SettingsFormValues = z.infer<typeof settingsFormSchema>;

export function SchoolSettingsPage() {
  const { id } = useParams<{ id: string }>();
  const { updateSchool, isUpdating } = useSchoolManagement();

  const { data: school, isLoading } = useQuery({
    queryKey: ['school', id],
    queryFn: () => getSchoolById(id!) as Promise<School>,
    enabled: !!id
  });

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      name: '',
      domain: '',
      theme: {
        primary: '#000000',
        secondary: '#ffffff'
      },
      settings: {
        allowTeacherRegistration: false,
        allowStudentUpload: false
      }
    }
  });

  // Update form with school data when it's available
  if (school && !form.formState.isDirty) {
    const defaultValues = {
      name: school.name || '',
      domain: school.domain || '',
      theme: {
        primary: school.theme?.primary || school.primaryColor || '#000000',
        secondary: school.theme?.secondary || school.secondaryColor || '#ffffff'
      },
      settings: {
        allowTeacherRegistration: school.settings?.allowTeacherRegistration || false,
        allowStudentUpload: school.settings?.allowStudentUpload || false
      }
    };
    form.reset(defaultValues);
  }

  if (isLoading || !school) {
    return <LoadingSpinner size="lg" />;
  }

  const onSubmit = async (data: SettingsFormValues) => {
    if (id) {
      updateSchool({ 
        id: id, 
        updates: {
          name: data.name,
          domain: data.domain,
          primaryColor: data.theme.primary,
          secondaryColor: data.theme.secondary,
          theme: {
            primary: data.theme.primary,
            secondary: data.theme.secondary
          },
          settings: {
            allowTeacherRegistration: data.settings.allowTeacherRegistration,
            allowStudentUpload: data.settings.allowStudentUpload
          }
        }
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">School Settings</h1>
        <p className="text-gray-500">Configure settings for {school.name}</p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>
              Basic information and configuration for your school
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">School Name</Label>
              <Input
                id="name"
                {...form.register("name")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="domain">Domain</Label>
              <Input
                id="domain"
                {...form.register("domain")}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Theme Settings</CardTitle>
            <CardDescription>
              Customize the look and feel of your school's interface
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="primary-color">Primary Color</Label>
              <ColorPicker
                value={form.watch("theme.primary")}
                onChange={(color: string) => form.setValue("theme.primary", color)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondary-color">Secondary Color</Label>
              <ColorPicker
                value={form.watch("theme.secondary")}
                onChange={(color: string) => form.setValue("theme.secondary", color)}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Feature Settings</CardTitle>
            <CardDescription>
              Enable or disable features for your school
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Teacher Registration</Label>
                <p className="text-sm text-muted-foreground">
                  Allow teachers to self-register using your school's domain
                </p>
              </div>
              <Switch
                checked={form.watch("settings.allowTeacherRegistration")}
                onCheckedChange={(checked: boolean) => 
                  form.setValue("settings.allowTeacherRegistration", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Student Upload</Label>
                <p className="text-sm text-muted-foreground">
                  Allow teachers to upload student information
                </p>
              </div>
              <Switch
                checked={form.watch("settings.allowStudentUpload")}
                onCheckedChange={(checked: boolean) => 
                  form.setValue("settings.allowStudentUpload", checked)
                }
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={isUpdating}>
            {isUpdating ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
