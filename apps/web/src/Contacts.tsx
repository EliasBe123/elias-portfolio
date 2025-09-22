import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import Navbar from "./Navbar";

export default function Contacts() {
  const contacts = [
    {
      name: "GitHub",
      icon: <Github className="w-6 h-6" />,
      href: "https://github.com/EliasBe123",
      username: "EliasBe123"
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-6 h-6" />,
      href: "https://linkedin.com/in/eliasbenjaminsson",
      username: "eliasbenjaminsson"
    },
    {
      name: "Email",
      icon: <Mail className="w-6 h-6" />,
      href: "mailto:eliasv.benjaminsson@gmail.com",
      username: "eliasv.benjaminsson@gmail.com"
    },
  ];

  return (
    
    <section className="text-white py-16 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        {/* Intro paragraph */}
        <h2 className="text-3xl font-bold mb-6">Get in Touch!</h2>
        <p className="mb-12 text-lg text-gray-300">
          I’m always open to new opportunities and collaborations. Feel free to reach out to me via GitHub, LinkedIn, or Email.
        </p>

        {/* Contacts in a column */}
        <div className="flex flex-col items-center gap-6">
          {contacts.map((contact, index) => (
            <a
              key={index}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 rounded-lg shadow-md bg-gray-800 hover:bg-gray-700 transition w-96 justify-center"
            >
              {contact.icon}
              <span className="text-lg">{contact.name}: {contact.username}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
