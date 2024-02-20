function loadState(ev) {
  if (ev) {
    // Edge doesn't replace change history.state on popstate.
    history.replaceState(ev.state, document.title);
  }
  if (history.state) {
    split_left.scrollTop = history.state.left_top;
    split_right.scrollTop = history.state.right_top;
  }
}