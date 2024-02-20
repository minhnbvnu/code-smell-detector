function detectTimesFonts() {
  var found = false;
  try {
    found = !!(app.textFonts.getByName('NYTFranklin-Medium') && app.textFonts.getByName('NYTCheltenham-Medium'));
  } catch(e) {}
  return found;
}