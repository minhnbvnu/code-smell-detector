function needs_text_box_for_paste_event() {
  // I know this is bad, but I don't know a better way to check this
  return navigator.userAgent.indexOf('Firefox') !== -1;
}