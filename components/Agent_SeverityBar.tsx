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
  Active_Count: number;
  Disconnected_Count: number;
};

const COLORS = {
  active: '#10b981', // green
  disconnected: '#ef4444', // red
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

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/agents-by-dept`);
        const json = await res.json();

        const data = json.data;
        const formatted: CountItem[] = Object.keys(data).map((dept) => ({
          category: dept,
          Active_Count: data[dept].active ?? 0,
          Disconnected_Count: data[dept].disconnected ?? 0,
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
        Active vs Disconnected Count (by Dept)
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
          <Bar dataKey="Active_Count" name="Active" stackId="a" fill={COLORS.active} />
          <Bar
            dataKey="Disconnected_Count"
            name="Disconnected"
            stackId="a"
            fill={COLORS.disconnected}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VerticalStackedBarChart;
