'use client';

import React from 'react';
import { useProductLogs } from '@/hooks/useProductLogs';
import SystemStatusAlert from '@/components/SystemStatusAlert';

const PoolsLogPage: React.FC = () => {
  const { logs, loading, error, lastUpdate, stats, refetch } = useProductLogs();

  const formatLastUpdate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleString('th-TH', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString('th-TH', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'successful':
      case 'success':
        return 'bg-green-500';
      case 'failed':
      case 'failure':
        return 'bg-red-500';
      case 'running':
      case 'processing':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pools-log</h1>
          <p className="text-gray-600 mt-1">Product Pool Data Generation Logs</p>
        </div>
        <div className="flex items-center space-x-4">
          {lastUpdate && (
            <span className="text-sm text-gray-500">
              อัปเดตล่าสุด: {formatLastUpdate(lastUpdate)}
            </span>
          )}
          <button 
            onClick={refetch}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
          >
            <i className={`fas fa-sync-alt mr-2 ${loading ? 'animate-spin' : ''}`}></i>
            รีเฟรช
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">ทั้งหมด</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <i className="fas fa-list text-blue-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">สำเร็จ</p>
              <p className="text-3xl font-bold text-green-600">{stats.success}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <i className="fas fa-check-circle text-green-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">ล้มเหลว</p>
              <p className="text-3xl font-bold text-red-600">{stats.failed}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <i className="fas fa-times-circle text-red-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">กำลังดำเนินการ</p>
              <p className="text-3xl font-bold text-yellow-600">{stats.running}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <i className="fas fa-clock text-yellow-600 text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* System Status Alert */}
      <SystemStatusAlert logs={logs} />

      {/* Error State */}
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <i className="fas fa-exclamation-triangle text-yellow-600 mr-3"></i>
            <div>
              <h3 className="text-yellow-800 font-medium">แจ้งเตือน</h3>
              <p className="text-yellow-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <i className="fas fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
          <p className="text-gray-600">กำลังโหลดข้อมูล...</p>
        </div>
      )}

      {/* Logs Grid */}
      {!loading && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">รายการล่าสุด</h2>
            <p className="text-gray-600 text-sm mt-1">แสดง {logs.length} รายการล่าสุด</p>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {logs.map((log) => (
                <div key={log.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(log.status)} mr-3`}></div>
                        <span className="text-sm font-medium text-gray-900">
                          Job #{log.product_pool_data_generation_job_id}
                        </span>
                        <span className="text-xs text-gray-500 ml-2">ID: {log.id}</span>
                      </div>
                      
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {log.description}
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <i className="fas fa-play text-green-500 mr-2"></i>
                          <span>เริ่ม: {formatDateTime(log.started_at)}</span>
                        </div>
                        <div className="flex items-center">
                          <i className="fas fa-stop text-red-500 mr-2"></i>
                          <span>สิ้นสุด: {formatDateTime(log.ended_at)}</span>
                        </div>
                        <div className="flex items-center">
                          <i className="fas fa-clock text-blue-500 mr-2"></i>
                          <span>ใช้เวลา: {parseFloat(log.time_used).toFixed(2)}s</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        log.status.toLowerCase() === 'successful' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {log.status.toLowerCase() === 'successful' ? 'สำเร็จ' : log.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PoolsLogPage;