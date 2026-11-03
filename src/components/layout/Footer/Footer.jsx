import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { personalInfo } from "../../../data/personalData";

export default function PortfolioFooter() {
  return (
    <footer className="pf-footer">
      <div className="pf-wrap">
        <div className="pf-footer-top">
          <div>
            <Link className="pf-brand" to="/" aria-label="Taskin Mubassir home">
              tmm<span>.</span>
            </Link>
            <p>Thoughtful code. Meaningful experiences.</p>
          </div>
          <nav aria-label="Footer navigation">
            <Link to="/about">About</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/blog">Journal</Link>
            <Link to="/guestbook">Guestbook</Link>
            <Link to="/contact">Contact</Link>
          </nav>
          <div className="pf-footer-social">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
            <a href={`mailto:${personalInfo.email}`} aria-label="Email">
              <FiArrowUpRight />
            </a>
          </div>
        </div>
        <div className="pf-footer-bottom">
          <span>© {new Date().getFullYear()} Taskin Mohammad Mubassir</span>
          <span>
            Made with curiosity & a little caffeine{" "}
            <span className="pf-accent">✳</span>
          </span>
          <a
            href="#top"
            onClick={(event) => {
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
