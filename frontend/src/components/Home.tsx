import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

const buttons = [
  {
    label: "UI/UX Design",
    href: "/design",
  },
  {
    label: "Development",
    href: "/development",
  },
  {
    label: "Mobile",
    href: "/mobile",
  },
  {
    label: "ML & AI Development",
    href: "/ml-ai",
  },
];

export const Home = () => {
  return (
    <section className="mt-16 bg-white">
      <div className="flex flex-col gap-y-8 px-4">
        <div className="flex items-center justify-between">
          {/* Corrected typographical errors in the heading */}
          <h1 className="text-5xl text-black max-w-lg">
            We transform visions into masterpieces for pioneering brands
          </h1>

          {/* Corrected typographical error in the subheading */}
          <h1 className="hidden md:block max-w-[200px] text-sm mx-auto text-black font-normal pl-8">
            Trusted by 50+ leading brands for exceptional design solutions
          </h1>
        </div>

        <div className="mt-5 flex flex-col md:flex-row items-center justify-between">
          <div className="flex gap-2 md:gap-4">
            {buttons.map((button) => (
              <Link
                href={button.href}
                key={button.label}
                className={cn(
                  buttonVariants({ variant: "secondary" }),
                  // Ensure proper spacing and responsive design for buttons
                  "rounded-2xl bg-gray-100 text-sm font-semibold text-black block md:inline-block w-full md:w-auto"
                )}
              >
                {button.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex gap-2 max-w-[200px] mx-auto mt-4 md:mt-0">
            <Button className="rounded-2xl w-full">Get a proposal</Button>
            <Button variant="outline" className="rounded-2xl w-full">
              Meet the team
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 mt-5 relative">
        <video
          loop
          autoPlay
          muted
          src="/video.mp4"
          className="w-full rounded-2xl h-[600px] object-cover"
        />

        <div className="absolute top-4 right-6 w-[250px] h-auto bg-white rounded-lg p-4 shadow-lg">
          <h1 className="font-bold text-black">Baxtior Farhodov</h1>
          <p className="font-light text-muted-foreground text-sm mt-2">
            Engineer
          </p>

          <p className="text-xs text-black font-light uppercase mt-4">
            He is always ready to turn complex ideas into user-friendly digital
            experiences
          </p>
        </div>
      </div>
    </section>
  );
};
