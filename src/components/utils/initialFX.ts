import gsap from "gsap";
import { smoother } from "../Navbar";

export function initialFX() {
  document.body.style.overflowY = "auto";
  smoother.paused(false);
  document.getElementsByTagName("main")[0].classList.add("main-active");
  gsap.to("body", {
    backgroundColor: "#050816",
    duration: 0.25,
  });

  gsap.fromTo(
    [".landing-kicker", ".landing-intro h2", ".landing-intro h1"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.55,
      ease: "power1.out",
      stagger: 0.03,
      delay: 0.02,
    }
  );
  gsap.fromTo(
    [
      ".header",
      ".icons-section",
      ".nav-fade",
      ".landing-summary",
      ".landing-actions",
      ".landing-stats div",
      ".landing-avatar-shell",
      ".landing-visual-caption",
    ],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.48,
      ease: "power1.out",
      delay: 0.05,
      stagger: 0.025,
    }
  );
}
