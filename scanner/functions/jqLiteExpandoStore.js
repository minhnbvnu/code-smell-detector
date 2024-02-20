function jqLiteExpandoStore(element, createIfNecessary) {
  var expandoId = element.ng339,
      expandoStore = expandoId && jqCache[expandoId];

  if (createIfNecessary && !expandoStore) {
    element.ng339 = expandoId = jqNextId();
    expandoStore = jqCache[expandoId] = {events: {}, data: {}, handle: undefined};
  }

  return expandoStore;
}