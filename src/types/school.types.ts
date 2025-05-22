
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
  settings?: {
    allowStudentUpload?: boolean;
  };
}

export interface SchoolAdmin {
  id: string;
  email: string;
  created_at: string;
}

export interface SchoolTeacher {
  id: string;
  email: string;
  name: string;
  created_at: string;
}

export interface SchoolFormData {
  name: string;
  domain: string;
  active?: boolean;
  updated_at?: string;
}
