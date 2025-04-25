
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Incident } from '@/types/incident';
import LoadingSpinner from '@/components/LoadingSpinner';

const IncidentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [incident, setIncident] = useState<Incident | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchIncident = async () => {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      const incidents = JSON.parse(localStorage.getItem('incidents') || '[]');
      const found = incidents.find((inc: Incident) => inc.id === id);
      setIncident(found || null);
      setIsLoading(false);
    };
    fetchIncident();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner size={48} className="text-purple-500" />
      </div>
    );
  }

  if (!incident) {
    return (
      <div className="min-h-screen bg-background p-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="mr-2" />
          Back
        </Button>
        <p className="text-center text-muted-foreground">Incident not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
        <ArrowLeft className="mr-2" />
        Back
      </Button>
      
      <div className="max-w-2xl mx-auto">
        <div className="bg-card rounded-lg border shadow-md p-6 space-y-6 animate-fade-in">
          <h1 className="text-2xl font-bold text-foreground">{incident.title}</h1>
          
          <div className="flex flex-wrap gap-4">
            <div className="bg-secondary/50 px-4 py-2 rounded-md">
              <p className="text-sm text-muted-foreground">Severity</p>
              <p className="font-medium text-foreground">{incident.severity}</p>
            </div>
            
            <div className="bg-secondary/50 px-4 py-2 rounded-md">
              <p className="text-sm text-muted-foreground">Date Reported</p>
              <p className="font-medium text-foreground">
                {new Date(incident.reportedDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">Description</h2>
            <p className="text-muted-foreground whitespace-pre-wrap">{incident.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentDetail;
