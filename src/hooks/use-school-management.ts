
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSchool as apiCreateSchool, updateSchool as apiUpdateSchool } from '@/services/masterAdminService';
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

  // Admin management functions
  const { mutateAsync: createAdmin, isPending: isCreatingAdmin } = useMutation({
    mutationFn: async ({ email, schoolId }: { email: string; schoolId: string }) => {
      // Generate a temporary password or use a default one
      const tempPassword = "temporaryPassword123"; // In a real app, generate a random password
      console.log('Creating admin with', { email, schoolId, tempPassword });
      
      // Create user in auth system with admin role
      const { error } = await supabase.auth.signUp({
        email,
        password: tempPassword,
        options: {
          data: {
            role: 'admin',
            school_id: schoolId
          }
        }
      });
      
      if (error) throw error;
      
      return { id: 'new-admin-id', email, createdAt: new Date().toISOString() };
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
      // This is a mock implementation
      console.log('Removing admin with ID', adminId);
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
