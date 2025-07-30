import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Calendar,
  Eye,
  Heart,
  ChevronRight,
  X,
} from 'lucide-react';

import SEO from '../components/SEO';
import Header from '../components/Header';

export async function getStaticProps() {
  const res = await fetch('https://publications.stmjournals.com/wp-json/wp/v2/posts?_embed');
  const posts = await res.json();

  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
}

export default function Home({ posts }) {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('');
  const [showCarouselPopup, setShowCarouselPopup] = useState(false);
  const [carouselShown, setCarouselShown] = useState(false);

  const journals = posts.map((post) => ({
    id: post.id,
    title: post.title.rendered.replace(/<[^>]+>/g, ''),
    description:
      post.excerpt.rendered.replace(/<[^>]+>/g, '').substring(0, 200) + '...',
    content: post.content.rendered,
    category: post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Research',
    date: post.date,
    slug: post.slug,
    readTime:
      Math.ceil(post.content.rendered.replace(/<[^>]+>/g, '').split(/\s+/).length / 200) +
      ' min read',
    likes: (post.id * 7) % 300 + 50,
  }));

  const filteredJournals = journals.filter((journal) => {
    const q = searchTerm.toLowerCase();
    return (
      journal.title.toLowerCase().includes(q) ||
      journal.description.toLowerCase().includes(q)
    );
  });

  const latestJournals = [...journals].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Popup for latest journals after scroll
  useEffect(() => {
    const onScroll = () => {
      if (!carouselShown && window.scrollY > 500) {
        setShowCarouselPopup(true);
        setCarouselShown(true);
        setTimeout(() => setShowCarouselPopup(false), 5000);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [carouselShown]);

  return (
    <>
      <SEO
        title="STM Journals – Latest Publications"
        description="Discover groundbreaking research and academic articles."
        keywords="STM Journals, scientific articles, academic research, latest publications"
        url="https://yourdomain.com"
        image="https://yourdomain.com/default-image.png"
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Header />

        <main className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            📚 STM Journals – Latest Publications
          </h2>
          <p className="text-gray-600 max-w-2xl mb-12 mx-auto">
            Discover groundbreaking research and academic articles.
          </p>

          <div className="max-w-5xl mx-auto space-y-6">
            <div className="mb-6 relative max-w-lg mx-auto">
              <input
                type="text"
                placeholder="Search publications, topics, keywords..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 bg-white/30 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                <ChevronRight className="w-5 h-5" />
              </span>
            </div>
            {filteredJournals.length === 0 ? (
              <p className="text-center text-gray-500">No publications found.</p>
            ) : (
              filteredJournals.map((journal) => (
                <Link key={journal.id} href={`/posts/${journal.slug}`} passHref>
                  <a
                    className="block p-8 bg-white/30 backdrop-blur-sm border border-gray-300/30 rounded-2xl shadow hover:shadow-lg transition transform hover:scale-[1.02] group cursor-pointer"
                    aria-label={`Read article: ${journal.title}`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex space-x-4">
                        <span className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-cyan-700 border border-cyan-500/40 font-semibold text-sm">
                          {journal.category}
                        </span>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(journal.date).toLocaleDateString()}</span>
                          <Eye className="w-4 h-4" />
                          <span>{journal.readTime}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-600 text-sm">
                        <Heart className="w-5 h-5" />
                        <span>{journal.likes}</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-semibold text-gray-800 group-hover:text-cyan-600 transition">
                      {journal.title}
                    </h3>
                    <p className="mt-2 text-gray-600">{journal.description}</p>
                    <div className="mt-4 flex items-center text-cyan-600 font-medium group-hover:underline">
                      <span>View Article</span>
                      <ChevronRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </a>
                </Link>
              ))
            )}
          </div>
        </main>
      </div>

      {/* Latest Journals Popup */}
      {showCarouselPopup && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="bg-white/50 backdrop-blur-md border border-gray-300/30 rounded-2xl shadow-lg max-w-sm p-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold text-gray-800">Latest Journals</h4>
              <button
                onClick={() => setShowCarouselPopup(false)}
                aria-label="Close popup"
                className="p-1 rounded hover:bg-gray-200 focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {latestJournals.slice(0, 3).map((journal) => (
              <div
                key={journal.id}
                onClick={() => {
                  router.push(`/posts/${journal.slug}`);
                  setShowCarouselPopup(false);
                }}
                className="cursor-pointer p-2 rounded hover:bg-gray-100"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    router.push(`/posts/${journal.slug}`);
                    setShowCarouselPopup(false);
                  }
                }}
              >
                <h5 className="font-medium text-gray-800 truncate">{journal.title}</h5>
                <p className="text-xs text-gray-600 truncate">
                  {journal.category} • {journal.readTime}
                </p>
              </div>
            ))}
            <button
              onClick={() => {
                router.push('/');
                setShowCarouselPopup(false);
              }}
              className="mt-2 w-full text-center font-medium text-cyan-600 hover:text-cyan-700"
            >
              View All
            </button>
          </div>
        </div>
      )}
    </>
  );
}
