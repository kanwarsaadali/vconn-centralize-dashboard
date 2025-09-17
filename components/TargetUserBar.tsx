// 'use client';

// import { useEffect, useState } from 'react';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from 'recharts';

// export default function TargetUserBar() {
//   const [data, setData] = useState<{ user: string; events: number }[]>([]);

//   useEffect(() => {
//     fetch(`${process.env.NEXT_PUBLIC_API_BASE}/events-by-user`)
//       .then(res => res.json())
//       .then(apiData => {
//         if (apiData?.data) {
//           const formatted = apiData.data.map((item: Record<string, number>) => {
//             const [user, events] = Object.entries(item)[0];
//             return { user, events };
//           });
//           setData(formatted);
//         }
//       })
//       .catch(err => console.error('Error fetching events-by-user:', err));
//   }, []);

//   return (
//     <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
//       <h2 className="text-lg font-semibold mb-2">Events by Target User</h2>
//       <ResponsiveContainer width="100%" height={250}>
//         <BarChart
//           data={data}
//           layout="vertical"
//           margin={{ top: 10, right: 30, left: 40, bottom: 5 }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis type="number" />
//           <YAxis type="category" dataKey="user" />
//           <Tooltip />
//           <Bar dataKey="events" fill="#6366f1" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

export default function TargetUserBar() {
  const [data, setData] = useState<{ user: string; events: number }[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/events-by-user`)
      .then(res => res.json())
      .then(apiData => {
        if (apiData?.data) {
          const formatted = apiData.data.map((item: Record<string, number>) => {
            const [user, events] = Object.entries(item)[0];
            return { user, events };
          });

          // Sort by events (descending) and take top 5
          const topFive = formatted
            .sort((a, b) => b.events - a.events)
            .slice(0, 5);

          setData(topFive);
        }
      })
      .catch(err => console.error('Error fetching events-by-user:', err));
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <h2 className="text-lg font-semibold mb-2">Top 5 Target Users by Events</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 30, left: 40, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="user" />
          <Tooltip />
          <Bar dataKey="events" fill="#6366f1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
