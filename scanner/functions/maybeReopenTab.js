async function maybeReopenTab (url, tab, request) {
  const macAssigned = await getMACAssignment(url);
  if (macAssigned) {
    // We don't reopen MAC assigned urls
    return;
  }
  const cookieStoreId = await shouldContainInto(url, tab);
  if (!cookieStoreId) {
    // Tab doesn't need to be contained
    return;
  }

  if (request && shouldCancelEarly(tab, request)) {
    // We need to cancel early to prevent multiple reopenings
    return {cancel: true};
  }

  await browser.tabs.create({
    url,
    cookieStoreId,
    active: tab.active,
    index: tab.index,
    windowId: tab.windowId
  });
  browser.tabs.remove(tab.id);

  return {cancel: true};
}