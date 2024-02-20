function unwrapProxy(o) {
  return isProxy(o) ? unwrapProxy(get(o, 'content')) : o;
}