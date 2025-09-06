export default function App() {
  const projects = [
    { name: 'Project A', link: '#', tech: ['TypeScript', 'Node', 'React'] },
    { name: 'Project B', link: '#', tech: ['Python', 'FastAPI'] }
  ];

  return (
    <main className="max-w-3xl mx-auto p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Elias Benjaminsson</h1>
        <p className="text-slate-600">Software Developer</p>
        <nav className="mt-4 flex gap-4 text-blue-600">
          <a href="/resume.pdf" className="hover:underline">Resume</a>
          <a href="https://github.com/your-github" className="hover:underline">GitHub</a>
          <a href="mailto:you@example.com" className="hover:underline">Contact</a>
        </nav>
      </header>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">About</h2>
        <p className="leading-relaxed">
          I build pragmatic, performant applications. This site runs on a Raspberry Pi 5 behind a
          VPS reverse proxy via WireGuard. Frontend: React + Tailwind. Backend: Express.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Projects</h2>
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

      <footer className="text-sm text-slate-500">
        <a href="/api/health" className="hover:underline">API Health</a>
      </footer>
    </main>
  );
}