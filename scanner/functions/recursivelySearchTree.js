function recursivelySearchTree(store, elementID, regExp, searchResults) {
  const {
    children,
    displayName,
    hocDisplayNames
  } = store.getElementByID(elementID);

  if (displayName != null && regExp.test(displayName) === true) {
    searchResults.push(elementID);
  } else if (hocDisplayNames != null && hocDisplayNames.length > 0 && hocDisplayNames.some(name => regExp.test(name)) === true) {
    searchResults.push(elementID);
  }

  children.forEach(childID => recursivelySearchTree(store, childID, regExp, searchResults));
}