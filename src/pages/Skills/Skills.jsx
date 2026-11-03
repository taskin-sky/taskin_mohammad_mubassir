import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowUpRight,
  FiArrowRight,
  FiCode,
  FiServer,
  FiDatabase,
  FiTool,
  FiLayers,
  FiAward,
  FiTarget,
  FiMessageSquare,
  FiUsers,
  FiClock,
  FiCompass,
  FiRefreshCw,
  FiCheck,
  FiTrendingUp,
} from "react-icons/fi";
import {
  SiReact,
  SiHtml5,
  SiJavascript,
  SiTailwindcss,
  SiBootstrap,
  SiNodedotjs,
  SiExpress,
  SiPhp,
  SiLaravel,
  SiPython,
  SiMongodb,
  SiMysql,
  SiGit,
  SiPostman,
  SiFigma,
  SiTypescript,
  SiNextdotjs,
  SiGraphql,
  SiDocker,
} from "react-icons/si";
import {
  skillCategories,
  softSkills,
  learningPath,
  certifications,
} from "../../data/skillsData";
import SEO from "../../components/SEO";
import { FaCss3Alt } from "react-icons/fa";
import "./skills.css";

const skillIcons = {
  "React.js": SiReact,
  HTML5: SiHtml5,
  CSS3: FaCss3Alt,
  JavaScript: SiJavascript,
  "Tailwind CSS": SiTailwindcss,
  Bootstrap: SiBootstrap,
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  PHP: SiPhp,
  Laravel: SiLaravel,
  Python: SiPython,
  MongoDB: SiMongodb,
  MySQL: SiMysql,
  "Git/GitHub": SiGit,
  Postman: SiPostman,
  Figma: SiFigma,
  TypeScript: SiTypescript,
  "Next.js": SiNextdotjs,
  GraphQL: SiGraphql,
  Docker: SiDocker,
  AWS: FiLayers,
};
const categories = [
  {
    label: "Frontend",
    Icon: FiCode,
    description:
      "Responsive interfaces, thoughtful interactions, and a focus on the details that make the web feel good to use.",
  },
  {
    label: "Backend",
    Icon: FiServer,
    description:
      "Server-side applications, RESTful APIs, and the logic that connects an interface to useful data.",
  },
  {
    label: "Databases",
    Icon: FiDatabase,
    description:
      "Structured data, practical schemas, and queries that help applications work reliably.",
  },
  {
    label: "Tools & workflow",
    Icon: FiTool,
    description:
      "The tools behind the work: version control, API testing, and collaborative interface design.",
  },
];
const softIcons = [
  FiTarget,
  FiMessageSquare,
  FiUsers,
  FiClock,
  FiCompass,
  FiRefreshCw,
];
const allSkills = skillCategories.flatMap((category) => category.skills);
const groups = [
  { name: "Strong foundation", range: "80–100%", min: 80, max: 100 },
  { name: "Working proficiency", range: "60–79%", min: 60, max: 79 },
  { name: "Developing", range: "0–59%", min: 0, max: 59 },
];

function Meter({ name, value, learning = false }) {
  return (
    <div
      className="sk-meter"
      role={learning ? "progressbar" : "meter"}
      aria-label={name}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
    >
      <span style={{ width: `${value}%` }} />
    </div>
  );
}

