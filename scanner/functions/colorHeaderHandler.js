async function colorHeaderHandler(e) {
    if (e.tabId < 0) return

    const colorMap = {
        blue: "blue",
        turquoise: "cyan",
        green: "green",
        yellow: "yellow",
        orange: "orange",
        red: "red",
        pink: "pink",
        purple: "magenta",
    }
    const { cookieStoreId } = await browser.tabs.get(e.tabId)
    if (cookieStoreId === "firefox-default") {
        return {}
    }
    const identity = await browser.contextualIdentities.get(cookieStoreId)
    if (identity.name.startsWith("PwnFox-")) {
        const name = "X-PwnFox-Color"
        const value = colorMap[identity.color]
        e.requestHeaders.push({ name, value })
    }
    return { requestHeaders: e.requestHeaders }
}