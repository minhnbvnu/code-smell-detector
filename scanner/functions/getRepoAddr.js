function getRepoAddr(name) {
  if (name.match(/^https?:\/\//)) return name;
  if (name.match(/^git@/)) return name;
  return `https://github.com/${name}`;
}