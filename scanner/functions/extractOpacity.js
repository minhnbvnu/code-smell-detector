function extractOpacity(props) {
  // TODO: visible === false should also have no hit detection
  if (props.visible === false) {
    return 0;
  }
  if (props.opacity == null) {
    return 1;
  }
  return +props.opacity;
}