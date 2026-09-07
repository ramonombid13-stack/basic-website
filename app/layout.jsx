import './globals.css';

export const metadata = {
  title: 'Ramon Ombid — Systems Builder',
  description:
    "GoHighLevel systems builder. A decade inside other people's systems, now building his own.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
