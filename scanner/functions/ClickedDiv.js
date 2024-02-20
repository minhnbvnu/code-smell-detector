function ClickedDiv(props) {
  const [clicked, setClicked] = Object(react["useState"])(false);

  function handleMouseDown(e) {
    setClicked(true);

    if (props.onMouseDown) {
      props.onMouseDown(e);
    }
  }

  return /*#__PURE__*/Object(jsx_runtime["jsx"])("div", ClickedDiv_objectSpread(ClickedDiv_objectSpread({}, props), {}, {
    className: classnames_default()(props.className, {
      clicked
    }),
    onMouseDown: handleMouseDown
  }));
}