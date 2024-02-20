function moveOnPopupSwitchOnly() {
  let s = localStorage["move_on_popup_switch_only"];
  return s ? s === 'true' : true;
}