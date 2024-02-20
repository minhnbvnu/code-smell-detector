async function blockFacebookSubResources (requestDetails) {
  if (requestDetails.type === "main_frame") {
    tabStates[requestDetails.tabId] = { trackersDetected: false };
    return {};
  }

  if (typeof requestDetails.originUrl === "undefined") {
    return {};
  }

  const urlIsFacebook = isFacebookURL(requestDetails.url);
  // If this request isn't going to Facebook, let's return {} ASAP
  if (!urlIsFacebook) {
    return {};
  }

  const originUrlIsFacebook = isFacebookURL(requestDetails.originUrl);

  if (originUrlIsFacebook) {
    const message = {msg: "facebook-domain"};
    // Send the message to the content_script
    browser.tabs.sendMessage(requestDetails.tabId, message);
    return {};
  }

  const frameAncestorUrlIsFacebookApps = topFrameUrlIsFacebookApps(requestDetails.frameAncestors);

  if (frameAncestorUrlIsFacebookApps) {
    const message = {msg: "facebook-domain"};
    // Send the message to the content_script
    browser.tabs.sendMessage(requestDetails.tabId, message);
    return {};
  }

  const hasBeenAddedToFacebookContainer = await isAddedToFacebookContainer(requestDetails.originUrl);

  if ( urlIsFacebook && !originUrlIsFacebook ) {
    if (!hasBeenAddedToFacebookContainer ) {
      const message = {msg: "blocked-facebook-subresources"};
      // Send the message to the content_script
      browser.tabs.sendMessage(requestDetails.tabId, message);

      tabStates[requestDetails.tabId] = { trackersDetected: true };
      return {cancel: true};
    } else {
      const message = {msg: "allowed-facebook-subresources"};
      // Send the message to the content_script
      browser.tabs.sendMessage(requestDetails.tabId, message);
      return {};
    }
  }
  return {};
}