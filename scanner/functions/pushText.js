function pushText(text, options) {
  if (options.escapeXML) {
    return entities.encodeXML(text);
  }

  return text;
}