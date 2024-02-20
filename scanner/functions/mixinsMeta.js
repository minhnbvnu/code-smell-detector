function mixinsMeta(obj) {
  var m = Ember.meta(obj, true), ret = m.mixins;
  if (!ret) {
    ret = m.mixins = {};
  } else if (!m.hasOwnProperty('mixins')) {
    ret = m.mixins = o_create(ret);
  }
  return ret;
}