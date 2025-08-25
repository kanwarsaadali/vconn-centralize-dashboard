'use client';

import React, { useEffect, useState } from 'react';

type Server = {
  Hostname: string;
  Ip_Address: string;
  Server_Name: string;
  status: string;
  owner: string | null;
  environment: string | null;
  count: number;
};

const statusColors: Record<string, string> = {
  Online: 'bg-green-500',
  Offline: 'bg-red-500',
  Maintenance: 'bg-yellow-400',
};

export default function ImpactedServersTable() {
  const [servers, setServers] = useState<Server[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/impacted-servers`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.data) {
          setServers(data.data);
        }
      })
      .catch((err) => console.error('Error fetching servers:', err))
      .finally(() => setLoading(false));
  }, []);

  const mapStatus = (status: string) => {
    if (status.toLowerCase() === 'active') return 'Online';
    if (status.toLowerCase() === 'disconnected') return 'Offline';
    return status;
  };

  if (loading) {
    return <div className="p-4">Loading impacted servers...</div>;
  }

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
            <th className="p-2 border">Department</th>
            <th className="p-2 border">Environment</th>
            <th className="p-2 border">Event Count</th>
          </tr>
        </thead>
        <tbody>
          {servers.map((server) => {
            const statusLabel = mapStatus(server.status);
            return (
              <tr key={server.Hostname}>
                <td className="p-2 border">{server.Hostname}</td>
                <td className="p-2 border">{server.Server_Name}</td>
                <td className="p-2 border">{server.Ip_Address}</td>
                <td className="p-2 border">
                  <span
                    className={`text-white px-2 py-1 rounded ${
                      statusColors[statusLabel] || 'bg-gray-400'
                    }`}
                  >
                    {statusLabel}
                  </span>
                </td>
                <td className="p-2 border">{server.owner || '-'}</td>
                <td className="p-2 border">{server.environment || '-'}</td>
                <td className="p-2 border">{server.count}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
