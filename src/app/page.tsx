'use client';

import React from 'react';
import Layout from '@/components/Layout';

export default function Home() {
  return (
    <Layout>
      <div className="p-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white p-8 mb-6">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold mb-4">ยินดีต้อนรับสู่ TourWow Admin</h1>
            <p className="text-xl opacity-90 mb-6">
              ระบบจัดการและติดตามข้อมูล Product Pool Generation
            </p>
            <div className="flex space-x-4">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                <i className="fas fa-chart-line mr-2"></i>
                ดู Analytics
              </button>
              <button className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors">
                <i className="fas fa-list-alt mr-2"></i>
                ดู Pools-log
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
                <p className="text-xs text-green-600 mt-1">
                  <i className="fas fa-arrow-up mr-1"></i>
                  +12% จากเมื่อวาน
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <i className="fas fa-tasks text-blue-600 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">98.5%</p>
                <p className="text-xs text-green-600 mt-1">
                  <i className="fas fa-arrow-up mr-1"></i>
                  +2.1% จากสัปดาห์ที่แล้ว
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <i className="fas fa-check-circle text-green-600 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Processing Time</p>
                <p className="text-2xl font-bold text-gray-900">45.2s</p>
                <p className="text-xs text-red-600 mt-1">
                  <i className="fas fa-arrow-down mr-1"></i>
                  -8.3% จากเดือนที่แล้ว
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <i className="fas fa-clock text-yellow-600 text-xl"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* System Status */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">System Status</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-green-500 w-3 h-3 rounded-full mr-3"></div>
                  <span className="text-gray-900">API Server</span>
                </div>
                <span className="text-green-600 text-sm font-medium">Online</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-green-500 w-3 h-3 rounded-full mr-3"></div>
                  <span className="text-gray-900">Database</span>
                </div>
                <span className="text-green-600 text-sm font-medium">Connected</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-yellow-500 w-3 h-3 rounded-full mr-3"></div>
                  <span className="text-gray-900">Background Jobs</span>
                </div>
                <span className="text-yellow-600 text-sm font-medium">Processing</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-green-500 w-3 h-3 rounded-full mr-3"></div>
                  <span className="text-gray-900">Storage</span>
                </div>
                <span className="text-green-600 text-sm font-medium">85% Available</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-6 space-y-3">
              <button className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <div className="flex items-center">
                  <i className="fas fa-list-alt text-blue-600 mr-3"></i>
                  <span className="text-gray-900">ดู Pools-log</span>
                </div>
                <i className="fas fa-chevron-right text-gray-400"></i>
              </button>
              <button className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <div className="flex items-center">
                  <i className="fas fa-chart-bar text-green-600 mr-3"></i>
                  <span className="text-gray-900">Analytics Dashboard</span>
                </div>
                <i className="fas fa-chevron-right text-gray-400"></i>
              </button>
              <button className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <div className="flex items-center">
                  <i className="fas fa-cog text-purple-600 mr-3"></i>
                  <span className="text-gray-900">System Settings</span>
                </div>
                <i className="fas fa-chevron-right text-gray-400"></i>
              </button>
              <button className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <div className="flex items-center">
                  <i className="fas fa-download text-orange-600 mr-3"></i>
                  <span className="text-gray-900">Export Data</span>
                </div>
                <i className="fas fa-chevron-right text-gray-400"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}