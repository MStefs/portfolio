import Link from 'next/link';

export default function Custom404() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px', color: 'black', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>404 - Page Not Found</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Sorry, the page you are looking for does not exist.</p>
      <Link href="/">
        <a style={{ fontSize: '1.2rem', color: 'blue', textDecoration: 'underline' }}>Go back home</a>
      </Link>
    </div>
  );
} 