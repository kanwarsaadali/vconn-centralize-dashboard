'use client';

import SidebarLayout from '@/components/SidebarLayout';
import EventCounterCards from '@/components/EventCounterCards';
import StatusCodeDonut from '@/components/StatusCodeDonut';
import EnvironmentDonut from '@/components/EnvironmentDonut';
import TargetUserBar from '@/components/TargetUserBar';
import SourceIpBar from '@/components/SourceIpBar';
import ImpactedServersTable from '@/components/ImpactedServersTable';
import RecentLogsTable from '@/components/RecentLogsTable';
import EventMap from '@/components/EventMap';

export default function EventPage() {
  return (
    <SidebarLayout>
      <div className="w-full px-4 py-6 space-y-6 bg-gray-100 min-h-screen overflow-x-hidden">

        {/* ✅ Navbar */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Event Dashboard</h1>
        </div>

        {/* 🔳 Grid: Counters + Donuts + Bars + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="flex flex-col space-y-4">
            <EventCounterCards />
            <div className="min-h-[300px]">
              <EventMap />
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <StatusCodeDonut />
            <TargetUserBar />
          </div>

          <div className="flex flex-col space-y-4">
            <EnvironmentDonut />
            <SourceIpBar />
          </div>
        </div>

        {/* 📋 Tables */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-6">
          <div className="overflow-x-auto">
            <ImpactedServersTable />
          </div>
          <div className="overflow-x-auto">
            <RecentLogsTable />
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
