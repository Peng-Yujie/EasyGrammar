import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const navLinks = [
    { href: "/home", label: "Home" },
    { href: "/about", label: "About" },
    {
      href: "https://www.linkedin.com/in/yujie-peng-8276b1279/",
      label: "Contact",
    },
  ];
  return (
    <>
      <div className="mt-12 flex-grow" />
      <footer className="items-center bg-purple-100 py-2 md:rounded-t-2xl">
        <div className="">
          {/* for social media */}
          <h2 className="text-2xl font-bold text-gradient mt-6">
            Easy Grammar
          </h2>
        </div>
        <div className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
          <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              © 2024{" "}
              <a href="/" className="hover:underline">
                Easy Grammar
              </a>
              . All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center justify-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
              {navLinks.map((link) => (
                <Link key={link.label} to={link.href} className="me-4 md:me-6">
                  <li key={link.label}>{link.label}</li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
