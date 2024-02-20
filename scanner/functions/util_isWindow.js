function util_isWindow(obj) {
  return obj && typeof_default()(obj) === 'object' && obj.window === obj;
}