'use client';

import React, { useEffect, useState } from 'react';

type CVEItem = {
  cve_id: string;
  description: string;
  remediation: string;
};

const ITEMS_PER_PAGE = 10;

export default function CveDetailsTable() {
  const [cveList, setCveList] = useState<CVEItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/vuln_desc`)
      .then(res => res.json())
      .then(data => {
        if (data?.data) {
          const mapped = data.data.map((item: any) => ({
            cve_id: item.cve_id,
            description: item.Description,
            remediation: item.Remediation,
          }));
          setCveList(mapped);
        }
      })
      .catch(err => console.error('Error fetching CVE details:', err))
      .finally(() => setLoading(false));
  }, []);

  const totalPages = Math.ceil(cveList.length / ITEMS_PER_PAGE);

  // Calculate which items to show on the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleList = cveList.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const toggleRow = (index: number) => {
    setExpandedRows(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const isExpanded = (index: number) => expandedRows.includes(index);

  const goToPrevious = () => {
    setCurrentPage(page => Math.max(page - 1, 1));
  };

  const goToNext = () => {
    setCurrentPage(page => Math.min(page + 1, totalPages));
  };

  return (
    <div style={styles.card}>
      {/* <h2 style={styles.title}>CVE ID Description and Remediation</h2> */}

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading...</p>
      ) : cveList.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No data available</p>
      ) : (
        <>
          <div style={{ overflowX: 'auto' }}>
            {/* Table header */}
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={{ ...styles.th, width: '180px' }}>CVE ID</th>
                  <th style={styles.th}>Description</th>
                  <th style={styles.th}>Remediation</th>
                </tr>
              </thead>
            </table>

            {/* Scrollable tbody container */}
            <div style={styles.tbodyContainer}>
              <table style={{ ...styles.table, marginBottom: 0 }}>
                <tbody>
                  {visibleList.map((item, index) => (
                    <tr
                      key={startIndex + index}
                      style={{
                        backgroundColor: index % 2 === 0 ? '#f9fafb' : '#fff',
                        cursor: 'pointer',
                      }}
                      onClick={() => toggleRow(startIndex + index)}
                    >
                      <td style={{ ...styles.td, width: '180px' }}>{item.cve_id}</td>
                      <td style={styles.td}>
                        <div
                          style={{
                            whiteSpace: 'pre-wrap',
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: isExpanded(startIndex + index) ? 'unset' : 2,
                            WebkitBoxOrient: 'vertical',
                          }}
                        >
                          {item.description}
                        </div>
                        <div style={styles.more}>
                          {isExpanded(startIndex + index) ? '▲ Show Less' : '▼ Show More'}
                        </div>
                      </td>
                      <td style={styles.td}>
                        <div
                          style={{
                            whiteSpace: 'pre-wrap',
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: isExpanded(startIndex + index) ? 'unset' : 2,
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
          </div>

          {/* Pagination Controls */}
          <div style={styles.pagination}>
            <button
              style={styles.pageButton}
              onClick={goToPrevious}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span style={{ margin: '0 12px' }}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              style={styles.pageButton}
              onClick={goToNext}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    backgroundColor: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    marginTop: '24px',
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
    minWidth: '800px',
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
  pagination: {
    marginTop: 16,
    textAlign: 'center',
  },
  pageButton: {
    padding: '8px 16px',
    margin: '0 4px',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: '#3b82f6',
    color: 'white',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  tbodyContainer: {
    maxHeight: '400px', // fixed height for scroll area
    overflowY: 'auto',
    border: '1px solid #e5e7eb',
    borderTop: 'none',
  },
};
