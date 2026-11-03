import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowUpRight,
  FiArrowLeft,
  FiArrowRight,
  FiSearch,
  FiX,
  FiLayers,
  FiCode,
  FiExternalLink,
  FiGrid,
  FiCheck,
  FiTarget,
  FiZap,
  FiImage,
} from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import { SiReact, SiMongodb } from "react-icons/si";
import { projects } from "../../data/projectsData";
import {
  filters,
  projectType,
  projectImages,
  matchesCategory,
  selectProjects,
} from "./projectUtils";
import SEO from "../../components/SEO";
import "./projects.css";

function ProjectCard({ project, onOpen }) {
  const images = projectImages(project);
  const Icon =
    projectType(project) === "fullstack"
      ? SiMongodb
      : project.tech.some((tech) => /^react/i.test(tech))
        ? SiReact
        : FiCode;
  return (
    <article className={`pj-card pj-palette-${(project.id - 1) % 3}`}>
      <button
        className="pj-preview"
        onClick={() => onOpen(project)}
        aria-label={`Explore ${project.title}`}
      >
        <span className="pj-preview-grid" aria-hidden="true" />
        <span className="pj-preview-orbit" aria-hidden="true" />
        <span className="pj-preview-label">
          <FiLayers />
          {projectType(project) === "fullstack"
            ? "FULL-STACK BUILD"
            : "FRONTEND BUILD"}
        </span>
        <span className="pj-preview-number">
          {String(project.id).padStart(2, "0")}
        </span>
        <span className="pj-window">
          <span className="pj-window-bar">
            <i />
            <i />
            <i />
            <small>
              {project.liveLink
                ? new URL(project.liveLink).hostname
                : project.title}
            </small>
          </span>
          <img
            src={images[0]}
            alt={`${project.title} website preview`}
            loading="lazy"
          />
        </span>
        <span className="pj-tech-tile" aria-hidden="true">
          <Icon />
        </span>
        <span className="pj-preview-action">
          Explore project <FiArrowUpRight />
        </span>
        {images.length > 1 && (
          <span className="pj-image-count">
            <FiImage />
            {images.length} views
          </span>
        )}
      </button>
      <div className="pj-card-body">
        <div className="pj-card-meta">
          <span>{project.category}</span>
          <time>{project.date}</time>
        </div>
        <button className="pj-card-title" onClick={() => onOpen(project)}>
          <h2>{project.title}</h2>
          <FiArrowUpRight />
        </button>
        <p>{project.description}</p>
        <div className="pj-tags">
          {project.tech.slice(0, 4).map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
          {project.tech.length > 4 && (
            <span title={project.tech.slice(4).join(", ")}>
              +{project.tech.length - 4} more
            </span>
          )}
        </div>
        <div className="pj-card-actions">
          <button
            onClick={() => onOpen(project)}
            aria-label={`View details of ${project.title}`}
          >
            View project <FiArrowUpRight />
          </button>
          <div>
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} source code on GitHub`}
                title="Source code"
              >
                <FaGithub />
              </a>
            )}
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit ${project.title} live website`}
                title="Live website"
              >
                <FiExternalLink />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [selectedProject, setSelectedProject] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const dialogRef = useRef(null);
  const filtered = selectProjects(projects, category, search, sort);
  const images = selectedProject ? projectImages(selectedProject) : [];
  const technologies = new Set(projects.flatMap((project) => project.tech))
    .size;

  useEffect(() => {
    if (!selectedProject) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = oldOverflow;
    };
  }, [selectedProject]);

  function openProject(project) {
    setImageIndex(0);
    setSelectedProject(project);
    dialogRef.current.showModal();
  }
  function stepImage(direction) {
    setImageIndex(
      (index) => (index + direction + images.length) % images.length,
    );
  }
  function resetFilters() {
    setCategory("all");
    setSearch("");
    setSort("featured");
  }

  return (
    <div className="projects-page">
      <SEO />
      <div className="pf-wrap">
        <section className="pj-intro" aria-labelledby="projects-title">
          <div>
            <p className="pj-eyebrow">
              <span>PROJECTS</span> / BUILT WITH PURPOSE
            </p>
            <h1 id="projects-title">
              Small ideas.
              <br />
              <em>Real-world</em> builds<span>.</span>
            </h1>
            <p>
              A collection of experiments, full-stack applications, and
              interfaces.
              <br className="pj-desktop-break" /> Each one a different
              challenge. Each one a chance to get better.
            </p>
            <a href="#project-library" className="pj-intro-link">
              Explore the collection <FiArrowUpRight />
            </a>
          </div>
          <div className="pj-intro-art" aria-hidden="true">
            <span className="pj-intro-orbit" />
            <span className="pj-art-card pj-art-back">
              <FiCode />
              <span>IDEA → INTERFACE</span>
            </span>
            <span className="pj-art-card pj-art-front">
              <span className="pj-art-card-top">
                <i />
                <i />
                <i />
                <small>the-project-collection</small>
              </span>
              <FiLayers />
              <strong>
                {String(projects.length).padStart(2, "0")}
                <span>PROJECTS & COUNTING</span>
              </strong>
              <span className="pj-art-stack">
                <span>React</span>
                <span>Node.js</span>
                <span>MongoDB</span>
              </span>
            </span>
            <span className="pj-art-star">✳</span>
          </div>
        </section>
        <div className="pj-overview">
          <div>
            <FiGrid />
            <strong>{String(projects.length).padStart(2, "0")}</strong>
            <span>Projects in the collection</span>
          </div>
          <div>
            <FiCode />
            <strong>{technologies}</strong>
            <span>Technologies used</span>
          </div>
          <div>
            <FiLayers />
            <strong>
              {
                projects.filter(
                  (project) => projectType(project) === "fullstack",
                ).length
              }
            </strong>
            <span>Full-stack applications</span>
          </div>
          <a
            href="https://github.com/taskin-sky"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
            <span>
              More from the code side<strong>Explore my GitHub</strong>
            </span>
            <FiArrowUpRight />
          </a>
        </div>

        <section
          id="project-library"
          className="pj-library"
          aria-label="Project collection"
        >
          <div className="pj-toolbar">
            <div
              className="pj-filters"
              aria-label="Filter projects by category"
            >
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  aria-pressed={category === filter.id}
                  onClick={() => setCategory(filter.id)}
                >
                  {filter.label}
                  <span>
                    {
                      projects.filter((project) =>
                        matchesCategory(project, filter.id),
                      ).length
                    }
                  </span>
                </button>
              ))}
            </div>
            <div className="pj-search">
              <FiSearch />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                type="search"
                aria-label="Search projects by title, description, or technology"
                placeholder="Search projects, tools, ideas…"
              />
              {search && (
                <button onClick={() => setSearch("")} aria-label="Clear search">
                  <FiX />
                </button>
              )}
            </div>
          </div>
          <div className="pj-results-row">
            <p aria-live="polite" aria-atomic="true">
              Showing <strong>{filtered.length}</strong> of {projects.length}{" "}
              projects
              {search.trim() && <span> matching “{search.trim()}”</span>}
            </p>
            <label>
              Sort by
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
              >
                <option value="featured">Featured order</option>
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
            </label>
          </div>
          {filtered.length ? (
            <div className="pj-project-grid">
              {filtered.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpen={openProject}
                />
              ))}
            </div>
          ) : (
            <div className="pj-empty">
              <FiSearch />
              <h2>No projects found</h2>
              <p>
                Try a different title or technology, or explore the full
                collection.
              </p>
              <button className="pj-button" onClick={resetFilters}>
                Reset filters <FiArrowRight />
              </button>
            </div>
          )}
          {filtered.length > 0 && (
            <div className="pj-collection-end">
              <span />
              <FiCheck />
              <p>You're all caught up. More ideas are always in the works.</p>
              <span />
            </div>
          )}
        </section>

        <section className="pj-connect">
          <div>
            <p className="pj-eyebrow">HAVE AN IDEA OF YOUR OWN?</p>
            <h2>
              Let's turn it into
              <br />
              something <em>real.</em>
            </h2>
          </div>
          <div>
            <Link to="/contact" className="pj-button">
              Let's talk <FiArrowUpRight />
            </Link>
            <Link to="/skills" className="pj-skills-link">
              Meet the toolkit <FiArrowUpRight />
            </Link>
          </div>
          <span aria-hidden="true">✳</span>
        </section>
      </div>

      <dialog
        ref={dialogRef}
        className="pj-dialog"
        aria-labelledby="project-detail-title"
        onClose={() => setSelectedProject(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current.close();
        }}
        onKeyDown={(event) => {
          if (images.length < 2) return;
          if (event.key === "ArrowRight") {
            event.preventDefault();
            stepImage(1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            stepImage(-1);
          }
        }}
      >
        {selectedProject && (
          <div className="pj-detail">
            <div className="pj-detail-top">
              <span>
                PROJECT FILE / {String(selectedProject.id).padStart(2, "0")}
              </span>
              <button
                autoFocus
                aria-label="Close project details"
                onClick={() => dialogRef.current.close()}
              >
                <FiX />
              </button>
            </div>
            <div className="pj-detail-preview">
              <img
                src={images[imageIndex]}
                alt={`${selectedProject.title} screenshot ${imageIndex + 1} of ${images.length}`}
              />
              {images.length > 1 && (
                <div className="pj-slideshow-controls">
                  <button
                    onClick={() => stepImage(-1)}
                    aria-label="Previous screenshot"
                  >
                    <FiArrowLeft />
                  </button>
                  <span aria-live="polite">
                    {imageIndex + 1} / {images.length}
                  </span>
                  <button
                    onClick={() => stepImage(1)}
                    aria-label="Next screenshot"
                  >
                    <FiArrowRight />
                  </button>
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="pj-thumbnails" aria-label="Project screenshots">
                {images.map((image, index) => (
                  <button
                    key={image}
                    aria-label={`Show screenshot ${index + 1}`}
                    aria-pressed={index === imageIndex}
                    onClick={() => setImageIndex(index)}
                  >
                    <img src={image} alt="" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
            <div className="pj-detail-heading">
              <div>
                <p className="pj-eyebrow">
                  {selectedProject.category} / {selectedProject.date}
                </p>
                <h2 id="project-detail-title">{selectedProject.title}</h2>
              </div>
              <span>{selectedProject.role}</span>
            </div>
            <p className="pj-detail-description">
              {selectedProject.longDescription || selectedProject.description}
            </p>
            <div className="pj-tags">
              {selectedProject.tech.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
            <div className="pj-detail-actions">
              {selectedProject.liveLink && (
                <a
                  className="pj-button"
                  href={selectedProject.liveLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit live website <FiExternalLink />
                </a>
              )}
              {selectedProject.githubLink && (
                <a
                  className="pj-source-link"
                  href={selectedProject.githubLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaGithub />
                  View source code <FiArrowUpRight />
                </a>
              )}
            </div>
            <div className="pj-detail-sections">
              {[
                { key: "features", title: "What it does", Icon: FiCheck },
                { key: "challenges", title: "The challenges", Icon: FiTarget },
                { key: "solutions", title: "How I approached it", Icon: FiZap },
              ]
                .filter((section) => selectedProject[section.key]?.length)
                .map(({ key, title, Icon }) => (
                  <section key={key}>
                    <h3>
                      <Icon />
                      {title}
                    </h3>
                    <ul>
                      {selectedProject[key].map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </section>
                ))}
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
