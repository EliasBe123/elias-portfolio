import React, { useRef, useEffect, useState } from 'react';

const timelineData = [
  {
    year: '2025',
    period: 'Autumn',
    company: 'Uppsala University',
    role: 'Masters in Computer Science',
    desc: 'Continuing my studies with a focus on data analysis, machine learning, and advanced algorithms.',
    techStack: 'Statistics, Data Engineering, Natural Computing Methods For ML'
  },
  {
    year: '2025',
    period: 'Summer',
    company: 'Saab',
    role: 'Software Developer',
    desc: 'Worked on a drone detection application through the use of sensor fusion, fusing image detection and sound localization.',
    techStack: 'C, Python, YOLOv13, FPGA'
  },
  {
    year: '2024–Now',
    company: 'Aviation iSolutions',
    role: 'Software Developer',
    desc: 'Contributed to modern full-stack projects, including frontend and backend development.',
    techStack: 'JavaScript, Vue, Go, Postgresql, Docker'
  },
  {
    year: '2022-2025',
    company: 'Uppsala University',
    role: 'Bachelor of science',
    desc: 'Started my studies in Civil Engineering In Information Technology.',
    techStack: 'Java, C, Python, SQL, Linux'
  },
  {
    year: '2021',
    period: 'Autumn',
    company: 'Sylog AB',
    role: 'Trainee Consultant',
    desc: 'Worked on a troubleshooting application for Scania trucks and buses using C/C++, improving maintenance efficiency. Optimized code to reduce application CPU usage by 14%.',
    techStack: 'C, C++, Valgrind'
  },
];


export default function Timeline() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [expandedCards, setExpandedCards] = useState<number[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const hasVisited = localStorage.getItem("timelineVisited");
    if (hasVisited) {
      setAnimationsEnabled(false);
      setVisibleItems(timelineData.map((_, i) => i));
    }
  }, []);

  useEffect(() => {
    if (!animationsEnabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting && !visibleItems.includes(index)) {
            setVisibleItems((prev) => [...prev, index]);
          }
        });
      },
      { root: null, rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => {
      itemRefs.current.forEach((el) => el && observer.unobserve(el));
    };
  }, [visibleItems, animationsEnabled]);

  // Mark timeline as visited after animations complete
  useEffect(() => {
    if (animationsEnabled && visibleItems.length === timelineData.length) {
      localStorage.setItem("timelineVisited", "true");
    }
  }, [visibleItems, animationsEnabled]);

  // Reset animations if leaving page at top
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (window.scrollY < 50) {
        localStorage.removeItem("timelineVisited");
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // Toggle expanded state for cards
  const toggleCard = (index: number) => {
    if (expandedCards.includes(index)) {
      setExpandedCards(expandedCards.filter((i) => i !== index));
    } else {
      setExpandedCards([...expandedCards, index]);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
      <h2 className="text-3xl font-bold mb-12 text-center">My Career Timeline</h2>

      <div className="relative pb-64 lg:pb-96 pt-32" ref={timelineRef}>
        {/* Vertical line */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-1 bg-white top-0 bottom-0"
          style={{
            height: `${
              itemRefs.current.length > 0
                ? itemRefs.current[timelineData.length - 1]
                  ? itemRefs.current[timelineData.length - 1]!.offsetTop +
                    itemRefs.current[timelineData.length - 1]!.offsetHeight / 2
                  : 0
                : 1000
            }px`,
          }}
        >
          <div
            className={`w-full origin-top transition-all duration-700 ${
              animationsEnabled ? "bg-gray-800" : "bg-gray-800 h-full"
            }`}
            style={{
              height: animationsEnabled
                ? `${
                    visibleItems.length > 0
                      ? itemRefs.current[visibleItems[visibleItems.length - 1]]!.offsetTop +
                        itemRefs.current[visibleItems[visibleItems.length - 1]]!.offsetHeight / 2
                      : 0
                  }px`
                : "100%",
            }}
          />
        </div>

        {/* Cards */}
        <div className="space-y-56">
          {timelineData.map((item, index) => {
            const isLeft = index % 2 === 0;
            const isVisible = visibleItems.includes(index);

            return (
              <div
                key={index}
                ref={(el) => (itemRefs.current[index] = el)}
                data-index={index}
                className={`relative w-full flex ${
                  isLeft ? "md:justify-start justify-center" : "md:justify-end justify-center"
                }`}
              >
                <div
                  style={animationsEnabled ? { transitionDelay: `${index * 200}ms` } : {}}
                  className={`
                    bg-white text-black p-6 rounded-lg shadow-md w-72 sm:w-80
                    transform transition-all duration-700 ease-out z-10
                    cursor-pointer
                    ${
                      isVisible
                        ? isLeft
                          ? "translate-x-0 opacity-100"
                          : "ml-auto opacity-100"
                        : isLeft
                        ? "md:-translate-x-40 opacity-0"
                        : "md:translate-x-40 opacity-0"
                    }
                  `}
                  onClick={() => toggleCard(index)}
                >
                  <p className="text-sm text-gray-400">{item.year}</p>
                  {item.period && <p className="text-xs text-gray-400">{item.period}</p>}
                  <h3 className="text-lg font-semibold">{item.role}</h3>
                  <p className="flex items-center text-gray-600 gap-2">
                    <img 
                      src={`/public/${item.company.replace(/\s+/g, '').toLowerCase()}.png`} 
                      alt="Company icon" 
                      className="w-4 h-4"
                    />
                    {item.company}
                  </p>
                  <p
                    className={`mt-2 text-gray-500 transition-all duration-500 cursor-pointer ${
                      expandedCards.includes(index) ? "max-h-96" : "max-h-24 overflow-hidden"
                    }`}
                    onClick={() => {
                      if (item.desc.length > 70) toggleCard(index);
                    }}
                  >
                    {expandedCards.includes(index)
                      ? item.desc
                      : item.desc.length > 70
                        ? item.desc.slice(0, 70) + "..."
                        : item.desc
                    }
                  </p>

                  {item.desc.length > 70 && (
                    <span
                      className="text-purple-500 text-sm mt-1 block cursor-pointer"
                      onClick={() => toggleCard(index)}
                    >
                      {expandedCards.includes(index) ? "Show less" : "Read more"}
                    </span>
                  )}
                    {item.techStack && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {item.techStack.split(',').map((tech) => (
                          <span
                            key={tech.trim()}
                            className="text-orange-600 border border-orange-400 rounded-full px-3 py-1 text-xs font-semibold"
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}


                </div>

                <div
                  className={`absolute left-1/2 -translate-x-1/2 top-8 w-4 h-4 rounded-full
                    ${isVisible ? "bg-gray-800 scale-100" : "bg-gray-400 scale-0"}
                    transition-all duration-500 hidden md:block`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
