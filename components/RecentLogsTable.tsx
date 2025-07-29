'use client';

import React from 'react';

const logs = [
  { time: '2025-07-04 10:00', message: 'Unauthorized access attempt', severity: 'High' },
  { time: '2025-07-04 09:45', message: 'Server restarted', severity: 'Info' },
  { time: '2025-07-04 09:30', message: 'Disk space low', severity: 'Medium' },
  { time: '2025-07-04 09:15', message: 'Failed login detected', severity: 'High' },
];

const severityColors: Record<string, string> = {
  High: 'bg-red-500',
  Medium: 'bg-yellow-400',
  Info: 'bg-blue-500',
};

export default function RecentLogsTable() {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
      <h2 className="text-lg font-semibold mb-4">Recent Log Events</h2>
      <table className="w-full text-sm text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="p-2 border">Timestamp</th>
            <th className="p-2 border">Message</th>
            <th className="p-2 border">Severity</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td className="p-2 border">{log.time}</td>
              <td className="p-2 border">{log.message}</td>
              <td className="p-2 border">
                <span
                  className={`text-white px-2 py-1 rounded ${severityColors[log.severity]}`}
                >
                  {log.severity}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
