function jsonCallback(_map, callback) {
        map = _map;
        
        for(index in map.layers) {
            var layer = map.layers[index];
            if(layer.type=="tilelayer") {
                layer.getGid = _getGid;
                tilelayers.push(layer);
            }

            if(layer.type=="objectgroup") {
                objectGroup(layer);
            }
        }
        buildTileProperties();
        buildStaticCollisions();
        
        var to_load = [];
        for(var i=0; i<map.tilesets.length; i++) {
            to_load.push(map.tilesets[i].image);
        }
        
        _scene.loadImages(to_load, callback);
       
    }