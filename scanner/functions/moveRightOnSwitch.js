function moveRightOnSwitch() {
  // IMPORTANT: "move_on_switch" is a legacy name, do not change
  var s = localStorage["move_on_switch"];
  return s ? s === 'true' : false;
}