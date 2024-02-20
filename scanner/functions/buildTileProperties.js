function buildTileProperties() {
        for(var i=0; i<map.tilesets.length; i++) {
            var tileset = map.tilesets[i];
            for(index in tileset.tileproperties) {
                var props = tileset.tileproperties[index];
                tileProp[parseInt(index)+tileset.firstgid] = props;
            }
        }
    }