import Navbar from "./Navbar";
export default function App() {
  const projects = [
    { name: 'Project A', link: '#', tech: ['TypeScript', 'Node', 'React'] },
    { name: 'Project B', link: '#', tech: ['Python', 'FastAPI'] }
  ];

  return (
    <div className='min-h-screen bg-animated flex items-center justify-start md:justify-center'>
      <Navbar />
      <div className="bg-gray-800/70 backdrop-blur-lg min-h-screen w-[90%] md:w-[70%] rounded-2xl shadow-lg">
        <main className="max-w-3xl w-full px-4 pt-16 sm:p-6 sm:pt-24 mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-white">Elias Benjaminsson</h1>
            <div className="mt-2 flex sd:flex-col md:flex-row items-baseline space-y-1">
              <div className="inline-block">
                <p className="text-gray-300 typing">Software Developer</p>
              </div>

              <p className="m-2 self-center text-slate-600">•</p>
              <div className="inline-block">
                <p className="text-gray-300 typing">Civil Engineering Student</p>
              </div>
            </div>
            <nav className="mt-4 flex gap-4 text-blue-600">
              <a href="/resume.pdf" className="hover:underline">Resume</a>
              <a href="https://github.com/your-github" className="hover:underline">GitHub</a>
              <a href="mailto:you@example.com" className="hover:underline">Contact</a>
            </nav>
          </header>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-gray-300">About</h2>
            <p className="leading-relaxed text-fade-in text-gray-300">
              I build pragmatic, performant applications. This site runs on a Raspberry Pi 5 behind a
              VPS reverse proxy via WireGuard. Frontend: React + Tailwind. Backend: Express.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-gray-300">Projects</h2>
            <ul className="space-y-2">
              {projects.map((p) => (
                <li key={p.name} className="p-4 rounded border bg-white">
                  <div className="flex items-center justify-between">
                    <a href={p.link} className="font-medium text-blue-600 hover:underline">{p.name}</a>
                    <div className="text-sm text-slate-500">{p.tech.join(' • ')}</div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </main>
        </div>
    </div>
  );
}