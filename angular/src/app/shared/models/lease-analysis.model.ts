import { Template } from "./template.models";

export interface LeaseAnalysis {
    id: number;
    created_at: string;
    template: Template;
    file: string;
  }