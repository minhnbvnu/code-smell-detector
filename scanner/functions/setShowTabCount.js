function setShowTabCount(val) {
  localStorage["show_tab_count"] = val;
  updateBadgeText();
}