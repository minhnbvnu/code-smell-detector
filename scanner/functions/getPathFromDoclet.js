function getPathFromDoclet(doclet) {
  if (!doclet.meta) {
    return;
  }

  const filepath =
    doclet.meta.path && doclet.meta.path !== 'null'
      ? doclet.meta.path + '/' + doclet.meta.filename.split(/[\/\\]/).pop()
      : doclet.meta.filename;

  return filepath;
}