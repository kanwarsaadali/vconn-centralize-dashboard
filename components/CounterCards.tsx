'use client';

import { useEffect, useState } from 'react';

export default function CounterCards() {
  const [data, setData] = useState({
    cve_count: 0,
    vulnerability_count: 0,
    server_count: 0,
  });

  useEffect(() => {
    fetch('http://128.2.99.223/cve-count')
      .then(res => res.json())
      .then(res => setData(prev => ({ ...prev, cve_count: res.vulnerability_count })));

    fetch('http://128.2.99.223/vulnerability-count')
      .then(res => res.json())
      .then(res => setData(prev => ({ ...prev, vulnerability_count: res.vulnerability_count })));

    fetch('http://128.2.99.223/server-count')
      .then(res => res.json())
      .then(res => setData(prev => ({ ...prev, server_count: res.vulnerability_count })));
  }, []);

  const cards = [
    { title: 'Critical', value: data.cve_count, color: 'text-blue-700' },
    { title: 'High', value: data.vulnerability_count, color: 'text-red-600' },
    { title: 'Low', value: data.server_count, color: 'text-green-600' },
    { title: 'Medium', value: 12345, color: 'text-yellow-600' },
    { title: 'Total Vulnerabilities', value: 67890, color: 'text-purple-600' },
    { title: 'Total Server Count', value: 9876, color: 'text-pink-600' },
  ];

  return (
    <div className="w-full px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow p-6 text-center border hover:shadow-lg transition"
          >
            <h3 className="text-md text-gray-500 font-semibold mb-2">{card.title}</h3>
            <p className={`text-3xl font-bold ${card.color}`}>{card.value.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
