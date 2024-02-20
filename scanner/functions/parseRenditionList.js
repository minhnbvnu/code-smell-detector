function parseRenditionList(renditions) {
  return renditions
    ?.split(/\s+/)
    .map(parseRendition);
}