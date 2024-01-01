function isComponentMixedIn (name, mixinEls) {
  var i;
  var inMixin = false;
  for (i = 0; i < mixinEls.length; ++i) {
    inMixin = mixinEls[i].hasAttribute(name);
    if (inMixin) { break; }
  }
  return inMixin;
}