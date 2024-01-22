import { ClerkProvider } from '@clerk/nextjs';
import React from 'react';
import { Inter, Space_Grotesk as SpaceGrotesk } from 'next/font/google';
import type { Metadata } from 'next';
import ThemeProvider from '@/context/ThemeProvider';
import './globals.css';
import '@/styles/prism.css';

export const metadata: Metadata = {
  title: 'BBKFlow',
  description:
    'BBK Overflow is a question-and-answer website for computer programmers. It is the flagship site of the Stack Exchange Network. It was created in 2008 by Jeff Atwood and Joel Spolsky. It features questions and answers on certain computer programming topics.',
  icons: {
    icon: '/assets/images/site-logo.svg',
  },
};

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
});
const spaceGrotesk = SpaceGrotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-spaceGrotesk',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <ClerkProvider
          appearance={{
            elements: {
              formButtonPrimary: 'primary-gradient',
              footerActionLink: 'primary-text-gradient hover:text-primary-500',
            },
          }}
        >
          <ThemeProvider>{children}</ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
