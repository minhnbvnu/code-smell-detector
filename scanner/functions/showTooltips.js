function showTooltips() {
  var s = localStorage["show_tooltips"];
  return s ? s === 'true' : true;
}