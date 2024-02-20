function isDecoratorTarget(a) {
  return a[SYMBOL_DECORATORS] ? true : false;
}