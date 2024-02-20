function clickInGutter(cm, e) {
  return gutterEvent(cm, e, "gutterClick", true)
}