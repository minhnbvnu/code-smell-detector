function bypassPaywalls(details) {

  root = extractRootWebsite(details.url)
  rootSearch = "*://*." + root + "/*"

  if(!(rootSearch in paywallBlacklistDict)) {
    paywallEnabled = false;
    //Reenable Cookies
    chrome.contentSettings.cookies.set({
      'primaryPattern': rootSearch,
      'setting': 'allow'
    });
    return;
  }

  paywallEnabled = true;
  //Redirect Referer
  if (!(rootSearch in paywallSMWhitelistDict)) {
    details.requestHeaders = details.requestHeaders.filter(function(header) {
      if(header.name === "Referer")
        return false
      return true
    })
    details.requestHeaders.push({
      "name": "Referer",
      "value": "https://t.co/"
    })
    console.log("Changed Header to Twitter")
  }
  
  //Set Cookie Permission as necessary
  if (!(rootSearch in paywallCookieWhitelistDict)) {
    chrome.contentSettings.cookies.set({
      'primaryPattern': rootSearch,
      'setting': 'block'
    });
    console.log("Blocked Cookies")
  }
  else {
    //Reenable Cookies
    chrome.contentSettings.cookies.set({
      'primaryPattern': rootSearch,
      'setting': 'allow'
    });
    console.log("Enabled Cookies")
  }
  
  if (!(rootSearch in paywallSpoofWhitelistDict)) {
    //Spoof our device as a Google Crawler
    details.requestHeaders = details.requestHeaders.filter(function(header) {
      if(header.name === "User-Agent" || header.name === "X-Forwarded-For") {
        return false
      }
      return true
    })
    var google_adbot_UA = "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Chrome/W.X.Y.Z‡ Safari/537.36"
    details.requestHeaders.push({
      "name": "User-Agent",
      "value": google_adbot_UA
    })
    details.requestHeaders.push({
      "name": "X-Forwarded-For",
      "value": "66.249.66.1"
    })
    console.log("Spoofed as google crawler")
  }
  
  return {requestHeaders: details.requestHeaders};
}