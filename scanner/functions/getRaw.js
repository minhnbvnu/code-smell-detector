function getRaw(ast) {
    return JSON.parse(JSON.stringify(ast, (key, value) => {
        if ((key === "start" || key === "end") && typeof value === "number") {
            return undefined;
        }
        return value;
    }));
}