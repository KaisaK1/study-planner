"use client";

import { PlaceholderPage } from "@/components";
import { useTranslations } from "@/hooks";

export default function StudiesPage() {
  const { Dashboard } = useTranslations();
  return <PlaceholderPage title={Dashboard.Title} />;
}
