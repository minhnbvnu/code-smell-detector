function closeWindow() {
  if (autoClose) {
    /**
     * unbind document events before closing the popup window, see issue
     * Chrome shortcuts do not work immediately after using quicktabs #95
     */
    log("Unbinding document event handlers.");
    $(document).unbind(); // do both unbind and off, just to be sure.
    $(document).off();
    window.close();
  } else {
    log("Window close prevented by autoClose setting.");
  }
  return false;
}