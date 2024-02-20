function collect_from_map(map, callback) {
                var result = [];
                map.forEach(function (def) {
                    result.push(callback(def));
                });
                return result;
            }