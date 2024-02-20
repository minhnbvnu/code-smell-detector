function redefineReference(environment, key, globalReference) {
    console.assert(key.indexOf('.') === -1);

    const descriptor = {
        enumerable: true,
        configurable: true,
        get: globalReference.property !== '' ?
            function () {
                return environment[globalReference.identifier][globalReference.property];
            } :
            function () {
                return environment[globalReference.identifier];
            }
    };
    console.assert(key !== globalReference.identifier);
    //console.log('binding ' + key + ' → ' + globalReference.identifier);
    //console.dir(identifier);
    Object.defineProperty(environment, key, descriptor);
    Object.defineProperty(environment.CONSTANTS, key, descriptor);
}