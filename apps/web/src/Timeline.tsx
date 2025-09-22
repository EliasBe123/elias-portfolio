import React, { useRef, useEffect, useState } from 'react';

const timelineData = [
  { year: '2025', company: 'Company A', role: 'Software Engineer', desc: 'Worked on backend APIs.' },
  { year: '2023', company: 'Company B', role: 'Frontend Developer', desc: 'Built SPAs with React.' },
  { year: '2021', company: 'Company C', role: 'Intern', desc: 'Learned full-stack development.' },
];

export default function Timeline() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<HTMLDivElement | null>(null);

  // Check localStorage on mount
  useEffect(() => {
    const hasVisited = localStorage.getItem("timelineVisited");
    if (hasVisited) {
      setAnimationsEnabled(false);
      setVisibleItems(timelineData.map((_, i) => i));
    }
  }, []);

  // Run observer only if animations are enabled
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
      { root: null, rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => {
      itemRefs.current.forEach((el) => el && observer.unobserve(el));
    };
  }, [visibleItems, animationsEnabled]);

  // After first full run → mark as visited
  useEffect(() => {
    if (animationsEnabled && visibleItems.length === timelineData.length) {
      localStorage.setItem("timelineVisited", "true");
    }
  }, [visibleItems, animationsEnabled]);

  // Reset flag if leaving page while at the very top
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
                >
                  <p className="text-sm text-gray-400">{item.year}</p>
                  <h3 className="text-lg font-semibold">{item.role}</h3>
                  <p className="text-gray-600">{item.company}</p>
                  <p className="mt-2 text-gray-500">{item.desc}</p>
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
