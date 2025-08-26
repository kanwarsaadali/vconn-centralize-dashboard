'use client';

import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

type CountItem = {
  category: string;
  active?: number;
  disconnected?: number;
  decomissioned?: number;
  pending?: number;
  null?: number;
};

const COLORS: Record<string, string> = {
  active: '#10b981',        // green
  disconnected: '#ef4444',  // red
  decomissioned: '#6b7280', // gray
  pending: '#f59e0b',       // amber
  null: '#3b82f6',          // blue
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length > 0) {
    return (
      <div style={{ background: '#fff', border: '1px solid #ccc', padding: 10 }}>
        {payload.map((entry: any, i: number) => (
          <p key={i} style={{ margin: 0 }}>
            <strong>{entry.name}:</strong> {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const VerticalStackedBarChart = () => {
  const [chartData, setChartData] = useState<CountItem[]>([]);
  const [statusKeys, setStatusKeys] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('http://128.2.99.235/agents-status-by-dept');
        const json = await res.json();

        const data = json.data;

        // Collect all unique status keys (active, disconnected, decomissioned, etc.)
        const keys = Array.from(
          new Set(Object.values(data).flatMap((dept: any) => Object.keys(dept)))
        );
        setStatusKeys(keys);

        const formatted: CountItem[] = Object.keys(data).map((dept) => ({
          category: dept,
          ...keys.reduce((acc: any, key) => {
            acc[key] = data[dept][key] ?? 0;
            return acc;
          }, {}),
        }));

        setChartData(formatted);
      } catch (error) {
        console.error('Error fetching agents by dept:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div
      style={{
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
        border: '1px solid #e5e7eb',
        padding: '20px',
      }}
    >
      <h3
        style={{
          fontSize: '18px',
          fontWeight: 600,
          marginBottom: '16px',
          textAlign: 'center',
        }}
      >
        Agents Status by Department
      </h3>

      <ResponsiveContainer width="100%" height={450}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
        >
          <XAxis
            dataKey="category"
            tick={{ fontSize: 12 }}
            angle={-30}
            textAnchor="end"
          />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={36} />
          {statusKeys.map((key) => (
            <Bar
              key={key}
              dataKey={key}
              name={key.charAt(0).toUpperCase() + key.slice(1)}
              stackId="a"
              fill={COLORS[key] || '#9ca3af'} // default gray if no color defined
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VerticalStackedBarChart;
