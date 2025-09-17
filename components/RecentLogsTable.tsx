// 'use client';

// import React, { useEffect, useState } from 'react';

// type LogItem = {
//   TimeStamp: string;
//   Message: string;
//   severity?: string;
// };

// const severityColors: Record<string, string> = {
//   High: 'bg-red-500',
//   Medium: 'bg-yellow-400',
//   Info: 'bg-blue-500',
// };

// export default function RecentLogsTable() {
//   const [logs, setLogs] = useState<LogItem[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`${process.env.NEXT_PUBLIC_API_BASE}/recent-events`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (data?.data) {
//           const processed = data.data.map((item: LogItem) => {
//             let severity = 'Info';
//             const msgLower = item.Message.toLowerCase();

//             if (msgLower.includes('error') || msgLower.includes('failed') || msgLower.includes('exception')) {
//               severity = 'High';
//             } else if (msgLower.includes('low') || msgLower.includes('warning')) {
//               severity = 'Medium';
//             }

//             return {
//               ...item,
//               severity,
//             };
//           });
//           setLogs(processed);
//         }
//       })
//       .catch((err) => console.error('Error fetching logs:', err))
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
//       <h2 className="text-lg font-semibold mb-4">Recent Log Events</h2>
//       {loading ? (
//         <div className="text-center py-4">Loading...</div>
//       ) : (
//         <table className="w-full text-sm text-left border-collapse">
//           <thead>
//             <tr className="bg-gray-100 text-gray-700">
//               <th className="p-2 border">Timestamp</th>
//               <th className="p-2 border">Message</th>
//               <th className="p-2 border">Severity</th>
//             </tr>
//           </thead>
//           <tbody>
//             {logs.map((log, index) => (
//               <tr key={index}>
//                 <td className="p-2 border">{new Date(log.TimeStamp).toLocaleString()}</td>
//                 <td className="p-2 border">{log.Message}</td>
//                 <td className="p-2 border">
//                   <span
//                     className={`text-white px-2 py-1 rounded ${severityColors[log.severity || 'Info']}`}
//                   >
//                     {log.severity}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }


// 'use client';

// import React, { useEffect, useState } from 'react';

// type LogItem = {
//   TimeStamp: string;
//   Message: string;
//   severity?: string;
// };

// const severityColors: Record<string, string> = {
//   High: 'bg-red-500',
//   Medium: 'bg-yellow-400',
//   Info: 'bg-blue-500',
// };

// export default function RecentLogsTable() {
//   const [logs, setLogs] = useState<LogItem[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`${process.env.NEXT_PUBLIC_API_BASE}/recent-events`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (data?.data) {
//           const processed = data.data.map((item: LogItem) => {
//             let severity = 'Info';
//             const msgLower = item.Message.toLowerCase();

//             if (msgLower.includes('error') || msgLower.includes('failed') || msgLower.includes('exception')) {
//               severity = 'High';
//             } else if (msgLower.includes('low') || msgLower.includes('warning')) {
//               severity = 'Medium';
//             }

//             return {
//               ...item,
//               severity,
//             };
//           });
//           setLogs(processed);
//         }
//       })
//       .catch((err) => console.error('Error fetching logs:', err))
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
//       <h2 className="text-lg font-semibold mb-4">Recent Log Events</h2>

