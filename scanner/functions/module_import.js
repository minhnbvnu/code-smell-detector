function module_import() {
  const v = new Variable(TYPE_NORMAL, this);
  return v.import.apply(v, arguments);
}