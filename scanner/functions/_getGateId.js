function _getGateId(json) {
    let symbol = typeof json === "string" ? json : json["id"];

    // Recover from bad symbol.
    if (symbol === undefined) {
        return "";
    }
    if (typeof symbol !== "string") {
        return describe(symbol);
    }

    return symbol;
}