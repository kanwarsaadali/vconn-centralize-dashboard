'use client';

import React, { useEffect, useState } from 'react';

type CVEItem = {
  cve_id: string;
  description: string;
  remediation: string;
};

export default function CveDetailsTable() {
  const [cveList, setCveList] = useState<CVEItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  useEffect(() => {
    fetch('http://128.2.99.223/vuln-summary')
      .then(res => res.json())
      .then(data => {
        if (data?.data) {
          setCveList(data.data);
        }
      })
      .catch(err => {
        console.error('Error fetching CVE details:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const toggleRow = (index: number) => {
    setExpandedRows(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const isExpanded = (index: number) => expandedRows.includes(index);

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>CVE ID Description and Remediation</h2>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading...</p>
      ) : cveList.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No data available</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={{ ...styles.th, width: '180px', minWidth: '180px' }}>CVE ID</th>
                <th style={styles.th}>Description</th>
                <th style={styles.th}>Remediation</th>
              </tr>
            </thead>
            <tbody>
              {cveList.map((item, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? '#f9fafb' : '#ffffff',
                    cursor: 'pointer',
                  }}
                  onClick={() => toggleRow(index)}
                >
                  <td style={{ ...styles.td, width: '180px', minWidth: '180px' }}>{item.cve_id}</td>

                  <td style={styles.td}>
                    <div
                      style={{
                        whiteSpace: 'pre-wrap',
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: isExpanded(index) ? 'unset' : 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {item.description}
                    </div>
                    <div style={styles.more}>
                      {isExpanded(index) ? '▲ Show Less' : '▼ Show More'}
                    </div>
                  </td>

                  <td style={styles.td}>
                    <div
                      style={{
                        whiteSpace: 'pre-wrap',
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: isExpanded(index) ? 'unset' : 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {item.remediation}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    marginTop: '24px',
    maxHeight: '500px',
    overflowY: 'auto',
  },
  title: {
    fontSize: '18px',
    fontWeight: 600,
    textAlign: 'center',
    marginBottom: '16px',
    color: '#374151',
  },
  table: {
    width: '100%',
    minWidth: '800px', // 👈 Ensures table doesn't squash on small viewports
    borderCollapse: 'collapse',
  },
  th: {
    border: '1px solid #ccc',
    padding: '10px',
    backgroundColor: '#f9fafb',
    textAlign: 'left',
    fontWeight: 'bold',
    position: 'sticky',
    top: 0,
    background: '#f9fafb',
    zIndex: 1,
  },
  td: {
    border: '1px solid #ddd',
    padding: '10px',
    verticalAlign: 'top',
    fontSize: '14px',
  },
  more: {
    marginTop: 6,
    fontSize: '12px',
    color: '#3b82f6',
    cursor: 'pointer',
  },
};
