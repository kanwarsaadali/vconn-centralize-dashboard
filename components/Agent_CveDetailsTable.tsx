// 'use client';

// import { useState } from 'react';

// const Table = ({ children, className }: React.HTMLAttributes<HTMLTableElement>) => (
//   <table className={`w-full text-sm text-left border-collapse ${className}`}>{children}</table>
// );

// const TableHeader = ({ children }: { children: React.ReactNode }) => (
//   <thead className="bg-gray-100 text-gray-700">{children}</thead>
// );

// const TableBody = ({ children }: { children: React.ReactNode }) => (
//   <tbody className="divide-y divide-gray-200">{children}</tbody>
// );

// const TableRow = ({ children }: { children: React.ReactNode }) => (
//   <tr className="hover:bg-gray-50">{children}</tr>
// );

// const TableHead = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
//   <th className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider ${className}`}>{children}</th>
// );

// const TableCell = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
//   <td className={`px-4 py-2 whitespace-nowrap ${className}`}>{children}</td>
// );

// type ServerItem = {
//   server_environment: string;
//   agent_name: string;
//   ip_address: string;
//   server_owner: string;
//   client_name: string;
//   cs_owner: string;
//   wazuh_status: string;
//   wazuh_last_update: string;
//   so_status: string;
//   so_last_update: string;
// };

// export default function ServerTable() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 10;

//   const dummyData: ServerItem[] = [
//     {
//       server_environment: 'PROD',
//       agent_name: 'csonlinapp_ibm',
//       ip_address: '52.116.35.90',
//       server_owner: 'S Irfan',
//       client_name: 'Centegy',
//       cs_owner: 'Shahzaib',
//       wazuh_status: 'active',
//       wazuh_last_update: '5/13/2025 4:23:46 PM',
//       so_status: 'active',
//       so_last_update: '1/4/2025 10:01:56 PM',
//     },
//     {
//       server_environment: 'Dev-App',
//       agent_name: 'GBATPMSAPP',
//       ip_address: '10.10.2.197',
//       server_owner: 'M Anwar',
//       client_name: 'Centegy Retails',
//       cs_owner: 'N/A',
//       wazuh_status: 'active',
//       wazuh_last_update: '3/6/2025 12:05:36 AM',
//       so_status: 'active',
//       so_last_update: '6/9/2025 6:23:24 AM',
//     },
//     {
//       server_environment: 'Production',
//       agent_name: 'PRDONLINEINV',
//       ip_address: '10.1.102.49',
//       server_owner: 'M Anwar',
//       client_name: 'Centegy Retails',
//       cs_owner: 'N/A',
//       wazuh_status: 'active',
//       wazuh_last_update: '2/26/2025 9:04:44 PM',
//       so_status: 'disconnected',
//       so_last_update: '1/17/2025 5:46:17 AM',
//     },
//     {
//       server_environment: 'PROD',
//       agent_name: 'PRDDOLSONAPP',
//       ip_address: '10.1.102.67',
//       server_owner: 'S Irfan',
//       client_name: 'Centegy Retails (Kolson)',
//       cs_owner: 'Ibrahim',
//       wazuh_status: 'active',
//       wazuh_last_update: '1/14/2025 8:58:09 PM',
//       so_status: 'disconnected',
//       so_last_update: '4/25/2025 3:44:45 PM',
//     },
//   ];

//   const totalPages = Math.ceil(dummyData.length / rowsPerPage);
//   const startIndex = (currentPage - 1) * rowsPerPage;
//   const currentData = dummyData.slice(startIndex, startIndex + rowsPerPage);

