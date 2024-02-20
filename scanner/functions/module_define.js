function module_define() {
  const v = new Variable(TYPE_NORMAL, this);
  return v.define.apply(v, arguments);
}