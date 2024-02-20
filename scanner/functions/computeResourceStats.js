function computeResourceStats(gameSource) {
    const alreadyCounted = new Map();
    for (let key in gameSource.assets) {
        if (key[0] !== '$') {
            const asset = gameSource.assets[key];
            if (! alreadyCounted.has(asset)) {
                alreadyCounted.set(asset, true);
                switch (asset.$type) {
                case 'font': case 'spritesheet':
                    recordSpriteStats(asset);
                    break;
                    
                case 'sound':
                    recordSoundStats(asset);
                    break;
                    
                case 'map':
                    for (let spritesheetKey in asset.spritesheet_table) {
                        const spritesheet = asset.spritesheet_table[spritesheetKey];
                        if (! alreadyCounted.has(spritesheet)) {
                            alreadyCounted.set(spritesheet, true);
                            recordSpriteStats(spritesheet);
                        }
                    }
                    break;
                }
            } // already counted
        }
    }
}