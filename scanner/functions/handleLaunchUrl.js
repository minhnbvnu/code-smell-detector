function handleLaunchUrl(url) {
  const p = `ec-${appId}`;
  console.log(`custom url: ${url}`)
  var insecure = url.replace(p, 'http');
  var secure = url.replace(p, 'https');
  Object.keys(manifest.url_handlers).forEach(function(key) {
    console.log(key);
    var entry = manifest.url_handlers[key];
    entry.matches.forEach(function(match) {
      var matchUrl;
      if (secure.match(match))
        matchUrl = secure;
      else if (insecure.match(match))
        matchUrl = insecure;

      if (matchUrl) {
        chrome.app.runtime.onLaunched.invokeListeners(null, [{
          id: key,
          isKioskSession: false,
          isPublicSession: false,
          source: "url_handler",
          url: matchUrl
        }]);
      }
    })
  })
  console.log('custom url', url);
}