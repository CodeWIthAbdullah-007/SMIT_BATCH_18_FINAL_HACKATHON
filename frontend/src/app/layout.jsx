
import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import BotpressChat from '../components/BotpressChat';

export const metadata = {
  title: 'HCM Lite - AI Assisted HR System',
  description: 'Saylani Hackathon HCM Lite Application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased">
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>

        <BotpressChat />
      </body>
    </html>
  );
}
