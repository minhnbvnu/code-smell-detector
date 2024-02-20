function uniqueArray(src, key, sort) {
            var results = [];
            var values = [];
            var i = 0;
            while (i < src.length) {
                var val = key ? src[i][key] : src[i];
                if (inArray(values, val) < 0) {
                    results.push(src[i]);
                }
                values[i] = val;
                i++;
            }
            if (sort) {
                if (!key) {
                    results = results.sort();
                }
                else {
                    results = results.sort(function sortUniqueArray(a, b) {
                        return a[key] > b[key];
                    });
                }
            }
            return results;
        }