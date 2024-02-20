function normalizeCursorSelector(selector) {
  return `${// TODO: Fix this hack
  // Maybe our CSS name spacing should be based on some other class/id
  // than the one we use for defining the main div.
  // That way it could be shared by both the player and the context menu.
  selector.startsWith("#webamp-context-menu") ? "" : CSS_PREFIX} ${selector}`;
}