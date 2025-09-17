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

// // Professional SOC color theme
// const COLORS = [
//   '#dc2626', // Critical - red
//   '#f97316', // High - orange
//   '#facc15', // Medium - amber
//   '#22c55e', // Low - green
//   '#3b82f6', // Windows/Linux balanced blue
//   '#6366f1', // Indigo (extra OS)
//   '#14b8a6', // Teal (extra OS)
//   '#6b7280', // Neutral gray
// ];

// const CustomTooltip = ({ active, payload }: any) => {
//   if (active && payload && payload.length > 0) {
//     return (
//       <div
//         style={{
//           background: '#fff5f5',
//           border: '1px solid #ef4444',
//           borderRadius: '8px',
//           padding: 10,
//           boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
//         }}
//       >
//         {payload.map((entry: any, i: number) => (
//           <p
//             key={i}
//             style={{
//               margin: 0,
//               fontSize: '13px',
//               color: '#111827',
//             }}
//           >
//             <strong style={{ color: entry.color }}>{entry.name}:</strong>{' '}
//             {entry.value.toFixed(2)}%
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
//     fetch(`${process.env.NEXT_PUBLIC_API_BASE}/vuln-by-os`)
//       .then(res => res.json())
//       .then(apiData => {
//         const rawData = apiData.data;

//         // Transform { Critical: { OS: %, OS2: % }, High: { ... } }
//         // const transformed: SeverityItem[] = Object.entries(rawData).map(
//         //   ([severity, osMap]) => ({
//         //     severity,
//         //     ...osMap,
//         //   })
//         // );
//         const transformed: SeverityItem[] = Object.entries(rawData).map(
//   ([severity, osMap]) => ({
//     severity,
//     ...(osMap as Record<string, number>), // ✅ cast so spread works
//   })
// );


//         setData(transformed);
//       })
//       .catch(err => {
//         console.error('Error fetching severity-by-os:', err);
//       });
//   }, []);

//   if (!data || data.length === 0) {
//     return (
//       <div style={{ padding: '16px', textAlign: 'center' }}>
//         No severity data available.
//       </div>
//     );
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
//       <h3
//         style={{
//           fontSize: '18px',
//           fontWeight: 600,
//           marginBottom: '16px',
//           textAlign: 'center',
//         }}
//       >
//         %GT Count of Severity by OS
//       </h3>

//       {/* Legend */}
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
//             />
//             <span style={{ fontSize: 12 }}>{os}</span>
//           </div>
//         ))}
//       </div>

//       {/* Chart */}
//       <div
//         style={{ width: '100%', minWidth: '100%', height: '100%', overflowX: 'auto' }}
//       >
//         <div style={{ minWidth: '600px', height: `${data.length * 70}px` }}>
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
//   CartesianGrid,
//   Legend
// } from 'recharts';
// import { useEffect, useState } from 'react';

// // Define the color scheme based on your requirements
// const SEVERITY_COLORS = {
//   'Critical': '#ee3e32',
//   'High': '#f68838', 
//   'Medium': '#fbb021',
//   'Low': '#1b8a5a'
// };

// const CustomTooltip = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
//         <p className="font-bold text-gray-800 mb-2">{label}</p>
//         {payload.map((entry, index) => (
//           <p key={`item-${index}`} className="text-sm" style={{ color: entry.color }}>
//             {`${entry.name}: ${entry.value.toFixed(2)}%`}
//           </p>
//         ))}
//       </div>
//     );
//   }
//   return null;
// };

// const SeverityBreakdownByOS = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch('http://128.2.99.235/vuln-by-os');
//         const result = await response.json();
        
//         // Transform the API data into the format needed for the chart
//         const transformedData = transformApiData(result.data);
//         setData(transformedData);
//       } catch (err) {
//         setError('Failed to fetch data');
//         console.error('Error fetching data:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Function to transform API data to chart format
//   const transformApiData = (apiData) => {
//     // Get all unique OS names from all severity levels
//     const allOS = new Set();
//     Object.values(apiData).forEach(severityData => {
//       Object.keys(severityData).forEach(os => allOS.add(os));
//     });
    
//     // Create an array of OS names
//     const osArray = Array.from(allOS);
    
//     // Create data for each OS
//     return osArray.map(os => {
//       const osData = { name: os };
      
//       // Add each severity level for this OS
//       Object.entries(apiData).forEach(([severity, severityData]) => {
//         osData[severity] = severityData[os] || 0;
//       });
      
//       return osData;
//     });
//   };

//   if (loading) {
//     return (
//       <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 flex items-center justify-center h-96">
//         <div className="text-gray-500">Loading data...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 flex items-center justify-center h-96">
//         <div className="text-red-500">{error}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
//       <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
//         Severity Breakdown by OS
//       </h2>
      
