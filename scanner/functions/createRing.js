function createRing(offset) {
        var center = map.getCenter();
        var x = center.x, y = center.y;
        var minx = x - offset, maxx = x + offset, miny = y - offset, maxy = y + offset;
        return [
            [minx, miny],
            [minx, maxy],
            [maxx, maxy],
            [maxx, miny],
            [minx, miny]
        ];
    }