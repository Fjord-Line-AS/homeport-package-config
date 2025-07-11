import type React from "react";
import { Sidebar } from "@/components/admin/sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { SanityLive } from "@/lib/sanity/live";
import { Toaster } from "@/components/ui/sonner";
import "../globals.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Toaster />
      <SanityLive />
      <div className="flex min-h-screen w-full">
        <Sidebar />
        <SidebarInset className="flex-1">
          <main className="flex-1 px-4 ">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
