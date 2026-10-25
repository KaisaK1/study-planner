import { PlannedCourseResponse, SemesterResponse } from "@/client";
import { Translations } from "@/dictionary";
import { DraftPlannedCourse } from "@/types";

export function getSemesterKey(
  semesterType: string | undefined,
  translations: Translations["Common"],
): string {
  if (!semesterType) return "";

  const keys: Record<string, string> = {
    AUTUMN: translations.Autumn,
    SPRING: translations.Spring,
  };

  return keys[semesterType] ?? semesterType;
}

export function calculateSemesterCredits(
  plannedCourses: PlannedCourseResponse[],
): number {
  return plannedCourses.reduce(
    (total, pc) => total + (pc.course.credits ?? 0),
    0,
  );
}

export function findCurrentSemester(
  semesters: SemesterResponse[],
): string | undefined {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const semesterType = month >= 9 || month <= 1 ? "AUTUMN" : "SPRING";

  return semesters.find(
    (s) => s.semesterType === semesterType && s.year === year,
  )?.externalId;
}

export function isSemesterFinished(semester: SemesterResponse): boolean {
  const plannedCourses = semester.plannedCourses ?? [];

  if (plannedCourses.length === 0) return false;

  return plannedCourses.every(
    (course) =>
      course.courseStatus === PlannedCourseResponse.courseStatus.COMPLETED,
  );
}

export function flattenSemesters(semesters: SemesterResponse[]): DraftPlannedCourse[] {
  return semesters.flatMap((s) =>
    (s.plannedCourses ?? []).map((pc) => ({
      semesterExternalId: s.externalId,
      course: pc.course,
      module: pc.module,
      completed:
        pc.courseStatus === PlannedCourseResponse.courseStatus.COMPLETED,
    })),
  );

}
