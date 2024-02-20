function genArity1SourceList(name, val1, val2) {
    return {
        sections: [name + "(", ",", ")"],
        values: [val1, val2],
    };
}