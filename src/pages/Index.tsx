
import { useState } from 'react';
import { Filter } from 'lucide-react';
import { Incident, Severity } from '@/types/incident';
import IncidentCard from '@/components/IncidentCard';
import IncidentForm from '@/components/IncidentForm';
import { Button } from '@/components/ui/button';

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
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);
  const [selectedSeverity, setSelectedSeverity] = useState<Severity | 'All'>('All');
  const [sortByNewest, setSortByNewest] = useState(true);

  const handleNewIncident = (newIncident: Omit<Incident, 'id'>) => {
    const incident: Incident = {
      ...newIncident,
      id: Math.random().toString(36).substr(2, 9),
    };
    setIncidents(prev => [incident, ...prev]);
  };

  const filteredAndSortedIncidents = incidents
    .filter(incident => selectedSeverity === 'All' || incident.severity === selectedSeverity)
    .sort((a, b) => {
      const dateA = new Date(a.reportedDate).getTime();
      const dateB = new Date(b.reportedDate).getTime();
      return sortByNewest ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
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
                <IncidentCard key={incident.id} incident={incident} />
              ))}
              {filteredAndSortedIncidents.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No incidents found matching the current filters.
                </p>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <IncidentForm onSubmit={handleNewIncident} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
