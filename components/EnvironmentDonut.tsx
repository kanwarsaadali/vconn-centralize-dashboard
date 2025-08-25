// 'use client';

// import { useEffect, useState } from 'react';
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from 'recharts';

// const COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b'];

// export default function EnvironmentDonut() {
//   const [data, setData] = useState<{ name: string; value: number }[]>([]);

//   useEffect(() => {
//     fetch(`${process.env.NEXT_PUBLIC_API_BASE}/events-by-dept`)
//       .then(res => res.json())
//       .then(apiData => {
//         if (apiData?.data) {
//           // Convert API format { "PROD": 215 } -> { name: "PROD", value: 215 }
//           const formatted = apiData.data.map((item: Record<string, number>) => {
//             const [name, value] = Object.entries(item)[0];
//             return { name, value };
//           });
//           setData(formatted);
//         }
//       })
//       .catch(err => console.error('Error fetching events-by-dept:', err));
//   }, []);

//   return (
//     <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
//       <h2 className="text-lg font-semibold mb-2">Environment Breakdown</h2>
//       <ResponsiveContainer width="100%" height={250}>
//         <PieChart>
//           <Pie
//             data={data}
//             dataKey="value"
//             nameKey="name"
//             outerRadius={80}
//             innerRadius={40}
//             label
//           >
//             {data.map((entry, index) => (
//               <Cell
//                 key={`cell-${index}`}
//                 fill={COLORS[index % COLORS.length]}
//               />
//             ))}
//           </Pie>
//           <Tooltip />
//           <Legend />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }


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

const COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b'];

export default function EnvironmentDonut() {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/events-by-dept`)
      .then(res => res.json())
      .then(apiData => {
        if (apiData?.data) {
          // Convert API format { "PROD": 215 } -> { name: "PROD", value: 215 }
          const formatted = apiData.data.map((item: Record<string, number>) => {
            const [name, value] = Object.entries(item)[0];
            return { name, value };
          });

          // Filter out TOTAL row
          const cleaned = formatted.filter(d => d.name.toUpperCase() !== 'TOTAL');

          setData(cleaned);
        }
      })
      .catch(err => console.error('Error fetching events-by-dept:', err));
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <h2 className="text-lg font-semibold mb-2">Environment Breakdown</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={80}
            innerRadius={40}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
