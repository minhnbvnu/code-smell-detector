function openTabForSearch(searchString) {

  let url = searchStringAsUrl(searchString);

  if (/^(http|https|ftp):\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(:[a-zA-Z0-9]*)?\/?([a-zA-Z0-9\-\._\?,'/\\\+&amp;%$#=~])*$/.exec(url)) {
    log("no tab selected, search string looks like a url, opening in new tab", searchString, url);
    chrome.tabs.create({url: url});
  } else {
    log("no tab selected, passing search string to search engine", searchString, url);
    //url = "http://www.google.com/search?q=" + encodeURI($("input[type=text]").val());
    let searchUrl = bg.getSearchString().replace(/%s/g, encodeURI(searchString));
    chrome.tabs.create({url: searchUrl});
  }
}