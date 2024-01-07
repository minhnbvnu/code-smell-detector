function findDOMNode(target) {
  const {needsReactDOM} = reactPaths();

  if (needsReactDOM) {
    return ReactDOM.findDOMNode(target);
  } else {
    // eslint-disable-next-line
    return React.findDOMNode(target);
  }
}