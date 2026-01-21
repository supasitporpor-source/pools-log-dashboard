import { useState, useEffect, useCallback } from 'react';
import { ProductLog, ApiResponse, LogStats } from '@/types';

// const API_URL = 'https://your-vercel-domain.vercel.app/api/product-logs';
const API_URL = '/api/product-logs'; // จะใช้ mock API ก่อน

export const useProductLogs = () => {
  const [logs, setLogs] = useState<ProductLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchLogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(API_URL);
      const result: ApiResponse = await response.json();
      
      if (result.success) {
        setLogs(result.data);
        setLastUpdate(new Date());
      } else {
        throw new Error('API returned success: false');
      }
    } catch (err) {
      console.error('Error fetching logs:', err);
      setError('ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setLoading(false);
    }
  }, []);

  const calculateStats = useCallback((): LogStats => {
    const stats: LogStats = {
      success: 0,
      failed: 0,
      running: 0,
      total: logs.length
    };

    logs.forEach(log => {
      const status = log.status.toLowerCase();
      if (status === 'success') {
        stats.success++;
      } else if (status === 'failed') {
        stats.failed++;
      } else if (status === 'running') {
        stats.running++;
      }
    });

    return stats;
  }, [logs]);

  useEffect(() => {
    fetchLogs();
    
    // Auto refresh every 30 seconds
    const interval = setInterval(fetchLogs, 30000);
    
    return () => clearInterval(interval);
  }, [fetchLogs]);

  return {
    logs,
    loading,
    error,
    lastUpdate,
    stats: calculateStats(),
    refetch: fetchLogs
  };
};