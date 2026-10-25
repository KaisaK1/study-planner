"use client";

import type { StudyPlanResponse } from "@/client";
import { useTranslations } from "@/hooks";
import styles from "./CurriculumTable.module.css";
import { mapStudyLevel } from "@/utils";
import Link from "next/link";

interface CourseTableProps {
  studyPlans: StudyPlanResponse[];
}

export function CurriculumTable({
  studyPlans,
}: Readonly<CourseTableProps>) {
  const { Curriculums, Common } = useTranslations();

  return (
    <table className={styles.curriculumTable}>
      <thead>
        <tr className={styles.columnHeader}>
          <th>{Curriculums.Name}</th>
          <th>{Curriculums.StudyLevel}</th>
          <th>{Curriculums.Credits}</th>
        </tr>
      </thead>
      <tbody>
        {studyPlans.map((studyPlan) => (
          <tr key={studyPlan.externalId} className={styles.curriculumRow}>
            <td>{studyPlan.curriculum.title}</td>
            <td>
              {mapStudyLevel(studyPlan.curriculum.studyLevel, Curriculums)}
            </td>
            <td>
              {studyPlan.completedCredits} / {studyPlan.curriculum.credits}
            </td>
            <td className={styles.columnAction}>
              <Link
                href={`/curriculums/${studyPlan.externalId}`}
                className={styles.curriculumsEdit}
              >
                {Common.Edit}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
