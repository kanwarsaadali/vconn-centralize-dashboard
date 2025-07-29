'use client';

import React from 'react';

const servers = [
  {
    hostname: 'srv-prod-01',
    ip: '192.168.1.10',
    status: 'Online',
    owner: 'Ali',
    environment: 'Production',
    servername: 'nginx-prod',
    eventCount: 123,
  },
  {
    hostname: 'srv-stg-02',
    ip: '192.168.1.20',
    status: 'Offline',
    owner: 'Saad',
    environment: 'Staging',
    servername: 'app-staging',
    eventCount: 88,
  },
  {
    hostname: 'srv-prod-04',
    ip: '192.168.1.40',
    status: 'Online',
    owner: 'Zain',
    environment: 'Production',
    servername: 'db-prod',
    eventCount: 174,
  },
];

const statusColors: Record<string, string> = {
  Online: 'bg-green-500',
  Offline: 'bg-red-500',
  Maintenance: 'bg-yellow-400',
};

export default function ImpactedServersTable() {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
      <h2 className="text-lg font-semibold mb-4">Impacted Servers</h2>
      <table className="w-full text-sm text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="p-2 border">Hostname</th>
            <th className="p-2 border">Server Name</th>
            <th className="p-2 border">IP Address</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Owner</th>
            <th className="p-2 border">Environment</th>
            <th className="p-2 border">Event Count</th>
          </tr>
        </thead>
        <tbody>
          {servers.map((server) => (
            <tr key={server.hostname}>
              <td className="p-2 border">{server.hostname}</td>
              <td className="p-2 border">{server.servername}</td>
              <td className="p-2 border">{server.ip}</td>
              <td className="p-2 border">
                <span
                  className={`text-white px-2 py-1 rounded ${statusColors[server.status]}`}
                >
                  {server.status}
                </span>
              </td>
              <td className="p-2 border">{server.owner}</td>
              <td className="p-2 border">{server.environment}</td>
              <td className="p-2 border">{server.eventCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
