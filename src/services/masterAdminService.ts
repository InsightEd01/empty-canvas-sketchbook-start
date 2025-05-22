
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
  const { data, error } = await supabase
    .from('users')
    .select('id, email, created_at')
    .eq('school_id', schoolId)
    .eq('role', 'admin');
  
  if (error) throw error;
  
  return (data || []).map(user => ({
    id: user.id,
    email: user.email,
    createdAt: user.created_at
  }));
}

export async function getAllAdmins(): Promise<any[]> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('role', 'admin');
  
  if (error) throw error;
  return data || [];
}

export async function getAllTeachers(): Promise<any[]> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('role', 'teacher');
  
  if (error) throw error;
  return data || [];
}

export async function getSchoolStats(schoolId: string): Promise<any> {
  console.log('Getting stats for school:', schoolId);
  
  // Query teachers count
  const { count: teachersCount } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true })
    .eq('school_id', schoolId)
    .eq('role', 'teacher');
  
  // Query students count (mock implementation)
  const studentsCount = 250; // Replace with actual query when students table is available
  
  return {
    totalTeachers: teachersCount || 0,
    totalStudents: studentsCount,
    totalAssessments: 45,
    activeUsers: 180
  };
}

export async function createSchoolAdmin(email: string, password: string, schoolId: string): Promise<any> {
  console.log('Creating school admin with email:', email, 'for school:', schoolId);
  
  // Use the password parameter in the auth signup process
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: 'admin',
        school_id: schoolId // Use schoolId parameter
      }
    }
  });
  
  if (error) throw error;
  
  return {
    id: data.user?.id || Math.random().toString(36).substring(7),
    email,
    createdAt: new Date().toISOString()
  };
}
