import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"; // Path to sidebar components
import { AppSidebar } from "./SideBar.jsx"; // Path to your sidebar component

// Layout component jo sidebar aur content ko combine karega
const Layout = ({ children }) => {
  return (
    <SidebarProvider>  {/* SidebarProvider wrap karega */}
      <div className="flex">
        {/* Sidebar Component */}
        <AppSidebar />  {/* Yeh tumhara actual sidebar hai jo menu aur items show karega */}

        {/* Main Content Area */}
        <main className="flex-1 p-4">
          {/* Sidebar Toggle Button */}
          <SidebarTrigger className="p-2 bg-blue-500 text-white rounded mb-4" />  {/* Ye button sidebar ko toggle karega */}
          
          {/* Page-specific content */}
          {children}  {/* Yeh tumhara dynamic content hoga jo routes ya pages ke hisaab se change karega */}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
