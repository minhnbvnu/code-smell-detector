function computeCredits(gameSource) {
    function canonicalizeLicense(license) {
        // Remove space after copyright and always just use the symbol
        license = license.replace(/(?:\(c\)|copyright|©)\s*(?=\d)/gi, '©');
        
        // Lower-case any leading "by"
        license = license.replace(/^By /, 'by ');
        return license;
    }

    const CREDITS = gameSource.CREDITS = {
        game: [],
        pack: [],
        font: [],
        sprite: [],
        sound: [],
        code: [],
        data: [],
        quadplay: []
    };

    // Game
    CREDITS.game.push((gameSource.json.title || 'Untitled') +
                      (gameSource.json.developer ? ' by ' +
                       gameSource.json.developer : '') + ' ' +
                      (gameSource.json.copyright || ''));
    if (gameSource.json.license) { CREDITS.game.push(canonicalizeLicense(gameSource.json.license)); }
    
    CREDITS.title = gameSource.json.title || 'Untitled';
    CREDITS.developer = gameSource.json.developer || '';

    // Map from canonicalized licenses to assets that use them
    const cache = {};
    for (const type in CREDITS) {
        cache[type] = new Map();
    }
    Object.seal(cache);

    function addCredit(type, assetURL, license) {
        license = canonicalizeLicense(license);
        if (! cache[type].has(license)) {
            cache[type].set(license, []);
        }
        cache[type].get(license).push(urlFile(assetURL).replace(/\.[^\.]+\.json$/, ''));
    }

    if (gameSource.json.credits) {
        CREDITS.main = gameSource.json.credits.main;
        CREDITS.extra = gameSource.json.credits.extra;
        
        // Code
        const codeCredits = gameSource.json.credits.code;
        for (let url in codeCredits) {
            addCredit('code', url, codeCredits[url]);
        }
    }
    
    for (let a in gameSource.assets) {
        const asset = gameSource.assets[a];

        console.assert(asset, 'Asset ' + a + ' is not in gameSource.assets');
        const json = asset.$json;
        
        let type = asset.$jsonURL.match(/\.([^.]+)\.json$/i);
        if (type) { type = type[1].toLowerCase(); }

        if (json.license && CREDITS[type]) {
            addCredit(type, asset.$jsonURL, json.license);
        }

        if (type === 'map') {
            // Process the spritesheets
            for (let k in asset.spritesheet_table) {                
                const spritesheet = asset.spritesheet_table[k];

                console.assert(spritesheet.$index[0] === spritesheetArray.indexOf(spritesheet));
                console.assert(spritesheet[0][0].rotated_270.$spritesheet.$index[0] === spritesheetArray.indexOf(spritesheet[0][0].rotated_270.$spritesheet),
                               'bad rotated spritesheet index after loading');
                
                const json = spritesheet.$json;
                if (json.license) {
                    addCredit('sprite', spritesheet.$jsonURL, json.license);
                }
            }
        }
    }

    // Generate the credits from the cache, consolidating those with the same license.
    for (const type in cache) {
        cache[type].forEach(function (assetList, license) {
            let assets;
            if (assetList.length === 1) {
                assets = assetList[0];
            } else if (assetList.length === 2) {
                assets = assetList[0] + ' and ' + assetList[1];
            } else {
                assets = assetList.slice(0, assetList.length - 1).join(', ') + ', and ' + assetList[assetList.length - 1];
            }            
            CREDITS[type].push(assets + ' ' + license);
        });
    }
    
    // The quadplay runtime. We only need to credit code that is in the runtime, not the compiler or IDE.
    CREDITS.quadplay.push('quadplay✜ ©2019-2021 Morgan McGuire, used under the LGPL 3.0 license');
    CREDITS.quadplay.push('gif.js ©2013 Johan Nordberg, used under the MIT license, with additional programming by Kevin Weiner, Thibault Imbert, and Anthony Dekker');
    CREDITS.quadplay.push('xorshift implementation ©2014 Andreas Madsen and Emil Bay, used under the MIT license');
    CREDITS.quadplay.push('LoadManager.js ©2018-2020 Morgan McGuire, used under the BSD license');
    CREDITS.quadplay.push('WorkJSON.js ©2020-2021 Morgan McGuire, used under the MIT license');
    CREDITS.quadplay.push('js-yaml ©2011-2015 Vitaly Puzrin, used under the MIT license');
    CREDITS.quadplay.push('matter.js © Liam Brummitt and others, used under the MIT license');
    CREDITS.quadplay.push('poly-decomp.js ©2013 Stefan Hedman, used under the MIT license');
}