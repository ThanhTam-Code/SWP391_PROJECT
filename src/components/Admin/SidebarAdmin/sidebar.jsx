<<<<<<< HEAD
import { useLocation } from "react-router-dom";
=======
"use client";

import { useLocation, useNavigate } from "react-router-dom";
>>>>>>> a683d0ebb9d49b994cca7e2606bdcf30f58a48eb
import {
  LayoutDashboard,
  ListChecks,
  ClipboardList,
  Calendar,
  Contact,
  FileText,
  LogOut,
  MessageCircleWarning,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Xóa token và thông tin user từ localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Chuyển hướng về trang home
    navigate('/');
  };

  const mainNav = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin/home" },
    { name: "Services", icon: ListChecks, path: "/admin/services" },
    { name: "Order Lists", icon: ClipboardList, path: "/admin/orderlists" },
    { name: "Feedback", icon: MessageCircleWarning, path: "/admin/feedback" },
  ];

  const pages = [
    { name: "Calendar", icon: Calendar, path: "/admin/calendar" },
    { name: "Contact", icon: Contact, path: "/admin/contact" },
    { name: "Invoice", icon: FileText, path: "/admin/invoice" },
    { 
      name: "Logout", 
      icon: LogOut, 
      path: "/",
      onClick: handleLogout 
    },
  ];

  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200 p-4 flex flex-col">
      {/* Logo - Updated to link to dashboard */}
      <Link
        to="/admin/home"
        className="flex items-center text-pink-700 font-bold text-xl uppercase"
      >
        <img
          src="/home/logo/logo.webp"
          alt="Beauty Logo"
          className="h-10 mr-2"
        />
        BEAUTYA
      </Link>

      {/* Main Navigation */}
      <nav className="flex flex-col gap-1 mt-8">
        {mainNav.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              to={item.path}
              key={item.name}
              className={`flex items-center w-full p-2 text-sm rounded-lg transition-all duration-300 ease-in-out hover:bg-pink-100 hover:text-pink-700 hover:scale-105 ${
                location.pathname === item.path
                  ? "bg-pink-50 text-pink-700 font-semibold scale-[1.08] shadow-md shadow-pink-700/15"
                  : "text-gray-600"
              }`}
            >
              <Icon className="w-5 h-5 mr-3 transition-transform duration-200 ease-in-out hover:rotate-10" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Pages Section */}
      <div className="mt-8">
        <h2 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          PAGES
        </h2>
        <nav className="flex flex-col gap-1">
          {pages.map((item) => {
            const Icon = item.icon;
            return item.name === "Logout" ? (
              <button
                key={item.name}
                onClick={item.onClick}
                className={`sidebar-link w-full text-left ${
                  location.pathname === item.path ? "active" : ""
                }`}
              >
                <Icon className="sidebar-icon" />
                {item.name}
              </button>
            ) : (
              <Link
                to={item.path}
                key={item.name}
                className={`flex items-center w-full p-2 text-sm rounded-lg transition-all duration-300 ease-in-out hover:bg-pink-100 hover:text-pink-700 hover:scale-105 ${
                  location.pathname === item.path
                    ? "bg-pink-50 text-pink-700 font-semibold scale-[1.08] shadow-md shadow-pink-700/15"
                    : "text-gray-600"
                }`}
              >
                <Icon className="w-5 h-5 mr-3 transition-transform duration-200 ease-in-out group-hover:rotate-10" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
