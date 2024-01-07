function preprocessLinks(text) {
  return text.replaceAll(
    /\{@link (module:ol\/\S+?)\}/g,
    (match, longname) => `{@link ${longname} ${getShortName(longname)}}`,
  );
}