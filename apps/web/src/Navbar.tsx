export default function Navbar() {
  return (
    <nav className="glass fixed top-0 w-full z-50 text-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <a href="/" className="font-bold tracking-tight text-lg gradient-text">
          eliasbenjaminsson.dev
        </a>
        <div className="flex items-center gap-2 sm:gap-4 text-sm sm:text-base">
          <a
            href="/"
            className="px-3 py-1.5 rounded-md hover:bg-white/10 transition"
          >
            Home
          </a>
          <a
            href="#section-projects"
            className="px-3 py-1.5 rounded-md hover:bg-white/10 transition hidden sm:inline-block"
          >
            Projects
          </a>
          <a
            href="#section-contacts"
            className="px-3 py-1.5 rounded-md hover:bg-white/10 transition hidden sm:inline-block"
          >
            Contact
          </a>
          <a
            href="/dashboard"
            className="px-3 py-1.5 rounded-md bg-emerald-500/90 hover:bg-emerald-400 text-gray-900 font-semibold transition"
          >
            Dashboard
          </a>
        </div>
      </div>
    </nav>
  );
}
