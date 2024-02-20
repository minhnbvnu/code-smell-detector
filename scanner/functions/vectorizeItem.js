function vectorizeItem(item, useUnit = true, useStem = true) {
    const isNumber = /^\d+\.\d+$/;
    let name = item.name
        .toLowerCase()
        .replace(/[^\w\s]|_/g, "")
        .replace("-", " ")
        .replace(",", " ");
    item.tokens = name
        .split(/\s+/)
        .filter((token) => !stopWords.includes(token))
        .filter((token) => !isNumber.test(token))
        .map((token) => (useStem ? stem(token) : token));
    if (useUnit) {
        if (item.quantity) item.tokens.push("" + item.quantity);
        if (item.unit) item.tokens.push(item.unit);
    }
    item.vector = vectorizeTokens(item.tokens);
}