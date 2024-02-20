function getDefaultPath(pages) {
  if (!pages || !pages.length) {
    return [];
  }
  const page = pages[0];
  return [page.path].concat(getDefaultPath(page.children));
}