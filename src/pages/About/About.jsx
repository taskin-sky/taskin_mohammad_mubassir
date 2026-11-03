import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowUpRight,
  FiArrowDown,
  FiArrowLeft,
  FiArrowRight,
  FiMapPin,
  FiCode,
  FiBriefcase,
  FiBookOpen,
  FiGlobe,
  FiCpu,
  FiCoffee,
  FiCompass,
  FiCheck,
  FiX,
  FiMaximize2,
  FiLayers,
  FiTarget,
} from "react-icons/fi";
import {
  FaGraduationCap,
  FaGithub,
  FaLinkedinIn,
  FaFutbol,
} from "react-icons/fa";
import { aboutInfo, galleryImages } from "../../data/aboutData";
import { personalInfo } from "../../data/personalData";
import { projects } from "../../data/projectsData";
import { skillCategories } from "../../data/skillsData";
import SEO from "../../components/SEO";
import "./about.css";

const gallery = galleryImages;
const filters = [
  { id: "all", label: "All moments" },
  { id: "milestones", label: "Milestones" },
  { id: "travel", label: "Travel" },
  { id: "sports", label: "Football" },
];
const goalIcons = [FiBriefcase, FiCode, FiGlobe, FiLayers];
const factIcons = [
  FiMapPin,
  FiCode,
  FaFutbol,
  FiCoffee,
  FiCompass,
  FiBookOpen,
  FiCpu,
  FiTarget,
];

function SectionHeading({ number, label, children, description }) {
  return (
    <div className="ab-section-heading">
      <p className="ab-eyebrow">
        <span>{number} /</span> {label}
      </p>
      <h2>{children}</h2>
      {description && <p className="ab-section-description">{description}</p>}
    </div>
  );
}

