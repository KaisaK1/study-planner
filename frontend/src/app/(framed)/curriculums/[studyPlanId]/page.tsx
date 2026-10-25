import {
  CourseService,
  CurriculumService,
  ModuleService,
  SemesterService,
  UserService,
} from "@/client";
import { CurriculumPlanningOverview } from "@/components";
import { saveStudyPlan } from "./actions";

export default async function CurriculumPlanning({
  params,
}: Readonly<{
  params: Promise<{ studyPlanId: string }>;
}>) {
  const { studyPlanId } = await params;

  const user = (await UserService.getAllUsers())[0];
  const courses = await CourseService.getAllCourses(undefined, 10);
  const modules = await ModuleService.getModules(studyPlanId);
  const semesters = await SemesterService.getSemesters(studyPlanId, user.externalId);
  const curriculum = await CurriculumService.getCurriculumByStudyPlan(studyPlanId);

  const saveStudyPlanChanges = saveStudyPlan.bind(null, studyPlanId, user.externalId);

  return (
    <CurriculumPlanningOverview
      courses={courses}
      modules={modules}
      semesters={semesters}
      curriculum={curriculum}
      onSaveStudyPlan={saveStudyPlanChanges}
    />
  );
}
