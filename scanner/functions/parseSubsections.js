function parseSubsections( section ){
  let parentName = section.name;
  let html = section.html;
  let matches = html.match(/\<h2.*?\>.+?\<\/h2\>/g);
  let psubs = [];

  for( let i = 0; matches && i < matches.length; i++ ){
    let match = matches[i];
    let name = match.match(/\<h2.*?\>(.+)\<\/h2\>/)[1];
    let id = toUrl(parentName) + '/' + toUrl(name);

    psubs.push({
      name: name,
      fromMd: true,
      id: id,
      bookmark: makeBookmark(id)
    });

    section.html = section.html.replace(match, '<h2 id="' + id + '">' + name + ' ' + makeBookmark(id) +  '</h2>');
  }

  return psubs;
}