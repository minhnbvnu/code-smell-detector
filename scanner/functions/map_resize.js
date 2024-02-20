function map_resize(map, w, h, layers) {
    if (layers === undefined) { layers = map.layer.length; }
    if (w === undefined) { w = map.size.x; }
    if (h === undefined) { h = map.size.y; }

    // The code below uses map.size as the current size of the map and
    // w, h as the final destination size so that the individual
    // horizontal, vertical, and layer blocks could be reordered.

    // Vertical
    if (h !== map.size.y) {
        // Shrink or grow
        for (let L = 0; L < map.layer.length; ++L) {
            for (let x = 0; x < map.size.x; ++x) {
                map.layer[L][x].length = h;
            }
        }
        map.size = Object.freeze({x: map.size.x, y: h});
    }

    // Horizontal
    if (w < map.size.x) {
        // Shrink
        for (let L = 0; L < map.layer.length; ++L) {
            map.layer[L].length = w;
        }
        map.size = Object.freeze({x: w, y: map.size.y});
    } else if (w > map.size.x) {
        // Grow
        map.size = Object.freeze({x: w, y: map.size.y});
        for (let L = 0; L < map.layer.length; ++L) {
            for (let x = map.layer[L].length; x < w; ++x) {
                map.layer[L].push(new Array(map.size.y));
            }
        }
    }

    // Note that map == map.layer[0]
    if (layers < map.layer.length) {
        // Shrink
        map.layer.length = layers;
    } else if (layers > map.layer.length) {
        // Grow
        for (let L = map.layer.length; L < layers; ++L) {
            map.layer.push(new Array(map.size.x));
            for (let x = 0; x < map.size.x; ++x) {
                map.layer[L][x] = new Array(map.size.y);
            }
        }
    }

    $console.assert(map.layer[0] === map);
    $console.assert(map.layer.length === layers, "Inconsistent number of layers");
    $console.assert(map.layer[map.layer.length - 1].length === map.size.x, "Inconsistent size in X");
    $console.assert(map.layer[map.layer.length - 1][0].length === map.size.y, "Inconsistent size in Y");

    map.size_pixels = Object.freeze({x:map.size.x * map.sprite_size.x, y:map.size.y * map.sprite_size.y});
}