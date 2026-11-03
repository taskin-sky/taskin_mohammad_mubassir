import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowUpRight,
  FiArrowDown,
  FiDownload,
  FiMapPin,
  FiCode,
  FiLayers,
  FiDatabase,
  FiCpu,
  FiX,
  FiExternalLink,
} from "react-icons/fi";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiJavascript,
  SiTailwindcss,
  SiPython,
  SiGit,
  SiExpress,
} from "react-icons/si";
import SEO from "../../components/SEO";
import { personalInfo, achievements } from "../../data/personalData";
import { projects } from "../../data/projectsData";
import { skillCategories } from "../../data/skillsData";
import "./project-showcase.css";
import "./hero.css";

const stack = [
  { name: "React", Icon: SiReact, color: "#61dafb" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#83cd29" },
  { name: "MongoDB", Icon: SiMongodb, color: "#5bbd75" },
  { name: "JavaScript", Icon: SiJavascript, color: "#f2d85b" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#42c7df" },
  { name: "Python", Icon: SiPython, color: "#88aaf1" },
  { name: "Express", Icon: SiExpress, color: "#c7ccd5" },
  { name: "Git", Icon: SiGit, color: "#ee846e" },
];
const capabilities = [
  {
    Icon: FiCode,
    title: "Frontend development",
    text: "Thoughtful interfaces. Smooth interactions. Built for every screen.",
    tags: ["React.js", "JavaScript", "Tailwind CSS"],
  },
  {
    Icon: FiDatabase,
    title: "Backend & APIs",
    text: "Connecting the dots with robust APIs and well-structured data.",
    tags: ["Node.js", "Express.js", "MongoDB", "MySQL"],
  },
  {
    Icon: FiCpu,
    title: "Beyond the browser",
    text: "Exploring intelligent systems through machine learning and robotics.",
    tags: ["Python", "Machine Learning", "Robotics"],
  },
];

export default function PortfolioHome() {
  const [selectedProject, setSelectedProject] = useState(null);
  const dialogRef = useRef(null);
  const technologyCount = new Set(
    skillCategories.flatMap((category) =>
      category.skills.map((skill) => skill.name),
    ),
  ).size;

  useEffect(() => {
    if (!selectedProject) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedProject]);

  function showProject(project) {
    setSelectedProject(project);
    dialogRef.current.showModal();
  }

  return (
    <div className="portfolio-home">
      <SEO />
      <section className="pf-hero-shell" aria-labelledby="hero-heading">
        <div className="pf-hero pf-wrap">
          <div className="pf-hero-copy">
            <div className="pf-availability">
              <span /> Available for opportunities <FiArrowUpRight />
            </div>
            <p className="pf-eyebrow hero-intro">
              HELLO, I'M TASKIN <span className="tiny-star">✳</span>
            </p>
            <h1 id="hero-heading">
              Turning ideas
              <br />
              into <span className="pf-accent">digital</span>
              <br />
              <span className="hero-last">
                experiences<span className="pf-accent">.</span>
              </span>
            </h1>
            <p className="pf-hero-description">
              Full-stack developer. Curious problem solver.
              <br />I build thoughtful web experiences with clean code
              <br className="desktop-break" /> and a little creative thinking.
            </p>
            <div className="pf-actions">
              <a href="#selected-work" className="pf-btn pf-btn-primary">
                Explore my work <FiArrowUpRight />
              </a>
              <a
                href="/documents/Taskin_Mubassir_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="pf-btn pf-btn-quiet"
              >
                View résumé <FiDownload />
              </a>
            </div>
            <div className="pf-hero-social">
              <span>FIND ME ON</span>
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
              <i />
              <span>
                <FiMapPin /> Dhaka, Bangladesh
              </span>
            </div>
          </div>
          <div className="pf-hero-art">
            <div className="pf-orbit orbit-one" aria-hidden="true" />
            <div className="pf-orbit orbit-two" aria-hidden="true" />
            <div className="pf-art-grid" aria-hidden="true" />
            <span className="pf-art-coordinate" aria-hidden="true">
              23.8103° N / 90.4125° E
            </span>
            <div className="pf-portrait-frame">
              <img
                src="/Taskin-m.png"
                alt="Taskin Mohammad Mubassir"
                width="420"
                height="420"
                fetchPriority="high"
              />
            </div>
            <div className="pf-floating-icon">
              <SiReact />
              <span>React.js</span>
            </div>
            <span className="pf-art-spark" aria-hidden="true">
              ✳
            </span>
            <div className="pf-name-tag">
              <span className="pf-status-dot" />
              <div>
                <strong>{personalInfo.name}</strong>
                <span>Full-stack developer</span>
              </div>
              <FiArrowUpRight />
            </div>
            <div
              className="pf-code-card"
              aria-label="Developer introduction in code"
            >
              <div className="pf-code-top">
                <span>
                  <i />
                  <i />
                  <i />
                </span>
                <small>developer.js</small>
                <FiCode />
              </div>
              <code>
                <span className="code-purple">const</span> developer = {"{"}
                <br />
                &nbsp; name: <span className="code-green">'Taskin'</span>,<br />
                &nbsp; focus:{" "}
                <span className="code-green">'Build. Learn. Improve.'</span>,
                <br />
                &nbsp; coffee: <span className="code-purple">true</span>
                <br />
                {"}"};
              </code>
              <div className="pf-code-bottom">
                <span /> Always building something.
              </div>
            </div>
            <span className="pf-art-label">CRAFTED WITH CURIOSITY ↗</span>
          </div>
          <div className="pf-hero-bottom">
            <a href="#selected-work">
              <span className="pf-scroll-icon">
                <FiArrowDown />
              </span>{" "}
              A little scroll, a lot to discover
            </a>
            <span>CODE WITH PURPOSE. DESIGN WITH CARE.</span>
          </div>
        </div>

        <div className="pf-stack-band">
          <div className="pf-wrap pf-stack-inner">
            <span className="pf-stack-label">
              MY EVERYDAY
              <br />
              <strong>TOOLKIT</strong>
            </span>
            {stack.slice(0, 6).map(({ name, Icon }) => (
              <span className="pf-stack-item" key={name}>
                <Icon />
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section
        id="selected-work"
        className="pf-section pf-wrap"
        aria-labelledby="work-heading"
      >
        <div className="pf-section-top">
          <div>
            <p className="pf-eyebrow">
              <span>01 /</span> SELECTED WORK
            </p>
            <h2 id="work-heading">
              Ideas brought to <em>life.</em>
            </h2>
          </div>
          <Link className="pf-text-link" to="/projects">
            All projects <FiArrowUpRight />
          </Link>
        </div>
        <p className="pf-section-description">
          A selection of things I've designed, built, and learned from.
        </p>
        <div className="pf-project-grid">
          {projects.slice(0, 3).map((project, index) => (
            <article className={`pf-project project-${index}`} key={project.id}>
              <button
                className="pf-project-image"
                onClick={() => showProject(project)}
                aria-label={`View ${project.title}`}
              >
                <span className="pf-project-graphic" aria-hidden="true" />
                <span className="pf-project-visual-label">
                  <FiLayers /> SELECTED BUILD
                </span>
                <span className="pf-project-number">0{index + 1}</span>
                <div className="pf-project-window">
                  <div className="pf-browser-bar">
                    <span />
                    <span />
                    <span />
                    <small>{new URL(project.liveLink).hostname}</small>
                  </div>
                  <img
                    src={(project.images?.[0] || project.image).replace(
                      "./",
                      "/",
                    )}
                    alt={`${project.title} website preview`}
                    loading="lazy"
                  />
                </div>
                <span className="pf-project-tech-mark" aria-hidden="true">
                  {index === 0 ? (
                    <SiReact />
                  ) : index === 1 ? (
                    <SiMongodb />
                  ) : (
                    <FiCode />
                  )}
                </span>
                <span className="pf-project-open">
                  Explore project <FiArrowUpRight />
                </span>
              </button>
              <div className="pf-project-body">
                <div className="pf-project-meta">
                  <span>
                    {project.category === "React"
                      ? "FRONTEND DEVELOPMENT"
                      : "FULL-STACK DEVELOPMENT"}
                  </span>
                  <span>{project.date}</span>
                </div>
                <button
                  className="pf-project-title"
                  onClick={() => showProject(project)}
                >
                  <h3>{project.title}</h3>
                  <FiArrowUpRight />
                </button>
                <p>{project.description}</p>
                <div className="pf-tags">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                <div className="pf-project-actions">
                  <button
                    onClick={() => showProject(project)}
                    aria-label={`Explore ${project.title}`}
                  >
                    Project details <FiArrowUpRight />
                  </button>
                  <div>
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${project.title} live website`}
                        title="Live website"
                      >
                        <FiExternalLink />
                      </a>
                    )}
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View ${project.title} source on GitHub`}
                        title="Source code"
                      >
                        <FaGithub />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="pf-about-section">
        <div className="pf-wrap pf-about-grid">
          <div>
            <p className="pf-eyebrow">
              <span>02 /</span> A LITTLE ABOUT ME
            </p>
            <h2>
              A developer's mind.
              <br />A <em>creator's</em> heart.
            </h2>
            <Link to="/about" className="pf-text-link">
              More about me <FiArrowUpRight />
            </Link>
          </div>
          <div className="pf-about-copy">
            <p>
              I'm <strong>Taskin Mohammad Mubassir</strong>, a Computer Science
              & Engineering graduate from <strong>BRAC University</strong>,
              turning curiosity into useful digital experiences.
            </p>
            <p>
              My sweet spot is where thoughtful design meets practical
              engineering. From full-stack web apps to machine learning and
              robotics, I love figuring things out—and making them work
              beautifully.
            </p>
            <div className="pf-about-notes">
              <span>
                <FiLayers /> MERN stack development
              </span>
              <span>
                <FiMapPin /> Based in Bangladesh
              </span>
            </div>
          </div>
        </div>
        <div className="pf-wrap pf-stats">
          <div>
            <strong>
              {String(projects.length).padStart(2, "0")}
              <span>+</span>
            </strong>
            <span>Projects in my portfolio</span>
          </div>
          <div>
            <strong>
              {technologyCount}
              <span>+</span>
            </strong>
            <span>Technologies explored</span>
          </div>
          <div>
            <strong>
              2024<span>↗</span>
            </strong>
            <span>CSE graduate · BRAC University</span>
          </div>
          <div>
            <strong>
              {String(achievements.length).padStart(2, "0")}
              <span>+</span>
            </strong>
            <span>Milestones & achievements</span>
          </div>
        </div>
      </section>

      <section className="pf-section pf-wrap" aria-labelledby="skills-heading">
        <div className="pf-section-top">
          <div>
            <p className="pf-eyebrow">
              <span>03 /</span> TOOLS & EXPERTISE
            </p>
            <h2 id="skills-heading">
              The stack behind
              <br />
              the <em>experience.</em>
            </h2>
          </div>
          <p className="pf-section-aside">
            The right tools, a thoughtful approach,
            <br />
            and a constant drive to learn.
          </p>
        </div>
        <div className="pf-capabilities">
          {capabilities.map(({ Icon, title, text, tags }, index) => (
            <article key={title}>
              <div className="pf-capability-top">
                <span>
                  <Icon />
                </span>
                <small>0{index + 1}</small>
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
              <div className="pf-tags">
                {tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
        <div className="pf-tech-grid">
          {stack.map(({ Icon, name, color }) => (
            <div key={name}>
              <Icon style={{ color }} />
              <span>{name}</span>
            </div>
          ))}
        </div>
        <div className="pf-skills-footer">
          <span>
            <span className="pf-status-dot" /> Currently exploring Next.js &
            TypeScript
          </span>
          <Link to="/skills" className="pf-text-link">
            Explore all skills <FiArrowUpRight />
          </Link>
        </div>
      </section>

      <section
        className="pf-wrap pf-contact-section"
        aria-labelledby="contact-heading"
      >
        <div className="pf-contact-panel">
          <div>
            <p className="pf-eyebrow">HAVE SOMETHING IN MIND?</p>
            <h2 id="contact-heading">
              Let's build
              <br />
              something <em>great.</em>
              <span className="pf-accent">✳</span>
            </h2>
            <p>A project, an opportunity, or just a hello—my inbox is open.</p>
            <Link to="/contact" className="pf-btn pf-btn-primary">
              Let's talk <FiArrowUpRight />
            </Link>
          </div>
          <a
            className="pf-contact-circle"
            href={`mailto:${personalInfo.email}`}
            aria-label="Email Taskin"
          >
            <FiArrowUpRight />
          </a>
          <div className="pf-contact-bottom">
            <a href={`mailto:${personalInfo.email}`}>
              {personalInfo.email} <FiArrowUpRight />
            </a>
            <span>
              <span className="pf-status-dot" /> Open to meaningful
              collaborations
            </span>
          </div>
        </div>
      </section>

      <dialog
        ref={dialogRef}
        className="pf-project-dialog"
        aria-labelledby="project-dialog-title"
        onClose={() => setSelectedProject(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current.close();
        }}
      >
        {selectedProject && (
          <div className="pf-dialog-content">
            <div className="pf-dialog-header">
              <span className="pf-eyebrow">PROJECT OVERVIEW</span>
              <button
                autoFocus
                onClick={() => dialogRef.current.close()}
                aria-label="Close project details"
              >
                <FiX />
              </button>
            </div>
            <img
              src={(
                selectedProject.images?.[0] || selectedProject.image
              ).replace("./", "/")}
              alt={selectedProject.title}
            />
            <h2 id="project-dialog-title">{selectedProject.title}</h2>
            <p>{selectedProject.longDescription}</p>
            <div className="pf-tags">
              {selectedProject.tech.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
            <h3>What it does</h3>
            <ul>
              {selectedProject.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <div className="pf-actions">
              {selectedProject.liveLink && (
                <a
                  className="pf-btn pf-btn-primary"
                  href={selectedProject.liveLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  Live website <FiExternalLink />
                </a>
              )}
              <a
                className="pf-btn pf-btn-quiet"
                href={selectedProject.githubLink}
                target="_blank"
                rel="noreferrer"
              >
                Source code <FaGithub />
              </a>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
