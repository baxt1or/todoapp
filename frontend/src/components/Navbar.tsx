"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const links = [
  {
    label: "Work",
    href: "/work",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Servicest",
    href: "/services",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export const Navbar = () => {
  const pathname = usePathname();
  return (
    <header className="fixed top-0 right-0 left-0 h-12 p-4 bg-white">
      <nav className="flex items-center justify-between">
        <Link
          href={"/"}
          className="text-md font-extrabold text-black hover:opacity-50"
        >
          smalltribe
        </Link>

        <div className="hidden md:flex items-center gap-4 ">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "text-sm font-bold text-black cursor-pointer ",
                pathname === link.href && "opacity-50"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <h1 className="text-sm font-bold text-black hover:opacity-50 cursor-pointer">
          Tashkent,Uzbekistan
        </h1>

        <Link
          href={"/"}
          className="hidden md:block underline font-semibold text-black text-sm hover:opacity-50 underline-offset-1"
        >
          Get a proposal
        </Link>

        {/* Mobile Navbar */}
      </nav>
    </header>
  );
};
