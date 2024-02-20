function searchUrls() {
  var s = localStorage["search_urls"];
  return s ? s === 'true' : false;
}