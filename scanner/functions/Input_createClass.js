function Input_createClass(Constructor, protoProps, staticProps) {
  if (protoProps) Input_defineProperties(Constructor.prototype, protoProps);
  if (staticProps) Input_defineProperties(Constructor, staticProps);
  return Constructor;
}