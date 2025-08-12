// 'use client';

// type Props = {
//   data: {
//     owner: string;
//     critical: number;
//     high: number;
//     low: number;
//     total: number;
//   }[];
// };

// export default function OwnerTable({ data }: Props) {
//   return (
//     <div className="bg-white rounded-lg shadow p-6 border">
//       <h3 className="text-xl font-bold text-center mb-4 text-gray-800">
//         Vulnerabilities by Department
//       </h3>
//       <div className="overflow-x-auto">
//         <table className="min-w-full text-sm text-left border">
//           <thead className="bg-gray-100 font-semibold text-gray-700">
//             <tr>
//               <th className="px-4 py-2 border">Department</th>
//               <th className="px-4 py-2 border text-red-700">Critical</th>
//               <th className="px-4 py-2 border text-orange-700">High</th>
//               <th className="px-4 py-2 border text-yellow-700">Low</th>
//               <th className="px-4 py-2 border text-blue-700">Total</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((row, idx) => (
//               <tr key={idx} className="border-b hover:bg-gray-50">
//                 <td className="px-4 py-2 border font-medium">{row.owner}</td>
//                 <td className="px-4 py-2 border text-red-600">{row.critical}</td>
//                 <td className="px-4 py-2 border text-orange-600">{row.high}</td>
//                 <td className="px-4 py-2 border text-yellow-600">{row.low}</td>
//                 <td className="px-4 py-2 border text-blue-600">{row.total}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


'use client';

import { useEffect, useState } from 'react';

type RowData = {
  owner: string;
  critical: number;
  high: number;
  total: number;
};

export default function OwnerTable() {
  const [data, setData] = useState<RowData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/vuln-by-dept`);
        // const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/fim-count`);
        
        const json = await res.json();

        if (json.data) {
          const transformed: RowData[] = Object.entries(json.data).map(
            ([owner, values]: any) => ({
              owner,
              critical: values.Critical || 0,
              high: values.High || 0,
              total: values.Total || 0,
            })
          );
          setData(transformed);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-6 border">
      <h3 className="text-xl font-bold text-center mb-4 text-gray-800">
        Vulnerabilities by Department
      </h3>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border">
            <thead className="bg-gray-100 font-semibold text-gray-700">
              <tr>
                <th className="px-4 py-2 border">Department</th>
                <th className="px-4 py-2 border text-red-700">Critical</th>
                <th className="px-4 py-2 border text-orange-700">High</th>
                <th className="px-4 py-2 border text-green-700">Total</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 border font-medium">{row.owner}</td>
                  <td className="px-4 py-2 border text-red-600">{row.critical}</td>
                  <td className="px-4 py-2 border text-orange-600">{row.high}</td>
                  <td className="px-4 py-2 border text-green-600 font-semibold">
                    {row.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
