"use client";

import { PlaceholderPage } from "@/components";
import { useTranslations } from "@/hooks";

export default function StudiesPage() {
  const { Studies } = useTranslations();
  return <PlaceholderPage title={Studies.Title} />;
}
