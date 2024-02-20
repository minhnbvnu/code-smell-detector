function addToList(map, key, value, insertAtStart) {
        var l = map[key];
        if (l == null) {
            l = [];
            map[key] = l;
        }
        l[insertAtStart ? "unshift" : "push"](value);
        return l;
    }