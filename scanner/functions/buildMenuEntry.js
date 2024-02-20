function buildMenuEntry(manifest) {
  let {name, docsUrl, description, pathname} = manifest;
  let docsLink = `[<a href="${docsUrl}">Documentation</a>]`;
  let dt = `<dt><a href="${pathname}">${name}</a></dt>`;
  let dd = `<dd>${escapeHTML(description)}&nbsp;${docsLink}</dd>`;
  output = dt+"\n"+dd+"\n";
  return output;
}