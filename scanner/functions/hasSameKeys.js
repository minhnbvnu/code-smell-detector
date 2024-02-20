function hasSameKeys(map1, map2) {
            return map1 === map2 || map1 !== void 0 && map2 !== void 0 && map1.size === map2.size && !forEachKey(map1, (key) => !map2.has(key));
        }