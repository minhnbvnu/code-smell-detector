function float(value) {
    if (typeof value === "number")
        value = wrapInValue(value);
    return new BasicFloat({ sections: ["", ""], values: [value] }, ["uFloat"]);
}