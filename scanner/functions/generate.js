function generate(title, docs, filename, resolveLinks) {
  resolveLinks = resolveLinks === false ? false : true;

  const docData = {
    filename: filename,
    title: title,
    docs: docs,
    packageInfo: (find({kind: 'package'}) || [])[0],
  };

  const outpath = path.join(outdir, filename);
  let html = view.render('container.tmpl', docData);

  if (resolveLinks) {
    html = helper.resolveLinks(preprocessLinks(html)); // turn {@link foo} into <a href="foodoc.html">foo</a>
  }

  fs.writeFileSync(outpath, html, 'utf8');
}