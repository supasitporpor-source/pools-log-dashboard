import { NextResponse } from 'next/server';
import { ProductLog, ApiResponse } from '@/types';

// Mock data สำหรับทดสอบ
const mockLogs: ProductLog[] = [
  {
    id: 1,
    product_pool_data_generation_job_id: 12345,
    status: 'success',
    description: 'Product data generation completed successfully',
    detail: {
      products_generated: 150,
      categories: ['electronics', 'clothing'],
      processing_time: '2.5 minutes'
    },
    started_at: '2024-01-21T10:00:00Z',
    ended_at: '2024-01-21T10:02:30Z',
    time_used: '150.50'
  },
  {
    id: 2,
    product_pool_data_generation_job_id: 12346,
    status: 'failed',
    description: 'Database connection timeout',
    detail: {
      error_code: 'DB_TIMEOUT',
      retry_count: 3,
      last_error: 'Connection timeout after 30 seconds'
    },
    started_at: '2024-01-21T10:05:00Z',
    ended_at: '2024-01-21T10:05:35Z',
    time_used: '35.20'
  },
  {
    id: 3,
    product_pool_data_generation_job_id: 12347,
    status: 'running',
    description: 'Processing product images and descriptions',
    detail: {
      progress: '65%',
      current_step: 'image_processing',
      estimated_completion: '2024-01-21T10:15:00Z'
    },
    started_at: '2024-01-21T10:10:00Z',
    ended_at: '2024-01-21T10:15:00Z',
    time_used: '0.00'
  },
  {
    id: 4,
    product_pool_data_generation_job_id: 12348,
    status: 'success',
    description: 'Bulk product import from CSV completed',
    detail: {
      imported_products: 500,
      skipped_duplicates: 25,
      validation_errors: 0
    },
    started_at: '2024-01-21T09:45:00Z',
    ended_at: '2024-01-21T09:50:15Z',
    time_used: '315.75'
  },
  {
    id: 5,
    product_pool_data_generation_job_id: 12349,
    status: 'success',
    description: 'Product price optimization completed',
    detail: {
      products_updated: 200,
      average_price_change: '+5.2%',
      profit_margin_improved: true
    },
    started_at: '2024-01-21T09:30:00Z',
    ended_at: '2024-01-21T09:35:45Z',
    time_used: '345.80'
  },
  {
    id: 6,
    product_pool_data_generation_job_id: 12350,
    status: 'failed',
    description: 'API rate limit exceeded',
    detail: {
      error_code: 'RATE_LIMIT',
      requests_made: 1000,
      limit_reset_time: '2024-01-21T11:00:00Z'
    },
    started_at: '2024-01-21T09:20:00Z',
    ended_at: '2024-01-21T09:20:05Z',
    time_used: '5.10'
  },
  {
    id: 7,
    product_pool_data_generation_job_id: 12351,
    status: 'running',
    description: 'Generating product recommendations',
    detail: {
      progress: '30%',
      current_step: 'analyzing_user_behavior',
      products_processed: 75
    },
    started_at: '2024-01-21T09:15:00Z',
    ended_at: '2024-01-21T09:25:00Z',
    time_used: '0.00'
  },
  {
    id: 8,
    product_pool_data_generation_job_id: 12352,
    status: 'success',
    description: 'Product category classification completed',
    detail: {
      products_classified: 300,
      new_categories_created: 5,
      accuracy_score: 0.95
    },
    started_at: '2024-01-21T09:00:00Z',
    ended_at: '2024-01-21T09:08:20Z',
    time_used: '500.25'
  },
  {
    id: 9,
    product_pool_data_generation_job_id: 12353,
    status: 'pending',
    description: 'Waiting for inventory sync to complete',
    detail: null,
    started_at: '2024-01-21T08:55:00Z',
    ended_at: '2024-01-21T08:55:00Z',
    time_used: '0.00'
  },
  {
    id: 10,
    product_pool_data_generation_job_id: 12354,
    status: 'success',
    description: 'Product search index updated',
    detail: {
      indexed_products: 1000,
      search_performance_improvement: '25%',
      index_size: '2.5 MB'
    },
    started_at: '2024-01-21T08:45:00Z',
    ended_at: '2024-01-21T08:47:30Z',
    time_used: '150.00'
  }
];

export async function GET() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const response: ApiResponse = {
      success: true,
      data: mockLogs,
      count: mockLogs.length
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('API Error:', error);
    
    return NextResponse.json(
      {
        success: false,
        data: [],
        count: 0,
        error: 'Internal server error'
      },
      { status: 500 }
    );
  }
}