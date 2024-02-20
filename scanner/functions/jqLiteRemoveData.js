function jqLiteRemoveData(element, name) {
  var expandoId = element.ng339;
  var expandoStore = expandoId && jqCache[expandoId];

  if (expandoStore) {
    if (name) {
      delete expandoStore.data[name];
      return;
    }

    if (expandoStore.handle) {
      if (expandoStore.events.$destroy) {
        expandoStore.handle({}, '$destroy');
      }
      jqLiteOff(element);
    }
    delete jqCache[expandoId];
    element.ng339 = undefined; // don't delete DOM expandos. IE and Chrome don't like it
  }
}