"use client";

import { PlaceholderPage } from "@/components";
import { useTranslations } from "@/hooks";

export default function StudiesPage() {
  const { Schedule } = useTranslations();
  return <PlaceholderPage title={Schedule.Title} />;
}
