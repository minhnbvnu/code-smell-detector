function addTocToContent(text, config) {
  const needOutline = !text.match(/\[toc\]/i) && !config.withoutOutline;
  return needOutline ? `[toc]\n${text}` : text;
}