import type {Metadata} from 'next';
import {Plus_Jakarta_Sans} from 'next/font/google';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'DIAMONDS — The Unified Business Management Platform',
  description:
    'A unified digital workspace bringing CRM, multichannel communications, websites, bookings, automated workflows, and operational intelligence together into one system.',
  keywords: [
    'business management platform',
    'unified workspace',
    'CRM and multichannel messaging',
    'website and domain management',
    'operational intelligence',
    'workflow automation',
  ],
  authors: [{name: 'DIAMONDS Software'}],
  openGraph: {
    title: 'DIAMONDS — The Unified Business Management Platform',
    description:
      'Manage your customer relationships, communications, websites, distribution, and automated workflows from one connected operating system.',
    type: 'website',
    locale: 'en_US',
    siteName: 'DIAMONDS',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DIAMONDS — The Unified Business Management Platform',
    description:
      'Manage your customer relationships, communications, websites, distribution, and automated workflows from one connected operating system.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { AuthProvider } from '@/lib/auth-context';

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body className="min-h-screen bg-[#070A10] text-[#E2E8F0] font-sans antialiased selection:bg-[#0EA5E9]/20 selection:text-[#38BDF8]">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
