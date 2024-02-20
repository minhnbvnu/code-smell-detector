function resolveKontraType(string, isArray) {
  return string.replace(kontraTypesRegex, function (match, p1) {
    let url = p1;
    // if (isArray) {
    //   url = url;
    // }
    url = url[0].toLowerCase() + url.slice(1);

    return `<a href="api/${url}">${p1}</a>`;
  });
}