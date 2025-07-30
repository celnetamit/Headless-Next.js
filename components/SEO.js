import Head from 'next/head';

export default function SEO({
  title,
  description,
  keywords,
  url,
  image,
}) {
  return (
    <Head>
      <title>{title || 'STM Journals'}</title>

      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      {url && <meta property="og:url" content={url} />}
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {image && <meta property="og:image" content={image} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}
      {image && <meta name="twitter:image" content={image} />}

      {/* Schema.org JSON-LD Structured Data */}
      {title && description && url && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ScholarlyArticle",
              headline: title,
              description,
              author: {
                "@type": "Organization",
                name: "STM Journals",
              },
              publisher: {
                "@type": "Organization",
                name: "STM Journals",
              },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": url,
              },
              ...(image ? { image } : {}),
            }),
          }}
        />
      )}
    </Head>
  );
}
