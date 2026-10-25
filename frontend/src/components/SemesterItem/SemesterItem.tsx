"use client";

import { useState } from "react";
import type { CourseResponse, SemesterResponse } from "@/client";
import { useTranslations } from "@/hooks";
import styles from "./SemesterItem.module.css";
import { CourseTable } from "../CourseTable/CourseTable";

const cx = (...classes: (string | false | undefined)[]) =>
  classes.filter(Boolean).join(" ");

type CourseWithStatus = CourseResponse & {
  courseStatus: string;
};

export interface SemesterItemProps {
  semester: SemesterResponse;
  isCurrent: boolean;
  courses: CourseWithStatus[];
  label: string;
  credits: number;
  finished: boolean;
  toggleCompleted: (
    versionExternalId: string,
    semesterId: string,
    checked: boolean,
  ) => void;
  removeCourse: (versionExternalId: string, semesterId: string) => void;
}

export function SemesterItem({
  semester,
  isCurrent,
  courses,
  label,
  credits,
  finished,
  toggleCompleted,
  removeCourse,
}: Readonly<SemesterItemProps>) {
  const { CurriculumPlanning } = useTranslations();

  const [userExpanded, setUserExpanded] = useState<boolean | null>(null);
  const expanded = userExpanded ?? (courses.length > 0 || isCurrent);
  const doneClass = finished ? styles.planning__semester_name__done : undefined;

  return (
    <div className={styles.planning__accordion_item}>
      <button
        type="button"
        className={styles.planning__accordion_header}
        onClick={() =>
          setUserExpanded((previous) => {
            const currentExpanded =
              previous ?? (courses.length > 0 || isCurrent);

            return !currentExpanded;
          })
        }
        aria-expanded={expanded}
      >
        <span className={styles.planning__dot_slot}>
          {isCurrent && <span className={styles.planning__current_dot} />}
        </span>

        <span className={cx(styles.planning__semester_name, doneClass)}>
          {label}
        </span>

        <span className={cx(styles.planning__credits, doneClass)}>
          {credits}/{30}
        </span>

        <span className={cx(styles.planning__credits_unit, doneClass)}>
          {CurriculumPlanning.Credits}
        </span>

        <svg
          className={cx(
            styles.planning__chevron,
            expanded && styles.planning__chevron__up,
          )}
          viewBox="0 0 12 8"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M1 1.5L6 6L11 1.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {expanded && (
        <CourseTable
          courses={courses}
          showHeader={false}
          renderAction={(course: CourseWithStatus) => (
            <div className={styles.planning__row_actions}>
              <input
                type="checkbox"
                className={styles.course__checkbox}
                checked={course.courseStatus === "COMPLETED"}
                onChange={(event) =>
                  toggleCompleted?.(
                    course.versionExternalId,
                    semester.externalId,
                    event.target.checked,
                  )
                }
              />

              <button
                type="button"
                className={styles.planning__remove_btn}
                onClick={() =>
                  removeCourse?.(course.versionExternalId, semester.externalId)
                }
                aria-label={CurriculumPlanning.RemoveCourse}
              >
                ×
              </button>
            </div>
          )}
        />
      )}
    </div>
  );
}
