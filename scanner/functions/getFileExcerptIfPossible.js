function getFileExcerptIfPossible(error) {
  if (typeof error.extract === "undefined") {
    return [];
  }

  const excerpt = error.extract.slice(0, 2);
  const column = Math.max(error.column - 1, 0);

  if (typeof excerpt[0] === "undefined") {
    excerpt.shift();
  }

  excerpt.push(`${new Array(column).join(" ")}^`);

  return excerpt;
}