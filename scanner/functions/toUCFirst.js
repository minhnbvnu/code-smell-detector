function toUCFirst(name) {
        var first = name.substr(0, 1).toUpperCase();
        var spare = name.substr(1, name.length);
        return first + spare;
        // return first;
    }