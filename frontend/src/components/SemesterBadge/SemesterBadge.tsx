import { CourseResponse } from "@/client";
import styles from "./SemesterBadge.module.css";

const SEMESTER_MAP: Record<
  CourseResponse.semesterType,
  { label: string; color: string }
> = {
  [CourseResponse.semesterType.SPRING]: { label: "K", color: "#85DC75" },
  [CourseResponse.semesterType.AUTUMN]: { label: "S", color: "#CAE0FF" },
};

export function SemesterBadge({
  semester,
}: Readonly<{
  semester: CourseResponse.semesterType;
}>) {
  const badge = SEMESTER_MAP[semester];

  return (
    <span className={styles.badge} style={{ backgroundColor: badge.color }}>
      {badge.label}
    </span>
  );
}
