import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowUpRight,
  FiClock,
  FiHeart,
  FiCopy,
  FiCheck,
  FiBookOpen,
} from "react-icons/fi";
import { blogPosts } from "../../data/blogData";
import { articleContent, formatPostDate } from "./blogUtils";
import JournalCover from "./JournalCover";
import SEO from "../../components/SEO";
import "./journal.css";

export default function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find((item) => String(item.id) === id);
  const [readingProgress, setReadingProgress] = useState(0);
  const [liked, setLiked] = useState(false);
  const [shareStatus, setShareStatus] = useState("");
  const contentRef = useRef(null);
  const content = post ? articleContent(post) : null;
  useEffect(() => {
    setShareStatus("");
    try {
      setLiked(localStorage.getItem(`journal-like-${id}`) === "true");
    } catch {
      setLiked(false);
    }
  }, [id]);
  useEffect(() => {
    function updateProgress() {
      if (!contentRef.current) return;
      const bounds = contentRef.current.getBoundingClientRect();
      const distance = bounds.height - window.innerHeight * 0.4;
      setReadingProgress(
        Math.max(
          0,
          Math.min(100, ((-bounds.top + 120) / Math.max(1, distance)) * 100),
        ),
      );
    }
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [id]);
  function toggleLike() {
    const next = !liked;
    setLiked(next);
    try {
      localStorage.setItem(`journal-like-${id}`, String(next));
    } catch {}
  }
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareStatus("copied");
    } catch {
      setShareStatus("manual");
    }
  }
  if (!post)
    return (
      <div className="journal-page">
        <div className="pf-wrap jl-missing">
          <FiBookOpen />
          <h1>That note isn't here.</h1>
          <p>Explore the journal to find something else to read.</p>
          <Link className="jl-button" to="/blog">
            Back to the journal <FiArrowLeft />
          </Link>
        </div>
      </div>
    );
  return (
    <div className="journal-page jl-article-page">
      <SEO
        customMeta={{
          title: `${post.title} | Taskin Mubassir`,
          description: post.excerpt,
        }}
      />
      <div className="jl-reading-progress" aria-hidden="true">
        <span style={{ width: `${readingProgress}%` }} />
      </div>
      <div className="pf-wrap">
        <div className="jl-article-header">
          <Link className="jl-back-link" to="/blog">
            <FiArrowLeft />
            Back to the journal
          </Link>
          <p className="jl-eyebrow">
            <Link to={`/blog?category=${encodeURIComponent(post.category)}`}>
              {post.category}
            </Link>{" "}
            / FIELD NOTES
          </p>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
          <div className="jl-byline">
            <img src="/Taskin-m.png" alt="" width="38" height="38" />
            <span>
              <strong>{post.author}</strong>
              <small>Software Engineer · INORIZON</small>
            </span>
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span>
              <FiClock />
              {post.readTime} min read
            </span>
          </div>
        </div>
        <div className="jl-article-cover">
          <JournalCover post={post} />
        </div>
        <div className="jl-reading-layout">
          <aside className="jl-toc">
            <p>IN THIS ARTICLE</p>
            <nav aria-label="Article contents">
              {content.headings.map((heading, index) => (
                <a key={heading.id} href={`#${heading.id}`}>
                  <span>0{index + 1}</span>
                  {heading.title}
                </a>
              ))}
            </nav>
            <Link to="/blog" className="jl-text-link">
              More from the journal <FiArrowUpRight />
            </Link>
          </aside>
          <div>
            <article
              ref={contentRef}
              className="jl-prose"
              dangerouslySetInnerHTML={{ __html: content.html }}
            />
            <div className="jl-article-tags">
              {post.tags.map((tag) => (
                <Link key={tag} to={`/blog?tag=${encodeURIComponent(tag)}`}>
                  #{tag}
                </Link>
              ))}
            </div>
            <div className="jl-article-actions">
              <button
                onClick={toggleLike}
                aria-pressed={liked}
                className={liked ? "jl-liked" : ""}
              >
                <FiHeart />
                {post.likes + (liked ? 1 : 0)}
                <span>{liked ? "Liked" : "Like this article"}</span>
              </button>
              <button onClick={copyLink}>
                {shareStatus === "copied" ? <FiCheck /> : <FiCopy />}
                {shareStatus === "copied" ? "Link copied" : "Copy link"}
              </button>
            </div>
            <p className="jl-share-status" role="status">
              {shareStatus === "copied"
                ? "Article link copied to your clipboard."
                : ""}
            </p>
            {shareStatus === "manual" && (
              <label className="jl-manual-copy">
                Copy this article link
                <input
                  readOnly
                  value={window.location.href}
                  onFocus={(event) => event.target.select()}
                />
              </label>
            )}
          </div>
        </div>
        <section className="jl-related">
          <p className="jl-eyebrow">KEEP THE CURIOSITY GOING</p>
          <h2>
            Something else to <em>explore.</em>
          </h2>
          <div>
            {blogPosts
              .filter((item) => item.id !== post.id)
              .slice(0, 2)
              .map((item) => (
                <Link key={item.id} to={`/blog/${item.id}`}>
                  <span>
                    {item.category} · {item.readTime} min read
                  </span>
                  <h3>{item.title}</h3>
                  <FiArrowUpRight />
                </Link>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}
