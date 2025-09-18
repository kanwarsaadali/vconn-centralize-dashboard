'use client';

import { useEffect, useState } from 'react';

type CVE = {
  cve_id: string;
  severity: string;
  count: number;
};

const severityColors: Record<string, string> = {
  High: 'bg-red-500 text-white',
  Medium: 'bg-yellow-400 text-black',
  Info: 'bg-blue-500 text-white',
  Default: 'bg-gray-300 text-black',
};

export default function CveSummaryTable() {
  const [data, setData] = useState<CVE[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/cve-ids`)
      .then((res) => res.json())
      .then((resData) => {
        if (resData?.data) {
          const top3 = resData.data
            .filter((item: CVE) => item.severity.toLowerCase() === 'high')
            .sort((a: CVE, b: CVE) => b.count - a.count)
            .slice(0, 3);
          setData(top3);
        }
      })
      .catch((err) => console.error('Error fetching CVE data:', err));
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-6 border">
      {/* <h2 className="text-xl font-bold text-center mb-4 text-gray-800">
        Top CVE IDs (High Severity)
      </h2> */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border">
          <thead className="bg-gray-100 font-semibold text-gray-700">
            <tr>
              <th className="px-4 py-2 border">CVE ID</th>
              <th className="px-4 py-2 border">Severity</th>
              <th className="px-4 py-2 border">Count</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 border font-mono">{item.cve_id}</td>
                <td className="px-4 py-2 border text-sm capitalize">
                  <span
                    className={`inline-block px-2 py-1 rounded ${
                      severityColors[item.severity] || severityColors.Default
                    }`}
                  >
                    {item.severity}
                  </span>
                </td>
                <td className="px-4 py-2 border font-semibold">{item.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
