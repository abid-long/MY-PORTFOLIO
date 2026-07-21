import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const emailComposeUrl =
  "https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=ah5255271@gmail.com";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a
                href={emailComposeUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
              >
                ah5255271@gmail.com
              </a>
            </p>
            <h4>Focus</h4>
            <p>Web3, blockchain research, privacy tech, and DeFi products.</p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/abid-long"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Github <MdArrowOutward />
            </a>
            <a
              href={emailComposeUrl}
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Email <MdArrowOutward />
            </a>
            <a
              href="https://x.com/mdabidhossain07"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              X / Twitter <MdArrowOutward />
            </a>
            <a
              href="https://t.me/muhtasim706"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Telegram <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and developed <br /> by <span>MD ABID HOSSAIN</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
