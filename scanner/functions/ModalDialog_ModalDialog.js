function ModalDialog_ModalDialog(_) {
  const {
    dialogs,
    dispatch
  } = Object(react["useContext"])(ModalDialogContext);

  if (dialogs.length === 0) {
    return null;
  }

  return /*#__PURE__*/react["createElement"]("div", {
    className: ModalDialog_default.a.Background
  }, dialogs.map(dialog => /*#__PURE__*/react["createElement"](ModalDialogImpl, {
    key: dialog.id,
    canBeDismissed: dialog.canBeDismissed,
    content: dialog.content,
    dispatch: dispatch,
    id: dialog.id,
    title: dialog.title
  })));
}