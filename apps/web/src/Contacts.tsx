import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import Navbar from "./Navbar";

export default function Contacts() {
  const contacts = [
    {
      name: "GitHub",
      icon: <Github className="lg:w-6 lg:h-6 md:w-4 md:h-4" />,
      href: "https://github.com/EliasBe123",
      username: "EliasBe123"
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="lg:w-6 lg:h-6 md:w-4 md:h-4" />,
      href: "https://linkedin.com/in/eliasbenjaminsson",
      username: "eliasbenjaminsson"
    },
    {
      name: "Email",
      icon: <Mail className="lg:w-6 lg:h-6 md:w-4 md:h-4" />,
      href: "mailto:eliasv.benjaminsson@gmail.com",
      username: "eliasv.benjaminsson@gmail.com"
    },
  ];

  return (
    
    <section className="text-white py-16 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-0 text-center">
        {/* Intro paragraph */}
        <h2 className="text-3xl font-bold mb-6">Get in Touch!</h2>
        <p className="mb-12 text-lg text-gray-300 text-left">
          I’m always open to new opportunities and collaborations. Feel free to reach out to me via GitHub, LinkedIn, or Email.
        </p>

        {/* Contacts in a column */}
        <div className="flex flex-col items-left gap-6">
          {contacts.map((contact, index) => (
            <a
              key={index}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-left gap-3 px-4 lg:px-6 py-3 rounded-lg shadow-md bg-gray-700 hover:bg-gray-600 transition sm:w-full md:w-3/5 justify-left"
            >
              {contact.icon}
              <span className="text-sm md:text-lg text-left">{contact.name}: {contact.username}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
