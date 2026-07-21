import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./styles/Landing.css";

const Landing = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const copyRef = useRef<HTMLDivElement | null>(null);
  const visualRef = useRef<HTMLDivElement | null>(null);
  const avatarRef = useRef<HTMLDivElement | null>(null);
  const energyLeftRef = useRef<HTMLDivElement | null>(null);
  const energyRightRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !copyRef.current || !visualRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        [
          ".landing-kicker",
          ".landing-intro h2",
          ".landing-intro h1",
          ".landing-summary",
          ".landing-note",
          ".landing-actions",
          ".landing-stats div",
        ],
        { opacity: 0, y: 34 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.08,
          delay: 0.15,
        },
      );

      if (avatarRef.current) {
        gsap.fromTo(
          avatarRef.current,
          { opacity: 0, y: 36, rotateY: -10, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            rotateY: -4,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            delay: 0.28,
          },
        );

        gsap.to(avatarRef.current, {
          y: -14,
          duration: 2.8,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      [energyLeftRef.current, energyRightRef.current].forEach((node, index) => {
        if (!node) return;
        gsap.to(node, {
          y: index === 0 ? -12 : 12,
          x: index === 0 ? -8 : 8,
          duration: index === 0 ? 3.4 : 4.2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
    }, sectionRef);

    const handleMouseMove = (event: MouseEvent) => {
      if (window.innerWidth < 1024) return;

      const { innerWidth, innerHeight } = window;
      const x = (event.clientX / innerWidth - 0.5) * 2;
      const y = (event.clientY / innerHeight - 0.5) * 2;

      if (avatarRef.current) {
        gsap.to(avatarRef.current, {
          x: x * 12,
          y: y * 8 - 14,
          rotateY: -4 + x * 8,
          rotateX: -y * 5,
          duration: 0.8,
          ease: "power3.out",
        });
      }

      if (copyRef.current) {
        gsap.to(copyRef.current, {
          x: x * -8,
          y: y * -6,
          duration: 0.9,
          ease: "power3.out",
        });
      }

      if (gridRef.current) {
        gsap.to(gridRef.current, {
          x: x * 18,
          y: y * 14,
          duration: 1.1,
          ease: "power3.out",
        });
      }

      if (energyLeftRef.current) {
        gsap.to(energyLeftRef.current, {
          x: x * -14,
          y: y * -10,
          duration: 1,
          ease: "power3.out",
        });
      }

      if (energyRightRef.current) {
        gsap.to(energyRightRef.current, {
          x: x * 14,
          y: y * 10,
          duration: 1,
          ease: "power3.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ctx.revert();
    };
  }, []);

  return (
    <div className="landing-section" id="landingDiv" ref={sectionRef}>
      <div className="landing-backdrop">
        <div className="landing-backdrop-flame"></div>
        <div className="landing-backdrop-frost"></div>
        <div className="landing-grid" ref={gridRef}></div>
      </div>
      <div className="landing-container">
        <p className="landing-kicker">Web3 builder - researcher - product systems</p>
        <div className="landing-copy" ref={copyRef}>
          <div className="landing-intro">
            <h2>Hello, I&apos;m</h2>
            <h1>
              ABID
              <br />
              <span>HOSSAIN</span>
            </h1>
          </div>
          <p className="landing-summary">
            Web3 builder and researcher focused on blockchain, privacy tech,
            and DeFi. I rethink trust through decentralized products and
            cinematic web experiences.
          </p>
          <p className="landing-note">
            Currently building sharper interfaces for treasury control,
            wallet-aware tooling, and decentralized systems that need clarity
            under pressure.
          </p>
          <div className="landing-actions">
            <a href="#work" className="landing-button landing-button-primary">
              View projects
            </a>
            <a
              href="https://github.com/abid-long"
              target="_blank"
              rel="noreferrer"
              className="landing-button landing-button-ghost"
            >
              GitHub
            </a>
          </div>
          <div className="landing-stats">
            <div>
              <span>Focus</span>
              <strong>Blockchain + product UX</strong>
            </div>
            <div>
              <span>Style</span>
              <strong>Privacy-first, high-trust systems</strong>
            </div>
          </div>
        </div>
        <div className="landing-visual" ref={visualRef}>
          <div
            className="landing-energy landing-energy-left"
            ref={energyLeftRef}
          ></div>
          <div
            className="landing-energy landing-energy-right"
            ref={energyRightRef}
          ></div>
          <div className="landing-depth-card landing-depth-back"></div>
          <div className="landing-depth-card landing-depth-mid"></div>
          <div className="landing-orbit-ring"></div>
          <div className="landing-avatar-shell" ref={avatarRef}>
            <div className="landing-avatar-frame"></div>
            <div className="landing-avatar-glow"></div>
            <div className="landing-avatar-shine"></div>
            <img
              src="/images/avatar-reference-v2.png"
              alt="Abid Hossain avatar"
              className="landing-avatar-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
