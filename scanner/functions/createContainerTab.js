async function createContainerTab(color) {
    const identity = await getOrCreateIdentity(color)
    const { cookieStoreId } = identity
    return browser.tabs.create({ cookieStoreId })
}