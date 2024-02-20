function showUrls() {
  var s = localStorage["show_urls"];
  return s ? s === 'true' : true;
}