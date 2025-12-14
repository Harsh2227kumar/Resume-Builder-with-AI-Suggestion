// client/app/layout.jsx
import { Inter } from 'next/font/google';
import './globals.css';
import { ResumeProvider } from '../context/ResumeContext';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { Toaster } from 'react-hot-toast'; // Assuming installation of react-hot-toast for V. Advanced UI

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Smart Resume Builder with Gemini AI',
  description: 'Build your perfect, ATS-friendly resume with real-time AI suggestions.',
};

/**
 * @file layout.jsx
 * @description Root layout component with global context, header, and footer.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ResumeProvider>
          <div className="flex flex-col min-h-screen">
            {/* Header: Sticky and responsive */}
            <Header />
            
            {/* Main Content Area */}
            <main className="flex-grow">
              {children}
            </main>
            
            <Footer />
            
            {/* Toast Notifications container (V. Advanced UI) */}
            <Toaster position="top-right" />
          </div>
        </ResumeProvider>
      </body>
    </html>
  );
}