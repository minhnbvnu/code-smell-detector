function translatePage(info, tab) {
  const targetLang = getSettings("targetLang");
  const encodedPageUrl = encodeURIComponent(info.pageUrl);
  const translationUrl = `https://translate.google.com/translate?hl=${targetLang}&tl=${targetLang}&sl=auto&u=${encodedPageUrl}`;
  const isCurrentTab = getSettings("pageTranslationOpenTo") === "currentTab";

  if (isCurrentTab) {
    browser.tabs.update(tab.id, {
      url: translationUrl
    });
  } else {
    browser.tabs.create({
      url: translationUrl,
      active: true,
      index: tab.index + 1
    });
  }
}