// 'use client';

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
//   Legend,
// } from 'recharts';
// import { useEffect, useState } from 'react';

// export default function FimEventBar() {
//   const [chartData, setChartData] = useState<any[]>([]);
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);

//     async function fetchData() {
//       try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/fim-eventCount`);
//         const json = await res.json();

//         const counts = json.counts;
//         const formatted = Object.keys(counts).map((key) => ({
//           event: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize
//           count: counts[key],
//         }));

//         setChartData(formatted);
//       } catch (err) {
//         console.error('Failed to fetch FIM bar chart data', err);
//       }
//     }

//     fetchData();
//   }, []);

//   return (
//     <div className="bg-white rounded-xl shadow p-4 border border-gray-200">
//       <h2 className="text-lg font-semibold text-center text-gray-700 mb-4">
//         Event Counts
//       </h2>

//       <ResponsiveContainer width="100%" height={300}>
//         {isClient && chartData.length > 0 ? (
//           <BarChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="event" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="count" fill="#34d399" radius={[4, 4, 0, 0]} />
//           </BarChart>
//         ) : (
//           <div className="text-center text-gray-400 pt-24">Loading...</div>
//         )}
//       </ResponsiveContainer>
//     </div>
//   );
// }


// 'use client';

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
//   Legend,
//   Cell,
// } from 'recharts';
// import { useEffect, useState } from 'react';

// // Fixed event color mapping
// const EVENT_COLORS: Record<string, string> = {
//   Modified: '#22c55e',
//   Added: '#0ea5e9',
//   Delete: '#f59e0b',
// };

// export default function FimEventBar() {
//   const [chartData, setChartData] = useState<any[]>([]);
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);

//     async function fetchData() {
//       try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/fim-eventCount`);
//         const json = await res.json();

//         const counts = json.counts;
//         const formatted = Object.keys(counts).map((key) => ({
//           event: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize
//           count: counts[key],
//         }));

//         setChartData(formatted);
//       } catch (err) {
//         console.error('Failed to fetch FIM bar chart data', err);
//       }
//     }

//     fetchData();
//   }, []);

//   return (
//     <div className="bg-white rounded-xl shadow p-4 border border-gray-200">
//       <h2 className="text-lg font-semibold text-center text-gray-700 mb-4">
//         Event Counts
//       </h2>

//       <ResponsiveContainer width="100%" height={300}>
//         {isClient && chartData.length > 0 ? (
//           <BarChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="event" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="count" radius={[4, 4, 0, 0]}>
//               {chartData.map((entry, idx) => (
//                 <Cell
//                   key={`cell-${idx}`}
//                   fill={EVENT_COLORS[entry.event]} // fallback color
//                 />
//               ))}
//             </Bar>
//           </BarChart>
//         ) : (
//           <div className="text-center text-gray-400 pt-24">Loading...</div>
//         )}
//       </ResponsiveContainer>
//     </div>
//   );
// }


'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Cell,
} from 'recharts';
import { useEffect, useState } from 'react';

// Fixed event color mapping
const EVENT_COLORS: Record<string, string> = {
  Modified: '#22c55e',
  Added: '#0ea5e9',
  Delete: '#f59e0b',
  Deleted: '#f59e0b', // handle API sending "Deleted"
};

export default function FimEventBar() {
  const [chartData, setChartData] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    async function fetchData() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/fim-eventCount`);
        const json = await res.json();

        const counts = json.counts;
        const formatted = Object.keys(counts).map((key) => {
          let normalized = key.charAt(0).toUpperCase() + key.slice(1);
          if (normalized === 'Deleted') normalized = 'Delete'; // normalize
          return {
            event: normalized,
            count: counts[key],
          };
        });

        setChartData(formatted);
      } catch (err) {
        console.error('Failed to fetch FIM bar chart data', err);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-4 border border-gray-200">
      <h2 className="text-lg font-semibold text-center text-gray-700 mb-4">
        Event Counts
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        {isClient && chartData.length > 0 ? (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="event" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, idx) => (
                <Cell
                  key={`cell-${idx}`}
                  fill={EVENT_COLORS[entry.event] || '#999999'} // fallback if missing
                />
              ))}
            </Bar>
          </BarChart>
        ) : (
          <div className="text-center text-gray-400 pt-24">Loading...</div>
        )}
      </ResponsiveContainer>
    </div>
  );
}
