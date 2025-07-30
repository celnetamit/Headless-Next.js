import React from 'react';
import SEO from '../../components/SEO';
import Header from '../../components/Header';
import Breadcrumb from '../../components/Breadcrumb';
import {
  Calendar,
  Eye,
  Heart,
} from 'lucide-react';

export async function getStaticPaths() {
  try {
    const res = await fetch('https://publications.stmjournals.com/wp-json/wp/v2/posts');
    const posts = await res.json();

    const paths = Array.isArray(posts)
      ? posts.map(post => ({
          params: { slug: post.slug },
        }))
      : [];

    return {
      paths,
      fallback: 'blocking',
    };
  } catch {
    return { paths: [], fallback: 'blocking' };
  }
}

export async function getStaticProps({ params }) {
  try {
    const res = await fetch(
      `https://publications.stmjournals.com/wp-json/wp/v2/posts?slug=${params.slug}&_embed`
    );
    const posts = await res.json();

    if (!posts || posts.length === 0) {
      return { notFound: true };
    }

    return {
      props: { post: posts[0] },
      revalidate: 10,
    };
  } catch {
    return { notFound: true };
  }
}

export default function ArticlePage({ post }) {
  if (!post) {
    return <div className="py-20 text-center text-gray-600">Loading...</div>;
  }

  const cleanTitle = post.title.rendered.replace(/<[^>]+>/g, '');
  const cleanExcerpt = post.excerpt.rendered.replace(/<[^>]+>/g, '');

  // Meta info
  const title = `${cleanTitle} | STM Journals`;
  const description = cleanExcerpt;
  const keywords = cleanTitle
    .toLowerCase()
    .split(/\s+/)
    .slice(0, 10)
    .join(', ');
  const url = `https://yourdomain.com/posts/${post.slug}`; // Set your production domain here
  const image =
    post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
    'https://yourdomain.com/default-image.png';

  const plainText = post.content.rendered.replace(/<[^>]+>/g, '');
  const readTime = Math.ceil(plainText.split(/\s+/).length / 200) + ' min read';
  const likes = (post.id * 7) % 300 + 50;
  const category = post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Research';

  return (
    <>
      <Header />
      <Breadcrumb title={cleanTitle} />

      <SEO
        title={title}
        description={description}
        keywords={keywords}
        url={url}
        image={image}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans">
        <article className="max-w-5xl mx-auto px-6 py-12 bg-white/30 backdrop-blur-md rounded-2xl shadow-lg border border-gray-300/30">
          <div className="mb-4 flex items-center space-x-4 text-gray-600 text-sm">
            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-cyan-700 border border-cyan-500/40 font-semibold">
              {category}
            </span>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>{readTime}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4" />
              <span>{likes}</span>
            </div>
          </div>

          <h1
            className="text-4xl font-bold mb-8 text-gray-800"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          <div
            className="text-xl text-gray-700 mb-10"
            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
          />
          <div
            className="prose prose-lg max-w-none text-gray-800"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        </article>
      </div>
    </>
  );
}
