"use server";

import { PlannedCourseService } from "@/client";
import type { PlannedCourseRequest } from "@/client";

export async function saveStudyPlan(
  studyPlanId: string,
  userId: string,
  request: PlannedCourseRequest[],
) {
  try {
    await PlannedCourseService.setPlannedCourses(studyPlanId, request, userId);

    return { success: true };
  } catch (error) {
    console.error("Failed to save study plan:", error);
    return { success: false };
  }
}
