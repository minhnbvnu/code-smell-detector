function updateCurrentDocument(document, force) {
  return { type: UPDATE_CURRENT_DOCUMENT, document, forceUpdate: force || false };
}