function switch_createClass(Constructor, protoProps, staticProps) {
  if (protoProps) switch_defineProperties(Constructor.prototype, protoProps);
  if (staticProps) switch_defineProperties(Constructor, staticProps);
  return Constructor;
}