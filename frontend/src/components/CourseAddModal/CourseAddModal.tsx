"use client";

import { CourseResponse, SemesterResponse } from "@/client";
import { useTranslations } from "@/hooks";
import { getSemesterKey } from "@/utils";
import { useEffect, useRef, useState } from "react";
import styles from "./CourseAddModal.module.css";

interface CourseAddModalProps {
  course: CourseResponse;
  semesters: SemesterResponse[];
  onClose: (semesterExternalId?: string) => void;
}

export function CourseAddModal({
  course,
  semesters,
  onClose,
}: Readonly<CourseAddModalProps>) {
  const { CurriculumPlanning, Common } = useTranslations();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState(semesters[0]?.externalId ?? "");

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      onClose={() => onClose(undefined)}
      aria-labelledby="add-course-title"
      className={styles.dialog}
    >
      <header className={styles.dialog__header}>
        <span className={styles.dialog__label}>{CurriculumPlanning.Add}</span>
        <button
          type="button"
          className={styles.dialog__close}
          onClick={() => dialogRef.current?.close()}
          aria-label={Common.Close}
        >
          ×
        </button>
      </header>

      <h2 className={styles.dialog__course_title}>{course.titleEt}</h2>

      <div className={styles.dialog__field}>
        <label className={styles.dialog__field_label} htmlFor="semester-select">
          {CurriculumPlanning.IntoSemester}
        </label>

        {semesters.length === 0 ? (
          <span className={styles.dialog__no_options}>
            {CurriculumPlanning.NoAvailableSemester}
          </span>
        ) : (
          <select
            id="semester-select"
            className={styles.dialog__select}
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            {semesters.map((semester) => (
              <option key={semester.externalId} value={semester.externalId}>
                {semester.year} {getSemesterKey(semester.semesterType, Common)}
              </option>
            ))}
          </select>
        )}
      </div>

      <button
        type="button"
        className={styles.dialog__submit}
        onClick={() => {
          onClose(selected);
        }}
        disabled={!selected}
      >
        {CurriculumPlanning.AddToPlan}
      </button>
    </dialog>
  );
}
