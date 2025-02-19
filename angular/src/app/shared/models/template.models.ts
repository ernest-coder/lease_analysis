import { Question } from "./question.models";

export interface Template {
    id: number;
    created_at: string;
    name:string;
    description: string;
    standard: boolean;
}

export interface QuestionsTemplates {
    id: number;
    question_id: number;
    template_id: number;
}