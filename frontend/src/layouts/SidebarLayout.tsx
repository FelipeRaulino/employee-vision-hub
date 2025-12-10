import AppSidebar from "@/components/AppSidebar";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/ui/components/shadcn/sidebar";
import { Outlet } from "react-router";

const SidebarLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />

        <main className="flex-1 relative bg-[#EDEEF7] w-full">
          <SidebarTrigger className="absolute top-4 left-4 hover:bg-transparent cursor-pointer hover:text-primary" />

          <div className="py-8 px-5.5">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default SidebarLayout;
