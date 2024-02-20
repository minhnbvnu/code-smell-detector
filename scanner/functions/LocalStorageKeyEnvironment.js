function LocalStorageKeyEnvironment(key) {
  this.key = key;
  var store = this.onStorage = this.onStorage.bind(this);
  var storage;

  try {
    storage = window.localStorage;
    storage.setItem(key, storage.getItem(key));
  } catch (e) {
    storage = null;
  }

  this.storage = storage || {
    data: {},
    getItem: function(itemKey) {return this.data[itemKey]; },
    setItem: function(itemKey, val) {
      this.data[itemKey] = val;
      clearTimeout(this.storeEvent);
      this.storeEvent = setTimeout(store, 1);
    }
  };

  Environment.call(this);
}