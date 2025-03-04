"use client";

import { useState } from "react";
import { Search, Plus, MoreHorizontal } from "lucide-react";
import { AddStaffModal } from "./AddStaffModal";

const staff = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: "Massage Therapist",
    specialties: ["Deep Tissue", "Swedish", "Sports"],
    status: "available",
    appointments: 24,
  },
  {
    id: "2",
    name: "David Wilson",
    email: "david.wilson@example.com",
    role: "Massage Therapist",
    specialties: ["Hot Stone", "Aromatherapy"],
    status: "busy",
    appointments: 18,
  },
  {
    id: "3",
    name: "Lisa Martinez",
    email: "lisa.martinez@example.com",
    role: "Esthetician",
    specialties: ["Facials", "Skin Care"],
    status: "available",
    appointments: 15,
  },
  {
    id: "4",
    name: "Robert Brown",
    email: "robert.brown@example.com",
    role: "Massage Therapist",
    specialties: ["Swedish", "Reflexology"],
    status: "off-duty",
    appointments: 12,
  },
  {
    id: "5",
    name: "Jennifer Lee",
    email: "jennifer.lee@example.com",
    role: "Nail Technician",
    specialties: ["Manicure", "Pedicure"],
    status: "available",
    appointments: 20,
  },
];

export function StaffList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);

  const filteredStaff = staff.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.specialties.some((s) =>
        s.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-teal-100 text-teal-800";
      case "busy":
        return "bg-amber-100 text-amber-800";
      case "off-duty":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Staff</h2>
            <p className="mt-1 text-sm text-gray-600">Manage your spa staff</p>
          </div>
          <button
            className="px-4 py-2 text-white bg-pink-500 rounded-md flex items-center hover:bg-pink-600 transition-colors duration-300"
            onClick={() => setIsAddStaffModalOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Staff
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search staff..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Specialties
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Appointments
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStaff.map((member) => (
                <tr
                  key={member.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-800 text-sm font-medium">
                        {getInitials(member.name)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {member.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {member.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {member.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {member.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-gray-700 bg-gray-50"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        member.status
                      )}`}
                    >
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {member.appointments} this month
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setDropdownOpen(
                            dropdownOpen === member.id ? null : member.id
                          )
                        }
                        className="text-gray-400 hover:text-gray-600 focus:outline-none"
                      >
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                      {dropdownOpen === member.id && (
                        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                          <div className="py-1" role="menu">
                            <button
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              role="menuitem"
                            >
                              View Profile
                            </button>
                            <button
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              role="menuitem"
                            >
                              Edit Staff
                            </button>
                            <button
                              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                              role="menuitem"
                            >
                              Remove Staff
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddStaffModal
        isOpen={isAddStaffModalOpen}
        onClose={() => setIsAddStaffModalOpen(false)}
      />
    </div>
  );
}
