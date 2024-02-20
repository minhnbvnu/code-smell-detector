function findPage(pages, path) {
  const firstPage = path.shift();
  const page = pages.find(p => p.path === firstPage);

  if (!page) {
    return {redirect: getDefaultPath(pages)};
  }
  if (page.children) {
    const result = findPage(page.children, path);
    if (result.page) {
      return result;
    }
    return {redirect: [firstPage].concat(result.redirect)};
  }
  if (path.length) {
    return {redirect: []};
  }
  return {page};
}