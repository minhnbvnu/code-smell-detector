function makeConstants(environment, constants, CREDITS) {
    const alreadySeen = new Map();

    // Create the CONSTANTS object on the environment
    const CONSTANTS = Object.create({});
    defineImmutableProperty(environment, 'CONSTANTS', CONSTANTS);

    // Now redefine all constants appropriately
    redefineScreenConstants(environment, alreadySeen);
    redefineConstant(environment, 'CREDITS', CREDITS, alreadySeen);
    const IDE_USER = (isQuadserver && useIDE && serverConfig && serverConfig.IDE_USER) || 'anonymous';
    redefineConstant(environment, 'IDE_USER', IDE_USER, alreadySeen);

    const REFERENCE_PASS = true;

    for (const key in constants) {
        if (key[0] === '$') { throw 'Illegal constant field name: "' + key + '"'; }
        redefineConstantByName(environment, key, alreadySeen, ! REFERENCE_PASS);
    }
    CONSTANTS.$name = 'CONSTANTS';

    // Process references second so that they can point to named sprites
    // after the spritesheets have been resolved
    for (const key in constants) {
        redefineConstantByName(environment, key, alreadySeen, REFERENCE_PASS);
    }

    // Cannot seal CONSTANTS because that would make the properties non-configurable,
    // which would prevent redefining them during debugging.
    Object.preventExtensions(CONSTANTS);
}