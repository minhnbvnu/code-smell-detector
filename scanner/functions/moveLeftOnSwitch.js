function moveLeftOnSwitch() {
  var s = localStorage["move_left_on_switch"];
  return s ? s === 'true' : false;
}