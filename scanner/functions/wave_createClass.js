function wave_createClass(Constructor, protoProps, staticProps) {
  if (protoProps) wave_defineProperties(Constructor.prototype, protoProps);
  if (staticProps) wave_defineProperties(Constructor, staticProps);
  return Constructor;
}