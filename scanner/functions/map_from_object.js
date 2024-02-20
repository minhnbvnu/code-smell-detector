function map_from_object(obj) {
            var map = new Map();
            for (var key in obj) {
                if (HOP(obj, key) && key.charAt(0) === "$") {
                    map.set(key.substr(1), obj[key]);
                }
            }
            return map;
        }