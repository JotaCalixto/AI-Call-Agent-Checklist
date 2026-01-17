
export interface Task {
  id: string;
  label: string;
  completed: boolean;
}

export interface SubSection {
  id: string;
  title: string;
  category?: 'outbound' | 'inbound' | 'technical' | 'general';
  tasks: Task[];
}

export interface Stage {
  id: string;
  number: string;
  title: string;
  description?: string;
  subSections?: SubSection[];
  tasks?: Task[];
}

export type ChecklistState = Record<string, boolean>;
