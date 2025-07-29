
// 'use client';

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts';

// type SeverityItem = {
//   severity: string;
//   [osName: string]: number | string;
// };

// const COLORS = [
//   '#3b82f6', '#facc15', '#10b981', '#ef4444',
//   '#a855f7', '#6366f1', '#f97316', '#14b8a6',
//   '#e11d48', '#7c3aed', '#0ea5e9', '#84cc16',
// ];

// const CustomTooltip = ({ active, payload }: any) => {
//   if (active && payload && payload.length > 0) {
//     return (
//       <div style={{ background: '#fff', border: '1px solid #ccc', padding: 10 }}>
//         {payload.map((entry: any, i: number) => (
//           <p key={i} style={{ margin: 0 }}>
//             <strong>{entry.name}:</strong> {entry.value}%
//           </p>
//         ))}
//       </div>
//     );
//   }
//   return null;
// };

// const SeverityBreakdownBySeverity = ({ data }: { data: SeverityItem[] }) => {
//   if (!data || data.length === 0) {
//     return <div style={{ padding: '16px', textAlign: 'center' }}>No severity data available.</div>;
//   }

//   const osList = Object.keys(data[0]).filter((key) => key !== 'severity');

//   return (
//     <div
//       style={{
//         backgroundColor: '#fff',
//         borderRadius: '12px',
//         boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
//         border: '1px solid #e5e7eb',
//         padding: '20px',
//       }}
//     >
//       <h3
//         style={{
//           fontSize: '18px',
//           fontWeight: 600,
//           marginBottom: '16px',
//           textAlign: 'center',
//         }}
//       >
//         %GT Count of Severity
//       </h3>

//       {/* Legend with line break and scroll if too long */}
//       <div
//         style={{
//           display: 'flex',
//           flexWrap: 'wrap',
//           gap: '12px',
//           paddingBottom: '10px',
//           maxHeight: '80px',
//           overflowY: 'auto',
//         }}
//       >
//         {osList.map((os, i) => (
//           <div key={os} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
//             <div
//               style={{
//                 width: 12,
//                 height: 12,
//                 backgroundColor: COLORS[i % COLORS.length],
//                 borderRadius: 2,
//               }}
//             ></div>
//             <span style={{ fontSize: 12 }}>{os}</span>
//           </div>
//         ))}
//       </div>

//       {/* Chart */}
//       <div style={{ overflowX: 'auto' }}>
//         <div style={{ width: `${osList.length * 120}px`, height: `${data.length * 70}px` }}>
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart
//               layout="vertical"
//               data={data}
//               margin={{ top: 10, right: 30, left: 80, bottom: 5 }}
//             >
//               <XAxis type="number" unit="%" />
//               <YAxis type="category" dataKey="severity" tick={{ fontSize: 12 }} />
//               <Tooltip content={<CustomTooltip />} />
//               {osList.map((os, index) => (
//                 <Bar
//                   key={os}
//                   dataKey={os}
//                   stackId="a"
//                   fill={COLORS[index % COLORS.length]}
//                   fillOpacity={0.9}
//                 />
//               ))}
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SeverityBreakdownBySeverity;


// 'use client';

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts';
// import { useEffect, useState } from 'react';

// type SeverityItem = {
//   severity: string;
//   [osName: string]: number | string;
// };

// const COLORS = [
//   '#3b82f6', '#facc15', '#10b981', '#ef4444',
//   '#a855f7', '#6366f1', '#f97316', '#14b8a6',
//   '#e11d48', '#7c3aed', '#0ea5e9', '#84cc16',
// ];

// const CustomTooltip = ({ active, payload }: any) => {
//   if (active && payload && payload.length > 0) {
//     return (
//       <div style={{ background: '#fff', border: '1px solid #ccc', padding: 10 }}>
//         {payload.map((entry: any, i: number) => (
//           <p key={i} style={{ margin: 0 }}>
//             <strong>{entry.name}:</strong> {entry.value}%
//           </p>
//         ))}
//       </div>
//     );
//   }
//   return null;
// };

// const SeverityBreakdownBySeverity = () => {
//   const [data, setData] = useState<SeverityItem[]>([]);

//   useEffect(() => {
//     fetch('http://128.2.99.223/vuln-stats/severity-by-os')
//       .then(res => res.json())
//       .then(apiData => {
//         const severityMap: { [key: string]: { [key: string]: number } } = {};
//         apiData.forEach((osItem: any) => {
//           osItem.severities.forEach((sev: any) => {
//             if (!severityMap[sev.severity]) severityMap[sev.severity] = {};
//             severityMap[sev.severity][osItem.os] = sev.count;
//           });
//         });

//         const transformed = Object.entries(severityMap).map(([severity, osCounts]) => ({
//           severity,
//           ...osCounts,
//         }));

//         setData(transformed);
//       });
//   }, []);

