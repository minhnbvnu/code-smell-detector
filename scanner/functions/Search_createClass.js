function Search_createClass(Constructor, protoProps, staticProps) {
  if (protoProps) Search_defineProperties(Constructor.prototype, protoProps);
  if (staticProps) Search_defineProperties(Constructor, staticProps);
  return Constructor;
}