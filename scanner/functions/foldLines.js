function foldLines(cm, start, end, autoClear) {
  return cm.markText(Pos(start, 0), Pos(end - 1), {
    inclusiveLeft: true,
    inclusiveRight: true,
    collapsed: true,
    clearOnEnter: autoClear
  });
}