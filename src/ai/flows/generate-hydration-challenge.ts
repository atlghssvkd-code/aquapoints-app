'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating personalized hydration challenges for students.
 *
 * The flow takes student profile information and hydration goals as input and uses a
 * generative AI model to create a unique and engaging challenge.
 *
 * @exports generateHydrationChallenge - A function that triggers the hydration challenge generation flow.
 * @exports HydrationChallengeInput - The input type for the generateHydrationChallenge function.
 * @exports HydrationChallengeOutput - The output type for the generateHydrationChallenge function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HydrationChallengeInputSchema = z.object({
  studentName: z.string().describe('The name of the student.'),
  dailyGoal: z.number().describe('The student`s daily hydration goal in ounces.'),
  currentPoints: z.number().describe('The student`s current hydro-point balance.'),
  pastChallenges: z.array(z.string()).optional().describe('The student`s history of challenges, to be avoided.'),
});
export type HydrationChallengeInput = z.infer<typeof HydrationChallengeInputSchema>;

const HydrationChallengeOutputSchema = z.object({
  challenge: z.string().describe('A personalized hydration challenge for the student.'),
});
export type HydrationChallengeOutput = z.infer<typeof HydrationChallengeOutputSchema>;

export async function generateHydrationChallenge(input: HydrationChallengeInput): Promise<HydrationChallengeOutput> {
  return generateHydrationChallengeFlow(input);
}

const hydrationChallengePrompt = ai.definePrompt({
  name: 'hydrationChallengePrompt',
  input: {schema: HydrationChallengeInputSchema},
  output: {schema: HydrationChallengeOutputSchema},
  prompt: `You are an AI assistant designed to generate personalized hydration challenges for students to encourage them to drink more water.

  Generate a fun and engaging challenge for {{studentName}} to help them reach their daily hydration goal of {{dailyGoal}} ounces. Consider their current hydro-point balance of {{currentPoints}} points when creating the challenge. Make the challenges fun and creative to encourage students to stay hydrated. Make the output 1-2 sentences long.

  {% if pastChallenges %}
  Avoid these past challenges: 
  {{#each pastChallenges}}
  - {{this}}
  {{/each}}
  {% endif %}
  `,
});

const generateHydrationChallengeFlow = ai.defineFlow(
  {
    name: 'generateHydrationChallengeFlow',
    inputSchema: HydrationChallengeInputSchema,
    outputSchema: HydrationChallengeOutputSchema,
  },
  async input => {
    const {output} = await hydrationChallengePrompt(input);
    return output!;
  }
);
