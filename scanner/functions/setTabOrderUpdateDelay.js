function setTabOrderUpdateDelay(val) {
  localStorage["tab_order_update_delay"] = val;
  resizeClosedTabs();
}