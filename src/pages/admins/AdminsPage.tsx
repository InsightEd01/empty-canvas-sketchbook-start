
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { User, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { LoadingSpinner } from '@/components/ui/loading';
import { Badge } from '@/components/ui/badge';
import { getAllAdmins } from '@/services/masterAdminService';

export function AdminsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: admins = [], isLoading } = useQuery({
    queryKey: ['admins'],
    queryFn: getAllAdmins,
  });
  
  const filteredAdmins = admins?.filter((admin: any) => 
    admin.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.school?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <User className="h-7 w-7" /> Administrators
        </h1>
        <p className="text-muted-foreground">
          Manage school administrators across all schools
        </p>
      </div>
      
      <div className="flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search administrators by email or school..."
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
            <CardTitle>All Administrators</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredAdmins?.length === 0 ? (
              <div className="text-center py-12">
                <User className="h-12 w-12 mx-auto opacity-20 mb-4" />
                <h3 className="text-lg font-medium mb-2">No Administrators Found</h3>
                <p className="text-muted-foreground">
                  {searchTerm ? "No administrators match your search criteria." : "No administrators have been added yet."}
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredAdmins?.map((admin: any) => (
                  <div 
                    key={admin.id} 
                    className="border rounded-lg p-4 hover:border-primary/50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{admin.email}</h3>
                      </div>
                      <Badge variant="outline" className="px-2 py-1">
                        Admin
                      </Badge>
                    </div>
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-xs flex items-center">
                        <span className="font-medium mr-1">School:</span>
                        {admin.school?.name || "Unassigned"}
                      </p>
                      <p className="text-xs flex items-center mt-1">
                        <span className="font-medium mr-1">Created:</span>
                        {new Date(admin.created_at).toLocaleDateString()}
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
