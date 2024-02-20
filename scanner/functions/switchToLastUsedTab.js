async function switchToLastUsedTab() {
  const [lastTab, currentTab] = usedTabInfoQueue
  if (!lastTab) return

  if (lastTab.windowId !== currentTab.windowId) {
    /**
     * Call windows.update will trigger 'onFocusChanged' event.
     * Then the listener above will manage usedTabInfoQueue.
     */
    await browser.windows.update(lastTab.windowId, {focused: true})
  } else {
    /**
     * Call tabs.update will trigger 'onActivated' event.
     * Then the listener above will manage usedTabInfoQueue.
     */
    await browser.tabs.update(lastTab.tabId, {active: true})
  }
}