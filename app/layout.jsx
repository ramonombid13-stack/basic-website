import './globals.css';

export const metadata = {
  title: 'Ramon Ombid — Systems Builder',
  description:
    "GoHighLevel systems builder. A decade inside other people's systems, now building his own.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a href="/" className="site-mark">
          Ramon Ombid
        </a>
        {children}
      </body>
    </html>
  );
}
