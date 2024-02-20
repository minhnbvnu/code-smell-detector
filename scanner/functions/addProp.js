function addProp (el, name, value) {
  (el.props || (el.props = [])).push({ name: name, value: value });
}