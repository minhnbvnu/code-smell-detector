function align(x, y) {
        // return the cell coordinates according to relative coordinates
        x = x / map.tilewidth | 0;
        y = y / map.tileheight | 0;
        return {x:x, y:y};
    }