import './globals.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: '404movies',
  description: 'Netflix but it knows it’s wasting your time.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-background text-foreground">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
