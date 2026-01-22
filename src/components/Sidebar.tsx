'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      name: 'Dashboard',
      href: '/',
      icon: 'fa-home',
      active: pathname === '/'
    },
    {
      name: 'Pools-log',
      href: '/pools-log',
      icon: 'fa-list-alt',
      active: pathname === '/pools-log'
    },
    {
      name: 'Analytics',
      href: '/analytics',
      icon: 'fa-chart-bar',
      active: pathname === '/analytics'
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: 'fa-cog',
      active: pathname === '/settings'
    }
  ];

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-4 relative flex flex-col">
      {/* Logo */}
      <div className="flex items-center mb-8">
        <div className="bg-blue-600 p-2 rounded-lg mr-3">
          <i className="fas fa-database text-xl"></i>
        </div>
        <div>
          <h1 className="text-xl font-bold">TourWow</h1>
          <p className="text-gray-400 text-sm">Admin Panel</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
              item.active
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <i className={`fas ${item.icon} mr-3`}></i>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Footer - ลบออก */}
      {/* <div className="mt-auto">
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="flex items-center">
            <div className="bg-green-500 w-2 h-2 rounded-full mr-2"></div>
            <span className="text-sm text-gray-300">System Online</span>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Sidebar;