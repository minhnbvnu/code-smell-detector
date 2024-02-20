function setXhrBlocking(enabledSites) {
  let blocklist = [];

  for (let item in BLOCKLIST) {
    let xhr = BLOCKLIST[item].xhrBlocking;
    if (xhr == undefined)
      continue;
    if (enabledSites && enabledSites[item] == false)
      continue;
    blocklist = blocklist.concat(xhr);
  }

  for (let item in WHITELIST) {
    if (enabledSites && enabledSites[item] == false)
      continue;
    let xhr = WHITELIST[item].xhrBlocking;
    if (xhr == undefined)
      continue;
    whitelist = whitelist.concat(xhr);
  }

  chrome.webRequest.onBeforeRequest.addListener(
    onBeforeRequestXml,
    {
      urls: blocklist,
      types: ['xmlhttprequest']
    },
    ['blocking']
  );
}