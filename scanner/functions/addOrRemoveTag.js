function addOrRemoveTag(tag, selection) {
  const regex = new RegExp(`^${escapeRegExp(tag)}([^]+?)${escapeRegExp(tag)}$`);
  const matches = selection.match(regex, 'gi');

  if (null !== matches) {
    return matches[1];
  }

  return `${tag}${selection}${tag}`;
}