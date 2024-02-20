function getLatestCachedWebSQLDB (name) {
    return websqlDBCache[name] && websqlDBCache[name][
        getLatestCachedWebSQLVersion(name)
    ];
}