
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getSchoolById } from '@/services/masterAdminService';
import { useSchoolManagement } from '@/hooks/use-school-management';
import { LoadingSpinner } from '@/components/ui/loading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Building } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import type { School, SchoolFormData } from '@/types/school.types';

export function SchoolFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  
  const [formData, setFormData] = useState<SchoolFormData>({
    name: '',
    domain: '',
    active: true,
  });
  
  const { createSchool, updateSchool, isCreating, isUpdating } = useSchoolManagement();
  
  const { data: schoolData, isLoading } = useQuery({
    queryKey: ['school', id],
    queryFn: () => getSchoolById(id!),
    enabled: isEditing,
  });

  useEffect(() => {
    if (schoolData) {
      setFormData({
        name: schoolData.name,
        domain: schoolData.domain,
        active: schoolData.active,
      });
    }
  }, [schoolData]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && id) {
      await updateSchool({ id, updates: formData });
      navigate(`/schools/${id}`);
    } else {
      const newSchool = await createSchool({
        ...formData,
        updated_at: new Date().toISOString()
      });
      navigate(`/schools/${newSchool.id}`);
    }
  };
  
  if (isEditing && isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <LoadingSpinner />
      </div>
    );
  }
  
  return (
    <div className="max-w-2xl mx-auto">
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)} 
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      
      <Card className="shadow-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building className="h-5 w-5 text-primary" />
            <CardTitle>{isEditing ? 'Edit School' : 'Create New School'}</CardTitle>
          </div>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">School Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter school name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="domain">Domain</Label>
              <Input
                id="domain"
                name="domain"
                value={formData.domain}
                onChange={handleChange}
                placeholder="school.edu"
                required
              />
            </div>
            
            {isEditing && (
              <div className="flex items-center space-x-2 pt-2">
                <Switch
                  id="active"
                  name="active"
                  checked={formData.active}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, active: checked }))
                  }
                />
                <Label htmlFor="active">Active</Label>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-end gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isCreating || isUpdating}
            >
              {isCreating || isUpdating 
                ? (isEditing ? 'Updating...' : 'Creating...')
                : (isEditing ? 'Update School' : 'Create School')
              }
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
