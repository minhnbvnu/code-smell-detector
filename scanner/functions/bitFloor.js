function bitFloor(n) {
        var i = n | 0;
        return n > 0 || n === i ? i : i - 1;
    }