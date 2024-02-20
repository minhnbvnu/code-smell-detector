function getDisabledCompatibleChildren(element) {
  var elementType = element.type;
  if ((elementType.__ANT_BUTTON === true || elementType.__ANT_SWITCH === true || elementType.__ANT_CHECKBOX === true || element.type === 'button') && element.props.disabled) {
    // Pick some layout related style properties up to span
    // Prevent layout bugs like https://github.com/ant-design/ant-design/issues/5254
    var _splitObject = splitObject(element.props.style, ['position', 'left', 'right', 'top', 'bottom', 'float', 'display', 'zIndex']),
      picked = _splitObject.picked,
      omitted = _splitObject.omitted;
    var spanStyle = tooltip_extends(tooltip_extends({
      display: 'inline-block'
    }, picked), {
      cursor: 'not-allowed',
      width: element.props.block ? '100%' : null
    });
    var buttonStyle = tooltip_extends(tooltip_extends({}, omitted), {
      pointerEvents: 'none'
    });
    var child = /*#__PURE__*/external_window_React_["cloneElement"](element, {
      style: buttonStyle,
      className: null
    });
    return /*#__PURE__*/external_window_React_["createElement"]("span", {
      style: spanStyle,
      className: element.props.className
    }, child);
  }
  return element;
}