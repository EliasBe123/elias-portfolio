import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Contacts() {
  const contacts = [
    {
      name: "GitHub",
      icon: <Github className="w-5 h-5" />,
      href: "https://github.com/EliasBe123",
      username: "EliasBe123",
      accent: "hover:text-emerald-300 hover:border-emerald-400/60",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://linkedin.com/in/eliasbenjaminsson",
      username: "eliasbenjaminsson",
      accent: "hover:text-cyan-300 hover:border-cyan-400/60",
    },
    {
      name: "Email",
      icon: <Mail className="w-5 h-5" />,
      href: "mailto:eliasv.benjaminsson@gmail.com",
      username: "eliasv.benjaminsson@gmail.com",
      accent: "hover:text-violet-300 hover:border-violet-400/60",
    },
  ];

  return (
    <section className="text-white py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-0">
        <h2 className="text-3xl font-bold mb-4 text-center gradient-text">
          Get in Touch!
        </h2>
        <p className="mb-12 text-lg text-gray-300 text-center max-w-xl mx-auto">
          I’m always open to new opportunities and collaborations. Feel free to
          reach out via GitHub, LinkedIn, or Email.
        </p>

        <div className="flex flex-col items-center gap-4">
          {contacts.map((contact, index) => (
            <a
              key={index}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center gap-4 px-5 py-3 rounded-xl
                bg-white/5 border border-white/10 backdrop-blur-md
                w-full sm:w-4/5 md:w-3/5 hover-lift glow-ring ${contact.accent}`}
            >
              <span className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition">
                {contact.icon}
              </span>
              <div className="flex flex-col text-left">
                <span className="text-xs uppercase tracking-wider text-gray-400">
                  {contact.name}
                </span>
                <span className="text-sm md:text-base break-all">
                  {contact.username}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
