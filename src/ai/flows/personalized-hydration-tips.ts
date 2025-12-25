'use server';

/**
 * @fileOverview A flow for providing personalized hydration tips to students based on their daily progress.
 *
 * - getPersonalizedHydrationTips - A function that returns personalized hydration tips.
 * - PersonalizedHydrationTipsInput - The input type for the getPersonalizedHydrationTips function.
 * - PersonalizedHydrationTipsOutput - The return type for the getPersonalizedHydrationTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedHydrationTipsInputSchema = z.object({
  studentId: z.string().describe('The ID of the student.'),
  dailyProgressPercentage: z
    .number()
    .describe(
      'The percentage of the daily hydration goal that the student has achieved.'
    ),
});
export type PersonalizedHydrationTipsInput = z.infer<
  typeof PersonalizedHydrationTipsInputSchema
>;

const PersonalizedHydrationTipsOutputSchema = z.object({
  tip: z.string().describe('A personalized hydration tip for the student.'),
});
export type PersonalizedHydrationTipsOutput = z.infer<
  typeof PersonalizedHydrationTipsOutputSchema
>;

export async function getPersonalizedHydrationTips(
  input: PersonalizedHydrationTipsInput
): Promise<PersonalizedHydrationTipsOutput> {
  return personalizedHydrationTipsFlow(input);
}

const personalizedHydrationTipsPrompt = ai.definePrompt({
  name: 'personalizedHydrationTipsPrompt',
  input: {schema: PersonalizedHydrationTipsInputSchema},
  output: {schema: PersonalizedHydrationTipsOutputSchema},
  prompt: `You are an AI assistant that provides personalized hydration tips to students.

  Based on the student's daily progress, provide a tip to encourage them to stay hydrated.

  Student ID: {{{studentId}}}
  Daily Progress: {{{dailyProgressPercentage}}}%

  Tip:`,
});

const personalizedHydrationTipsFlow = ai.defineFlow(
  {
    name: 'personalizedHydrationTipsFlow',
    inputSchema: PersonalizedHydrationTipsInputSchema,
    outputSchema: PersonalizedHydrationTipsOutputSchema,
  },
  async input => {
    const {output} = await personalizedHydrationTipsPrompt(input);
    return output!;
  }
);
