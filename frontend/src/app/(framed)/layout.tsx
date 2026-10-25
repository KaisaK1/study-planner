import { Layout } from "@/components";
import { ReactNode } from "react";

export default function AppLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <Layout>{children}</Layout>;
}
