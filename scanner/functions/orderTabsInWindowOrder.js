function orderTabsInWindowOrder() {
  var s = localStorage["order_tabs_in_window_order"];
  return s ? s === 'true' : false;
}