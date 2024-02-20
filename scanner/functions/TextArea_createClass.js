function TextArea_createClass(Constructor, protoProps, staticProps) {
  if (protoProps) TextArea_defineProperties(Constructor.prototype, protoProps);
  if (staticProps) TextArea_defineProperties(Constructor, staticProps);
  return Constructor;
}