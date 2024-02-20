function getButtons(div) {
  return Array.prototype.slice.call(div.getElementsByClassName('mapbox-gl-draw_ctrl-draw-btn'));
}