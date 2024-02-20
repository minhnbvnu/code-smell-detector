function unescapeSQLiteResponse (arg) {
    return unescapeUnmatchedSurrogates(arg)
        .replaceAll(/(\^+)0/gu, (_, esc) => {
            return esc.length % 2
                ? esc.slice(1) + '\0'
                : _;
        })
        .replaceAll('^^', '^');
}