import React from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { RequireAuth } from "react-auth-kit";
import Sidebar from "../../components/sideBar/sideBar";
import "./dashboardContainer.css";

export default function DashboardContainer() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <>
      <Sidebar setIsSidebarOpen={setIsSidebarOpen} />
      <div
        className={`${
          isSidebarOpen ? "sidebar-open-content" : "sidebar-closed-content"
        }`}
      >
        <RequireAuth loginPath="/login">
          <Outlet />
        </RequireAuth>
      </div>
    </>
  );
}
