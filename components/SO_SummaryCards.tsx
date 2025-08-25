'use client';

import { useEffect, useState } from 'react';

export default function SO_SummaryCards() {
  const [totalAlerts, setTotalAlerts] = useState(0);
  const [highSeverity, setHighSeverity] = useState(0);
  const [uniqueSourceIPs, setUniqueSourceIPs] = useState(0);
  const [uniqueDestinationIPs, setUniqueDestinationIPs] = useState(0);

  const animateNumber = (setter: React.Dispatch<React.SetStateAction<number>>, target: number) => {
    let start = 0;
    const duration = 800; // animation duration in ms
    const step = (timestamp: number, startTime: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setter(Math.floor(progress * target));
      if (progress < 1) {
        requestAnimationFrame((newTimestamp) => step(newTimestamp, startTime));
      }
    };
    requestAnimationFrame((timestamp) => step(timestamp, timestamp));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          totalRes,
          highRes,
          sourceRes,
          destRes
        ] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_BASE}/so-event-count`),
          fetch(`${process.env.NEXT_PUBLIC_API_BASE}/so-event-count?severity_label=High`),
          fetch(`${process.env.NEXT_PUBLIC_API_BASE}/unique-ip?ip_direction=source`),
          fetch(`${process.env.NEXT_PUBLIC_API_BASE}/unique-ip?ip_direction=destination`),
        ]);

        const totalData = await totalRes.json();
        const highData = await highRes.json();
        const sourceData = await sourceRes.json();
        const destData = await destRes.json();

        animateNumber(setTotalAlerts, totalData.count || 0);
        animateNumber(setHighSeverity, highData.count || 0);
        animateNumber(setUniqueSourceIPs, sourceData.count || 0);
        animateNumber(setUniqueDestinationIPs, destData.count || 0);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 w-full">
      <div className="bg-white rounded-xl shadow p-3 text-center outline outline-1 flex flex-col items-center justify-center">
        <div className="text-3xl font-bold">{totalAlerts.toLocaleString()}</div>
        <div className="text-base text-gray-600">Total Alerts</div>
      </div>
      <div className="bg-white rounded-xl shadow p-3 text-center outline outline-1 flex flex-col items-center justify-center">
        <div className="text-3xl font-bold text-red-600">{highSeverity.toLocaleString()}</div>
        <div className="text-base text-red-600">High Severity Alerts</div>
      </div>
      <div className="bg-white rounded-xl shadow p-3 text-center outline outline-1 flex flex-col items-center justify-center">
        <div className="text-3xl font-bold text-yellow-600">{uniqueSourceIPs.toLocaleString()}</div>
        <div className="text-base text-yellow-600">Unique Source IPs</div>
      </div>
      <div className="bg-white rounded-xl shadow p-3 text-center outline outline-1 flex flex-col items-center justify-center">
        <div className="text-3xl font-bold text-blue-600">{uniqueDestinationIPs.toLocaleString()}</div>
        <div className="text-base text-blue-600">Unique Destination IPs</div>
      </div>
    </div>
  );
}
