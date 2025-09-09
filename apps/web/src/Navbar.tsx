import React from 'react';
import { Link } from 'react-router-dom'; // if using react-router

export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-700 shadow-md fixed top-0 left-0 w-full z-50 border-b border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="space-x-6">
          <a href="/" className="hover:text-blue-600">Home</a>
          <a href="/dashboard" className="hover:text-blue-600">Dashboard</a>
          <a href="/timeline" className="hover:text-blue-600">Timeline</a>
          <a href="/api/health" className="hover:text-blue-600">API Health</a>
        </div>
      </div>
    </nav>
  );
}
