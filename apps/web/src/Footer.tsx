export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white flex justify-center">
      <div className="border-t border-white/10 py-8 w-full md:w-3/5 text-center px-4">
        <p className="gradient-text font-bold text-lg mb-1">eliasbenjaminsson.dev</p>
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Designed &amp; developed by Elias Benjaminsson — licensed under
          <a
            href="https://opensource.org/licenses/MIT"
            className="underline text-cyan-400 hover:text-cyan-300 mx-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            MIT
          </a>
          .
        </p>
      </div>
    </footer>
  );
}