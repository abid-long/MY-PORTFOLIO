import { useEffect, useRef } from "react";
import "./styles/Career.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const timelineEntries = [
  {
    role: "Early builder mindset",
    company: "Independent learning phase",
    year: "2023",
    description:
      "Started building a stronger foundation around frontend systems, product thinking, and how digital experiences can earn user trust instead of just demanding it.",
  },
  {
    role: "Web3 research and exploration",
    company: "Blockchain, privacy, and DeFi",
    year: "2024",
    description:
      "Moved deeper into blockchain design, privacy tech, and DeFi research to understand protocol behavior, trust models, and the product gaps that still need better interfaces.",
  },
  {
    role: "Product experiments",
    company: "ArcPay Treasury and SHELBY CONTROL ROOM",
    year: "2026",
    description:
      "Focused on concept-building through projects that combine interface design, monitoring workflows, treasury thinking, and operational clarity for high-trust systems.",
  },
  {
    role: "Web3 builder & researcher",
    company: "Current direction",
    year: "NOW",
    description:
      "Currently shaping a portfolio around decentralized product ideas, trust-first user experiences, and research-backed systems that feel modern, useful, and resilient.",
  },
];

const Career = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const boxesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".career-section h2",
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
          },
        },
      );

      if (timelineRef.current) {
        gsap.fromTo(
          timelineRef.current,
          { maxHeight: "0%" },
          {
            maxHeight: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 72%",
              end: "bottom 82%",
              scrub: true,
            },
          },
        );
      }

      boxesRef.current.forEach((box, index) => {
        if (!box) return;

        gsap.fromTo(
          box,
          {
            y: 54,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            delay: index * 0.08,
            scrollTrigger: {
              trigger: box,
              start: "top 86%",
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="career-section section-container" ref={sectionRef}>
      <div className="career-container">
        <h2>
          My path <span>&</span>
          <br /> direction
        </h2>
        <div className="career-info">
          <div className="career-timeline" ref={timelineRef}>
            <div className="career-dot"></div>
          </div>
          {timelineEntries.map((entry, index) => (
            <div
              className="career-info-box"
              key={`${entry.year}-${entry.role}`}
              ref={(el) => {
                boxesRef.current[index] = el;
              }}
            >
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{entry.role}</h4>
                  <h5>{entry.company}</h5>
                </div>
                <h3>{entry.year}</h3>
              </div>
              <p>{entry.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;
