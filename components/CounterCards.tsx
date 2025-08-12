// 'use client';

// import { useEffect, useState } from 'react';

// export default function CounterCards() {
//   const [data, setData] = useState({
//     cve_count: 0,
//     vulnerability_count: 0,
//     server_count: 0,
//   });

//   useEffect(() => {
//     fetch('http://128.2.99.223/cve-count')
//       .then(res => res.json())
//       .then(res => setData(prev => ({ ...prev, cve_count: res.vulnerability_count })));

//     fetch('http://128.2.99.223/vulnerability-count')
//       .then(res => res.json())
//       .then(res => setData(prev => ({ ...prev, vulnerability_count: res.vulnerability_count })));

//     fetch('http://128.2.99.223/server-count')
//       .then(res => res.json())
//       .then(res => setData(prev => ({ ...prev, server_count: res.vulnerability_count })));
//   }, []);

//   const cards = [
//     { title: 'Critical', value: data.cve_count, color: 'text-blue-700' },
//     { title: 'High', value: data.vulnerability_count, color: 'text-red-600' },
//     { title: 'Low', value: data.server_count, color: 'text-green-600' },
//     { title: 'Medium', value: 12345, color: 'text-yellow-600' },
//     { title: 'Total Vulnerabilities', value: 67890, color: 'text-purple-600' },
//     { title: 'Total Server Count', value: 9876, color: 'text-pink-600' },
//   ];

//   return (
//     <div className="w-full px-4">
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
//         {cards.map((card, idx) => (
//           <div
//             key={idx}
//             className="bg-white rounded-xl shadow p-6 text-center border hover:shadow-lg transition"
//           >
//             <h3 className="text-md text-gray-500 font-semibold mb-2">{card.title}</h3>
//             <p className={`text-3xl font-bold ${card.color}`}>{card.value.toLocaleString()}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// 'use client';

// import { useEffect, useState } from 'react';

// const SEVERITY_MAP = {
//   1: 'Critical',
//   2: 'High',
//   3: 'Medium',
//   4: 'Low',
// };

// export default function CounterCards() {
//   const [counts, setCounts] = useState({
//     Critical: 0,
//     High: 0,
//     Medium: 0,
//     Low: 0,
//   });

//   useEffect(() => {
//     async function fetchSeverityCounts() {
//       try {
//         const promises = Object.keys(SEVERITY_MAP).map(async (id) => {
//           const res = await fetch(`http://128.2.99.235/vuln-count/${id}`);
//           const data = await res.json();
//           return { severity: SEVERITY_MAP[id], count: data.count ?? 0 };
//         });

//         const results = await Promise.all(promises);

//         const newCounts = results.reduce((acc, { severity, count }) => {
//           acc[severity] = count;
//           return acc;
//         }, {});

//         setCounts(newCounts);
//       } catch (error) {
//         console.error('Error fetching severity counts:', error);
//       }
//     }

//     fetchSeverityCounts();
//   }, []);

//   const cards = [
//     { title: 'Critical', value: counts.Critical, color: 'text-blue-700' },
//     { title: 'High', value: counts.High, color: 'text-red-600' },
//     { title: 'Medium', value: counts.Medium, color: 'text-yellow-600' },
//     { title: 'Low', value: counts.Low, color: 'text-green-600' },
//   ];

//   return (
//     <div className="w-full px-4">
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//         {cards.map((card, idx) => (
//           <div
//             key={idx}
//             className="bg-white rounded-xl shadow p-6 text-center border hover:shadow-lg transition"
//           >
//             <h3 className="text-md text-gray-500 font-semibold mb-2">{card.title}</h3>
//             <p className={`text-3xl font-bold ${card.color}`}>{card.value.toLocaleString()}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


// 'use client';

// import { useEffect, useState } from 'react';

// const SEVERITY_MAP = {
//   1: 'Critical',
//   2: 'High',
//   3: 'Medium',
//   4: 'Low',
// };

// export default function CounterCards() {
//   const [counts, setCounts] = useState({
//     Critical: 0,
//     High: 0,
//     Medium: 0,
//     Low: 0,
//     Total: 0,
//   });

//   useEffect(() => {
//     async function fetchSeverityCounts() {
//       try {
//         // Fetch individual severities
//         const severityPromises = Object.keys(SEVERITY_MAP).map(async (id) => {
//           const res = await fetch(`http://128.2.99.235/vuln-count/${id}`);
//           const data = await res.json();
//           return { severity: SEVERITY_MAP[id], count: data.count ?? 0 };
//         });

