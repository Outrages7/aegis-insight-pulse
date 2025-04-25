
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Incident } from '@/types/incident';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import LoadingSpinner from './LoadingSpinner';

interface IncidentCardProps {
  incident: Incident;
}

const IncidentCard = ({ incident }: IncidentCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const severityColor = {
    Low: 'bg-green-500/20 text-green-400',
    Medium: 'bg-yellow-500/20 text-yellow-400',
    High: 'bg-red-500/20 text-red-400',
  }[incident.severity];

  const handleExpand = async () => {
    if (!isExpanded) {
      setIsLoading(true);
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsLoading(false);
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-card rounded-lg border shadow-md p-4 transition-all hover:shadow-lg">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground">{incident.title}</h3>
          <div className="flex items-center gap-3 mt-2">
            <span className={cn("px-2 py-1 rounded-full text-xs font-medium", severityColor)}>
              {incident.severity}
            </span>
            <span className="text-sm text-muted-foreground">
              {new Date(incident.reportedDate).toLocaleDateString()}
            </span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleExpand}
          className="text-muted-foreground hover:text-foreground"
          disabled={isLoading}
        >
          {isLoading ? (
            <LoadingSpinner size={18} />
          ) : (
            isExpanded ? <ChevronUp /> : <ChevronDown />
          )}
        </Button>
      </div>
      {isExpanded && (
        <div className="mt-4 text-muted-foreground text-sm animate-fade-in">
          {incident.description}
        </div>
      )}
    </div>
  );
};

export default IncidentCard;
