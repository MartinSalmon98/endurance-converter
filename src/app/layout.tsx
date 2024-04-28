import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import './globals.css';

const rubik = Rubik({ subsets: ['latin'], weight: '500' });

export const metadata: Metadata = {
  title: 'Pace to Speed',
  description: 'Pace (min/km) to Speed converter.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning className={rubik.className}>
      <body>
        <div className='flex flex-col h-screen max-h-screen'>
          <div className='flex-grow overflow-y-auto bg-main text-light-text'>{children}</div>
        </div>
      </body>
    </html>
  );
}
