'use client';

import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

type SeverityAPIResponse = {
  data: {
    medium: number;
    high: number;
    low: number;
  };
};

const COLORS: Record<string, string> = {
  High: 'rgb(239, 68, 68)',
  Low: 'rgb(245, 158, 11)',
  Medium: 'rgb(249, 115, 22)',
};

export default function SO_SeverityBar() {
  const [chartData, setChartData] = useState([
    { name: 'network', High: 0, Low: 0, Medium: 0 },
  ]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('http://128.2.99.235/so-events-by-label');
        const json: SeverityAPIResponse = await res.json();

        if (json?.data) {
          setChartData([
            {
              name: 'network',
              High: json.data.high,
              Low: json.data.low,
              Medium: json.data.medium,
            },
          ]);
        }
      } catch (error) {
        console.error('Error fetching severity data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="bg-white p-4 rounded-2xl shadow border border-gray-300">
      <div className="text-sm text-gray-700 font-semibold mb-2">Severity Label</div>
      <ResponsiveContainer width="100%" height={120}>
        <BarChart layout="vertical" data={chartData}>
          <XAxis
            type="number"
            tickFormatter={(tick) => `${tick}`}
            domain={[0, Math.max(chartData[0]?.High || 0, chartData[0]?.Low || 0, chartData[0]?.Medium || 0) * 1.2]}
            tick={{ fontSize: 12 }}
          />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend
            verticalAlign="top"
            height={36}
            iconType="circle"
            formatter={(value) => <span className="text-sm capitalize">{value}</span>}
          />
          <Bar dataKey="High" stackId="a" fill={COLORS.High} />
          <Bar dataKey="Low" stackId="a" fill={COLORS.Low} />
          <Bar dataKey="Medium" stackId="a" fill={COLORS.Medium} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
