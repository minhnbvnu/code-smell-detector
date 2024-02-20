function genCompSource(vec, components) {
    return {
        sections: ["", "." + components],
        values: [vec],
    };
}