//       <div className="h-96">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart
//             data={data}
//             margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis label={{ value: 'Percentage', angle: -90, position: 'insideLeft' }} />
//             <Tooltip content={<CustomTooltip />} />
//             <Legend />
//             <Bar dataKey="Low" stackId="a" fill={SEVERITY_COLORS.Low} name="Low" />
//             <Bar dataKey="Medium" stackId="a" fill={SEVERITY_COLORS.Medium} name="Medium" />
//             <Bar dataKey="High" stackId="a" fill={SEVERITY_COLORS.High} name="High" />
//             <Bar dataKey="Critical" stackId="a" fill={SEVERITY_COLORS.Critical} name="Critical" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
      
//       {/* <div className="mt-6 flex flex-wrap justify-center gap-4">
//         {Object.entries(SEVERITY_COLORS).map(([severity, color]) => (
//           <div key={severity} className="flex items-center">
//             <div 
//               className="w-4 h-4 mr-2 rounded-sm"
//               style={{ backgroundColor: color }}
//             ></div>
//             <span className="text-sm text-gray-600">{severity}</span>
//           </div>
//         ))}
//       </div> */}
//     </div>
//   );
// };

// export default SeverityBreakdownByOS;

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
//   Cell
// } from 'recharts';
// import { useEffect, useState } from 'react';

// // Define the color scheme based on your requirements
// const SEVERITY_COLORS = {
//   'Critical': '#ee3e32',
//   'High': '#f68838', 
//   'Medium': '#fbb021',
//   'Low': '#1b8a5a'
// };

// const CustomTooltip = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
//         <p className="font-bold text-gray-800 mb-2">{label}</p>
//         {payload.map((entry, index) => (
//           <p key={`item-${index}`} className="text-sm" style={{ color: entry.color }}>
//             {`${entry.name}: ${entry.value.toFixed(2)}%`}
//           </p>
//         ))}
//       </div>
//     );
//   }
//   return null;
// };

// // Custom tick component to handle long OS names
// const CustomXAxisTick = ({ x, y, payload }) => {
//   return (
//     <g transform={`translate(${x},${y})`}>
//       <text 
//         x={0} 
//         y={0} 
//         dy={16} 
//         textAnchor="end" 
//         fill="#666" 
//         transform="rotate(-45)"
//         fontSize={12}
//       >
//         {payload.value}
//       </text>
//     </g>
//   );
// };

// const SeverityBreakdownByOS = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch('http://128.2.99.235/vuln-by-os');
//         const result = await response.json();
        
//         // Transform the API data into the format needed for the chart
//         const transformedData = transformApiData(result.data);
//         setData(transformedData);
//       } catch (err) {
//         setError('Failed to fetch data');
//         console.error('Error fetching data:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Function to transform API data to chart format
//   const transformApiData = (apiData) => {
//     // Get all unique OS names from all severity levels
//     const allOS = new Set();
//     Object.values(apiData).forEach(severityData => {
//       Object.keys(severityData).forEach(os => allOS.add(os));
//     });
    
//     // Create an array of OS names
//     const osArray = Array.from(allOS);
    
//     // Create data for each OS
//     return osArray.map(os => {
//       const osData = { name: os };
      
//       // Add each severity level for this OS
//       Object.entries(apiData).forEach(([severity, severityData]) => {
//         osData[severity] = severityData[os] || 0;
//       });
      
//       return osData;
//     });
//   };

//   if (loading) {
//     return (
//       <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 flex items-center justify-center h-96">
//         <div className="text-gray-500">Loading data...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 flex items-center justify-center h-96">
//         <div className="text-red-500">{error}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
//       <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
//         Severity Breakdown by OS
//       </h2>
      
//       <div className="h-96">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart
//             data={data}
//             margin={{ top: 20, right: 30, left: 40, bottom: 80 }} // Increased bottom margin for rotated labels
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis 
//               dataKey="name" 
//               interval={0} 
//               tick={<CustomXAxisTick />}
//               height={80} // Increased height for XAxis to accommodate rotated labels
//             />
//             <YAxis label={{ value: 'Percentage', angle: -90, position: 'insideLeft' }} />
//             <Tooltip content={<CustomTooltip />} />
//             <Legend />
//             <Bar dataKey="Low" stackId="a" fill={SEVERITY_COLORS.Low} name="Low" />
//             <Bar dataKey="Medium" stackId="a" fill={SEVERITY_COLORS.Medium} name="Medium" />
//             <Bar dataKey="High" stackId="a" fill={SEVERITY_COLORS.High} name="High" />
//             <Bar dataKey="Critical" stackId="a" fill={SEVERITY_COLORS.Critical} name="Critical" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default SeverityBreakdownByOS;

// 'use client';

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
//   Legend
// } from 'recharts';
// import { useEffect, useState } from 'react';

// // Define the color scheme based on your requirements
// const SEVERITY_COLORS = {
//   'Critical': '#ee3e32',
//   'High': '#f68838', 
//   'Medium': '#fbb021',
//   'Low': '#1b8a5a'
// };

