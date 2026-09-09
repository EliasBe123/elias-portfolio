import Navbar from "./Navbar";
import Timeline from "./Timeline";
import Projects from "./Projects";
import Footer from "./Footer";
import Contacts from "./Contacts";


export default function App() {

  return (
    <div className="min-h-screen bg-animated flex flex-col">
      <Navbar />

      {/* MAIN SECTION */}
      <div>

        <section className="relative glass w-[90%] md:w-[60%] sm:mx-auto shadow-2xl pb-16 rounded-b-2xl">
          <main id="about" className="max-w-3xl w-full px-4 pt-16 sm:p-6 sm:pt-24 mx-auto">
            <header className="mb-8">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight gradient-text">
                Elias Benjaminsson
              </h1>
              <div className="mt-3 flex flex-col md:flex-row items-center space-y-1">
                <div className="inline-block">
                  <p className="text-gray-300 typing">Software Developer</p>
                </div>
                <div className="m-2 hidden sm:block">
                  <p className="text-emerald-400 font-bold">&&</p>
                </div>
                <div className="block sm:hidden w-full">
                  <hr className="border-t border-gray-300/40 my-2 w-full" />
                </div>
                <div className="inline-block">
                  <p className="text-gray-300 typing">Civil Engineering Student</p>
                </div>
              </div>
            </header>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3 text-emerald-300">About Me</h2>
              <p className="leading-relaxed text-gray-300">
                Hi, I’m Elias, an Information Technology student at Uppsala University, 
                currently pursuing a Master’s in Data Analysis. With the rise of LLMs, 
                I’ve adopted a mindset that competition in software development is going to get tougher. 
                While LLMs can’t replace developers yet, they do make work more efficient, 
                meaning fewer developers are needed. 
                That’s why I strive to challenge myself beyond my studies by working in software development 
                alongside my academic work and tackling exciting personal projects, such as this website.
              </p>
              <p className="leading-relaxed text-gray-300 mt-4">
                I have professional experience in IT consulting and currently contribute to 
                software development in the aviation industry. During IT consulting, 
                I worked on legacy systems over 20 years old, which was both a challenge and a 
                lesson in managing technical debt and feature creep. Through my personal projects, 
                as well as my work at Aviation iSolutions and Saab, I’ve gained extensive experience in 
                full-stack development using modern frameworks like React, Node.js, Docker, and Vue. I’ve 
                built CI/CD pipelines, configured reverse proxies, and optimized applications for 
                performance and maintainability.
              </p>
              <p className="leading-relaxed text-gray-300 mt-4">
                I enjoy solving complex problems, collaborating in cross-functional teams, 
                and continuously learning new technologies. My goal is to contribute to 
                innovative software projects that have real-world impact while continuously 
                expanding my technical expertise and adapting to the evolving landscape of IT.
              </p>
            </section>

            <section className="mb-8">
            
              <div className="w-full relative flex justify-start flex-wrap gap-3">
                <a href="#section-timeline" className="px-5 py-2.5 rounded-lg font-semibold bg-emerald-500/10 border border-emerald-400/40 text-emerald-300 hover:bg-emerald-500/20 hover:border-emerald-400 hover-lift">
                  Career Timeline →
                </a>
                <a href="#section-projects" className="px-5 py-2.5 rounded-lg font-semibold bg-cyan-500/10 border border-cyan-400/40 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400 hover-lift">
                  Projects →
                </a>
                <a href="#section-contacts" className="px-5 py-2.5 rounded-lg font-semibold bg-violet-500/10 border border-violet-400/40 text-violet-300 hover:bg-violet-500/20 hover:border-violet-400 hover-lift">
                  Contacts →
                </a>
              </div>
        </section>
      </main>

      {/* Diagonal divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] sm:mx-auto">
        <svg
          className="relative block w-full h-[80px]"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <path d="M0 0L1200 120L0 120V0Z" fill="#0f766e" />
        </svg>
      </div>
    </section>

      {/* TIMELINE SECTION */ }
  <section id="section-timeline" className="relative w-[90%] md:w-[60%] sm:mx-auto shadow-lg text-white" style={{ background: "#0f766e" }}>
    <div className="max-w-4xl mx-auto">
      <Timeline />
    </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] sm:mx-auto">
        <svg
          className="relative block w-full h-[80px]"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <path d="M0 0L1200 120L0 120V0Z" fill="#1e40af" />
        </svg>
      </div>
  </section>
  {/* PROJECTS SECTION */}
  <section id="section-projects" className="relative w-[90%] md:w-[60%] sm:mx-auto text-white" style={{ background: "#1e40af" }}>
    <div className="max-w-4xl mx-auto px-6 pb-32">
        <Projects />
      </div>
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] sm:mx-auto">
        <svg
          className="relative block w-full h-[80px]"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <path d="M0 0L1200 120L0 120V0Z" fill="#111827" />
        </svg>
      </div>
  </section>
  {/* CONTACTS SECTION */}
  <section id="section-contacts" className="w-[90%] md:w-[60%] sm:mx-auto text-white rounded-b-2xl" style={{ background: "#111827" }}>
    <div className="max-w-4xl mx-auto px-6 pb-32">
        <Contacts />
      </div>
    </section>
  {/* FOOTER */}
  <Footer />
      </div >
    </div >
  );
}
