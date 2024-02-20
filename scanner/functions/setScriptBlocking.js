function setScriptBlocking(enabledSites) {
  let urlFilters = [];

  for (let item in BLOCKLIST) {
    let script = BLOCKLIST[item].scriptBlocking;
    if (enabledSites && enabledSites[item] == false)
      continue;
    if (script == undefined)
      continue;
    urlFilters = urlFilters.concat(script);
  }

  chrome.webRequest.onBeforeRequest.addListener(
    onBeforeRequestScript,
    {
      urls: urlFilters,
      types: ['script']
    },
    ['blocking']
  );
}