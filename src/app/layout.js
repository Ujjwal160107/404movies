import './globals.css';
import Navbar from '../components/Navbar';
import { AuthProvider } from '../context/AuthContext';

export const metadata = {
  title: '404movies',
  description: 'Netflix but it knows it’s wasting your time.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-background text-foreground">
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
