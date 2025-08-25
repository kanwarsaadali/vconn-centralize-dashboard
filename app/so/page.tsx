'use client';

import SO_SummaryCards from '@/components/SO_SummaryCards';
import SO_WorldMap from '@/components/SO_WorldMap';
import SO_SeverityDonut from '@/components/SO_SeverityDonut';
import SO_RuleTagsDonut from '@/components/SO_RuleTagsDonut';
import SO_AlertRulesTable from '@/components/SO_AlertRulesTable';
import SO_SeverityBar from '@/components/SO_SeverityBar';
import SO_ConnectionsTable from '@/components/SO_ConnectionsTable';
import SidebarLayout from '@/components/SidebarLayout';

export default function SODashboard() {
  return (
    <SidebarLayout>
      <main className="p-6 bg-gray-100 min-h-screen space-y-6">
        {/* 🔳 Navbar */}
        <div className="bg-white p-4 rounded-xl shadow border border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">SO Dashboard</h1>
        </div>

        {/* Row 1: Summary Cards + World Map + Severity Donut */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <SO_SummaryCards />
          <SO_WorldMap />
          <SO_SeverityDonut />
        </div>

        {/* Row 2: Rule Tags Donut + Alert Rules Table */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <SO_RuleTagsDonut />
          <div className="xl:col-span-2">
            <SO_AlertRulesTable />
          </div>
        </div>

        {/* Row 3: Connections Table (Full Width) */}
        <div className="w-full">
          <SO_ConnectionsTable />
        </div>
      </main>
    </SidebarLayout>
  );
}
