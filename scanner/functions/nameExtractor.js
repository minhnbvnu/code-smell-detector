function nameExtractor(sourceLists, extra) {
    const origFuncName = sourceLists.sections[0];
    const ending = origFuncName[origFuncName.length - 1] === ")" ? ")" : "";
    const newFuncName = origFuncName.substr(0, origFuncName.length - 1 - ~~(ending === ")")) +
        extra +
        "(" +
        ending;
    return { origFuncName, newFuncName, ending };
}