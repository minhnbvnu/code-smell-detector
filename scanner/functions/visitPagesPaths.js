function visitPagesPaths(callback) {
  const visit = input => {
    input.forEach(item => {
      if (item.markdown) {
        const fullPath = path.join(ROOT, 'docs', item.markdown);
        callback(item.markdown, fullPath); // eslint-disable-line callback-return
      } else {
        visit(item.children);
      }
    });
  };

  const pages = loadJSONSync(path.join(ROOT, 'website', 'pages.json'));

  visit(pages);
}