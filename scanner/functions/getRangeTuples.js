function getRangeTuples(op, currEntry, val) {
        var ret;
        if (op === "gt") {
            ret = currEntry.findGT(val);
        } else if (op === "gte") {
            ret = currEntry.findGTE(val);
        } else if (op === "lt") {
            ret = currEntry.findLT(val);
        } else if (op === "lte") {
            ret = currEntry.findLTE(val);
        }
        return ret;
    }