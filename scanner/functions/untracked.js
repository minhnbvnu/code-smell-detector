function untracked(action) {
  var prev = untrackedStart();
  var res = action();
  untrackedEnd(prev);
  return res;
}