function Group_createClass(Constructor, protoProps, staticProps) {
  if (protoProps) Group_defineProperties(Constructor.prototype, protoProps);
  if (staticProps) Group_defineProperties(Constructor, staticProps);
  return Constructor;
}