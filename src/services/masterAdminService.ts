
import { supabase } from '@/lib/supabase';
import type { School, SchoolFormData } from '@/types/school.types';

export type SchoolAdmin = {
  id: string;
  email: string;
  createdAt: string;
};

export async function getSchools(): Promise<School[]> {
  const { data, error } = await supabase
    .from('schools')
    .select('*');
  
  if (error) throw error;
  return data || [];
}

export async function getSchoolById(id: string): Promise<School> {
  const { data, error } = await supabase
    .from('schools')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

export async function createSchool(school: SchoolFormData): Promise<School> {
  const { data, error } = await supabase
    .from('schools')
    .insert(school)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateSchool(id: string, updates: SchoolFormData): Promise<School> {
  const { data, error } = await supabase
    .from('schools')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function getSchoolAdmins(schoolId: string): Promise<SchoolAdmin[]> {
  // This is a mock implementation - replace with actual API call
  return [
    { id: '1', email: 'admin1@example.com', createdAt: new Date().toISOString() },
    { id: '2', email: 'admin2@example.com', createdAt: new Date().toISOString() },
  ];
}

export async function getAllAdmins(): Promise<any[]> {
  // Mock implementation - replace with actual API call
  return [
    { id: '1', email: 'admin1@example.com', name: 'Admin One', schoolId: '1' },
    { id: '2', email: 'admin2@example.com', name: 'Admin Two', schoolId: '2' },
  ];
}

export async function getAllTeachers(): Promise<any[]> {
  // Mock implementation - replace with actual API call
  return [
    { id: '1', email: 'teacher1@example.com', name: 'Teacher One', schoolId: '1' },
    { id: '2', email: 'teacher2@example.com', name: 'Teacher Two', schoolId: '2' },
  ];
}

// Add the missing function for SchoolAnalytics component
export async function getSchoolStats(schoolId: string): Promise<any> {
  // Mock implementation - replace with actual API call
  return {
    totalTeachers: 15,
    totalStudents: 250,
    totalAssessments: 45,
    activeUsers: 180
  };
}

// Add the missing function for use-admin-users.ts
export async function createSchoolAdmin(email: string, password: string, schoolId: string): Promise<any> {
  // Mock implementation - replace with actual API call
  console.log('Creating school admin with email:', email, 'for school:', schoolId);
  
  // In a real implementation, you would create the user in auth and set their role to admin
  return {
    id: Math.random().toString(36).substring(7),
    email,
    createdAt: new Date().toISOString()
  };
}
