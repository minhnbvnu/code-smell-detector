function map_to_object(map) {
            var obj = Object.create(null);
            map.forEach(function (value, key) {
                obj["$" + key] = value;
            });
            return obj;
        }