//   if (!data || data.length === 0) {
//     return <div style={{ padding: '16px', textAlign: 'center' }}>No severity data available.</div>;
//   }

//   const osList = Object.keys(data[0]).filter(key => key !== 'severity');

//   return (
//     <div
//       style={{
//         backgroundColor: '#fff',
//         borderRadius: '12px',
//         boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
//         border: '1px solid #e5e7eb',
//         padding: '20px',
//       }}
//     >
//       <h3 style={{
//         fontSize: '18px',
//         fontWeight: 600,
//         marginBottom: '16px',
//         textAlign: 'center',
//       }}>
//         %GT Count of Severity
//       </h3>

//       <div style={{
//         display: 'flex',
//         flexWrap: 'wrap',
//         gap: '12px',
//         paddingBottom: '10px',
//         maxHeight: '80px',
//         overflowY: 'auto',
//       }}>
//         {osList.map((os, i) => (
//           <div key={os} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
//             <div style={{
//               width: 12,
//               height: 12,
//               backgroundColor: COLORS[i % COLORS.length],
//               borderRadius: 2,
//             }} />
//             <span style={{ fontSize: 12 }}>{os}</span>
//           </div>
//         ))}
//       </div>

//       <div style={{ overflowX: 'auto' }}>
//         <div style={{ width: `${osList.length * 120}px`, height: `${data.length * 70}px` }}>
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart
//               layout="vertical"
//               data={data}
//               margin={{ top: 10, right: 30, left: 80, bottom: 5 }}
//             >
//               <XAxis type="number" unit="%" />
//               <YAxis type="category" dataKey="severity" tick={{ fontSize: 12 }} />
//               <Tooltip content={<CustomTooltip />} />
//               {osList.map((os, index) => (
//                 <Bar
//                   key={os}
//                   dataKey={os}
//                   stackId="a"
//                   fill={COLORS[index % COLORS.length]}
//                   fillOpacity={0.9}
//                 />
//               ))}
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SeverityBreakdownBySeverity;


'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useEffect, useState } from 'react';

type SeverityItem = {
  severity: string;
  [osName: string]: number | string;
};

const COLORS = [
  '#3b82f6', '#facc15', '#10b981', '#ef4444',
  '#a855f7', '#6366f1', '#f97316', '#14b8a6',
  '#e11d48', '#7c3aed', '#0ea5e9', '#84cc16',
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length > 0) {
    return (
      <div style={{ background: '#fff', border: '1px solid #ccc', padding: 10 }}>
        {payload.map((entry: any, i: number) => (
          <p key={i} style={{ margin: 0 }}>
            <strong>{entry.name}:</strong> {entry.value}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const SeverityBreakdownBySeverity = () => {
  const [data, setData] = useState<SeverityItem[]>([]);

  useEffect(() => {
    fetch('http://128.2.99.223/vuln-stats/severity-by-os')
      .then(res => res.json())
      .then(apiData => {
        const severityMap: { [key: string]: { [key: string]: number } } = {};
        apiData.forEach((osItem: any) => {
          osItem.severities.forEach((sev: any) => {
            if (!severityMap[sev.severity]) severityMap[sev.severity] = {};
            severityMap[sev.severity][osItem.os] = sev.count;
          });
        });

        const transformed = Object.entries(severityMap).map(([severity, osCounts]) => ({
          severity,
          ...osCounts,
        }));

        setData(transformed);
      });
  }, []);

  if (!data || data.length === 0) {
    return <div style={{ padding: '16px', textAlign: 'center' }}>No severity data available.</div>;
  }

  const osList = Object.keys(data[0]).filter(key => key !== 'severity');

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
      <h3 style={{
        fontSize: '18px',
        fontWeight: 600,
        marginBottom: '16px',
        textAlign: 'center',
      }}>
        %GT Count of Severity
      </h3>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        paddingBottom: '10px',
        maxHeight: '80px',
        overflowY: 'auto',
      }}>
        {osList.map((os, i) => (
          <div key={os} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{
              width: 12,
              height: 12,
              backgroundColor: COLORS[i % COLORS.length],
              borderRadius: 2,
            }} />
            <span style={{ fontSize: 12 }}>{os}</span>
          </div>
        ))}
      </div>

      {/* ✅ Responsive Chart Container */}
      <div style={{ width: '100%', minWidth: '100%', height: '100%', overflowX: 'auto' }}>
        <div style={{ minWidth: '600px', height: `${data.length * 70}px` }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={data}
              margin={{ top: 10, right: 30, left: 80, bottom: 5 }}
            >
              <XAxis type="number" unit="%" />
              <YAxis type="category" dataKey="severity" tick={{ fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              {osList.map((os, index) => (
                <Bar
                  key={os}
                  dataKey={os}
                  stackId="a"
                  fill={COLORS[index % COLORS.length]}
                  fillOpacity={0.9}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SeverityBreakdownBySeverity;