function SectionHeading({ number, label, title, description }) {
  return (
    <div className="sk-section-heading">
      <p className="sk-eyebrow">
        <span>{number} /</span> {label}
      </p>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

export default function Skills() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabsRef = useRef([]);
  const category = skillCategories[activeIndex];
  const categoryMeta = categories[activeIndex];
  const CategoryIcon = categoryMeta.Icon;
  const strongest = category.skills.reduce((best, skill) =>
    skill.level > best.level ? skill : best,
  );
  const average = Math.round(
    category.skills.reduce((sum, skill) => sum + skill.level, 0) /
      category.skills.length,
  );
  const circumference = 2 * Math.PI * 46;

  function handleTabKey(event, index) {
    const next =
      event.key === "ArrowRight"
        ? (index + 1) % categories.length
        : event.key === "ArrowLeft"
          ? (index - 1 + categories.length) % categories.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? categories.length - 1
              : null;
    if (next === null) return;
    event.preventDefault();
    setActiveIndex(next);
    tabsRef.current[next]?.focus();
  }

  return (
    <div className="skills-page">
      <SEO />
      <div className="pf-wrap">
        <section className="sk-intro" aria-labelledby="skills-title">
          <div>
            <p className="sk-eyebrow">
              <span>SKILLS & EXPERTISE</span> / THE TOOLS BEHIND THE WORK
            </p>
            <h1 id="skills-title">
              The right tools.
              <br />A <em>builder's</em> mindset<span>.</span>
            </h1>
            <p>
              From an interface's first pixel to the data behind it,
              <br className="sk-desktop-break" /> here's the toolkit I use to
              bring ideas to life.
            </p>
            <a href="#technical-toolkit" className="sk-text-link">
              Explore my toolkit <FiArrowUpRight />
            </a>
          </div>
          <div className="sk-intro-art" aria-hidden="true">
            <span className="sk-art-grid" />
            <span className="sk-orbit sk-orbit-outer" />
            <span className="sk-orbit sk-orbit-inner" />
            <span className="sk-art-core">
              <FiCode />
              <small>BUILD. LEARN. REPEAT.</small>
            </span>
            <span className="sk-orbit-tech sk-art-react">
              <SiReact />
            </span>
            <span className="sk-orbit-tech sk-art-node">
              <SiNodedotjs />
            </span>
            <span className="sk-orbit-tech sk-art-db">
              <SiMongodb />
            </span>
            <span className="sk-orbit-tech sk-art-python">
              <SiPython />
            </span>
            <span className="sk-art-star">✳</span>
          </div>
        </section>
        <div className="sk-overview">
          {[
            {
              value: allSkills.length,
              label: "Technical skills",
              Icon: FiCode,
            },
            {
              value: skillCategories.length,
              label: "Areas of focus",
              Icon: FiLayers,
            },
            {
              value: learningPath.length,
              label: "Technologies in progress",
              Icon: FiTrendingUp,
            },
            {
              value: certifications.length,
              label: "Certifications & courses",
              Icon: FiAward,
            },
          ].map(({ value, label, Icon }) => (
            <div key={label}>
              <Icon />
              <strong>{String(value).padStart(2, "0")}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>

        <section
          className="sk-section"
          id="technical-toolkit"
          aria-labelledby="technical-title"
        >
          <SectionHeading
            number="01"
            label="TECHNICAL TOOLKIT"
            title={
              <span id="technical-title">
                From interface to <em>infrastructure.</em>
              </span>
            }
            description="Explore each area. Proficiency is self-assessed from project work and hands-on experience."
          />
          <div
            className="sk-tabs"
            role="tablist"
            aria-label="Technical skill categories"
          >
            {categories.map(({ label, Icon }, index) => (
              <button
                key={label}
                ref={(element) => {
                  tabsRef.current[index] = element;
                }}
                id={`skill-tab-${index}`}
                role="tab"
                aria-selected={activeIndex === index}
                aria-controls="skill-panel"
                tabIndex={activeIndex === index ? 0 : -1}
                onClick={() => setActiveIndex(index)}
                onKeyDown={(event) => handleTabKey(event, index)}
              >
                <Icon />
                {label}
                <span>{skillCategories[index].skills.length}</span>
              </button>
            ))}
          </div>
          <div
            id="skill-panel"
            role="tabpanel"
            aria-labelledby={`skill-tab-${activeIndex}`}
            tabIndex={0}
            className="sk-category-panel"
          >
            <div className="sk-technical-grid">
              {category.skills.map((skill) => {
                const Icon = skillIcons[skill.name] || FiCode;
                return (
                  <article className="sk-tech-card" key={skill.name}>
                    <div className="sk-tech-top">
                      <span className="sk-tech-icon">
                        <Icon />
                      </span>
                      <div>
                        <h3>{skill.name}</h3>
                        <span>
                          {skill.years} {skill.years === 1 ? "year" : "years"}{" "}
                          of experience
                        </span>
                      </div>
                      <strong>
                        {skill.level}
                        <small>%</small>
                      </strong>
                    </div>
                    <Meter
                      name={`${skill.name} proficiency`}
                      value={skill.level}
                    />
                    <div className="sk-tech-bottom">
                      <span>
                        {skill.level >= 80
                          ? "Strong foundation"
                          : skill.level >= 60
                            ? "Working proficiency"
                            : "Developing"}
                      </span>
                      <FiCheck />
                    </div>
                  </article>
                );
              })}
            </div>
            <aside className="sk-insights">
              <div className="sk-insight-header">
                <CategoryIcon />
                <span>CATEGORY SNAPSHOT</span>
              </div>
              <h3>{category.name}</h3>
              <p>{categoryMeta.description}</p>
              <div className="sk-proficiency-ring">
                <svg
                  viewBox="0 0 120 120"
                  role="img"
                  aria-label={`${category.name} average self-assessed proficiency: ${average}%`}
                >
                  <circle
                    cx="60"
                    cy="60"
                    r="46"
                    fill="none"
                    stroke="var(--pf-line)"
                    strokeWidth="5"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="46"
                    fill="none"
                    stroke="var(--pf-accent)"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray={`${(circumference * average) / 100} ${circumference}`}
                    transform="rotate(-90 60 60)"
                  />
                </svg>
                <div>
                  <strong>
                    {average}
                    <span>%</span>
                  </strong>
                  <small>CATEGORY AVERAGE</small>
                </div>
              </div>
              <dl>
                <div>
                  <dt>Strongest skill</dt>
                  <dd>{strongest.name}</dd>
                </div>
                <div>
                  <dt>Tools in this area</dt>
                  <dd>{category.skills.length} technologies</dd>
                </div>
              </dl>
              <Link to="/projects" className="sk-text-link">
                See the skills in action <FiArrowUpRight />
              </Link>
            </aside>
          </div>
          <div className="sk-distribution">
            <div className="sk-distribution-heading">
              <FiLayers />
              <h3>The bigger picture</h3>
              <span>
                {allSkills.length} skills across {skillCategories.length}{" "}
                disciplines
              </span>
            </div>
            <div className="sk-distribution-grid">
              {groups.map((group, index) => {
                const matching = allSkills.filter(
                  (skill) =>
                    skill.level >= group.min && skill.level <= group.max,
                );
                return (
                  <div
                    key={group.name}
                    className={`sk-skill-group sk-group-${index}`}
                  >
                    <div>
                      <h4>
                        <i />
                        {group.name}
                      </h4>
                      <span>{matching.length}</span>
                    </div>
                    <small>{group.range}</small>
                    <div className="sk-chips">
                      {matching.length ? (
                        matching.map((skill) => (
                          <span key={skill.name}>{skill.name}</span>
                        ))
                      ) : (
                        <p>No skills in this range yet.</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="sk-section" aria-labelledby="soft-title">
          <SectionHeading
            number="02"
            label="THE HUMAN SIDE"
            title={
              <span id="soft-title">
                Better work starts with
                <br />
                <em>better collaboration.</em>
              </span>
            }
            description="The habits and interpersonal skills I bring to every project and team."
          />
          <div className="sk-soft-grid">
            {softSkills.map((skill, index) => {
              const Icon = softIcons[index];
              return (
                <article key={skill.name}>
                  <div className="sk-soft-top">
                    <span>
                      <Icon />
                    </span>
                    <small>0{index + 1}</small>
                  </div>
                  <h3>{skill.name}</h3>
                  <p>{skill.description}</p>
                  <div className="sk-soft-label">
                    <span>Self-assessed proficiency</span>
                    <strong>{skill.level}%</strong>
                  </div>
                  <Meter
                    name={`${skill.name} proficiency`}
                    value={skill.level}
                  />
                </article>
              );
            })}
          </div>
        </section>

        <section className="sk-section" aria-labelledby="learning-title">
          <div className="sk-learning-heading">
            <SectionHeading
              number="03"
              label="ALWAYS A WORK IN PROGRESS"
              title={
                <span id="learning-title">
                  The next <em>chapter.</em>
                </span>
              }
              description="What I'm learning now—and where my curiosity is taking me next."
            />
            <span className="sk-learning-badge">
              <i />
              LEARNING NEVER STOPS
            </span>
          </div>
          <div className="sk-learning-grid">
            {learningPath.map((item, index) => {
              const Icon = skillIcons[item.name] || FiCode;
              return (
                <article
                  key={item.name}
                  className={index === 0 ? "sk-learning-featured" : ""}
                >
                  <div className="sk-learning-top">
                    <span>
                      <Icon />
                    </span>
                    <small>
                      IN PROGRESS <FiTrendingUp />
                    </small>
                  </div>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <div className="sk-learning-progress">
                    <span>Learning progress</span>
                    <strong>{item.progress}%</strong>
                  </div>
                  <Meter
                    name={`${item.name} learning progress`}
                    value={item.progress}
                    learning
                  />
                </article>
              );
            })}
          </div>
        </section>

        <section className="sk-section" aria-labelledby="certifications-title">
          <SectionHeading
            number="04"
            label="LEARNING MILESTONES"
            title={
              <span id="certifications-title">
                Backed by <em>learning.</em>
              </span>
            }
            description="Professional courses and certifications along the way."
          />
          <div className="sk-certificate-grid">
            {certifications.map((certification) => (
              <article key={certification.name}>
                <div className="sk-cert-top">
                  <span>
                    <FiAward />
                  </span>
                  <time>{certification.year}</time>
                </div>
                <p>{certification.issuer}</p>
                <h3>{certification.name}</h3>
                <div className="sk-cert-bottom">
                  <FiCheck />
                  Course completed
                  {certification.credential &&
                    certification.credential !== "#" && (
                      <a
                        href={certification.credential}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View ${certification.name} credential`}
                      >
                        <FiArrowUpRight />
                      </a>
                    )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="sk-connect">
          <div>
            <p className="sk-eyebrow">
              TOOLS MATTER. WHAT YOU BUILD MATTERS MORE.
            </p>
            <h2>
              See the toolkit
              <br />
              in <em>action.</em>
            </h2>
          </div>
          <div>
            <Link to="/projects" className="sk-button">
              Explore my projects <FiArrowUpRight />
            </Link>
            <Link to="/contact" className="sk-text-link">
              Have something in mind? <FiArrowRight />
            </Link>
          </div>
          <span aria-hidden="true">✳</span>
        </section>
      </div>
    </div>
  );
}
