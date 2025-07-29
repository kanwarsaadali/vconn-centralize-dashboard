const data = [
  {
    agent: 'CENTEGYDEVVDI20',
    env: 'Dev',
    level: 35,
    owner: 'M Anwar',
    desc: 'Registry Value Integrity Checksum Changed',
    path: 'HKEY_LOCAL_MACHINE\\System\\CurrentControlSet\\Services\\bam\\State\\User',
  },
  {
    agent: 'PRDCLFEQMS',
    env: 'PROD',
    level: 28,
    owner: 'S Irfan',
    desc: 'Registry Value Integrity Checksum Changed',
    path: 'HKEY_LOCAL_MACHINE\\System\\CurrentControlSet\\Services\\VSS\\Diag\\VolSnap',
  },
];

export default function FimDetailsTable() {
  return (
    <div className="bg-white rounded-xl shadow p-4 overflow-x-auto border">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Detailed Events</h2>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left bg-gray-100">
            <th className="p-2">Agent Name</th>
            <th className="p-2">Environment</th>
            <th className="p-2">Level</th>
            <th className="p-2">Server Owner</th>
            <th className="p-2">Rule Description</th>
            <th className="p-2">Path</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="border-t">
              <td className="p-2">{row.agent}</td>
              <td className="p-2">{row.env}</td>
              <td className="p-2">{row.level}</td>
              <td className="p-2">{row.owner}</td>
              <td className="p-2">{row.desc}</td>
              <td className="p-2">{row.path}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
