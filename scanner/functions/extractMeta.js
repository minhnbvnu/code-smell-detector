function extractMeta(content) {
  const meta = content && content.match(gAllMetaRegexp);
  if (meta) return meta[2].replace(/^\s+/, '');
  return '';
}