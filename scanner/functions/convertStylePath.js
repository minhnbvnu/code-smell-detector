function convertStylePath(styles, replacer) {
    for (let i = 0; i < styles.length; i++) {
        const { symbol } = styles[i];
        if (symbol) {
            parseSymbolPath(symbol, replacer);
        }
    }

}