function classToString() {
  if (!Ember.BOOTED && !this[NAME_KEY]) {
    processAllNamespaces();
  }

  var ret;

  if (this[NAME_KEY]) {
    ret = this[NAME_KEY];
  } else if (this._toString) {
    ret = this._toString; 
  } else {
    var str = superClassString(this);
    if (str) {
      ret = "(subclass of " + str + ")";
    } else {
      ret = "(unknown mixin)";
    }
    this.toString = makeToString(ret);
  }

  return ret;
}