import { useAuth } from "@/contexts/AuthContext";
import { Separator } from "@/ui/components/shadcn/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/ui/components/shadcn/sidebar";
import { IdCardLanyard, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router";

const AppSidebar = () => {
  const { pathname } = useLocation();

  const isRouteActive = (route: string, exact = false) =>
    exact ? pathname === route : pathname.startsWith(route);

  const { logout } = useAuth();

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel className="rounded-none flex flex-col items-center h-auto gap-6 mt-4 mb-4">
            <div className="flex flex-col gap-2 items-center select-none">
              <img
                src="./src/assets/logo.svg"
                width={30}
                height={30}
                alt="Logo"
              />
              <span className="text-base text-[#8F95FD] font-bold">
                Employee Vision Hub
              </span>
            </div>
            <Separator orientation="horizontal" className="" />
          </SidebarGroupLabel>
        </SidebarGroup>
      </SidebarHeader>
      <SidebarContent className="px-4">
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem key="employees">
              <SidebarMenuButton asChild isActive={isRouteActive("/", true)}>
                <Link to="/" className="h-10 py-6 flex items-center">
                  <IdCardLanyard width={20} height={20} />
                  <span>Employees</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>
      <SidebarFooter className="px-4">
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem key="logout">
              <SidebarMenuButton
                asChild
                className="transition-colors ease-in delay-50"
                onClick={logout}
              >
                <div className="h-10 py-6 cursor-pointer">
                  <LogOut width={20} height={20} />
                  <span>Logout</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
