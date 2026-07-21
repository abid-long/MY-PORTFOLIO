import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { PortfolioPreviewVisual, ComingSoonVisual, ArcPayPreviewVisual, ShelbyPreviewVisual } from "./WorkVisuals";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  number: string;
  title: string;
  category: string;
  tools: string;
  summary: string;
  image: string;
  visual?: ReactNode;
  link: string;
}

const projects: Project[] = [
  {
    number: "01",
    title: "ArcPay Treasury",
    category: "Treasury management",
    tools: "React, treasury UX, institutional flows, product strategy",
    summary:
      "Institutional-grade treasury platform concept on Arc focused on asset control, predictable operations, and high-trust execution surfaces.",
    image: "/images/arcpay-preview.png",
    visual: <ArcPayPreviewVisual />,
    link: "https://github.com/muhtasimmuiz/ArcPay",
  },
  {
    number: "02",
    title: "SHELBY CONTROL ROOM",
    category: "Operations dashboard",
    tools: "Aptos wallet flow, dashboard UX, file operations, monitoring",
    summary:
      "Control-room interface for Shelbynet storage operations with wallet-aware upload flow, blob indexing, live status panels, and operator-first clarity.",
    image: "/images/shelby-preview.png",
    visual: <ShelbyPreviewVisual />,
    link: "https://github.com/muhtasimmuiz/shelby-new-project-1",
  },
  {
    number: "03",
    title: "Abid Portfolio",
    category: "Personal website",
    tools: "React, TypeScript, GSAP, responsive UI, custom motion",
    summary:
      "My personal portfolio website built to present my Web3 focus, project work, design direction, and a more polished identity across desktop and mobile.",
    image: "/images/portfolio-preview.png",
    visual: <PortfolioPreviewVisual />,
    link: "https://github.com/muhtasimmuiz/My-new-protfolio-",
  },
  {
    number: "04",
    title: "Coming Soon",
    category: "In progress",
    tools: "Research, design direction, product thinking",
    summary:
      "Another space kept intentionally open for an upcoming project. It will be replaced with real work once the build is complete.",
    image: "/images/placeholder.webp",
    visual: <ComingSoonVisual />,
    link: "",
  },
];

const Work = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".work-section h2",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".work-section",
            start: "top 78%",
          },
        },
      );

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            y: 70,
            opacity: 0,
            scale: 0.96,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            delay: index * 0.08,
            scrollTrigger: {
              trigger: card,
              start: "top 86%",
            },
          },
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div
              className="work-box"
              key={project.number}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
            >
              <div className="work-info">
                <div className="work-title">
                  <h3>{project.number}</h3>

                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
                <p className="work-summary">{project.summary}</p>
                {project.link && (
                  <a
                    className="work-repo"
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open repository
                  </a>
                )}
              </div>
              <WorkImage
                image={project.image}
                alt={project.title}
                link={project.link}
                visual={project.visual}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
