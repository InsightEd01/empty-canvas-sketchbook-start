
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSchool as apiCreateSchool, updateSchool as apiUpdateSchool } from '@/services/masterAdminService';
import { toast } from '@/hooks/use-toast';
import type { SchoolFormData } from '@/types/school.types';

export function useSchoolManagement() {
  const queryClient = useQueryClient();

  const { mutateAsync: createSchool, isPending: isCreating } = useMutation({
    mutationFn: async (schoolData: SchoolFormData & { updated_at: string }) => {
      const result = await apiCreateSchool(schoolData);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schools'] });
      toast({
        title: 'Success',
        description: 'School created successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create school',
        variant: 'destructive',
      });
    },
  });

  const { mutateAsync: updateSchool, isPending: isUpdating } = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: SchoolFormData }) => {
      const result = await apiUpdateSchool(id, {
        ...updates,
        updated_at: new Date().toISOString(),
      });
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schools'] });
      toast({
        title: 'Success',
        description: 'School updated successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update school',
        variant: 'destructive',
      });
    },
  });

  return {
    createSchool,
    updateSchool,
    isCreating,
    isUpdating,
  };
}
