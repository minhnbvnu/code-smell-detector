function removeUnusedItems() {
  var _csmInstance$get7;
  csmInstance.get((_csmInstance$get7 = {}, defineProperty_default()(_csmInstance$get7, constants["y" /* JSONC_CONFIG */], {}), defineProperty_default()(_csmInstance$get7, constants["z" /* JSON_CONFIG */], {}), defineProperty_default()(_csmInstance$get7, constants["T" /* TAB_LIST */], [{
    id: '0',
    name: 'Current',
    active: true
  }]), _csmInstance$get7), function (result) {
    var _stash2;
    var stash = (_stash2 = {}, defineProperty_default()(_stash2, constants["y" /* JSONC_CONFIG */], {}), defineProperty_default()(_stash2, constants["z" /* JSON_CONFIG */], {}), _stash2);
    result[constants["T" /* TAB_LIST */]].forEach(function (tab) {
      stash[constants["y" /* JSONC_CONFIG */]][tab.id] = result[constants["y" /* JSONC_CONFIG */]][tab.id];
      stash[constants["z" /* JSON_CONFIG */]][tab.id] = result[constants["z" /* JSON_CONFIG */]][tab.id];
    });
    csmInstance.set(stash, function () {});
  });
}