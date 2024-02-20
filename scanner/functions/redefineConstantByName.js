function redefineConstantByName
(environment,
 key,
 alreadySeenMap,
 referencePass = undefined,
 constants = gameSource.constants,
 debugConstants = gameSource.debug && gameSource.debug.constants ? gameSource.debug.constants : {},
 debugConstantsJSON = gameSource.debug && gameSource.debug.json ? gameSource.debug.json.constants : {}) {

    const gameValue   = nestedGet(constants, key);
    const debugLookup = nestedGetObject(debugConstants, key, true);
    const debugJSON   = debugConstantsJSON ? nestedGet(debugConstantsJSON, key, true, true) : undefined;

    const value =
          (debugLookup && debugJSON && 
           debugLookup.key in debugLookup.parent &&
           debugJSON.enabled &&
           ALLOWED_TO_DEBUG_OVERRIDE[debugJSON.type]) ?
          debugLookup.object :
          gameValue;

    // referencePass is not strictly boolean, so we have to test against
    // true and false explicitly
    if (value instanceof GlobalReferenceDefinition) {
        if (referencePass !== false) {
            redefineReference(environment, key, value.resolve());
        }
    } else if (referencePass !== true) {
        redefineConstant(environment, key, value, alreadySeenMap);
    }
}