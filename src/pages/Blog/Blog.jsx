import { useSearchParams, Link } from "react-router-dom";
import {
  FiArrowUpRight,
  FiArrowRight,
  FiSearch,
  FiX,
  FiClock,
  FiBookOpen,
  FiTag,
} from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import {
  blogPosts,
  categories,
  popularTags,
  recentPosts,
} from "../../data/blogData";
import { personalInfo } from "../../data/personalData";
import { filterPosts, formatPostDate } from "./blogUtils";
import JournalCover from "./JournalCover";
import SEO from "../../components/SEO";
import "./journal.css";

function ArticleCard({ post }) {
  return (
    <article className="jl-card">
      <Link
        className="jl-card-cover"
        to={`/blog/${post.id}`}
        aria-label={`Read ${post.title}`}
      >
        <JournalCover post={post} />
        <span className="jl-cover-read">
          Read the story <FiArrowUpRight />
        </span>
      </Link>
      <div className="jl-card-body">
        <div className="jl-card-meta">
          <span>{post.category}</span>
          <span>
            <FiClock />
            {post.readTime} min read
          </span>
        </div>
        <h2>
          <Link to={`/blog/${post.id}`}>
            {post.title}
            <FiArrowUpRight />
          </Link>
        </h2>
        <p>{post.excerpt}</p>
        <div className="jl-card-tags" aria-label="Article topics">
          {post.tags.slice(0, 3).map((tag) => (
            <Link key={tag} to={`/blog?tag=${encodeURIComponent(tag)}`}>
              #{tag}
            </Link>
          ))}
        </div>
        <div className="jl-card-bottom">
          <span className="jl-card-byline">
            <img src="/Taskin-m.png" alt="" width="26" height="26" />
            <span>
              <strong>{post.author}</strong>
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            </span>
          </span>
          <Link
            to={`/blog/${post.id}`}
            aria-label={`Continue reading ${post.title}`}
          >
            <FiArrowRight />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Blog() {
  const [params, setParams] = useSearchParams();
  const category = categories.some(
    (item) => item.name === params.get("category"),
  )
    ? params.get("category")
    : "All";
  const search = params.get("search") || "";
  const tag = params.get("tag") || "";
  const sort = params.get("sort") === "popular" ? "popular" : "newest";
  const filtered = filterPosts(blogPosts, category, search, tag, sort);
  const featured = [...blogPosts].sort((a, b) => b.views - a.views)[0];
  function updateFilter(key, value) {
    setParams(
      (previous) => {
        const next = new URLSearchParams(previous);
        if (!value || (key === "category" && value === "All")) next.delete(key);
        else next.set(key, value);
        return next;
      },
      { replace: true, preventScrollReset: true },
    );
  }

  return (
    <div className="journal-page">
      <SEO />
      <div className="pf-wrap">
        <section className="jl-intro">
          <div>
            <p className="jl-eyebrow">
              <span>THE JOURNAL</span> / IDEAS WORTH SHARING
            </p>
            <h1>
              Notes from
              <br />
              the <em>build.</em>
              <span>✳</span>
            </h1>
          </div>
          <div>
            <p>
              Things I've learned, problems I've worked through,
              <br className="jl-desktop-break" /> and ideas that keep me
              curious.
            </p>
            <span>
              <FiBookOpen />
              Development, design & beyond
            </span>
            <div className="jl-reading-summary">
              <span>
                <strong>{blogPosts.length}</strong> field notes
              </span>
              <i />
              <span>
                <strong>
                  {blogPosts.reduce((total, post) => total + post.readTime, 0)}
                </strong>{" "}
                minutes of reading
              </span>
            </div>
          </div>
        </section>
        {!search && category === "All" && !tag && (
          <section className="jl-featured" aria-label="Featured article">
            <Link
              className="jl-featured-cover"
              to={`/blog/${featured.id}`}
              aria-label={`Read ${featured.title}`}
            >
              <JournalCover post={featured} />
            </Link>
            <div className="jl-featured-copy">
              <p className="jl-eyebrow">
                <span>
                  <i />
                  EDITOR'S PICK
                </span>{" "}
                / {featured.category}
              </p>
              <h2>
                <Link to={`/blog/${featured.id}`}>{featured.title}</Link>
              </h2>
              <p>{featured.excerpt}</p>
              <div className="jl-featured-meta">
                <time dateTime={featured.date}>
                  {formatPostDate(featured.date)}
                </time>
                <span>
                  <FiClock />
                  {featured.readTime} min read
                </span>
              </div>
              <Link className="jl-button" to={`/blog/${featured.id}`}>
                Read the article <FiArrowUpRight />
              </Link>
            </div>
          </section>
        )}
        <div className="jl-layout">
          <section className="jl-library" aria-labelledby="articles-title">
            <div className="jl-library-top">
              <div>
                <p className="jl-eyebrow">THE READING LIST</p>
                <h2 id="articles-title">
                  A little learning,
                  <br />
                  one <em>article</em> at a time.
                </h2>
              </div>
              <span>{String(blogPosts.length).padStart(2, "0")} NOTES</span>
            </div>
            <div className="jl-search">
              <FiSearch />
              <input
                type="search"
                aria-label="Search articles by title, topic, or tag"
                placeholder="Search a topic, idea, or technology…"
                value={search}
                onChange={(event) => updateFilter("search", event.target.value)}
              />
              {search && (
                <button
                  onClick={() => updateFilter("search", "")}
                  aria-label="Clear search"
                >
                  <FiX />
                </button>
              )}
            </div>
            <div
              className="jl-filters"
              aria-label="Filter articles by category"
            >
              {categories.map((item) => (
                <button
                  key={item.name}
                  aria-pressed={category === item.name}
                  onClick={() => updateFilter("category", item.name)}
                >
                  {item.name}
                  <span>{item.count}</span>
                </button>
              ))}
            </div>
            {tag && (
              <button
                className="jl-active-tag"
                onClick={() => updateFilter("tag", "")}
              >
                #{tag}
                <FiX />
                <span className="sr-only">Remove tag filter</span>
              </button>
            )}
            <div className="jl-results">
              <p aria-live="polite">
                {filtered.length}{" "}
                {filtered.length === 1 ? "article" : "articles"}
                {search.trim() && ` matching “${search.trim()}”`}
              </p>
              {(search || tag || category !== "All") && (
                <button
                  className="jl-reset-filters"
                  onClick={() =>
                    setParams({}, { replace: true, preventScrollReset: true })
                  }
                >
                  Reset filters <FiX />
                </button>
              )}
              <label>
                Sort
                <select
                  value={sort}
                  onChange={(event) => updateFilter("sort", event.target.value)}
                >
                  <option value="newest">Latest first</option>
                  <option value="popular">Most read</option>
                </select>
              </label>
            </div>
            {filtered.length ? (
              <div className="jl-card-grid">
                {filtered.map((post) => (
                  <ArticleCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="jl-empty">
                <FiSearch />
                <h3>No stories found</h3>
                <p>Try another topic, or explore all the notes.</p>
                <button
                  className="jl-button"
                  onClick={() =>
                    setParams({}, { replace: true, preventScrollReset: true })
                  }
                >
                  Clear filters <FiArrowRight />
                </button>
              </div>
            )}
          </section>
          <aside className="jl-sidebar">
            <section className="jl-author">
              <p className="jl-eyebrow">BEHIND THE WORDS</p>
              <div>
                <img
                  src="/Taskin-m.png"
                  alt="Taskin Mubassir"
                  width="56"
                  height="56"
                />
                <span>
                  <strong>Taskin Mubassir</strong>
                  <small>Software Engineer · INORIZON</small>
                </span>
              </div>
              <p>
                Building for the web, exploring machine learning, and sharing
                what I learn along the way.
              </p>
              <Link to="/about" className="jl-text-link">
                A little more about me <FiArrowUpRight />
              </Link>
            </section>
            <section className="jl-topics">
              <h3>
                <FiTag />
                Explore a topic
              </h3>
              <div>
                {popularTags().map((item) => (
                  <button
                    key={item.name}
                    aria-pressed={tag === item.name}
                    onClick={() =>
                      updateFilter("tag", tag === item.name ? "" : item.name)
                    }
                  >
                    #{item.name}
                    <span>{item.count}</span>
                  </button>
                ))}
              </div>
            </section>
            <section className="jl-recent">
              <h3>
                <FiBookOpen />
                Fresh from the journal
              </h3>
              <ol>
                {recentPosts().map((post, index) => (
                  <li key={post.id}>
                    <span>0{index + 1}</span>
                    <div>
                      <Link to={`/blog/${post.id}`}>{post.title}</Link>
                      <small>
                        {formatPostDate(post.date)} · {post.readTime} min
                      </small>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
            <div className="jl-sidebar-note">
              <span className="jl-code-mark" aria-hidden="true">
                &lt;/&gt;
              </span>
              <p>
                Learn something.
                <br />
                Build something.
                <br />
                <em>Share something.</em>
              </p>
              <span>THE LOOP THAT KEEPS ME GOING ↗</span>
            </div>
          </aside>
        </div>
        <section className="jl-connect">
          <div>
            <p className="jl-eyebrow">GOOD IDEAS DESERVE A CONVERSATION</p>
            <h2>
              Something <em>resonate?</em>
              <br />
              Let's talk about it.
            </h2>
            <p>
              A question, a collaboration, or an idea for the next article—I'd
              love to hear it.
            </p>
          </div>
          <div>
            <Link className="jl-button" to="/contact">
              Start a conversation <FiArrowUpRight />
            </Link>
            <a
              className="jl-text-link"
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub />
              Follow the code <FiArrowUpRight />
            </a>
          </div>
          <span aria-hidden="true">✳</span>
        </section>
      </div>
    </div>
  );
}
