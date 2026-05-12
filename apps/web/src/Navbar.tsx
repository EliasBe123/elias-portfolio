import { useActiveSection } from "./hooks/useActiveSection";

export default function Navbar() {
  const active = useActiveSection(["about", "section-projects", "section-contacts"]);
  const linkCls = (id: string) =>
    `px-3 py-1.5 rounded-md transition ${
      active === id
        ? "text-emerald-300 bg-white/10"
        : "text-gray-100 hover:bg-white/10"
    }`;

  return (
    <nav aria-label="Primary" className="glass fixed top-0 w-full z-50 text-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <a href="/" className="font-bold tracking-tight text-lg gradient-text" aria-label="Home — eliasbenjaminsson.dev">
          eliasbenjaminsson.dev
        </a>
        <div className="flex items-center gap-2 sm:gap-4 text-sm sm:text-base">
          <a href="#about" className={linkCls("about") + " hidden sm:inline-block"}>
            About
          </a>
          <a
            href="#section-projects"
            className={linkCls("section-projects") + " hidden sm:inline-block"}
          >
            Projects
          </a>
          <a
            href="#section-contacts"
            className={linkCls("section-contacts") + " hidden sm:inline-block"}
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
