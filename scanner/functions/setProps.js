function setProps($target, props) {
  Object.keys(props).forEach(name => {
    setProp($target, name, props[name]);
  });
}