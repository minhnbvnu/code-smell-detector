function getLatestCachedWebSQLVersion (name) {
    return Object.keys(websqlDBCache[name]).map(Number).reduce(
        (prev, curr) => {
            return curr > prev ? curr : prev;
        }, 0
    );
}