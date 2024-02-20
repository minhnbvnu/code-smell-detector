function compareAddr(indexA, indexB) {
        if (indexA.length != indexB.length)
            return 0;
        for (var i = 0, l = indexA.length; i < l; i++) {
            if (indexA[i] != indexB[i])
                return 0
        }
        return 1;
    }