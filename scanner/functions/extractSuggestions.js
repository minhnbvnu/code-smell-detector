function extractSuggestions (xml) {
  const toJSON = (item) => ({
    term: item.string[0]
  });

  const list = xml.plist.dict[0].array[0].dict || [];
  return list.map(toJSON);
}