import { FiArrowUpRight, FiCode, FiCpu, FiCheck } from "react-icons/fi";
import { SiReact, SiTailwindcss, SiMongodb, SiNodedotjs } from "react-icons/si";

export default function JournalCover({ post }) {
  return (
    <div className={`jl-cover jl-cover-${post.id}`} aria-hidden="true">
      <span className="jl-cover-grid" />
      <span className="jl-cover-orbit" />
      <span className="jl-cover-label">
        FIELD NOTES / {String(post.id).padStart(2, "0")}
      </span>
      <span className="jl-cover-corner">
        <FiArrowUpRight />
      </span>
      {post.id === 1 ? (
        <div className="jl-cover-stack">
          <span>
            <SiMongodb />M
          </span>
          <span>
            <FiCode />E
          </span>
          <span>
            <SiReact />R
          </span>
          <span>
            <SiNodedotjs />N
          </span>
          <small>ONE LANGUAGE. THE WHOLE STACK.</small>
        </div>
      ) : post.id === 2 ? (
        <div className="jl-cover-type">
          <SiTailwindcss />
          <strong>
            style<span>without limits.</span>
          </strong>
          <small>UTILITY FIRST. DETAILS ALWAYS.</small>
        </div>
      ) : post.id === 3 ? (
        <div className="jl-cover-network">
          <svg viewBox="0 0 280 140">
            <g stroke="currentColor" strokeWidth="1" fill="none">
              <path d="M35 30L100 50L180 25L245 70L180 115L100 90L35 110M35 30L100 90L180 25M100 50L180 115M100 90L245 70M35 110L100 50" />
            </g>
            {[
              [35, 30],
              [35, 110],
              [100, 50],
              [100, 90],
              [180, 25],
              [180, 115],
              [245, 70],
            ].map(([x, y]) => (
              <circle
                key={`${x}-${y}`}
                cx={x}
                cy={y}
                r="5"
                fill="currentColor"
              />
            ))}
          </svg>
          <FiCpu />
          <small>CURIOUS CODE. SMARTER APPLICATIONS.</small>
        </div>
      ) : post.id === 4 ? (
        <div className="jl-cover-terminal">
          <span>
            <i />
            <i />
            <i />
            <small>debug-session.js</small>
          </span>
          <code>
            <b>const</b> problem = findBug();
            <br />
            <b>await</b> understand(problem);
            <br />
            test. fix. repeat<span>_</span>
          </code>
          <small>
            <FiCheck /> One bug closer to better code.
          </small>
        </div>
      ) : (
        <div className="jl-cover-portfolio">
          <div>
            <i />
            <i />
            <i />
            <small>your-story.dev</small>
          </div>
          <span className="jl-mini-profile" />
          <strong>
            Hello, world<span>.</span>
          </strong>
          <p>THOUGHTFUL WORK. WELL TOLD.</p>
          <span className="jl-mini-projects">
            <i />
            <i />
            <i />
          </span>
        </div>
      )}
      <span className="jl-cover-bottom">
        {post.category}
        <span>✳</span>
      </span>
    </div>
  );
}
