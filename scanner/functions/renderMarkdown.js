function renderMarkdown(content, {markdown, root}) {
  renderer._root = root;
  renderer._dirname = markdown.replace(/[^\/]*$/, '');
  renderer._path = markdown.slice(markdown.indexOf('docs/'));
  return marked(content, {renderer});
}