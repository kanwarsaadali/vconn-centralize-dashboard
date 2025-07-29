'use client';

export default function SO_SummaryCards() {
  const stats = {
    totalAlerts: 1234,
    critical: 456,
    warning: 321,
    info: 111,
  };

  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 w-full">
      <div className="bg-white rounded-xl shadow p-3 text-center">
        <div className="text-xl font-bold">{stats.totalAlerts.toLocaleString()}</div>
        <div className="text-sm text-gray-600">Total Alerts</div>
      </div>
      <div className="bg-white rounded-xl shadow p-3 text-center">
        <div className="text-xl font-bold text-red-600">{stats.critical.toLocaleString()}</div>
        <div className="text-sm text-red-600">Critical</div>
      </div>
      <div className="bg-white rounded-xl shadow p-3 text-center">
        <div className="text-xl font-bold text-yellow-600">{stats.warning.toLocaleString()}</div>
        <div className="text-sm text-yellow-600">Warning</div>
      </div>
      <div className="bg-white rounded-xl shadow p-3 text-center">
        <div className="text-xl font-bold text-blue-600">{stats.info.toLocaleString()}</div>
        <div className="text-sm text-blue-600">Info</div>
      </div>
    </div>
  );
}
