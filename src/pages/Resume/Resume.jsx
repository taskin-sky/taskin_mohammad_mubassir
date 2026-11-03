import { Link } from "react-router-dom";
import {
  FiArrowUpRight,
  FiDownload,
  FiPrinter,
  FiMapPin,
  FiMail,
  FiPhone,
  FiBriefcase,
  FiBookOpen,
  FiAward,
  FiCode,
  FiGlobe,
  FiLayers,
  FiChevronDown,
  FiCheck,
  FiCpu,
  FiTarget,
} from "react-icons/fi";
import {
  FaGraduationCap,
  FaGithub,
  FaLinkedinIn,
  FaFutbol,
} from "react-icons/fa";
import { SiReact, SiNodedotjs, SiMongodb } from "react-icons/si";
import {
  education,
  experience,
  training,
  achievements,
  personalInfo,
  skills,
} from "../../data/personalData";
import { aboutInfo } from "../../data/aboutData";
import { projects } from "../../data/projectsData";
import { skillCategories } from "../../data/skillsData";
import SEO from "../../components/SEO";
import "./resume.css";

const resumeFile = "/documents/Taskin_Mubassir_Resume.pdf";
const sections = [
  { id: "experience", label: "Experience", Icon: FiBriefcase },
  { id: "education", label: "Education", Icon: FaGraduationCap },
  { id: "training", label: "Training", Icon: FiBookOpen },
  { id: "achievements", label: "Achievements", Icon: FiAward },
];
const achievementIcons = {
  Robotics: FiCpu,
  Coding: FiCode,
  Research: FiLayers,
  Academics: FiTarget,
  Sports: FaFutbol,
};

function SectionTitle({ number, title, Icon, subtitle }) {
  return (
    <div className="rs-section-title">
      <span className="rs-section-icon">
        <Icon />
      </span>
      <div>
        <p>{number} / PROFESSIONAL PROFILE</p>
        <h2>{title}</h2>
      </div>
      {subtitle && <span className="rs-section-count">{subtitle}</span>}
    </div>
  );
}

