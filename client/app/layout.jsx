// client/app/layout.jsx
import { Inter } from 'next/font/google';
import './globals.css';
import AppWrapper from '../components/AppWrapper'; // NEW: Import client-side wrapper

const inter = Inter({ subsets: ['latin'] });

// This metadata export is now valid because layout.jsx is a Server Component
export const metadata = { 
  title: 'Smart Resume Builder with Gemini AI',
  description: 'Build your perfect, ATS-friendly resume with real-time AI suggestions.',
};

/**
 * @file layout.jsx
 * @description Root Server Layout, providing the base HTML structure and metadata.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Pass children to the client wrapper for context and client components */}
        <AppWrapper>
          {children}
        </AppWrapper>
      </body>
    </html>
  );
}