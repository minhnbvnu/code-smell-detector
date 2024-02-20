function recursiveDefineConstantChain(json, value, debugJson, debugValue, alreadySeenMap) {
    console.assert(json.type === 'array' || json.type === 'object');
    
    const newObj = json.type === 'array' ? [] : {};
    for (let k in value) {
        const j = json.value[k];
        const v = value[k];

        const dj = debugJson && debugJson.value[k];
        const dv = debugValue && debugValue[k];

        let newValue;

        if (j.type === 'array' || j.type === 'object') {
            newValue = recursiveDefineConstantChain(j, v, dj, dv, alreadySeenMap);
        } else {
            newValue = frozenDeepClone(dj && dj.enabled ? dv : v, alreadySeenMap);
        }
        
        defineImmutableProperty(newObj, k, newValue);
    }

    return Object.preventExtensions(newObj);
}