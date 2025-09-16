import ProjectCard from "./Projectcard";

const projects = [
  {
    title: "Portfolio Website",
    image: "/images/portfolio.png",
    tech: ["React", "Tailwind", "TypeScript"],
    description: "A personal website showcasing my projects and skills.",
  },
  {
    title: "E-Commerce App",
    image: "/images/ecommerce.png",
    tech: ["Next.js", "MongoDB", "Stripe"],
    description: "A full-stack e-commerce platform with payment integration.",
  },
  {
    title: "Chat App",
    image: "/images/chat.png",
    tech: ["Node.js", "Socket.IO", "Express"],
    description: "A real-time chat application with private rooms.",
  },
];


export default function Projects() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
      <h2 className="text-3xl font-bold text-center mb-12">My Projects</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {projects.map((project, idx) => (
          <ProjectCard key={idx} project={project} />
        ))}
      </div>
    </div>
  );
}
