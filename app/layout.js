import './globals.css';

export const metadata = {
  title: 'NEET / 27 — Syllabus Tracker & Exam Countdown',
  description: 'A minimal, local-first NEET 2027 chapter completion tracker and countdown based on NMC syllabus.',
  keywords: ['NEET', 'NEET 2027', 'Syllabus Tracker', 'NMC', 'Study Tracker']
};

export const viewport = {
  themeColor: '#080808',
  colorScheme: 'dark'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

