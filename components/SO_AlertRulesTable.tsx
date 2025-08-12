'use client';

type AlertRule = {
  id: string;
  ruleTag: string;
  cveId: string;
  ruleConfidence: string;
  referenceUrl: string;
  count: number;
};

const mockAlertRules: AlertRule[] = [
  {
    id: '1',
    ruleTag: 'authentication',
    cveId: 'CVE-2023-1234',
    ruleConfidence: 'High',
    referenceUrl: 'https://nvd.nist.gov/vuln/detail/CVE-2023-1234',
    count: 32,
  },
  {
    id: '2',
    ruleTag: 'network',
    cveId: 'CVE-2022-5678',
    ruleConfidence: 'Medium',
    referenceUrl: 'https://nvd.nist.gov/vuln/detail/CVE-2022-5678',
    count: 19,
  },
  {
    id: '3',
    ruleTag: 'malware',
    cveId: 'CVE-2021-8765',
    ruleConfidence: 'High',
    referenceUrl: 'https://nvd.nist.gov/vuln/detail/CVE-2021-8765',
    count: 45,
  },
  {
    id: '4',
    ruleTag: 'integrity',
    cveId: 'CVE-2024-1111',
    ruleConfidence: 'Low',
    referenceUrl: 'https://nvd.nist.gov/vuln/detail/CVE-2024-1111',
    count: 11,
  },
  ,
  {
    id: '2',
    ruleTag: 'network',
    cveId: 'CVE-2022-5678',
    ruleConfidence: 'Medium',
    referenceUrl: 'https://nvd.nist.gov/vuln/detail/CVE-2022-5678',
    count: 19,
  },
  {
    id: '3',
    ruleTag: 'malware',
    cveId: 'CVE-2021-8765',
    ruleConfidence: 'High',
    referenceUrl: 'https://nvd.nist.gov/vuln/detail/CVE-2021-8765',
    count: 45,
  },
  {
    id: '4',
    ruleTag: 'integrity',
    cveId: 'CVE-2024-1111',
    ruleConfidence: 'Low',
    referenceUrl: 'https://nvd.nist.gov/vuln/detail/CVE-2024-1111',
    count: 11,
  },
   ,
  {
    id: '2',
    ruleTag: 'network',
    cveId: 'CVE-2022-5678',
    ruleConfidence: 'Medium',
    referenceUrl: 'https://nvd.nist.gov/vuln/detail/CVE-2022-5678',
    count: 19,
  },
  {
    id: '3',
    ruleTag: 'malware',
    cveId: 'CVE-2021-8765',
    ruleConfidence: 'High',
    referenceUrl: 'https://nvd.nist.gov/vuln/detail/CVE-2021-8765',
    count: 45,
  },
  {
    id: '4',
    ruleTag: 'integrity',
    cveId: 'CVE-2024-1111',
    ruleConfidence: 'Low',
    referenceUrl: 'https://nvd.nist.gov/vuln/detail/CVE-2024-1111',
    count: 11,
  },
];

export default function SO_AlertRulesTable() {
  return (
    <div className="bg-white p-4 rounded-2xl shadow border border-gray-200 overflow-auto">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Alert Rules</h2>
      <table className="min-w-full table-auto text-sm text-left text-gray-700">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
            <th className="px-4 py-2">Rule Tag</th>
            <th className="px-4 py-2">CVE ID</th>
            <th className="px-4 py-2">Confidence</th>
            <th className="px-4 py-2">Reference</th>
            <th className="px-4 py-2">Count</th>
          </tr>
        </thead>
        <tbody>
          {mockAlertRules.map(rule => (
            <tr key={rule.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{rule.ruleTag}</td>
              <td className="px-4 py-2">{rule.cveId}</td>
              <td className="px-4 py-2">{rule.ruleConfidence}</td>
              <td className="px-4 py-2">
                <a
                  href={rule.referenceUrl}
                  className="text-blue-600 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Link
                </a>
              </td>
              <td className="px-4 py-2">{rule.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
