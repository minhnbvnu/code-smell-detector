function checkProj(item) {
        if (item instanceof Proj_1.default) {
            return item;
        }
        if (item.oProj) {
            return item.oProj;
        }
        return (0, Proj_1.default)(item);
    }