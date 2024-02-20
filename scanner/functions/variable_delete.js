function variable_delete() {
  return variable_defineImpl.call(this, null, [], noop);
}