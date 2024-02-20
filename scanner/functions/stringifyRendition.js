function stringifyRendition(rendition) {
  if (rendition) {
    const { id, width, height } = rendition;
    return [id, width, height].filter(a => a != null).join(':')
  }
}