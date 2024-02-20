function getSnippetArray (mapToSnippetArray, indentation, sanitize) {
  mapToSnippetArray = groupHeadersSameKey(mapToSnippetArray);
  let mappedArray = mapToSnippetArray.map((entry) => {
    return `${indentation}"${sanitize ? sanitizeString(entry.key, true) : entry.key}" = ` +
    `${sanitize ? '"' + sanitizeString(entry.value) + '"' : entry.value}`;
  });
  return `c(\n${mappedArray.join(',\n')}\n)`;
}