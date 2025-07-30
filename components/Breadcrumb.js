import Link from 'next/link';

export default function Breadcrumb({ title }) {
  return (
    <nav
      className="bg-white/30 backdrop-blur-md border-b border-gray-200/30 max-w-7xl mx-auto px-6 py-2 text-sm text-gray-600 font-medium flex space-x-2"
      aria-label="breadcrumb"
    >
      <Link href="/">
        <a className="hover:text-cyan-600">Home</a>
      </Link>
      <span>/</span>
      <span className="truncate max-w-xs" title={title}>
        {title}
      </span>
    </nav>
  );
}
