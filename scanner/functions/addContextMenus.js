async function addContextMenus(contextMenuType = 1) {
  // 添加前先删除,避免重复ID的错误
  try {
    await browser.contextMenus.removeAll();
  } catch (err) {
    //
  }

  switch (contextMenuType) {
    case 1:
      browser.contextMenus.create({
        id: CMD_TOGGLE_TRANSLATE,
        title: browser.i18n.getMessage("toggle_translate"),
        contexts: ["page", "selection"],
      });
      break;
    case 2:
      browser.contextMenus.create({
        id: CMD_TOGGLE_TRANSLATE,
        title: browser.i18n.getMessage("toggle_translate"),
        contexts: ["page", "selection"],
      });
      browser.contextMenus.create({
        id: CMD_TOGGLE_STYLE,
        title: browser.i18n.getMessage("toggle_style"),
        contexts: ["page", "selection"],
      });
      browser.contextMenus.create({
        id: CMD_OPEN_TRANBOX,
        title: browser.i18n.getMessage("open_tranbox"),
        contexts: ["page", "selection"],
      });
      browser.contextMenus.create({
        id: "options_separator",
        type: "separator",
        contexts: ["page", "selection"],
      });
      browser.contextMenus.create({
        id: CMD_OPEN_OPTIONS,
        title: browser.i18n.getMessage("open_options"),
        contexts: ["page", "selection"],
      });
      break;
    default:
  }
}