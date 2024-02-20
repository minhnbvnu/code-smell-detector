function setupWebRequestListeners() {
  browser.webRequest.onCompleted.addListener((options) => {
    if (canceledRequests[options.tabId]) {
      delete canceledRequests[options.tabId];
    }
  },{urls: ["<all_urls>"], types: ["main_frame"]});
  browser.webRequest.onErrorOccurred.addListener((options) => {
    if (canceledRequests[options.tabId]) {
      delete canceledRequests[options.tabId];
    }
  },{urls: ["<all_urls>"], types: ["main_frame"]});

  // Add the main_frame request listener
  browser.webRequest.onBeforeRequest.addListener(containFacebook, {urls: ["<all_urls>"], types: ["main_frame"]}, ["blocking"]);

  // Add the sub-resource request listener
  browser.webRequest.onBeforeRequest.addListener(blockFacebookSubResources, {urls: ["<all_urls>"]}, ["blocking"]);
}