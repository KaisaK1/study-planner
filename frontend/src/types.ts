import { CourseResponse, ModuleResponse } from "@/client";

export interface DraftPlannedCourse {
  semesterExternalId: string;
  course: CourseResponse;
  module?: ModuleResponse;
  completed: boolean;
}