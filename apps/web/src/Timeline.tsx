import { BriefcaseBusiness, GraduationCap } from "lucide-react";

const timelineData = [
  {
    date: "Autumn 2025 - Present",
    company: "Uppsala University",
    role: "Master's in Computer Science",
    type: "Education",
    description:
      "Continuing my studies with a focus on data analysis, machine learning, and advanced algorithms.",
    technologies: [
      "Statistics",
      "Data Engineering",
      "Natural Computing Methods for ML",
    ],
  },
  {
    date: "2024 - Present",
    company: "Aviation iSolutions",
    role: "Software Developer",
    type: "Work",
    description:
      "Contributing to modern full-stack projects across frontend and backend development.",
    technologies: ["JavaScript", "Vue", "Go", "PostgreSQL", "Docker"],
  },
  {
    date: "Summer 2025",
    company: "Saab",
    role: "Software Developer",
    type: "Work",
    description:
      "Worked on a drone detection application using sensor fusion to combine image detection and sound localization.",
    technologies: ["C", "Python", "YOLO", "FPGA"],
  },
  {
    date: "2022 - 2025",
    company: "Uppsala University",
    role: "Bachelor of Science",
    type: "Education",
    description:
      "Studied Civil Engineering in Information Technology with a broad foundation in software development and computer systems.",
    technologies: ["Java", "C", "Python", "SQL", "Linux"],
  },
  {
    date: "Autumn 2021",
    company: "Sylog AB",
    role: "Trainee Consultant",
    type: "Work",
    description:
      "Worked on a troubleshooting application for Scania trucks and buses using C and C++. Optimized the code to reduce CPU usage by 14%.",
    technologies: ["C", "C++", "Valgrind"],
  },
];

export default function Timeline() {
  return (
    <div className="mx-auto max-w-4xl px-1 py-16 sm:px-4 sm:py-20">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white">Career Timeline</h2>
        <p className="mt-2 text-sm text-emerald-50/75">
          Work and education, newest first.
        </p>
      </div>

      <div className="relative mt-12">
        <div
          className="absolute bottom-6 left-4 top-4 w-px bg-white/25 md:left-1/2"
          aria-hidden="true"
        />

        <div className="relative z-10 mb-10 flex items-center pl-12 md:justify-center md:pl-0">
          <span
            className="absolute left-4 top-1/2 h-px w-8 bg-white/40 md:hidden"
            aria-hidden="true"
          />
          <span className="rounded-full border border-emerald-300/60 bg-slate-950 px-3 py-1 text-xs font-bold uppercase text-emerald-300 shadow-lg">
            Now
          </span>
        </div>

        <div className="space-y-8 md:space-y-12">
          {timelineData.map((item, index) => {
            const isLeft = index % 2 === 0;
            const Icon =
              item.type === "Education" ? GraduationCap : BriefcaseBusiness;

            return (
              <article
                key={`${item.company}-${item.date}`}
                className="relative pl-12 md:grid md:grid-cols-[minmax(0,1fr)_3rem_minmax(0,1fr)] md:pl-0"
              >
                <div
                  className="absolute left-[11px] top-7 z-10 h-3 w-3 rounded-full border-2 border-emerald-200 bg-teal-700 shadow-[0_0_0_5px_rgba(15,118,110,0.9)] md:left-1/2 md:-translate-x-1/2"
                  aria-hidden="true"
                />

                <div
                  className={`rounded-lg border border-white/15 bg-slate-950/80 p-5 shadow-xl backdrop-blur-sm transition-colors hover:border-emerald-300/50 sm:p-6 ${
                    isLeft
                      ? "md:col-start-1 md:mr-4"
                      : "md:col-start-3 md:ml-4"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase text-emerald-300">
                        {item.date}
                      </p>
                      <h3 className="mt-1 text-xl font-semibold text-white">
                        {item.role}
                      </h3>
                    </div>

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-white p-1.5">
                      <img
                        src={`/${item.company.replace(/\s+/g, "").toLowerCase()}.png`}
                        alt={`${item.company} logo`}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-2 text-sm font-medium text-slate-200">
                    <Icon className="h-4 w-4 text-cyan-300" aria-hidden="true" />
                    <span>{item.company}</span>
                    <span className="text-slate-500">/</span>
                    <span className="text-slate-400">{item.type}</span>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-slate-300">
                    {item.description}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
                    {item.technologies.map((technology) => (
                      <li
                        key={technology}
                        className="rounded border border-slate-600 bg-slate-900 px-2 py-1 text-xs font-medium text-slate-300"
                      >
                        {technology}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
