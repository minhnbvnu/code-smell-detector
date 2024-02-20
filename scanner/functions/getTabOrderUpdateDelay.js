function getTabOrderUpdateDelay() {
  let s = localStorage["tab_order_update_delay"];
  if(s === "0") {
    return 0;
  }
  return s ? parseInt(s, 10) || 1500 : 1500;
}