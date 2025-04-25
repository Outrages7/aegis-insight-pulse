import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Incident, Severity } from '@/types/incident';
import LoadingSpinner from './LoadingSpinner';

interface IncidentFormProps {
  onSubmit: (incident: Omit<Incident, 'id'>) => void;
}

const IncidentForm = ({ onSubmit }: IncidentFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<Severity>('Low');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    onSubmit({
      title,
      description,
      severity,
      reportedDate: new Date().toISOString(),
    });
    
    setTitle('');
    setDescription('');
    setSeverity('Low');
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card rounded-lg border shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-foreground">Report New Incident</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-foreground mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-foreground mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            className="w-full px-3 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label htmlFor="severity" className="block text-sm font-medium text-foreground mb-1">
            Severity
          </label>
          <select
            id="severity"
            value={severity}
            onChange={(e) => setSeverity(e.target.value as Severity)}
            className="w-full px-3 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <Button 
          type="submit" 
          className="w-full bg-purple-600 hover:bg-purple-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <LoadingSpinner size={18} />
              <span>Submitting...</span>
            </div>
          ) : (
            "Submit Incident"
          )}
        </Button>
      </div>
    </form>
  );
};

export default IncidentForm;
