import React, { useRef, useEffect, useState } from 'react';
import Navbar from './Navbar';

const timelineData = [
  { year: '2025', company: 'Company A', role: 'Software Engineer', desc: 'Worked on backend APIs.' },
  { year: '2023', company: 'Company B', role: 'Frontend Developer', desc: 'Built SPAs with React.' },
  { year: '2021', company: 'Company C', role: 'Intern', desc: 'Learned full-stack development.' },
];


export default function Timeline() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // IntersectionObserver to reveal cards
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-index'));
          if (entry.isIntersecting && !visibleItems.includes(index)) {
            setVisibleItems((prev) => [...prev, index]);
          }
        });
      },
      { root: null, rootMargin: '-50% 0px -50% 0px', threshold: 0 } // triggers when card reaches center
    );
    

    itemRefs.current.forEach((el) => el && observer.observe(el));

    return () => {
      itemRefs.current.forEach((el) => el && observer.unobserve(el));
    };
  }, [visibleItems]);
  const timelineRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className='min-h-screen bg-animated'>
      <Navbar />
      <div className="relative max-w-3xl mx-auto p-6 pt-24">
        <h1 className="text-3xl font-bold mb-12 text-center">My Career Timeline</h1>

        <div className="relative pb-64 lg:pb-96 pt-32" ref={timelineRef}>
            {/* Vertical timeline line */}
            <div className="absolute left-1/2 -translate-x-1/2 w-1 bg-gray-300 top-0 bottom-0"
            style={{
                height: `${
                    itemRefs.current[timelineData.length - 1]
                    ? itemRefs.current[timelineData.length - 1]!.offsetTop +
                    itemRefs.current[timelineData.length - 1]!.offsetHeight / 2
                    : 0
                }px`,
                }}
            >
                <div
                className="bg-blue-500 w-full origin-top transition-all duration-700"
                style={{
                    height: `${visibleItems.length > 0
                    ? itemRefs.current[visibleItems[visibleItems.length - 1]]!.offsetTop +
                        itemRefs.current[visibleItems[visibleItems.length - 1]]!.offsetHeight / 2
                    : 0
                    }px`,
                }}
                />
            </div>


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
                        isLeft ? 'md:justify-start justify-center' : 'md:justify-end justify-center'
                    }`}
                >
                  {/* Card */}
                  <div
                    style={{ transitionDelay: `${index * 200}ms` }} // stagger animation
                    className={`
                      bg-white p-6 rounded-lg shadow-md w-72 sm:w-80
                      transform transition-all duration-700 ease-out
                      ${isVisible 
                        ? (isLeft ? 'translate-x-0 opacity-100' : 'ml-auto opacity-100') 
                        : isLeft 
                            ? 'md:-translate-x-40 opacity-0' 
                            : 'md:translate-x-40 opacity-0'
                        }
                    `}
                  >
                    <p className="text-sm text-gray-400">{item.year}</p>
                    <h3 className="text-lg font-semibold">{item.role}</h3>
                    <p className="text-gray-600">{item.company}</p>
                    <p className="mt-2 text-gray-500">{item.desc}</p>
                  </div>

                  {/* Timeline dot */}
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 top-8 w-4 h-4 rounded-full
                      ${isVisible ? 'bg-blue-500 scale-100' : 'bg-gray-300 scale-0'}
                      transition-all duration-500 hidden md:block
                      `}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
