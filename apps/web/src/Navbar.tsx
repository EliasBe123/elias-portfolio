import { useActiveSection } from "./hooks/useActiveSection";
import StatusBadge from "./components/StatusBadge";

export default function Navbar() {
  const onHome = typeof window !== "undefined" && window.location.pathname === "/";
  const active = useActiveSection(
    onHome ? ["about", "section-projects", "section-contacts"] : []
  );
  const linkCls = (id: string) =>
    `px-3 py-1.5 rounded-md transition ${
      onHome && active === id
        ? "text-emerald-300 bg-white/10"
        : "text-gray-100 hover:bg-white/10"
    }`;
  // When not on the home page, anchor links must include the path so the
  // browser navigates home first and then scrolls to the section.
  const hash = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  return (
    <nav aria-label="Primary" className="glass fixed top-0 w-full z-50 text-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <a href="/" className="font-bold tracking-tight text-lg gradient-text" aria-label="Home — eliasbenjaminsson.dev">
          eliasbenjaminsson.dev
        </a>
        <div className="flex items-center gap-2 sm:gap-4 text-sm sm:text-base">
          <a href={hash("about")} className={linkCls("about") + " hidden sm:inline-block"}>
            About
          </a>
          <a
            href={hash("section-projects")}
            className={linkCls("section-projects") + " hidden sm:inline-block"}
          >
            Projects
          </a>
          <a
            href={hash("section-contacts")}
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
          <StatusBadge />
        </div>
      </div>
    </nav>
  );
}
