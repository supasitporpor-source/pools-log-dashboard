'use client';

import React, { useState } from 'react';

const ApiTest: React.FC = () => {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testApi = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      console.log('Testing API...');
      
      // Simple fetch without extra options first
      const response = await fetch('https://por-vibecode.vercel.app/api/product-logs');

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      setResult(data);
    } catch (err) {
      console.error('API Error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-lg font-semibold mb-4">API Test</h2>
      
      <button 
        onClick={testApi}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg mb-4"
      >
        {loading ? 'Testing...' : 'Test API'}
      </button>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded p-4 mb-4">
          <h3 className="text-red-800 font-medium">Error:</h3>
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {result && (
        <div className="bg-green-50 border border-green-200 rounded p-4">
          <h3 className="text-green-800 font-medium mb-2">Success!</h3>
          <p className="text-sm text-gray-600 mb-2">
            Found {result.count} records, success: {result.success ? 'true' : 'false'}
          </p>
          <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto max-h-40">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ApiTest;