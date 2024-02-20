function findNamespaces() {
  var Namespace = Ember.Namespace, lookup = Ember.lookup, obj, isNamespace;

  if (Namespace.PROCESSED) { return; }

  for (var prop in lookup) {
    // These don't raise exceptions but can cause warnings
    if (prop === "parent" || prop === "top" || prop === "frameElement" || prop === "webkitStorageInfo") { continue; }

    //  get(window.globalStorage, 'isNamespace') would try to read the storage for domain isNamespace and cause exception in Firefox.
    // globalStorage is a storage obsoleted by the WhatWG storage specification. See https://developer.mozilla.org/en/DOM/Storage#globalStorage
    if (prop === "globalStorage" && lookup.StorageList && lookup.globalStorage instanceof lookup.StorageList) { continue; }
    // Unfortunately, some versions of IE don't support window.hasOwnProperty
    if (lookup.hasOwnProperty && !lookup.hasOwnProperty(prop)) { continue; }

    // At times we are not allowed to access certain properties for security reasons.
    // There are also times where even if we can access them, we are not allowed to access their properties.
    try {
      obj = Ember.lookup[prop];
      isNamespace = obj && obj.isNamespace;
    } catch (e) {
      continue;
    }

    if (isNamespace) {
      Ember.deprecate("Namespaces should not begin with lowercase.", /^[A-Z]/.test(prop));
      obj[NAME_KEY] = prop;
    }
  }
}