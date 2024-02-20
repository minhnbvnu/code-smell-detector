function forEachUsableArtboard(cb) {
  var ab;
  for (var i=0; i<doc.artboards.length; i++) {
    ab = doc.artboards[i];
    if (!/^-/.test(ab.name)) { // exclude artboards with names starting w/ "-"
      cb(ab, i);
    }
  }
}