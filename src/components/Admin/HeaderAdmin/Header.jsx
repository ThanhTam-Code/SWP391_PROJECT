import { useState } from "react";
import {
  Bell,
  Search,
  ChevronDown,
  User,
  KeyRound,
  History,
  LogOut,
  Settings,
  Calendar,
  UserCircle,
  AlertCircle,
} from "lucide-react";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const closeDropdowns = (e) => {
    if (!e.target.closest(".dropdown-toggle")) {
      setIsDropdownOpen(false);
      setIsNotificationOpen(false);
    }
  };

  return (
    <header
      className="flex items-center justify-between border-b border-gray-200 bg-white px-8 py-2"
      onClick={closeDropdowns}
    >
      <div className="flex-1">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full rounded-lg bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none focus:bg-gray-100"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative">
          <button
            className="dropdown-toggle rounded-md p-2 hover:bg-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              setIsNotificationOpen(!isNotificationOpen);
              setIsDropdownOpen(false);
            }}
          >
            <Bell className="h-5 w-5 text-gray-600" />
          </button>

          {isNotificationOpen && (
            <div className="absolute right-0 top-full z-10 mt-2 w-80 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
              <div className="px-4 py-2">
                <h3 className="font-medium text-gray-900">Notification</h3>
              </div>

              <div className="mt-2 space-y-1">
                <button className="flex w-full items-start gap-3 px-4 py-2 hover:bg-gray-50">
                  <div className="rounded-full bg-blue-100 p-2">
                    <Settings className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-sm text-gray-700">Settings</span>
                    <span className="text-xs text-gray-500">
                      Update Dashboard
                    </span>
                  </div>
                </button>

                <button className="flex w-full items-start gap-3 px-4 py-2 hover:bg-gray-50">
                  <div className="rounded-full bg-pink-100 p-2">
                    <Calendar className="h-4 w-4 text-pink-600" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-sm text-gray-700">Event Update</span>
                    <span className="text-xs text-gray-500">
                      An event date update again
                    </span>
                  </div>
                </button>

                <button className="flex w-full items-start gap-3 px-4 py-2 hover:bg-gray-50">
                  <div className="rounded-full bg-purple-100 p-2">
                    <UserCircle className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-sm text-gray-700">Profile</span>
                    <span className="text-xs text-gray-500">
                      Update your profile
                    </span>
                  </div>
                </button>

                <button className="flex w-full items-start gap-3 px-4 py-2 hover:bg-gray-50">
                  <div className="rounded-full bg-red-100 p-2">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-sm text-gray-700">
                      Application Error
                    </span>
                    <span className="text-xs text-gray-500">
                      Check Your running application
                    </span>
                  </div>
                </button>
              </div>

              <div className="border-t border-gray-100 px-4 py-2 mt-2">
                <button className="text-sm text-blue-600 hover:text-blue-700">
                  See all notification
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            className="dropdown-toggle flex cursor-pointer items-center gap-2 rounded-md p-1 hover:bg-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              setIsDropdownOpen(!isDropdownOpen);
              setIsNotificationOpen(false);
            }}
          >
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium text-gray-900">
                Moni Roy
              </span>
              <span className="text-xs text-gray-500">Admin</span>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 top-full z-10 mt-2 w-56 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
              <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                <User className="h-4 w-4 text-blue-500" />
                Manage Account
              </button>
              <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                <KeyRound className="h-4 w-4 text-blue-500" />
                Change Password
              </button>
              <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                <History className="h-4 w-4 text-blue-500" />
                Activity Log
              </button>
              <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                <LogOut className="h-4 w-4 text-blue-500" />
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
