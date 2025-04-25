
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import IncidentForm from '@/components/IncidentForm';
import { Incident } from '@/types/incident';

const ReportIncident = () => {
  const navigate = useNavigate();

  const handleSubmit = (incident: Omit<Incident, 'id'>) => {
    const newIncident: Incident = {
      ...incident,
      id: Math.random().toString(36).substr(2, 9),
    };
    
    // In a real app, this would be an API call
    const incidents = JSON.parse(localStorage.getItem('incidents') || '[]');
    localStorage.setItem('incidents', JSON.stringify([newIncident, ...incidents]));
    
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
        <ArrowLeft className="mr-2" />
        Back
      </Button>
      
      <div className="max-w-2xl mx-auto">
        <IncidentForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default ReportIncident;
