function mapMousemove(map, steps, callback) {
    var result = [];
    map.on('mousemove touchmove', function () {
        result.push(1);
        if (result.length === steps) {
            callback()
        }
    })
}