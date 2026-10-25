"use client";

import {
  CourseResponse,
  CurriculumResponse,
  ModuleResponse,
  PlannedCourseRequest,
  PlannedCourseResponse,
  SemesterResponse,
} from "@/client";
import { useTranslations } from "@/hooks";
import styles from "./CurriculumPlanningOverview.module.css";
import { Search } from "../Search/Search";
import { Notification } from "../Notification/Notification";
import { CourseTable } from "../CourseTable/CourseTable";
import { SemesterItem } from "../SemesterItem/SemesterItem";
import { CourseAddModal } from "../CourseAddModal/CourseAddModal";
import { findCurrentSemester, flattenSemesters, getSemesterKey } from "@/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DraftPlannedCourse } from "@/types";

interface CurriculumPlanningOverviewProps {
  courses: CourseResponse[];
  semesters: SemesterResponse[];
  modules: ModuleResponse[];
  curriculum: CurriculumResponse;
  onSaveStudyPlan: (
    request: PlannedCourseRequest[],
  ) => Promise<{ success: boolean }>;
}

interface SaveNotification {
  kind: "success" | "error";
  message: string;
}

const SEMESTER_ORDER: Record<string, number> = { SPRING: 1, AUTUMN: 2 };

const isSame = (d: DraftPlannedCourse, semesterId: string, versionId: string) =>
  d.semesterExternalId === semesterId &&
  d.course.versionExternalId === versionId;

const sumCredits = (items: DraftPlannedCourse[]) =>
  items.reduce((sum, d) => sum + (d.course.credits ?? 0), 0);

