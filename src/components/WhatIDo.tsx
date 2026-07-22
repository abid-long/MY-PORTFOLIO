import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const serviceCards = [
  {
    title: "BUILD",
    subtitle: "Product direction",
    description:
      "I turn early Web3 ideas into usable interfaces, clearer product flows, and systems that feel trustworthy from first interaction to core action.",
    tags: [
      "Web3 products",
      "Frontend systems",
      "UX flows",
      "Research-to-build",
    ],
  },
  {
    title: "RESEARCH",
    subtitle: "Protocol thinking",
    description:
      "I explore blockchain design, privacy tech, and DeFi mechanics to understand where trust breaks, how incentives behave, and what better systems can look like.",
    tags: [
      "Blockchain",
      "Privacy tech",
      "DeFi",
      "Experimentation",
    ],
  },
];

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };
  useEffect(() => {
    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          container.addEventListener("click", () => handleClick(container));
        }
      });
    }
    return () => {
      containerRef.current.forEach((container) => {
        if (container) {
          container.removeEventListener("click", () => handleClick(container));
        }
      });
    };
  }, []);

  useEffect(() => {
    if (!wrapRef.current || !cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 46, rotateY: -18, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          rotateY: -10,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top 78%",
          },
        },
      );

      if (cardRef.current) {
        gsap.to(cardRef.current, {
          y: -16,
          duration: 3.4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }
    }, wrapRef);

    const handleMouseMove = (event: MouseEvent) => {
      if (window.innerWidth < 1024 || !cardRef.current) return;

      const { innerWidth, innerHeight } = window;
      const x = (event.clientX / innerWidth - 0.5) * 2;
      const y = (event.clientY / innerHeight - 0.5) * 2;

      gsap.to(cardRef.current, {
        rotateY: -10 + x * 8,
        rotateX: 5 - y * 6,
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
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-visual-wrap" ref={wrapRef}>
          <div className="what-visual-orbit"></div>
          <div className="what-visual-glow what-visual-glow-left"></div>
          <div className="what-visual-glow what-visual-glow-right"></div>
          <div className="what-visual-card" ref={cardRef}>
            <div className="what-visual-shine"></div>
            <div className="what-visual-image-wrap">
              <img
                src="/images/whatido-visual.png"
                alt="Abid working at a coding desk"
                className="what-visual-image"
              />
              <div className="what-visual-screens">
                <div className="what-screen what-screen-1">
                  <span className="what-type-line line1">const flow = () =&gt; {"{"}</span>
                  <span className="what-type-line line2">connectWallet();</span>
                </div>
                <div className="what-screen what-screen-2">
                  <span className="what-type-line line3">function verify(tx) {"{"}</span>
                  <span className="what-type-line line4">return zk.check(tx);</span>
                </div>
                <div className="what-screen what-screen-3">
                  <span className="what-type-line line5">export default App;</span>
                  <span className="what-type-line line6">{"// build trust"}</span>
                </div>
                <div className="what-keyboard-glow"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 0)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>{serviceCards[0].title}</h3>
              <h4>{serviceCards[0].subtitle}</h4>
              <p>
                {serviceCards[0].description}
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                {serviceCards[0].tags.map((tag) => (
                  <div className="what-tags" key={tag}>
                    {tag}
                  </div>
                ))}
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 1)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>{serviceCards[1].title}</h3>
              <h4>{serviceCards[1].subtitle}</h4>
              <p>
                {serviceCards[1].description}
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                {serviceCards[1].tags.map((tag) => (
                  <div className="what-tags" key={tag}>
                    {tag}
                  </div>
                ))}
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
