function markdown2html(markdownString) {
  var md = new Markdown();

  // the slice removes the <p>...</p> wrapper output by Markdown processor
  return md.render(markdownString.trim()).slice(3, -5);
}