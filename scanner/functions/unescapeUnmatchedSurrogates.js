function unescapeUnmatchedSurrogates (arg) {
    return arg
        .replaceAll(/(\^+)3(d[0-9a-f]{3})/gu, (_, esc, lowSurr) => {
            return esc.length % 2
                ? esc.slice(1) + String.fromCodePoint(Number.parseInt(lowSurr, 16))
                : _;
        }).replaceAll(/(\^+)2(d[0-9a-f]{3})/gu, (_, esc, highSurr) => {
            return esc.length % 2
                ? esc.slice(1) + String.fromCodePoint(Number.parseInt(highSurr, 16))
                : _;
        });
}