import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Articles',
  description: 'EY Exercise 1',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-y-hidden`}>
        <div className='flex flex-col h-screen'>
          <NavBar />
          <main className='flex-1 overflow-y-auto' style={{ maxHeight: 'calc(100vh - var(--navbar-height) - var(--footer-height))' }}>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
