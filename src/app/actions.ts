"use server";

import { generateHydrationChallenge, HydrationChallengeInput } from "@/ai/flows/generate-hydration-challenge";
import { getPersonalizedHydrationTips, PersonalizedHydrationTipsInput } from "@/ai/flows/personalized-hydration-tips";

export async function getChallengeAction(input: HydrationChallengeInput) {
  try {
    const result = await generateHydrationChallenge(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error generating challenge:", error);
    return { success: false, error: "Failed to generate a new challenge." };
  }
}

export async function getTipsAction(input: PersonalizedHydrationTipsInput) {
    try {
      const result = await getPersonalizedHydrationTips(input);
      return { success: true, data: result };
    } catch (error) {
      console.error("Error generating tips:", error);
      return { success: false, error: "Failed to generate new tips." };
    }
  }
