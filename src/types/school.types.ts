
export interface School {
  id: string;
  name: string;
  domain?: string;
  address?: string;
  maxTeachers?: number;
  maxStudents?: number;
  primaryColor?: string;
  secondaryColor?: string;
  studentCount?: number;
  teacherCount?: number;
  storageUsed?: string;
  status?: 'active' | 'inactive';
  created_at: string;
  created_by: string;
  updated_at?: string;
  theme?: {
    primary: string;
    secondary: string;
  };
  settings?: {
    allowTeacherRegistration: boolean;
    allowStudentUpload: boolean;
  };
}

export interface CreateSchoolRequest {
  name: string;
  address: string;
  domain?: string;
  maxTeachers?: number;
  maxStudents?: number;
  primaryColor?: string;
  secondaryColor?: string;
}

export interface UpdateSchoolRequest extends CreateSchoolRequest {
  id: string;
  theme?: {
    primary: string;
    secondary: string;
  };
  settings?: {
    allowTeacherRegistration: boolean;
    allowStudentUpload: boolean;
  };
}
