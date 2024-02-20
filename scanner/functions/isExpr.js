function isExpr(obj) {
        return (0, types_1.isPlainObject)(obj) && "expr" in obj;
    }