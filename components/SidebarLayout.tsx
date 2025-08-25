// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { ReactNode } from 'react';
// import Image from 'next/image';

// const menuItems = [
//   { title: 'Dashboard', href: '/dashboard' },
//   { title: 'Vulnerability', href: '/vulnerability' },
//   { title: 'Event', href: '/events' },
//   { title: 'Agent', href: '/agent' },
//   { title: 'Fim', href: '/fim' },
//   { title: 'SO', href: '/so' },
//   { title: 'Settings', href: '/settings' },
// ];

// export default function SidebarLayout({ children }: { children: ReactNode }) {
//   const pathname = usePathname();

//   return (
//     <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
//       {/* Sidebar */}
//       <aside
//         style={{
//           width: '180px',
//           backgroundColor: '#111827',
//           color: '#fff',
//           display: 'flex',
//           flexDirection: 'column',
//           paddingTop: '20px',
//         }}
//       >
//         {/* Logo */}
//         <div
//           style={{
//             padding: '16px',
//             borderBottom: '1px solid #374151',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}
//         >
//           <Image
//             src="/logo/logo-light.png"
//             alt="Dashboard Logo"
//             width={120}
//             height={40}
//             style={{ objectFit: 'contain' }}
//           />
//         </div>

//         {/* Navigation Links */}
//         <nav style={{ flex: 1, padding: '8px 0' }}>
//           {menuItems.map((item, idx) => (
//             <Link
//               key={idx}
//               href={item.href}
//               style={{
//                 display: 'block',
//                 padding: '10px 16px',
//                 margin: '4px 8px',
//                 borderRadius: '6px',
//                 fontSize: '14px',
//                 fontWeight: pathname === item.href ? 'bold' : 'normal',
//                 backgroundColor: pathname === item.href ? '#374151' : 'transparent',
//                 color: pathname === item.href ? '#ffffff' : '#d1d5db',
//                 textDecoration: 'none',
//               }}
//             >
//               {item.title}
//             </Link>
//           ))}
//         </nav>

//         {/* Footer */}
//         <div
//           style={{
//             fontSize: '12px',
//             color: '#9ca3af',
//             padding: '12px',
//             borderTop: '1px solid #374151',
//             textAlign: 'center',
//           }}
//         >
//           © 2025 Centralized Security
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>{children}</main>
//     </div>
//   );
// }


'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import Image from 'next/image';

const menuItems = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Vulnerability', href: '/vulnerability' },
  { title: 'Event', href: '/events' },
  { title: 'Agent', href: '/agent' },
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
          position: 'fixed',        // ✅ Sidebar fixed
          top: 0,
          left: 0,
          bottom: 0,
          height: '100vh',
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: '16px',
            borderBottom: '1px solid #374151',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            src="/logo/logo-light.png"
            alt="Dashboard Logo"
            width={120}
            height={40}
            style={{ objectFit: 'contain' }}
          />
        </div>

        {/* Navigation Links */}
        <nav style={{ flex: 1, padding: '8px 0', overflowY: 'auto' }}>
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

        {/* Footer */}
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
      <main
        style={{
          flex: 1,
          padding: '24px',
          marginLeft: '180px',   // ✅ space adjust for fixed sidebar
          overflowY: 'auto',
          width: 'calc(100% - 180px)',
        }}
      >
        {children}
      </main>
    </div>
  );
}
