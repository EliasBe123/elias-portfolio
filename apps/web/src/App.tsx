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

        <section className="relative bg-gray-800/80 backdrop-blur-lg w-[90%] md:w-[60%] sm:mx-auto shadow-lg pb-16">
          <main id="about" className="max-w-3xl w-full px-4 pt-16 sm:p-6 sm:pt-24 mx-auto">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-white">Elias Benjaminsson</h1>
              <div className="mt-2 flex flex-col md:flex-row items-center space-y-1">
                <div className="inline-block">
                  <p className="text-gray-300 typing">Software Developer</p>
                </div>
                <div className="m-2 hidden sm:block inline-block">
                  <p className="text-gray-300" style={{ whiteSpace: "nowrap", overflow: "hidden", display: "inline-block" }}>&&</p>
                </div>
                <div className="block sm:hidden w-full">
                  <hr className="border-t border-gray-300 my-2 w-full" />
                </div>
                <div className="inline-block">
                  <p className="text-gray-300 typing">Civil Engineering Student</p>
                </div>
              </div>
            </header>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3 text-gray-300">About Me</h2>
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
            
              <div className="w-full relative flex justify-left flex-wrap">
                <a href="#section-timeline" className="text-lg m-6 group font-bold relative w-max border-2 border-green-600 text-green-300">
                  <span className="m-2">Career Timeline</span>
                  <span className="absolute -bottom-2 left-1/2 w-0 transition-all h-0.5 bg-green-600 group-hover:w-3/6"></span>
                  <span className="absolute -bottom-2 right-1/2 w-0 transition-all h-0.5 bg-green-600 group-hover:w-3/6"></span>
                </a>
                <a href="#section-projects" className="text-lg m-6 group font-bold relative w-max border-2 border-green-600 text-green-300">
                  <span className="m-2">Projects</span>
                  <span className="absolute -bottom-2 left-1/2 w-0 transition-all h-0.5 bg-green-600 group-hover:w-3/6"></span>
                  <span className="absolute -bottom-2 right-1/2 w-0 transition-all h-0.5 bg-green-600 group-hover:w-3/6"></span>
                </a>
                <a href="#section-contacts" className="text-lg m-6 group font-bold relative w-max border-2 border-green-600 text-green-300">
                  <span className="m-2">Contacts</span>
                  <span className="absolute -bottom-2 left-1/2 w-0 transition-all h-0.5 bg-green-600 group-hover:w-3/6"></span>
                  <span className="absolute -bottom-2 right-1/2 w-0 transition-all h-0.5 bg-green-600 group-hover:w-3/6"></span>
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
          <path d="M0 0L1200 120L0 120V0Z" fill="#25a154ff" />
        </svg>
      </div>
    </section>

      {/* TIMELINE SECTION */ }
  <section id="section-timeline" className="relative w-[90%] md:w-[60%] sm:mx-auto shadow-lg text-white" style={{ background: "#25a154ff" }}>
    <div className="max-w-4xl mx-auto px-6">
      <Timeline />
    </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] sm:mx-auto">
        <svg
          className="relative block w-full h-[80px]"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <path d="M0 0L1200 120L0 120V0Z" fill="#49b7f2ff" />
        </svg>
      </div>
  </section>
  {/* PROJECTS SECTION */}
  <section id="section-projects" className="relative w-[90%] md:w-[60%] sm:mx-auto text-white" style={{ background: "#49b7f2ff" }}>
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
          <path d="M0 0L1200 120L0 120V0Z" fill="#1f2937" />
        </svg>
      </div>
  </section>
  {/* CONTACTS SECTION */}
  <section id="section-contacts" className="w-[90%] md:w-[60%] sm:mx-auto text-white" style={{ background: "#1f2937" }}>
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
