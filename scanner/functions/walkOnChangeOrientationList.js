function walkOnChangeOrientationList(newOrientation) {
  for (var index in changeOrientationList) {
    changeOrientationList[index](newOrientation);
  }
}