// const CustomTooltip = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
//         <p className="font-bold text-gray-800 mb-2">{label}</p>
//         {payload.map((entry, index) => (
//           <p key={`item-${index}`} className="text-sm" style={{ color: entry.color }}>
//             {`${entry.name}: ${entry.value.toFixed(2)}%`}
//           </p>
//         ))}
//       </div>
//     );
//   }
//   return null;
// };

// // Custom tick component for better OS name display
// const CustomizedAxisTick = ({ x, y, payload }) => {
//   return (
//     <g transform={`translate(${x},${y})`}>
//       <text
//         x={0}
//         y={0}
//         dy={16}
//         textAnchor="end"
//         fill="#666"
//         transform="rotate(-35)"
//         fontSize={12}
//         className="font-medium"
//       >
//         {payload.value}
//       </text>
//     </g>
//   );
// };

// const SeverityBreakdownByOS = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/vuln-by-os`);
//         const result = await response.json();
        
//         // Transform the API data into the format needed for the chart
//         const transformedData = transformApiData(result.data);
//         setData(transformedData);
//       } catch (err) {
//         setError('Failed to fetch data');
//         console.error('Error fetching data:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Function to transform API data to chart format
//   const transformApiData = (apiData) => {
//     // Get all unique OS names from all severity levels
//     const allOS = new Set();
//     Object.values(apiData).forEach(severityData => {
//       Object.keys(severityData).forEach(os => allOS.add(os));
//     });
    
//     // Create an array of OS names
//     const osArray = Array.from(allOS);
    
//     // Create data for each OS
//     return osArray.map(os => {
//       const osData = { name: os };
      
//       // Add each severity level for this OS
//       Object.entries(apiData).forEach(([severity, severityData]) => {
//         osData[severity] = severityData[os] || 0;
//       });
      
//       return osData;
//     });
//   };

//   if (loading) {
//     return (
//       <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 flex items-center justify-center h-96">
//         <div className="text-gray-500">Loading data...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 flex items-center justify-center h-96">
//         <div className="text-red-500">{error}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
//       {/* <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
//         Severity Breakdown by OS
//       </h2> */}
      
//       <div className="h-96">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart
//             data={data}
//             margin={{ top: 20, right: 10, left: 0, bottom: 70 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
//             <XAxis 
//               dataKey="name" 
//               tick={<CustomizedAxisTick />}
//               interval={0}
//               height={70}
//             />
//             <YAxis />
//             <Tooltip content={<CustomTooltip />} />
//             <Legend 
//               verticalAlign="top" 
//               height={36}
//               iconType="circle"
//               iconSize={10}
//               wrapperStyle={{ paddingBottom: '20px' }}
//             />
//             <Bar dataKey="Critical" stackId="a" fill={SEVERITY_COLORS.Critical} name="Critical" />
//             <Bar dataKey="High" stackId="a" fill={SEVERITY_COLORS.High} name="High" />
//             <Bar dataKey="Medium" stackId="a" fill={SEVERITY_COLORS.Medium} name="Medium" />
//             <Bar dataKey="Low" stackId="a" fill={SEVERITY_COLORS.Low} name="Low" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default SeverityBreakdownByOS;

'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { useEffect, useState } from 'react';

// Desired order + colors
const SEVERITY_ORDER = ['Critical', 'High', 'Medium', 'Low'];
const SEVERITY_COLORS = {
  Critical: '#ee3e32',
  High: '#f68838',
  Medium: '#fbb021',
  Low: '#1b8a5a',
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="font-bold text-gray-800 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} className="text-sm" style={{ color: entry.color }}>
            {`${entry.name}: ${typeof entry.value === 'number' ? entry.value.toFixed(2) : entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const CustomizedAxisTick = ({ x, y, payload }) => (
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

// Custom legend that enforces order and supports toggling
const CustomLegend = ({ order, colors, visible, toggle }) => {
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

const SeverityBreakdownByOS = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // visibility state for each severity series
  const [visible, setVisible] = useState(
    () => SEVERITY_ORDER.reduce((acc, k) => ({ ...acc, [k]: true }), {})
  );

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

  const toggle = (key) => {
    setVisible((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Transform API data to chart format
  const transformApiData = (apiData) => {
    if (!apiData) return [];
    const allOS = new Set();
    Object.values(apiData).forEach((severityData) => {
      Object.keys(severityData || {}).forEach((os) => allOS.add(os));
    });

    return Array.from(allOS).map((os) => {
      const osData = { name: os };
      // ensure we add all severities (even if missing)
      SEVERITY_ORDER.forEach((sev) => {
        osData[sev] = (apiData[sev] && apiData[sev][os]) ? apiData[sev][os] : 0;
      });
      return osData;
    });
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
      {/* Custom legend placed above the chart (guarantees order) */}
      <CustomLegend order={SEVERITY_ORDER} colors={SEVERITY_COLORS} visible={visible} toggle={toggle} />

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 10, left: 0, bottom: 70 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="name" tick={<CustomizedAxisTick />} interval={0} height={70} />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />

            {/* Bars order controls stacking (first bar = bottom). Visibility controlled by `hide` */}
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
