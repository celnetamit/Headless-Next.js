import '../styles/globals.css';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Global SEO meta tags */}
        <title>STM Journals</title>
        <meta name="description" content="Discover cutting-edge research and scientific publications from STM Journals." />
        <meta name="keywords" content="STM Journals, research articles, scientific journals, academic publications" />
        {/* Open Graph meta tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="STM Journals" />
        <meta property="og:description" content="Discover cutting-edge research and scientific publications from STM Journals." />
        <meta property="og:image" content="https://yourdomain.com/default-image.png" />
        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="STM Journals" />
        <meta name="twitter:description" content="Discover cutting-edge research and scientific publications from STM Journals." />
        <meta name="twitter:image" content="https://yourdomain.com/default-image.png" />

        {/* Global schema.org JSON-LD (WebSite/Organization) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "STM Journals",
              "url": "https://yourdomain.com"
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "STM Journals",
              "url": "https://yourdomain.com",
              "logo": "https://yourdomain.com/logo.png" // Optional logo
            })
          }}
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
