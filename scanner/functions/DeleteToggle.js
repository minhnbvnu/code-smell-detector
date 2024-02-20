function DeleteToggle({
  deletePath,
  name,
  path
}) {
  // $FlowFixMe[missing-local-annot]
  const handleClick = event => {
    event.stopPropagation();
    deletePath(path);
  };

  return /*#__PURE__*/react["createElement"](react["Fragment"], null, /*#__PURE__*/react["createElement"](Button_Button, {
    className: KeyValue_default.a.DeleteArrayItemButton,
    onClick: handleClick,
    title: "Delete entry"
  }, /*#__PURE__*/react["createElement"](ButtonIcon_ButtonIcon, {
    type: "delete"
  })), /*#__PURE__*/react["createElement"]("span", {
    className: KeyValue_default.a.Name
  }, name));
}