function getConfigItems() {
  return new Promise(function (resolve) {
    if (false) {}
    csmInstance.get(defineProperty_default()({}, constants["T" /* TAB_LIST */], [{
      id: '0',
      name: 'Current',
      active: true
    }]), function (result) {
      resolve(result[constants["T" /* TAB_LIST */]]);
    });
  });
}