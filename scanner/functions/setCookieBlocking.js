function setCookieBlocking(enabledSites) {
  let urlFilters = [];

  for (let item in BLOCKLIST) {
    let cookie = BLOCKLIST[item].cookieBlocking;
    if (cookie == undefined)
      continue;
    if (enabledSites && enabledSites[item] == false)
      continue;

    if (cookie.blockAll) {
      urlFilters.push(cookie.urlFilter);
    }
    else {
      let callback = makeCookieRemove(cookie.cookie);
      callbacksOnBeforeRequestCookie.push(callback);
      chrome.webRequest.onBeforeRequest.addListener(
        callback,
        {
          urls: [cookie.urlFilter],
          types: ['xmlhttprequest', 'script', 'main_frame']
        }
      );
    }
  }


  chrome.webRequest.onHeadersReceived.addListener(
    onHeadersReceivedCookie,
    {
      urls: urlFilters,
      types: ['xmlhttprequest', 'script', 'main_frame']
    },
    ['blocking', 'responseHeaders']
  );

  chrome.webRequest.onBeforeSendHeaders.addListener(
    onBeforeSendHeadersCookie,
    {
      urls: urlFilters,
      types: ['xmlhttprequest', 'script', 'main_frame']
    },
    ['blocking', 'requestHeaders']
  );
}