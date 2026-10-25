import { StudyPlanService, UserService } from "@/client";
import { Notification, PageLayout, CurriculumTable } from "@/components";
import { getTranslations } from "@/dictionary";

export default async function CurriculumsPage() {
  const { Curriculums } = getTranslations();

  const user = (await UserService.getAllUsers())[0];
  if (!user) return;
  const studyPlans = await StudyPlanService.getStudyPlans(user.externalId);

  return (
    <PageLayout title={Curriculums.Title}>
      {studyPlans.length === 0 ? (
        <Notification message={Curriculums.NoCurriculumsNotification} />
      ) : (
        <CurriculumTable studyPlans={studyPlans}/>
      )}
    </PageLayout>
  );
}
