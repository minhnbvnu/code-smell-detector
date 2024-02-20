function paintOn(layer, _x, _y) {
        
        var x_offset = _x % map.tilewidth;
        var y_offset = _y % map.tileheight;
        
        _x = _x / map.tilewidth | 0;
        _y = _y / map.tileheight | 0;
        
        for(var x = 0; x < (1 + layer.w / map.tilewidth); x++) {
            for(var y = 0; y < (1 + layer.h / map.tileheight); y++) {
                for(var i in tilelayers) {
                    var tilelayer = tilelayers[i];
                    var gid = tilelayer.getGid(_x + x, _y + y);
                    if(gid) {
                        var tile = getSprite(gid);
                        // we need to update the position as the Sprites are shared
                        tile.position(map.tilewidth * x - x_offset, map.tileheight * y - y_offset);
                        tile.canvasUpdate(layer);
                    }
                }
            }
        }
    }