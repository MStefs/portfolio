import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import "../styles/globals.css";

// Smooth page transition variants
const pageVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeInOut"
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

// const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Old way
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID; // New: Read from env

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  
  // Prevent scroll jumping during page transitions
  useEffect(() => {
    const handleRouteChangeStart = () => {
      // Lock scroll position during transition
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    };

    const handleRouteChangeComplete = () => {
      // Restore normal scrolling after transition
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      
      // Scroll to top of new page smoothly
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router]);
  
  return (
    <AnimatePresence mode="wait">
      <Head>
        <title>Miltiadis Stefanidis - UX Portfolio</title>
        <meta name="description" content="Portfolio of Miltiadis Stefanidis, Quantitative Researcher / Data Analyst specializing in UX and ML." />
        <link rel="icon" href="/images/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      {/* Conditionally load Google Analytics scripts */}
      {GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX' && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}
          </Script>
        </>
      )}

      <motion.div
        key={router.route}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={pageVariants}
      >
        <Component {...pageProps} />
      </motion.div>
    </AnimatePresence>
  );
}