export default function Resume() {
  const technologies = new Set(
    skillCategories.flatMap((category) =>
      category.skills.map((skill) => skill.name),
    ),
  ).size;
  return (
    <div className="resume-page">
      <SEO
        customMeta={{
          title: "Résumé | Taskin Mohammad Mubassir — Software Engineer",
          description:
            "Explore the experience, education, training, and achievements of Taskin Mohammad Mubassir, Software Engineer at INORIZON and BRAC University CSE graduate.",
        }}
      />
      <div className="pf-wrap">
        <section className="rs-intro" aria-labelledby="resume-title">
          <div>
            <p className="rs-eyebrow">
              <span>RÉSUMÉ</span> / THE WORK & THE WAY HERE
            </p>
            <h1 id="resume-title">
              Built on curiosity.
              <br />
              Backed by <em>experience.</em>
            </h1>
            <p>
              A foundation in computer science, a passion for building,
              <br className="rs-desktop-break" /> and a commitment to getting
              better with every project.
            </p>
            <div className="rs-header-actions no-print">
              <a
                className="rs-button rs-button-primary"
                href={resumeFile}
                download="Taskin_Mubassir_Resume.pdf"
              >
                <FiDownload /> Download résumé <FiArrowUpRight />
              </a>
              <button
                className="rs-button rs-button-secondary"
                onClick={() => window.print()}
              >
                <FiPrinter /> Print résumé
              </button>
            </div>
          </div>
          <div className="rs-intro-graphic" aria-hidden="true">
            <div className="rs-graphic-grid" />
            <div className="rs-graphic-ring" />
            <div className="rs-document">
              <div className="rs-document-top">
                <FiCode />
                <span>CAREER / PROFILE</span>
                <span>01</span>
              </div>
              <div className="rs-document-name">
                Taskin M.
                <br />
                <span>Mubassir</span>
              </div>
              <span className="rs-document-role">SOFTWARE ENGINEER</span>
              <div className="rs-document-lines">
                <i />
                <i />
                <i />
              </div>
              <div className="rs-document-footer">
                <span>
                  <i /> INORIZON
                </span>
                <FiArrowUpRight />
              </div>
            </div>
            <span className="rs-graphic-icon rs-react">
              <SiReact />
            </span>
            <span className="rs-graphic-icon rs-node">
              <SiNodedotjs />
            </span>
            <span className="rs-graphic-icon rs-mongo">
              <SiMongodb />
            </span>
            <span className="rs-graphic-star">✳</span>
          </div>
        </section>

        <div className="rs-overview">
          {[
            {
              value: String(projects.length).padStart(2, "0"),
              label: "Projects in my portfolio",
              Icon: FiLayers,
            },
            {
              value: technologies,
              label: "Technologies explored",
              Icon: FiCode,
            },
            {
              value: "2024",
              label: "CSE graduate · BRAC University",
              Icon: FaGraduationCap,
            },
            {
              value: String(achievements.length).padStart(2, "0"),
              label: "Milestones & achievements",
              Icon: FiAward,
            },
          ].map(({ value, label, Icon }) => (
            <div key={label}>
              <Icon />
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>

        <div className="rs-layout">
          <aside className="rs-sidebar" aria-label="Résumé summary">
            <div className="rs-profile">
              <div className="rs-profile-top">
                <img
                  src="/Taskin-m.png"
                  alt="Taskin Mohammad Mubassir"
                  width="64"
                  height="64"
                />
                <span>
                  <i /> CURRENTLY AT INORIZON
                </span>
              </div>
              <h2>{personalInfo.name}</h2>
              <p>
                Software Engineer
                <br />
                <span>MERN Stack · CSE Graduate</span>
              </p>
              <div className="rs-contact-list">
                <a href={`mailto:${personalInfo.email}`}>
                  <FiMail />
                  {personalInfo.email}
                </a>
                <a href={`tel:${personalInfo.phone.replaceAll(" ", "")}`}>
                  <FiPhone />
                  {personalInfo.phone}
                </a>
                <span>
                  <FiMapPin />
                  {personalInfo.location}
                </span>
              </div>
              <div className="rs-social-links">
                <a href={personalInfo.github} target="_blank" rel="noreferrer">
                  <FaGithub />
                  GitHub <FiArrowUpRight />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaLinkedinIn />
                  LinkedIn <FiArrowUpRight />
                </a>
              </div>
            </div>
            <nav
              className="rs-section-nav no-print"
              aria-label="Résumé sections"
            >
              <p>ON THIS PAGE</p>
              {sections.map(({ id, label, Icon }, index) => (
                <a key={id} href={`#resume-${id}`}>
                  <Icon />
                  <span>{label}</span>
                  <small>0{index + 1}</small>
                </a>
              ))}
            </nav>
            <section className="rs-side-card">
              <h3>
                <FiCode />
                Technical toolkit
              </h3>
              {[
                { label: "Languages", values: skills.languages },
                { label: "Frameworks & libraries", values: skills.frameworks },
                { label: "Databases", values: skills.databases },
              ].map((group) => (
                <div className="rs-skill-group" key={group.label}>
                  <h4>{group.label}</h4>
                  <div className="rs-chips">
                    {group.values.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
              <Link to="/skills" className="rs-side-link no-print">
                Explore all skills <FiArrowUpRight />
              </Link>
            </section>
            <section className="rs-side-card rs-languages">
              <h3>
                <FiGlobe />
                Languages
              </h3>
              <dl>
                {aboutInfo.languages.map((language) => {
                  const [name, level] = language.split(" (");
                  return (
                    <div key={name}>
                      <dt>{name}</dt>
                      <dd>{level.replace(")", "")}</dd>
                    </div>
                  );
                })}
              </dl>
            </section>
            <section className="rs-side-card rs-interests">
              <h3>
                <FiTarget />
                Areas of interest
              </h3>
              <div className="rs-chips">
                {[
                  "Web Development",
                  "Machine Learning",
                  "AI",
                  "Robotics",
                  "Open Source",
                ].map((interest) => (
                  <span key={interest}>{interest}</span>
                ))}
              </div>
            </section>
          </aside>

          <div className="rs-main-column">
            <section id="resume-experience" className="rs-section">
              <SectionTitle
                number="01"
                title="Experience"
                Icon={FiBriefcase}
                subtitle="THE WORK"
              />
              <div className="rs-career-timeline">
                {experience.map((item) => (
                  <article
                    className={`rs-card rs-experience-card ${item.current ? "rs-current-card" : ""}`}
                    key={`${item.company}-${item.title}`}
                  >
                    <span className="rs-career-dot" aria-hidden="true" />
                    <div className="rs-card-top">
                      <span className="rs-company-mark" aria-hidden="true">
                        {item.current ? "IN" : "BA"}
                      </span>
                      <div>
                        {item.current && (
                          <span className="rs-current-label">
                            <i />
                            CURRENT ROLE
                          </span>
                        )}
                        <h3>{item.title}</h3>
                        <p className="rs-organization">{item.company}</p>
                      </div>
                      <time>{item.period}</time>
                    </div>
                    {item.location && (
                      <span className="rs-location">
                        <FiMapPin />
                        {item.location}
                      </span>
                    )}
                    {item.description && (
                      <p className="rs-card-description">{item.description}</p>
                    )}
                    {item.responsibilities && (
                      <ul className="rs-bullets">
                        {item.responsibilities.map((responsibility) => (
                          <li key={responsibility}>{responsibility}</li>
                        ))}
                      </ul>
                    )}
                    {item.current && (
                      <div className="rs-current-footer">
                        <FiCheck />A new chapter in software engineering
                        <span>JULY 2026 →</span>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </section>

            <section id="resume-education" className="rs-section">
              <SectionTitle
                number="02"
                title="Education"
                Icon={FaGraduationCap}
                subtitle="THE FOUNDATION"
              />
              <div className="rs-card-stack">
                {education.map((item, index) => (
                  <article
                    className={`rs-card rs-education-card ${index === 0 ? "rs-degree-card" : ""}`}
                    key={item.degree}
                  >
                    <div className="rs-card-top">
                      <span className="rs-education-icon">
                        <FaGraduationCap />
                      </span>
                      <div>
                        <h3>{item.degree}</h3>
                        <p className="rs-organization">{item.institution}</p>
                      </div>
                      <time>{item.period}</time>
                    </div>
                    <div className="rs-education-meta">
                      <span className="rs-location">
                        <FiMapPin />
                        {item.location}
                      </span>
                      <span className="rs-grade">
                        {item.cgpa
                          ? `CGPA ${item.cgpa} / 4.00`
                          : `GPA ${item.gpa} / 5.00`}
                      </span>
                      {item.board && <span>{item.board}</span>}
                    </div>
                    {item.thesis && (
                      <div className="rs-thesis">
                        <FiBookOpen />
                        <div>
                          <h4>UNDERGRADUATE THESIS</h4>
                          <p>{item.thesis}</p>
                        </div>
                      </div>
                    )}
                    {item.coursework && (
                      <details className="rs-coursework">
                        <summary>
                          Relevant coursework{" "}
                          <span>
                            {item.coursework.length} subjects <FiChevronDown />
                          </span>
                        </summary>
                        <div className="rs-chips">
                          {item.coursework.map((course) => (
                            <span key={course}>{course}</span>
                          ))}
                        </div>
                      </details>
                    )}
                  </article>
                ))}
              </div>
            </section>

            <section id="resume-training" className="rs-section">
              <SectionTitle
                number="03"
                title="Training"
                Icon={FiBookOpen}
                subtitle="CONTINUOUS LEARNING"
              />
              {training.map((item) => (
                <article className="rs-card rs-training-card" key={item.title}>
                  <div className="rs-card-top">
                    <span className="rs-education-icon">
                      <FiCode />
                    </span>
                    <div>
                      <h3>{item.title}</h3>
                      <p className="rs-organization">{item.provider}</p>
                    </div>
                    <time>{item.year}</time>
                  </div>
                  <div className="rs-training-meta">
                    <span>
                      <FiBookOpen />
                      {item.duration}
                    </span>
                    <span>PROFESSIONAL DEVELOPMENT</span>
                  </div>
                  <p className="rs-card-description">{item.description}</p>
                  <ul className="rs-bullets">
                    {item.achievements.map((achievement) => (
                      <li key={achievement}>{achievement}</li>
                    ))}
                  </ul>
                  <div className="rs-training-stack" aria-label="MERN stack">
                    <span>
                      <SiMongodb />
                      MongoDB
                    </span>
                    <span>
                      <FiCode />
                      Express.js
                    </span>
                    <span>
                      <SiReact />
                      React.js
                    </span>
                    <span>
                      <SiNodedotjs />
                      Node.js
                    </span>
                  </div>
                </article>
              ))}
            </section>

            <section id="resume-achievements" className="rs-section">
              <SectionTitle
                number="04"
                title="Achievements"
                Icon={FiAward}
                subtitle={`${achievements.length} MILESTONES`}
              />
              <div className="rs-achievement-grid">
                {achievements.map((item) => {
                  const Icon = achievementIcons[item.category] || FiAward;
                  return (
                    <article
                      className="rs-card rs-achievement"
                      key={item.title}
                    >
                      <div className="rs-achievement-top">
                        <span>
                          <Icon />
                        </span>
                        <time>{item.year}</time>
                      </div>
                      <span className="rs-achievement-category">
                        {item.category}
                      </span>
                      <h3>{item.title}</h3>
                      <p className="rs-achievement-event">{item.event}</p>
                      <p className="rs-card-description">{item.description}</p>
                    </article>
                  );
                })}
              </div>
            </section>
          </div>
        </div>

        <section className="rs-cta no-print">
          <div>
            <p className="rs-eyebrow">LET'S BUILD WHAT'S NEXT</p>
            <h2>
              Good work starts with
              <br />a <em>conversation.</em>
            </h2>
          </div>
          <div>
            <Link className="rs-button rs-button-primary" to="/contact">
              Get in touch <FiArrowUpRight />
            </Link>
            <a
              className="rs-cta-download"
              href={resumeFile}
              download="Taskin_Mubassir_Resume.pdf"
            >
              <FiDownload />
              Keep a copy of my résumé
            </a>
          </div>
          <span aria-hidden="true">✳</span>
        </section>
      </div>
    </div>
  );
}
