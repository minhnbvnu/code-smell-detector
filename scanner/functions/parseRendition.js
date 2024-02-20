function parseRendition(rendition) {
  if (rendition) {
    const [id, width, height] = rendition.split(':');
    return { id, width, height };
  }
}