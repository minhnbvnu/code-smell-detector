function disableCoordinateWarning(disable) {
  const hide = disable === undefined ? true : disable;
  showCoordinateWarning = !hide;
}