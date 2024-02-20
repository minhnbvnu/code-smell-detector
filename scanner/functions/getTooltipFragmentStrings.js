function getTooltipFragmentStrings(socialAction) {
  switch (socialAction) {
  case "login":
    return browser.i18n.getMessage("inPageUI-tooltip-button-login");
  case "share":
    return browser.i18n.getMessage("inPageUI-tooltip-button-share");
  case "share-passive":
    return browser.i18n.getMessage("inPageUI-tooltip-button-share-passive");
  case "email":
    return browser.i18n.getMessage("inPageUI-tooltip-button-email");
  }
}