function setConfigItems(items) {
  if (true) {
    return new Promise(function (resolve) {
      var _csmInstance$set2;
      csmInstance.set((_csmInstance$set2 = {}, defineProperty_default()(_csmInstance$set2, constants["T" /* TAB_LIST */], items.slice()), defineProperty_default()(_csmInstance$set2, constants["b" /* ACTIVE_KEYS */], items.map(function (item) {
        if (item.active) {
          return item.id;
        }
      })), _csmInstance$set2), resolve);
    });
  }
}