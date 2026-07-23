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
  usereadme?: boolean;
};

type ReadmeData = {
  readme: string;
  rawBaseUrl: string;
  githubBaseUrl: string;
};

type ReadmeMedia = {
  type: "image" | "video";
  url: string;
  start: number;
  end: number;
};

const videoPattern = /\.(mov|mp4|webm)(?:[?#].*)?$/i;

function resolveUrl(path: string, baseUrl: string) {
  try {
    return new URL(path, baseUrl).toString();
  } catch {
    return path;
  }
}

function firstReadmeMedia(markdown: string, rawBaseUrl: string): ReadmeMedia | null {
  const matches: ReadmeMedia[] = [];
  const markdownImage = /!\[[^\]]*\]\(\s*(?:<([^>]+)>|([^\s)]+))(?:\s+["'][^"']*["'])?\s*\)/gi;
  const markdownLink = /\[[^\]]+\]\(\s*(?:<([^>]+)>|([^\s)]+))(?:\s+["'][^"']*["'])?\s*\)/gi;
  const htmlMedia = /<(img|video)\b[^>]*?\bsrc\s*=\s*["']([^"']+)["'][^>]*>/gi;

  for (const match of markdown.matchAll(markdownImage)) {
    const source = match[1] || match[2];
    matches.push({
      type: videoPattern.test(source) ? "video" : "image",
      url: resolveUrl(source, rawBaseUrl),
      start: match.index,
      end: match.index + match[0].length,
    });
  }

  for (const match of markdown.matchAll(markdownLink)) {
    if (match.index > 0 && markdown[match.index - 1] === "!") continue;
    const source = match[1] || match[2];
    if (!videoPattern.test(source)) continue;
    matches.push({
      type: "video",
      url: resolveUrl(source, rawBaseUrl),
      start: match.index,
      end: match.index + match[0].length,
    });
  }

  for (const match of markdown.matchAll(htmlMedia)) {
    matches.push({
      type: match[1].toLowerCase() === "video" ? "video" : "image",
      url: resolveUrl(match[2], rawBaseUrl),
      start: match.index,
      end: match.index + match[0].length,
    });
  }

  matches.sort((left, right) => left.start - right.start);
  return matches[0] || null;
}

function ProjectMedia({
  media,
  fallback,
  title,
  className,
  onError,
}: {
  media: ReadmeMedia | null;
  fallback: string;
  title: string;
  className: string;
  onError: () => void;
}) {
  if (media?.type === "video") {
    return (
      <video
        src={media.url}
        poster={fallback}
        controls
        preload="metadata"
        playsInline
        className={className}
        onClick={(event) => event.stopPropagation()}
        onError={onError}
      />
    );
  }

  return (
    <img
      src={media?.url || fallback}
      alt={title}
      className={className}
      onError={onError}
    />
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const [readmeData, setReadmeData] = useState<ReadmeData | null>(null);
  const [readmeMedia, setReadmeMedia] = useState<ReadmeMedia | null>(null);
  const [mediaFailed, setMediaFailed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!project.githubUser || !project.githubRepo || project.usereadme === false) {
      setReadmeData(null);
      setReadmeMedia(null);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setMediaFailed(false);

    fetch(`/api/readme/${project.githubUser}/${project.githubRepo}`, {
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("README request failed");
        return response.json() as Promise<ReadmeData>;
      })
      .then((data) => {
        setReadmeData(data);
        setReadmeMedia(firstReadmeMedia(data.readme, data.rawBaseUrl));
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Failed to fetch README:", error);
          setReadmeData(null);
          setReadmeMedia(null);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [project.githubUser, project.githubRepo, project.usereadme]);

  const media = mediaFailed ? null : readmeMedia;
  const markdown = readmeData
    ? media
      ? `${readmeData.readme.slice(0, media.start)}${readmeData.readme.slice(media.end)}`
      : readmeData.readme
    : null;

  const resolveReadmeMedia = (source?: string) =>
    source && readmeData ? resolveUrl(source, readmeData.rawBaseUrl) : source;
  const resolveReadmeLink = (source?: string) =>
    source && readmeData ? resolveUrl(source, readmeData.githubBaseUrl) : source;

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="group cursor-pointer bg-gray-900/70 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 hover-lift glow-ring"
      >
        <div className="overflow-hidden">
          <ProjectMedia
            media={media}
            fallback={project.image}
            title={project.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setMediaFailed(true)}
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold text-white">{project.title}</h3>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="text-[11px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-400/30"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-lg max-w-lg w-full overflow-y-auto max-h-[90vh]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-700">{project.title}</h2>
              <div className="flex items-center gap-2">
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
                <button
                  onClick={() => setOpen(false)}
                  className="px-3 py-1.5 bg-purple-600 text-white rounded hover:bg-purple-700 transition text-sm"
                >
                  Close
                </button>
              </div>
            </div>

            <ProjectMedia
              media={media}
              fallback={project.image}
              title={project.title}
              className="w-full max-h-[28rem] object-contain bg-black rounded mb-4"
              onError={() => setMediaFailed(true)}
            />

            {loading ? (
              <p className="text-gray-500 italic">Loading README...</p>
            ) : markdown ? (
              <div className="prose max-w-none text-gray-700">
                <ReactMarkdown
                  components={{
                    img: ({ src, alt }) => (
                      <img src={resolveReadmeMedia(src)} alt={alt || ""} />
                    ),
                    a: ({ href, children }) =>
                      href && videoPattern.test(href) ? (
                        <video
                          src={resolveReadmeMedia(href)}
                          poster={project.image}
                          controls
                          preload="metadata"
                          playsInline
                          className="w-full rounded"
                        />
                      ) : (
                        <a
                          href={resolveReadmeLink(href)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {children}
                        </a>
                      ),
                  }}
                >
                  {markdown}
                </ReactMarkdown>
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
