
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { GraduationCap, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { LoadingSpinner } from '@/components/ui/loading';
import { Badge } from '@/components/ui/badge';
import { getAllTeachers } from '@/services/masterAdminService';

export function TeachersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: teachers, isLoading } = useQuery({
    queryKey: ['teachers'],
    queryFn: getAllTeachers,
  });
  
  const filteredTeachers = teachers?.filter((teacher: any) => 
    teacher.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.school?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <GraduationCap className="h-7 w-7" /> Teachers
        </h1>
        <p className="text-muted-foreground">
          Manage teachers across all schools
        </p>
      </div>
      
      <div className="flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search teachers by name, email or school..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-10">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>All Teachers</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredTeachers?.length === 0 ? (
              <div className="text-center py-12">
                <GraduationCap className="h-12 w-12 mx-auto opacity-20 mb-4" />
                <h3 className="text-lg font-medium mb-2">No Teachers Found</h3>
                <p className="text-muted-foreground">
                  {searchTerm ? "No teachers match your search criteria." : "No teachers have been added yet."}
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredTeachers?.map((teacher: any) => (
                  <div 
                    key={teacher.id} 
                    className="border rounded-lg p-4 hover:border-primary/50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{teacher.name}</h3>
                        <p className="text-sm text-muted-foreground">{teacher.email}</p>
                      </div>
                      <Badge variant="outline" className="px-2 py-1">
                        Teacher
                      </Badge>
                    </div>
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-xs flex items-center">
                        <span className="font-medium mr-1">School:</span>
                        {teacher.school?.name || "Unassigned"}
                      </p>
                      <p className="text-xs flex items-center mt-1">
                        <span className="font-medium mr-1">Joined:</span>
                        {new Date(teacher.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
