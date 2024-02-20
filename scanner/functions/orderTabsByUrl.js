function orderTabsByUrl() {
  var s = localStorage["order_tabs_by_url"];
  return s ? s === 'true' : false;
}