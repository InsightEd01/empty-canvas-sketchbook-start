
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
