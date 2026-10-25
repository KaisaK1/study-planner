"use client";

import { PlaceholderPage } from "@/components";
import { useTranslations } from "@/hooks";

export default function SettingsPage() {
  const { Settings } = useTranslations();
  return <PlaceholderPage title={Settings.Title} />;
}
