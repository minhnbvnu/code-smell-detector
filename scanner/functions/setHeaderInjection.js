function setHeaderInjection(enabledSites) {
  for (let item in BLOCKLIST) {
    let header = BLOCKLIST[item].headerInjection;
    if (header == undefined)
      continue;
    if (enabledSites && enabledSites[item] == false)
      continue;

    let callback = makeInjectHeader(header.name, header.value);
    callbacksOnBeforeSendHeadersInjection.push(callback);
    chrome.webRequest.onBeforeSendHeaders.addListener(
      callback,
      {
        urls: [
          header.urlFilter
        ],
        types: ['xmlhttprequest', 'main_frame']
      },
      ['blocking', 'requestHeaders']
    );
  }
}