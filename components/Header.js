import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export default function Header() {
  const [showContact, setShowContact] = useState(false);

  return (
    <>
      <nav className="bg-white/30 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-200/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-4 space-y-4 md:space-y-0">
          <Link href="/">
            <a className="flex items-center space-x-2 select-none">
              <BookOpen className="w-8 h-8 text-cyan-500" />
              <span className="font-bold text-2xl text-cyan-700">STM Journals</span>
            </a>
          </Link>
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => setShowContact(true)}
              className="text-cyan-600 font-semibold hover:text-cyan-800 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded"
            >
              Contact
            </button>
            <Link href="/">
              <a className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg px-5 py-2 shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400">
                <BookOpen className="w-5 h-5" />
                <span>Latest Publications</span>
              </a>
            </Link>
          </div>
        </div>
      </nav>

      {showContact && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowContact(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
        >
          <div
            className="bg-white rounded-xl max-w-lg w-full p-6 shadow-lg"
            onClick={e => e.stopPropagation()}
          >
            <h2
              id="contact-modal-title"
              className="text-2xl font-semibold mb-4 text-gray-900"
            >
              Contact STM Journals
            </h2>
            <p className="mb-2 text-gray-700">
              You can reach us at:
            </p>
            <p className="mb-1">
              <strong>Email:</strong>{' '}
              <a
                href="mailto:info@example.com"
                className="text-cyan-600 hover:underline"
              >
                info@example.com
              </a>
            </p>
            <p className="mb-4">
              <strong>Phone:</strong> +1 (555) 123-4567
            </p>
            <p className="mb-6 text-gray-700">
              Feel free to email or call us with any questions or inquiries.
            </p>
            <button
              type="button"
              onClick={() => setShowContact(false)}
              className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
