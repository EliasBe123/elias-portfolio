import ProjectCard from "./Projectcard";

const projects = [
  {
    title: "Portfolio Website",
    image: "/portfolio_techstack.png",
    tech: ["React", "Tailwind", "TypeScript"],
    description: "A personal website showcasing my projects and skills.",
    githubUser: "EliasBe123",
    githubRepo: "elias-portfolio",
  },
  {
    title: "2048 Neural Network",
    image: "/2048.png",
    tech: ["Python", "TensorFlow"],
    description: "A neural network implementation of the 2048 game using deep learning techniques.",
    githubUser: "EliasBe123",
    githubRepo: "EvolutionML",
  },
  {
    title: "Pubcrawl Planner",
    image: "/pubcrawl.png",
    tech: ["C", "Traveling Salesman Problem", "Held-Karp Algorithm"],
    description: "A pub crawl planning application to optimize routes.",
    githubUser: "X-non",
    githubRepo: "pkd-project",
    usereadme: false,
  },
];


export default function Projects() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
      <h2 className="text-3xl font-bold text-center mb-4 gradient-text">My Projects</h2>
      <p className="text-center text-gray-200/90 mb-10 max-w-xl mx-auto">
        A selection of things I've built — click any card to learn more.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {projects.map((project, idx) => (
          <ProjectCard key={idx} project={project} />
        ))}
      </div>
    </div>
  );
}
