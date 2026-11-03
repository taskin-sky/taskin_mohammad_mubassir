import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowUpRight,
  FiArrowDown,
  FiArrowLeft,
  FiArrowRight,
  FiCpu,
  FiCompass,
  FiCode,
  FiAward,
  FiUsers,
  FiCalendar,
  FiCamera,
  FiX,
  FiCheck,
  FiActivity,
  FiTarget,
} from "react-icons/fi";
import { FaFutbol } from "react-icons/fa";
import { clubs, competitions, stats } from "../../data/activitiesData";
import { aboutInfo, galleryImages } from "../../data/aboutData";
import SEO from "../../components/SEO";
import "./activities.css";

const clubIcons = [FiCpu, FaFutbol, FiCompass];
const statIcons = [FiUsers, FiAward, FiTarget, FiCalendar];
const competitionIcons = {
  Robotics: FiCpu,
  Coding: FiCode,
  Research: FiActivity,
  Academics: FiTarget,
  Sports: FaFutbol,
};
const clubPhotos = (club) =>
  galleryImages.filter((image) =>
    club.id === 1
      ? image.id === 2
      : club.id === 2
        ? image.id === 3
        : image.category === "travel",
  );
const competitionFilters = [
  "All",
  ...new Set(competitions.map((item) => item.category)),
];
const timeline = [...aboutInfo.journey.milestones]
  .reverse()
  .map((milestone) => ({
    ...milestone,
    title: milestone.event,
    groupYear: milestone.year.match(/\d{4}/)?.[0] || milestone.year,
  }));
const timelineYears = [...new Set(timeline.map((item) => item.groupYear))];

