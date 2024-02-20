function Contexts_registerMenu(id, showFn, hideFn) {
  if (idToShowFnMap.has(id)) {
    throw Error(`Context menu with id "${id}" already registered.`);
  }

  idToShowFnMap.set(id, showFn);
  idToHideFnMap.set(id, hideFn);
  return function unregisterMenu() {
    idToShowFnMap.delete(id);
    idToHideFnMap.delete(id);
  };
}