"use client";

import { Package, Settings, Users, Ship } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar as SidebarPrimitive,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

const navigation = [
  {
    title: "Package Management",
    items: [
      {
        title: "Package Rules",
        href: "/admin/package-rules",
        icon: Package,
      },
    ],
  },
  {
    title: "Reference Data",
    items: [
      {
        title: "Ports",
        href: "/admin/ports",
        icon: Ship,
      },
      {
        title: "Vessels",
        href: "/admin/vessels",
        icon: Ship,
      },
      {
        title: "Accommodations",
        href: "/admin/accommodations",
        icon: Users,
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        title: "Settings",
        href: "/admin/settings",
        icon: Settings,
      },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <SidebarPrimitive>
      <SidebarHeader className="border-b p-4">
        <h2 className="text-lg font-semibold">Package Admin</h2>
      </SidebarHeader>
      <SidebarContent>
        {navigation.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                    >
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </SidebarPrimitive>
  );
}
