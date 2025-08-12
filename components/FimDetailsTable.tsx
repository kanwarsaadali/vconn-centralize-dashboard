// 'use client';

// import { useEffect, useState } from 'react';

// interface FimEvent {
//   agent_name: string;
//   department: string;
//   server_owner: string;
//   description: string;
//   path: string;
//   detected_at: string;
// }

// export default function FimDetailsTable() {
//   const [data, setData] = useState<FimEvent[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 50; // <-- Changed from 20 to 50

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/fim-events`);
//         if (!res.ok) throw new Error('Failed to fetch data');
//         const result = await res.json();
//         setData(result.data);
//       } catch (err: any) {
//         setError(err.message || 'An error occurred');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const paginatedData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
//   const totalPages = Math.ceil(data.length / pageSize);

//   const handlePrevious = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   const handleNext = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   return (
//     <div className="bg-white rounded-xl shadow p-4 overflow-x-auto border">
//       <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">Detailed Events</h2>

//       {loading && <p className="text-center text-gray-500">Loading...</p>}
//       {error && <p className="text-center text-red-500">{error}</p>}

//       {!loading && !error && (
//         <>
//           <table className="min-w-full text-sm">
//             <thead>
//               <tr className="text-left bg-gray-100">
//                 <th className="p-2">Agent Name</th>
//                 <th className="p-2">Environment</th>
//                 <th className="p-2">Level</th>
//                 <th className="p-2">Department</th>
//                 <th className="p-2">Rule Description</th>
//                 <th className="p-2">Detected At (UTC)</th>
//                 <th className="p-2">Path</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paginatedData.map((row, idx) => (
//                 <tr key={idx} className="border-t">
//                   <td className="p-2">{row.agent_name}</td>
//                   <td className="p-2">{row.department}</td>
//                   <td className="p-2">-</td>
//                   <td className="p-2">{row.server_owner}</td>
//                   <td className="p-2">{row.description}</td>
//                   <td className="p-2">
//                     {new Date(row.detected_at).toLocaleString('en-US', {
//                       dateStyle: 'medium',
//                       timeStyle: 'short',
//                       hour12: true,
//                       timeZone: 'UTC',
//                     })}{' '}
//                     UTC
//                   </td>
//                   <td className="p-2">{row.path}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* Pagination Controls */}
//           <div className="flex justify-center items-center mt-4 space-x-4">
//             <button
//               onClick={handlePrevious}
//               disabled={currentPage === 1}
//               className="px-3 py-1 rounded border text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
//             >
//               Previous
//             </button>
//             <span className="text-sm text-gray-700">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               onClick={handleNext}
//               disabled={currentPage === totalPages}
//               className="px-3 py-1 rounded border text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }


'use client';

import { useEffect, useState } from 'react';

interface FimEvent {
  agent_name: string;
  department: string;
  server_owner: string;
  description: string;
  path: string;
  detected_at: string;
}

export default function FimDetailsTable() {
  const [data, setData] = useState<FimEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 50;

  // Fetch function extracted so it can be reused for polling
  const fetchData = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/fim-events`);
      if (!res.ok) throw new Error('Failed to fetch data');
      const result = await res.json();
      setData(result.data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Initial load

    // Poll every 10 minutes (600,000 ms)
    const interval = setInterval(() => {
      fetchData();
    }, 600_000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const paginatedData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const totalPages = Math.ceil(data.length / pageSize);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 overflow-x-auto border">
      <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">Detailed Events</h2>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left bg-gray-100">
                <th className="p-2">Agent Name</th>
                <th className="p-2">Environment</th>
                <th className="p-2">Level</th>
                <th className="p-2">Department</th>
                <th className="p-2">Rule Description</th>
                <th className="p-2">Detected At (UTC)</th>
                <th className="p-2">Path</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, idx) => (
                <tr key={idx} className="border-t">
                  <td className="p-2">{row.agent_name}</td>
                  <td className="p-2">{row.department}</td>
                  <td className="p-2">-</td>
                  <td className="p-2">{row.server_owner}</td>
                  <td className="p-2">{row.description}</td>
                  <td className="p-2">
                    {new Date(row.detected_at).toLocaleString('en-US', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                      hour12: true,
                      timeZone: 'UTC',
                    })}{' '}
                    UTC
                  </td>
                  <td className="p-2">{row.path}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-4 space-x-4">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded border text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded border text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
