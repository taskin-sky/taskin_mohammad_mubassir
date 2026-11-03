export const projectType = (project) =>
  project.category.toLowerCase().includes("mern") ? "fullstack" : "frontend";
export const projectImages = (project) =>
  (project.images?.length ? project.images : [project.image])
    .filter(Boolean)
    .map((path) => path.replace(/^\.\//, "/"));
export const filters = [
  { id: "all", label: "All projects" },
  { id: "fullstack", label: "Full-stack" },
  { id: "frontend", label: "Frontend" },
  { id: "react", label: "React" },
];
export function matchesCategory(project, category) {
  return (
    category === "all" ||
    (category === "react"
      ? project.tech.some((tech) => /^react(?:\.js)?$/i.test(tech))
      : projectType(project) === category)
  );
}
export function selectProjects(projects, category, search, sort) {
  const query = search.trim().toLowerCase();
  const results = projects.filter(
    (project) =>
      matchesCategory(project, category) &&
      `${project.title} ${project.description} ${project.tech.join(" ")}`
        .toLowerCase()
        .includes(query),
  );
  if (sort !== "featured")
    results.sort((a, b) =>
      sort === "newest"
        ? Number(b.date) - Number(a.date)
        : Number(a.date) - Number(b.date),
    );
  return results;
}
