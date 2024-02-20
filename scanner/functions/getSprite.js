function getSprite(gid) {
        // return the sprite according to the gid
        var tileset = findTileset(gid);
        var localGid = gid - (tileset.firstgid);

        var tw = tileset.tilewidth;
        var th = tileset.tileheight;

        var nb_x = tileset.imagewidth / tw | 0;
        var nb_y = tileset.imageheight / th | 0;
        
        var x = localGid % nb_x;
        var y = localGid / nb_x | 0;

        var sp = _scene.Sprite(tileset.image, {w:tw, h:th, xoffset:x * tw, yoffset:y * th, layer:null});
        return sp;
    }