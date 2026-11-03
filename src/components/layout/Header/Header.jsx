import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FiArrowUpRight, FiMenu, FiX } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";

const links = [
  ["/", "Home"],
  ["/about", "About"],
  ["/resume", "Résumé"],
  ["/projects", "Projects"],
  ["/skills", "Skills"],
  ["/blog", "Blog"],
  ["/activities", "Activities"],
];

export default function PortfolioHeader() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);
  useEffect(() => {
    if (!open) return;
    const close = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="pf-header">
      <a className="pf-skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="pf-wrap pf-header-inner">
        <Link className="pf-name-brand" to="/" aria-label="Taskin Mohammad Mubassir home">
          𝓉𝒶𝓈𝓀𝒾𝓃-𝓂-𝓂𝓊𝒷𝒶𝓈𝓈𝒾𝓇
        </Link>
        <nav className="pf-desktop-nav" aria-label="Main navigation">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === "/"}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="pf-header-actions">
          <ThemeToggle />
          <Link className="pf-header-cta" to="/contact">
            Let's talk <FiArrowUpRight />
          </Link>
          <button
            className="pf-menu-toggle"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          className="pf-mobile-nav"
          aria-label="Mobile navigation"
        >
          {[...links, ["/contact", "Contact"], ["/guestbook", "Guestbook"]].map(
            ([to, label]) => (
              <NavLink key={to} to={to} end={to === "/"}>
                {label}
                <FiArrowUpRight />
              </NavLink>
            ),
          )}
        </nav>
      )}
    </header>
  );
}
