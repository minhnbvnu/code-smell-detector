function createMenus() {
  const isValidContextsTypeTab = browserInfo().name === "Firefox" && browserInfo().version >= 53;
  if (isValidContextsTypeTab) {
    browser.contextMenus.create({
      id: "translatePageOnTab",
      title: browser.i18n.getMessage("translatePageMenu"),
      contexts: ["tab"]
    });
  }

  browser.contextMenus.create({
    id: "translatePage",
    title: browser.i18n.getMessage("translatePageMenu"),
    contexts: ["all"],
    visible: true
  });

  browser.contextMenus.create({
    id: "translateText",
    title: browser.i18n.getMessage("translateTextMenu"),
    contexts: ["selection"]
  });

  browser.contextMenus.create({
    id: "translateLink",
    title: browser.i18n.getMessage("translateLinkMenu"),
    contexts: ["link"]
  });
}