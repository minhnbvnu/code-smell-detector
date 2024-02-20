function openLink(url) {
  var isInner = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  chrome.tabs.create({
    url: isInner ? chrome.extension.getURL(url) : url
  }, function (tab) {
    // Tab opened.
  });
}