function showFavicons() {
  var s = localStorage["show_favicons"];
  return s ? s === 'true' : true;
}