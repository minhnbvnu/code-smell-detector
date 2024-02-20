function processEffectMap(eMap) {
    const result = {};
    for (const name in eMap) {
        const val = eMap[name];
        result[name] = wrapInSetColors(val);
    }
    return result;
}