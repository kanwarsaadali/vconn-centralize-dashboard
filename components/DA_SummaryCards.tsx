'use client';

import { useEffect, useRef } from 'react';

export default function DA_SummaryCards() {
  const stats = {
    osCount: 64,
    osMax: 100,
    vulnerabilityScore: 526.81,
    eventCount: 8427,
    fimCount: 9476,
  };

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height;
    const radius = 50;

    const percentage = stats.osCount / stats.osMax; // e.g., 64 / 100 = 0.64

    const startAngle = Math.PI;
    const endAngle = Math.PI * (1 + percentage);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // background arc (full semicircle)
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, 2 * Math.PI);
    ctx.strokeStyle = '#E5E7EB';
    ctx.lineWidth = 12;
    ctx.stroke();

    // foreground arc (percentage fill)
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.strokeStyle = '#22C55E';
    ctx.lineWidth = 12;
    ctx.stroke();
  }, [stats.osCount, stats.osMax]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 w-full">
      {/* Count of OS Name with Gauge */}
      <div className="bg-white rounded-lg shadow p-3 text-center flex flex-col items-center border border-black">
        <div className="text-xl font-semibold text-gray-700">Count of OS Name</div>
        <canvas ref={canvasRef} width={120} height={80} className="mt-2 mb-2" />
        <div className="text-3xl font-extrabold text-green-600">{stats.osCount}</div>
        <div className="text-sm text-gray-500">
          ({((stats.osCount / stats.osMax) * 100).toFixed(1)}%)
        </div>
      </div>

      {/* Vulnerability */}
      <div className="bg-white rounded-lg shadow p-3 flex flex-col justify-center items-center text-center h-40 border border-black">
        <div className="text-xl font-semibold text-gray-700">Vulnerability</div>
        <div className="text-3xl font-extrabold">{stats.vulnerabilityScore}</div>
      </div>

      {/* Count of Event */}
      <div className="bg-white rounded-lg shadow p-3 flex flex-col justify-center items-center text-center h-40 border border-black">
        <div className="text-xl font-semibold text-gray-700">Count of Event</div>
        <div className="text-3xl font-extrabold">{stats.eventCount}</div>
      </div>

      {/* FIM Count */}
      <div className="bg-white rounded-lg shadow p-3 flex flex-col justify-center items-center text-center h-40 border border-black">
        <div className="text-xl font-semibold text-gray-700">FIM Count</div>
        <div className="text-3xl font-extrabold">{stats.fimCount}</div>
      </div>
    </div>
  );
}
