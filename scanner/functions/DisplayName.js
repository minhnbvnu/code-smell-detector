function DisplayName({
  displayName,
  id
}) {
  const {
    searchIndex,
    searchResults,
    searchText
  } = Object(react["useContext"])(TreeStateContext);
  const isSearchResult = Object(react["useMemo"])(() => {
    return searchResults.includes(id);
  }, [id, searchResults]);
  const isCurrentResult = searchIndex !== null && id === searchResults[searchIndex];

  if (!isSearchResult || displayName === null) {
    return displayName;
  }

  const match = createRegExp(searchText).exec(displayName);

  if (match === null) {
    return displayName;
  }

  const startIndex = match.index;
  const stopIndex = startIndex + match[0].length;
  const children = [];

  if (startIndex > 0) {
    children.push( /*#__PURE__*/react["createElement"]("span", {
      key: "begin"
    }, displayName.slice(0, startIndex)));
  }

  children.push( /*#__PURE__*/react["createElement"]("mark", {
    key: "middle",
    className: isCurrentResult ? Element_default.a.CurrentHighlight : Element_default.a.Highlight
  }, displayName.slice(startIndex, stopIndex)));

  if (stopIndex < displayName.length) {
    children.push( /*#__PURE__*/react["createElement"]("span", {
      key: "end"
    }, displayName.slice(stopIndex)));
  }

  return children;
}