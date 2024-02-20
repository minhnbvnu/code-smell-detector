function setNewTabKey(key) {
  key.key = 'return'; // always use return to trigger this =)
  return setKeyCombo("new_tab_popup", key);
}