
export type Severity = 'Low' | 'Medium' | 'High';

export interface Incident {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  reportedDate: string;
}
