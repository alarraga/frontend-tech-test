import type { Metadata } from 'next';
import { Roboto_Serif } from 'next/font/google';
import './globals.css';

const roboto = Roboto_Serif({
  variable: '--font-roboto',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Frontend Engineer Tech Test',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${roboto.variable} antialiased`}>{children}</body>
    </html>
  );
}
