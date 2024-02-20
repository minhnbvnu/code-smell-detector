function stringifyRenditionList(renditions) {
  return renditions
    ?.map(stringifyRendition)
    .join(' ');
}