'use client';

type Props = {
  data: {
    owner: string;
    critical: number;
    high: number;
    low: number;
    total: number;
  }[];
};

export default function OwnerTable({ data }: Props) {
  return (
    <div className="bg-white rounded-lg shadow p-6 border">
      <h3 className="text-xl font-bold text-center mb-4 text-gray-800">
        Vulnerabilities by Department
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border">
          <thead className="bg-gray-100 font-semibold text-gray-700">
            <tr>
              <th className="px-4 py-2 border">Owner</th>
              <th className="px-4 py-2 border text-red-700">Critical</th>
              <th className="px-4 py-2 border text-orange-700">High</th>
              <th className="px-4 py-2 border text-yellow-700">Low</th>
              <th className="px-4 py-2 border text-blue-700">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 border font-medium">{row.owner}</td>
                <td className="px-4 py-2 border text-red-600">{row.critical}</td>
                <td className="px-4 py-2 border text-orange-600">{row.high}</td>
                <td className="px-4 py-2 border text-yellow-600">{row.low}</td>
                <td className="px-4 py-2 border text-blue-600">{row.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
