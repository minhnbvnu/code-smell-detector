function Checkbox_createClass(Constructor, protoProps, staticProps) {
  if (protoProps) Checkbox_defineProperties(Constructor.prototype, protoProps);
  if (staticProps) Checkbox_defineProperties(Constructor, staticProps);
  return Constructor;
}