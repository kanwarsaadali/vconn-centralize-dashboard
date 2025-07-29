'use client';

const Table = ({ children, className }: React.HTMLAttributes<HTMLTableElement>) => (
  <table className={`w-full text-sm text-left ${className}`}>{children}</table>
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

const data = [
  { id: 1, source: '192.168.1.10', destination: '10.0.0.2', protocol: 'TCP', status: 'Established' },
  { id: 2, source: '192.168.1.12', destination: '10.0.0.4', protocol: 'UDP', status: 'Listening' },
  { id: 3, source: '192.168.1.15', destination: '10.0.0.7', protocol: 'TCP', status: 'Closed' },
  { id: 4, source: '192.168.1.20', destination: '10.0.0.9', protocol: 'TCP', status: 'Established' },
];

export default function SO_ConnectionsTable() {
  return (
    <div className="bg-white p-4 rounded-2xl shadow border border-gray-200">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Connections Table</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>Source IP</TableHead>
              <TableHead>Destination IP</TableHead>
              <TableHead>Protocol</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((conn) => (
              <TableRow key={conn.id}>
                <TableCell>{conn.id}</TableCell>
                <TableCell>{conn.source}</TableCell>
                <TableCell>{conn.destination}</TableCell>
                <TableCell>{conn.protocol}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 text-sm rounded-full font-medium ${
                      conn.status === 'Established'
                        ? 'bg-green-100 text-green-700'
                        : conn.status === 'Listening'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {conn.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
