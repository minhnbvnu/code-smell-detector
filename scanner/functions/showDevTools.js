function showDevTools() {
  var s = localStorage["include_dev_tools"];
  return s ? s === 'true' : false;
}