export function CurriculumPlanningOverview({
  courses,
  semesters,
  modules,
  curriculum,
  onSaveStudyPlan,
}: Readonly<CurriculumPlanningOverviewProps>) {
  const { CurriculumPlanning, Common } = useTranslations();
  const router = useRouter();

  const totalRequiredCredits = curriculum.credits;
  const currentSemesterExternalId = findCurrentSemester(semesters);

  const [saving, setSaving] = useState(false);
  const [hideCompleted, setHideCompleted] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");
  const [notification, setNotification] = useState<SaveNotification | null>(
    null,
  );
  const [addingCourse, setAddingCourse] = useState<CourseResponse | null>(null);
  const [draft, setDraft] = useState<DraftPlannedCourse[]>(() =>
    flattenSemesters(semesters),
  );

  const dirty = (
    draft: DraftPlannedCourse[],
    saved: DraftPlannedCourse[],
  ) => {
    const key = (items: DraftPlannedCourse[]) =>
      items
        .map((d) =>
          [d.semesterExternalId, d.course.versionExternalId, d.completed].join(
            "|",
          ),
        )
        .sort((a, b) => a.localeCompare(b))
        .join(";");

    return key(draft) !== key(saved);
  };

  const sortedSemesters = [...semesters].sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return (
      (SEMESTER_ORDER[a.semesterType ?? ""] ?? 0) -
      (SEMESTER_ORDER[b.semesterType ?? ""] ?? 0)
    );
  });

  const bySemester = new Map<string, DraftPlannedCourse[]>();
  for (const d of draft) {
    const list = bySemester.get(d.semesterExternalId);
    if (list) list.push(d);
    else bySemester.set(d.semesterExternalId, [d]);
  }
  const itemsOf = (semesterId: string) => bySemester.get(semesterId) ?? [];

  const isFinished = (semesterId: string) => {
    const items = itemsOf(semesterId);
    return items.length > 0 && items.every((d) => d.completed);
  };

  const filteredSemesters = hideCompleted
    ? sortedSemesters.filter((s) => !isFinished(s.externalId))
    : sortedSemesters;

  const totalCredits = sumCredits(draft);

  const moduleCredits = new Map<string, number>();
  for (const d of draft) {
    if (d.completed && d.module) {
      const id = d.module.externalId;
      moduleCredits.set(
        id,
        (moduleCredits.get(id) ?? 0) + (d.course.credits ?? 0),
      );
    }
  }

  const title = searchTitle.trim().toLowerCase();
  const visibleCourses =
    title.length <= 2
      ? courses
      : courses.filter((c) => c.titleEt?.toLowerCase().includes(title));

  const toggleCompleted = (
    versionId: string,
    semesterId: string,
    checked: boolean,
  ) =>
    setDraft((items) =>
      items.map((d) =>
        isSame(d, semesterId, versionId) ? { ...d, completed: checked } : d,
      ),
    );

  const removeCourse = (versionId: string, semesterId: string) =>
    setDraft((items) => items.filter((d) => !isSame(d, semesterId, versionId)));

  const availableSemestersFor = (course: CourseResponse) =>
    sortedSemesters.filter(
      (s) =>
        s.semesterType !== undefined &&
        (s.semesterType as string) === (course.semesterType as string) &&
        !draft.some((d) => isSame(d, s.externalId, course.versionExternalId)),
    );

  const startAddCourse = (course: CourseResponse) => {
    if (availableSemestersFor(course).length === 0) {
      setNotification({
        kind: "error",
        message: CurriculumPlanning.NoAvailableSemester,
      });
      return;
    }
    setNotification(null);
    setAddingCourse(course);
  };

  const confirmAddCourse = (semesterExternalId?: string) => {
    const course = addingCourse;
    setAddingCourse(null);
    if (!course || !semesterExternalId) return;
    setDraft((items) => [
      ...items,
      { semesterExternalId, course, completed: false },
    ]);
  };

  async function handleSave() {
    if (!dirty || saving) return;

    setSaving(true);
    setNotification(null);

    const requests: PlannedCourseRequest[] = draft.map((d) => ({
      semesterExternalId: d.semesterExternalId,
      courseVersionExternalId: d.course.versionExternalId,
      courseExternalId: d.course.oisExternalId,
      status: d.completed
        ? PlannedCourseRequest.status.COMPLETED
        : PlannedCourseRequest.status.PLANNED,
    }));

    try {
      await onSaveStudyPlan(requests);
      setNotification({
        kind: "success",
        message: CurriculumPlanning.SaveSuccess,
      });
      router.refresh();
    } catch (error) {
      console.error("Failed to save study plan:", error);
      setNotification({
        kind: "error",
        message: CurriculumPlanning.SaveError,
      });
    }
    setSaving(false);
  }

  return (
    <section className={styles.planning}>
      <header className={styles.planning__header}>
        <h1 className={styles.planning__title}>{CurriculumPlanning.Title}</h1>
        <button
          type="button"
          className={styles.planning__save}
          onClick={handleSave}
          disabled={!dirty || saving}
        >
          {saving ? Common.Saving : Common.Save}
        </button>
      </header>

      {notification && (
        <Notification
          kind={notification.kind}
          message={notification.message}
          onClose={() => setNotification(null)}
          closeLabel={Common.Close}
        />
      )}

      <div className={styles.planning__panels}>
        <section className={styles.planning__panel}>
          <h2 className={styles.planning__section_title}>
            {CurriculumPlanning.SemesterPlan}
          </h2>

          <label className={styles.planning__hide_toggle}>
            <input
              type="checkbox"
              className={styles.course__checkbox}
              checked={hideCompleted}
              onChange={(e) => setHideCompleted(e.target.checked)}
            />
            {CurriculumPlanning.HideCompletedSemesters}
          </label>

          {filteredSemesters.length === 0 ? (
            <Notification
              message={CurriculumPlanning.NoSemestersNotification}
            />
          ) : (
            <div className={styles.planning__accordion}>
              {filteredSemesters.map((semester) => {
                const items = itemsOf(semester.externalId);
                return (
                  <SemesterItem
                    key={semester.externalId}
                    semester={semester}
                    isCurrent={
                      semester.externalId === currentSemesterExternalId
                    }
                    courses={items.map((d) => ({
                      ...d.course,
                      courseStatus: d.completed
                        ? PlannedCourseResponse.courseStatus.COMPLETED
                        : PlannedCourseResponse.courseStatus.PLANNED,
                    }))}
                    label={`${getSemesterKey(semester.semesterType, Common)} ${semester.year}`}
                    credits={sumCredits(items)}
                    finished={isFinished(semester.externalId)}
                    toggleCompleted={(versionId: string, semesterId: string, checked: boolean) =>
                      toggleCompleted(versionId, semester.externalId, checked)
                    }
                    removeCourse={(versionId: string) =>
                      removeCourse(versionId, semester.externalId)
                    }
                  />
                );
              })}
            </div>
          )}
        </section>

        <div className={styles.planning__divider} aria-hidden="true"></div>

        <section className={styles.planning__panel__split}>
          <div className={styles.planning__sidebar}>
            <h2 className={styles.planning__section_title}>
              {CurriculumPlanning.Subjects}
            </h2>
            <Search
              placeholder={CurriculumPlanning.SearchPlaceholder}
              onSearchChange={setSearchTitle}
            />

            {visibleCourses.length === 0 ? (
              <Notification
                message={CurriculumPlanning.NoCoursesNotification}
              />
            ) : (
              <div className={styles.planning__table_scroll}>
                <CourseTable
                  courses={visibleCourses}
                  renderAction={(course: CourseResponse) => (
                    <button
                      type="button"
                      className={styles.planning__add_btn}
                      onClick={() => startAddCourse(course)}
                      aria-label={CurriculumPlanning.AddToPlan}
                    >
                      +
                    </button>
                  )}
                />
              </div>
            )}
          </div>

          <div className={styles.planning__content}>
            <h2 className={styles.planning__section_title}>
              {CurriculumPlanning.Modules}
            </h2>
            {modules.length === 0 ? (
              <Notification
                message={CurriculumPlanning.NoModulesNotification}
              />
            ) : (
              <table className={styles.module__table}>
                <thead>
                  <tr>
                    <th className={styles.column__title}></th>
                    <th className={styles.column__credits}>
                      {CurriculumPlanning.Credits}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {modules.map((module) => (
                    <tr key={module.externalId} className={styles.module__row}>
                      <td className={styles.column__title}>{module.title}</td>
                      <td className={styles.column__credits}>
                        {moduleCredits.get(module.externalId) ?? 0} /{" "}
                        {(module.requiredCredits ?? 0) +
                          (module.optionalCredits ?? 0)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </div>

      {totalRequiredCredits > 0 && (
        <footer className={styles.planning__footer}>
          <span>{CurriculumPlanning.CurriculumCompletion}</span>
          <span className={styles.planning__completion_badge}>
            {Math.round((totalCredits / totalRequiredCredits) * 100)}%
          </span>
          <span>
            {totalCredits}/{totalRequiredCredits} {CurriculumPlanning.Credits}
          </span>
        </footer>
      )}

      {addingCourse && (
        <CourseAddModal
          course={addingCourse}
          semesters={availableSemestersFor(addingCourse)}
          onClose={confirmAddCourse}
        />
      )}
    </section>
  );
}
