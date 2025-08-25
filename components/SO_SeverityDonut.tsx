'use client';

import { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const COLORS = [
  '#4CAF50', '#1E3A8A', '#FBBF24', '#EF4444', '#8B5CF6',
  '#10B981', '#F97316', '#3B82F6', '#EAB308', '#06B6D4', '#DC2626',
];

export default function SO_SeverityDonut() {
  const [chartData, setChartData] = useState<{ name: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/so-events-by-rule`);
        const json = await res.json();

        if (json?.data) {
          const formatted = Object.entries(json.data)
            .map(([name, value]) => ({
              name,
              value: Number(value),
            }))
            .filter(item => item.value > 0);
          setChartData(formatted);
        }
      } catch (err) {
        console.error('Error fetching severity data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const total = chartData.reduce((sum, d) => sum + d.value, 0);

  // Custom legend renderer with arrow
  const renderLegend = (props: any) => {
    const { payload } = props;
    return (
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '12px',
        paddingTop: '10px'
      }}>
        {payload.map((entry: any, index: number) => (
          <div key={`legend-${index}`} style={{ display: 'flex', alignItems: 'center', fontSize: 13 }}>
            <span style={{ color: entry.color, marginRight: 4 }}>➤</span>
            <span>{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className="bg-white p-4 rounded-xl shadow"
      style={{ height: '550px', width: '100%' }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData.length > 0 ? chartData : [{ name: '', value: 1 }]}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="40%"
            innerRadius={80}
            outerRadius={120}
            stroke="none"
          >
            {chartData.map((_, idx) => (
              <Cell
                key={`cell-${idx}`}
                fill={COLORS[idx % COLORS.length]}
              />
            ))}
          </Pie>

          {/* Center Text */}
          <text
            x="50%"
            y="40%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="14"
            fill="#888"
          >
            {loading ? "Loading..." : chartData.length === 0 ? "No data" : ""}
          </text>

          <Tooltip
            formatter={(value: number, name: string) =>
              [`${value} (${((value / total) * 100).toFixed(1)}%)`, name]
            }
          />

          {/* Custom legend with arrow */}
          <Legend
            content={renderLegend}
            layout="horizontal"
            align="center"
            verticalAlign="bottom"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
