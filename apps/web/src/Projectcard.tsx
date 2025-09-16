import { useState } from "react";

type Project = {
  title: string;
  image: string;
  tech: string[];
  description: string;
};

export default function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="cursor-pointer bg-gray-800 rounded-lg shadow-md overflow-hidden hover:scale-105 transition"
      >
        <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-bold text-white">{project.title}</h3>
          <p className="text-sm text-gray-400">{project.tech.join(", ")}</p>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-lg max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold">{project.title}</h2>
            <img src={project.image} alt={project.title} className="w-full h-64 object-cover rounded my-4" />
            <p className="text-gray-600">{project.description}</p>
            <button
              onClick={() => setOpen(false)}
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
