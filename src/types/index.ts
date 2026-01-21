export interface ProductLog {
  id: number;
  product_pool_data_generation_job_id: number;
  status: string;
  description: string;
  detail: any | null;
  started_at: string; // ISO date string
  ended_at: string; // ISO date string
  time_used: string; // decimal as string
}

export interface ApiResponse {
  success: boolean;
  data: ProductLog[];
  count: number;
}

export interface LogStats {
  success: number;
  failed: number;
  running: number;
  total: number;
}