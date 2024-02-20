function is_Cloneable(obj) {
        return (0, types_1.isObject)(obj) && exports.clone in obj;
    }