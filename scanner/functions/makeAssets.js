function makeAssets(environment, assets) {
    if ((assets === undefined) || (Object.keys(assets).length === 0)) { return; }

    // Check the spritesheet array for consistency
    for (let i = 0; i < spritesheetArray.length; ++i) {
        console.assert(spritesheetArray[i].$index[0] === i,
                       'spritesheetArray[' + i + '] has the wrong index'); 
    }
    
    // Clone the assets, as some of them (like the map) can be mutated
    // at runtime. For speed, do not clone sprites and fonts
    const alreadySeen = new Map();
    const ASSET = {};
    for (const assetName in assets) {
        let assetValue = assets[assetName];

        if (assetValue.$type === 'data') {
            // Data assets have a level of indirection that
            // we must unroll here
            assetValue = assetValue.value;
        }

        if (assetValue.$type === 'spritesheet') {
            console.assert(spritesheetArray[assetValue.$index[0]] === assetValue,
                           'spritesheet ' + assetName + ' is at the wrong index.');
        }

        /*
        // Expensive assertions for debugging
        if (assetValue.$type === 'map') {
            console.assert(spritesheetArray[assetValue.spritesheet.$index[0]] === assetValue.spritesheet,
                           'map ' + assetName + ' spritesheet has the wrong index ' + assetValue.spritesheet.$index[0] +
                           ', should be ' + spritesheetArray.indexOf(assetValue.spritesheet));
            // Test all map sprites
            for (let x = 0; x < assetValue.length; ++x) {
                for (let y = 0; y < assetValue[x].length; ++y) {
                    const sprite = assetValue[x][y];
                    if (sprite) {
                        console.assert(sprite.rotated_270.$spritesheet.$index[0] < spritesheetArray.length,
                                      '$spritesheet.$index[0] out of bounds');
                    }
                }
            }
        }
        */
        // Clone maps because if not in forceReload mode they are
        // shared between runs when the program resets. Everything
        // else is immutable so it doesn't matter.
        const assetCopy = (assetValue.$type === 'map') ? deep_clone(assetValue, alreadySeen) : assetValue;
        ASSET[assetName] = assetCopy;
        defineImmutableProperty(environment, assetName, assetCopy);
    }
    defineImmutableProperty(environment, 'ASSETS', Object.freeze(ASSET));
}