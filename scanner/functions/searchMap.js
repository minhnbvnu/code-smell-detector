function searchMap(map, key, found, notFound) {
        var a = map.array;
        for (var i = 0, n = a.length; i < n; i++) {
            var pair = a[i];
            if (pair.key === key)
                return found(pair, i);
        }
        return notFound();
    }