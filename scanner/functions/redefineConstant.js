function redefineConstant(environment, key, value, alreadySeenMap) {
    console.assert(! (value instanceof GlobalReference));

    // When looking for the gameJSON, some constants such as
    // SCREEN_SIZE will not be present, so allow this to fail to
    // undefined.
    const gameJSON = nestedGet(gameSource.json.constants, key, true, true);
    
    if (gameJSON && (gameJSON.type === 'object' || (gameJSON.type === 'array' && gameJSON.url === undefined))) {
        // Recursive case (note that arrays loaded from urls are
        // excluded). Define the leaves as immutable properties, and
        // everything else as a frozen clone. This path is only used
        // for the initial definition.
        const debugJSON  = gameSource.debug && gameSource.debug.json && nestedGet(gameSource.debug.json.constants, key, true, true);
        const debugValue = gameSource.debug && gameSource.debug.constants && nestedGet(gameSource.debug.constants, key, true, false);
        value = recursiveDefineConstantChain(gameJSON, value, debugJSON, debugValue, alreadySeenMap);
    } else {
        value = frozenDeepClone(value, alreadySeenMap || new Map());
    }
    
    defineImmutableProperty(environment, key, value);
    defineImmutableProperty(environment.CONSTANTS, key, value);
}