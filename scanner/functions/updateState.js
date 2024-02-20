function updateState() {
  history.replaceState(
    {
      left_top: split_left.scrollTop,
      right_top: split_right.scrollTop
    },
    document.title
  );
}