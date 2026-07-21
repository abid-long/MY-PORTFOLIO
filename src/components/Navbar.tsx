import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import MyLocation from "./MyLocation";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);
export let smoother: { paused: (_value: boolean) => void; scrollTo: (target: string) => void } = {
  paused: () => undefined,
  scrollTo: (target: string) => {
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  },
};

const Navbar = () => {
  const [showMyLocation, setShowMyLocation] = useState(false);

  useEffect(() => {
    smoother = {
      paused: () => undefined,
      scrollTo: (target: string) => {
        const element = document.querySelector(target);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      },
    };

    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          let elem = e.currentTarget as HTMLAnchorElement;
          let section = elem.getAttribute("data-href");
          if (section) {
            smoother.scrollTo(section);
          }
        }
      });
    });
  }, []);
  return (
    <>
      <div className="header">
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
          <li>
            <button
              type="button"
              className="nav-location-btn"
              onClick={() => setShowMyLocation(true)}
            >
              <HoverLinks text="MY LOCATION" />
            </button>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>

      <MyLocation
        isOpen={showMyLocation}
        onClose={() => setShowMyLocation(false)}
      />
    </>
  );
};

export default Navbar;
