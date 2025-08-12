// 'use client';

// import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';

// const data = [
//   { name: 'Authentication', value: 14 },
//   { name: 'Network', value: 9 },
//   { name: 'System', value: 6 },
//   { name: 'File Access', value: 4 },
// ];

// const COLORS = ['#3b82f6', '#6366f1', '#8b5cf6', '#ec4899'];

// export default function SO_RuleTagsDonut() {
//   return (
//     <div className="bg-white p-4 rounded-2xl shadow border border-gray-200">
//       <h2 className="text-lg font-semibold mb-4 text-gray-800">Rule Tags</h2>
//       <div className="h-64">
//         <ResponsiveContainer width="100%" height="100%">
//           <PieChart>
//             <Pie
//               data={data}
//               dataKey="value"
//               nameKey="name"
//               innerRadius={50}
//               outerRadius={80}
//               paddingAngle={3}
//               fill="#8884d8"
//             >
//               {data.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Legend verticalAlign="bottom" height={36} />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
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
  Legend,
} from 'recharts';

const data = [
  { name: 'Authentication', value: 14 },
  { name: 'Network', value: 9 },
  { name: 'System', value: 6 },
  { name: 'File Access', value: 4 },

];

const COLORS = ['#ef4444', '#3b82f6', '#22c55e', '#ef4444', '#6366f1', '#a855f7'];

export default function SO_RuleTagsDonut() {
  return (
    <div className="bg-white p-4 rounded-xl shadow" style={{ height: '500px' }}>
      {/* Optional title */}
      {/* <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
        Environment Breakdown
      </h2> */}

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={140}
            stroke="none"
            labelLine={true}
            label={({ name, percent, x, y, cx }) => {
              const textAnchor = x > cx ? 'start' : 'end';
              return (
                <text
                  x={x}
                  y={y}
                  textAnchor={textAnchor}
                  dominantBaseline="central"
                  fill="#374151"
                  fontSize={14}
                >
                  {`${name} (${(percent * 100).toFixed(0)}%)`}
                </text>
              );
            }}
            paddingAngle={2}
          >
            {data.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            wrapperStyle={{ fontSize: 14 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
