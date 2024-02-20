function cloneDeeplyExcludesParent(x) {
        if (typeof x === "object" && x !== null) {
            if (Array.isArray(x)) {
                return x.map(cloneDeeplyExcludesParent);
            }
            const retv = {};
            for (const key in x) {
                if (key !== "parent" && hasOwnProperty(x, key)) {
                    retv[key] = cloneDeeplyExcludesParent(x[key]);
                }
            }
            return retv;
        }
        return x;
    }