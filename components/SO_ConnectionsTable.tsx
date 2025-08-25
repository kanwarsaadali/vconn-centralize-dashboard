'use client';

import { useEffect, useState } from 'react';

const Table = ({ children, className }: React.HTMLAttributes<HTMLTableElement>) => (
  <table className={`w-full text-sm text-left border-collapse ${className}`}>{children}</table>
);

const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <thead className="bg-gray-100 text-gray-700">{children}</thead>
);

const TableBody = ({ children }: { children: React.ReactNode }) => (
  <tbody className="divide-y divide-gray-200">{children}</tbody>
);

const TableRow = ({ children }: { children: React.ReactNode }) => (
  <tr className="hover:bg-gray-50">{children}</tr>
);

const TableHead = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <th className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider ${className}`}>{children}</th>
);

const TableCell = ({ children }: { children: React.ReactNode }) => (
  <td className="px-4 py-2 whitespace-nowrap">{children}</td>
);

type APIItem = {
  Source_ip: string | null;
  Source_port: number | null;
  Dest_Country: string | null;
  Dest_ip: string | null;
  Dest_port?: number | null;
  Count: number;
};

export default function SO_ConnectionsTable() {
  const [data, setData] = useState<APIItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20;

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/ip-info`)
      .then((res) => res.json())
      .then((resData) => {
        if (resData && resData.data) {
          setData(resData.data);
        }
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = data.slice(startIndex, startIndex + rowsPerPage);
  const totalAlerts = data.reduce((sum, row) => sum + row.Count, 0);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="w-full bg-white p-4 rounded-2xl shadow border border-gray-200">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Connections Table</h2>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <>
          <div className="overflow-x-auto w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Source IP</TableHead>
                  <TableHead>Source Port</TableHead>
                  <TableHead>Destination Country</TableHead>
                  <TableHead>Destination IP</TableHead>
                  <TableHead>Destination Port</TableHead>
                  <TableHead>Alert Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentData.map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{row.Source_ip ?? '-'}</TableCell>
                    <TableCell>{row.Source_port ?? '-'}</TableCell>
                    <TableCell>{row.Dest_Country ?? '-'}</TableCell>
                    <TableCell>{row.Dest_ip ?? '-'}</TableCell>
                    <TableCell>{row.Dest_port ?? '-'}</TableCell>
                    <TableCell>{row.Count}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={5} className="text-right font-bold">
                    Total
                  </TableCell>
                  <TableCell className="font-bold">{totalAlerts}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

