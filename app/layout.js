import './globals.css';

export const metadata = {
  title: 'NEET / 27 — Syllabus Tracker',
  description: 'A minimal, offline-friendly NEET 2027 chapter completion tracker.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
