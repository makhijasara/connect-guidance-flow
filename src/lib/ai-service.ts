import { supabase } from "@/integrations/supabase/client";

export type AITaskType = 
  | 'doubt-answer' 
  | 'mentor-match' 
  | 'session-summary' 
  | 'career-roadmap' 
  | 'content-moderation'
  | 'certificate-text';

export interface AIRequest {
  type: AITaskType;
  data: Record<string, unknown>;
}

export interface AIResponse {
  result: string;
  type: AITaskType;
  error?: string;
}

export async function callAIAssistant(request: AIRequest): Promise<AIResponse> {
  try {
    const { data, error } = await supabase.functions.invoke('ai-assistant', {
      body: request,
    });

    if (error) {
      console.error('AI Assistant error:', error);
      throw new Error(error.message || 'Failed to get AI response');
    }

    if (data.error) {
      throw new Error(data.error);
    }

    return data as AIResponse;
  } catch (error) {
    console.error('Error calling AI assistant:', error);
    throw error;
  }
}

// Convenience functions for specific AI tasks
export async function getDoubtAnswer(title: string, description: string, category: string) {
  return callAIAssistant({
    type: 'doubt-answer',
    data: { title, description, category },
  });
}

export async function getMentorRecommendations(
  studentSkills: string[],
  studentInterests: string[],
  careerGoals: string,
  branch: string,
  year: string,
  mentors: Array<{ id: string; name: string; skills: string[]; branch: string; role: string }>
) {
  return callAIAssistant({
    type: 'mentor-match',
    data: { studentSkills, studentInterests, careerGoals, branch, year, mentors },
  });
}

export async function getSessionSummary(
  mentorName: string,
  studentName: string,
  topic: string,
  duration: number,
  notes: string,
  date: string
) {
  return callAIAssistant({
    type: 'session-summary',
    data: { mentorName, studentName, topic, duration, notes, date },
  });
}

export async function getCareerRoadmap(
  year: string,
  branch: string,
  skills: string[],
  careerGoal: string,
  targetCompanies?: string[]
) {
  return callAIAssistant({
    type: 'career-roadmap',
    data: { year, branch, skills, careerGoal, targetCompanies },
  });
}

export async function moderateContent(content: string, title?: string) {
  return callAIAssistant({
    type: 'content-moderation',
    data: { content, title },
  });
}

export async function generateCertificateText(
  name: string,
  role: string,
  achievement: string,
  hours: number,
  skills: string[],
  rating: number
) {
  return callAIAssistant({
    type: 'certificate-text',
    data: { name, role, achievement, hours, skills, rating },
  });
}