//         // Fetch total vulnerabilities
//         const totalPromise = fetch(`http://128.2.99.235/vuln-count`)
//           .then((res) => res.json())
//           .then((data) => ({ severity: 'Total', count: data.count ?? 0 }));

//         const results = await Promise.all([...severityPromises, totalPromise]);

//         const newCounts = results.reduce((acc, { severity, count }) => {
//           acc[severity] = count;
//           return acc;
//         }, {} as Record<string, number>);

//         setCounts((prev) => ({ ...prev, ...newCounts }));
//       } catch (error) {
//         console.error('Error fetching severity counts:', error);
//       }
//     }

//     fetchSeverityCounts();
//   }, []);

//   const cards = [
//     { title: 'Critical', value: counts.Critical, color: 'text-blue-700' },
//     { title: 'High', value: counts.High, color: 'text-red-600' },
//     { title: 'Medium', value: counts.Medium, color: 'text-yellow-600' },
//     { title: 'Low', value: counts.Low, color: 'text-green-600' },
//     { title: 'Total Vulnerability', value: counts.Total, color: 'text-purple-600' },
//   ];

//   return (
//     <div className="w-full px-4">
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
//         {cards.map((card, idx) => (
//           <div
//             key={idx}
//             className="bg-white rounded-xl shadow p-6 text-center border hover:shadow-lg transition"
//           >
//             <h3 className="text-md text-gray-500 font-semibold mb-2">{card.title}</h3>
//             <p className={`text-3xl font-bold ${card.color}`}>
//               {card.value.toLocaleString()}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


'use client';

import { useEffect, useState } from 'react';

const SEVERITY_MAP = {
  1: 'Critical',
  2: 'High',
  3: 'Medium',
  4: 'Low',
};

export default function CounterCards() {
  const [counts, setCounts] = useState({
    Critical: 0,
    High: 0,
    Medium: 0,
    Low: 0,
    Total: 0,
    Servers: 0,
  });

  useEffect(() => {
    async function fetchSeverityCounts() {
      try {
        // Fetch individual severities
        const severityPromises = Object.keys(SEVERITY_MAP).map(async (id) => {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/vuln-count/${id}`);
          // const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/fim-count`);
          
          const data = await res.json();
          return { severity: SEVERITY_MAP[id], count: data.count ?? 0 };
        });

        // Fetch total vulnerabilities
        // const totalPromise = fetch(`http://128.2.99.235/vuln-count`)

        const totalPromise = fetch(`${process.env.NEXT_PUBLIC_API_BASE}/vuln-count`)

        // const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/fim-count`);

          .then((res) => res.json())
          .then((data) => ({ severity: 'Total', count: data.count ?? 0 }));

        // Fetch total server count
        const serverPromise = fetch(`${process.env.NEXT_PUBLIC_API_BASE}/get-Agents`)
        
          .then((res) => res.json())
          .then((data) => ({ severity: 'Servers', count: data.count ?? 0 }));

        const results = await Promise.all([
          ...severityPromises,
          totalPromise,
          serverPromise,
        ]);

        const newCounts = results.reduce((acc, { severity, count }) => {
          acc[severity] = count;
          return acc;
        }, {} as Record<string, number>);

        setCounts((prev) => ({ ...prev, ...newCounts }));
      } catch (error) {
        console.error('Error fetching severity counts:', error);
      }
    }

    fetchSeverityCounts();
  }, []);

  const cards = [
    { title: 'Critical', value: counts.Critical, color: 'text-blue-700' },
    { title: 'High', value: counts.High, color: 'text-red-600' },
    { title: 'Medium', value: counts.Medium, color: 'text-yellow-600' },
    { title: 'Low', value: counts.Low, color: 'text-green-600' },
    { title: 'Total Vulnerability', value: counts.Total, color: 'text-purple-600' },
    { title: 'Total Server Count', value: counts.Servers, color: 'text-teal-600' }, // new color
  ];

  return (
    <div className="w-full px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-6">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow p-6 text-center border hover:shadow-lg transition"
          >
            <h3 className="text-md text-gray-500 font-semibold mb-2">{card.title}</h3>
            <p className={`text-3xl font-bold ${card.color}`}>
              {card.value.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
