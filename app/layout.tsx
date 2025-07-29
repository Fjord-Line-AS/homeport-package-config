// app/layout.tsx
import type React from "react";
import { Sidebar } from "@/components/admin/sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { SanityLive } from "@/lib/sanity/live";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export const metadata = {
  title: "Package Configuration",
  description: "Admin layout",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-[family-name:var(--font-geist-sans)] from-brand-seashell-50 via-white to-brand-seashell-100">
        <SidebarProvider>
          <Toaster />
          <SanityLive />
          <div className="flex min-h-screen w-full">
            <Sidebar />
            <SidebarInset className="flex-1">
              <main className="flex-1 px-4 from-brand-seashell-50 via-white to-brand-seashell-100">
                {children}
              </main>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
