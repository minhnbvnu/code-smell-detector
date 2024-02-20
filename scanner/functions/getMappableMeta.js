function getMappableMeta(obj) {
  var meta = Ember.meta(obj, true),
      keyName = 'DS.Mappable',
      value = meta[keyName];

  if (!value) { meta[keyName] = {}; }

  if (!meta.hasOwnProperty(keyName)) {
    meta[keyName] = Ember.create(meta[keyName]);
  }

  return meta[keyName];
}