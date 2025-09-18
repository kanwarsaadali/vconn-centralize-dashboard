'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  TooltipProps,
} from 'recharts';
import { useEffect, useState } from 'react';

// Desired order + colors
const SEVERITY_ORDER = ['Critical', 'High', 'Medium', 'Low'];
const SEVERITY_COLORS: Record<string, string> = {
  Critical: '#ee3e32',
  High: '#f68838',
  Medium: '#fbb021',
  Low: '#1b8a5a',
};

// ------------------- Tooltip -------------------
type CustomTooltipProps = TooltipProps<number, string> & {
  payload?: { name: string; value: number }[];
  label?: string | number;
};

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-gray-500">
          {payload[0].name}: {payload[0].value}
        </p>
      </div>
    );
  }

  return null;
};

// ------------------- Axis Tick -------------------
// type CustomizedAxisTickProps = {
//   x: number;
//   y: number;
//   payload: { value: string | number };
// };

// const CustomizedAxisTick: React.FC<CustomizedAxisTickProps> = ({ x, y, payload }) => (
//   <g transform={`translate(${x},${y})`}>
//     <text
//       x={0}
//       y={0}
//       dy={16}
//       textAnchor="end"
//       fill="#666"
//       transform="rotate(-35)"
//       fontSize={12}
//       className="font-medium"
//     >
//       {payload.value}
//     </text>
//   </g>
// );


type CustomizedAxisTickProps = {
  x: number;
  y: number;
  payload: { value: string | number };
};

function CustomizedAxisTick({ x, y, payload }: CustomizedAxisTickProps) {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        transform="rotate(-35)"
        fontSize={12}
        className="font-medium"
      >
        {payload.value}
      </text>
    </g>
  );
}

// ------------------- Legend -------------------
type CustomLegendProps = {
  order: string[];
  colors: Record<string, string>;
  visible: Record<string, boolean>;
  toggle: (key: string) => void;
};

const CustomLegend: React.FC<CustomLegendProps> = ({ order, colors, visible, toggle }) => {
  return (
    <div className="flex items-center gap-6 mb-2 flex-wrap">
      {order.map((key) => (
        <button
          key={key}
          onClick={() => toggle(key)}
          type="button"
          className="flex items-center gap-2 text-sm focus:outline-none"
          aria-pressed={visible[key] ? 'true' : 'false'}
        >
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: 9999,
              display: 'inline-block',
              background: colors[key],
              opacity: visible[key] ? 1 : 0.35,
              border: '1px solid rgba(0,0,0,0.06)',
            }}
          />
          <span className={`font-medium ${visible[key] ? 'text-gray-800' : 'text-gray-400'}`}>
            {key}
          </span>
        </button>
      ))}
    </div>
  );
};

// ------------------- Data Type -------------------
type SeverityData = {
  name: string;
  Critical: number;
  High: number;
  Medium: number;
  Low: number;
};

// ------------------- Main Component -------------------
const SeverityBreakdownByOS = () => {
  const [data, setData] = useState<SeverityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [visible, setVisible] = useState<Record<string, boolean>>(
    () => SEVERITY_ORDER.reduce((acc, k) => ({ ...acc, [k]: true }), {} as Record<string, boolean>)
  );

  // Transform API data
  const transformApiData = (apiData: any): SeverityData[] => {
    if (!apiData) return [];

    const allOS = new Set<string>();
    Object.values(apiData).forEach((severityData: any) => {
      Object.keys(severityData || {}).forEach((os) => allOS.add(os));
    });

    return Array.from(allOS).map((os) => ({
      name: os,
      Critical: apiData.Critical?.[os] ?? 0,
      High: apiData.High?.[os] ?? 0,
      Medium: apiData.Medium?.[os] ?? 0,
      Low: apiData.Low?.[os] ?? 0,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/vuln-by-os`);
        const result = await response.json();

        const transformedData = transformApiData(result.data);
        setData(transformedData);
      } catch (err) {
        setError('Failed to fetch data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggle = (key: string) => {
    setVisible((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 flex items-center justify-center h-96">
        <div className="text-gray-500">Loading data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 flex items-center justify-center h-96">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
      <CustomLegend order={SEVERITY_ORDER} colors={SEVERITY_COLORS} visible={visible} toggle={toggle} />

      <div className="h-96">
        {/* <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 10, left: 0, bottom: 70 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="name" tick={<CustomizedAxisTick />} interval={0} height={70} />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />

            <Bar dataKey="Critical" stackId="a" fill={SEVERITY_COLORS.Critical} name="Critical" hide={!visible.Critical} />
            <Bar dataKey="High" stackId="a" fill={SEVERITY_COLORS.High} name="High" hide={!visible.High} />
            <Bar dataKey="Medium" stackId="a" fill={SEVERITY_COLORS.Medium} name="Medium" hide={!visible.Medium} />
            <Bar dataKey="Low" stackId="a" fill={SEVERITY_COLORS.Low} name="Low" hide={!visible.Low} />
          </BarChart>
        </ResponsiveContainer> */}

        <ResponsiveContainer width="100%" height="100%">
  <BarChart data={data} margin={{ top: 8, right: 10, left: 0, bottom: 70 }}>
    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
    <XAxis dataKey="name" tick={CustomizedAxisTick} interval={0} height={70} />
    <YAxis />
    <Tooltip content={<CustomTooltip />} />

    <Bar dataKey="Critical" stackId="a" fill={SEVERITY_COLORS.Critical} name="Critical" hide={!visible.Critical} />
    <Bar dataKey="High" stackId="a" fill={SEVERITY_COLORS.High} name="High" hide={!visible.High} />
    <Bar dataKey="Medium" stackId="a" fill={SEVERITY_COLORS.Medium} name="Medium" hide={!visible.Medium} />
    <Bar dataKey="Low" stackId="a" fill={SEVERITY_COLORS.Low} name="Low" hide={!visible.Low} />
  </BarChart>
</ResponsiveContainer>

      </div>
    </div>
  );
};

export default SeverityBreakdownByOS;
