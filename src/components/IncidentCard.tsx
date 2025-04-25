
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Incident } from '@/types/incident';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface IncidentCardProps {
  incident: Incident;
}

const IncidentCard = ({ incident }: IncidentCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const severityColor = {
    Low: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    High: 'bg-red-100 text-red-800',
  }[incident.severity];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4 transition-all hover:shadow-md">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{incident.title}</h3>
          <div className="flex items-center gap-3 mt-2">
            <span className={cn("px-2 py-1 rounded-full text-xs font-medium", severityColor)}>
              {incident.severity}
            </span>
            <span className="text-sm text-gray-500">
              {new Date(incident.reportedDate).toLocaleDateString()}
            </span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-500 hover:text-gray-700"
        >
          {isExpanded ? <ChevronUp /> : <ChevronDown />}
        </Button>
      </div>
      {isExpanded && (
        <div className="mt-4 text-gray-600 text-sm animate-fade-in">
          {incident.description}
        </div>
      )}
    </div>
  );
};

export default IncidentCard;
