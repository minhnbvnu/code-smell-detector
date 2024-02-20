function toReactElement(element) {
  if (element.children.length === 0) {
    return React.createElement(element.type, element.props);
  }
  return React.createElement(
    element.type,
    element.props,
    element.children.map((child) =>
      typeof child === 'string' ? child : toReactElement(child),
    ),
  );
}