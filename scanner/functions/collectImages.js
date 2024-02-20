function collectImages(html) {
  var found = html.match(/<img src="(.*?)" .*?>/g);
  if (found == null) {
    return [];
  } else {
    return _(found).chain()
      .map(function(img) {
        if (img.indexOf('img.shields.io') !== -1) {
          return null;
        } else {
          var matchUrl = img.match(/src="(.*?)"/);
          return {
            html: img,
            url: matchUrl[1]
          };
        }
      })
      .compact()
      .value();
  }
}