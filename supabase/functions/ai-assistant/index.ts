import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, data } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    let systemPrompt = '';
    let userPrompt = '';

    // Route based on AI task type
    switch (type) {
      case 'doubt-answer':
        systemPrompt = `You are an expert academic mentor at a college. Your role is to help students with their doubts about academics, placements, internships, skills, and career guidance.

Guidelines:
- Provide clear, structured answers
- Use bullet points for steps or lists
- Be encouraging and supportive
- Keep answers concise but comprehensive
- Include practical examples when relevant
- If the question is about placements, include tips about interview preparation
- For technical questions, explain concepts simply

Format your response with:
1. Brief direct answer (2-3 sentences)
2. Detailed explanation with steps/points
3. Pro tip or additional resource suggestion`;
        
        userPrompt = `Question: ${data.title}
Description: ${data.description}
Category: ${data.category}

Please provide a helpful answer to this student's doubt.`;
        break;

      case 'mentor-match':
        systemPrompt = `You are an AI mentor matching system for a college mentorship platform. Analyze student profiles and recommend the best mentors based on skills, interests, and career goals.

Guidelines:
- Consider skill overlap between student needs and mentor expertise
- Prioritize mentors with relevant industry experience
- Consider career goals alignment
- Return recommendations in JSON format with reasoning`;
        
        userPrompt = `Student Profile:
- Skills: ${data.studentSkills?.join(', ') || 'Not specified'}
- Interests: ${data.studentInterests?.join(', ') || 'Not specified'}
- Career Goals: ${data.careerGoals || 'Not specified'}
- Branch: ${data.branch || 'Not specified'}
- Year: ${data.year || 'Not specified'}

Available Mentors:
${JSON.stringify(data.mentors, null, 2)}

Recommend the top 3 most suitable mentors with brief reasoning for each match. Return as JSON array with format: [{"mentorId": "id", "name": "name", "matchScore": 95, "reason": "brief reason"}]`;
        break;

      case 'session-summary':
        systemPrompt = `You are a session summary generator for a mentorship platform. Create professional, actionable summaries of mentoring sessions.

Guidelines:
- Summarize key discussion points
- Highlight action items and next steps
- Note any resources or references mentioned
- Include learning outcomes
- Format for professional certificate generation`;
        
        userPrompt = `Session Details:
- Mentor: ${data.mentorName}
- Student: ${data.studentName}
- Topic: ${data.topic}
- Duration: ${data.duration} minutes
- Session Notes: ${data.notes || 'No notes provided'}
- Date: ${data.date}

Generate a professional session summary including:
1. Key Discussion Points
2. Learning Outcomes
3. Action Items
4. Next Steps
5. Certificate-worthy summary (1 paragraph)`;
        break;

      case 'career-roadmap':
        systemPrompt = `You are a career guidance counselor specializing in helping engineering students plan their career paths. Create detailed, actionable roadmaps.

Guidelines:
- Consider the student's current year and skills
- Include timeline milestones
- Suggest specific resources, courses, and certifications
- Include both technical and soft skills development
- Be realistic about timelines`;
        
        userPrompt = `Student Details:
- Year: ${data.year}
- Branch: ${data.branch}
- Current Skills: ${data.skills?.join(', ') || 'Beginner'}
- Career Goal: ${data.careerGoal}
- Target Companies: ${data.targetCompanies?.join(', ') || 'Top tech companies'}

Create a detailed career roadmap with monthly/quarterly milestones, recommended resources, and key skills to develop.`;
        break;

      case 'content-moderation':
        systemPrompt = `You are a content moderation system for a college mentorship platform. Analyze text for inappropriate content including bullying, harassment, spam, or off-topic content.

Return JSON format: {"isSafe": boolean, "issues": ["issue1", "issue2"], "severity": "none|low|medium|high"}`;
        
        userPrompt = `Analyze this content for any issues:
Title: ${data.title || ''}
Content: ${data.content}

Check for: harassment, bullying, spam, inappropriate language, off-topic content`;
        break;

      case 'certificate-text':
        systemPrompt = `You are a certificate text generator for a mentorship platform. Create professional, achievement-focused certificate descriptions.`;
        
        userPrompt = `Generate a professional certificate description for:
- Name: ${data.name}
- Role: ${data.role}
- Achievement: ${data.achievement}
- Hours: ${data.hours} hours of mentorship
- Skills: ${data.skills?.join(', ')}
- Rating: ${data.rating}/5

Create a 2-3 sentence certificate description suitable for LinkedIn and resumes.`;
        break;

      default:
        throw new Error(`Unknown AI task type: ${type}`);
    }

    console.log(`Processing AI request: ${type}`);

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ 
          error: 'Rate limit exceeded. Please try again later.' 
        }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      if (response.status === 402) {
        return new Response(JSON.stringify({ 
          error: 'AI usage limit reached. Please check your workspace credits.' 
        }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const aiResponse = await response.json();
    const generatedText = aiResponse.choices[0]?.message?.content || '';

    console.log(`AI response generated for: ${type}`);

    return new Response(JSON.stringify({ 
      result: generatedText,
      type 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    console.error('Error in ai-assistant function:', error);
    const errorMessage = error instanceof Error ? error.message : 'An error occurred processing your request';
    return new Response(JSON.stringify({ 
      error: errorMessage 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
