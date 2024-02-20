function button_createClass(Constructor, protoProps, staticProps) {
  if (protoProps) button_defineProperties(Constructor.prototype, protoProps);
  if (staticProps) button_defineProperties(Constructor, staticProps);
  return Constructor;
}