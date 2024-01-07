function getPrettyName(doclet) {
  const fullname = doclet.longname.replace('module:', '');
  if (doclet.isDefaultExport) {
    return fullname.split('~')[0];
  }
  return fullname;
}