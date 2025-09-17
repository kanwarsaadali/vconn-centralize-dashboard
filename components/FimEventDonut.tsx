// 'use client';

// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts';
// import { useEffect, useState } from 'react';

// // Normal colors for other slices
// const COLORS = ['#22c55e', '#0ea5e9', '#f59e0b', '#101020ff', '#14b8a6'];

// // Highlight colors for top 3
// const HIGHLIGHT_COLORS = ['#dc2626', '#ef4444', '#f87171'];

// const renderCustomizedLabel = ({ name, percent }: any) =>
//   `${name} (${(percent * 100).toFixed(0)}%)`;

// export default function FimEventDonut() {
//   const [chartData, setChartData] = useState<any[]>([]);
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);

//     async function fetchEventCounts() {
//       try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/fim-eventCount`);
//         const json = await res.json();

//         const counts = json.counts;
//         const formattedData = Object.keys(counts).map((key) => ({
//           name: key,
//           value: counts[key],
//         }));

//         // sort descending by value
//         formattedData.sort((a, b) => b.value - a.value);

//         setChartData(formattedData);
//       } catch (err) {
//         console.error('Failed to load FIM event data', err);
//       }
//     }

//     fetchEventCounts();
//   }, []);

//   return (
//     <div className="bg-white p-4 rounded-xl shadow border">
//       <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
//         Event Type Breakdown
//       </h2>

//       <div className="w-full h-[300px]">
//         {isClient && chartData.length > 0 ? (
//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <Pie
//                 data={chartData}
//                 dataKey="value"
//                 nameKey="name"
//                 cx="50%"
//                 cy="50%"
//                 innerRadius={60}
//                 outerRadius={100}
//                 labelLine
//                 label={renderCustomizedLabel}
//                 paddingAngle={2}
//               >
//                 {chartData.map((entry, idx) => {
//                   if (idx < 3) {
//                     return (
//                       <Cell
//                         key={`cell-${idx}`}
//                         fill={HIGHLIGHT_COLORS[idx]}
//                         stroke="#fff"
//                         strokeWidth={1}
//                       />
//                     );
//                   }
//                   return (
//                     <Cell
//                       key={`cell-${idx}`}
//                       fill={COLORS[idx % COLORS.length]}
//                       stroke="#fff"
//                       strokeWidth={1}
//                     />
//                   );
//                 })}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         ) : (
//           <div className="text-center text-gray-400 pt-24">Loading...</div>
//         )}
//       </div>

//       {/* Custom Legend */}
//       <ul className="flex flex-wrap justify-center gap-6 mt-4 text-sm">
//         {chartData.map((entry, idx) => {
//           const color =
//             idx < 3
//               ? HIGHLIGHT_COLORS[idx]
//               : COLORS[idx % COLORS.length];
//           return (
//             <li key={idx} className="flex items-center gap-2">
//               <span
//                 className="inline-block w-3 h-3 rounded-full"
//                 style={{ backgroundColor: color }}
//               ></span>
//               <span className="text-gray-700 font-medium">{entry.name}</span>
//               <span className="ml-1 text-gray-500">
//                 ({entry.value.toLocaleString()})
//               </span>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// }


'use client';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useEffect, useState } from 'react';

// Custom mapping for specific event types
const EVENT_COLORS: Record<string, string> = {
  Modified: '#4099BF',
  Added: '#3BB39C',
  Delete: '#BF0462',
};

// Fallback colors for other events
const FALLBACK_COLORS = ['#22c55e', '#0ea5e9', '#f59e0b'];

const renderCustomizedLabel = ({ name, percent }: any) =>
  `${name} (${(percent * 100).toFixed(0)}%)`;

export default function FimEventDonut() {
  const [chartData, setChartData] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    async function fetchEventCounts() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/fim-eventCount`);
        const json = await res.json();

        const counts = json.counts;
        const formattedData = Object.keys(counts).map((key) => ({
          name: key,
          value: counts[key],
        }));

        // Sort descending by value
        formattedData.sort((a, b) => b.value - a.value);

        setChartData(formattedData);
      } catch (err) {
        console.error('Failed to load FIM event data', err);
      }
    }

    fetchEventCounts();
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow border">
      <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
        Event Type Breakdown
      </h2>

      <div className="w-full h-[300px]">
        {isClient && chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                labelLine
                label={renderCustomizedLabel}
                paddingAngle={2}
              >
                {chartData.map((entry, idx) => {
                  const color =
                    EVENT_COLORS[entry.name] || FALLBACK_COLORS[idx % FALLBACK_COLORS.length];
                  return (
                    <Cell
                      key={`cell-${idx}`}
                      fill={color}
                      stroke="#fff"
                      strokeWidth={1}
                    />
                  );
                })}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center text-gray-400 pt-24">Loading...</div>
        )}
      </div>

      {/* Custom Legend */}
      <ul className="flex flex-wrap justify-center gap-6 mt-4 text-sm">
        {chartData.map((entry, idx) => {
          const color =
            EVENT_COLORS[entry.name] || FALLBACK_COLORS[idx % FALLBACK_COLORS.length];
          return (
            <li key={idx} className="flex items-center gap-2">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: color }}
              ></span>
              <span className="text-gray-700 font-medium">{entry.name}</span>
              <span className="ml-1 text-gray-500">
                ({entry.value.toLocaleString()})
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
