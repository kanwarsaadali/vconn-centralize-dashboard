'use client';

import DA_SummaryCards from '@/components/DA_SummaryCards';
import DA_StatusPieCharts from '@/components/DA_StatusPieCharts';
import DA_EventMap from '@/components/DA_EventMap';
import DA_VerticalsBars from '@/components/DA_VerticalsBars';
import DA_ConnectionsTable from '@/components/DA_ConnectionsTable';
import SidebarLayout from '@/components/SidebarLayout';

export default function DADashboardPage() {
  return (
    <SidebarLayout>
      <div className="p-4 space-y-6">
        {/* Top Summary Cards */}
        <DA_SummaryCards />

        {/* Middle Section with Responsive Layout */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 min-w-[300px]">
            <DA_EventMap />
          </div>
          <div className="flex-1 min-w-[300px]">
            <DA_StatusPieCharts />
          </div>
          <div className="flex-1 min-w-[300px]">
            <DA_VerticalsBars />
          </div>
        </div>

        {/* Bottom Table */}
        <DA_ConnectionsTable />
      </div>
    </SidebarLayout>
  );
}
