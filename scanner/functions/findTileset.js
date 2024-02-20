function findTileset(gid) {
        // find the tileset for the gid
        var tileset = null;
        for(var i=0; i<map.tilesets.length; i++) {
            tileset = map.tilesets[i];
            if(gid < tileset.firstgid) {
                tileset = map.tilesets[i-1];
                break;
            }
        }
        return tileset;
    }