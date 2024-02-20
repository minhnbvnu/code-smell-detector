function removeWithFunction(a, f) {
        var idx = findWithFunction(a, f);
        if (idx > -1) {
            a.splice(idx, 1);
        }
        return idx !== -1;
    }