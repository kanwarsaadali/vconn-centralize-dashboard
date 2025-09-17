'use client';

import { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

type DataItem = {
  name: string;
  value: number;
};

const COLORS = [
  '#14B8A6', '#3366CC', '#FF9900', '#DC3912', '#990099',
  '#0099C6', '#109618', '#FF6600', '#00544d', '#6366f1', '#dc2626'
];

// ✅ Responsive label rendering
const renderCustomLabel = (props: any) => {
  const { cx, cy, midAngle, outerRadius, percent, name } = props;
  const RADIAN = Math.PI / 180;
  const radius = outerRadius * 1.2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#111827"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      className="text-[10px] sm:text-xs md:text-sm lg:text-base"
    >
      {`${name} (${(percent * 100).toFixed(0)}%)`}
    </text>
  );
};

export default function EnvironmentPie() {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/vuln-by-department`);
        const json = await res.json();

        if (json?.percentages) {
          const formatted: DataItem[] = Object.entries(json.percentages).map(
            ([name, value]) => ({
              name,
              value: Number(value),
            })
          );
          setData(formatted);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  return (
    
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-4 sm:p-6 w-full">
      {/* <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-4 text-center">
        Environment Distribution
      </h3> */}

      {/* ✅ Fully responsive chart container */}
      <div className="w-full h-[40vh] min-h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="80%"
              innerRadius="40%"
              labelLine={true}
              label={renderCustomLabel}
              paddingAngle={2}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="#ffffff"
                  strokeWidth={1.5}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                borderRadius: '10px',
                fontSize: '14px',
                backgroundColor: '#f9fafb',
                border: '1px solid #e5e7eb',
              }}
              formatter={(value: number, name: string) => [
                `${value}%`,
                `${name}`,
              ]}
            />

            {/* ✅ Legend moved to bottom and horizontal */}
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              wrapperStyle={{
                fontSize: '12px',
                lineHeight: '20px',
                marginTop: '8px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
