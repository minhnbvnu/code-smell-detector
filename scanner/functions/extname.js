function extname(text) {
  const index = text.lastIndexOf('.');
  const ext = text.substring(index, text.length);

  return (index === -1) ? '' : ext;
}