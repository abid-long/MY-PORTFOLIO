import {
  FaGithub,
  FaEnvelope,
  FaTelegram,
  FaXTwitter,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { useEffect } from "react";
import HoverLinks from "./HoverLinks";

const emailComposeUrl =
  "https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=ah5255271@gmail.com";

const SocialIcons = () => {
  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement;

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;

      const rect = elem.getBoundingClientRect();
      let mouseX = rect.width / 2;
      let mouseY = rect.height / 2;
      let currentX = 0;
      let currentY = 0;

      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);

        requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (e: MouseEvent) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < 40 && x > 10 && y < 40 && y > 5) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = rect.width / 2;
          mouseY = rect.height / 2;
        }
      };

      document.addEventListener("mousemove", onMouseMove);

      updatePosition();

      return () => {
        elem.removeEventListener("mousemove", onMouseMove);
      };
    });
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a href="https://github.com/abid-long" target="_blank" rel="noreferrer">
            <FaGithub />
          </a>
        </span>
        <span>
          <a href={emailComposeUrl} target="_blank" rel="noreferrer">
            <FaEnvelope />
          </a>
        </span>
        <span>
          <a href="https://x.com/mdabidhossain07" target="_blank" rel="noreferrer">
            <FaXTwitter />
          </a>
        </span>
        <span>
          <a href="https://t.me/muhtasim706" target="_blank" rel="noreferrer">
            <FaTelegram />
          </a>
        </span>
      </div>
      <a className="resume-button" href="#contact">
        <HoverLinks text="LET'S TALK" />
      </a>
    </div>
  );
};

export default SocialIcons;
