async function updateBrowserActionIcon (tab) {

  browser.browserAction.setBadgeText({text: ""});

  const url = tab.url;
  const hasBeenAddedToFacebookContainer = await isAddedToFacebookContainer(url);
  const aboutPageURLCheck = url.startsWith("about:");

  if (isFacebookURL(url)) {
    // TODO: change panel logic from browser.storage to browser.runtime.onMessage
    // so the panel.js can "ask" background.js which panel it should show
    browser.storage.local.set({"CURRENT_PANEL": "on-facebook"});
    browser.browserAction.setPopup({tabId: tab.id, popup: "./panel.html"});
  } else if (hasBeenAddedToFacebookContainer) {
    browser.storage.local.set({"CURRENT_PANEL": "in-fbc"});
  } else if (aboutPageURLCheck) {
    // Sets CURRENT_PANEL if current URL is an internal about: page
    browser.storage.local.set({"CURRENT_PANEL": "about"});
  } else {
    const tabState = tabStates[tab.id];
    const panelToShow = (tabState && tabState.trackersDetected) ? "trackers-detected" : "no-trackers";
    browser.storage.local.set({"CURRENT_PANEL": panelToShow});
    browser.browserAction.setPopup({tabId: tab.id, popup: "./panel.html"});
    browser.browserAction.setBadgeBackgroundColor({color: "#6200A4"});
    if ( panelToShow === "trackers-detected" ) {
      browser.browserAction.setBadgeText({text: "!"});
    }
  }
}