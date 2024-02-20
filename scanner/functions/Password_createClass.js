function Password_createClass(Constructor, protoProps, staticProps) {
  if (protoProps) Password_defineProperties(Constructor.prototype, protoProps);
  if (staticProps) Password_defineProperties(Constructor, staticProps);
  return Constructor;
}