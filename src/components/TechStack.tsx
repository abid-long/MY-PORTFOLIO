import { useEffect, useState } from "react";
import {
  SiMongodb,
  SiNodedotjs,
  SiReact,
  SiTypescript,
} from "react-icons/si";
import { TbBrandNextjs, TbBrandTailwind } from "react-icons/tb";

const codeLines = [
  'const developer = {',
  '  name: "MD ABID HOSSAIN",',
  '  focus: ["Web3", "DeFi", "Privacy"],',
  '  stack: ["React", "TypeScript", "Node"],',
  '  goal: "Make trust visible"',
  "}",
];

const renderHighlightedLine = (line: string) => {
  if (line.startsWith("const developer")) {
    return (
      <>
        <span className="code-keyword">const</span>
        {" developer = {"}
      </>
    );
  }

  if (line.trim() === "}") {
    return "}";
  }

  const match = line.match(/^(\s*)(\w+):\s*(.+)$/);
  if (!match) {
    return line;
  }

  const [, spaces, prop, value] = match;
  const segments = value.split(/("[^"]*")/g).filter(Boolean);

  return (
    <>
      {spaces}
      <span className="code-prop">{prop}</span>
      {": "}
      {segments.map((segment, index) =>
        segment.startsWith('"') && segment.endsWith('"') ? (
          <span key={`${prop}-${index}`} className="code-string">
            {segment}
          </span>
        ) : (
          <span key={`${prop}-${index}`}>{segment}</span>
        ),
      )}
    </>
  );
};

const TechStack = () => {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);

  useEffect(() => {
    let timeoutId: number;
    let lineIndex = 0;
    let charIndex = 0;

    setVisibleLines([""]);

    const typeNext = () => {
      const currentLine = codeLines[lineIndex];

      if (!currentLine) {
        timeoutId = window.setTimeout(() => {
          lineIndex = 0;
          charIndex = 0;
          setVisibleLines([""]);
          timeoutId = window.setTimeout(typeNext, 400);
        }, 1800);
        return;
      }

      if (charIndex <= currentLine.length) {
        setVisibleLines((prev) => {
          const next = [...prev];
          next[lineIndex] = currentLine.slice(0, charIndex);
          return next;
        });

        charIndex += 1;
        timeoutId = window.setTimeout(typeNext, 52);
        return;
      }

      lineIndex += 1;
      charIndex = 0;

      setVisibleLines((prev) => [...prev, ""]);
      timeoutId = window.setTimeout(typeNext, 260);
    };

    timeoutId = window.setTimeout(typeNext, 700);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <section className="techstack" id="techstack">
      <div className="techstack-backdrop">
        <div className="techstack-blur techstack-blur-left"></div>
        <div className="techstack-blur techstack-blur-right"></div>
      </div>
      <div className="techstack-heading">
        <h2>My Techstack</h2>
        <p>Tools & technologies I use to build modern and scalable web experiences</p>
        <div className="techstack-heading-line">
          <span></span>
        </div>
      </div>
      <div className="techstack-stage">
        <div className="techstack-panel-wrap">
          <div className="techstack-code-panel">
            <div className="techstack-code-icons">
              <span><SiReact /></span>
              <span><SiTypescript /></span>
              <span><SiNodedotjs /></span>
              <span><TbBrandNextjs /></span>
              <span><TbBrandTailwind /></span>
              <span><SiMongodb /></span>
            </div>
            <div className="techstack-code-top">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <pre className="techstack-code-pre">
              <code className="techstack-code-block">
                {visibleLines.map((line, index) => (
                  <span key={`${index}-${line.length}`} className="techstack-code-line">
                    {renderHighlightedLine(line)}
                  </span>
                ))}
                <span className="techstack-cursor"></span>
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
