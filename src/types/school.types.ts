
export interface School {
  id: string;
  name: string;
  domain: string;
  active: boolean;
  created_at: string;
  updated_at: string;
  admins?: SchoolAdmin[];
  teachers?: SchoolTeacher[];
  students?: number;
  studentCount?: number;
  teacherCount?: number;
  address?: string;
  primaryColor?: string;
  secondaryColor?: string;
  storageUsed?: string;
  maxTeachers?: number;
  maxStudents?: number;
  theme?: {
    primary: string;
    secondary: string;
  };
  settings?: {
    allowStudentUpload?: boolean;
    allowTeacherRegistration?: boolean;
  };
}

export interface SchoolAdmin {
  id: string;
  email: string;
  created_at: string;
}

export interface SchoolTeacher {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

export interface SchoolFormData {
  name: string;
  domain: string;
  active?: boolean;
  address?: string;
  primaryColor?: string;
  secondaryColor?: string;
  maxTeachers?: number;
  maxStudents?: number;
  updated_at?: string;
  theme?: {
    primary: string;
    secondary: string;
  };
  settings?: {
    allowStudentUpload?: boolean;
    allowTeacherRegistration?: boolean;
  };
}

export interface CreateSchoolRequest extends SchoolFormData {}
export interface UpdateSchoolRequest extends SchoolFormData {}
