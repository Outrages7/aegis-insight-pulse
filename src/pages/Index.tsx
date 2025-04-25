import { useState, useEffect } from 'react';
import { Filter, Plus } from 'lucide-react';
import { Incident, Severity } from '@/types/incident';
import IncidentCard from '@/components/IncidentCard';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

const initialIncidents: Incident[] = [
  {
    id: '1',
    title: 'AI Model Bias Detection',
    description: 'Discovered significant bias in production model outputs affecting minority groups.',
    severity: 'High',
    reportedDate: '2025-04-20T10:00:00Z',
  },
  {
    id: '2',
    title: 'Data Privacy Breach',
    description: 'Minor data exposure during model training process, affected data immediately quarantined.',
    severity: 'Medium',
    reportedDate: '2025-04-19T15:30:00Z',
  },
  {
    id: '3',
    title: 'Model Performance Degradation',
    description: 'Gradual decline in model accuracy observed over past week, no critical systems affected.',
    severity: 'Low',
    reportedDate: '2025-04-18T09:15:00Z',
  },
];

const Index = () => {
  const navigate = useNavigate();
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [selectedSeverity, setSelectedSeverity] = useState<Severity | 'All'>('All');
  const [sortByNewest, setSortByNewest] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadInitialData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const savedIncidents = localStorage.getItem('incidents');
      if (!savedIncidents) {
        localStorage.setItem('incidents', JSON.stringify(initialIncidents));
        setIncidents(initialIncidents);
      } else {
        setIncidents(JSON.parse(savedIncidents));
      }
      setIsLoading(false);
    };
    loadInitialData();
  }, []);

  const handleNewIncident = (newIncident: Omit<Incident, 'id'>) => {
    const incident: Incident = {
      ...newIncident,
      id: Math.random().toString(36).substr(2, 9),
    };
    const updatedIncidents = [incident, ...incidents];
    setIncidents(updatedIncidents);
    localStorage.setItem('incidents', JSON.stringify(updatedIncidents));
  };

  const filteredAndSortedIncidents = incidents
    .filter(incident => selectedSeverity === 'All' || incident.severity === selectedSeverity)
    .sort((a, b) => {
      const dateA = new Date(a.reportedDate).getTime();
      const dateB = new Date(b.reportedDate).getTime();
      return sortByNewest ? dateB - dateA : dateA - dateB;
    });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <LoadingSpinner size={48} className="text-purple-500" />
          <p className="text-muted-foreground">Loading incidents...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-2">
            AI Safety Incident Dashboard
          </h1>
          <p className="text-muted-foreground">Track and manage AI safety incidents in real-time</p>
        </div>
        
        <div className="bg-card p-4 rounded-lg border shadow-md mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="text-muted-foreground" size={20} />
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value as Severity | 'All')}
                className="px-3 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="All">All Severities</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <Button
              variant="secondary"
              onClick={() => setSortByNewest(!sortByNewest)}
              className="text-foreground"
            >
              Sort: {sortByNewest ? 'Newest First' : 'Oldest First'}
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredAndSortedIncidents.map((incident) => (
            <div
              key={incident.id}
              onClick={() => navigate(`/incident/${incident.id}`)}
              className="cursor-pointer transition-transform hover:scale-[1.02]"
            >
              <IncidentCard incident={incident} />
            </div>
          ))}
          {filteredAndSortedIncidents.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No incidents found matching the current filters.
            </p>
          )}
        </div>
      </div>

      <Button 
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg bg-purple-600 hover:bg-purple-700"
        onClick={() => navigate('/report')}
      >
        <Plus size={24} />
      </Button>
    </div>
  );
};

export default Index;
