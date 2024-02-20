function create_array_map() {
    var map = Object.create(null);
    var array = [];
    array.index = function(name) {
        if (!HOP(map, name)) {
            map[name] = array.length;
            array.push(name);
        }
        return map[name];
    };
    return array;
}