//       {loading ? (
//         <div className="text-center py-4">Loading...</div>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="w-full text-xs sm:text-sm md:text-base text-left border-collapse">
//             <thead>
//               <tr className="bg-gray-100 text-gray-700">
//                 <th className="px-2 md:px-4 py-2 border sticky top-0">Timestamp</th>
//                 <th className="px-2 md:px-4 py-2 border sticky top-0">Message</th>
//                 <th className="px-2 md:px-4 py-2 border sticky top-0">Severity</th>
//               </tr>
//             </thead>
//             <tbody>
//               {logs.map((log, index) => (
//                 <tr key={index} className="hover:bg-gray-50">
//                   <td className="px-2 md:px-4 py-2 border whitespace-nowrap">
//                     {new Date(log.TimeStamp).toLocaleString()}
//                   </td>
//                   <td className="px-2 md:px-4 py-2 border break-words max-w-xs md:max-w-md lg:max-w-lg">
//                     {log.Message}
//                   </td>
//                   <td className="px-2 md:px-4 py-2 border">
//                     <span
//                       className={`text-white px-2 py-1 rounded ${severityColors[log.severity || 'Info']}`}
//                     >
//                       {log.severity}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }


  // 'use client';

  // import React, { useEffect, useState } from 'react';

  // type LogItem = {
  //   TimeStamp: string;
  //   Message: string;
  //   severity?: string;
  // };

  // const severityColors: Record<string, string> = {
  //   High: 'bg-red-500',
  //   Medium: 'bg-yellow-400',
  //   Info: 'bg-blue-500',
  // };

  // export default function RecentLogsTable() {
  //   const [logs, setLogs] = useState<LogItem[]>([]);
  //   const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     fetch(`${process.env.NEXT_PUBLIC_API_BASE}/recent-events`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data?.data) {
  //           const processed = data.data.map((item: LogItem) => {
  //             let severity = 'Info';
  //             const msgLower = item.Message.toLowerCase();

  //             if (
  //               msgLower.includes('error') ||
  //               msgLower.includes('failed') ||
  //               msgLower.includes('exception')
  //             ) {
  //               severity = 'High';
  //             } else if (msgLower.includes('low') || msgLower.includes('warning')) {
  //               severity = 'Medium';
  //             }

  //             return {
  //               ...item,
  //               severity,
  //             };
  //           });
  //           setLogs(processed);
  //         }
  //       })
  //       .catch((err) => console.error('Error fetching logs:', err))
  //       .finally(() => setLoading(false));
  //   }, []);

  //   if (loading) {
  //     return <div className="p-4">Loading recent logs...</div>;
  //   }

  //   return (
  //     <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 w-full">
  //       <h2 className="text-lg font-semibold mb-4 text-center">
  //         Recent Log Events
  //       </h2>

  //       {/* Responsive wrapper */}
  //       <div className="overflow-x-auto">
  //         <table className="min-w-[600px] w-full text-xs sm:text-sm text-left border-collapse">
  //           <thead>
  //             <tr className="bg-gray-100 text-gray-700 sticky top-0">
  //               <th className="p-2 border">Timestamp</th>
  //               <th className="p-2 border">Message</th>
  //               <th className="p-2 border">Severity</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {logs.map((log, index) => (
  //               <tr key={index} className="hover:bg-gray-50">
  //                 <td className="p-2 border whitespace-nowrap">
  //                   {new Date(log.TimeStamp).toLocaleString()}
  //                 </td>
  //                 <td className="p-2 border break-words max-w-xs md:max-w-md lg:max-w-lg">
  //                   {log.Message}
  //                 </td>
  //                 <td className="p-2 border">
  //                   <span
  //                     className={`text-white px-2 py-1 rounded ${
  //                       severityColors[log.severity || 'Info']
  //                     }`}
  //                   >
  //                     {log.severity}
  //                   </span>
  //                 </td>
  //               </tr>
  //             ))}
  //           </tbody>
  //         </table>
  //       </div>
  //     </div>
  //   );
  // }


'use client';

import React, { useEffect, useState } from 'react';

type LogItem = {
  TimeStamp: string;
  Message: string;
  severity?: string;
};

const severityColors: Record<string, string> = {
  High: 'bg-red-500',
  Medium: 'bg-yellow-400',
  Info: 'bg-blue-500',
};

export default function RecentLogsTable() {
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/recent-events`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.data) {
          const processed = data.data.map((item: LogItem) => {
            return {
              ...item,
              severity: 'High', // 🔥 Hardcoded to High
            };
          });
          setLogs(processed);
        }
      })
      .catch((err) => console.error('Error fetching logs:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-4">Loading recent logs...</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 w-full">
      <h2 className="text-lg font-semibold mb-4 text-center">
        Recent Log Events
      </h2>

      {/* Responsive wrapper */}
      <div className="overflow-x-auto">
        <table className="min-w-[600px] w-full text-xs sm:text-sm text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 sticky top-0">
              <th className="p-2 border">Timestamp</th>
              <th className="p-2 border">Message</th>
              <th className="p-2 border">Severity</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-2 border whitespace-nowrap">
                  {new Date(log.TimeStamp).toLocaleString()}
                </td>
                <td className="p-2 border break-words max-w-xs md:max-w-md lg:max-w-lg">
                  {log.Message}
                </td>
                <td className="p-2 border">
                  <span
                    className={`text-white px-2 py-1 rounded ${
                      severityColors['High']
                    }`}
                  >
                    High
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