export default function About() {
  const [newestFirst, setNewestFirst] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);
  const dialogRef = useRef(null);
  const milestones = newestFirst
    ? [...aboutInfo.journey.milestones].reverse()
    : aboutInfo.journey.milestones;
  const visibleGallery = gallery.filter(
    (image) =>
      filter === "all" ||
      (filter === "milestones"
        ? ["achievement", "activity"].includes(image.category)
        : image.category === filter),
  );
  const technologyCount = new Set(
    skillCategories.flatMap((category) =>
      category.skills.map((skill) => skill.name),
    ),
  ).size;

  useEffect(() => {
    if (!selectedImage) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = oldOverflow;
    };
  }, [selectedImage]);

  function openImage(image) {
    setSelectedImage(image);
    dialogRef.current.showModal();
  }
  function stepImage(direction) {
    setSelectedImage((current) => {
      const index = visibleGallery.findIndex(
        (image) => image.id === current.id,
      );
      return visibleGallery[
        (index + direction + visibleGallery.length) % visibleGallery.length
      ];
    });
  }

  return (
    <div className="about-page">
      <SEO
        customMeta={{
          title: "About | Taskin Mohammad Mubassir — Software Engineer",
          description:
            "Meet Taskin Mohammad Mubassir, Software Engineer at INORIZON and BRAC University CSE graduate. Explore my journey, education, and life beyond the code.",
        }}
      />
      <div className="pf-wrap">
        <section className="ab-intro" aria-labelledby="about-title">
          <div className="ab-intro-copy">
            <p className="ab-eyebrow">
              <span>ABOUT ME</span> / THE PERSON BEHIND THE CODE
            </p>
            <h1 id="about-title">
              A curious mind.
              <br />A <em>builder</em> at heart<span>.</span>
            </h1>
            <p className="ab-lead">
              I'm <strong>{aboutInfo.name}</strong>—a software engineer, a
              lifelong learner, and someone who loves turning an idea into
              something real.
            </p>
            <p className="ab-bio">
              From Rajshahi to BRAC University, and now{" "}
              <strong>INORIZON</strong>, every chapter has shaped how I think,
              create, and solve problems. My interests stretch from full-stack
              development to machine learning, robotics, and the occasional
              football match.
            </p>
            <div className="ab-intro-actions">
              <a href="#my-journey" className="ab-button">
                Explore my journey <FiArrowDown />
              </a>
              <div className="ab-social">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Taskin on GitHub"
                >
                  <FaGithub />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Taskin on LinkedIn"
                >
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </div>
          <aside className="ab-profile" aria-label="Profile at a glance">
            <div className="ab-profile-art">
              <span className="ab-art-grid" aria-hidden="true" />
              <span className="ab-orbit" aria-hidden="true" />
              <span className="ab-art-star" aria-hidden="true">
                ✳
              </span>
              <span className="ab-profile-code" aria-hidden="true">
                &lt;always_learning /&gt;
              </span>
              <img
                src="/Taskin-m.png"
                alt="Taskin Mohammad Mubassir"
                width="420"
                height="420"
              />
              <div className="ab-engineer-badge">
                <FiCode />
                <span>
                  SOFTWARE ENGINEER<strong>INORIZON</strong>
                </span>
                <FiArrowUpRight />
              </div>
            </div>
            <div className="ab-profile-details">
              <div>
                <FiMapPin />
                <span>
                  Hometown<strong>{aboutInfo.hometown}</strong>
                  <small className="ab-birth-year">
                    Born {aboutInfo.birthDate}
                  </small>
                </span>
              </div>
              <div>
                <FiCompass />
                <span>
                  Currently based in<strong>{aboutInfo.currentLocation}</strong>
                </span>
              </div>
              <div className="ab-languages">
                <FiGlobe />
                <span>
                  Languages<strong>{aboutInfo.languages.join(" · ")}</strong>
                </span>
              </div>
            </div>
          </aside>
        </section>

        <div className="ab-stats" aria-label="A few things about me">
          {[
            {
              Icon: FiLayers,
              value: String(projects.length).padStart(2, "0"),
              suffix: "+",
              label: "Projects in my portfolio",
            },
            {
              Icon: FiCode,
              value: technologyCount,
              suffix: "+",
              label: "Technologies explored",
            },
            {
              Icon: FaGraduationCap,
              value: "2024",
              label: "CSE graduate · BRAC University",
            },
            {
              Icon: FiBriefcase,
              value: "2026",
              label: "Joined INORIZON · July",
            },
          ].map(({ Icon, value, suffix, label }) => (
            <div key={label}>
              <Icon />
              <strong>
                {value}
                <span>{suffix}</span>
              </strong>
              <p>{label}</p>
            </div>
          ))}
        </div>

        <section
          id="my-journey"
          className="ab-section ab-journey"
          aria-labelledby="journey-heading"
        >
          <div className="ab-journey-intro">
            <SectionHeading number="01" label="THE CHAPTERS SO FAR">
              <span id="journey-heading">
                My journey,
                <br />
                one <em>step</em> at a time.
              </span>
            </SectionHeading>
            <p className="ab-section-description">
              The milestones, small beginnings, and memorable moments that
              brought me here.
            </p>
            <div className="ab-current-role">
              <span className="ab-current-label">
                <i /> THE CURRENT CHAPTER
              </span>
              <FiBriefcase />
              <h3>Software Engineer</h3>
              <p>
                INORIZON <span>· Since July 2026</span>
              </p>
              <span className="ab-role-line" aria-hidden="true" />
            </div>
          </div>
          <div className="ab-timeline-panel">
            <div className="ab-timeline-toolbar">
              <span>
                {aboutInfo.journey.start} — {aboutInfo.journey.present}
                <small>{milestones.length} milestones</small>
              </span>
              <button
                onClick={() => setNewestFirst(!newestFirst)}
                aria-label={`Sort journey ${newestFirst ? "earliest" : "latest"} first`}
              >
                {newestFirst ? "Latest first" : "Earliest first"}{" "}
                <FiArrowDown className={newestFirst ? "" : "ab-flipped"} />
              </button>
            </div>
            <ol className="ab-timeline">
              {milestones.map((milestone) => (
                <li
                  key={`${milestone.year}-${milestone.event}`}
                  className={milestone.current ? "ab-timeline-current" : ""}
                >
                  <span className="ab-timeline-node" aria-hidden="true">
                    {milestone.current ? <FiBriefcase /> : <span />}
                  </span>
                  <article>
                    <div className="ab-milestone-meta">
                      <time>{milestone.year}</time>
                      {milestone.current && <span>CAREER MILESTONE</span>}
                    </div>
                    <h3>{milestone.event}</h3>
                    <p>{milestone.description}</p>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          className="ab-section ab-education"
          aria-labelledby="education-heading"
        >
          <SectionHeading
            number="02"
            label="THE FOUNDATION"
            description="A foundation in computer science. A habit of never standing still."
          >
            <span id="education-heading">
              Learning that <em>stays.</em>
            </span>
          </SectionHeading>
          <div className="ab-education-grid">
            {[...aboutInfo.education].reverse().map((edu, index) => (
              <article
                className={index === 0 ? "ab-degree-featured" : ""}
                key={edu.level}
              >
                <div className="ab-education-top">
                  <span className="ab-icon-tile">
                    {index === 0 ? <FaGraduationCap /> : <FiBookOpen />}
                  </span>
                  <time>{edu.year}</time>
                </div>
                <p className="ab-education-level">
                  {edu.level === "Bachelor's"
                    ? "BSc · COMPUTER SCIENCE & ENGINEERING"
                    : edu.level}
                </p>
                <h3>{edu.institution}</h3>
                <p className="ab-education-description">{edu.description}</p>
                <div className="ab-education-bottom">
                  <span>
                    <FiMapPin />
                    {edu.location}
                  </span>
                  {(edu.gpa || edu.cgpa) && (
                    <strong>
                      {edu.cgpa ? `CGPA ${edu.cgpa}` : `GPA ${edu.gpa}`}
                    </strong>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          className="ab-section ab-goals"
          aria-labelledby="goals-heading"
        >
          <SectionHeading
            number="03"
            label="ALWAYS MOVING FORWARD"
            description="One milestone reached. More possibilities ahead."
          >
            <span id="goals-heading">
              What's <em>next?</em>
            </span>
          </SectionHeading>
          <div className="ab-goal-grid">
            {aboutInfo.goals.map((goal, index) => {
              const Icon = goalIcons[index];
              return (
                <article
                  key={goal.title}
                  className={goal.achieved ? "ab-goal-achieved" : ""}
                >
                  <div className="ab-goal-top">
                    <Icon />
                    <small>0{index + 1}</small>
                  </div>
                  <h3>{goal.title}</h3>
                  <p>{goal.description}</p>
                  <span className="ab-goal-status">
                    {goal.achieved ? <FiCheck /> : <FiTarget />}
                    {goal.timeline}
                  </span>
                </article>
              );
            })}
          </div>
        </section>

        <section
          className="ab-section ab-beyond"
          aria-labelledby="beyond-heading"
        >
          <SectionHeading number="04" label="OFF THE CLOCK">
            <span id="beyond-heading">
              Beyond the <em>keyboard.</em>
            </span>
          </SectionHeading>
          <div className="ab-facts">
            {aboutInfo.funFacts.map((fact, index) => {
              const Icon = factIcons[index];
              return (
                <div key={fact.fact}>
                  <Icon />
                  <span>{fact.fact}</span>
                </div>
              );
            })}
          </div>
          <blockquote className="ab-quote">
            <span aria-hidden="true">“</span>
            <p>
              Code is like poetry. Every line should have a purpose and tell a
              story.
            </p>
            <cite>Taskin Mohammad Mubassir</cite>
            <FiCode aria-hidden="true" />
          </blockquote>
        </section>

        <section
          className="ab-section ab-moments"
          aria-labelledby="moments-heading"
        >
          <div className="ab-gallery-heading">
            <SectionHeading
              number="05"
              label="LIFE IN FRAMES"
              description="A few moments worth keeping—from graduation to the great outdoors."
            >
              <span id="moments-heading">
                Collected <em>moments.</em>
              </span>
            </SectionHeading>
            <span className="ab-gallery-note">
              <FiMaximize2 /> Click to take a closer look
            </span>
          </div>
          <div className="ab-gallery-filters" aria-label="Filter gallery">
            {filters.map((item) => (
              <button
                key={item.id}
                aria-pressed={filter === item.id}
                onClick={() => setFilter(item.id)}
              >
                {item.label}
              </button>
            ))}
            <span aria-live="polite">{visibleGallery.length} moments</span>
          </div>
          <div className="ab-gallery">
            {visibleGallery.map((image, index) => (
              <button
                key={image.id}
                onClick={() => openImage(image)}
                aria-label={`Enlarge ${image.title}`}
              >
                <img src={image.src} alt={image.title} loading="lazy" />
                <span className="ab-gallery-index">0{index + 1}</span>
                <span className="ab-gallery-caption">
                  <span>
                    <small>{image.category}</small>
                    <strong>{image.title}</strong>
                  </span>
                  <FiArrowUpRight />
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="ab-connect">
          <div>
            <p className="ab-eyebrow">GOOD THINGS START WITH A CONVERSATION</p>
            <h2>
              Let's make the next
              <br />
              chapter <em>interesting.</em>
            </h2>
          </div>
          <div>
            <Link to="/contact" className="ab-button">
              Get in touch <FiArrowUpRight />
            </Link>
            <Link to="/resume" className="ab-resume-link">
              Explore my résumé <FiArrowUpRight />
            </Link>
          </div>
          <span className="ab-connect-star" aria-hidden="true">
            ✳
          </span>
        </section>
      </div>

      <dialog
        className="ab-lightbox"
        ref={dialogRef}
        aria-labelledby="gallery-caption"
        onClose={() => setSelectedImage(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current.close();
        }}
        onKeyDown={(event) => {
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
        {selectedImage && (
          <div className="ab-lightbox-inner">
            <div className="ab-lightbox-top">
              <span>
                COLLECTED MOMENTS /{" "}
                {String(
                  visibleGallery.findIndex(
                    (image) => image.id === selectedImage.id,
                  ) + 1,
                ).padStart(2, "0")}
              </span>
              <button
                autoFocus
                onClick={() => dialogRef.current.close()}
                aria-label="Close image"
              >
                <FiX />
              </button>
            </div>
            <img src={selectedImage.src} alt={selectedImage.title} />
            <div className="ab-lightbox-bottom">
              <button onClick={() => stepImage(-1)} aria-label="Previous image">
                <FiArrowLeft />
              </button>
              <p id="gallery-caption">{selectedImage.title}</p>
              <button onClick={() => stepImage(1)} aria-label="Next image">
                <FiArrowRight />
              </button>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
