function isSpec(obj) {
        return (0, types_2.isPlainObject)(obj) &&
            ((obj.value === undefined ? 0 : 1) +
                (obj.field === undefined ? 0 : 1) +
                (obj.expr === undefined ? 0 : 1) == 1); // garbage JS XOR
    }