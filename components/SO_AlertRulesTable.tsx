'use client';

import { useEffect, useState } from 'react';

type AlertRule = {
  Alert_rule_name: string;
  Rule_category: string;
  Rule_confidence: string | null;
  Reference: string;
  Count: number;
};

export default function SO_AlertRulesTable() {
  const [alertRules, setAlertRules] = useState<AlertRule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAlertRules() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/alert-rules`);
        const json = await res.json();
        setAlertRules(json.data || []);
      } catch (err) {
        console.error('Failed to fetch alert rules', err);
      } finally {
        setLoading(false);
      }
    }
    fetchAlertRules();
  }, []);

  const totalCount = alertRules.reduce((sum, rule) => sum + (rule.Count || 0), 0);

  if (loading) {
    return <div className="p-4">Loading alert rules...</div>;
  }

  return (
    <div className="bg-white p-4 rounded-2xl shadow border border-gray-200 overflow-hidden">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Alert Rules</h2>

      {/* Scrollable container */}
      <div className="overflow-y-auto max-h-[420px]">
        <table className="min-w-full table-auto text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs sticky top-0 z-10">
            <tr>
              <th className="px-4 py-2">Alert Rule Name</th>
              <th className="px-4 py-2">Rule Category</th>
              <th className="px-4 py-2">Rule Confidence</th>
              <th className="px-4 py-2">Reference URL</th>
              <th className="px-4 py-2 text-right">Count</th>
            </tr>
          </thead>
          <tbody>
            {alertRules.map((rule, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{rule.Alert_rule_name}</td>
                <td className="px-4 py-2">{rule.Rule_category || '-'}</td>
                <td className="px-4 py-2">{rule.Rule_confidence || '-'}</td>
                <td className="px-4 py-2">
                  <a
                    href={rule.Reference}
                    className="text-blue-600 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {rule.Reference}
                  </a>
                </td>
                <td className="px-4 py-2 text-right">{rule.Count}</td>
              </tr>
            ))}
            <tr className="font-semibold bg-gray-50 sticky bottom-0">
              <td colSpan={4} className="px-4 py-2 text-right">Total</td>
              <td className="px-4 py-2 text-right">{totalCount}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
