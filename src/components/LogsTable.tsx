import React, { useState } from 'react';
import { ProductLog } from '@/types';

interface LogsTableProps {
  logs: ProductLog[];
}

const LogsTable: React.FC<LogsTableProps> = ({ logs }) => {
  const [selectedDetail, setSelectedDetail] = useState<any>(null);

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { class: string; icon: string; text: string }> = {
      'successful': { class: 'bg-green-100 text-green-800', icon: 'fa-check-circle', text: 'สำเร็จ' },
      'success': { class: 'bg-green-100 text-green-800', icon: 'fa-check-circle', text: 'สำเร็จ' },
      'failed': { class: 'bg-red-100 text-red-800', icon: 'fa-times-circle', text: 'ล้มเหลว' },
      'failure': { class: 'bg-red-100 text-red-800', icon: 'fa-times-circle', text: 'ล้มเหลว' },
      'running': { class: 'bg-yellow-100 text-yellow-800', icon: 'fa-clock', text: 'กำลังดำเนินการ' },
      'processing': { class: 'bg-yellow-100 text-yellow-800', icon: 'fa-clock', text: 'กำลังดำเนินการ' },
      'pending': { class: 'bg-gray-100 text-gray-800', icon: 'fa-hourglass-half', text: 'รอดำเนินการ' }
    };

    const config = statusConfig[status.toLowerCase()] || statusConfig['pending'];
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.class}`}>
        <i className={`fas ${config.icon} mr-1`}></i>
        {config.text}
      </span>
    );
  };

  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString('th-TH', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const showDetail = (detail: any) => {
    setSelectedDetail(detail);
  };

  const closeModal = () => {
    setSelectedDetail(null);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Pools-log (10 รายการล่าสุด)</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">สถานะ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">คำอธิบาย</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">เวลาเริ่ม</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">เวลาสิ้นสุด</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ใช้เวลา</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">รายละเอียด</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{log.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.product_pool_data_generation_job_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(log.status)}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate" title={log.description}>{log.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDateTime(log.started_at)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDateTime(log.ended_at)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{parseFloat(log.time_used).toFixed(2)} วินาที</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.detail ? (
                      <button 
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => showDetail(log.detail)}
                      >
                        <i className="fas fa-eye"></i> ดู
                      </button>
                    ) : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedDetail && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">รายละเอียด</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96 text-sm">
              {JSON.stringify(selectedDetail, null, 2)}
            </pre>
            <div className="flex justify-end mt-4">
              <button 
                onClick={closeModal}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogsTable;