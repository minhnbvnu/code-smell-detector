function closeMapWindow() {
  if (mapWindow) {
    mapWindow.close();
    mapWindow = undefined;
  }
}