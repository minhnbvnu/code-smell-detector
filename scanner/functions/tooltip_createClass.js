function tooltip_createClass(Constructor, protoProps, staticProps) {
  if (protoProps) tooltip_defineProperties(Constructor.prototype, protoProps);
  if (staticProps) tooltip_defineProperties(Constructor, staticProps);
  return Constructor;
}