//   const handlePrev = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   const handleNext = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   return (
//     <div className="w-full bg-white p-4 rounded-2xl shadow border border-gray-200">
//       <h2 className="text-lg font-semibold mb-4 text-gray-800">Servers Table</h2>
//       <div className="overflow-x-auto w-full">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Server Env</TableHead>
//               <TableHead>Agent Name</TableHead>
//               <TableHead>IP Address</TableHead>
//               <TableHead>Server Owner</TableHead>
//               <TableHead>Client Name</TableHead>
//               <TableHead>CS Owner</TableHead>
//               <TableHead>Wazuh Status</TableHead>
//               <TableHead>Wazuh Last Update</TableHead>
//               <TableHead>SO Status</TableHead>
//               <TableHead>SO Last Update</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {currentData.map((row, idx) => (
//               <TableRow key={idx}>
//                 <TableCell>{row.server_environment}</TableCell>
//                 <TableCell>{row.agent_name}</TableCell>
//                 <TableCell>{row.ip_address}</TableCell>
//                 <TableCell>{row.server_owner}</TableCell>
//                 <TableCell>{row.client_name}</TableCell>
//                 <TableCell>{row.cs_owner}</TableCell>
//                 <TableCell className={row.wazuh_status === 'active' ? 'text-green-600 font-medium' : 'text-red-600'}>
//                   {row.wazuh_status}
//                 </TableCell>
//                 <TableCell>{row.wazuh_last_update}</TableCell>
//                 <TableCell className={row.so_status === 'active' ? 'text-green-600 font-medium' : 'text-red-600'}>
//                   {row.so_status}
//                 </TableCell>
//                 <TableCell>{row.so_last_update}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-between items-center mt-4">
//         <button
//           onClick={handlePrev}
//           disabled={currentPage === 1}
//           className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//         >
//           Prev
//         </button>
//         <span className="text-sm text-gray-600">
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           onClick={handleNext}
//           disabled={currentPage === totalPages}
//           className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }


'use client';

import { useState, useEffect } from 'react';

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

const TableCell = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <td className={`px-4 py-2 whitespace-nowrap ${className}`}>{children}</td>
);

type ServerItem = {
  server_environment: string;
  agent_name: string;
  ip_address: string;
  server_owner: string;
  client_name: string | null;
  cs_owner: string | null;
  wazuh_status: string;
  wazuh_last_update?: string;
  so_status?: string;
  so_last_update?: string;
};

export default function ServerTable() {
  const [data, setData] = useState<ServerItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 15;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServers = async () => {
      try {
        const res = await fetch('http://128.2.99.235/agents-info');
        const json = await res.json();

        // normalize keys to match our type
        const normalized: ServerItem[] = json.data.map((item: any) => ({
          server_environment: item.Server_Environment || '',
          agent_name: item.Agent_Name || '',
          ip_address: item.Ip_Address || '',
          server_owner: item.Server_Owner || '',
          client_name: item.client_name || '',
          cs_owner: item.cs_owner || '',
          wazuh_status: item.wazuh_status || '',
          wazuh_last_update: item.wazuh_last_update || '-',
          so_status: item.so_status || '-',
          so_last_update: item.so_last_update || '-',
        }));

        setData(normalized);
      } catch (err) {
        console.error('Failed to fetch server data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServers();
  }, []);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = data.slice(startIndex, startIndex + rowsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="w-full bg-white p-4 rounded-2xl shadow border border-gray-200">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Servers Table</h2>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <>
          <div className="overflow-x-auto w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Server Env</TableHead>
                  <TableHead>Agent Name</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Server Owner</TableHead>
                  <TableHead>Client Name</TableHead>
                  <TableHead>CS Owner</TableHead>
                  <TableHead>Wazuh Status</TableHead>
                  <TableHead>Wazuh Last Update</TableHead>
                  <TableHead>SO Status</TableHead>
                  <TableHead>SO Last Update</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentData.map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{row.server_environment}</TableCell>
                    <TableCell>{row.agent_name}</TableCell>
                    <TableCell>{row.ip_address}</TableCell>
                    <TableCell>{row.server_owner}</TableCell>
                    <TableCell>{row.client_name || '-'}</TableCell>
                    <TableCell>{row.cs_owner || '-'}</TableCell>
                    <TableCell className={row.wazuh_status === 'active' ? 'text-green-600 font-medium' : 'text-red-600'}>
                      {row.wazuh_status}
                    </TableCell>
                    <TableCell>{row.wazuh_last_update}</TableCell>
                    <TableCell className={row.so_status === 'active' ? 'text-green-600 font-medium' : 'text-red-600'}>
                      {row.so_status}
                    </TableCell>
                    <TableCell>{row.so_last_update}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages || totalPages === 0}
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
