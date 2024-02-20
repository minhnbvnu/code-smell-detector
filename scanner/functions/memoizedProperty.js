function memoizedProperty(obj, name) {
  if (!obj.constructor.prototype[name]) {
    util.memoizedProperty.apply(this, arguments);
  }
}