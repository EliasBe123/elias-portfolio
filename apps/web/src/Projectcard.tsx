import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { FaGithub } from "react-icons/fa";

type Project = {
  title: string;
  image: string;
  tech: string[];
  description?: string;
  githubUser?: string;
  githubRepo?: string;
};

export default function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const [readme, setReadme] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReadme = async () => {
      if (!open || !project.githubUser || !project.githubRepo) return;

      setLoading(true);
      try {
        const res = await fetch(
          `/api/readme/${project.githubUser}/${project.githubRepo}`
        );
        const data = await res.json();
        setReadme(data.readme);
      } catch (err) {
        console.error("Failed to fetch README:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReadme();
  }, [open, project.githubUser, project.githubRepo]);

  return (
    <>
      {/* --- Project Card --- */}
      <div
        onClick={() => setOpen(true)}
        className="cursor-pointer bg-gray-800 rounded-lg shadow-md overflow-hidden hover:scale-105 transition"
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-bold text-white">{project.title}</h3>
          <p className="text-sm text-gray-400">{project.tech.join(", ")}</p>
        </div>
      </div>

      {/* --- Modal --- */}
      {open && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-lg max-w-lg w-full overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Row */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-700">
                {project.title}
              </h2>

              <div className="flex items-center gap-2">
                {/* GitHub Button */}
                {project.githubUser && project.githubRepo && (
                  <a
                    href={`https://github.com/${project.githubUser}/${project.githubRepo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 text-white rounded hover:bg-gray-700 transition text-sm"
                  >
                    <FaGithub className="text-lg" />
                    <span>GitHub</span>
                  </a>
                )}

                {/* Close Button */}
                <button
                  onClick={() => setOpen(false)}
                  className="px-3 py-1.5 bg-purple-600 text-white rounded hover:bg-purple-700 transition text-sm"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Image */}
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-64 object-cover rounded mb-4"
            />

            {/* Description / README */}
            {loading ? (
              <p className="text-gray-500 italic">Loading README...</p>
            ) : readme ? (
              <div className="prose max-w-none text-gray-700">
                <ReactMarkdown>{readme}</ReactMarkdown>
              </div>
            ) : (
              <p className="text-gray-600">{project.description}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
