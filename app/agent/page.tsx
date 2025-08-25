'use client';

import { useEffect, useState } from 'react';
import SidebarLayout from '@/components/SidebarLayout';
import AgentCounterCards from '@/components/Agent_CounterCards';
import AgentServerEnvironmentPie from '@/components/Agent_ServerEnvironmentPie';
import AgentDepartmentEnvironmentPie from '@/components/Agent_DepartmentEnvironmentPie'
import AgentSeverityBar from '@/components/Agent_SeverityBar';
import AgentCveDetailsTable from '@/components/Agent_CveDetailsTable';

export default function DashboardPage() {
  const [data, setData] = useState({
    cve_count: 0,
    vulnerability_count: 0,
    server_count: 0,
  });

  return (
    <SidebarLayout>
      <div style={styles.page}>
        <div style={styles.navbar}>
          <h1 style={styles.title}>Agent Dashboard</h1>
        </div>

        {/* ✅ CounterCards full-width */}
        <div style={{ width: '100%' }}>
          <AgentCounterCards/>
        </div>

        {/* ✅ One row with EnvironmentPie, SeverityBar, EnvironmentPie */}
        <div style={styles.threeGrid}>
          <div style={styles.card}>
            <AgentDepartmentEnvironmentPie />
          </div>
          <div style={styles.card}>
            <AgentSeverityBar />
          </div>
          <div style={styles.card}>
            <AgentServerEnvironmentPie />
          </div>
        </div>

        {/* ✅ CVE Details Table full width */}
        <div style={{ ...styles.card, overflowX: 'auto', width: '100%' }}>
          <div style={{ minWidth: '100%', overflowX: 'auto' }}>
            <AgentCveDetailsTable />
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    padding: '24px',
    backgroundColor: '#f3f4f6',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  navbar: {
    backgroundColor: '#ffffff',
    padding: '16px 24px',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    border: '1px solid #e5e7eb',
    textAlign: 'left',
  },
  title: {
    fontSize: '26px',
    fontWeight: 700,
    color: '#1f2937',
    margin: 0,
  },
  threeGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '24px',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb',
    padding: '20px',
    marginBottom: '24px',
  },
};
