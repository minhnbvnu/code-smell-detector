function addIfDefined(obj, globalPropName) {
    var globalProp = globalObject[globalPropName];
    if (typeof globalProp !== "undefined") {
        obj[globalPropName] = globalProp;
    }
}