function SectionHeading({ number, label, title, description }) {
  return (
    <div className="ac-section-heading">
      <p className="ac-eyebrow">
        <span>{number} /</span> {label}
      </p>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

export default function Activities() {
  const [filter, setFilter] = useState("All");
  const [activeGallery, setActiveGallery] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const dialogRef = useRef(null);
  const photos = activeGallery ? clubPhotos(activeGallery) : [];
  const visibleCompetitions = competitions.filter(
    (item) => filter === "All" || item.category === filter,
  );
  useEffect(() => {
    if (!activeGallery) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [activeGallery]);
  function openGallery(club) {
    setImageIndex(0);
    setActiveGallery(club);
    dialogRef.current.showModal();
  }
  function stepImage(direction) {
    setImageIndex(
      (index) => (index + direction + photos.length) % photos.length,
    );
  }

  return (
    <div className="activities-page">
      <SEO />
      <div className="pf-wrap">
        <section className="ac-intro" aria-labelledby="activities-title">
          <div>
            <p className="ac-eyebrow">
              <span>ACTIVITIES & ACHIEVEMENTS</span> / LIFE IN MOTION
            </p>
            <h1 id="activities-title">
              Build. Play.
              <br />
              <em>Explore.</em> Repeat<span>✳</span>
            </h1>
            <p>
              Some of the best lessons happen away from a screen.
              <br className="ac-desktop-break" /> Robotics, football, and a
              little adventure—these are the
              <br className="ac-desktop-break" /> experiences that keep me
              curious.
            </p>
            <a href="#clubs" className="ac-text-link">
              Meet my other sides <FiArrowDown />
            </a>
          </div>
          <div className="ac-intro-art">
            <span className="ac-art-grid" aria-hidden="true" />
            <span className="ac-art-orbit" aria-hidden="true" />
            <div className="ac-collage ac-collage-robot">
              <img
                src="/assets/images/about/robotics.jpg"
                alt="Robo Soccer competition"
                width="300"
                height="220"
              />
              <span>
                <FiCpu />
                BUILD
              </span>
            </div>
            <div className="ac-collage ac-collage-football">
              <img
                src="/assets/images/about/football.jpg"
                alt="University football tournament"
                width="300"
                height="220"
              />
              <span>
                <FaFutbol />
                PLAY
              </span>
            </div>
            <span className="ac-art-compass" aria-hidden="true">
              <FiCompass />
            </span>
            <span className="ac-art-note">
              TEAMWORK. CURIOSITY. A LITTLE COURAGE.
            </span>
          </div>
        </section>
        <div className="ac-overview">
          {stats.map((stat, index) => {
            const Icon = statIcons[index];
            return (
              <div key={stat.label}>
                <Icon />
                <strong>
                  {String(stat.value).padStart(2, "0")}
                  <span>{stat.suffix}</span>
                </strong>
                <p>{stat.label}</p>
              </div>
            );
          })}
        </div>

        <section
          id="clubs"
          className="ac-section"
          aria-labelledby="clubs-title"
        >
          <SectionHeading
            number="01"
            label="THE COMMUNITIES"
            title={
              <span id="clubs-title">
                Different teams.
                <br />
                The same <em>curiosity.</em>
              </span>
            }
            description="The clubs and communities that helped shape my skills, perspective, and team spirit."
          />
          <div className="ac-club-grid">
            {clubs.map((club, index) => {
              const Icon = clubIcons[index];
              const images = clubPhotos(club);
              return (
                <article
                  className={`ac-club ac-palette-${index}`}
                  key={club.id}
                >
                  <button
                    className="ac-club-cover"
                    onClick={() => openGallery(club)}
                    aria-label={`Open ${club.name} photo gallery`}
                  >
                    <img
                      src={images[0].src}
                      alt={images[0].title}
                      loading="lazy"
                    />
                    <span className="ac-cover-number">
                      0{index + 1} / THE COMMUNITY
                    </span>
                    <span className="ac-club-icon">
                      <Icon />
                    </span>
                    <span className="ac-cover-action">
                      <FiCamera />
                      View moments <FiArrowUpRight />
                    </span>
                  </button>
                  <div className="ac-club-body">
                    <div className="ac-club-meta">
                      <span>{club.role}</span>
                      <span>{club.period}</span>
                    </div>
                    <h3>{club.name}</h3>
                    <p>{club.description}</p>
                    <details className="ac-club-details" open>
                      <summary>
                        What I do here{" "}
                        <span>
                          {club.activities.length} activities <FiArrowDown />
                        </span>
                      </summary>
                      <ul>
                        {club.activities.map((activity) => (
                          <li key={activity}>{activity}</li>
                        ))}
                      </ul>
                    </details>
                    <div className="ac-club-achievements">
                      {club.achievements.map((achievement) => (
                        <p key={achievement}>
                          <FiAward />
                          <span>{achievement}</span>
                        </p>
                      ))}
                    </div>
                    <button
                      className="ac-gallery-link"
                      onClick={() => openGallery(club)}
                    >
                      Inside the {club.name.toLowerCase()} <FiArrowUpRight />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="ac-section" aria-labelledby="competitions-title">
          <div className="ac-competitions-heading">
            <SectionHeading
              number="02"
              label="THE CHALLENGES"
              title={
                <span id="competitions-title">
                  A little pressure.
                  <br />A lot of <em>growth.</em>
                </span>
              }
              description="From the robotics arena to the football pitch—challenges that left a mark."
            />
            <span className="ac-competition-note">
              <FiAward />
              {competitions.length} competitions & presentations
            </span>
          </div>
          <div className="ac-filters" aria-label="Filter competitions">
            {competitionFilters.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                aria-pressed={filter === category}
              >
                {category}
                <span>
                  {category === "All"
                    ? competitions.length
                    : competitions.filter((item) => item.category === category)
                        .length}
                </span>
              </button>
            ))}
          </div>
          <p className="ac-results" aria-live="polite">
            {visibleCompetitions.length}{" "}
            {visibleCompetitions.length === 1 ? "highlight" : "highlights"}
            {filter !== "All" && ` in ${filter}`}
          </p>
          <div className="ac-competition-grid">
            {visibleCompetitions.map((item) => {
              const Icon = competitionIcons[item.category] || FiAward;
              return (
                <article
                  className={`ac-competition ac-category-${item.category.toLowerCase()}`}
                  key={item.id}
                >
                  <span className="ac-competition-orbit" aria-hidden="true" />
                  <div className="ac-competition-top">
                    <span>
                      <Icon />
                    </span>
                    <time>{item.year}</time>
                  </div>
                  <p className="ac-category-label">{item.category}</p>
                  <h3>{item.name}</h3>
                  <p className="ac-event">{item.event}</p>
                  <span className="ac-result-badge">
                    <FiAward />
                    {item.result}
                  </span>
                  <p className="ac-competition-description">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section
          className="ac-section ac-timeline-section"
          aria-labelledby="timeline-title"
        >
          <div>
            <SectionHeading
              number="03"
              label="THE MOMENTS THAT STAY"
              title={
                <span id="timeline-title">
                  Small moments.
                  <br />
                  <em>Lasting</em> lessons.
                </span>
              }
              description="A few milestones from the journey, collected in one place."
            />
            <div className="ac-timeline-note">
              <FiCompass />
              <p>
                Keep showing up.
                <br />
                Keep trying new things.
              </p>
              <span>THAT'S WHERE THE GROWTH HAPPENS ↗</span>
            </div>
          </div>
          <div className="ac-timeline">
            <p className="ac-timeline-label">
              THE HIGHLIGHT REEL / LATEST FIRST
            </p>
            {timelineYears.map((year) => (
              <div className="ac-year-group" key={year}>
                <time>{year}</time>
                <div>
                  {timeline
                    .filter((item) => item.groupYear === year)
                    .map((item) => (
                      <article
                        key={`${year}-${item.title}`}
                        className={
                          item.current ? "ac-current-milestone" : undefined
                        }
                      >
                        <span aria-hidden="true" />
                        {(item.current || item.year !== year) && (
                          <div className="ac-milestone-meta">
                            <time>{item.year}</time>
                            {item.current && <strong>CAREER MILESTONE</strong>}
                          </div>
                        )}
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </article>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="ac-connect">
          <div>
            <p className="ac-eyebrow">
              GOOD THINGS HAPPEN WHEN PEOPLE COME TOGETHER
            </p>
            <h2>
              Build a team.
              <br />
              Start an <em>adventure.</em>
            </h2>
            <p>
              A collaboration, a community project, or just a conversation—let's
              connect.
            </p>
          </div>
          <div>
            <Link to="/contact" className="ac-button">
              Get in touch <FiArrowUpRight />
            </Link>
            <Link to="/about" className="ac-text-link">
              More about me <FiArrowUpRight />
            </Link>
          </div>
          <span aria-hidden="true">✳</span>
        </section>
      </div>
      <dialog
        ref={dialogRef}
        className="ac-lightbox"
        aria-labelledby="activity-gallery-title"
        onClose={() => setActiveGallery(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current.close();
        }}
        onKeyDown={(event) => {
          if (photos.length < 2) return;
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
        {activeGallery && (
          <div className="ac-lightbox-inner">
            <div className="ac-lightbox-top">
              <div>
                <p className="ac-eyebrow">COLLECTED MOMENTS</p>
                <h2 id="activity-gallery-title">{activeGallery.name}</h2>
              </div>
              <button
                autoFocus
                onClick={() => dialogRef.current.close()}
                aria-label="Close photo gallery"
              >
                <FiX />
              </button>
            </div>
            <img src={photos[imageIndex].src} alt={photos[imageIndex].title} />
            <div className="ac-lightbox-bottom">
              <button
                onClick={() => stepImage(-1)}
                disabled={photos.length < 2}
                aria-label="Previous photo"
              >
                <FiArrowLeft />
              </button>
              <div>
                <p>{photos[imageIndex].title}</p>
                <span aria-live="polite">
                  {imageIndex + 1} / {photos.length}
                </span>
              </div>
              <button
                onClick={() => stepImage(1)}
                disabled={photos.length < 2}
                aria-label="Next photo"
              >
                <FiArrowRight />
              </button>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
