export const formatPostDate = (date) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
export function filterPosts(posts, category, query, tag = "", sort = "newest") {
  const search = query.trim().toLowerCase();
  return posts
    .filter(
      (post) =>
        (category === "All" || post.category === category) &&
        (!tag || post.tags.includes(tag)) &&
        `${post.title} ${post.category} ${post.excerpt} ${post.tags.join(" ")}`
          .toLowerCase()
          .includes(search),
    )
    .sort((a, b) =>
      sort === "popular" ? b.views - a.views : b.date.localeCompare(a.date),
    );
}
export function articleContent(post) {
  const headings = [];
  const html = post.content.replace(/<h2>(.*?)<\/h2>/g, (_, title) => {
    const id = `article-section-${headings.length + 1}`;
    headings.push({ id, title });
    return `<h2 id="${id}">${title}</h2>`;
  });
  return { html, headings };
}
