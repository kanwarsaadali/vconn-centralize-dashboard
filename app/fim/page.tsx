
'use client';

import SidebarLayout from '@/components/SidebarLayout';
import FimCounterCard from '@/components/FimCounterCard';
import FimEventBar from '@/components/FimEventBar';
import FimEnvironmentDonut from '@/components/FimEnvironmentDonut';
import FimEventDonut from '@/components/FimEventDonut';
import FimDetailsTable from '@/components/FimDetailsTable';

export default function FimPage() {
  return (
    <SidebarLayout>
      <div className="p-6 space-y-6 bg-gray-100 min-h-screen">

        {/* 🔳 Navbar */}
        <div className="bg-white p-4 rounded-xl shadow border border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">FIM Dashboard</h1>
        </div>

        {/* 🔳 Main Grid: Left = Counter+Bar | Right = Donuts (2x height) */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

          {/* Left Column: Total Count + Bar Graph (stacked vertically) */}
          <div className="flex flex-col space-y-4">

            {/* Smaller Counter */}
            <FimCounterCard small />

            {/* Bar Graph under Counter */}
            <FimEventBar />
          </div>

          {/* Right Side: Donuts (spanning 2 rows) */}
          <div className="col-span-2 grid grid-cols-2 gap-4">

            <FimEnvironmentDonut />
            <FimEventDonut />
          </div>
        </div>

        {/* 📋 Table Section */}
        <div>
          <FimDetailsTable />
        </div>

      </div>
    </SidebarLayout>
  );
}
