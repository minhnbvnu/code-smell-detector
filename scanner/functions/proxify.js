function proxify(config, onlyContainers) {
    return async function (e) {
        if (onlyContainers && e.cookieStoreId == 'firefox-default')
            return { type: "direct" };
        const host = await config.get("burpProxyHost")
        const port = await config.get("burpProxyPort")
        return {
            type: "http",
            host,
            port
        };
    }
}