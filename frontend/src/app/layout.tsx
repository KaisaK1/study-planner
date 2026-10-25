import "./globals.css";
import { LocaleProvider } from "@/hooks";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="et">
      <body>
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
