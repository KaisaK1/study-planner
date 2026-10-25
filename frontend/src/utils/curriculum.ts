import { CurriculumResponse } from "@/client";
import { Translations } from "@/dictionary";

export function mapStudyLevel(
  studyLevel: CurriculumResponse.studyLevel,
  translations: Translations["Curriculums"],
): string {
  const studyLevelKeys: Record<CurriculumResponse.studyLevel, string> = {
    [CurriculumResponse.studyLevel.BACHELOR]: translations.Bachelor,
    [CurriculumResponse.studyLevel.MASTER]: translations.Master,
    [CurriculumResponse.studyLevel.DOCTOR]: translations.Doctor,
    [CurriculumResponse.studyLevel.INTEGRATED]: translations.Integrated,
  };

  return studyLevelKeys[studyLevel] ?? studyLevel;
}
