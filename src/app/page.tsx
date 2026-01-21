'use client';

import React from 'react';
import StatsCard from '@/components/StatsCard';
import LogsTable from '@/components/LogsTable';
import { useProductLogs } from '@/hooks/useProductLogs';

export default function Home() {
  const { logs, loading, error, lastUpdate, stats, refetch } = useProductLogs();

  const formatLastUpdate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleString('th-TH', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <i className="fas fa-chart-line text-blue-600 text-2xl mr-3"></i>
              <h1 className="text-2xl font-bold text-gray-900">Pools-log</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                {lastUpdate && `อัปเดตล่าสุด: ${formatLastUpdate(lastUpdate)}`}
              </span>
              <button 
                onClick={refetch}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <i className="fas fa-sync-alt mr-2"></i>รีเฟรช
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="สำเร็จ"
            count={stats.success}
            icon="fa-check-circle"
            bgColor="bg-green-100"
            iconColor="text-green-600"
          />
          <StatsCard
            title="ล้มเหลว"
            count={stats.failed}
            icon="fa-times-circle"
            bgColor="bg-red-100"
            iconColor="text-red-600"
          />
          <StatsCard
            title="กำลังดำเนินการ"
            count={stats.running}
            icon="fa-clock"
            bgColor="bg-yellow-100"
            iconColor="text-yellow-600"
          />
          <StatsCard
            title="ทั้งหมด"
            count={stats.total}
            icon="fa-list"
            bgColor="bg-blue-100"
            iconColor="text-blue-600"
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <i className="fas fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
            <p className="text-gray-600">กำลังโหลดข้อมูล...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <div className="flex items-center">
              <i className="fas fa-exclamation-triangle text-red-600 mr-3"></i>
              <div>
                <h3 className="text-red-800 font-medium">เกิดข้อผิดพลาด</h3>
                <p className="text-red-600 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Logs Table */}
        {!loading && !error && <LogsTable logs={logs} />}
      </main>
    </div>
  );
}