
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <Layout>
      <div className={`min-h-screen flex items-center justify-center p-4 ${isLoaded ? 'fade-in' : 'opacity-0'}`}>
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-light tracking-tight mb-6">Welcome</h1>
          <p className="text-muted-foreground mb-8">
            A clean canvas for your next creation
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="outline">Get Started</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
