function ModalDialogImpl({
  canBeDismissed,
  content,
  dispatch,
  id,
  title
}) {
  const dismissModal = Object(react["useCallback"])(() => {
    if (canBeDismissed) {
      dispatch({
        type: 'HIDE',
        id
      });
    }
  }, [canBeDismissed, dispatch]);
  const dialogRef = Object(react["useRef"])(null); // It's important to trap click events within the dialog,
  // so the dismiss hook will use it for click hit detection.
  // Because multiple tabs may be showing this ModalDialog,
  // the normal `dialog.contains(target)` check would fail on a background tab.

  useModalDismissSignal(dialogRef, dismissModal, false); // Clicks on the dialog should not bubble.
  // This way we can dismiss by listening to clicks on the background.

  const handleDialogClick = event => {
    event.stopPropagation(); // It is important that we don't also prevent default,
    // or clicks within the dialog (e.g. on links) won't work.
  };

  return /*#__PURE__*/react["createElement"]("div", {
    ref: dialogRef,
    className: ModalDialog_default.a.Dialog,
    onClick: handleDialogClick
  }, title !== null && /*#__PURE__*/react["createElement"]("div", {
    className: ModalDialog_default.a.Title
  }, title), content, canBeDismissed && /*#__PURE__*/react["createElement"]("div", {
    className: ModalDialog_default.a.Buttons
  }, /*#__PURE__*/react["createElement"](Button_Button, {
    autoFocus: true,
    className: ModalDialog_default.a.Button,
    onClick: dismissModal
  }, "Okay")));
}