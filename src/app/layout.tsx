import type { Metadata } from 'next';
import './styles/globals.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { Titillium_Web } from 'next/font/google';

const font = Titillium_Web({ weight: ['200', '300', '400', '600', '700', '900'], subsets: ['latin'] });
const theme = 'dark';

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
    <html lang='en' data-theme={theme}>
      <body className={`${font.className}`}>
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
