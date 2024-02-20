function getNearestResultIndex(store, searchResults, selectedElementIndex) {
  const index = searchResults.findIndex(id => {
    const innerIndex = store.getIndexOfElementID(id);
    return innerIndex !== null && innerIndex >= selectedElementIndex;
  });
  return index === -1 ? 0 : index;
}