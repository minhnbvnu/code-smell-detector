function createComponent(component, props) {
  return sd.shallowRender(React.createElement(component, props));
}