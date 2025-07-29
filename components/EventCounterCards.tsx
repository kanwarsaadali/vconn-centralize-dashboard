'use client';

import React from 'react';

const counters = [
  { title: 'Count of Event', value: 8427 },
  { title: 'Count of Server', value: 67 },
  { title: 'Count of User', value: 19 },
];

export default function EventCounterCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {counters.map((counter) => (
        <div
          key={counter.title}
          className="bg-white shadow-md rounded-lg p-6 text-center border border-gray-200"
        >
          <div className="text-3xl font-bold text-blue-600">{counter.value}</div>
          <div className="text-sm text-gray-500">{counter.title}</div>
        </div>
      ))}
    </div>
  );
}
