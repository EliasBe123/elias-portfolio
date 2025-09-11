import Navbar from "./Navbar";
import Timeline from "./Timeline";

export default function App() {
  const projects = [
    { name: "Project A", link: "#", tech: ["TypeScript", "Node", "React"] },
    { name: "Project B", link: "#", tech: ["Python", "FastAPI"] },
  ];

  return (
    <div className="min-h-screen bg-animated flex flex-col">
      <Navbar />

      {/* MAIN SECTION */}
      <section className="relative bg-gray-800/80 backdrop-blur-lg w-[90%] md:w-[70%] sm:mx-auto shadow-lg pb-16">
        <main className="max-w-3xl w-full px-4 pt-16 sm:p-6 sm:pt-24 mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-white">Elias Benjaminsson</h1>
            <div className="mt-2 flex flex-col md:flex-row items-center space-y-1">
              <div className="inline-block">
                <p className="text-gray-300 typing">Software Developer</p>
              </div>
              <div className="m-2 hidden sm:block inline-block">
                <p className="text-gray-300" style={{ whiteSpace: "nowrap", overflow: "hidden", display: "inline-block"}}>&&</p>
              </div>
              <div className="block sm:hidden w-full">
                <hr className="border-t border-gray-300 my-2 w-full" />
              </div>
              <div className="inline-block">
                <p className="text-gray-300 typing">Civil Engineering Student</p>
              </div>
            </div>
            <nav className="mt-4 flex gap-4 text-blue-600">
              <a href="/resume.pdf" className="hover:underline">
                Resume
              </a>
              <a
                href="https://github.com/your-github"
                className="hover:underline"
              >
                GitHub
              </a>
              <a href="mailto:you@example.com" className="hover:underline">
                Contact
              </a>
            </nav>
          </header>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-gray-300">About</h2>
            <p className="leading-relaxed text-gray-300">
              I build pragmatic, performant applications. This site runs on a
              Raspberry Pi 5 behind a VPS reverse proxy via WireGuard. Frontend:
              React + Tailwind. Backend: Express.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-gray-300">
              Projects
            </h2>
            <ul className="space-y-2">
              {projects.map((p) => (
                <li
                  key={p.name}
                  className="p-4 rounded border bg-white shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <a
                      href={p.link}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      {p.name}
                    </a>
                    <div className="text-sm text-slate-500">
                      {p.tech.join(" • ")}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </main>

        {/* Diagonal divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] sm:mx-auto">
          <svg
            className="relative block w-full h-[80px]"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 1200 120"
          >
            <path d="M0 0L1200 120L0 120V0Z" fill="#25a154ff" />
          </svg>
        </div>
      </section>

      {/* TIMELINE SECTION */}
      <section className="relative w-[90%] md:w-[70%] sm:mx-auto shadow-lg text-white" style={{ background: "#25a154ff" }}>
        <div className="max-w-4xl mx-auto px-6">
          <Timeline />
        </div>
      </section>
    </div>
  );
}
