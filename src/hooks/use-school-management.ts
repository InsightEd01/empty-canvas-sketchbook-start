
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSchool as apiCreateSchool, updateSchool as apiUpdateSchool, createSchoolAdmin } from '@/services/masterAdminService';
import { useToast } from '@/hooks/use-toast';
import type { SchoolFormData } from '@/types/school.types';
import { supabase } from '@/lib/supabase';

export function useSchoolManagement() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutateAsync: createSchool, isPending: isCreating } = useMutation({
    mutationFn: async (schoolData: SchoolFormData & { updated_at: string }) => {
      const result = await apiCreateSchool({
        ...schoolData,
        active: schoolData.active ?? true,
      });
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

  // Admin management functions - updated to include password
  const { mutateAsync: createAdmin, isPending: isCreatingAdmin } = useMutation({
    mutationFn: async ({ email, password, schoolId }: { email: string; password: string; schoolId: string }) => {
      // Now we're passing the password to the API function
      return await createSchoolAdmin(email, password, schoolId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admins'] });
      toast({
        title: 'Success',
        description: 'Admin created successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create admin',
        variant: 'destructive',
      });
    },
  });

  const { mutateAsync: removeAdmin, isPending: isRemovingAdmin } = useMutation({
    mutationFn: async (adminId: string) => {
      // Update the user to remove school_id association
      const { error } = await supabase
        .from('users')
        .update({ school_id: null })
        .eq('id', adminId);
      
      if (error) throw error;
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admins'] });
      toast({
        title: 'Success',
        description: 'Admin removed successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to remove admin',
        variant: 'destructive',
      });
    },
  });

  return {
    createSchool,
    updateSchool,
    isCreating,
    isUpdating,
    createAdmin,
    removeAdmin,
    isCreatingAdmin,
    isRemovingAdmin,
  };
}
