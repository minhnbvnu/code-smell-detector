function toNature(col) {
        var i,
            j,
            base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            result = 0;
        for (i = 0, j = col.length - 1; i < col.length; i += 1, j -= 1) {
            result += Math.pow(base.length, j) * (base.indexOf(col[i]) + 1);
        }
        return result;
    }