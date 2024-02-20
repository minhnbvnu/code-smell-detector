function mergeMixins(mixins, m, descs, values, base, keys) {
  var mixin, props, key, concats, mergings, meta;

  function removeKeys(keyName) {
    delete descs[keyName];
    delete values[keyName];
  }

  for(var i=0, l=mixins.length; i<l; i++) {
    mixin = mixins[i];
    Ember.assert('Expected hash or Mixin instance, got ' + Object.prototype.toString.call(mixin), typeof mixin === 'object' && mixin !== null && Object.prototype.toString.call(mixin) !== '[object Array]');

    props = mixinProperties(m, mixin);
    if (props === CONTINUE) { continue; }

    if (props) {
      meta = Ember.meta(base);
      if (base.willMergeMixin) { base.willMergeMixin(props); }
      concats = concatenatedMixinProperties('concatenatedProperties', props, values, base);
      mergings = concatenatedMixinProperties('mergedProperties', props, values, base);

      for (key in props) {
        if (!props.hasOwnProperty(key)) { continue; }
        keys.push(key);
        addNormalizedProperty(base, key, props[key], meta, descs, values, concats, mergings);
      }

      // manually copy toString() because some JS engines do not enumerate it
      if (props.hasOwnProperty('toString')) { base.toString = props.toString; }
    } else if (mixin.mixins) {
      mergeMixins(mixin.mixins, m, descs, values, base, keys);
      if (mixin._without) { a_forEach.call(mixin._without, removeKeys); }
    }
  }
}