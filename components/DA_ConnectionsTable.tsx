
'use client';

const references = [
  { referenceUrl: 'https://community.emergingthreats.net', count: 2188 },
  { referenceUrl: 'https://example1.com', count: 1450 },
  { referenceUrl: 'https://example2.com', count: 765 },
  { referenceUrl: 'https://example3.com', count: 389 },
  { referenceUrl: 'https://community.emergingthreats.net', count: 2188 },
  { referenceUrl: 'https://example1.com', count: 1450 },
  { referenceUrl: 'https://example2.com', count: 765 },
  { referenceUrl: 'https://example3.com', count: 389 },{ referenceUrl: 'https://community.emergingthreats.net', count: 2188 },
  { referenceUrl: 'https://example1.com', count: 1450 },
  { referenceUrl: 'https://example2.com', count: 765 },
  { referenceUrl: 'https://example3.com', count: 389 },{ referenceUrl: 'https://community.emergingthreats.net', count: 2188 },
  { referenceUrl: 'https://example1.com', count: 1450 },
  { referenceUrl: 'https://example2.com', count: 765 },
  { referenceUrl: 'https://example3.com', count: 389 },{ referenceUrl: 'https://community.emergingthreats.net', count: 2188 },
  { referenceUrl: 'https://example1.com', count: 1450 },
  { referenceUrl: 'https://example2.com', count: 765 },
  { referenceUrl: 'https://example3.com', count: 389 },
];

export default function ReferenceCardGrid() {
  return (
    <div className="bg-white p-4 rounded-xl shadow border border-gray-300">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 text-center">
        Reference Breakdown
      </h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {references.map((ref, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 bg-white flex flex-col justify-between"
          >
            <div className="text-xs font-semibold text-gray-600 mb-1">Reference_URL</div>
            <a
              href={ref.referenceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 underline truncate mb-2"
            >
              {ref.referenceUrl}
            </a>
            <div className="text-sm text-gray-700">
              Count: <span className="font-bold">{ref.count}</span>
            </div>
            <div className="text-sm font-semibold text-gray-800 border-t pt-2 mt-2">
              Total: {ref.count}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
