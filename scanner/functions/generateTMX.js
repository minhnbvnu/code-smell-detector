function generateTMX(spriteURL, pngURL, spriteJSON, tilewidth, tileheight, layerwidth, layerheight, numlayers, spritesheetwidth, spritesheetheight) {
    const spriteName = spriteURL.replace(/^.*\/([^/]+)\.sprite\.json$/, '$1').replace(/.sprite.json$/, '');
    
    // Path to the PNG. The input is already an absolute URL
    // We need to make the spritePath into a file system path
    // that is relative to the current game or the quadplay install.
    let pngPath = pngURL;

    // This is an absolute URL. We need to make it into a filesystem path.

    const gameRootURL = gameSource.jsonURL.replace(/\/[^\/]*$/, '/');
    if (pngPath.startsWith(gameRootURL)) {
        // This is a relative http:// file, so we can simply tell the
        // TMX that it is relative to the game's own root

        pngPath = pngPath.substring(gameRootURL.length);
        
        // (if it was an *external* http:// URL there is simply
        // nothing we can do, so let it pass through broken)

    } else if (pngPath.startsWith('quad://')) {
        // Quadplay path. Find the relative path from the game to the
        // quadplay install on this machine. This is machine specific
        // (that's a problem with TMX!), but still likely to be robust
        // than an absolute path. A design alternative would be to
        // force copying the sprite into the game directory. Note
        // that the relative path in the TMX only matters for editing
        // the TMX; the game can be played and the game edited without
        // touching the TMX file even if this path is wrong on another
        // machine.

        // pngURL is initially relative to quadpath.  We need to make
        // it relative to mapPath.
        const mapPath = gameURL.replace(/^[a-z]+:\/\/[^/]+\//, '/').replace(/\/[^/]+$/, '/');

        // Make a file system path relative to the web server's root
        pngPath = pngPath.replace(/^quad:\/\//, getQuadPath());

        // Remove the longest common subpath of pngURL and mapPath
        let pngPathArray = pngPath.split('/');
        let mapPathArray = mapPath.split('/');
        console.assert(pngPathArray[0] === '' && mapPathArray[0] === '', 'Both paths must start with /');

        // The pngPathArray contains at least one different element:
        // the final filename, so there's no need to check about going
        // off the end of the array.
        while (pngPathArray[0] === mapPathArray[0]) {
            pngPathArray.shift();
            mapPathArray.shift();
        }

        // For each remaining unique element in mapPathArray, go up
        // one directory to reach that common subpath root
        pngPath = pngPathArray.join('/');
        for (let i = 0; i < mapPathArray.length - 1; ++i) {
            pngPath = '../' + pngPath;
        }
    }

    const columns = Math.floor(spritesheetwidth / tilewidth);
    const tilecount = columns * Math.floor(spritesheetheight / tileheight);
    
    let data = `<?xml version="1.0" encoding="UTF-8"?>
<map version="1.4" tiledversion="1.4.3" orientation="orthogonal" renderorder="left-down" width="${layerwidth}" height="${layerheight}" tilewidth="${tilewidth}" tileheight="${tileheight}" infinite="0" nextlayerid="${numlayers + 1}" nextobjectid="1">
 <tileset firstgid="1" name="${spriteName}" tilewidth="${tilewidth}" tileheight="${tileheight}" tilecount="${tilecount}" columns="${columns}">
  <image source="${pngPath}" width="${spritesheetwidth}" height="${spritesheetheight}"/>
 </tileset>
`;

    for (let L = 0; L < numlayers; ++L) {
        data += `<layer id="${L + 1}" name="Tile Layer ${L + 1}" width="${layerwidth}" height="${layerheight}"><data encoding="csv">\n`;
        for (let y = 0; y < layerheight; ++y) {
            for (let x = 0; x < layerwidth; ++x) {
                data += '0,';
            }
            // Remove the trailing ,
            if (y === layerheight - 1) { data = data.substring(0, data.length - 1); }
            data += '\n';
        }
        data += '</data></layer>\n';
    }

    data += '</map>\n';
    return data;
}