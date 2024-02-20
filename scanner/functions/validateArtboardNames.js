function validateArtboardNames(settings) {
  var names = [];
  forEachUsableArtboard(function(ab) {
    var name = getArtboardName(ab);
    var isDupe = contains(names, name);
    if (isDupe) {
      // kludge: modify settings if same-name artboards are found
      // (used to prevent duplicate image names)
      settings.grouped_artboards = true;
      if (settings.output == 'one-file') {
        warnOnce("Artboards should have unique names. \"" + name + "\" is duplicated.");
      } else {
        warnOnce("Found a group of artboards named \"" + name + "\".");
      }

    }
    names.push(name);
  });
}