function popconfirm_createClass(Constructor, protoProps, staticProps) {
  if (protoProps) popconfirm_defineProperties(Constructor.prototype, protoProps);
  if (staticProps) popconfirm_defineProperties(Constructor, staticProps);
  return Constructor;
}