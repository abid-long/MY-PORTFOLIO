import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/About.css";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const shellRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !shellRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        shellRef.current,
        { opacity: 0, y: 44, rotateY: -14, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          rotateY: -4,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      );

      gsap.fromTo(
        [".about-me h3", ".about-me .para"],
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      );

      if (shellRef.current) {
        gsap.to(shellRef.current, {
          y: -16,
          duration: 3.2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }
    }, sectionRef);

    const handleMouseMove = (event: MouseEvent) => {
      if (window.innerWidth < 1024 || !shellRef.current) return;

      const { innerWidth, innerHeight } = window;
      const x = (event.clientX / innerWidth - 0.5) * 2;
      const y = (event.clientY / innerHeight - 0.5) * 2;

      gsap.to(shellRef.current, {
        rotateY: -4 + x * 9,
        rotateX: -y * 6,
        duration: 0.9,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ctx.revert();
    };
  }, []);

  return (
    <div className="about-section" id="about" ref={sectionRef}>
      <div className="about-visual">
        <div className="about-orb about-orb-warm"></div>
        <div className="about-orb about-orb-cool"></div>
        <div className="about-depth-card about-depth-back"></div>
        <div className="about-depth-card about-depth-mid"></div>
        <div className="about-orbit-ring"></div>
        <div className="about-avatar-shell" ref={shellRef}>
          <div className="about-avatar-ring"></div>
          <div className="about-avatar-glow"></div>
          <div className="about-avatar-shine"></div>
          <img
            src="/images/about-avatar.png"
            alt="About section avatar"
            className="about-avatar-image"
          />
        </div>
      </div>
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          I am a Web3 builder and researcher exploring how
          blockchain, privacy tech, and DeFi can create stronger digital trust.
          I care about building products that feel modern, resilient, and
          genuinely useful in a decentralized world.
        </p>
      </div>
    </div>
  );
};

export default About;
