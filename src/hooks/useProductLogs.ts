import { useState, useEffect, useCallback } from 'react';
import { ProductLog, ApiResponse, LogStats } from '@/types';

const API_URL = '/api/proxy/product-logs'; // ใช้ proxy แทน

// Fallback data จาก API จริง (ข้อมูลล่าสุด)
const FALLBACK_DATA: ProductLog[] = [
  {
    id: 438262,
    product_pool_data_generation_job_id: 8019,
    status: "successful",
    description: "remaking product_pool_dates",
    detail: null,
    started_at: "2026-01-22T01:16:55.000Z",
    ended_at: "2026-01-22T01:17:38.000Z",
    time_used: "43.63200"
  },
  {
    id: 438261,
    product_pool_data_generation_job_id: 8019,
    status: "successful",
    description: "putting tourwow_config to product_pools",
    detail: null,
    started_at: "2026-01-22T01:15:06.000Z",
    ended_at: "2026-01-22T01:16:55.000Z",
    time_used: "108.05070"
  },
  {
    id: 438260,
    product_pool_data_generation_job_id: 8019,
    status: "successful",
    description: "putting config_product_pools with condition to product_pools",
    detail: null,
    started_at: "2026-01-22T01:15:05.000Z",
    ended_at: "2026-01-22T01:15:06.000Z",
    time_used: "1.81674"
  },
  {
    id: 438259,
    product_pool_data_generation_job_id: 8019,
    status: "successful",
    description: "copying temp_external_product_periods to external_product_periods",
    detail: null,
    started_at: "2026-01-22T01:15:03.000Z",
    ended_at: "2026-01-22T01:15:05.000Z",
    time_used: "2.10339"
  },
  {
    id: 438258,
    product_pool_data_generation_job_id: 8019,
    status: "successful",
    description: "copying temp_product_pools to product_pools",
    detail: null,
    started_at: "2026-01-22T01:14:59.000Z",
    ended_at: "2026-01-22T01:15:03.000Z",
    time_used: "3.10856"
  },
  {
    id: 438257,
    product_pool_data_generation_job_id: 8019,
    status: "successful",
    description: "putting temp_product_periods with product_has_active_periods = 0 to last",
    detail: null,
    started_at: "2026-01-22T01:14:59.000Z",
    ended_at: "2026-01-22T01:14:59.000Z",
    time_used: "0.79628"
  },
  {
    id: 438256,
    product_pool_data_generation_job_id: 8019,
    status: "successful",
    description: "integrating external_product_periods into temp_product_pools",
    detail: null,
    started_at: "2026-01-22T01:14:45.000Z",
    ended_at: "2026-01-22T01:14:59.000Z",
    time_used: "13.40674"
  },
  {
    id: 438255,
    product_pool_data_generation_job_id: 8019,
    status: "successful",
    description: "Compute external product period.",
    detail: null,
    started_at: "2026-01-22T01:14:41.000Z",
    ended_at: "2026-01-22T01:14:45.000Z",
    time_used: "4.22834"
  },
  {
    id: 438254,
    product_pool_data_generation_job_id: 8019,
    status: "successful",
    description: "Collecting external_product_periods from: best_indo (series 121)",
    detail: null,
    started_at: "2026-01-22T01:14:41.000Z",
    ended_at: "2026-01-22T01:14:41.000Z",
    time_used: "0.19279"
  },
  {
    id: 438253,
    product_pool_data_generation_job_id: 8019,
    status: "successful",
    description: "Collecting external_product_periods from: best_indo (series 117)",
    detail: null,
    started_at: "2026-01-22T01:14:41.000Z",
    ended_at: "2026-01-22T01:14:41.000Z",
    time_used: "0.09072"
  }
];

export const useProductLogs = () => {
  const [logs, setLogs] = useState<ProductLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchLogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching from proxy API:', API_URL);
      
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        cache: 'no-store',
      });
      
      console.log('Proxy response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiResponse = await response.json();
      console.log('Proxy API Response:', result);
      
      if (result.success && Array.isArray(result.data)) {
        console.log('Using live API data via proxy, count:', result.data.length);
        setLogs(result.data);
        setLastUpdate(new Date());
        setError(null); // Clear any previous errors
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (err) {
      console.warn('Proxy API failed, using fallback data:', err);
      // Use fallback data when proxy fails
      setLogs(FALLBACK_DATA);
      setLastUpdate(new Date());
      setError('ใช้ข้อมูลสำรอง - ไม่สามารถเชื่อมต่อ API ได้');
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
      if (status === 'successful' || status === 'success') {
        stats.success++;
      } else if (status === 'failed' || status === 'failure') {
        stats.failed++;
      } else if (status === 'running' || status === 'processing') {
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