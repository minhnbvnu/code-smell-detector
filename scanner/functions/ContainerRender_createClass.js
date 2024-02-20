function ContainerRender_createClass(Constructor, protoProps, staticProps) {
  if (protoProps) ContainerRender_defineProperties(Constructor.prototype, protoProps);
  if (staticProps) ContainerRender_defineProperties(Constructor, staticProps);
  return Constructor;
}