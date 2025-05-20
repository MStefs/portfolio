import Link from 'next/link';

function ErrorPage({ statusCode }) {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px', color: 'black', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : 'An error occurred on client'}
      </h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
        Sorry for the inconvenience. Please try again later.
      </p>
      <Link href="/">
        <a style={{ fontSize: '1.2rem', color: 'blue', textDecoration: 'underline' }}>Go back home</a>
      </Link>
    </div>
  );
}

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage; 