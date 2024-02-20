function getChildrenFromProps(props) {
  var children = props.children;
  if ( /*#__PURE__*/external_window_React_default.a.isValidElement(children)) {
    if (!children.key) {
      return /*#__PURE__*/external_window_React_default.a.cloneElement(children, {
        key: defaultKey
      });
    }
  }
  return children;
}