function Portal_createClass(Constructor, protoProps, staticProps) {
  if (protoProps) Portal_defineProperties(Constructor.prototype, protoProps);
  if (staticProps) Portal_defineProperties(Constructor, staticProps);
  return Constructor;
}