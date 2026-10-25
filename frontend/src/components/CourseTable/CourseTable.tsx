'use client';

import { ReactNode } from 'react';
import type { CourseResponse } from '@/client';
import { useTranslations } from '@/hooks';
import { SemesterBadge } from '../SemesterBadge/SemesterBadge';
import styles from './CourseTable.module.css';

interface CourseTableProps<T extends CourseResponse = CourseResponse> {
  courses: T[];
  showHeader?: boolean;
  renderAction?: (course: T) => ReactNode;
}

export function CourseTable<T extends CourseResponse = CourseResponse>({
  courses,
  showHeader = true,
  renderAction,
}: Readonly<CourseTableProps<T>>) {
  const { CurriculumPlanning } = useTranslations();

  return (
    <table className={styles.courseTable}>
      <thead>
        {showHeader && (
          <tr>
            <th className={styles.colTitle}></th>
            <th className={styles.colCredits}>{CurriculumPlanning.Credits}</th>
            <th className={styles.colSemester}>
              {CurriculumPlanning.StudySemester}
            </th>
            <th className={styles.colAction}></th>
          </tr>
        )}
      </thead>
      <tbody>
        {courses.map((course) => (
          <tr key={course.oisExternalId} className={styles.courseRow}>
            <td className={styles.colTitle}>
              {course.titleEt}{" "}
              <span className={styles.courseCode}>({course.code})</span>
            </td>
            <td className={styles.colCredits}>{course.credits}</td>
            <td className={styles.colSemester}>
              {course.semesterType && (
                <div className={styles.badgeCenter}>
                  <SemesterBadge semester={course.semesterType} />
                </div>
              )}
            </td>
            <td className={styles.colAction}>
              {renderAction ? (
                renderAction(course)
              ) : (
                <button type="button" className={styles.addBtn}>
                  +
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
