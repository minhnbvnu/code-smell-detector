function checkAndSyncHistorialSyncStorageDataToLocal() {
  var _historyStorageKeyOrO;
  var historyStorageKeyOrObj = (_historyStorageKeyOrO = {}, defineProperty_default()(_historyStorageKeyOrO, constants["y" /* JSONC_CONFIG */], {
    0: ''
  }), defineProperty_default()(_historyStorageKeyOrO, constants["z" /* JSON_CONFIG */], {}), defineProperty_default()(_historyStorageKeyOrO, constants["T" /* TAB_LIST */], [{
    id: '0',
    name: 'Current',
    active: true
  }]), defineProperty_default()(_historyStorageKeyOrO, constants["b" /* ACTIVE_KEYS */], ['0']), _historyStorageKeyOrO);
  var migaratedFlag = defineProperty_default()({}, constants["S" /* SYNC_STORAGE_DATA_HAS_BEEN_MIGARATED_TO_LOCAL */], {
    migarated: false
  });
  // Code below is only for migaration testing
  // 
  // csmInstance.set({
  //   [SYNC_STORAGE_DATA_HAS_BEEN_MIGARATED_TO_LOCAL]: {
  //     migarated: false,
  //   },
  // });
  csmInstance.get(migaratedFlag, function (result) {
    if (!result[constants["S" /* SYNC_STORAGE_DATA_HAS_BEEN_MIGARATED_TO_LOCAL */]].migarated) {
      chrome.storage.sync.get(historyStorageKeyOrObj, function (hisData) {
        var _stash;
        var stash = (_stash = {}, defineProperty_default()(_stash, constants["y" /* JSONC_CONFIG */], {}), defineProperty_default()(_stash, constants["z" /* JSON_CONFIG */], {}), _stash);
        hisData[constants["T" /* TAB_LIST */]].forEach(function (tab) {
          stash[constants["y" /* JSONC_CONFIG */]][tab.id] = hisData[constants["y" /* JSONC_CONFIG */]][tab.id];
          stash[constants["z" /* JSON_CONFIG */]][tab.id] = hisData[constants["z" /* JSON_CONFIG */]][tab.id];
        });
        csmInstance.set(_objectSpread(_objectSpread(defineProperty_default()({}, constants["S" /* SYNC_STORAGE_DATA_HAS_BEEN_MIGARATED_TO_LOCAL */], {
          migarated: true
        }), hisData), stash));
      });
    } else {
      console.log('SYNC_STORAGE_DATA_HAS_BEEN_MIGARATED_TO_LOCAL');
    }
  });
}