function tabImage(tab) {
  if (tab.audible) {
    return "/assets/noisy.png"
  } else if (tab.favIconUrl && (startsWith(tab.favIconUrl, "data:") || /^https?:\/\/.*/.exec(tab.favIconUrl))) {
    // if the favicon is a valid URL or embedded data return that
    return tab.favIconUrl;
  } else if (/^chrome:\/\/extensions\/.*/.exec(tab.url)) {
    return "/assets/chrome-extensions-icon.png";
  } else {
    return "/assets/blank.png"
  }
}