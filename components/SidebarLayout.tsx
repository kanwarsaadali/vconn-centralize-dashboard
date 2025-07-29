'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

const menuItems = [
  { title: 'Event', href: '/events' },
  { title: 'Vulnerability', href: '/vulnerability' },
  { title: 'Fim', href: '/fim' },
  { title: 'SO', href: '/so' },
  { title: 'Settings', href: '/settings' },
];

export default function SidebarLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: '180px',
          backgroundColor: '#111827',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '20px',
        }}
      >
        <div
          style={{
            padding: '16px',
            fontWeight: 'bold',
            fontSize: '16px',
            borderBottom: '1px solid #374151',
            textAlign: 'center',
          }}
        >
          My Dashboard
        </div>
        <nav style={{ flex: 1, padding: '8px 0' }}>
          {menuItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              style={{
                display: 'block',
                padding: '10px 16px',
                margin: '4px 8px',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: pathname === item.href ? 'bold' : 'normal',
                backgroundColor: pathname === item.href ? '#374151' : 'transparent',
                color: pathname === item.href ? '#ffffff' : '#d1d5db',
                textDecoration: 'none',
              }}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <div
          style={{
            fontSize: '12px',
            color: '#9ca3af',
            padding: '12px',
            borderTop: '1px solid #374151',
            textAlign: 'center',
          }}
        >
          © 2025 Centralized Security
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>{children}</main>
    </div>
  );
}
