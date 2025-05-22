
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { getSchools } from '@/services/schoolService';
import {
  Building2,
  GraduationCap,
  School,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading';

const statCards = [
  {
    title: 'Total Schools',
    icon: Building2,
    getValue: (data: any) => data?.length || 0,
    description: 'Active schools in the system',
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
  },
  {
    title: 'Total Admins',
    icon: Users,
    getValue: (data: any) => data?.reduce((acc: number, school: any) => acc + (school.admins?.length || 0), 0) || 0,
    description: 'School administrators',
    color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-300',
  },
  {
    title: 'Total Teachers',
    icon: GraduationCap,
    getValue: (data: any) => data?.reduce((acc: number, school: any) => acc + (school.teachers?.length || 0), 0) || 0,
    description: 'Active teachers',
    color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
  },
  {
    title: 'Total Students',
    icon: School,
    getValue: (data: any) => data?.reduce((acc: number, school: any) => acc + (school.students || 0), 0) || 0,
    description: 'Enrolled students',
    color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300',
  },
];

export function DashboardPage() {
  const { data: schools = [], isLoading } = useQuery({
    queryKey: ['schools'],
    queryFn: getSchools,
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of all schools in the system
          </p>
        </div>
        
        <Link to="/schools/new">
          <Button className="bg-primary">
            Add New School
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-8">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {statCards.map((card) => (
              <Card key={card.title} className="overflow-hidden">
                <CardHeader className={`flex flex-row items-center justify-between space-y-0 pb-2 ${card.color} bg-opacity-15`}>
                  <CardTitle className="text-sm font-medium">
                    {card.title}
                  </CardTitle>
                  <card.icon className="h-5 w-5" />
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold mb-1">
                    {card.getValue(schools)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {(schools?.length === 0) && (
            <Card className="bg-muted/30">
              <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                <School className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Schools Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start by adding your first school to the system.
                </p>
                <Link to="/schools/new">
                  <Button>Add Your First School</Button>
                </Link>
              </CardContent>
            </Card>
          )}
          
          {(schools?.length > 0) && (
            <Card>
              <CardHeader>
                <CardTitle>Recent Schools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {schools.slice(0, 5).map((school: any) => (
                    <Link 
                      key={school.id} 
                      to={`/schools/${school.id}`}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/40 hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Building2 className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">{school.name}</p>
                          <p className="text-sm text-muted-foreground">{school.domain}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-sm px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                          {school.teachers?.length || 0} Teachers
                        </span>
                        <span className="text-sm px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
                          {school.admins?.length || 0} Admins
                        </span>
                      </div>
                    </Link>
                  ))}
                  
                  {schools.length > 5 && (
                    <Link to="/schools" className="flex justify-center pt-2">
                      <Button variant="link">View All Schools</Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
