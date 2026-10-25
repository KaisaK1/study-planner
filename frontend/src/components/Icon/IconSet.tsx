import {
  BookOpen,
  CalendarDays,
  ChartColumn,
  Gauge,
  Settings,
} from "lucide-react";

export const ICON_SET = {
  dashboard: Gauge,
  studies: BookOpen,
  curriculums: CalendarDays,
  schedule: ChartColumn,
  settings: Settings,
} as const;

export type IconName = keyof typeof ICON_SET;
