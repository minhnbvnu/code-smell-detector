function findPath(x1, y1, x2, y2) {
        x1 = (x1 / map.tilewidth | 0) * map.tilewidth;
        y1 = (y1 / map.tileheight | 0) * map.tileheight;
        x2 = (x2 / map.tilewidth | 0) * map.tilewidth;
        y2 = (y2 / map.tileheight | 0) * map.tileheight;
        var start = new Node(x1 + map.tilewidth / 2, y1 + map.tileheight / 2);
        var end = new Node(x2 + map.tilewidth / 2, y2 + map.tileheight / 2);
        return sjs.path.find(start, end);
    }